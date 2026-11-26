using System;
using System.Collections.Generic;

namespace ADArCWebApp.Shared
{
    /// <summary>
    /// Centralized registry resolving ADArC components and identifiers to verified documentation URLs.
    /// Decouples UI view templates from documentation link routing.
    /// </summary>
    public static class DocumentationMap
    {
        public static string BaseUrl { get; set; } = "https://adarc-help.mech.website";

        /// <summary>
        /// Fallback slug mapping supporting gsNodeName, part numbers, legacy names, or chip models.
        /// Uses case-insensitive comparison and indexer assignment syntax to safely overwrite duplicate keys.
        /// </summary>
        public static readonly Dictionary<string, string> Map = new(StringComparer.OrdinalIgnoreCase)
        {
            // Microcontrollers
            ["Uno Rev3"] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1",
            ["Rev 3"] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1",
            ["arduinoUnoRev3"] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1",
            ["MEGA 2560"] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1",
            ["arduinoMega"] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1",
            ["Uno WIFI Rev2"] = "unoWifi_pinout.html#d38361e767",

            // Acceleration Sensors
            ["ADXL345"] = "adxl345_topic.html#d38361e7520",
            ["MPU6050"] = "mpu6050_topic.html#d38361e8239",
            ["BNO055"] = "bno055_topic.html#styler-id1.1.1.2.8.8.8.1",
            ["BNO-055"] = "bno055_topic.html#styler-id1.1.1.2.8.8.8.1",

            // Distance Sensors
            ["TF-Luna"] = "tfLuna.html#styler-id1.1.1.2.8.10.9.1",
            ["tfLunaLidarI2C"] = "tfLuna.html#styler-id1.1.1.2.8.10.9.1",
            ["HC-SR04"] = "hc_sr04.html#styler-id1.1.1.2.8.10.7.1",
            ["hcsr04"] = "hc_sr04.html#styler-id1.1.1.2.8.10.7.1",
            ["Ultrasonic"] = "hc_sr04.html#styler-id1.1.1.2.8.10.7.1",
            ["VL53L4CD"] = "distanceSensors.html#styler-id1.1.1.2.8.10.1",
            ["tof"] = "distanceSensors.html#styler-id1.1.1.2.8.10.1",
            ["VL53L0X"] = "distanceSensors.html#styler-id1.1.1.2.8.10.1",
            ["FC-51"] = "infraredDistance.html#styler-id1.1.1.2.8.10.8.1",
            ["irdetector"] = "infraredDistance.html#styler-id1.1.1.2.8.10.8.1",

            // Gas & Air Quality
            ["MQ-3"] = "mq3.html#styler-id1.1.1.2.8.11.7.1",
            ["SEN0219"] = "gasSensors.html#styler-id1.1.1.2.8.11.1",
            ["PMS5003"] = "sensors_modules.html#styler-id1.1.1.2.8.1",
            ["pms5003"] = "sensors_modules.html#styler-id1.1.1.2.8.1",
            ["J305B"] = "sensors_modules.html#styler-id1.1.1.2.8.1",
            ["GP2Y1014AU0F"] = "sensors_modules.html#styler-id1.1.1.2.8.1",
            ["SGP40"] = "sgp41.html#styler-id1.1.1.2.8.11.8.1",
            ["SGP41"] = "sgp41.html#styler-id1.1.1.2.8.11.8.1",

            // Light & Optical
            ["KY-018"] = "ldr.html#styler-id1.1.1.2.8.12.7.1",
            ["KY-018 LDR"] = "ldr.html#styler-id1.1.1.2.8.12.7.1",
            ["SEN0189"] = "lightSensors.html#styler-id1.1.1.2.8.12.1",

            // Temperature & Humidity
            ["MAX6675"] = "ThermoMax6675.html#styler-id1.1.1.2.8.14.9.1",
            ["K-Thermocouple"] = "ThermoMax6675.html#styler-id1.1.1.2.8.14.9.1",
            ["SHT30"] = "sht31.html#styler-id1.1.1.2.8.13.9.1",
            ["SHT31"] = "sht31.html#styler-id1.1.1.2.8.13.9.1",
            ["DHT11"] = "dht11.html#styler-id1.1.1.2.8.13.7.1",
            ["DHT22"] = "dht11.html#styler-id1.1.1.2.8.13.7.1",
            ["DHT22 Module"] = "dht11.html#styler-id1.1.1.2.8.13.7.1",
            ["dht22module"] = "dht11.html#styler-id1.1.1.2.8.13.7.1",
            ["DHT11 / DHT22"] = "dht11.html#styler-id1.1.1.2.8.13.7.1",
            ["DS18B20"] = "ds18b20.html#styler-id1.1.1.2.8.13.8.1",
            ["MAX31856"] = "temperatureAndHumidity.html#styler-id1.1.1.2.8.13.1",
            ["AMG8833"] = "temperatureAndHumidity.html#styler-id1.1.1.2.8.13.1",

            // Other Sensors & Communication
            ["KY-024"] = "ky024_task.html",
            ["KY-003"] = "ky003_task.html",
            ["Hall Effect"] = "hallEffect.html#styler-id1.1.1.2.8.14.7.1",
            ["HC-SR501"] = "pir.html#styler-id1.1.1.2.8.14.8.1",
            ["hcsr501"] = "pir.html#styler-id1.1.1.2.8.14.8.1",
            ["PIR motion sensor"] = "pir.html#styler-id1.1.1.2.8.14.8.1",
            ["KY-022"] = "remoteControl.html#styler-id1.1.1.2.8.14.10.1",
            ["IR receiver"] = "remoteControl.html#styler-id1.1.1.2.8.14.10.1",
            ["TAL221"] = "strainGaugeLoadCell.html#styler-id1.1.1.2.8.14.12.1",
            ["HX711"] = "strainGaugeLoadCell.html#styler-id1.1.1.2.8.14.12.1",
            ["Load Cell(HX711)"] = "strainGaugeLoadCell.html#styler-id1.1.1.2.8.14.12.1",
            ["SRV-PH"] = "sensors_modules.html#styler-id1.1.1.2.8.1",
            ["SEN0114"] = "sensors_modules.html#styler-id1.1.1.2.8.1",
            ["PA1616S"] = "sensors_modules.html#styler-id1.1.1.2.8.1",
            ["gps"] = "sensors_modules.html#styler-id1.1.1.2.8.1",
            ["RS-485"] = "sensors_modules.html#styler-id1.1.1.2.8.1",
            ["npk"] = "sensors_modules.html#styler-id1.1.1.2.8.1",
            ["nRF24L01"] = "bluetoothAndWifi.html#styler-id1.1.1.2.8.9.1",
            ["transceiver"] = "bluetoothAndWifi.html#styler-id1.1.1.2.8.9.1",
            ["MPS20N0040D"] = "sensors_modules.html#styler-id1.1.1.2.8.1",

            // Output / Displays & LEDs
            ["LED"] = "LED.html#styler-id1.1.1.2.8.7.9.1",
            ["RGB"] = "rgdLed.html#RGBLEDModules-4A304018",
            ["RGB LED"] = "rgdLed.html#RGBLEDModules-4A304018",
            ["RGB module"] = "rgdLed.html#RGBLEDModules-4A304018",
            ["KY-008"] = "LED.html#styler-id1.1.1.2.8.7.9.1",
            ["Laser LED"] = "LED.html#styler-id1.1.1.2.8.7.9.1",
            ["Laser Diode"] = "LED.html#styler-id1.1.1.2.8.7.9.1",
            ["LCD1602"] = "lcd1602.html#LCDModule-493015CA",
            ["LCD1602 - I2C"] = "lcd1602.html#LCDModule-493015CA",
            ["LCD2004"] = "lcd2004.html#LCD2004Modules-49BD4324",
            ["LCD2004 - I2C"] = "lcd2004.html#LCD2004Modules-49BD4324",
            ["SSD1306"] = "OLED.html#styler-id1.1.1.2.8.7.8.1",
            ["7 - segment"] = "7-Segment.html#d38361e6407",
            ["7-Segment"] = "7-Segment.html#d38361e6407",
            ["Bar"] = "ledBar.html#LEDBarGraphModules-4ABFAB6B",
            ["Matrix"] = "ledMatrix.html#LEDMatrix-4A2C438B",

            // Output / Motors & Drivers
            ["SG90"] = "ServoMotors.html#styler-id1.1.1.2.9.7.1",
            ["servo"] = "ServoMotors.html#styler-id1.1.1.2.9.7.1",
            ["Direct - SG90"] = "ServoMotors.html#styler-id1.1.1.2.9.7.1",
            ["SG90/PCA9685"] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",
            ["Driver - SG90"] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",
            ["PCA9685"] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",
            ["Direct - Motor"] = "motors.html#styler-id1.1.1.2.9.1",
            ["Driver - Motor"] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",
            ["L298N"] = "L298driver_1.html#styler-id1.1.1.2.9.12.11.1",
            ["TB6612FNG"] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",
            ["Brushless motor and ESC"] = "brushlessDcMotor_datasheet.html#styler-id1.1.1.2.9.10.8.1",
            ["Brushless ESC - Motor"] = "brushlessDcMotor_datasheet.html#styler-id1.1.1.2.9.10.8.1",
            ["esc_pca9685"] = "brushlessDcMotor_datasheet.html#styler-id1.1.1.2.9.10.8.1",
            ["ULN2003"] = "uln2003.html#styler-id1.1.1.2.9.12.16.1",
            ["28BYJ-48/ULN2003"] = "uln2003.html#styler-id1.1.1.2.9.12.16.1",
            ["28BYJ-48"] = "steppers_concept.html#styler-id1.1.1.2.9.9.1",
            ["Nema-17"] = "steppers_concept.html#styler-id1.1.1.2.9.9.1",
            ["SRD-05VDC-SL-C"] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",
            ["relay"] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",

            // Input / Buttons & Sound
            ["Push Button"] = "inputs.html",
            ["arcadePushButton"] = "inputs.html",
            ["KY-012"] = "inputs.html",
            ["SD Card Reader"] = "SD_CardReader.html#styler-id1.1.1.2.8.14.11.1",
            ["Bluetooth Module"] = "bluetoothAndWifi.html#styler-id1.1.1.2.8.9.1"
        };

