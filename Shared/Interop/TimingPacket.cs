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
        /// <summary>
        /// Adds an instruction to the list and resorts it.
        /// </summary>
        /// <param name="inst">The instruction to add.</param>
        /// <returns>The added instruction (for chaining purposes).</returns>
        public PinInstruction addInstruction(PinInstruction inst) { 
            instructions.Add(inst);
            instructions.Sort();
            return inst;
        }
        /// <summary>
        /// Adds a variable number of unchained premade instructions at once. Currently unused.
        /// </summary>
        /// <param name="inst">The instructions to add.</param>
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

        /// <summary>
        /// Defines custom compare so that sorting works correctly in the timing packet.
        /// Based on the microseconds since originating cycle.
        /// </summary>
        /// <param name="other">another instruction to compare against.</param>
        /// <returns>0 if they execute at the same time, -1 or 1 as necessary to sort lowest to highest.</returns>
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
