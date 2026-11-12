using ADArCWebApp.Shared.Components;
using ADArCWebApp.Shared.EnvironmentalSettings;

namespace ADArCWebApp.Shared
{
    /// <summary>
    /// Primary data repository. Figure out a way to do this dynamically or something later.
    /// 
    /// TODO: figure out how to improve this.
    /// TODO: DO NOT END CODE GEN LINES WITH COMMENTS!! Ensure there is a trailing newline
    /// </summary>
    public static class ComponentDeclarations
    {
        public static readonly Dictionary<int, ComponentData> Components = new()
        {
            {
                1,
                new ComponentDataBuilder(typeof(RazorArduinoUno)).Finish()
            },
            {
                2,
                new ComponentDataBuilder(typeof(RazorArduinoMega)).Finish()
            },
            {
                3,
                new ComponentDataBuilder(typeof(RazorADXL345I2C)).Finish()
            },
            {
                4,
                new ComponentDataBuilder(typeof(RazorMPU6050)).Finish()
            },
            {
                5,
                new ComponentDataBuilder(typeof(RazorBNO055)).Finish()
            },
            {
                6,
                new ComponentDataBuilder(typeof(RazorTFLunaLidarI2C)).Finish()
            },
            {
                8,
                new ComponentDataBuilder(typeof(RazorHCSR04)).Finish()
            },
            {
                9,
                new ComponentDataBuilder(typeof(RazorMQ3)).Finish()
            },
            {
                10,
                new ComponentDataBuilder(typeof(RazorKY018)).Finish()
            },
            {
                12,
                new ComponentDataBuilder(typeof(RazorKY024)).Finish()
            },
            {
                13,
                new ComponentDataBuilder(typeof(RazorKY003)).Finish()
            },
            {
                14,
                new ComponentDataBuilder(typeof(RazorMAX6675)).Finish()
            },
            {
                15,
                new ComponentDataBuilder(typeof(RazorHCSR501)).Finish()
            },
            {
                16,
                new ComponentDataBuilder(typeof(RazorKY022)).Finish()
            },
            {
                17,
                new ComponentDataBuilder(typeof(RazorHX711)).Finish()
            },
            {
                18,
                new ComponentDataBuilder(typeof(RazorLED)).Finish()
            },
            {
                20,
                new ComponentDataBuilder( typeof(RazorRGBLED)).Finish()
            }, 
            {
                21,
                new ComponentDataBuilder(typeof(RazorKY008)).Finish()
            },
            {
                22,
                new ComponentDataBuilder(typeof(RazorLCD1602I2C)).Finish()
            },
            {
                23,
                new ComponentDataBuilder( typeof(RazorSG90)).Finish()
            }, //change node and rule to sg90?
            {
                24,
                new ComponentDataBuilder(typeof(RazorSG90PCA9685)).Finish()
            },
            {
                25,
                new ComponentDataBuilder( typeof(RazorDCMotorL298N)) .Finish()
            },
            {
                26,
                new ComponentDataBuilder(typeof(RazorESCBLDCMotor)).Finish()
            }, 
            {
                27,
                new ComponentDataBuilder( typeof(Razor_28BYJ48ULN2003)).Finish()
            },
            {
                29,
                new ComponentDataBuilder(typeof(RazorArcadePushButton)).Finish()
            },
            {
                30,
                new ComponentDataBuilder( typeof(RazorKY012)).Finish()
            },
            {
                31,
                new ComponentDataBuilder(typeof(RazorSEN0189)).Finish()
            },
            {
                32,
                new ComponentDataBuilder(typeof(RazorSRVPH)).Finish()
            },
            {
                33,
                new ComponentDataBuilder(typeof(RazorSEN0114)).Finish()
            },
            {
                34,
                new ComponentDataBuilder(typeof(RazorSHT30)).Finish()
            },
            {
                35,
                new ComponentDataBuilder(typeof(RazorDHT22)).Finish()
            },
            {
                36,
                new ComponentDataBuilder(typeof(RazorMAX31856) ).Finish()
            },
            {
                38,
                new ComponentDataBuilder(typeof(RazorTOF)).Finish()
            },

            {
                41,
                new ComponentDataBuilder(typeof(RazorTRANSCEIVER)) .Finish()
            },
            {
                39,
                new ComponentDataBuilder(typeof(RazorNPK)).Finish()
            },
            {
                37,
                new ComponentDataBuilder(typeof(RazorGPS)).Finish()
            },
            {
                48,
                new ComponentDataBuilder(typeof(RazorJ305B)).Finish()
            },
            {
                44,
                new ComponentDataBuilder(typeof(RazorDHT22MODULE)).Finish()
            },
            {
                40,
                new ComponentDataBuilder(typeof(RazorVL53L0X)) .Finish()
            },
            {
                42,
                new ComponentDataBuilder(typeof(RazorIRDETECTOR)).Finish()
            },
            {
                43,
                new ComponentDataBuilder(typeof(RazorSSD1306)).Finish()
            },
            {
                45,
                new ComponentDataBuilder(typeof(RazorDHT11)).Finish()
            },
            {
                46,
                new ComponentDataBuilder( typeof(RazorSEN0219)).Finish()
            },
            {
                47,
                new ComponentDataBuilder(typeof(RazorPMS5003)) .Finish()
            },
            {
                49,
                new ComponentDataBuilder(typeof(RazorGP2Y1014AU0F)).Finish()
            },
            {
                50,
                new ComponentDataBuilder( typeof(RazorAMG8833)).Finish()
            },
            {
                51,
                new ComponentDataBuilder(typeof(RazorMPS20N0040D)).Finish()
            },
            {
                52,
                new ComponentDataBuilder(typeof(RazorRELAY)).Finish()
            },
            {
                53,
                new ComponentDataBuilder(typeof(RazorSGP40)) .Finish()
            },
            {
                54,
                new ComponentDataBuilder(typeof(RazorThermistor)).Finish()
            }
        };
    }
}
