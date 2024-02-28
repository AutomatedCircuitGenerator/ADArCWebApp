namespace ADArCWebApp
{
	public interface IComponentParameter
	{
		public object getValue();

		public (Type type, object obj) getValWithType();

		public void setValue<T>(T obj);

		public IComponentParameter copy();

	}

	public class ComponentParameter<T> : IComponentParameter {

		public ComponentParameter(T val) { 
			Value = val;
		}

		private T Value { get; set; }

		public object getValue()
		{
			return Value;
		}

        public (Type type, object obj) getValWithType()
        {
			return (typeof(T), Value);
        }

        public void setValue<T1>(T1 obj)
		{
			//Console.WriteLine(typeof(T1) + ", " + typeof(T));

			if (typeof(T1) is T)
			{
				Value = (T)Convert.ChangeType(obj, typeof(T));
			}
			else if (typeof(T1) == typeof(T)) {
				Value = (T)(object)obj;			//ugly but valid I think
			}
			else
			{
				throw new InvalidCastException();
			}
		}

		public IComponentParameter copy()
		{
			IComponentParameter ret =  new ComponentParameter<T>(Value);
			return ret;
		}
	}

}
