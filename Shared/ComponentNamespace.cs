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
                new ComponentDataBuilder("Uno Rev3", false, "Arduino", 0.33, 280, 210, typeof(RazorArduinoUno),
                    codeForGen: new()
                    {
                        { "include", "" }, { "global", "" }, { "setup", "" }, { "loopMain", "" }, { "functions", "" },
                        { "delayLoop", "" }, { "delayTime", "" }
                    },
                    pins:
                    [
                        "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "d11", "d12", "d13", "d14",
                        "d15", "d16", "d17", "d18", "d19", "gnd", "5V", "3V3"
                    ], gsNodeName: "arduinoUnoRev3").Finish()
            },
            {
                2,
                new ComponentDataBuilder("MEGA 2560", false, "Arduino", 0.3, 390, 195, typeof(RazorArduinoMega),
                    codeForGen: new()
                    {
                        { "include", "" }, { "global", "" }, { "setup", "" }, { "loopMain", "" }, { "functions", "" },
                        { "delayLoop", "" }, { "delayTime", "" }
                    },
                    pins:
                    [
                        "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "d11", "d12", "d13", "d14",
                        "d15", "d16", "d17", "d18", "d19", "d20", "d21", "d22", "d23", "d24", "d25", "d26", "d27",
                        "d28", "d29", "d30", "d31", "d32", "d33", "d34", "d35", "d36", "d37", "d38", "d39", "d40",
                        "d41", "d42", "d43", "d44", "d45", "d46", "d47", "d48", "d49", "d50", "d51", "d52", "d53",
                        "d54", "d55", "d56", "d57", "d58", "d59", "d60", "d61", "d62", "d63", "d64", "d65", "d66",
                        "d67", "d68", "d69", "Vin", "3V3", "5V", "gnd"
                    ], gsNodeName: "arduinoMega").Finish()
            },
            {
                3,
                new ComponentDataBuilder("ADXL345", true, "Input/Acceleration Sensors", 1, 75, 75,
                    typeof(RazorADXL345I2C),
                    codeForGen: new()
                    {
                        {
                            "include",
                            "#include <Wire.h>\n#include <Adafruit_Sensor.h>\n#include <Adafruit_ADXL345_U.h>"
                        },
                        { "global", "Adafruit_ADXL345_Unified accel@ = Adafruit_ADXL345_Unified();" },
                        {
                            "setup",
                            "   \n  // Begin communication with ADXL at I2C address 0x@\n  // Change this address to your ADXL's real address!\n  if(!accel@.begin(0x@)) {\n    /* There was a problem detecting the ADXL345 ... check your connections */\n    Serial.println(\"Ooops, no ADXL345 detected ... Check your wiring!\");\n    while(1);\n  }\n\n  // Setting the range of the accelerometer\n  accel@.setRange(ADXL345_RANGE_4_G);"
                        },
                        {
                            "loopMain",
                            "  /* Get a new sensor event */ \n  sensors_event_t event@; \n  accel@.getEvent(&event@);\n \n  /* Display the results (acceleration is measured in m/s^2) */\n  Serial.print(\"X: \"); Serial.print(event@.acceleration.x); Serial.print(\"  \");\n  Serial.print(\"Y: \"); Serial.print(event@.acceleration.y); Serial.print(\"  \");\n  Serial.print(\"Z: \"); Serial.print(event@.acceleration.z); Serial.print(\"  \");Serial.println(\"m/s^2 \");\n  delay(500);"
                        },
                        { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                    }, pins: ["5V", "gnd", "sda", "scl"], gsNodeName: "adxl345").Property("motion", "Static").Finish()
            },
            {
                4,
                new ComponentDataBuilder("MPU6050", true, "Input/Acceleration Sensors", 1.3, 85, 65,
                        typeof(RazorMPU6050),
                        codeForGen: new()
                        {
                            {
                                "include",
                                "#include <Adafruit_MPU6050.h>\n#include <Adafruit_Sensor.h>\n#include <Wire.h>"
                            },
                            {
                                "global",
                                "Adafruit_MPU6050 mpu@;"
                            },
                            {
                                "setup",
                                "  while (!Serial)\n    delay(10); // will pause Zero, Leonardo, etc until serial console opens\n\n  Serial.println(\"Adafruit MPU6050 test!\");\n\n  // Try to initialize MPU at I2C address @ (change this to your MPU's actual address)!\n  if (!mpu@.begin(@)) {\n    Serial.println(\"Failed to find MPU6050 chip\");\n    while (1) {\n      delay(10);\n    }\n  }\n  Serial.println(\"MPU6050 Found!\");"
                            },
                            {
                                "loopMain",
                                "  /* Get new sensor events with the readings */\n  sensors_event_t a@, g@, temp@;\n  mpu@.getEvent(&a@, &g@, &temp@);\n\n  /* Print out the values */\n  Serial.print(\"Acceleration X: \");\n  Serial.print(a@.acceleration.x);\n  Serial.print(\", Y: \");\n  Serial.print(a@.acceleration.y);\n  Serial.print(\", Z: \");\n  Serial.print(a@.acceleration.z);\n  Serial.println(\" m/s^2\");\n\n  Serial.print(\"Rotation X: \");\n  Serial.print(g@.gyro.x);\n  Serial.print(\", Y: \");\n  Serial.print(g@.gyro.y);\n  Serial.print(\", Z: \");\n  Serial.print(g@.gyro.z);\n  Serial.println(\" rad/s\");\n\n  Serial.print(\"Temperature: \");\n  Serial.print(temp@.temperature);\n  Serial.println(\" degC\");\n  delay(500);"
                            },
                            { "functions", "" },
                            { "delayLoop", "" },
                            { "delayTime", "" }
                        }, pins: ["5V", "gnd", "scl", "sda", "xda", "xcl", "add", "int"], gsNodeName: "mpu6050")
                    .Property("motion", "Static").Finish()
            },
            {
                5,
                new ComponentDataBuilder("BNO055", true, "Input/Acceleration Sensors", 1, 120, 90, typeof(RazorBNO055),
                        codeForGen: new()
                        {
                            {
                                "include",
                                "// Include necessary libraries for the BNO055 sensor\n#include <Wire.h>\n#include <Adafruit_Sensor.h>\n#include <Adafruit_BNO055.h>\n#include <utility/imumaths.h>"
                            },
                            {
                                "global",
                                "/* Set the delay between fresh samples in milliseconds */\n#define BNO055_SAMPLERATE_DELAY_MS@ (100)\n\n// Initialize the BNO055 sensor\n// Check I2C device address and correct the line below if necessary\n// Default addresses: 0x29 or 0x28\n// id, address\nAdafruit_BNO055 bno@ = Adafruit_BNO055(-1, @);"
                            },
                            {
                                "setup",
                                "  // Setup function: runs once at startup\n  while (!Serial) delay(10);  // Wait for serial port to open\n\n  Serial.println(\"Orientation Sensor Raw Data Test\");\n  Serial.println(\"\");\n\n  /* Initialize the sensor */\n  if(!bno@.begin())\n  {\n    // Error handling: if the sensor is not detected, print a message and halt\n    Serial.print(\"Ooops, no BNO055 detected ... Check your wiring or I2C ADDR!\");\n    while(1);\n  }\n\n  delay(1000); // Allow the sensor to stabilize\n\n  /* Display the current temperature from the sensor */\n  int8_t temp@ = bno@.getTemp();\n  Serial.print(\"Current Temperature: \");\n  Serial.print(temp@);\n  Serial.println(\" C\");\n  Serial.println(\"\");\n\n  // Use external crystal for better accuracy\n  bno@.setExtCrystalUse(true);\n\n  Serial.println(\"Calibration status values: 0=uncalibrated, 3=fully calibrated\");"
                            },
                            {
                                "loopMain",
                                "  // Main loop: Continuously read sensor data\n\n  // Possible vector values can be:\n  // - VECTOR_ACCELEROMETER - m/s^2\n  // - VECTOR_MAGNETOMETER  - uT\n  // - VECTOR_GYROSCOPE     - rad/s\n  // - VECTOR_EULER         - degrees\n  // - VECTOR_LINEARACCEL   - m/s^2\n  // - VECTOR_GRAVITY       - m/s^2\n  \n  // Read Euler angles (heading, roll, pitch)\n  imu::Vector<3> euler@ = bno@.getVector(Adafruit_BNO055::VECTOR_EULER);\n\n  /* Display the floating point data */\n  Serial.print(\"X: \");\n  Serial.print(euler@.x());\n  Serial.print(\" Y: \");\n  Serial.print(euler@.y());\n  Serial.print(\" Z: \");\n  Serial.print(euler@.z());\n  Serial.print(\"\t\t\");\n\n  /* Uncomment the following block to display quaternion data */\n  /*\n  imu::Quaternion quat@ = bno@.getQuat();\n  Serial.print(\"qW: \");\n  Serial.print(quat@.w(), 4);\n  Serial.print(\" qX: \");\n  Serial.print(quat@.x(), 4);\n  Serial.print(\" qY: \");\n  Serial.print(quat@.y(), 4);\n  Serial.print(\" qZ: \");\n  Serial.print(quat@.z(), 4);\n  Serial.print(\"\t\t\");\n  */\n\n  /* Display calibration status for each sensor */\n  uint8_t system@, gyro@, accel@, mag@ = 0;\n  bno@.getCalibration(&system@, &gyro@, &accel@, &mag@);\n  Serial.print(\"CALIBRATION: Sys=\");\n  Serial.print(system@, DEC);\n  Serial.print(\" Gyro=\");\n  Serial.print(gyro@, DEC);\n  Serial.print(\" Accel=\");\n  Serial.print(accel@, DEC);\n  Serial.print(\" Mag=\");\n  Serial.println(mag@, DEC);\n\n  // Delay between readings to allow sensor data to refresh\n  delay(BNO055_SAMPLERATE_DELAY_MS@);"
                            },
                            {
                                "functions", ""
                            },
                            {
                                "delayLoop", ""
                            },
                            {
                                "delayTime", ""
                            }
                        }, pins: ["int", "adr", "5V", "gnd", "rst", "sda", "scl", "ps0", "ps1"], gsNodeName: "bno055")
                    .Property("motion", "Static").Finish()
            },
            {
                6,
                new ComponentDataBuilder("TF-Luna LiDAR - I2C", true, "Input/Distance Sensors", 1, 75, 75,
                        typeof(RazorTFLunaLidarI2C),
                        codeForGen: new()
                        {
                            {
                                "include",
                                "#include <Arduino.h>\n#include <Wire.h>\n#include <TFLI2C.h>                // TFLuna-I2C Library v.0.2.0"
                            },
                            {
                                "global",
                                "TFLI2C tflI2C@;\nint16_t  tfDist@; // distance in centimeters"
                            },
                            { "setup", "  Wire.begin(); // initialize Wire library" },
                            {
                                "loopMain",
                                "  // Get data from TF Luna at I2C address 0x@\n  // Change this address to your TF address in real life!\n  if( tflI2C@.getData(tfDist@, 0x@)) // If read okay...\n  {\n      Serial.print(\"Dist: \");\n      Serial.println(tfDist@);          // print the data...\n  }\n  else tflI2C@.printStatus();           // else, print error.\n\n  delay(50);"
                            },
                            {
                                "functions",
                                ""
                            },
                            { "delayLoop", "" }, { "delayTime", "" }
                        }, pins: ["gnd", "5V", "rxd", "txd"], gsNodeName: "tfLunaLidarI2C").Property("distance", 50.0)
                    .Finish()
            },
            {
                8,
                new ComponentDataBuilder("Ultrasonic", true, "Input/Distance Sensors", 0.65, 170, 95,
                        typeof(RazorHCSR04), paneHoverText: "HC-SR04",
                        codeForGen: new()
                        {
                            {
                                "include", ""
                            },
                            {
                                "global",
                                "// Global variables and pin definitions\n// Define the pins for the HC-SR04 sensor\nconst int trigPin@ = ~\"trigger\"; // Pin that triggers the ultrasonic pulse\nconst int echoPin@ = ~\"echo\"; // Pin that receives the echo signal\n\n// Variables to store the pulse duration and calculated distance\nfloat duration@, distance@;"
                            },
                            {
                                "setup",
                                "  // Setup function: runs once at startup\n  // Configure the trigger pin as an OUTPUT and the echo pin as an INPUT\n  pinMode(trigPin@, OUTPUT); // Set trigger pin as output\n  pinMode(echoPin@, INPUT);  // Set echo pin as input"
                            },
                            {
                                "loopMain",
                                "  // Main loop: continuously measures distance\n\n  // Ensure the trigger pin is LOW to start\n  digitalWrite(trigPin@, LOW);\n  delayMicroseconds(2); // Short delay to allow sensor stabilization\n\n  // Trigger the sensor by sending a HIGH pulse for 10 microseconds\n  digitalWrite(trigPin@, HIGH);\n  delayMicroseconds(10); // Pulse duration\n  digitalWrite(trigPin@, LOW);\n\n  // Read the duration of the echo pulse (in microseconds)\n  duration@ = pulseIn(echoPin@, HIGH);\n\n  // Calculate the distance (cm) using the speed of sound (0.0343 cm/us)\n  // Dividing by 2 accounts for the round-trip distance\n  distance@ = (duration@ * 0.0343) / 2;\n\n  // Output the measured distance to the Serial Monitor\n  Serial.print(\"Distance: \");\n  Serial.println(distance@);\n\n  // Short delay before the next measurement\n  delay(100);"
                            },
                            { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                        }, pins: ["vcc", "trigger", "echo", "gnd"], gsNodeName: "hcsr04").Property("distance", 20.0)
                    .Finish()
            },
            {
                9,
                new ComponentDataBuilder("Alcohol Sensor", true, "Input/Gas Sensors", .66, 75, 75, typeof(RazorMQ3),
                        codeForGen: new()
                        {
                            { "include", "" },
                            {
                                "global",
                                "/* Replace these values with your own readings */\n#define Sober@ 120   // Define max value that we consider sober\n#define Drunk@ 400   // Define min value that we consider drunk\n#define MQ3pin@ ~\"analog_out\"\nfloat sensorValue@;  //variable to store sensor value"
                            },
                            {
                                "setup",
                                "  Serial.println(\"MQ3 warming up!\"); //this should be 20 seconds in real life\n  delay(200); // allow the MQ3 to warm up"
                            },
                            {
                                "loopMain",
                                "  sensorValue@ = analogRead(MQ3pin@); // read analog input pin 0\n\n  Serial.print(\"Sensor Value: \");\n  Serial.print(sensorValue@);\n  \n  // Determine the status\n  if (sensorValue@ < Sober@) {\n    Serial.println(\"  |  Status: Stone Cold Sober\");\n  } else if (sensorValue@ >= Sober@ && sensorValue@ < Drunk@) {\n    Serial.println(\"  |  Status: Drinking but within legal limits\");\n  } else {\n    Serial.println(\"  |  Status: DRUNK\");\n  }\n  \n  delay(2000); // wait 2s for next reading"
                            },
                            { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                        }, paneHoverText: "MQ-3", pins: ["gnd", "5V", "analog_out"], gsNodeName: "mq3")
                    .Property("alcohol", 0.0).Finish()
            },
            {
                10,
                new ComponentDataBuilder("Photoresistor", true, "Input/Light Sensors", 1, 75, 75, typeof(RazorKY018),
                    paneHoverText: "KY-018",
                    codeForGen: new()
                    {
                        {
                            "include", ""
                        },
                        {
                            "global",
                            "// Global variables and constants\n// Define the analog pin for the photoresistor (LDR)\nconst int photoresistorPin@ = ~\"analog_out\"; // Analog input pin for the light sensor\n\n// LDR (Light Dependent Resistor) characteristics\nconst float GAMMA@ = 0.7; // Gamma value for LDR calculations\nconst float RL10@ = 50; // Resistance of the LDR at 10 lux"
                        },
                        {
                            "setup",
                            "    // Setup function: runs once at startup\n  // Configure the photoresistor pin as an INPUT\n  pinMode(photoresistorPin@, INPUT);"
                        },
                        {
                            "loopMain",
                            "  // Main loop: continuously reads light intensity\n\n  // Read the analog value from the photoresistor\n  int analogValue@ = analogRead(photoresistorPin@);\n\n  // Convert the analog value to voltage (assuming a 5V reference)\n  float voltage@ = analogValue@ / 1024. * 5;\n\n  // Calculate the resistance of the LDR using a voltage divider formula\n  float resistance@ = 2000 * voltage@ / (1 - voltage@ / 5);\n\n  // Compute the light intensity in lux using the LDR characteristics\n  float lux@ = pow(RL10@ * 1e3 * pow(10, GAMMA@) / resistance@, (1 / GAMMA@));\n\n  // Output the measured light intensity to the Serial Monitor\n  Serial.print(\"Lux value: \");\n  Serial.println(lux@);\n\n  // Delay before the next reading to allow stable measurements\n  delay(1000);"
                        },
                        {
                            "functions", ""
                        },
                        {
                            "delayLoop", ""
                        },
                        {
                            "delayTime", ""
                        }
                    }, pins: ["analog_out", "5V", "gnd"], gsNodeName: "ky018").Property("lux", 100.0).Finish()
            },
            {
                12,
                new ComponentDataBuilder("Hall effect sensor", true, "Input/Other Sensors", .8, 75, 75,
                        typeof(RazorKY024), paneHoverText: "KY-024",
                        codeForGen: new()
                        {
                            { "include", "" },
                            {
                                "global",
                                "int digitalPin@ = ~\"digital_out\"; // KY-024 Hall effect sensor digital output\nint analogPin@ = ~\"analog_out\"; // KY-024 Hall effect sensor analog output\nint digitalVal@; // variable for digital readings\nint analogVal@; // variable for analog readings"
                            },
                            {
                                "setup",
                                "  pinMode(digitalPin@, INPUT); // Set digital pin as input for magnetic field detection\n  pinMode(analogPin@, INPUT);   // Set analog pin as input for magnetic field strength"
                            },
                            {
                                "loopMain",
                                "  // Read the digital output to detect magnetic field presence\n  digitalVal@ = digitalRead(digitalPin@);\n  Serial.print(\"KY-024 digital value: \");\n  Serial.println(digitalVal@); // print digital detection status\n\n  // Read the analog output to get magnetic field strength in gauss\n  analogVal@ = analogRead(analogPin@);\n  float voltage@ = analogVal@ * (5.0 / 1023.0); // Convert analog reading to voltage\n  Serial.print(\"KY-024 analog voltage: \");\n  Serial.println(voltage@); \n  delay(1000);"
                            },
                            { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                        }, pins: ["digital_out", "5V", "gnd", "analog_out"], gsNodeName: "ky024").Property("gauss", 0.0)
                    .Finish()
            },
            {
                13,
                new ComponentDataBuilder("Hall effect sensor", true, "Input/Other Sensors", 1.15, 60, 115,
                        typeof(RazorKY003), paneHoverText: "KY-003",
                        codeForGen: new()
                        {
                            { "include", "" },
                            {
                                "global",
                                "int sensor@ = ~\"digital_out\"; // sensor pin\nint val@; // 1: Magnetic field detected, 0: No magnetic field detected"
                            },
                            { "setup", "  pinMode(sensor@, INPUT); // set sensor pin as input" },
                            {
                                "loopMain",
                                "  val@ = digitalRead(sensor@); // Read the sensor\n  Serial.print(\"ky003 value: \");\n  Serial.println(val@);\n  delay(1000);"
                            },
                            { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                        }, pins: ["gnd", "5V", "digital_out"], gsNodeName: "ky003").Property("magfield", "Not detected")
                    .Finish()
            },
            {
                14,
                new ComponentDataBuilder("K-type thermocouple", true, "Input/Temperature and Humidity Sensors", .7, 100,
                        75, typeof(RazorMAX6675), paneHoverText: "MAX6675",
                        codeForGen: new()
                        {
                            { "include", "#include <MAX6675.h> // Include library for MAX6675 K-type thermocouple" },
                            { "global", "#define CS_PIN@ ~\"cs\" // Define chip select pin for thermocouple module\nMAX6675 tcouple@(CS_PIN@); // Initialize thermocouple sensor" },
                            { "setup", "" },
                            {
                                "loopMain",
                                "\tfloat celsius@ = tcouple@.readTempC(); // Read temperature in Celsius\n  float fahrenheit@ = tcouple@.readTempF(); // Read temperature in Fahrenheit\n  Serial.print(\"T in C = \"); // Print Celsius temperature label\n  Serial.print(celsius@); // Print Celsius temperature value\n  Serial.print(\". T in Fahrenheit = \"); // Print Fahrenheit temperature label\n  Serial.println(fahrenheit@); // Print Fahrenheit temperature value\n  delay(500); // Wait 500ms before next reading"
                            },
                            { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                        }, pins: ["5V", "gnd", "so", "cs", "sck"], gsNodeName: "max6675").Property("temperature", 20.0)
                    .Finish()
            },
            {
                15,
                new ComponentDataBuilder("PIR motion sensor", true, "Input/Other Sensors", 1, 75, 75,
                        typeof(RazorHCSR501), paneHoverText: "HC-SR501",
                        codeForGen: new()
                        {
                            { "include", "" },
                            {
                                "global",
                                "int inputPin@ = ~\"digital_out\"; // choose the input pin (for PIR sensor)\nint pirState@ = LOW; // we start, assuming no motion detected\nint val@ = 0; // variable for reading the pin status"
                            },
                            { "setup", "  pinMode(inputPin@, INPUT); // declare sensor as input" },
                            {
                                "loopMain",
                                "  val@ = digitalRead(inputPin@); // read input value\n  if (val@ == HIGH) { // check if the input is HIGH\n    if (pirState@ == LOW) {\n      // we have just turned on\n      Serial.println(\"Motion detected!\");\n      // We only want to print on the output change, not state\n      pirState@ = HIGH;\n    }\n  } else {\n    if (pirState@ == HIGH) {\n      // we have just turned of\n      Serial.println(\"Motion ended!\");\n      // We only want to print on the output change, not state\n      pirState@ = LOW;\n    }\n  }"
                            },
                            { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                        }, pins: ["gnd", "digital_out", "5V"], gsNodeName: "hcsr501",
                        environmentalSettingsType: typeof(PIRButton))
                    .Property("triggermode", 0.0).Property("timedelayseconds", 1.0).Property("ismotiondetected", 1.0).Finish()
            },
            {
                16,
                new ComponentDataBuilder("IR receiver", true, "Input/Other Sensors", 1.3, 65, 90, typeof(RazorKY022),
                    paneHoverText: "KY-022",
                    codeForGen: new()
                    {
                        {
                            "include",
                            "#include <IRremote.hpp> // Include the IRremote library for handling IR communication"
                        },
                        {
                            "global",
                            "// Global variable\n// Define the pin connected to the IR receiver\nint IRPIN@ = ~\"digital_out\"; // Pin for receiving IR signals"
                        },
                        {
                            "setup",
                            "// Setup function: runs once at startup\n\n  // Print a message to indicate IR receiver setup\n  Serial.println(\"Enabling IRin\");\n\n  // Initialize the IR receiver with feedback on LED activity\n  IrReceiver.begin(IRPIN@, ENABLE_LED_FEEDBACK);\n  // Confirm that the IR receiver has been initialized\n  Serial.println(\"Enabled IRin\");"
                        },
                        {
                            "loopMain",
                            "// Main loop: continuously checks for incoming IR signals\n\n  // If an IR signal is received and decoded\n  if (IrReceiver.decode())\n\n  {\n\n    // Print the decoded IR command in hexadecimal format\n    Serial.println(IrReceiver.decodedIRData.command, HEX);\n\n    // Prepare the receiver for the next incoming signal\n    IrReceiver.resume();\n  }\n\n  // Delay to avoid flooding the serial output\n  delay(500);"
                        },
                        { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                    }, pins: ["gnd", "5V", "digital_out"], gsNodeName: "ky022",
                    environmentalSettingsType: typeof(KY022Settings)).Finish()
            },
            {
                17,
                new ComponentDataBuilder("Load Cell(HX711)", true, "Input/Other Sensors", .6, 200, 100,
                        typeof(RazorHX711), paneHoverText: "TAL221",
                        codeForGen: new()
                        {
                            {
                                "include", "#include <HX711.h>"
                            },
                            {
                                "global",
                                "// Global variables and HX711 setup\n// Define the data and clock pins for the HX711 load cell\nconst int LOADCELL_DOUT_PIN@ = ~\"dat\"; // Data pin for the HX711\nconst int LOADCELL_SCK_PIN@ = ~\"clk\";  // Clock pin for the HX711\n\n// Initialize the HX711 scale object\nHX711 scale@;"
                            },
                            {
                                "setup",
                                "  // Setup function: runs once at startup\n  // Initialize the HX711 scale with the data and clock pins\n  scale@.begin(LOADCELL_DOUT_PIN@, LOADCELL_SCK_PIN@);"
                            },
                            {
                                "loopMain",
                                "  // Main loop: continuously reads data from the HX711\n\n  // Check if the HX711 scale is ready for reading\n  if (scale@.is_ready()) {\n    // Read the data from the HX711\n    long reading@ = scale@.read();\n    // Output the reading to the Serial Monitor\n    Serial.print(\"HX711 reading: \");\n    Serial.println(reading@);\n  } else {\n    // If the HX711 is not ready, print an error message\n    Serial.println(\"HX711 not found.\");\n  }\n\n  // Delay before the next reading to allow stabilization\n  delay(1000);"
                            },
                            {
                                "functions", ""
                            },
                            {
                                "delayLoop", ""
                            },
                            {
                                "delayTime", ""
                            }
                        }, pins: ["5V", "dat", "clk", "gnd"], listenOn: ["dat"], gsNodeName: "hx711")
                    .Property("weight", 100.0).Finish()
            },
            {
                18,
                new ComponentDataBuilder("LED", true, "Output/LED", 1.5, 40, 50, typeof(RazorLED),
                    codeForGen: new()
                    {
                        { "include", "" }, 
                        { "global", "" }, 
                        { "setup", "\tpinMode(~\"anode\", OUTPUT); // Set the LED anode pin as an output" },
                        {
                            "loopMain",
                            "  digitalWrite(~\"anode\", HIGH); // Turn the LED on\n  delay(1000); // Wait for 1 second\n  digitalWrite(~\"anode\", LOW); // Turn the LED off\n  delay(1000); // Wait for 1 second before repeating"
                        },
                        { "functions", "" }, 
                        { "delayLoop", "" }, 
                        { "delayTime", "" }
                    }, pins: ["anode", "cathode"], gsNodeName: "led").Property("color", "red").Finish()
            },
            // {
            //     19,
            //     new ComponentDataBuilder("7 segment display", true, "Output/LED", 1, 50, 85, typeof(RazorSevenSeg),
            //             paneHoverText: "Adafruit 0.56''", pins: ["com1", "a", "b", "c", "d", "e", "f", "g", "dp"],
            //             listenOn: ["a", "b", "c", "d", "e", "f", "g", "dp"], gsNodeName: "7segment")
            //         .Property("values", new int[] { 0, 0, 0, 0, 0, 0, 0, 0 }).Finish()
            // },
            {
                20,
                new ComponentDataBuilder("RGB LED", true, "Output/LED", 1.5, 45, 80, typeof(RazorRGBLED),
                    codeForGen: new()
                    {
                        { "include", "" },
                        {
                            "global",
                            "const int blueLED@ = ~\"B\"; // Define pin for blue LED\nconst int greenLED@ = ~\"G\"; // Define pin for green LED\nconst int redLED@ = ~\"R\"; // Define pin for red LED"
                        },
                        {
                            "setup",
                            "  pinMode(blueLED@, OUTPUT); // Set blue LED pin as an output\n  pinMode(greenLED@, OUTPUT); // Set green LED pin as an output\n  pinMode(redLED@, OUTPUT); // Set red LED pin as an output"
                        },
                        {
                            "loopMain",
                            "  analogWrite(redLED@,255); // Set red LED to full brightness\n  delay(1000); // Wait for 1 second\n  analogWrite(redLED@,0); // Turn off red LED\n  analogWrite(greenLED@,255); // Set green LED to full brightness\n  delay(1000); // Wait for 1 second\n  analogWrite(greenLED@,0); // Turn off green LED\n  delay(1000); // Wait for 1 second before repeating"
                        },
                        { "functions", "" }, 
                        { "delayLoop", "" }, 
                        { "delayTime", "" }
                    }, pins: ["R", "G", "B", "cathode"], gsNodeName: "rgbLed").Finish()
            }, //.Property("ledRed", 0).Property("ledGreen", 0).Property("ledBlue", 0)
            {
                21,
                new ComponentDataBuilder("Laser diode", true, "Output/LED", 1, 75, 75, typeof(RazorKY008),
                    codeForGen: new()
                    {
                        { "include", "" }, 
                        { "global", "int laserPin@ = ~\"digital_in\"; // Define pin for the laser diode" },
                        { "setup", "\tpinMode(laserPin@, OUTPUT); // Set the laser diode pin as an output" },
                        {
                            "loopMain",
                            "\tdigitalWrite(laserPin@, HIGH); // Turn the laser diode on\n\tdelay(1000); // Wait for 1 second\n\tdigitalWrite(laserPin@, LOW); // Turn the laser diode off\n\tdelay(1000); // Wait for 1 second before repeating"
                        },
                        { "functions", "" }, 
                        { "delayLoop", "" }, 
                        { "delayTime", "" }
                    }, paneHoverText: "KY-008", pins: ["digital_in", "gnd"], gsNodeName: "ky008").Finish()
            },
            {
                22,
                new ComponentDataBuilder("LCD1602 - I2C", true, "Output/Displays/LCD", 0.35, 310, 140,
                        typeof(RazorLCD1602I2C),
                        codeForGen: new()
                        {
                            { "include", "#include <LiquidCrystal_I2C.h>" },
                            {
                                "global",
                                "// Add the lcd, change the first parameter to your LCD's I2C device in real life!\nLiquidCrystal_I2C lcd@(@, 16, 2);"
                            },
                            {
                                "setup",
                                "   // Initalise the LCD\n   lcd@.init();\n   // Turn on the LCD backlight\n   lcd@.backlight();\n   // Put text on the LCD\n   lcd@.print(\"Hello World!\");"
                            },
                            { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }, { "loopMain", "" }
                        }, pins: ["pin1", "pin2", "pin3", "pin4"], gsNodeName: "lcd1602I2C").Property("text", "")
                    .Property("backlight", false).Property("blink", false).Property("cursor", false)
                    .Property("cursorX", 0)
                    .Property("cursorY", 0).Finish()
            },
            {
                23,
                new ComponentDataBuilder("Servo", true, "Output/Motors/Servo Motor", 0.65, 175, 120, typeof(RazorSG90),
                    paneHoverText: "SG90",
                    codeForGen: new()
                    {
                        { "include", "#include <Servo.h>" },
                        {
                            "global",
                            "Servo myservo@;  // create servo object to control a servo\nint pos@ = 0;    // variable to store the servo position"
                        },
                        { "setup", "  myservo@.attach(~\"orange\");" },
                        {
                            "loopMain",
                            "  for (pos@ = 0; pos@ <= 180; pos@ += 1) { // goes from 0 degrees to 180 degrees\n    // in steps of 1 degree\n    myservo@.write(pos@); // tell servo to go to position in variable 'pos'\n    delay(15); // waits 15 ms for the servo to reach the position\n  }\n  for (pos@ = 180; pos@ >= 0; pos@ -= 1) { // goes from 180 degrees to 0 degrees\n    myservo@.write(pos@); // tell servo to go to position in variable 'pos'\n    delay(15); // waits 15 ms for the servo to reach the position\n  }"
                        },
                        { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                    }, pins: ["brown", "red", "orange"], gsNodeName: "servo").Property("angle", 0).Finish()
            }, //change node and rule to sg90?
            {
                24,
                new ComponentDataBuilder("Servo with driver", true, "Output/Motors/Servo Motor", .48, 75, 75,
                    typeof(RazorSG90PCA9685), paneHoverText: "SG90/PCA9685",
                    codeForGen: new()
                    {
                        { "include", "#include <Adafruit_PWMServoDriver.h>\n" },
                        {
                            "global",
                            "Adafruit_PWMServoDriver board@ = Adafruit_PWMServoDriver(0x@); // Use the I2C address of your board\n\n#define SERVOMIN  125 // Minimum pulse length\n#define SERVOMAX  625 // Maximum pulse length\n\nint servoChannel@ = 0; // The servo channel you are using (0-15 for 16 channels on the board)\n"
                        },
                        {
                            "setup",
                            "\tboard@.begin();\n  board@.setPWMFreq(60); // Set PWM frequency to 60 Hz (common for servos)"
                        },
                        {
                            "loopMain",
                            "  // Move servo from 0 to 180 degrees\n  for (int angle = 0; angle <= 180; angle++) {\n    int pulse@ = angleToPulse@(angle);\n    board@.setPWM(servoChannel@, 0, pulse@); // Send pulse to the servo on the chosen channel\n    delay(15); // Wait for the servo to move (depends on your servo's speed)\n  }\n\n  // Move servo back from 180 to 0 degrees\n  for (int angle = 180; angle >= 0; angle--) {\n    int pulse@ = angleToPulse@(angle);\n    board@.setPWM(servoChannel@, 0, pulse@); // Send pulse to the servo on the chosen channel\n    delay(15); // Wait for the servo to move\n  }"
                        },
                        {
                            "functions",
                            "int angleToPulse@(int ang) {\n  // Maps angle (0-180 degrees) to pulse width (SERVOMIN - SERVOMAX)\n  int pulse = map(ang, 0, 180, SERVOMIN, SERVOMAX);  \n  Serial.print(\"Angle: \");\n  Serial.print(ang);\n  Serial.print(\" pulse: \");\n  Serial.println(pulse);\n  return pulse;\n\n}"
                        },
                        { "delayLoop", "" }, { "delayTime", "" }
                    }, pins: ["gnd", "pwr_gnd", "5V", "scl", "sda"], gsNodeName: "pca9685").Finish()
            },
            {
                25,
                new ComponentDataBuilder("DC motor with driver", true, "Output/Motors/DC Motor", .55, 75, 75,
                        typeof(RazorDCMotorL298N), paneHoverText: "L298N", pins: ["ena", "in1", "in2", "pwr_gnd"],
                        codeForGen: new ()
                        {
                            { "include", "" }, 
                            {
                                "global",
                                "int ena@ = ~\"ena\"; // Enable pin for motor speed control\nint in1@ = ~\"in1\"; // Control pin 1 for motor direction\nint in2@ = ~\"in2\"; // Control pin 2 for motor direction"
                            },
                            {
                                "setup",
                                "\tpinMode(ena@, OUTPUT); // Set enable pin as an output\n\tpinMode(in1@, OUTPUT); // Set control pin 1 as an output\n\tpinMode(in2@, OUTPUT); // Set control pin 2 as an output"
                            },
                            {
                                "loopMain",
                                "\tdigitalWrite(in1@, HIGH); // Set motor direction forward\n\tdigitalWrite(in2@, LOW);\n\tanalogWrite(ena@, 255); // Set motor speed to maximum\n\tdelay(2000); // Run motor for 2 seconds\n\tdigitalWrite(in1@, LOW); // Stop motor\n\tdigitalWrite(in2@, LOW);\n\tanalogWrite(ena@, 0);\n\tdelay(2000); // Wait for 2 seconds before repeating"
                            },
                            { "functions", "" }, 
                            { "delayLoop", "" }, 
                            { "delayTime", "" }
                        },
                        gsNodeName: "l298n",
                        warning:
                        "The L298N driver and connected motors can overheat, causing burns or damage. Ensure proper cooling, and never power the motor directly from a microcontroller—use an external power source.")
                    .Finish()
            },
            {
                26,
                new ComponentDataBuilder("Brushless motor and ESC", false, "Output/Motors/DC Motor", .25, 40, 55,
                    typeof(RazorESCBLDCMotor),
                    codeForGen: new()
                    {
                        { "include", "#include <wire.h>\n#include <Adafruit_PWMServoDriver.h>" },
                        {
                            "global",
                            "// called this way, it uses the default address 0x40\nAdafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();\n// you can also call it with a different address you want\n//Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x41);\n// you can also call it with a different address and I2C interface\n//Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver(0x40, Wire);\n\n// Depending on your servo make, the pulse width min and max may vary, you \n// want these to be as small/large as possible without hitting the hard stop\n// for max range. You'll have to tweak them as necessary to match the servos you\n// have!\n#define SERVOMIN  150 // This is the 'minimum' pulse length count (out of 4096)\n#define SERVOMAX  600 // This is the 'maximum' pulse length count (out of 4096)\n#define USMIN  600 // This is the rounded 'minimum' microsecond length based on the minimum pulse of 150\n#define USMAX  2400 // This is the rounded 'maximum' microsecond length based on the maximum pulse of 600\n#define SERVO_FREQ 50 // Analog servos run at ~50 Hz updates\n\n// our servo # counter\nuint8_t servonum = 0;"
                        },
                        {
                            "setup",
                            "  Serial.println(\"8 channel Servo test!\");\n\n  pwm.begin();\n  pwm.setOscillatorFrequency(27000000);\n  pwm.setPWMFreq(SERVO_FREQ);  // Analog servos run at ~50 Hz updates\n\n  delay(10);"
                        },
                        {
                            "loopMain",
                            "  // Drive each servo one at a time using setPWM()\n  Serial.println(servonum);\n  for (uint16_t pulselen = SERVOMIN; pulselen < SERVOMAX; pulselen++) {\n    pwm.setPWM(servonum, 0, pulselen);\n  }\n\n  delay(500);\n  for (uint16_t pulselen = SERVOMAX; pulselen > SERVOMIN; pulselen--) {\n    pwm.setPWM(servonum, 0, pulselen);\n  }\n\n  delay(500);\n\n  // Drive each servo one at a time using writeMicroseconds(), it's not precise due to calculation rounding!\n  // The writeMicroseconds() function is used to mimic the Arduino Servo library writeMicroseconds() behavior. \n  for (uint16_t microsec = USMIN; microsec < USMAX; microsec++) {\n    pwm.writeMicroseconds(servonum, microsec);\n  }\n\n  delay(500);\n  for (uint16_t microsec = USMAX; microsec > USMIN; microsec--) {\n    pwm.writeMicroseconds(servonum, microsec);\n  }\n\n  delay(500);\n\n  servonum++;\n  if (servonum > 7) servonum = 0; // Testing the first 8 servo channels"
                        },
                        {
                            "functions",
                            "// You can use this function if you'd like to set the pulse length in seconds\n// e.g. setServoPulse(0, 0.001) is a ~1 millisecond pulse width. It's not precise!\nvoid setServoPulse(uint8_t n, double pulse) {\n  double pulselength;\n  \n  pulselength = 1000000;   // 1,000,000 us per second\n  pulselength /= SERVO_FREQ;   // Analog servos run at ~60 Hz updates\n  Serial.print(pulselength); Serial.println(\" us per period\"); \n  pulselength /= 4096;  // 12 bits of resolution\n  Serial.print(pulselength); Serial.println(\" us per bit\"); \n  pulse *= 1000000;  // convert input seconds to us\n  pulse /= pulselength;\n  Serial.println(pulse);\n  pwm.setPWM(n, 0, pulse);\n}"
                        },
                        { "delayLoop", "" }, { "delayTime", "" }
                    },
                    pins:
                    [
                        "bat+", "bat-", "L3", "L2", "L1", "orange", "red", "brown", "pwm1", "V+", "gnd", "pca9685",
                        "pwm0", "pwm2", "pwm3", "pwm4", "pwm5", "5V", "scl", "sda"
                    ], gsNodeName: "esc_pca9685").Finish()
            }, //TODO this connection doesnt make sense. out until looked at
            {
                27,
                new ComponentDataBuilder("Stepper motor with driver", true, "Output/Motors/Stepper Motor", .4, 75, 75,
                        typeof(Razor_28BYJ48ULN2003), paneHoverText: "28BYJ-48/ULN2003",
                        codeForGen: new()
                        {
                            { "include", "#include <AccelStepper.h>\n" },
                            {
                                "global",
                                "int motorPin1_@ = ~\"in1\"; // Define control pin 1 for stepper motor\nint motorPin2_@ = ~\"in2\"; // Define control pin 2 for stepper motor\nint motorPin3_@ = ~\"in3\"; // Define control pin 3 for stepper motor\nint motorPin4_@ = ~\"in4\"; // Define control pin 4 for stepper motor\nint MotorInterfaceType@ = 8; // Define motor driver interface type\n\nAccelStepper stepper@ = AccelStepper(MotorInterfaceType@, motorPin1_@, motorPin3_@, motorPin2_@, motorPin4_@); // Initialize stepper motor with pin configuration\n"
                            },
                            {
                                "setup",
                                "\tstepper@.setMaxSpeed(1000); // Set maximum speed for stepper motor"
                            },
                            {
                                "loopMain",
                                "\tstepper@.setSpeed(500); // Set speed of stepper motor\n\tstepper@.runSpeed(); // Run stepper motor at the set speed"
                            },
                            { "functions", "" }, 
                            { "delayLoop", "" }, 
                            { "delayTime", "" }
                        },
                        pins: ["in1", "in2", "in3", "in4", "pwr_gnd"], gsNodeName: "uln2003",
                        warning:
                        "Stepper motors can draw excessive current, overheating the driver and causing permanent damage. Always use a separate power supply and avoid stalling the motor for long periods.")
                    .Finish()
            },
            {
                29,
                new ComponentDataBuilder("Arcade push button", true, "Input/Buttons and Switches", 1, 75, 75,
                        typeof(RazorArcadePushButton), "Push Button",
                        codeForGen: new()
                        {
                            { "include", "" }, { "global", "const int buttonPin@ = ~\"digital_out\";" },
                            {
                                "setup",
                                "  pinMode(buttonPin@, INPUT); // Set the button pin as an input\n"
                            },
                            {
                                "loopMain",
                                "  int buttonState@ = digitalRead(buttonPin@); // Read the button state\n\n  if (buttonState@ == HIGH) { // If button is pressed\n    Serial.println(\"Button is pressed!\");\n  }\n\n  delay(100); // Optional: Small delay to avoid spamming the serial monitor"
                            },
                            { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                        }, pins: ["digital_out", "gnd"], gsNodeName: "arcadePushButton").Property("pushed", "Released")
                    .Finish()
            },
            {
                30,
                new ComponentDataBuilder("Active buzzer", true, "Output/Sound", 1, 18.5, 19.154, typeof(RazorKY012),
                    paneHoverText: "KY-012",
                    codeForGen: new()
                    {
                        { "include", "" },
                        { "global", "const int buzzerPin@ = ~\"digital_out\"; // Signal pin for the buzzer" },
                        { "setup", "\tpinMode(buzzerPin@, OUTPUT); // Set buzzer pin as output" },
                        {
                            "loopMain",
                            "\tdigitalWrite(buzzerPin@, HIGH); // Turn buzzer on\n  delay(4000); // Wait 4 seconds\n  digitalWrite(buzzerPin@, LOW); // Turn buzzer off\n  delay(2000); // Wait 2 seconds"
                        },
                        { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                    }, pins: ["digital_out", "gnd"], gsNodeName: "ky012").Finish()
            },
            // {
            //     31,
            //     new ComponentDataBuilder("Temperature sensor", true, "Input/Temperature and Humidity Sensors", 1, 18.5,
            //         19.154, typeof(RazorKY001), paneHoverText: "DS18B20",
            //         codeForGen: new()
            //         {
            //             { "include", "" }, { "global", "" }, { "setup", "" }, { "loopMain", "" }, { "functions", "" },
            //             { "delayLoop", "" }, { "delayTime", "" }
            //         }, pins: ["gnd", "5V", "DQ"], gsNodeName: "ds18b20").Finish()
            // }
            {
                32,
                new ComponentDataBuilder("pH Sensor", true, "Input/Other Sensors", .5, -20, -20, typeof(RazorSRVPH),
                    paneHoverText: "SRV-PH",
                    codeForGen: new()
                    {
                        { "include", "" },
                        {
                            "global",
                            "#define SRVPH_PIN@ ~\"ADC\""
                        },
                        {
                            "setup",
                            ""
                        },
                        {
                            "loopMain",
                            "\tfloat sensorValue@ = analogRead(SRVPH_PIN@); // read analog input pin\n" +
                            "\tfloat voltage@ = sensorValue@ * (5.0 / 1023.0); // convert to voltage\n" +
                            "\tfloat pH = (-5.6548 * voltage@) + 15.509; // convert voltage to pH\n\n" +
                            "\tSerial.print(\"Sensor Value: \");\n" +
                            "\tSerial.print(sensorValue@);\n\n" + 
                            "\tSerial.print(\"\tVoltage: \");\n" +
                            "\tSerial.print(voltage@);\n\n" +
                            "\tSerial.print(\"\tpH: \");\n" + 
                            "\tSerial.println(pH);\n" +
                            "\tdelay(2000); // wait 2s for next reading"
                        },
                        { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                    }, pins: ["Vcc", "gnd", "ADC"], gsNodeName: "srv-ph").Property("ph", 7.0).Finish()
            },
            {
                33,
                new ComponentDataBuilder("Soil Moisture Sensor", true, "Input/Temperature and Humidity Sensors", .5, 75, 75, typeof(RazorSEN0114),
                        codeForGen: new()
                        {
                            { "include", "" },
                            {
                                "global",
                                "/* Example code for the moisture sensor\n" +
                                "Sensor value descriptions:\n" +
                                "\t 0 - 300: Dry soil\n" +
                                "\t 300 - 700: Humid soil\n" +
                                "\t 700 - 950: In water\n*/\n" +
                                "#define moisturePin@ ~\"analog_out\"\n" +
                                "int moistureValue@ = 0;"
                            },
                            {
                                "setup",
                                ""
                            },
                            {
                                "loopMain",
                                "\tmoistureValue@ = analogRead(moisturePin@);\n" +
                                "\tSerial.print(\"Moisture Sensor Value: \");\n" +
                                "\tSerial.println(moistureValue@);\n\n" +
                                "\t// Interpret the sensor value\n" +
                                "\tSerial.print(\"Status: \");\n" +
                                "\tif (moistureValue@ < 300) {\n" +
                                "\t\tSerial.println(\"Dry soil\");\n" +
                                "\t} else if (moistureValue@ < 700) {\n" +
                                "\t\tSerial.println(\"Humid soil\");\n" +
                                "\t} else {\n" +
                                "\t\tSerial.println(\"In water\");\n" +
                                "\t}\n" +
                                "\tdelay(1000);"
                            },
                            { "functions", "" }, { "delayLoop", "" }, { "delayTime", "" }
                        }, paneHoverText: "SEN0114", pins: ["gnd", "5V", "analog_out"], gsNodeName: "sen0114")
                    .Property("humidity", 512.0).Finish()
            },
            {
                34,
                new ComponentDataBuilder("NEMA 23", true, "Output/Motors/Stepper Motor", .4, 75, 75,
                        typeof(RazorNEMA23), paneHoverText: "NEMA23",
                        codeForGen: new()
                        {
                            { "include", "#include <AccelStepper.h>\n" },
                            
                            { 
                                "global", 
                                "// Pin configuration for NEMA23 stepper motor\n" +
                                "int dirPin@ = ~\"dir_minus\";  // Direction pin\n" +
                                "int stepPin@ = ~\"pul_minus\"; // Step pin\n\n" +
                                "#define motorInterfaceType@ 1  // Step + Direction driver\n" +
                                "AccelStepper stepper@ = AccelStepper(motorInterfaceType@, stepPin@, dirPin@); // Initialize stepper motor\n" +
                                "\n// Variables for stepper state (optional)\n" +
                                "long currentPos@ = 0;\n" +
                                "long targetPos@ = 0;\n" +
                                "float speed@ = 0;\n"
                            },
                            
                            {
                                "setup",
                                "\t// Stepper basic motion parameters\n" +
                                "\tstepper@.setMaxSpeed(1000);      // Maximum speed (steps/sec)\n" +
                                "\tstepper@.setAcceleration(500);   // Maximum acceleration (steps/sec^2)\n\n" +
                                "\t// Optional: reset current position\n" +
                                "\tstepper@.setCurrentPosition(0);\n\n" +
                                "\t// Move to an absolute target position\n" +
                                "\tstepper@.moveTo(400); // Example: move to step 400\n"
                            },
                            
                            {
                                "loopMain",
                                "\t// Non-blocking run toward target position\n" +
                                "\tif(stepper@.distanceToGo() != 0) {\n" +
                                "\t\tstepper@.run(); // Moves motor toward target with acceleration\n" +
                                "\t}\n\n" +
                                "\t// --- Constant speed movement (without acceleration) ---\n" +
                                "\t// stepper@.setSpeed(200); // Set speed in steps/sec\n" +
                                "\t// stepper@.runSpeed();    // Call repeatedly to move at constant speed\n\n" +
                                "\t// --- Relative movement ---\n" +
                                "\t// stepper@.move(100); // Move 100 steps relative to current position\n\n" +
                                "\t// --- Blocking movement to absolute position ---\n" +
                                "\t// stepper@.runToPosition(); // Blocks until target is reached\n" +
                                "\t// stepper@.runToNewPosition(800); // Blocks until new target is reached\n\n" +
                                "\t// --- Query motor state ---\n" +
                                "\tcurrentPos@ = stepper@.currentPosition(); // Current position in steps\n" +
                                "\ttargetPos@ = stepper@.targetPosition();   // Target position in steps\n" +
                                "\tlong remaining@ = stepper@.distanceToGo();  // Steps left to target\n" +
                                "\tspeed@ = stepper@.speed();                // Current speed in steps/sec\n\n" +
                                "\t// Print motor info to Serial for debugging\n" +
                                "\t//Serial.print(\"Current: \"); \n" +
                                "\tSerial.print(currentPos@);\n" +
                                "\tSerial.print(\" Target: \");\n" +
                                "\tSerial.print(targetPos@);\n" +
                                "\tSerial.print(\" Remaining: \");" +
                                "\tSerial.print(remaining@);\n" +
                                "\tSerial.print(\" Speed: \"); " +
                                "\tSerial.println(speed@);\n\n" +
                                "\tdelay(100); // Small delay to reduce Serial flooding"
                            },
                            
                            { "functions", "" },
                            
                            { "delayLoop", "" },
                            
                            { "delayTime", "" }
                        },
                        pins: ["Vcc", "dir_minus", "pul_minus"], gsNodeName: "nema23", 
                        warning:
                        "Stepper motors can draw excessive current, overheating the driver and causing permanent damage. Always use a separate power supply and avoid stalling the motor for long periods.").Property("stepsperrev", 400.0)
                    .Finish()
            }
        };
    }
}