        /// <summary>
        /// Resolves the absolute documentation URL for a given ComponentData.
        /// Resolution priority:
        /// 1. ComponentData.DocumentationPath (declared via [ComponentDocumentation] attribute).
        /// 2. Node name (gsNodeName) in fallback Map.
        /// 3. Palette hover text (paneHoverText) in fallback Map.
        /// 4. User-facing component name in fallback Map.
        /// 5. BaseUrl fallback if unmapped.
        /// </summary>
        /// <param name="compData">The component template metadata to resolve documentation for.</param>
        /// <returns>A fully qualified documentation URL.</returns>
        public static string ResolveUrl(ComponentData? compData)
        {
            if (compData == null)
            {
                Console.WriteLine($"[DocumentationMap] Warning: Null ComponentData provided to ResolveUrl. Falling back to BaseUrl '{BaseUrl}'.");
                return BaseUrl;
            }

            // Primary resolution: metadata declared via [ComponentDocumentation]
            if (!string.IsNullOrWhiteSpace(compData.DocumentationPath))
            {
                return CombineUrl(BaseUrl, compData.DocumentationPath);
            }

            // Secondary resolution: match against gsNodeName
            if (!string.IsNullOrWhiteSpace(compData.nodeName) && Map.TryGetValue(compData.nodeName, out var nodePath))
                return CombineUrl(BaseUrl, nodePath);

            // Tertiary resolution: match against paneHoverText
            if (!string.IsNullOrWhiteSpace(compData.paneHoverText) && Map.TryGetValue(compData.paneHoverText, out var hoverPath))
                return CombineUrl(BaseUrl, hoverPath);

            // Quaternary resolution: match against component display name
            if (!string.IsNullOrWhiteSpace(compData.name) && Map.TryGetValue(compData.name, out var namePath))
                return CombineUrl(BaseUrl, namePath);

            Console.WriteLine($"[DocumentationMap] Warning: Component '{compData.name}' ({compData.nodeName}) has no mapped documentation target. Falling back to BaseUrl '{BaseUrl}'.");
            return BaseUrl;
        }

