namespace ADArCWebApp.Shared.Interop
{
    public class TimingPacket
    {

        //properties for easier jsoning
        public long originCycle { get; set; }

        public List<PinInstruction> instructions { get;} = [];

        public TimingPacket(long originCycle) { 
            this.originCycle = originCycle;
        }

        public TimingPacket(long originCycle, params PinInstruction[] inst) {
            this.originCycle=originCycle;
            instructions.AddRange(inst);
            instructions.Sort();
        }

        public PinInstruction addInstruction(PinInstruction inst) { 
            instructions.Add(inst);
            instructions.Sort();
            return inst;
        }
        public void addInstructions(params PinInstruction[] inst)
        {
            instructions.AddRange(inst);
            instructions.Sort();
        }

    }


    public class PinInstruction : IComparable<PinInstruction>
    {
        public bool isOn { get; set; }
        public int pin { get; set; }
        public double cumulUsSinceOriginCycle { get; set; }

        public double cyclesSinceOrigin { get { return cumulUsSinceOriginCycle * 16; } } //16 cyc per us at 16MHZ clock

        public PinInstruction(int affectsPin, bool shouldSetOn, double timeSinceOriginUs) { 
            this.pin = affectsPin;
            this.cumulUsSinceOriginCycle = timeSinceOriginUs;
            this.isOn = shouldSetOn;
        }

        public PinInstruction(PinInstruction prev, int furtherUsDelay, bool changeState) {
            if (changeState) {
                isOn = !prev.isOn;
            }
            else { isOn = prev.isOn; }
            pin = prev.pin;
            cumulUsSinceOriginCycle = prev.cumulUsSinceOriginCycle + furtherUsDelay;
        }


        public int CompareTo(PinInstruction? other)
        {
            //avoid double precision errors on equals
            if ((cumulUsSinceOriginCycle - other?.cumulUsSinceOriginCycle) < .001)
            {
                return 0;
            }
            else if (cumulUsSinceOriginCycle < other?.cumulUsSinceOriginCycle) { 
                return -1;
            }
            else {
                return 1;
            }
        }
    }
}
