using ADArCWebApp.Shared.Simulation;

namespace ADArCWebApp.Shared.Components.Protocols;

internal enum State
{
    Idle,
    Address,
    Write,
    Read,
    AwaitAck
}

public class I2C
{
    public delegate List<byte>? WriteReceivedEventHandler(object sender, WriteReceivedEventArgs e);

    private readonly byte _address;
    private readonly List<byte> _outBuffer = [];
    private readonly int _sclPinIndex;
    private readonly int _sdaPinIndex;

    private byte _inBuffer;
    private byte _inCounter;
    private byte _outCounter;
    private bool _previousScl = true;
    private bool _previousSda = true;
    private State _state = State.Idle;

    public I2C(int sdaPinIndex, int sclPinIndex, byte address)
    {
        _sdaPinIndex = sdaPinIndex;
        _sclPinIndex = sclPinIndex;
        _address = address;
    }

    public event WriteReceivedEventHandler? WriteReceived;

    protected virtual void OnWriteReceived()
    {
        var e = new WriteReceivedEventArgs
        {
            Byte = _inBuffer
        };

        var response = WriteReceived?.Invoke(this, e);

        if (response == null) return;

        _outBuffer.AddRange(response);
    }

    public async void Clock(long pinChangeCycle)
    {
        var sda = await AvrCPU.getPinState(_sdaPinIndex);
        var scl = await AvrCPU.getPinState(_sclPinIndex);

        if (IsStopCondition(sda, scl))
        {
            _state = State.Idle; // no matter what, if there is a stop condition, go back to idle and return
            return;
        }

        switch (_state)
        {
            case State.Idle:
                if (IsStartCondition(sda, scl)) _state = State.Address;

                break;
            case State.Address:
                if (scl) // every time scl is high, push a bit from sda into _inBuffer
                {
                    _inBuffer <<= 1;
                    if (sda) _inBuffer |= 1;

                    _inCounter++;
                }
                else // scl low
                {
                    if (_inCounter == 8) // full address has been sent
                    {
                        var rw = (byte)(_inBuffer & 1);
                        var address = (byte)(_inBuffer >> 1);

                        if (address != _address) // this communication is not addressed to our device
                        {
                            _state = State.Idle;
                            break;
                        }

                        Ack(pinChangeCycle); // send ack while scl is low
                        _state = rw == 0 ? State.Write : State.Read; // state transition based on rw
                    }
                }

                break;
            case State.Write:
                if (scl) // every time scl is high, read a bit from sda into _inBuffer
                {
                    _inBuffer <<= 1;
                    if (sda) _inBuffer |= 1;

                    _inCounter++;
                }
                else
                {
                    if (_inCounter == 8) // full byte has been written
                    {
                        OnWriteReceived(); // invoke event listener to handle written instruction
                        Ack(pinChangeCycle); // send ack while scl is low
                    }
                }

                break;
            case State.Read:
                if (!scl)
                {
                    if (_outBuffer.Count > 0)
                    {
                        var currentByte = _outBuffer.First();
                        var currentBit = (currentByte & 0x80) == 1;
                        _outBuffer[0] = (byte)(currentByte << 1);
                        _outCounter++;

                        AvrCPU.setPinState(pinChangeCycle, _sdaPinIndex, currentBit);
                    }
                }
                else
                {
                    if (_outCounter == 8) // low clock pulse after final bit is written
                    {
                        _outBuffer.RemoveAt(0); // remove the byte we just wrote out from the buffer
                        _state = State.AwaitAck; // await ack from arduino to decide how to proceed
                    }
                }

                break;
            case State.AwaitAck:
                if (scl) // this should always be true when we get here, but just in case
                    _state = sda
                        ? State.Idle // if sda is high (NACK), end transmission, go back to idle
                        : State.Read; // if sda is low (ACK), prepare to write the next byte to the arduino
                break;
        }

        _previousScl = scl;
        _previousSda = sda;
    }

    private bool IsStartCondition(bool sda, bool scl)
    {
        return _previousSda && sda == false && scl;
    }

    private bool IsStopCondition(bool sda, bool scl)
    {
        return _previousSda == false && sda && scl;
    }

    private void Ack(long pinChangeCycle)
    {
        AvrCPU.setPinState(pinChangeCycle, _sdaPinIndex, false);
    }
}

public class WriteReceivedEventArgs : EventArgs
{
    public byte Byte { get; set; }
}