using ADArCWebApp.Shared;
using ADArCWebApp.Shared.Components;

namespace ADArCWebApp.ComponentNamespace
{


	public static class ComponentDeclarations
	{
		public static Dictionary<int, ComponentData> components = new()
		{
			/* Future stuff. basic impls in, missing complex impls.
			 * {2, new ComponentDataBuilder().Property("name", "LED").Property("directoryPath", "Output/LED").Property("enabled", true).Property("type", typeof(RazorLED)).Property("mainValue", typeof(RazorLED).GetProperty("value")).Property("translation", ()=>(not quite sure tbh, reflect? probably some js method to go to mainValue and change it1+1)).Finish() },
				{3, new ComponentDataBuilder().Property("name", "LCD1602 - I2C").Property("directoryPath", "Output/LCD").Property("enabled", true).Property("type", typeof(RazorLCD1602)).Property("mainValue", typeof(RazorLCD1602).GetProperty("text")).Finish() }
			*/
			{1, new ComponentDataBuilder("Arduino Uno Rev3", "", typeof(int), false, "Arduino").Finish() },
			{2, new ComponentDataBuilder("Arduino MEGA 2560", "", typeof(int), false, "Arduino").Finish() },
			{3, new ComponentDataBuilder("Arduino Uno WIFI Rev2", "", typeof(int), false, "Arduino").Finish() },
			{4, new ComponentDataBuilder("Pushbutton", "", typeof(int), false, "Input/Buttons and Switches").Finish() },
			{5, new ComponentDataBuilder("Switch", "", typeof(int), false, "Input/Buttons and Switches").Finish() },
			{6, new ComponentDataBuilder("ADXL345", "", typeof(int), false, "Input/Acceleration Sensors").Finish() },
			{7, new ComponentDataBuilder("MPU6050", "", typeof(int), false, "Input/Acceleration Sensors").Finish() },
			{8, new ComponentDataBuilder("BNO-055", "", typeof(int), false, "Input/Acceleration Sensors").Finish() },
			{9, new ComponentDataBuilder("TF-Luna Lidar - I2C", "", typeof(int), false, "Input/Distance Sensors").Finish() },
			{10, new ComponentDataBuilder("TF-Luna Lidar - Serial", "", typeof(int), false, "Input/Distance Sensors").Finish() },
			{11, new ComponentDataBuilder("Distance sensor - RPLIDAR-A1 Lidar", "", typeof(int), false, "Input/Distance Sensors").Finish() },
			{12, new ComponentDataBuilder("Ultrasonic sensor - HC-SR04", "", typeof(int), false, "Input/Distance Sensors").Finish() },
			{13, new ComponentDataBuilder("GP2Y0A21YK0F IR Distance Sensor", "", typeof(int), false, "Input/Distance Sensors").Finish() },
			{14, new ComponentDataBuilder("MQ-3", "", typeof(int), false, "Input/Gas Sensors").Finish() },
			{15, new ComponentDataBuilder("SGP41", "", typeof(int), false, "Input/Gas Sensors").Finish() },
			{16, new ComponentDataBuilder("KY-018 LDR sensor", "", typeof(int), false, "Input/Light Sensors").Finish() },
			{17, new ComponentDataBuilder("BH1750 Ambient Light Sensor", "", typeof(int), false, "Input/Light Sensors").Finish() },
			{18, new ComponentDataBuilder("TSL2561 Luminosity Sensor", "", typeof(int), false, "Input/Light Sensors").Finish() },
			{19, new ComponentDataBuilder("TEMT6000 Ambient Light Sensor", "", typeof(int), false, "Input/Light Sensors").Finish() },
			{20, new ComponentDataBuilder("DHT11/DHT22 ", "", typeof(int), false, "Input/Temperature and Humidity Sensors").Finish() },
			{21, new ComponentDataBuilder("SHT31 Temperature & Humidity Sensor", "", typeof(int), false, "Input/Temperature and Humidity Sensors").Finish() },
			{22, new ComponentDataBuilder("DS18B20", "", typeof(int), false, "Input/Temperature and Humidity Sensors").Finish() },
			{23, new ComponentDataBuilder("Hall effect - KY-024", "", typeof(int), false, "Input/Other Sensors").Finish() },
			{24, new ComponentDataBuilder("Hall effect - KY-003", "", typeof(int), false, "Input/Other Sensors").Finish() },
			{25, new ComponentDataBuilder("Hall effect - KY-004", "", typeof(int), false, "Input/Other Sensors").Finish() },
			{26, new ComponentDataBuilder("K-Thermocouple - MAX6675", "", typeof(int), false, "Input/Other Sensors").Finish() },
			{27, new ComponentDataBuilder("PIR motion sensor - HC-SR501", "", typeof(int), false, "Input/Other Sensors").Finish() },
			{28, new ComponentDataBuilder("IR receiver - KY-022", "", typeof(int), false, "Input/Other Sensors").Finish() },
			{29, new ComponentDataBuilder("SD Card Reader", "", typeof(int), false, "Input/Other Sensors").Finish() },
			{30, new ComponentDataBuilder("Load Cell(HX711) - TAL221", "", typeof(int), false, "Input/Other Sensors").Finish() },
			{31, new ComponentDataBuilder("LED", "", typeof(RazorLED), true, "Output/LED").Finish() },
			{32, new ComponentDataBuilder("LED 7-segment - Adafruit 0.56''", "", typeof(int), false, "Output/LED").Finish() },
			{33, new ComponentDataBuilder("LED bar - Adafruit Bi-Color 24 Bargraph", "", typeof(int), false, "Output/LED").Finish() },
			{34, new ComponentDataBuilder("LED matrix - MAX7219/MAX7221", "", typeof(int), false, "Output/LED").Finish() },
			{35, new ComponentDataBuilder("LED matrix - HT16K33", "", typeof(int), false, "Output/LED").Finish() },
			{36, new ComponentDataBuilder("LED RGB", "", typeof(int), false, "Output/LED").Finish() },
			{37, new ComponentDataBuilder("LED RGB - KY-009", "", typeof(int), false, "Output/LED").Finish() },
			{38, new ComponentDataBuilder("Laser LED", "", typeof(int), false, "Output/LED").Finish() },
			{39, new ComponentDataBuilder("LCD2004", "", typeof(int), false, "Output/Displays/LCD").Finish() },
			{40, new ComponentDataBuilder("LCD2004 - I2C", "", typeof(int), false, "Output/Displays/LCD").Finish() },
			{41, new ComponentDataBuilder("LCD1602", "", typeof(RazorLCD1602), true, "Output/Displays/LCD").Finish() },
			{42, new ComponentDataBuilder("LCD1602 - I2C", "", typeof(int), false, "Output/Displays/LCD").Finish() },
			{43, new ComponentDataBuilder("SH1106 OLED - SPI", "", typeof(int), false, "Output/Displays/OLED").Finish() },
			{44, new ComponentDataBuilder("SH1106 OLED - I2C", "", typeof(int), false, "Output/Displays/OLED").Finish() },
			{45, new ComponentDataBuilder("SG90", "", typeof(int), false, "Output/Motors/Servo Motor").Finish() },
			{46, new ComponentDataBuilder("DS-7001HV", "", typeof(int), false, "Output/Motors/Servo Motor").Finish() },
			{47, new ComponentDataBuilder("Direct", "", typeof(int), false, "Output/Motors/Servo Motor").Finish() },
			{48, new ComponentDataBuilder("PCA9685", "", typeof(int), false, "Output/Motors/Servo Motor").Finish() },
			{49, new ComponentDataBuilder("direct", "", typeof(int), false, "Output/Motors/DC Motor").Finish() },
			{50, new ComponentDataBuilder("DRV8833", "", typeof(int), false, "Output/Motors/DC Motor").Finish() },
			{51, new ComponentDataBuilder("L293D", "", typeof(int), false, "Output/Motors/DC Motor").Finish() },
			{52, new ComponentDataBuilder("L298N", "", typeof(int), false, "Output/Motors/DC Motor").Finish() },
			{53, new ComponentDataBuilder("Brushless ESC", "", typeof(int), false, "Output/Motors/DC Motor").Finish() },
			{54, new ComponentDataBuilder("28BYJ-48", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{55, new ComponentDataBuilder("Nema-17", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{56, new ComponentDataBuilder("A4988", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{57, new ComponentDataBuilder("DRV8825", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{58, new ComponentDataBuilder("DRV8833", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{59, new ComponentDataBuilder("L293D", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{60, new ComponentDataBuilder("L298N", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{61, new ComponentDataBuilder("L9910", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{62, new ComponentDataBuilder("TB6600", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{63, new ComponentDataBuilder("TB6612", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{64, new ComponentDataBuilder("TMC2208", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{65, new ComponentDataBuilder("ULN2003", "", typeof(int), false, "Output/Motors/Stepper Motor").Finish() },
			{66, new ComponentDataBuilder("Speaker - LM386", "", typeof(int), false, "Output/Others").Finish() },
			{67, new ComponentDataBuilder("Buzzer", "", typeof(int), false, "Output/Others").Finish() },
			{68, new ComponentDataBuilder("Encoder - E6B2-CWZ3E", "", typeof(int), false, "Others").Finish() },
			{69, new ComponentDataBuilder("Voltage regulator - LM2596", "", typeof(int), false, "Others").Finish() },
			{70, new ComponentDataBuilder("Bluetooth Module - HM-10", "", typeof(int), false, "Others").Finish() }
		};

	}
}