        /// <summary>
        /// Resolves the absolute documentation URL for a given component GlobalId.
        /// Looks up the ComponentData instance from ComponentDeclarations.Components.
        /// </summary>
        /// <param name="globalId">The numeric global identifier registered in ComponentDeclarations.</param>
        /// <returns>A fully qualified documentation URL.</returns>
        public static string ResolveUrl(int globalId)
        {
            if (ComponentDeclarations.Components.TryGetValue(globalId, out var compData))
            {
                return ResolveUrl(compData);
            }

            Console.WriteLine($"[DocumentationMap] Warning: Component GlobalId '{globalId}' was not found in ComponentDeclarations. Falling back to BaseUrl '{BaseUrl}'.");
            return BaseUrl;
        }

        /// <summary>
        /// Resolves the absolute documentation URL for a given ComponentInstance, safely handling nulls.
        /// Delegates to the attached ComponentData if available, otherwise falls back to GlobalId.
        /// </summary>
        /// <param name="instance">The component instance on the canvas or palette.</param>
        /// <returns>A fully qualified documentation URL.</returns>
        public static string ResolveUrl(ComponentInstance? instance)
        {
            if (instance == null)
            {
                Console.WriteLine($"[DocumentationMap] Warning: Null ComponentInstance provided to ResolveUrl. Falling back to BaseUrl '{BaseUrl}'.");
                return BaseUrl;
            }

            if (instance.Data != null)
            {
                return ResolveUrl(instance.Data);
            }

            return ResolveUrl(instance.GlobalId);
        }

