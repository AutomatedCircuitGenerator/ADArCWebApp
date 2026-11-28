using System.Reflection;
using ADArCWebApp.Shared.Components;
using ADArCWebApp.Shared.EnvironmentalSettings;

namespace ADArCWebApp.Shared
{
    public static class ComponentDeclarations
    {
        public static Dictionary<int, ComponentData> Components = new();
        public static Dictionary<Type, int> TypeToId = new();
        public static Dictionary<string, int> NameToId = new();

        /// <summary>
        /// Pinned permanent IDs for standard built-in components to ensure stability across builds.
        /// Any new component added in the future will automatically receive an ID starting from 51 onwards.
        /// </summary>
        private static readonly Dictionary<string, int> PinnedComponentIds = new()
        {
            { nameof(RazorArduinoUno), 1 },
            { nameof(RazorArduinoMega), 2 },
            { nameof(RazorRELAY), 3 },
            { nameof(RazorLCD1602I2C), 4 },
            { nameof(RazorTRANSCEIVER), 5 },
            { nameof(RazorADXL345I2C), 6 },
            { nameof(RazorMPU6050), 7 },
            { nameof(RazorBNO055), 8 },
            { nameof(RazorKY012), 9 },
            { nameof(RazorPMS5003), 10 },
            { nameof(RazorMQ3), 11 },
            { nameof(RazorSRVPH), 12 },
            { nameof(RazorArcadePushButton), 13 },
            { nameof(RazorDHT11), 14 },
            { nameof(RazorTB6612FNG), 15 },
            { nameof(RazorDCMotorL298N), 16 },
            { nameof(RazorESCBLDCMotor), 17 },
            { nameof(RazorSEN0219), 18 },
            { nameof(RazorSHT30), 19 },
            { nameof(RazorGP2Y1014AU0F), 20 },
            { nameof(RazorJ305B), 21 },
            { nameof(RazorKY003), 22 },
            { nameof(RazorKY024), 23 },
            { nameof(RazorIRDETECTOR), 24 },
            { nameof(RazorKY022), 25 },
            { nameof(RazorAMG8833), 26 },
            { nameof(RazorMAX6675), 27 },
            { nameof(RazorLED), 28 },
            { nameof(RazorKY008), 29 },
            { nameof(RazorHX711), 30 },
            { nameof(RazorSSD1306), 31 },
            { nameof(RazorHCSR501), 32 },
            { nameof(RazorKY018), 33 },
            { nameof(RazorMPS20N0040D), 34 },
            { nameof(RazorRGBLED), 35 },
            { nameof(RazorSG90), 36 },
            { nameof(RazorSG90PCA9685), 37 },
            { nameof(RazorSEN0114), 38 },
            { nameof(RazorNPK), 39 },
            { nameof(Razor_28BYJ48ULN2003), 40 },
            { nameof(RazorMAX31856), 41 },
            { nameof(RazorTFLunaLidarI2C), 42 },
            { nameof(RazorDHT22), 43 },
            { nameof(RazorDHT22MODULE), 44 },
            { nameof(RazorVL53L0X), 45 },
            { nameof(RazorTOF), 46 },
            { nameof(RazorSEN0189), 47 },
            { nameof(RazorGPS), 48 },
            { nameof(RazorHCSR04), 49 },
            { nameof(RazorSGP40), 50 }
        };

        /// <summary>
        /// Migration map translating pre-attribute legacy GlobalIds to the current attribute-system GlobalIds.
        /// </summary>
        public static readonly Dictionary<int, int> LegacyGlobalIdMap = new()
        {
            { 1, 1 },   // Uno
            { 2, 2 },   // Mega
            { 3, 6 },   // ADXL345I2C
            { 4, 7 },   // MPU6050
            { 5, 8 },   // BNO055
            { 6, 42 },  // TFLunaLidarI2C
            { 8, 49 },  // HCSR04
            { 9, 11 },  // MQ3
            { 10, 33 }, // KY018 Photoresistor
            { 12, 23 }, // KY024 Hall Effect
            { 13, 22 }, // KY003 Hall Effect
            { 14, 27 }, // MAX6675 Thermocouple
            { 15, 32 }, // HCSR501 PIR
            { 16, 25 }, // KY022 IR Receiver
            { 17, 30 }, // HX711 Load Cell
            { 18, 28 }, // LED
            { 20, 35 }, // RGB LED
            { 21, 29 }, // KY008 Laser Diode
            { 22, 4 },  // LCD1602I2C
            { 23, 36 }, // SG90 Servo
            { 24, 37 }, // SG90PCA9685
            { 25, 16 }, // DCMotorL298N
            { 26, 17 }, // ESCBLDCMotor
            { 27, 40 }, // 28BYJ48 Stepper
            { 29, 13 }, // Arcade Push Button
            { 30, 9 },  // KY012 Active Buzzer
            { 31, 47 }, // SEN0189 Turbidity
            { 32, 12 }, // SRVPH Analog pH
            { 33, 38 }, // SEN0114 Soil Moisture
            { 34, 19 }, // SHT30
            { 35, 43 }, // DHT22
            { 36, 41 }, // MAX31856
            { 37, 48 }, // GPS
            { 38, 46 }, // TOF (VL53L4CD)
            { 39, 39 }, // NPK
            { 40, 45 }, // VL53L0X
            { 41, 5 },  // TRANSCEIVER
            { 42, 24 }, // IRDETECTOR
            { 43, 31 }, // SSD1306 OLED
            { 44, 44 }, // DHT22MODULE
            { 45, 14 }, // DHT11
            { 46, 18 }, // SEN0219 CO2
            { 47, 10 }, // PMS5003 Air Quality
            { 48, 21 }, // J305B Geiger Counter
            { 49, 20 }, // GP2Y1014AU0F Dust
            { 50, 26 }, // AMG8833 Thermal Camera
            { 51, 34 }, // MPS20N0040D Pressure
            { 52, 3 },  // RELAY
            { 53, 50 }, // SGP40 VoC
            { 54, 15 }  // TB6612FNG
        };

        public static int MigrateLegacyGlobalId(int id)
        {
            return LegacyGlobalIdMap.TryGetValue(id, out var newId) ? newId : id;
        }

        public static void GenComponentList()
        {
            Components.Clear();
            TypeToId.Clear();
            NameToId.Clear();

            Components.Add(1, new ComponentDataBuilder(typeof(RazorArduinoUno)).Finish());
            Components.Add(2, new ComponentDataBuilder(typeof(RazorArduinoMega)).Finish());
            TypeToId[typeof(RazorArduinoUno)] = 1;
            TypeToId[typeof(RazorArduinoMega)] = 2;
            NameToId[nameof(RazorArduinoUno)] = 1;
            NameToId[nameof(RazorArduinoMega)] = 2;

            Type[] componentRazorClasses = Assembly.GetExecutingAssembly().GetTypes()
                .Where(t => t.GetCustomAttribute(typeof(ComponentAttribute)) != null 
                         && t != typeof(RazorArduinoUno) 
                         && t != typeof(RazorArduinoMega))
                .OrderBy(t => ((ComponentAttribute)t.GetCustomAttribute(typeof(ComponentAttribute))!).Name)
                .ToArray();

            int nextUnpinnedId = 51;

            foreach (Type type in componentRazorClasses)
            {
                int id = PinnedComponentIds.TryGetValue(type.Name, out var pinned) ? pinned : nextUnpinnedId++;
                Components[id] = new ComponentDataBuilder(type).Finish();
                TypeToId[type] = id;
                NameToId[type.Name] = id;
            }
        }
    }
}
