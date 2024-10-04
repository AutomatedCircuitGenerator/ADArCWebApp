using ADArCWebApp.Shared.Simulation;

namespace ADArCWebApp.Shared.Components.Protocols
{
    enum State
    {
        Idle,
        Start,
    }
    public class I2C
    {
        public event EventHandler<WriteRecievedEventArgs>? WriteRecieved;
        private byte _byte = 0;
        private byte _counter = 0;
        private bool _previousScl = true;
        private bool _previousSda = true;
        private byte _address;
        private int _sdaPinIndex;
        private int _sclPinIndex;
        private State _state = State.Idle;

        public I2C(int sdaPinIndex, int sclPinIndex, byte address)
        {
            this._sdaPinIndex = sdaPinIndex;
            this._sclPinIndex = sclPinIndex;
            this._address = address;
        }

        protected virtual void OnWriteRecieved()
        {
            WriteRecievedEventArgs e = new WriteRecievedEventArgs();
            e.Byte = _byte;
            WriteRecieved?.Invoke(this, e);
        }

        async public void Clock()
        {
            bool sda = await AvrCPU.getPinState(_sdaPinIndex);
            bool scl = await AvrCPU.getPinState(_sdaPinIndex);

            switch (_state)
            {
                case State.Idle:
                    if (IsStartCondition(sda, scl))
                    {
                        _state = State.Start;
                    }
                    break;
                case State.Start:
                    if (scl)
                    {
                        _byte <<= 1;
                        if (sda)
                        {
                            _byte |= 1;
                        }
                        _counter++;

                        if (_counter == 8)
                        {
                            byte rw = (byte)(_byte & 1);
                            byte address = (byte)(_byte >> 1);


                        }
                    }
                    break;
            }
        }

        private bool IsStartCondition(bool sda, bool scl)
        {
            return (_previousSda == true && sda == false && scl == true);
        }

        private bool IsStopCondition(bool sda, bool scl)
        {
            return (_previousSda == false && sda == true && scl == true);
        }
    }

    public class WriteRecievedEventArgs : EventArgs
    {
        public byte Byte { get; set; }
    }
}