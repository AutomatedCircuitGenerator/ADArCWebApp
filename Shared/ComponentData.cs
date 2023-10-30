namespace MinAVR.Shared
{
	public class ComponentData
	{

		public Dictionary<string,object> properties = new Dictionary<string,object>();

		public ComponentData(ComponentDataBuilder builder) {
			properties = builder.properties;
		}

    }

	public class ComponentDataBuilder
	{

		public Dictionary<string, object> properties = new Dictionary<string, object>();

		public ComponentDataBuilder() { }


		public ComponentDataBuilder Property(string name, object data)
		{
			properties[name] = data;
			return this;
		}


		public ComponentData Finish()
		{
			return new ComponentData(this);
		}
	}
}
