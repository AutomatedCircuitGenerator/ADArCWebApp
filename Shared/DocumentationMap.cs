using System;
using System.Collections.Generic;

namespace ADArCWebApp.Shared
{
    /// <summary>
    /// Centralized registry resolving ADArC component identifiers to verified documentation URLs.
    /// Decouples UI view templates from documentation link routing.
    /// </summary>
    public static class DocumentationMap
    {
        public static string BaseUrl { get; set; } = "https://adarc-help.mech.website";

        /// <summary>
        /// Exact route mapping keyed by ComponentData ID (ComponentDeclarations.Components primary key).
        /// Uses indexer assignment syntax to safely overwrite any accidental duplicate keys.
        /// </summary>
        private static readonly Dictionary<int, string> ComponentDocPaths = new()
        {
            // Microcontrollers
            [1] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1", // Uno Rev3
            [2] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1", // MEGA 2560
            
            // Acceleration Sensors
            [3] = "adxl345_topic.html#d38361e7520",                                       // 3-Axis (ADXL345)
            [4] = "mpu6050_topic.html#d38361e8239",                                       // 6-DoF with Gyro (MPU6050)
            [5] = "bno055_topic.html#styler-id1.1.1.2.8.8.8.1",                           // 9-DoF IMU (BNO055)
            
            // Distance Sensors
            [6] = "tfLuna.html#styler-id1.1.1.2.8.10.9.1",                                // TF-Luna Time-of-Flight
            [8] = "hc_sr04.html#styler-id1.1.1.2.8.10.7.1",                               // Ultrasonic (HC-SR04)
            [38] = "distanceSensors.html#styler-id1.1.1.2.8.10.1",                        // Time-of-Flight (VL53L4CD)
            [40] = "distanceSensors.html#styler-id1.1.1.2.8.10.1",                        // Time-of-Flight (VL53L0X)
            [42] = "infraredDistance.html#styler-id1.1.1.2.8.10.8.1",                     // IR Obstacle Avoidance (FC-51)
            
            // Gas & Air Quality
            [9] = "mq3.html#styler-id1.1.1.2.8.11.7.1",                                   // Alcohol (MQ-3)
            [46] = "gasSensors.html#styler-id1.1.1.2.8.11.1",                             // CO2 (SEN0219)
            [47] = "sgp41.html#styler-id1.1.1.2.8.11.8.1",                                // Air Quality (PMS5003)
            [48] = "sensors_modules.html#styler-id1.1.1.2.8.1",                           // Geiger Counter (J305B)
            [49] = "sensors_modules.html#styler-id1.1.1.2.8.1",                           // Dust (GP2Y1014AU0F)
            [53] = "sgp41.html#styler-id1.1.1.2.8.11.8.1",                                // VoC Air Quality (SGP40)
            
            // Light & Optical
            [10] = "ldr.html#styler-id1.1.1.2.8.12.7.1",                                  // Photoresistor (KY-018)
            [31] = "lightSensors.html#styler-id1.1.1.2.8.12.1",                           // Turbidity (SEN0189)
            
            // Temperature & Humidity
            [14] = "ThermoMax6675.html#styler-id1.1.1.2.8.14.9.1",                        // K-Type Thermocouple (MAX6675)
            [34] = "sht31.html#styler-id1.1.1.2.8.13.9.1",                                // Digital Temp & Humidity (SHT30)
            [35] = "dht11.html#styler-id1.1.1.2.8.13.7.1",                                // Temp & Humidity (DHT22)
            [36] = "temperatureAndHumidity.html#styler-id1.1.1.2.8.13.1",                // T-Type Thermocouple (MAX31856)
            [44] = "dht11.html#styler-id1.1.1.2.8.13.7.1",                                // Temp & Humidity Module (DHT22)
            [45] = "dht11.html#styler-id1.1.1.2.8.13.7.1",                                // Basic Temp & Humidity (DHT11)
            [50] = "temperatureAndHumidity.html#styler-id1.1.1.2.8.13.1",                // IR Thermal Camera (AMG8833)
            
            // Other Sensors & Communication
            [12] = "ky024_task.html",                                                     // Hall Effect (KY-024)
            [13] = "ky003_task.html",                                                     // Hall Effect (KY-003)
            [15] = "pir.html#styler-id1.1.1.2.8.14.8.1",                                  // PIR Motion (HC-SR501)
            [16] = "remoteControl.html#styler-id1.1.1.2.8.14.10.1",                       // IR Receiver (KY-022)
            [17] = "strainGaugeLoadCell.html#styler-id1.1.1.2.8.14.12.1",                 // Load Cell with HX711 ADC (TAL221)
            [32] = "sensors_modules.html#styler-id1.1.1.2.8.1",                           // Analog pH Meter (SRV-PH)
            [33] = "sensors_modules.html#styler-id1.1.1.2.8.1",                           // Soil Moisture (SEN0114)
            [37] = "sensors_modules.html#styler-id1.1.1.2.8.1",                           // Ultimate GPS (PA1616S)
            [39] = "sensors_modules.html#styler-id1.1.1.2.8.1",                           // Soil NPK (RS-485)
            [41] = "bluetoothAndWifi.html#styler-id1.1.1.2.8.9.1",                        // 2.4 GHz Transceiver (nRF24L01)
            [51] = "sensors_modules.html#styler-id1.1.1.2.8.1",                           // Pressure with ADC (MPS20N0040D)
            
            // Output / Displays & LEDs
            [18] = "LED.html#styler-id1.1.1.2.8.7.9.1",                                   // LED
            [20] = "rgdLed.html#RGBLEDModules-4A304018",                                  // RGB LED
            [21] = "LED.html#styler-id1.1.1.2.8.7.9.1",                                   // Laser Diode (KY-008)
            [22] = "lcd1602.html#LCDModule-493015CA",                                     // 16x2 Character LCD (LCD1602)
            [43] = "OLED.html#styler-id1.1.1.2.8.7.8.1",                                  // OLED (SSD1306)
            
            // Output / Motors & Drivers
            [23] = "ServoMotors.html#styler-id1.1.1.2.9.7.1",                             // Servo (SG90)
            [24] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",                           // Servo with driver (PCA9685)
            [25] = "L298driver_1.html#styler-id1.1.1.2.9.12.11.1",                       // Brushed DC Motor with Driver (L298N)
            [26] = "brushlessDcMotor_datasheet.html#styler-id1.1.1.2.9.10.8.1",           // Brushless motor and ESC
            [27] = "uln2003.html#styler-id1.1.1.2.9.12.16.1",                             // Stepper Motor with Driver (ULN2003)
            [52] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",                           // 1-Channel Relay
            
            // Input / Buttons & Sound
            [29] = "inputs.html",                                                         // Arcade Push Button
            [30] = "inputs.html"                                                          // Active buzzer (KY-012)
        };

