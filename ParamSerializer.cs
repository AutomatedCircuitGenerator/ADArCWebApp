using System.Text.Json;
using System.Text.Json.Serialization;

namespace ADArCWebApp
{
    public class ParamSerializer : JsonConverter<IComponentParameter>
    {
        public override IComponentParameter? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType != JsonTokenType.StartObject)
            {
                throw new JsonException();
            }

            Type valueType = null;
            object value = null;

            while (reader.Read())
            {
                if (reader.TokenType == JsonTokenType.EndObject)
                {
                    break;
                }

                if (reader.TokenType != JsonTokenType.PropertyName)
                {
                    throw new JsonException();
                }

                string propertyName = reader.GetString();
                reader.Read();

                if (propertyName == "type")
                {
                    valueType = Type.GetType(reader.GetString());
                }
                else if (propertyName == "value")
                {
                    value = JsonSerializer.Deserialize(ref reader, valueType, options);
                }
                else
                {
                    reader.Skip();
                }
            }

            if (valueType == null || value == null)
            {
                throw new JsonException();
            }

            Type componentParameterType = typeof(ComponentParameter<>).MakeGenericType(valueType);
            return (IComponentParameter)Activator.CreateInstance(componentParameterType, value);
        }

        public override void Write(Utf8JsonWriter writer, IComponentParameter value, JsonSerializerOptions options)
        {
            writer.WriteStartObject();
            writer.WritePropertyName("type");
            var (type, obj) = value.GetValWithType();
            writer.WriteStringValue(type.ToString());
            writer.WritePropertyName("value");
            JsonSerializer.Serialize(writer, obj, type, options);
            writer.WriteEndObject();
        }
    }
}
