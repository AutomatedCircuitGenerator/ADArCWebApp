using ADArCWebApp.Shared;
using ADArCWebApp.Shared.Components;

namespace ADArCWebApp.ComponentNamespace
{


	public static class ComponentDeclarations
	{
		public static Dictionary<int, ComponentData> components = new()
		{
			{ 1, new ComponentDataBuilder("Uno Rev3", true, "Arduino", 0.33, 280, 210, gsNodeName:"arduinouno_rev3", codeForGen:new(){{"global", ""}, {"setup", ""}, {"loopMain", ""}, {"delayLoop", ""}, {"delayTime", ""}}, pins:new(){"d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","d10","d11","d12","d13","d14","d15","d16","d17","d18","d19","gnd"}).Finish() },
			{ 2, new ComponentDataBuilder("MEGA 2560", true, "Arduino", 0.3, 390, 195).Finish() },
			{ 3, new ComponentDataBuilder("Uno WIFI Rev2", false, "Arduino", 1, 75, 75).Finish() },
			{ 4, new ComponentDataBuilder("Pushbutton", false, "Input/Buttons and Switches", 1, 75, 75).Finish() },
			{ 5, new ComponentDataBuilder("Switch", false, "Input/Buttons and Switches", 1, 75, 75).Finish() },
			{ 6, new ComponentDataBuilder("ADXL345", false, "Input/Acceleration Sensors", 1, 75, 75).Finish() },
			{ 7, new ComponentDataBuilder("MPU6050", true, "Input/Acceleration Sensors", 1.3, 85, 65).Finish() },
			{ 8, new ComponentDataBuilder("BNO-055", true, "Input/Acceleration Sensors", 1, 120, 90).Finish() },
			{ 9, new ComponentDataBuilder("TF-Luna Lidar - I2C", false, "Input/Distance Sensors", 1, 75, 75).Finish() },
			{ 10, new ComponentDataBuilder("TF-Luna Lidar - Serial", false, "Input/Distance Sensors", 1, 75, 75).Finish() },
			{ 11, new ComponentDataBuilder("RPLIDAR-A1 Lidar", false, "Input/Distance Sensors", 1, 75, 75, paneHoverText: "Distance sensor").Finish() },
			{ 12, new ComponentDataBuilder("Ultrasonic", true, "Input/Distance Sensors", 0.65, 170, 95, paneHoverText: "HC-SR04").Finish() },
			{ 13, new ComponentDataBuilder("IR Distance", false, "Input/Distance Sensors", 1, 75, 75, paneHoverText: "GP2Y0A21YK0F").Finish() },
			{ 14, new ComponentDataBuilder("MQ-3", false, "Input/Gas Sensors", 1, 75, 75).Finish() },
			{ 15, new ComponentDataBuilder("SGP41", false, "Input/Gas Sensors", 1, 75, 75).Finish() },
			{ 16, new ComponentDataBuilder("KY-018 LDR", false, "Input/Light Sensors", 1, 75, 75).Finish() },
			{ 17, new ComponentDataBuilder("Ambient Light", false, "Input/Light Sensors", 1, 75, 75, paneHoverText: "BH1750").Finish() },
			{ 18, new ComponentDataBuilder("Luminosity", false, "Input/Light Sensors", 1, 75, 75, paneHoverText: "TSL2561").Finish() },
			{ 19, new ComponentDataBuilder("Alt - Ambient Light", false, "Input/Light Sensors", 1, 75, 75, paneHoverText: "TEMT6000").Finish() },
			{ 20, new ComponentDataBuilder("DHT11/DHT22 ", true, "Input/Temperature and Humidity Sensors", 0.9, 60, 120, 20.0, RazorDHT22.translate).Property("humidity", 40.0).Finish() },
			{ 21, new ComponentDataBuilder("SHT31", false, "Input/Temperature and Humidity Sensors", 1, 75, 75).Finish() },
			{ 22, new ComponentDataBuilder("DS18B20", false, "Input/Temperature and Humidity Sensors", 1, 75, 75).Finish() },
			{ 23, new ComponentDataBuilder("Hall effect", false, "Input/Other Sensors", 1, 75, 75, paneHoverText: "KY-024").Finish() },
			{ 24, new ComponentDataBuilder("Hall effect", false, "Input/Other Sensors", 1, 75, 75, paneHoverText: "KY-003").Finish() },
			{ 25, new ComponentDataBuilder("Hall effect", false, "Input/Other Sensors", 1, 75, 75, paneHoverText: "KY-004").Finish() },
			{ 26, new ComponentDataBuilder("K-Thermocouple", false, "Input/Other Sensors", 1, 75, 75, paneHoverText: "MAX6675").Finish() },
			{ 27, new ComponentDataBuilder("PIR motion sensor", false, "Input/Other Sensors", 1, 75, 75, paneHoverText: "HC-SR501").Finish() },
			{ 28, new ComponentDataBuilder("IR receiver", true, "Input/Other Sensors", 1.3, 65, 90, paneHoverText: "KY-022").Finish() },
			{ 29, new ComponentDataBuilder("SD Card Reader", false, "Input/Other Sensors", 1, 75, 75).Finish() },
			{ 30, new ComponentDataBuilder("Load Cell(HX711)", true, "Input/Other Sensors", 0.6, 200, 100, paneHoverText: "TAL221").Finish() },
			{ 31, new ComponentDataBuilder("LED", true, "Output/LED", 1.5, 40, 50, false, RazorLED.update, gsNodeName:"led", codeForGen: new(){{"global", "boolean pin = false;"}, {"setup", ""}, {"loopMain", ""}, {"delayLoop", "    digitalWrite(~\"anode\", !digitalRead(~\"anode\"));"}, {"delayTime", "500"}}, pins:new(){ "anode", "cathode"}, listenOn: new(){ "anode"}).Finish() },
			{ 32, new ComponentDataBuilder("7-segment", true, "Output/LED", 1, 50, 85, paneHoverText: "Adafruit 0.56''").Finish() },
			{ 33, new ComponentDataBuilder("Bar", false, "Output/LED", 1, 75, 75, paneHoverText: "Adafruit Bi-Color 24").Finish() },
			{ 34, new ComponentDataBuilder("Matrix", false, "Output/LED", 1, 75, 75, paneHoverText: "MAX7219/MAX7221").Finish() },
			{ 35, new ComponentDataBuilder("Matrix", false, "Output/LED", 1, 75, 75, paneHoverText: "HT16K33").Finish() },
			{ 36, new ComponentDataBuilder("RGB", true, "Output/LED", 1.5, 45, 80).Finish() },
			{ 37, new ComponentDataBuilder("RGB module", false, "Output/LED", 1, 75, 75, paneHoverText: "KY-009").Finish() },
			{ 38, new ComponentDataBuilder("Laser LED", false, "Output/LED", 1, 75, 75).Finish() },
			{ 39, new ComponentDataBuilder("LCD2004", true, "Output/Displays/LCD", 0.3, 320, 165, "").Finish() },
            { 40, new ComponentDataBuilder("LCD2004 - I2C", true, "Output/Displays/LCD", 0.3, 320, 165, "").Finish() },
            { 41, new ComponentDataBuilder("LCD1602", true, "Output/Displays/LCD", 0.35, 310, 140, "").Finish() },
            { 42, new ComponentDataBuilder("LCD1602 - I2C", true, "Output/Displays/LCD", 0.35, 310, 140, "").Finish() },
            { 43, new ComponentDataBuilder("SH1106 OLED - SPI", false, "Output/Displays/OLED", 1, 75, 75).Finish() },
			{ 44, new ComponentDataBuilder("SH1106 OLED - I2C", false, "Output/Displays/OLED", 1, 75, 75).Finish() },
			{ 45, new ComponentDataBuilder("Direct - SG90", true, "Output/Motors/Servo Motor", 0.65, 175, 120).Finish() },
			{ 46, new ComponentDataBuilder("Direct - DS-7001HV", false, "Output/Motors/Servo Motor", 1, 75, 75).Finish() },
			{ 47, new ComponentDataBuilder("Driver - SG90", false, "Output/Motors/Servo Motor", 1, 75, 75, paneHoverText: "PCA9684").Finish() },
			{ 48, new ComponentDataBuilder("Driver - DS-7001HV", false, "Output/Motors/Servo Motor", 1, 75, 75, paneHoverText: "PCA9685").Finish() },
			{ 49, new ComponentDataBuilder("Direct - Motor", false, "Output/Motors/DC Motor", 1, 75, 75).Finish() },
			{ 50, new ComponentDataBuilder("Driver - Motor", false, "Output/Motors/DC Motor", 1, 75, 75, paneHoverText: "DRV8833").Finish() },
			{ 51, new ComponentDataBuilder("Brushless ESC - Motor", false, "Output/Motors/DC Motor", 1, 75, 75).Finish() },
			{ 52, new ComponentDataBuilder("28BYJ-48", false, "Output/Motors/Stepper Motor", 1, 75, 75, paneHoverText: "Includes driver").Finish() },
			{ 53, new ComponentDataBuilder("Nema-17", true, "Output/Motors/Stepper Motor", 0.6, 165, 180, paneHoverText: "Includes driver").Finish() },
			{ 54, new ComponentDataBuilder("Speaker", false, "Output/Others", 1, 75, 75, paneHoverText: "LM387").Finish() },
			{ 55, new ComponentDataBuilder("Buzzer", false, "Output/Others", 1, 75, 75).Finish() },
			{ 56, new ComponentDataBuilder("Encoder", false, "Others", 1, 75, 75, paneHoverText: "E6B2-CWZ3E").Finish() },
			{ 57, new ComponentDataBuilder("Voltage regulator", false, "Others", 1, 75, 75, paneHoverText: "LM2596").Finish() },
			{ 58, new ComponentDataBuilder("Bluetooth Module", false, "Others", 1, 75, 75, paneHoverText: "HM-10").Finish() },
			{ 59, new ComponentDataBuilder("resistor", true, "", 1, 75, 75, 1000).Finish() },
            { 60, new ComponentDataBuilder("stepper driver", false, "", 1, 75, 75).Finish() }





		};

	}
}