        /// <summary>
        /// Fallback slug mapping supporting part numbers, legacy names, or chip models.
        /// Uses case-insensitive comparison and indexer assignment syntax to safely overwrite duplicate keys.
        /// </summary>
        public static readonly Dictionary<string, string> Map = new(StringComparer.OrdinalIgnoreCase)
        {
            ["Uno Rev3"] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1",
            ["Rev 3"] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1",
            ["arduinoUnoRev3"] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1",
            ["MEGA 2560"] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1",
            ["arduinoMega"] = "default.htm?startat=/arduino_concept.html&hash=styler-id1.1.1.2.7.7.1",
            ["Uno WIFI Rev2"] = "unoWifi_pinout.html#d38361e767",
            ["ADXL345"] = "adxl345_topic.html#d38361e7520",
            ["MPU6050"] = "mpu6050_topic.html#d38361e8239",
            ["BNO055"] = "bno055_topic.html#styler-id1.1.1.2.8.8.8.1",
            ["BNO-055"] = "bno055_topic.html#styler-id1.1.1.2.8.8.8.1",
            ["TF-Luna"] = "tfLuna.html#styler-id1.1.1.2.8.10.9.1",
            ["HC-SR04"] = "hc_sr04.html#styler-id1.1.1.2.8.10.7.1",
            ["Ultrasonic"] = "hc_sr04.html#styler-id1.1.1.2.8.10.7.1",
            ["MQ-3"] = "mq3.html#styler-id1.1.1.2.8.11.7.1",
            ["KY-018"] = "ldr.html#styler-id1.1.1.2.8.12.7.1",
            ["KY-018 LDR"] = "ldr.html#styler-id1.1.1.2.8.12.7.1",
            ["KY-024"] = "ky024_task.html",
            ["KY-003"] = "ky003_task.html",
            ["Hall Effect"] = "hallEffect.html#styler-id1.1.1.2.8.14.7.1",
            ["MAX6675"] = "ThermoMax6675.html#styler-id1.1.1.2.8.14.9.1",
            ["K-Thermocouple"] = "ThermoMax6675.html#styler-id1.1.1.2.8.14.9.1",
            ["HC-SR501"] = "pir.html#styler-id1.1.1.2.8.14.8.1",
            ["PIR motion sensor"] = "pir.html#styler-id1.1.1.2.8.14.8.1",
            ["KY-022"] = "remoteControl.html#styler-id1.1.1.2.8.14.10.1",
            ["IR receiver"] = "remoteControl.html#styler-id1.1.1.2.8.14.10.1",
            ["IR Receiver"] = "remoteControl.html#styler-id1.1.1.2.8.14.10.1",
            ["TAL221"] = "strainGaugeLoadCell.html#styler-id1.1.1.2.8.14.12.1",
            ["HX711"] = "strainGaugeLoadCell.html#styler-id1.1.1.2.8.14.12.1",
            ["Load Cell(HX711)"] = "strainGaugeLoadCell.html#styler-id1.1.1.2.8.14.12.1",
            ["LED"] = "LED.html#styler-id1.1.1.2.8.7.9.1",
            ["RGB"] = "rgdLed.html#RGBLEDModules-4A304018",
            ["RGB LED"] = "rgdLed.html#RGBLEDModules-4A304018",
            ["RGB module"] = "rgdLed.html#RGBLEDModules-4A304018",
            ["Laser LED"] = "LED.html#styler-id1.1.1.2.8.7.9.1",
            ["Laser Diode"] = "LED.html#styler-id1.1.1.2.8.7.9.1",
            ["LCD1602"] = "lcd1602.html#LCDModule-493015CA",
            ["LCD1602 - I2C"] = "lcd1602.html#LCDModule-493015CA",
            ["LCD2004"] = "lcd2004.html#LCD2004Modules-49BD4324",
            ["LCD2004 - I2C"] = "lcd2004.html#LCD2004Modules-49BD4324",
            ["7 - segment"] = "7-Segment.html#d38361e6407",
            ["7-Segment"] = "7-Segment.html#d38361e6407",
            ["Bar"] = "ledBar.html#LEDBarGraphModules-4ABFAB6B",
            ["Matrix"] = "ledMatrix.html#LEDMatrix-4A2C438B",
            ["SG90"] = "ServoMotors.html#styler-id1.1.1.2.9.7.1",
            ["Direct - SG90"] = "ServoMotors.html#styler-id1.1.1.2.9.7.1",
            ["Driver - SG90"] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",
            ["PCA9685"] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",
            ["Direct - Motor"] = "motors.html#styler-id1.1.1.2.9.1",
            ["Driver - Motor"] = "motorDrivers.html#styler-id1.1.1.2.9.12.1",
            ["L298N"] = "L298driver_1.html#styler-id1.1.1.2.9.12.11.1",
            ["Brushless ESC - Motor"] = "brushlessDcMotor_datasheet.html#styler-id1.1.1.2.9.10.8.1",
            ["ULN2003"] = "uln2003.html#styler-id1.1.1.2.9.12.16.1",
            ["28BYJ-48"] = "steppers_concept.html#styler-id1.1.1.2.9.9.1",
            ["Nema-17"] = "steppers_concept.html#styler-id1.1.1.2.9.9.1",
            ["DHT11"] = "dht11.html#styler-id1.1.1.2.8.13.7.1",
            ["DHT22"] = "dht11.html#styler-id1.1.1.2.8.13.7.1",
            ["DHT11 / DHT22"] = "dht11.html#styler-id1.1.1.2.8.13.7.1",
            ["SHT30"] = "sht31.html#styler-id1.1.1.2.8.13.9.1",
            ["SHT31"] = "sht31.html#styler-id1.1.1.2.8.13.9.1",
            ["DS18B20"] = "ds18b20.html#styler-id1.1.1.2.8.13.8.1",
            ["SSD1306"] = "OLED.html#styler-id1.1.1.2.8.7.8.1",
            ["SGP40"] = "sgp41.html#styler-id1.1.1.2.8.11.8.1",
            ["SGP41"] = "sgp41.html#styler-id1.1.1.2.8.11.8.1",
            ["SD Card Reader"] = "SD_CardReader.html#styler-id1.1.1.2.8.14.11.1",
            ["Bluetooth Module"] = "bluetoothAndWifi.html#styler-id1.1.1.2.8.9.1"
        };

