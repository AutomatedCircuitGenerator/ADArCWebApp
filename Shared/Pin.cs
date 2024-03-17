namespace ADArCWebApp
{

    /// <summary>
    /// Adapted from Wokwi for use in pinInfos.
    /// </summary>
    public class PinSignalInfo
    {
        public enum PinSignalType { I2C, SPI, USART, POWER, PWM, ANALOG}
        public enum PinSignal { SDA, SCL, SCK, MOSI, MISO, SS, RX, TX, GND, VCC, NONE}


        PinSignalType type;
        PinSignal signal;
        int? bus;
        double? voltage;
        int? channel;

        private PinSignalInfo(PinSignalType type, PinSignal signal = PinSignal.NONE, int bus = -1, double? voltage = 0, int channel = -1) { 
            this.type = type;
            this.signal = signal;
            this.bus = bus;
            this.voltage = voltage;
            this.channel = channel;
        }

        public static PinSignalInfo I2C(PinSignal signal, int bus = 0) {
            if (signal == PinSignal.SCL || signal == PinSignal.SDA)
            {
                return new PinSignalInfo(PinSignalType.I2C, signal, bus);
            }
            else
            {
                throw new ArgumentException("SDA or SCL only");
            }
        }

        public static PinSignalInfo Analog(int channel) {
            return new PinSignalInfo(PinSignalType.ANALOG, channel: channel);
        }


        public static PinSignalInfo SPI(PinSignal signal, int bus) {
            if (new PinSignal[]{PinSignal.SCK, PinSignal.MOSI, PinSignal.MISO, PinSignal.SS}.Contains(signal))
            {
                return new PinSignalInfo(PinSignalType.SPI, signal, bus);
            }
            else
            {
                throw new ArgumentException("SCK, MOSI, MISO, SS only");
            }
        }

        public static PinSignalInfo USART(PinSignal signal, int bus)
        {
            if (signal == PinSignal.RX || signal == PinSignal.TX)
            {
                return new PinSignalInfo(PinSignalType.USART, signal, bus);
            }
            else
            {
                throw new ArgumentException("RX or TX only");
            }
        }

        public static PinSignalInfo GND()
        {
            return new PinSignalInfo(PinSignalType.POWER, PinSignal.GND);
        }

        public static PinSignalInfo VCC(double? voltage = 0)
        {
            return new PinSignalInfo(PinSignalType.POWER, PinSignal.VCC, voltage: voltage);
        }

        public static PinSignalInfo PWM() {
            return new PinSignalInfo(PinSignalType.PWM);
        }

    }


    public class ElementPin
    {
        string name;
        public double x;
        public double y;
        PinSignalInfo[] signals;
        int? number;
        string? description;
        bool? noBreadboard;


        public ElementPin(string name, double x, double y, PinSignalInfo[] signals, int? number = null, string? description = null, bool noBreadboard = false) { 
            this.name = name;
            this.x = x;
            this.y = y;
            this.signals = signals;
            this.number = number;
            this.description = description;
            this.noBreadboard = noBreadboard;
        }


    }

}