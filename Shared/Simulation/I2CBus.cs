using Microsoft.JSInterop;

namespace ADArCWebApp.Shared.Simulation;

public interface I2CDevice
{
    public bool I2CConnect(byte address, bool write);
    public byte I2CReadByte(bool acked);
    public bool I2CWriteByte(byte value);
    public void I2CDisconnect();
}

public class I2CBus
{
    private IJSObjectReference? _module;
    private DotNetObjectReference<I2CBus>? _dotNetHelper;
    private Dictionary<byte, I2CDevice> _devices = new();
    private I2CDevice? _activeDevice;
    private bool _writeMode = false;

    public async Task InitializeAsync(IJSRuntime runtime)
    {
        _module = await runtime.InvokeAsync<IJSObjectReference>("import", "./I2CBus.js");
        _dotNetHelper = DotNetObjectReference.Create(this);
        await _module.InvokeVoidAsync("I2CBus.setDotNetHelper", _dotNetHelper);
    }
    
    [JSInvokable]
    public void RegisterDevice(byte addr, I2CDevice device) {
        _devices[addr] = device;
    }

    [JSInvokable]
    public void Stop()
    {
        if (_activeDevice != null)
        {
            _activeDevice.I2CDisconnect();
            _activeDevice = null;
        }
    }

    [JSInvokable]
    public bool ConnectToSlave(byte addr, bool write)
    {
        var result = false;
        var device = _devices[addr];
        if (device != null)
        {
            result = device.I2CConnect(addr, write);
            if (result)
            {
                _activeDevice = device;
                _writeMode = write;
            }
        }

        return result;
    }

    [JSInvokable]
    public bool WriteByte(byte value)
    {
        if (_writeMode && _activeDevice != null)
        {
            return _activeDevice.I2CWriteByte(value);
        }

        return false;
    }

    [JSInvokable]
    public byte I2CReadByte(bool ack)
    {
        if (!_writeMode && _activeDevice != null)
        {
            return _activeDevice.I2CReadByte(ack);
        }

        return 0xff;
    }
}