        // Backward compatibility alias for internal lookups
        private static Dictionary<string, string> FallbackSlugPaths => Map;

        /// <summary>
        /// Resolves the absolute documentation URL for a given component GlobalId.
        /// </summary>
        public static string ResolveUrl(int globalId)
        {
            if (ComponentDocPaths.TryGetValue(globalId, out var path) && !string.IsNullOrWhiteSpace(path))
            {
                return CombineUrl(BaseUrl, path);
            }

            // Fallback: check if ComponentDeclarations has metadata for this id
            if (ComponentDeclarations.Components.TryGetValue(globalId, out var compData))
            {
                if (!string.IsNullOrWhiteSpace(compData.paneHoverText) && Map.TryGetValue(compData.paneHoverText, out var hoverPath))
                    return CombineUrl(BaseUrl, hoverPath);

                if (!string.IsNullOrWhiteSpace(compData.name) && Map.TryGetValue(compData.name, out var namePath))
                    return CombineUrl(BaseUrl, namePath);

                if (!string.IsNullOrWhiteSpace(compData.nodeName) && Map.TryGetValue(compData.nodeName, out var nodePath))
                    return CombineUrl(BaseUrl, nodePath);
            }

            Console.WriteLine($"[DocumentationMap] Warning: Component GlobalId '{globalId}' has no mapped documentation target. Falling back to BaseUrl '{BaseUrl}'.");
            return BaseUrl;
        }

        /// <summary>
        /// Resolves the absolute documentation URL for a given ComponentInstance, safely handling nulls.
        /// </summary>
        public static string ResolveUrl(ComponentInstance? instance)
        {
            if (instance == null)
            {
                Console.WriteLine($"[DocumentationMap] Warning: Null ComponentInstance provided to ResolveUrl. Falling back to BaseUrl '{BaseUrl}'.");
                return BaseUrl;
            }

            return ResolveUrl(instance.GlobalId);
        }

        /// <summary>
        /// Resolves the absolute documentation URL for a given identifier string (name, hover text, or slug).
        /// </summary>
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