        /// <summary>
        /// Resolves the absolute documentation URL for a given identifier string (name, hover text, or slug).
        /// Uses case-insensitive lookup in the fallback Map.
        /// </summary>
        /// <param name="identifier">Arbitrary identifier such as node name, hover text, or chip model.</param>
        /// <returns>A fully qualified documentation URL.</returns>
        public static string ResolveUrl(string? identifier)
        {
            if (string.IsNullOrWhiteSpace(identifier))
            {
                Console.WriteLine($"[DocumentationMap] Warning: Null or empty identifier provided to ResolveUrl. Falling back to BaseUrl '{BaseUrl}'.");
                return BaseUrl;
            }

            if (Map.TryGetValue(identifier.Trim(), out var path) && !string.IsNullOrWhiteSpace(path))
            {
                return CombineUrl(BaseUrl, path);
            }

            Console.WriteLine($"[DocumentationMap] Warning: Component identifier '{identifier}' has no mapped documentation target. Falling back to BaseUrl '{BaseUrl}'.");
            return BaseUrl;
        }

        /// <summary>
        /// Helper method to safely combine a base URL and a relative or absolute path fragment.
        /// </summary>
        private static string CombineUrl(string baseUrl, string relativeOrAbsolute)
        {
            if (string.IsNullOrWhiteSpace(relativeOrAbsolute))
                return baseUrl;

            if (relativeOrAbsolute.StartsWith("http://", StringComparison.OrdinalIgnoreCase) ||
                relativeOrAbsolute.StartsWith("https://", StringComparison.OrdinalIgnoreCase))
            {
                return relativeOrAbsolute;
            }

            var cleanBase = baseUrl.TrimEnd('/');
            var cleanRelative = relativeOrAbsolute.TrimStart('/');
            return $"{cleanBase}/{cleanRelative}";
        }
    }
}
