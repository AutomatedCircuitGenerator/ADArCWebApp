using MinAVR.Shared;
using MinAVR.Shared.Components;

namespace MinAVR.ComponentNamespace
{


	public static class ComponentDeclarations
	{
		public static Dictionary<int, ComponentData> components = new()
		{
			/* Future stuff. basic impls in, missing complex impls.
			 * {2, new ComponentDataBuilder().Property("name", "LED").Property("directoryPath", "Output/LED").Property("enabled", true).Property("type", typeof(RazorLED)).Property("mainValue", typeof(RazorLED).GetProperty("value")).Property("translation", ()=>(not quite sure tbh, reflect? probably some js method to go to mainValue and change it1+1)).Finish() },
				{3, new ComponentDataBuilder().Property("name", "LCD1602 - I2C").Property("directoryPath", "Output/LCD").Property("enabled", true).Property("type", typeof(RazorLCD1602)).Property("mainValue", typeof(RazorLCD1602).GetProperty("text")).Finish() }
			*/
			{1, new ComponentDataBuilder().Property("name", "Arduino Uno Rev3").Property("directoryPath", "Arduino").Property("enabled", true).Finish() },
			{2, new ComponentDataBuilder().Property("name", "Arduino MEGA 2560").Property("directoryPath", "Arduino").Property("enabled", true).Finish() },
			{3, new ComponentDataBuilder().Property("name", "Arduino Uno WIFI Rev2").Property("directoryPath", "Arduino").Property("enabled", true).Finish() },
			{4, new ComponentDataBuilder().Property("name", "Pushbutton").Property("directoryPath", "Input/Buttons and Switches").Property("enabled", true).Finish() },
			{5, new ComponentDataBuilder().Property("name", "Switch").Property("directoryPath", "Input/Buttons and Switches").Property("enabled", true).Finish() },
			{6, new ComponentDataBuilder().Property("name", "ADXL345").Property("directoryPath", "Input/Acceleration Sensors").Property("enabled", true).Finish() },
			{7, new ComponentDataBuilder().Property("name", "MPU6050").Property("directoryPath", "Input/Acceleration Sensors").Property("enabled", true).Finish() },
			{8, new ComponentDataBuilder().Property("name", "BNO-055").Property("directoryPath", "Input/Acceleration Sensors").Property("enabled", true).Finish() },
			{9, new ComponentDataBuilder().Property("name", "TF-Luna Lidar - I2C").Property("directoryPath", "Input/Distance Sensors").Property("enabled", true).Finish() },
			{10, new ComponentDataBuilder().Property("name", "TF-Luna Lidar - Serial").Property("directoryPath", "Input/Distance Sensors").Property("enabled", true).Finish() },
			{11, new ComponentDataBuilder().Property("name", "Distance sensor - RPLIDAR-A1 Lidar").Property("directoryPath", "Input/Distance Sensors").Property("enabled", true).Finish() },
			{12, new ComponentDataBuilder().Property("name", "Ultrasonic sensor - HC-SR04").Property("directoryPath", "Input/Distance Sensors").Property("enabled", true).Finish() },
			{13, new ComponentDataBuilder().Property("name", "GP2Y0A21YK0F IR Distance Sensor").Property("directoryPath", "Input/Distance Sensors").Property("enabled", true).Finish() },
			{14, new ComponentDataBuilder().Property("name", "MQ-3").Property("directoryPath", "Input/Gas Sensors").Property("enabled", true).Finish() },
			{15, new ComponentDataBuilder().Property("name", "SGP41").Property("directoryPath", "Input/Gas Sensors").Property("enabled", true).Finish() },
			{16, new ComponentDataBuilder().Property("name", "KY-018 LDR sensor").Property("directoryPath", "Input/Light Sensors").Property("enabled", true).Finish() },
			{17, new ComponentDataBuilder().Property("name", "BH1750 Ambient Light Sensor").Property("directoryPath", "Input/Light Sensors").Property("enabled", true).Finish() },
			{18, new ComponentDataBuilder().Property("name", "TSL2561 Luminosity Sensor").Property("directoryPath", "Input/Light Sensors").Property("enabled", true).Finish() },
			{19, new ComponentDataBuilder().Property("name", "TEMT6000 Ambient Light Sensor").Property("directoryPath", "Input/Light Sensors").Property("enabled", true).Finish() },
			{20, new ComponentDataBuilder().Property("name", "DHT11/DHT22 ").Property("directoryPath", "Input/Temperature and Humidity Sensors").Property("enabled", true).Finish() },
			{21, new ComponentDataBuilder().Property("name", "SHT31 Temperature & Humidity Sensor").Property("directoryPath", "Input/Temperature and Humidity Sensors").Property("enabled", true).Finish() },
			{22, new ComponentDataBuilder().Property("name", "DS18B20").Property("directoryPath", "Input/Temperature and Humidity Sensors").Property("enabled", true).Finish() },
			{23, new ComponentDataBuilder().Property("name", "Hall effect - KY-024").Property("directoryPath", "Input/Other Sensors").Property("enabled", true).Finish() },
			{24, new ComponentDataBuilder().Property("name", "Hall effect - KY-003").Property("directoryPath", "Input/Other Sensors").Property("enabled", true).Finish() },
			{25, new ComponentDataBuilder().Property("name", "Hall effect - KY-004").Property("directoryPath", "Input/Other Sensors").Property("enabled", true).Finish() },
			{26, new ComponentDataBuilder().Property("name", "K-Thermocouple - MAX6675").Property("directoryPath", "Input/Other Sensors").Property("enabled", true).Finish() },
			{27, new ComponentDataBuilder().Property("name", "PIR motion sensor - HC-SR501").Property("directoryPath", "Input/Other Sensors").Property("enabled", true).Finish() },
			{28, new ComponentDataBuilder().Property("name", "IR receiver - KY-022").Property("directoryPath", "Input/Other Sensors").Property("enabled", true).Finish() },
			{29, new ComponentDataBuilder().Property("name", "SD Card Reader").Property("directoryPath", "Input/Other Sensors").Property("enabled", true).Finish() },
			{30, new ComponentDataBuilder().Property("name", "Load Cell(HX711) - TAL221").Property("directoryPath", "Input/Other Sensors").Property("enabled", true).Finish() },
			{31, new ComponentDataBuilder().Property("name", "LED").Property("directoryPath", "Output/LED").Property("enabled", true).Finish() },
			{32, new ComponentDataBuilder().Property("name", "LED 7-segment - Adafruit 0.56''").Property("directoryPath", "Output/LED").Property("enabled", true).Finish() },
			{33, new ComponentDataBuilder().Property("name", "LED bar - Adafruit Bi-Color 24 Bargraph").Property("directoryPath", "Output/LED").Property("enabled", true).Finish() },
			{34, new ComponentDataBuilder().Property("name", "LED matrix - MAX7219/MAX7221").Property("directoryPath", "Output/LED").Property("enabled", true).Finish() },
			{35, new ComponentDataBuilder().Property("name", "LED matrix - HT16K33").Property("directoryPath", "Output/LED").Property("enabled", true).Finish() },
			{36, new ComponentDataBuilder().Property("name", "LED RGB").Property("directoryPath", "Output/LED").Property("enabled", true).Finish() },
			{37, new ComponentDataBuilder().Property("name", "LED RGB - KY-009").Property("directoryPath", "Output/LED").Property("enabled", true).Finish() },
			{38, new ComponentDataBuilder().Property("name", "Laser LED").Property("directoryPath", "Output/LED").Property("enabled", true).Finish() },
			{39, new ComponentDataBuilder().Property("name", "LCD2004").Property("directoryPath", "Output/Displays/LCD").Property("enabled", true).Finish() },
			{40, new ComponentDataBuilder().Property("name", "LCD2004 - I2C").Property("directoryPath", "Output/Displays/LCD").Property("enabled", true).Finish() },
			{41, new ComponentDataBuilder().Property("name", "LCD1602").Property("directoryPath", "Output/Displays/LCD").Property("enabled", true).Finish() },
			{42, new ComponentDataBuilder().Property("name", "LCD1602 - I2C").Property("directoryPath", "Output/Displays/LCD").Property("enabled", true).Finish() },
			{43, new ComponentDataBuilder().Property("name", "SH1106 OLED - SPI").Property("directoryPath", "Output/Displays/OLED").Property("enabled", true).Finish() },
			{44, new ComponentDataBuilder().Property("name", "SH1106 OLED - I2C").Property("directoryPath", "Output/Displays/OLED").Property("enabled", true).Finish() },
			{45, new ComponentDataBuilder().Property("name", "SG90").Property("directoryPath", "Output/Motors/Servo Motor").Property("enabled", true).Finish() },
			{46, new ComponentDataBuilder().Property("name", "DS-7001HV").Property("directoryPath", "Output/Motors/Servo Motor").Property("enabled", true).Finish() },
			{47, new ComponentDataBuilder().Property("name", "Direct").Property("directoryPath", "Output/Motors/Servo Motor").Property("enabled", true).Finish() },
			{48, new ComponentDataBuilder().Property("name", "PCA9685").Property("directoryPath", "Output/Motors/Servo Motor").Property("enabled", true).Finish() },
			{49, new ComponentDataBuilder().Property("name", "direct").Property("directoryPath", "Output/Motors/DC Motor").Property("enabled", true).Finish() },
			{50, new ComponentDataBuilder().Property("name", "DRV8833").Property("directoryPath", "Output/Motors/DC Motor").Property("enabled", true).Finish() },
			{51, new ComponentDataBuilder().Property("name", "L293D").Property("directoryPath", "Output/Motors/DC Motor").Property("enabled", true).Finish() },
			{52, new ComponentDataBuilder().Property("name", "L298N").Property("directoryPath", "Output/Motors/DC Motor").Property("enabled", true).Finish() },
			{53, new ComponentDataBuilder().Property("name", "Brushless ESC").Property("directoryPath", "Output/Motors/DC Motor").Property("enabled", true).Finish() },
			{54, new ComponentDataBuilder().Property("name", "28BYJ-48").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{55, new ComponentDataBuilder().Property("name", "Nema-17").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{56, new ComponentDataBuilder().Property("name", "A4988").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{57, new ComponentDataBuilder().Property("name", "DRV8825").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{58, new ComponentDataBuilder().Property("name", "DRV8833").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{59, new ComponentDataBuilder().Property("name", "L293D").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{60, new ComponentDataBuilder().Property("name", "L298N").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{61, new ComponentDataBuilder().Property("name", "L9910").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{62, new ComponentDataBuilder().Property("name", "TB6600").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{63, new ComponentDataBuilder().Property("name", "TB6612").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{64, new ComponentDataBuilder().Property("name", "TMC2208").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{65, new ComponentDataBuilder().Property("name", "ULN2003").Property("directoryPath", "Output/Motors/Stepper Motor").Property("enabled", true).Finish() },
			{66, new ComponentDataBuilder().Property("name", "Speaker - LM386").Property("directoryPath", "Output/Others").Property("enabled", true).Finish() },
			{67, new ComponentDataBuilder().Property("name", "Buzzer").Property("directoryPath", "Output/Others").Property("enabled", true).Finish() },
			{68, new ComponentDataBuilder().Property("name", "Encoder - E6B2-CWZ3E").Property("directoryPath", "Others").Property("enabled", true).Finish() },
			{69, new ComponentDataBuilder().Property("name", "Voltage regulator - LM2596").Property("directoryPath", "Others").Property("enabled", true).Finish() },
			{70, new ComponentDataBuilder().Property("name", "Bluetooth Module - HM-10").Property("directoryPath", "Others").Property("enabled", true).Finish() }
		};

	}
}