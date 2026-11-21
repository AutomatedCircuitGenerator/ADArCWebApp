namespace ADArCWebApp
{
	public interface IComponentParameter
	{
		public object? GetValue();

		public (Type type, object? obj) GetValWithType();

		public void SetValue<T>(T obj);

		public IComponentParameter Copy();

	}
	/// <summary>
	/// Created in response to problems serialize Dict<string, object> to JSON.
	/// This is a way to define the "object", retaining some notion of what the original type was,
	/// and allowing it to be deserialized more nicely.
	/// </summary>
	/// <typeparam name="T">the type of the parameter to use.</typeparam>
	public class ComponentParameter(Type type, object? val) : IComponentParameter
	{
		private object? Value { get; set; } = val;
		private Type type = type;

		public object? GetValue()
		{
			return Value;
		}

        public (Type type, object? obj) GetValWithType()
        {
			return (type, Value);
        }

        public void SetValue<T1>(T1 obj)
		{
			//Console.WriteLine(typeof(T1) + ", " + typeof(T));

			if (typeof(T1) == type)
			{
				Value = Convert.ChangeType(obj, type);
			}
			else if (typeof(T1) == type) {
				Value = (object)obj;			//ugly but valid I think
			}
			else
			{
				throw new InvalidCastException();
			}
		}

		//Ran into some problems with template vs object params, this was created to fix that.
		public IComponentParameter Copy()
		{
			IComponentParameter ret =  new ComponentParameter(type, Value);
			return ret;
		}
	}

}
