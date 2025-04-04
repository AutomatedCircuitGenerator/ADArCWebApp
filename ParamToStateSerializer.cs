using System.Text.Json;
using System.Text.Json.Serialization;

namespace ADArCWebApp
{
    public class ParamToStateSerializer : JsonConverter<IComponentParameter>
    {
        // this should never be called in theory
        public override IComponentParameter? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            return null;
        }

        public override void Write(Utf8JsonWriter writer, IComponentParameter value, JsonSerializerOptions options)
        {
            JsonSerializer.Serialize(writer, value.GetValue(), options);
        }
    }
}
