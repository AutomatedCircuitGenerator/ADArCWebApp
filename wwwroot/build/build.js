var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define("lib/TimingPacket", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PinInstruction = exports.TimingPacket = void 0;
    class TimingPacket {
        constructor(originCycle, instructions) {
            this.originCycle = originCycle;
            this.instructions = instructions.sort((a, b) => a.cyclesSinceOrigin - b.cyclesSinceOrigin);
        }
        static fix(other) {
            return new TimingPacket(other.originCycle, other.instructions);
        }
    }
    exports.TimingPacket = TimingPacket;
    class PinInstruction {
        constructor(isOn, pin, cumulUsSinceOriginCycle, cyclesSinceOrigin) {
            this.isOn = isOn;
            this.pin = pin;
            this.cumulUsSinceOriginCycle = cumulUsSinceOriginCycle;
            this.cyclesSinceOrigin = cyclesSinceOrigin;
        }
    }
    exports.PinInstruction = PinInstruction;
});
define("lib/library_dictionary", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.library = void 0;
    exports.library = {
        "placeholder_1": "107-Arduino-24LCxx",
        "placeholder_2": "107-Arduino-APDS-9950",
        "placeholder_3": "107-Arduino-AS504x",
        "placeholder_4": "107-Arduino-BMP388",
        "placeholder_5": "107-Arduino-BoostUnits",
        "placeholder_6": "107-Arduino-CriticalSection",
        "placeholder_7": "107-Arduino-Cyphal",
        "placeholder_8": "107-Arduino-Cyphal-Support",
        "placeholder_9": "107-Arduino-Debug",
        "placeholder_10": "107-Arduino-MCP2515",
        "placeholder_11": "107-Arduino-NMEA-Parser",
        "placeholder_12": "107-Arduino-Sensor",
        "placeholder_13": "107-Arduino-Servo-RP2040",
        "placeholder_14": "107-Arduino-TCS3472",
        "placeholder_15": "107-Arduino-TMF8801",
        "placeholder_16": "107-Arduino-TSL2550",
        "placeholder_17": "107-Arduino-UniqueId",
        "placeholder_18": "107-Arduino-littlefs",
        "placeholder_19": "1NCE Arduino Blueprint",
        "placeholder_20": "1euroFilter",
        "placeholder_21": "24s02ya__M24SR02-Y",
        "placeholder_22": "3BC Language Virtual Machine",
        "placeholder_23": "74HC138",
        "placeholder_24": "74HC154",
        "placeholder_25": "74XX595",
        "placeholder_26": "7Segment",
        "placeholder_27": "8x8 Led Matrix Soldered",
        "placeholder_28": "A1301",
        "placeholder_29": "A4963",
        "placeholder_30": "A4990MotorShield",
        "placeholder_31": "A89306_asukiaaa",
        "placeholder_32": "AA_MCP2515",
        "placeholder_33": "ABB PowerOne Aurora inverter communication protocol",
        "placeholder_34": "ACAN",
        "placeholder_35": "ACAN2040",
        "placeholder_36": "ACAN2515",
        "placeholder_37": "ACAN2515Tiny",
        "placeholder_38": "ACAN2517",
        "placeholder_39": "ACAN2517FD",
        "placeholder_40": "ACANFD_FeatherM4CAN",
        "placeholder_41": "ACANFD_GIGA_R1",
        "placeholder_42": "ACANFD_STM32",
        "placeholder_43": "ACAN_ESP32",
        "placeholder_44": "ACAN_STM32",
        "placeholder_45": "ACAN_T4",
        "placeholder_46": "ACD10",
        "placeholder_47": "ACDU",
        "placeholder_48": "ACE128",
        "placeholder_49": "ACI_10K_AN-temp-sensor",
        "placeholder_50": "ACROBOTIC SSD1306",
        "placeholder_51": "ACS-M1128",
        "placeholder_52": "ACS712",
        "placeholder_53": "AD5144A",
        "placeholder_54": "AD520X",
        "placeholder_55": "AD5231 Arduino Library",
        "placeholder_56": "AD5245",
        "placeholder_57": "AD5246",
        "placeholder_58": "AD5248",
        "placeholder_59": "AD524X",
        "placeholder_60": "AD5254_asukiaaa",
        "placeholder_61": "AD5263",
        "placeholder_62": "AD5680",
        "placeholder_63": "AD568X",
        "placeholder_64": "AD56X8",
        "placeholder_65": "AD57X4R",
        "placeholder_66": "AD7173",
        "placeholder_67": "AD7190forESP32",
        "placeholder_68": "AD7193",
        "placeholder_69": "AD7390 DAC library",
        "placeholder_70": "AD74xx",
        "placeholder_71": "AD75019",
        "placeholder_72": "AD7747",
        "placeholder_73": "AD9833",
        "placeholder_74": "AD9850SPI",
        "placeholder_75": "AD985X",
        "placeholder_76": "ADC081S",
        "placeholder_77": "ADC08XS",
        "placeholder_78": "ADCButtons",
        "placeholder_79": "ADCDRP",
        "placeholder_80": "ADCTouch",
        "placeholder_81": "ADCTouchSensor",
        "placeholder_82": "ADC_SAmpler",
        "placeholder_83": "ADC_SEQR",
        "placeholder_84": "ADE7753",
        "placeholder_85": "ADE7880Energy",
        "placeholder_86": "ADF7023",
        "placeholder_87": "ADG2128",
        "placeholder_88": "ADG725",
        "placeholder_89": "ADG726",
        "placeholder_90": "ADG728",
        "placeholder_91": "ADG729",
        "placeholder_92": "ADG731",
        "placeholder_93": "ADG732",
        "placeholder_94": "ADNS3080",
        "placeholder_95": "ADS1110",
        "placeholder_96": "ADS1115-Driver",
        "placeholder_97": "ADS1115_WE",
        "placeholder_98": "ADS1118 library",
        "placeholder_99": "ADS1148",
        "placeholder_100": "ADS1219",
        "placeholder_101": "ADS1220",
        "placeholder_102": "ADS1220_WE",
        "placeholder_103": "ADS122U04 ADC Arduino Library",
        "placeholder_104": "ADS1232",
        "placeholder_105": "ADS1256",
        "placeholder_106": "ADS1X15",
        "placeholder_107": "ADS1x1x",
        "placeholder_108": "ADS7828",
        "placeholder_109": "ADSWeather",
        "placeholder_110": "ADT7470",
        "placeholder_111": "ADXL345",
        "placeholder_112": "ADXL345_WE",
        "placeholder_113": "ADXL362",
        "placeholder_114": "ADXL372",
        "placeholder_115": "AD_Sensors",
        "placeholder_116": "ADebouncer",
        "placeholder_117": "AEBO",
        "placeholder_118": "AESLib",
        "placeholder_119": "AES_CMAC",
        "placeholder_120": "AFArray",
        "placeholder_121": "AFE44XX library",
        "placeholder_122": "AFE_NXP_Arduino",
        "placeholder_123": "AGS02MA",
        "placeholder_124": "AGirs",
        "placeholder_125": "AHT20",
        "placeholder_126": "AIChatBot",
        "placeholder_127": "AIOModule",
        "placeholder_128": "AIS 4G board",
        "placeholder_129": "AIS_NB_BC95",
        "placeholder_130": "AIStarter",
        "placeholder_131": "AISwitch",
        "placeholder_132": "AITINKR_AIOT_DEVBOARD",
        "placeholder_133": "AITINKR_AIOT_V2",
        "placeholder_134": "AITINKR_JSON_FIELDS",
        "placeholder_135": "AITINKR_SHIELDS",
        "placeholder_136": "AIfES for Arduino",
        "placeholder_137": "AJSP",
        "placeholder_138": "ALA",
        "placeholder_139": "ALLBOT",
        "placeholder_140": "ALog",
        "placeholder_141": "AM1002-UART",
        "placeholder_142": "AM1008W-K I2C",
        "placeholder_143": "AM2302-Sensor",
        "placeholder_144": "AM2315",
        "placeholder_145": "AM2315C",
        "placeholder_146": "AM2320_asukiaaa",
        "placeholder_147": "AM232X",
        "placeholder_148": "AM4096",
        "placeholder_149": "AM50288H",
        "placeholder_150": "AMIS30543",
        "placeholder_151": "AMY Synthesizer",
        "placeholder_152": "AMYTOL_Robot",
        "placeholder_153": "AMx8x5",
        "placeholder_154": "ANSI",
        "placeholder_155": "ANT-Arduino",
        "placeholder_156": "ANTIRTOS",
        "placeholder_157": "ANTPLUS-Arduino",
        "placeholder_158": "AP3216_WE",
        "placeholder_159": "APA102",
        "placeholder_160": "APRS-Decoder-Lib",
        "placeholder_161": "APRS-IS-Lib",
        "placeholder_162": "APSNode",
        "placeholder_163": "AP_DCC_Library",
        "placeholder_164": "AS-289R2 Thermal Printer Shield",
        "placeholder_165": "AS1115",
        "placeholder_166": "AS3935",
        "placeholder_167": "AS3935MI",
        "placeholder_168": "AS5047P",
        "placeholder_169": "AS5200L",
        "placeholder_170": "AS5600",
        "placeholder_171": "AS5600_PsW",
        "placeholder_172": "AS5X47",
        "placeholder_173": "AS6212 Temperature Sensor",
        "placeholder_174": "AStar32U4",
        "placeholder_175": "AT24C",
        "placeholder_176": "AT24C256",
        "placeholder_177": "AT24C256 library",
        "placeholder_178": "AT24CM01",
        "placeholder_179": "AT24Cxx",
        "placeholder_180": "AT24MAC402",
        "placeholder_181": "AT42QT",
        "placeholder_182": "ATC_MiThermometer",
        "placeholder_183": "ATD1.47-S3 Lib",
        "placeholder_184": "ATD3.5-S3",
        "placeholder_185": "ATM90E26 Arduino",
        "placeholder_186": "ATMAC_EEPROM",
        "placeholder_187": "ATMlib",
        "placeholder_188": "ATOM_DTU_CAT1",
        "placeholder_189": "ATOM_DTU_LoRaWAN",
        "placeholder_190": "ATOM_DTU_NB",
        "placeholder_191": "ATmega32U4 Grove Air quality sensor",
        "placeholder_192": "ATmega_Slow_PWM",
        "placeholder_193": "ATmega_TimerInterrupt",
        "placeholder_194": "ATtinySerialOut",
        "placeholder_195": "ATtiny_PWM",
        "placeholder_196": "ATtiny_Slow_PWM",
        "placeholder_197": "ATtiny_TimerInterrupt",
        "placeholder_198": "AUnit",
        "placeholder_199": "AVR Standard C Time Library",
        "placeholder_200": "AVR-IoT MCP9808",
        "placeholder_201": "AVR-IoT VEML3328",
        "placeholder_202": "AVR-IoT-Cellular",
        "placeholder_203": "AVR-context",
        "placeholder_204": "AVRUtils",
        "placeholder_205": "AVR_PWM",
        "placeholder_206": "AVR_Slow_PWM",
        "placeholder_207": "AVision_ESP8266",
        "placeholder_208": "AWS-SDK-ESP8266",
        "placeholder_209": "AX-Mini",
        "placeholder_210": "AXP202X_Library",
        "placeholder_211": "AY3891x",
        "placeholder_212": "AbleButtons",
        "placeholder_213": "AbsoluteMouse",
        "placeholder_214": "AcaiaArduinoBLE",
        "placeholder_215": "AccelMotor",
        "placeholder_216": "AccelStepper",
        "placeholder_217": "AccelStepperWithDistances",
        "placeholder_218": "Accelerometer ADXL335",
        "placeholder_219": "Accelerometer ADXL345",
        "placeholder_220": "Accelerometer_H3LIS331DL",
        "placeholder_221": "Accelerometer_MMA7660",
        "placeholder_222": "AccessPermissionManager",
        "placeholder_223": "Accessories",
        "placeholder_224": "Accessory Shield",
        "placeholder_225": "AceButton",
        "placeholder_226": "AceCRC",
        "placeholder_227": "AceCommon",
        "placeholder_228": "AceMenu",
        "placeholder_229": "AceRoutine",
        "placeholder_230": "AceSPI",
        "placeholder_231": "AceSegment",
        "placeholder_232": "AceSegmentWriter",
        "placeholder_233": "AceSorting",
        "placeholder_234": "AceTMI",
        "placeholder_235": "AceTime",
        "placeholder_236": "AceTimeClock",
        "placeholder_237": "AceUtils",
        "placeholder_238": "AceWire",
        "placeholder_239": "AcksenButton",
        "placeholder_240": "AcksenIntEEPROM",
        "placeholder_241": "AcksenPump",
        "placeholder_242": "AcksenUtils",
        "placeholder_243": "Acrome-SMD",
        "placeholder_244": "Adafruit 10DOF",
        "placeholder_245": "Adafruit 9DOF",
        "placeholder_246": "Adafruit AD569x Library",
        "placeholder_247": "Adafruit ADG72x",
        "placeholder_248": "Adafruit ADS1X15",
        "placeholder_249": "Adafruit ADS7830",
        "placeholder_250": "Adafruit ADT7410 Library",
        "placeholder_251": "Adafruit ADXL343",
        "placeholder_252": "Adafruit ADXL345",
        "placeholder_253": "Adafruit ADXL375",
        "placeholder_254": "Adafruit AGS02MA",
        "placeholder_255": "Adafruit AHRS",
        "placeholder_256": "Adafruit AHT10",
        "placeholder_257": "Adafruit AHTX0",
        "placeholder_258": "Adafruit AM radio library",
        "placeholder_259": "Adafruit AM2315",
        "placeholder_260": "Adafruit AM2320 sensor library",
        "placeholder_261": "Adafruit AMG88xx Library",
        "placeholder_262": "Adafruit APDS9960 Library",
        "placeholder_263": "Adafruit AS726X",
        "placeholder_264": "Adafruit AS7341",
        "placeholder_265": "Adafruit AVRProg",
        "placeholder_266": "Adafruit AW9523",
        "placeholder_267": "Adafruit Arcada GifDecoder",
        "placeholder_268": "Adafruit Arcada Library",
        "placeholder_269": "Adafruit BD3491FS",
        "placeholder_270": "Adafruit BLEFirmata",
        "placeholder_271": "Adafruit BME280 Library",
        "placeholder_272": "Adafruit BME680 Library",
        "placeholder_273": "Adafruit BMP085 Library",
        "placeholder_274": "Adafruit BMP085 Unified",
        "placeholder_275": "Adafruit BMP183 Library",
        "placeholder_276": "Adafruit BMP183 Unified Library",
        "placeholder_277": "Adafruit BMP280 Library",
        "placeholder_278": "Adafruit BMP3XX Library",
        "Adafruit_BNO055.h": "Adafruit BNO055",
        "placeholder_280": "Adafruit BNO08x",
        "placeholder_281": "Adafruit BNO08x RVC",
        "placeholder_282": "Adafruit BluefruitLE nRF51",
        "placeholder_283": "Adafruit BusIO",
        "placeholder_284": "Adafruit CAN",
        "placeholder_285": "Adafruit CAP1188 Library",
        "placeholder_286": "Adafruit CC3000 Library",
        "placeholder_287": "Adafruit CCS811 Library",
        "placeholder_288": "Adafruit CH9328",
        "placeholder_289": "Adafruit CPFS",
        "placeholder_290": "Adafruit CST8XX Library",
        "placeholder_291": "Adafruit Circuit Playground",
        "placeholder_292": "Adafruit DAP library",
        "placeholder_293": "Adafruit DMA neopixel library",
        "placeholder_294": "Adafruit DPS310",
        "placeholder_295": "Adafruit DRV2605 Library",
        "placeholder_296": "Adafruit DS1841",
        "placeholder_297": "Adafruit DS248x",
        "placeholder_298": "Adafruit DS3502",
        "placeholder_299": "Adafruit Debounce",
        "placeholder_300": "Adafruit DotStar",
        "placeholder_301": "Adafruit DotStarMatrix",
        "placeholder_302": "Adafruit EMC2101",
        "placeholder_303": "Adafruit EPD",
        "placeholder_304": "Adafruit ESP8266",
        "placeholder_305": "Adafruit FONA Library",
        "placeholder_306": "Adafruit FRAM I2C",
        "placeholder_307": "Adafruit FRAM SPI",
        "placeholder_308": "Adafruit FT5336",
        "placeholder_309": "Adafruit FT6206 Library",
        "placeholder_310": "Adafruit FXAS21002C",
        "placeholder_311": "Adafruit FXOS8700",
        "placeholder_312": "Adafruit Faux86",
        "placeholder_313": "Adafruit Feather OLED",
        "placeholder_314": "Adafruit Fingerprint Sensor Library",
        "placeholder_315": "Adafruit Floppy",
        "placeholder_316": "Adafruit Flora Pixel Library",
        "placeholder_317": "Adafruit FreeTouch Library",
        "placeholder_318": "Adafruit GC9A01A",
        "placeholder_319": "Adafruit GFX Library",
        "placeholder_320": "Adafruit GPS Library",
        "placeholder_321": "Adafruit Graphic VFD Display Library",
        "placeholder_322": "Adafruit HDC1000 Library",
        "placeholder_323": "Adafruit HDC302x",
        "placeholder_324": "Adafruit HMC5883 Unified",
        "placeholder_325": "Adafruit HTS221",
        "placeholder_326": "Adafruit HTU21DF Library",
        "placeholder_327": "Adafruit HTU31D Library",
        "placeholder_328": "Adafruit HUSB238 Library",
        "placeholder_329": "Adafruit HX711",
        "placeholder_330": "Adafruit HX8357 Library",
        "placeholder_331": "Adafruit ICM20649",
        "placeholder_332": "Adafruit ICM20X",
        "placeholder_333": "Adafruit ILI9341",
        "placeholder_334": "Adafruit INA219",
        "placeholder_335": "Adafruit INA228 Library",
        "placeholder_336": "Adafruit INA260 Library",
        "placeholder_337": "Adafruit IO Arduino",
        "placeholder_338": "Adafruit IS31FL3731 Library",
        "placeholder_339": "Adafruit IS31FL3741 Library",
        "placeholder_340": "Adafruit ImageReader Library",
        "placeholder_341": "Adafruit IntelliKeys",
        "placeholder_342": "Adafruit InternalFlash",
        "placeholder_343": "Adafruit Keypad",
        "placeholder_344": "Adafruit L3GD20 U",
        "placeholder_345": "Adafruit LC709203F",
        "placeholder_346": "Adafruit LED Backpack Library",
        "placeholder_347": "Adafruit LIS2MDL",
        "placeholder_348": "Adafruit LIS331",
        "placeholder_349": "Adafruit LIS3DH",
        "placeholder_350": "Adafruit LIS3MDL",
        "placeholder_351": "Adafruit LPS2X",
        "placeholder_352": "Adafruit LPS35HW",
        "placeholder_353": "Adafruit LSM303 Accel",
        "placeholder_354": "Adafruit LSM303DLH Mag",
        "placeholder_355": "Adafruit LSM303DLHC",
        "placeholder_356": "Adafruit LSM6DS",
        "placeholder_357": "Adafruit LSM9DS0 Library",
        "placeholder_358": "Adafruit LSM9DS1 Library",
        "placeholder_359": "Adafruit LTR329 and LTR303",
        "placeholder_360": "Adafruit LTR390 Library",
        "placeholder_361": "Adafruit LiquidCrystal",
        "placeholder_362": "Adafruit LittlevGL Glue Library",
        "placeholder_363": "Adafruit MAX1704X",
        "placeholder_364": "Adafruit MAX31855 library",
        "placeholder_365": "Adafruit MAX31856 library",
        "placeholder_366": "Adafruit MAX31865 library",
        "placeholder_367": "Adafruit MAX9744 Library",
        "placeholder_368": "Adafruit MCP23008 library",
        "placeholder_369": "Adafruit MCP23017 Arduino Library",
        "placeholder_370": "Adafruit MCP2515",
        "placeholder_371": "Adafruit MCP3008",
        "placeholder_372": "Adafruit MCP3421",
        "placeholder_373": "Adafruit MCP4725",
        "placeholder_374": "Adafruit MCP4728",
        "placeholder_375": "Adafruit MCP9600 Library",
        "placeholder_376": "Adafruit MCP9808 Library",
        "placeholder_377": "Adafruit MFRC630 RFID",
        "placeholder_378": "Adafruit MLX90393",
        "placeholder_379": "Adafruit MLX90395",
        "placeholder_380": "Adafruit MLX90614 Library",
        "placeholder_381": "Adafruit MLX90640",
        "placeholder_382": "Adafruit MMA8451 Library",
        "placeholder_383": "Adafruit MMC56x3",
        "placeholder_384": "Adafruit MP3",
        "placeholder_385": "Adafruit MPL115A2",
        "placeholder_386": "Adafruit MPL3115A2 Library",
        "placeholder_387": "Adafruit MPR121",
        "placeholder_388": "Adafruit MPRLS Library",
        "Adafruit_MPU6050.h": "Adafruit MPU6050",
        "placeholder_390": "Adafruit MQTT Library",
        "placeholder_391": "Adafruit MS8607",
        "placeholder_392": "Adafruit MSA301",
        "placeholder_393": "Adafruit MiniMLX90614",
        "placeholder_394": "Adafruit Motor Shield V2 Library",
        "placeholder_395": "Adafruit Motor Shield library",
        "placeholder_396": "Adafruit NAU7802 Library",
        "placeholder_397": "Adafruit NeoMatrix",
        "placeholder_398": "Adafruit NeoMatrix ZeroDMA library",
        "placeholder_399": "Adafruit NeoPXL8",
        "placeholder_400": "Adafruit NeoPixel",
        "placeholder_401": "Adafruit NeoTrellis M4 Library",
        "placeholder_402": "Adafruit OV7670",
        "placeholder_403": "Adafruit PCD8544 Nokia 5110 LCD library",
        "placeholder_404": "Adafruit PCF8574",
        "placeholder_405": "Adafruit PCF8591",
        "placeholder_406": "Adafruit PCT2075",
        "placeholder_407": "Adafruit PM25 AQI Sensor",
        "placeholder_408": "Adafruit PN532",
        "placeholder_409": "Adafruit PS2 Trackpad",
        "placeholder_410": "Adafruit PWM Servo Driver Library",
        "placeholder_411": "Adafruit PixelDust",
        "placeholder_412": "Adafruit Pixie",
        "placeholder_413": "Adafruit Protomatter",
        "placeholder_414": "Adafruit PyCamera Library",
        "placeholder_415": "Adafruit RA8875",
        "placeholder_416": "Adafruit RGB LCD Shield Library",
        "placeholder_417": "Adafruit S-35710 Library",
        "placeholder_418": "Adafruit SCD30",
        "placeholder_419": "Adafruit SGP30 Sensor",
        "placeholder_420": "Adafruit SGP40 Sensor",
        "placeholder_421": "Adafruit SH110X",
        "placeholder_422": "Adafruit SHARP Memory Display",
        "placeholder_423": "Adafruit SHT31 Library",
        "placeholder_424": "Adafruit SHT4x Library",
        "placeholder_425": "Adafruit SHTC3 Library",
        "placeholder_426": "Adafruit SI1145 Library",
        "placeholder_427": "Adafruit SPIFlash",
        "placeholder_428": "Adafruit SSD1305",
        "placeholder_429": "Adafruit SSD1306",
        "placeholder_430": "Adafruit SSD1306 EMULATOR",
        "placeholder_431": "Adafruit SSD1306 Wemos Mini OLED",
        "placeholder_432": "Adafruit SSD1325",
        "placeholder_433": "Adafruit SSD1327",
        "placeholder_434": "Adafruit SSD1331 OLED Driver Library for Arduino",
        "placeholder_435": "Adafruit SSD1351 library",
        "placeholder_436": "Adafruit ST7735 and ST7789 Library",
        "placeholder_437": "Adafruit STMPE610",
        "placeholder_438": "Adafruit Sensor Calibration",
        "placeholder_439": "Adafruit Sensor Lab",
        "placeholder_440": "Adafruit Si4713 Library",
        "placeholder_441": "Adafruit Si5351 Library",
        "placeholder_442": "Adafruit Si7021 Library",
        "placeholder_443": "Adafruit SleepyDog Library",
        "placeholder_444": "Adafruit SoftServo",
        "placeholder_445": "Adafruit Soundboard library",
        "placeholder_446": "Adafruit TCA8418",
        "placeholder_447": "Adafruit TCS34725",
        "placeholder_448": "Adafruit TFTLCD Library",
        "placeholder_449": "Adafruit TLA202x",
        "placeholder_450": "Adafruit TLC5947",
        "placeholder_451": "Adafruit TLC59711",
        "placeholder_452": "Adafruit TMP006",
        "placeholder_453": "Adafruit TMP007 Library",
        "placeholder_454": "Adafruit TMP117",
        "placeholder_455": "Adafruit TPA2016 Library",
        "placeholder_456": "Adafruit TSC2007",
        "placeholder_457": "Adafruit TSC2046",
        "placeholder_458": "Adafruit TSL2561",
        "placeholder_459": "Adafruit TSL2591 Library",
        "placeholder_460": "Adafruit TensorFlow Lite",
        "placeholder_461": "Adafruit TestBed",
        "placeholder_462": "Adafruit Thermal Printer Library",
        "placeholder_463": "Adafruit TiCoServo",
        "placeholder_464": "Adafruit TinyFlash",
        "placeholder_465": "Adafruit TinyRGBLCDShield",
        "placeholder_466": "Adafruit TinyUSB Library",
        "placeholder_467": "Adafruit TouchScreen",
        "placeholder_468": "Adafruit Trellis Library",
        "placeholder_469": "Adafruit UNTZtrument",
        "Adafruit_Sensor.h": "Adafruit Unified Sensor",
        "placeholder_471": "Adafruit VC0706 Serial Camera Library",
        "placeholder_472": "Adafruit VCNL4020 Library",
        "placeholder_473": "Adafruit VCNL4040",
        "placeholder_474": "Adafruit VEML6070 Library",
        "placeholder_475": "Adafruit VEML6075 Library",
        "placeholder_476": "Adafruit VEML7700 Library",
        "placeholder_477": "Adafruit VL53L1X",
        "placeholder_478": "Adafruit VS1053 Library",
        "placeholder_479": "Adafruit WS2801 Library",
        "placeholder_480": "Adafruit WavePlayer Library",
        "placeholder_481": "Adafruit WipperSnapper",
        "placeholder_482": "Adafruit XCA9554",
        "placeholder_483": "Adafruit Zero DMA Library",
        "placeholder_484": "Adafruit Zero FFT Library",
        "placeholder_485": "Adafruit Zero I2S Library",
        "placeholder_486": "Adafruit Zero PDM Library",
        "placeholder_487": "Adafruit ZeroTimer Library",
        "placeholder_488": "Adafruit composite video Library",
        "placeholder_489": "Adafruit microbit Library",
        "placeholder_490": "Adafruit nRF8001",
        "placeholder_491": "Adafruit nRFCrypto",
        "placeholder_492": "Adafruit seesaw Library",
        "placeholder_493": "Adafruit_4_01_ColourEPaper",
        "placeholder_494": "Adafruit_VCNL4010",
        "placeholder_495": "Adafruit_VL53L0X",
        "placeholder_496": "Adafruit_VL6180X",
        "placeholder_497": "AdagioPro",
        "placeholder_498": "Adaino",
        "placeholder_499": "AdaptiveMapping",
        "placeholder_500": "Adeon",
        "placeholder_501": "Adler",
        "placeholder_502": "AdvKeyPad",
        "placeholder_503": "Advance Seven Segment",
        "placeholder_504": "AdvancedLogger",
        "placeholder_505": "AdvancedSerial",
        "placeholder_506": "AfricasTalking",
        "placeholder_507": "Afstandssensor - HCSR04",
        "placeholder_508": "AgIsoStack",
        "placeholder_509": "AgileStateMachine",
        "placeholder_510": "Ai COCOCAM",
        "placeholder_511": "Ai Esp32 Rotary Encoder",
        "placeholder_512": "AioP13",
        "placeholder_513": "Air Commander Entire Control",
        "placeholder_514": "AirGradient Air Quality Sensor",
        "placeholder_515": "Akafugu Four Letter Word Library",
        "placeholder_516": "Akafugu TWIDisplay Library",
        "placeholder_517": "Akafugu TWIKeyboard Library",
        "placeholder_518": "Akafugu TWILiquidCrystal Library",
        "placeholder_519": "Akafugu WireRtc Library",
        "placeholder_520": "AlPlc_Opta",
        "placeholder_521": "AlPlc_PMC",
        "placeholder_522": "Alarm",
        "placeholder_523": "AlertMe",
        "placeholder_524": "Alfredo-NoU2",
        "placeholder_525": "Alfredo-NoU3",
        "placeholder_526": "AlfredoCRSF",
        "placeholder_527": "AlfredoConnect-Receive",
        "placeholder_528": "Algoduino",
        "placeholder_529": "AlignedJoy",
        "placeholder_530": "AliyunIoTSDK",
        "placeholder_531": "AllSensors DLHR",
        "placeholder_532": "AllSensors DLV",
        "placeholder_533": "AllThingsTalk LTE-M SDK",
        "placeholder_534": "AllThingsTalk LoRaWAN SDK",
        "placeholder_535": "AllThingsTalk WiFi SDK",
        "placeholder_536": "AllWize",
        "placeholder_537": "AlmaviosLitMqtt",
        "placeholder_538": "AlmostRandom",
        "placeholder_539": "AloesDevice",
        "placeholder_540": "Alpenglow FUnicorn",
        "placeholder_541": "AltSoftSerial",
        "placeholder_542": "AlternativeLSS",
        "placeholder_543": "Altino",
        "placeholder_544": "AmazonDRS",
        "placeholder_545": "Ambient ESP32 ESP8266 lib",
        "placeholder_546": "AmbientCO2",
        "placeholder_547": "Ambimate",
        "placeholder_548": "Amethyste_LSM6DS3",
        "placeholder_549": "AmigaMouseJoyEmu",
        "placeholder_550": "AmperkaFET",
        "placeholder_551": "Amytol_Sample",
        "placeholder_552": "Analog Buttons",
        "placeholder_553": "Analog-Digital Multiplexers",
        "placeholder_554": "AnalogIO-Arduino",
        "placeholder_555": "AnalogKey",
        "placeholder_556": "AnalogKeyboard",
        "placeholder_557": "AnalogKeypad",
        "placeholder_558": "AnalogKeypad by Makuna",
        "placeholder_559": "AnalogLEDDriver",
        "placeholder_560": "AnalogMultiButton",
        "placeholder_561": "AnalogPin",
        "placeholder_562": "AnalogRTCLib",
        "placeholder_563": "AnalogReadAsync",
        "placeholder_564": "AnalogSelector",
        "placeholder_565": "AnalogTouch",
        "placeholder_566": "AnalogUVSensor",
        "placeholder_567": "AnalogWrite_ESP32",
        "placeholder_568": "Andee",
        "placeholder_569": "Andee101",
        "placeholder_570": "AndeeMobile",
        "placeholder_571": "AndreyRybalko WT2003M02 MP3 Decoder",
        "placeholder_572": "Angle",
        "placeholder_573": "AngleConvertor",
        "placeholder_574": "AnimatedGIF",
        "placeholder_575": "Animately",
        "placeholder_576": "Animation Tools",
        "placeholder_577": "Anitracks_ADS7142",
        "placeholder_578": "Anitracks_PCA95x5",
        "placeholder_579": "Anomalia",
        "placeholder_580": "Antares ESP8266 HTTP",
        "placeholder_581": "Antares ESP8266 MQTT",
        "placeholder_582": "AntaresLoraID",
        "placeholder_583": "AntiDelay",
        "placeholder_584": "AntiKeyRepetition",
        "placeholder_585": "AnyRtttl",
        "placeholder_586": "Anyleaf",
        "placeholder_587": "ApSDM120",
        "placeholder_588": "App Fernando K",
        "placeholder_589": "AppleMIDI",
        "placeholder_590": "Appnostic SC16IS7XX Arduino Library",
        "placeholder_591": "Approximate",
        "placeholder_592": "Approxy",
        "placeholder_593": "AqualaboSensor",
        "placeholder_594": "Arancino",
        "placeholder_595": "Aranet4",
        "placeholder_596": "Arara",
        "placeholder_597": "ArcPID",
        "placeholder_598": "ArdBitmap",
        "placeholder_599": "ArdOSC",
        "placeholder_600": "ArdRTOS",
        "placeholder_601": "ArdTap",
        "placeholder_602": "ArdVoice",
        "placeholder_603": "ArduCAM",
        "placeholder_604": "ArduMax AD5241 Driver",
        "placeholder_605": "ArduMax MCP41xxx Driver",
        "placeholder_606": "ArduPID",
        "placeholder_607": "ArduProf",
        "placeholder_608": "ArduRoomba",
        "placeholder_609": "ArduTFLite",
        "placeholder_610": "ArduZ80",
        "placeholder_611": "Arduboy",
        "placeholder_612": "Arduboy-BistercianNumbers",
        "placeholder_613": "Arduboy-TinyFont",
        "placeholder_614": "Arduboy2",
        "placeholder_615": "ArduboyI2C",
        "placeholder_616": "ArduboyPlaytune",
        "placeholder_617": "ArduboyRaycast",
        "placeholder_618": "ArduboyTones",
        "placeholder_619": "Arducam_Mega",
        "placeholder_620": "Arducam_mini",
        "placeholder_621": "Arduino Cloud Provider Examples",
        "placeholder_622": "Arduino Learning Board",
        "placeholder_623": "Arduino Low Power",
        "placeholder_624": "Arduino OPL2",
        "placeholder_625": "Arduino POST HTTP Parser",
        "placeholder_626": "Arduino SigFox for MKRFox1200",
        "placeholder_627": "Arduino Smart Watch",
        "placeholder_628": "Arduino Uno WiFi Dev Ed Library",
        "placeholder_629": "Arduino-I2C-KM1",
        "placeholder_630": "Arduino-Websocket-Fast",
        "placeholder_631": "ArduinoArcherPanelClient",
        "placeholder_632": "ArduinoBLE",
        "placeholder_633": "ArduinoBearSSL",
        "placeholder_634": "ArduinoBlue",
        "placeholder_635": "ArduinoCloudStorage",
        "placeholder_636": "ArduinoCloudThing",
        "placeholder_637": "ArduinoComponents",
        "placeholder_638": "ArduinoDMX",
        "placeholder_639": "ArduinoECCX08",
        "placeholder_640": "ArduinoESPAT",
        "placeholder_641": "ArduinoFacil",
        "placeholder_642": "ArduinoFritzApi",
        "placeholder_643": "ArduinoGraphics",
        "placeholder_644": "ArduinoHttpClient",
        "placeholder_645": "ArduinoHttpServer",
        "placeholder_646": "ArduinoIHC",
        "placeholder_647": "ArduinoINA219",
        "placeholder_648": "ArduinoIRC",
        "placeholder_649": "ArduinoIoTCloud",
        "placeholder_650": "ArduinoIoTCloudBearSSL",
        "placeholder_651": "ArduinoJson",
        "placeholder_652": "ArduinoLang",
        "placeholder_653": "ArduinoLearningKitStarter",
        "placeholder_654": "ArduinoLog",
        "placeholder_655": "ArduinoMDNS",
        "placeholder_656": "ArduinoMenu library",
        "placeholder_657": "ArduinoModbus",
        "placeholder_658": "ArduinoMotorCarrier",
        "placeholder_659": "ArduinoMqtt",
        "placeholder_660": "ArduinoMqttClient",
        "placeholder_661": "ArduinoOSC",
        "placeholder_662": "ArduinoOTA",
        "placeholder_663": "ArduinoQueue",
        "placeholder_664": "ArduinoRS485",
        "placeholder_665": "ArduinoSTL",
        "placeholder_666": "ArduinoSensors",
        "placeholder_667": "ArduinoSound",
        "placeholder_668": "ArduinoTEA5767",
        "placeholder_669": "ArduinoThread",
        "placeholder_670": "ArduinoThreadRunOnce",
        "placeholder_671": "ArduinoTrace",
        "placeholder_672": "ArduinoUniqueID",
        "placeholder_673": "ArduinoUnit",
        "placeholder_674": "ArduinoUserInterface",
        "placeholder_675": "ArduinoWebsockets",
        "placeholder_676": "Arduino_APA102",
        "placeholder_677": "Arduino_APDS9960",
        "placeholder_678": "Arduino_AVRSTL",
        "placeholder_679": "Arduino_AdvancedAnalog",
        "placeholder_680": "Arduino_Alvik",
        "placeholder_681": "Arduino_AlvikCarrier",
        "placeholder_682": "Arduino_BHY2",
        "placeholder_683": "Arduino_BHY2Host",
        "placeholder_684": "Arduino_BMI270_BMM150",
        "placeholder_685": "Arduino_BQ24195",
        "placeholder_686": "Arduino_Braccio_plusplus",
        "placeholder_687": "Arduino_BuiltIn",
        "placeholder_688": "Arduino_CMSIS-DSP",
        "placeholder_689": "Arduino_CRC32",
        "placeholder_690": "Arduino_Cellular",
        "placeholder_691": "Arduino_CloudConnectionFeedback",
        "placeholder_692": "Arduino_ConnectionHandler",
        "placeholder_693": "Arduino_DebugUtils",
        "placeholder_694": "Arduino_EMBRYO_2",
        "placeholder_695": "Arduino_ESP32_OTA",
        "placeholder_696": "Arduino_EdgeControl",
        "placeholder_697": "Arduino_GigaDisplay",
        "placeholder_698": "Arduino_GigaDisplayTouch",
        "placeholder_699": "Arduino_GigaDisplay_GFX",
        "placeholder_700": "Arduino_GroveI2C_Ultrasonic",
        "placeholder_701": "Arduino_HS300x",
        "placeholder_702": "Arduino_HTS221",
        "placeholder_703": "Arduino_JSON",
        "placeholder_704": "Arduino_KNN",
        "placeholder_705": "Arduino_LPS22HB",
        "placeholder_706": "Arduino_LSM6DS3",
        "placeholder_707": "Arduino_LSM6DSOX",
        "placeholder_708": "Arduino_LSM9DS1",
        "placeholder_709": "Arduino_LowPowerPortentaC33",
        "placeholder_710": "Arduino_LowPowerPortentaH7",
        "placeholder_711": "Arduino_MAX17332",
        "placeholder_712": "Arduino_MCHPTouch",
        "placeholder_713": "Arduino_MKRENV",
        "placeholder_714": "Arduino_MKRGPS",
        "placeholder_715": "Arduino_MKRIoTCarrier",
        "placeholder_716": "Arduino_MKRMEM",
        "placeholder_717": "Arduino_MKRRGB",
        "placeholder_718": "Arduino_MKRTHERM",
        "placeholder_719": "Arduino_MachineControl",
        "placeholder_720": "Arduino_MultiWiFi",
        "placeholder_721": "Arduino_NineAxesMotion",
        "placeholder_722": "Arduino_OAuth",
        "placeholder_723": "Arduino_OV767X",
        "placeholder_724": "Arduino_OplaUI",
        "placeholder_725": "Arduino_Opta_Blueprint",
        "placeholder_726": "Arduino_PF1550",
        "placeholder_727": "Arduino_POSIXStorage",
        "placeholder_728": "Arduino_PortentaBreakout",
        "placeholder_729": "Arduino_PortentaMachineControl",
        "placeholder_730": "Arduino_Portenta_OTA",
        "placeholder_731": "Arduino_PowerManagement",
        "placeholder_732": "Arduino_Pro_Tutorials",
        "placeholder_733": "Arduino_ScienceJournal",
        "placeholder_734": "Arduino_ScienceKitCarrier",
        "placeholder_735": "Arduino_SecureElement",
        "placeholder_736": "Arduino_Sensorkit",
        "placeholder_737": "Arduino_SerialUpdater",
        "placeholder_738": "Arduino_Threads",
        "placeholder_739": "Arduino_TinyGL",
        "placeholder_740": "Arduino_USBHostMbed5",
        "placeholder_741": "Arduino_UnifiedStorage",
        "placeholder_742": "ArduinosInSpace",
        "placeholder_743": "Ardwloop",
        "placeholder_744": "ArgParse",
        "placeholder_745": "Ark-Cpp-Client",
        "placeholder_746": "Ark-Cpp-Crypto",
        "placeholder_747": "Array",
        "placeholder_748": "ArrayExt",
        "placeholder_749": "ArrayList",
        "placeholder_750": "ArrayUtils",
        "placeholder_751": "ArrbotMonitor",
        "placeholder_752": "ArsaLearn",
        "placeholder_753": "ArtNet",
        "placeholder_754": "ArticulatedLib",
        "placeholder_755": "ArtnetWifi",
        "placeholder_756": "Artron DS1338",
        "placeholder_757": "ArtronShop_BH1750",
        "placeholder_758": "ArtronShop_LineNotify",
        "placeholder_759": "ArtronShop_PCF85363",
        "placeholder_760": "ArtronShop_SHT3x",
        "placeholder_761": "ArtronShop_SHT45",
        "placeholder_762": "ArtronShop_SPL06-001",
        "placeholder_763": "ArxContainer",
        "placeholder_764": "ArxRobot Library",
        "placeholder_765": "ArxSmartPtr",
        "placeholder_766": "ArxStringUtils",
        "placeholder_767": "ArxTypeTraits",
        "placeholder_768": "ArylicHTTP",
        "placeholder_769": "AsciiMassage",
        "placeholder_770": "AskSinPP",
        "placeholder_771": "AsproSolarShield",
        "placeholder_772": "AstroCalcs",
        "placeholder_773": "AstroMech",
        "placeholder_774": "Async TCP",
        "placeholder_775": "AsyncAnalog",
        "placeholder_776": "AsyncBMP180Wrapper",
        "placeholder_777": "AsyncButton",
        "placeholder_778": "AsyncDNSServer_ESP32_ENC",
        "placeholder_779": "AsyncDNSServer_ESP32_Ethernet",
        "placeholder_780": "AsyncDNSServer_ESP32_W5500",
        "placeholder_781": "AsyncDNSServer_ESP32_W6100",
        "placeholder_782": "AsyncDNSServer_RP2040W",
        "placeholder_783": "AsyncDNSServer_STM32",
        "placeholder_784": "AsyncDNSServer_Teensy41",
        "placeholder_785": "AsyncDNSServer_WT32_ETH01",
        "placeholder_786": "AsyncDelay",
        "placeholder_787": "AsyncESP32_ENC_Manager",
        "placeholder_788": "AsyncESP32_Ethernet_Manager",
        "placeholder_789": "AsyncESP32_SC_ENC_Manager",
        "placeholder_790": "AsyncESP32_SC_Ethernet_Manager",
        "placeholder_791": "AsyncESP32_SC_W5500_Manager",
        "placeholder_792": "AsyncESP32_SC_W6100_Manager",
        "placeholder_793": "AsyncESP32_W5500_Manager",
        "placeholder_794": "AsyncESP32_W6100_Manager",
        "placeholder_795": "AsyncESP8266_ENC_Manager",
        "placeholder_796": "AsyncESP8266_Ethernet_Manager",
        "placeholder_797": "AsyncESP8266_W5100_Manager",
        "placeholder_798": "AsyncESP8266_W5500_Manager",
        "placeholder_799": "AsyncEspFsWebserver",
        "placeholder_800": "AsyncHTTPRequest_ESP32_Ethernet",
        "placeholder_801": "AsyncHTTPRequest_Generic",
        "placeholder_802": "AsyncHTTPRequest_RP2040W",
        "placeholder_803": "AsyncHTTPRequest_Teensy41",
        "placeholder_804": "AsyncHTTPSRequest_ESP32_Ethernet",
        "placeholder_805": "AsyncHTTPSRequest_Generic",
        "placeholder_806": "AsyncLiquidCrystal",
        "placeholder_807": "AsyncMQTT_ESP32",
        "placeholder_808": "AsyncMQTT_Generic",
        "placeholder_809": "AsyncSMS",
        "placeholder_810": "AsyncSerial",
        "placeholder_811": "AsyncServoLib",
        "placeholder_812": "AsyncSonar",
        "placeholder_813": "AsyncStepperLib",
        "placeholder_814": "AsyncStream",
        "placeholder_815": "AsyncTCP",
        "placeholder_816": "AsyncTCP_RP2040W",
        "placeholder_817": "AsyncTCP_SSL",
        "placeholder_818": "AsyncTaskLib",
        "placeholder_819": "AsyncTelegram2",
        "placeholder_820": "AsyncTimer",
        "placeholder_821": "AsyncTimerLib",
        "placeholder_822": "AsyncUDP_ESP32_Ethernet",
        "placeholder_823": "AsyncUDP_ESP32_SC_ENC",
        "placeholder_824": "AsyncUDP_ESP32_SC_Ethernet",
        "placeholder_825": "AsyncUDP_ESP32_SC_W5500",
        "placeholder_826": "AsyncUDP_ESP32_SC_W6100",
        "placeholder_827": "AsyncUDP_ESP32_W5500",
        "placeholder_828": "AsyncUDP_ESP32_W6100",
        "placeholder_829": "AsyncUDP_Ethernet",
        "placeholder_830": "AsyncUDP_RP2040W",
        "placeholder_831": "AsyncUDP_STM32",
        "placeholder_832": "AsyncUDP_Teensy41",
        "placeholder_833": "AsyncUDP_WT32_ETH01",
        "placeholder_834": "AsyncUdp_ESP32_ENC",
        "placeholder_835": "AsyncWT32_ETH01_Manager",
        "placeholder_836": "AsyncWebConfig",
        "placeholder_837": "AsyncWebServer_ESP32_ENC",
        "placeholder_838": "AsyncWebServer_ESP32_SC_ENC",
        "placeholder_839": "AsyncWebServer_ESP32_SC_W5500",
        "placeholder_840": "AsyncWebServer_ESP32_SC_W6100",
        "placeholder_841": "AsyncWebServer_ESP32_W5500",
        "placeholder_842": "AsyncWebServer_ESP32_W6100",
        "placeholder_843": "AsyncWebServer_Ethernet",
        "placeholder_844": "AsyncWebServer_RP2040W",
        "placeholder_845": "AsyncWebServer_STM32",
        "placeholder_846": "AsyncWebServer_Teensy41",
        "placeholder_847": "AsyncWebServer_WT32_ETH01",
        "placeholder_848": "Async_Operations",
        "placeholder_849": "Asynchrony",
        "placeholder_850": "AtTouch",
        "placeholder_851": "Atmega328_IO",
        "placeholder_852": "Atmega32u4_IO",
        "placeholder_853": "Atmega8_IO",
        "placeholder_854": "Atmega8_IO_basic",
        "placeholder_855": "Atmel TSS463C VAN bus Datalink Controller library",
        "placeholder_856": "AtomicWeight",
        "placeholder_857": "AtrivaTECH PicUNO",
        "placeholder_858": "AttachInterruptEx",
        "placeholder_859": "Attiny84_IO",
        "placeholder_860": "Attiny84_IO_basic",
        "placeholder_861": "Attiny85_IO",
        "placeholder_862": "Attiny85_IO_basic",
        "placeholder_863": "Audio",
        "placeholder_864": "Audio - Adafruit Fork",
        "placeholder_865": "AudioFrequencyMeter",
        "placeholder_866": "AudioShieldDTMF",
        "placeholder_867": "AudioZero",
        "placeholder_868": "AutoAnalogAudio",
        "placeholder_869": "AutoConnect",
        "placeholder_870": "AutoOTA",
        "placeholder_871": "AutoPID",
        "placeholder_872": "Automaton",
        "placeholder_873": "Automaton-Esp8266",
        "placeholder_874": "AverageAngle",
        "placeholder_875": "AverageValue",
        "placeholder_876": "AvrHeap",
        "placeholder_877": "AvrTracing",
        "placeholder_878": "Awesome",
        "placeholder_879": "AwesomeClickButton",
        "placeholder_880": "AwsIotWiFiClient",
        "placeholder_881": "AxisJoystick",
        "placeholder_882": "Azure RTOS ThreadX",
        "placeholder_883": "Azure SDK for C",
        "placeholder_884": "AzureIoTHubMQTTClient",
        "placeholder_885": "BBE IoT Class Library",
        "placeholder_886": "BBQ10Keyboard",
        "placeholder_887": "BDSP",
        "placeholder_888": "BGWiFiConfig",
        "placeholder_889": "BH1730",
        "placeholder_890": "BH1750",
        "placeholder_891": "BH1750FVI",
        "placeholder_892": "BH1750FVI_RT",
        "placeholder_893": "BH1750_WE",
        "placeholder_894": "BIP66",
        "placeholder_895": "BLE SDK for Arduino",
        "placeholder_896": "BLE-MIDI",
        "placeholder_897": "BLEPeripheral",
        "placeholder_898": "BLESensorGateway",
        "placeholder_899": "BLESerial",
        "placeholder_900": "BLVD20KM_asukiaaa",
        "placeholder_901": "BM12O2021-A",
        "placeholder_902": "BM12O2321-A",
        "placeholder_903": "BM2102-9x-1",
        "placeholder_904": "BM22S2021-1",
        "placeholder_905": "BM22S3021-1",
        "placeholder_906": "BM22S3031-1",
        "placeholder_907": "BM22S3221-1",
        "placeholder_908": "BM22S3421-1",
        "placeholder_909": "BM22S4221-1",
        "placeholder_910": "BM2302-9x-1",
        "placeholder_911": "BM25S2021-1",
        "placeholder_912": "BM25S3221-1",
        "placeholder_913": "BM25S3321-1",
        "placeholder_914": "BM25S3421-1",
        "placeholder_915": "BM32O2531-A",
        "placeholder_916": "BM32S2031-1",
        "placeholder_917": "BM32S3021-1",
        "placeholder_918": "BM42S5321-1",
        "placeholder_919": "BM52D5021-1",
        "placeholder_920": "BM52D5121-1",
        "placeholder_921": "BM62S2201-1",
        "placeholder_922": "BM64 Library",
        "placeholder_923": "BM7701-00-1",
        "placeholder_924": "BM92S2021-A",
        "placeholder_925": "BM92S2222-A",
        "placeholder_926": "BMB22M210",
        "placeholder_927": "BMC",
        "placeholder_928": "BMC11T001",
        "placeholder_929": "BMC36M0x1",
        "placeholder_930": "BMC56M001",
        "placeholder_931": "BMC81M001",
        "placeholder_932": "BMD11M134",
        "placeholder_933": "BMD26M088",
        "placeholder_934": "BMD31M090",
        "placeholder_935": "BMD58T280",
        "placeholder_936": "BME280",
        "placeholder_937": "BME280_Arduino_I2C",
        "placeholder_938": "BME280_Zanshin",
        "placeholder_939": "BME34M101",
        "placeholder_940": "BME63M001",
        "placeholder_941": "BME680",
        "placeholder_942": "BME68x Sensor library",
        "placeholder_943": "BME82M131",
        "placeholder_944": "BMH06203",
        "placeholder_945": "BMH08002-4",
        "placeholder_946": "BMH12M105",
        "placeholder_947": "BMH23M001",
        "placeholder_948": "BMH23M002",
        "placeholder_949": "BMI270_Sensor",
        "placeholder_950": "BMK22M131",
        "placeholder_951": "BMK52M134",
        "placeholder_952": "BMK52T016",
        "placeholder_953": "BMK54T004",
        "placeholder_954": "BMK56T004",
        "placeholder_955": "BML36M001",
        "placeholder_956": "BMN31K522",
        "placeholder_957": "BMP180MI",
        "placeholder_958": "BMP280",
        "placeholder_959": "BMP280_DEV",
        "placeholder_960": "BMP388_DEV",
        "placeholder_961": "BMP73T102",
        "placeholder_962": "BMP73T104",
        "placeholder_963": "BMP75M131",
        "placeholder_964": "BMS26M833",
        "placeholder_965": "BMS33M332",
        "placeholder_966": "BMS36T001",
        "placeholder_967": "BMS56M605",
        "placeholder_968": "BMS81M001",
        "placeholder_969": "BMV23M001",
        "placeholder_970": "BMV36T001",
        "placeholder_971": "BMx280MI",
        "placeholder_972": "BNO055",
        "placeholder_973": "BNO055SimplePacketComs",
        "placeholder_974": "BOF-Bling_On_ofF",
        "placeholder_975": "BPLib",
        "placeholder_976": "BQ25887",
        "placeholder_977": "BQ25896",
        "placeholder_978": "BRAINZY",
        "placeholder_979": "BSEC Software Library",
        "placeholder_980": "BTLE",
        "placeholder_981": "BTRobocontrol",
        "placeholder_982": "BTS7960",
        "placeholder_983": "BTS7960_Motordriver",
        "placeholder_984": "BUCO-PI",
        "placeholder_985": "BY8X01-16P Audio Module Library",
        "placeholder_986": "Babelduino",
        "placeholder_987": "BackSeatDriver",
        "placeholder_988": "Balboa Spa communications",
        "placeholder_989": "Balboa32U4",
        "placeholder_990": "BaleMessengerBot_Arduino",
        "placeholder_991": "Ballvalve",
        "placeholder_992": "BalmIot",
        "placeholder_993": "Bang",
        "placeholder_994": "BanglaText",
        "placeholder_995": "BareBoneSim800",
        "placeholder_996": "BaroLibrary",
        "placeholder_997": "Bas.Button",
        "placeholder_998": "Bas.CallbackCaller",
        "placeholder_999": "Bas.SinglePinDevice",
        "placeholder_1000": "Base32-Decode",
        "placeholder_1001": "Base64",
        "placeholder_1002": "Basecamp",
        "placeholder_1003": "BasicColorLedControl",
        "placeholder_1004": "BasicEncoder",
        "placeholder_1005": "BasicLinearAlgebra",
        "placeholder_1006": "BasicLinkedList",
        "placeholder_1007": "BasicTag",
        "placeholder_1008": "BasicTimer",
        "placeholder_1009": "BasicTinkering",
        "placeholder_1010": "BasicsLibrary",
        "placeholder_1011": "Batflow",
        "placeholder_1012": "Battery Sense",
        "placeholder_1013": "BatteryMeter",
        "placeholder_1014": "Battery_18650_Stats",
        "placeholder_1015": "Battery_Shield",
        "placeholder_1016": "BaudotCode",
        "placeholder_1017": "BeShell",
        "placeholder_1018": "Beacon",
        "placeholder_1019": "BeaconNano",
        "placeholder_1020": "BeeDataLogger",
        "placeholder_1021": "BeeMotionS3",
        "placeholder_1022": "BeeS3",
        "placeholder_1023": "Beelan LoRaWAN",
        "placeholder_1024": "Benchmark",
        "placeholder_1025": "Better Joystick",
        "placeholder_1026": "BetterOTA",
        "placeholder_1027": "BetterWiFiNINA",
        "placeholder_1028": "Bifrost library for HC-SR04",
        "placeholder_1029": "BigCrystal",
        "placeholder_1030": "BigFont01",
        "placeholder_1031": "BigFont01_I2C",
        "placeholder_1032": "BigFont02",
        "placeholder_1033": "BigFont02_I2C",
        "placeholder_1034": "BigNums2x2",
        "placeholder_1035": "Bind",
        "placeholder_1036": "BioData",
        "placeholder_1037": "BirdhouseSDK",
        "placeholder_1038": "BitArray",
        "placeholder_1039": "BitBang_I2C",
        "placeholder_1040": "BitBool",
        "placeholder_1041": "BitPack",
        "placeholder_1042": "BitReader",
        "placeholder_1043": "Bitcraze PMW3901",
        "placeholder_1044": "BitkitRobit",
        "placeholder_1045": "Bits and Droids flight sim library",
        "placeholder_1046": "BlaeckSerial",
        "placeholder_1047": "BlaeckTCP",
        "placeholder_1048": "Bleeper",
        "placeholder_1049": "Bleeping Library",
        "placeholder_1050": "BlenderServoAnimation",
        "placeholder_1051": "BlinkCode Library",
        "placeholder_1052": "BlinkControl",
        "placeholder_1053": "BlinkSuite",
        "placeholder_1054": "Blinkenlight",
        "placeholder_1055": "Blinker",
        "placeholder_1056": "Blinker_PMSX003ST",
        "placeholder_1057": "BlockNot",
        "placeholder_1058": "BlueDisplay",
        "placeholder_1059": "BlueDot BMA400 Library",
        "placeholder_1060": "BlueDot BME280 Library",
        "placeholder_1061": "BlueDot BME280 TSL2591",
        "placeholder_1062": "BlueDot SGP40 SHT40",
        "placeholder_1063": "BlueFairy",
        "placeholder_1064": "BlueRobotics Arduino_I2C_ESC Library",
        "placeholder_1065": "BlueRobotics Keller LD Library",
        "placeholder_1066": "BlueRobotics MS5837 Library",
        "placeholder_1067": "BlueRobotics TSYS01 Library",
        "placeholder_1068": "BlueVGA Library for BluePill",
        "placeholder_1069": "Bluebird",
        "placeholder_1070": "Bluepad32 for NINA-W10 boards",
        "placeholder_1071": "Blues Notecard Environment Variable Manager",
        "placeholder_1072": "Blues Wireless Notecard",
        "placeholder_1073": "Blues Wireless Notecard Auxiliary Wi-Fi",
        "placeholder_1074": "Blues Wireless Notecard Pseudo Sensor",
        "placeholder_1075": "Blues-Minimal-I2C",
        "placeholder_1076": "BluetoothSerial",
        "placeholder_1077": "BluetoothTerminal",
        "placeholder_1078": "Bluewhale",
        "placeholder_1079": "Blynk",
        "placeholder_1080": "BlynkESP32_BT_WF",
        "placeholder_1081": "BlynkEthernet_Manager",
        "placeholder_1082": "BlynkEthernet_STM32_WM",
        "placeholder_1083": "BlynkGSM_Manager",
        "placeholder_1084": "BlynkGate",
        "placeholder_1085": "BlynkNcpDriver",
        "placeholder_1086": "Blynk_Async_ESP32_BT_WF",
        "placeholder_1087": "Blynk_Async_GSM_Manager",
        "placeholder_1088": "Blynk_Async_WM",
        "placeholder_1089": "Blynk_Esp8266AT_WM",
        "placeholder_1090": "Blynk_Teensy",
        "placeholder_1091": "Blynk_WiFiManager",
        "placeholder_1092": "Blynk_WiFiNINA_WM",
        "placeholder_1093": "Bme280",
        "placeholder_1094": "Board Identify",
        "placeholder_1095": "BobaBlox",
        "placeholder_1096": "Bofu",
        "placeholder_1097": "BohleBots_BNO055",
        "placeholder_1098": "Boho",
        "placeholder_1099": "Bolder Flight Systems AMS5812",
        "placeholder_1100": "Bolder Flight Systems AMS5915",
        "placeholder_1101": "Bolder Flight Systems Ainstein USD1",
        "placeholder_1102": "Bolder Flight Systems Airdata Calculations",
        "placeholder_1103": "Bolder Flight Systems BME280",
        "placeholder_1104": "Bolder Flight Systems BMI088",
        "placeholder_1105": "Bolder Flight Systems Checksum",
        "placeholder_1106": "Bolder Flight Systems Circular Buffer",
        "placeholder_1107": "Bolder Flight Systems Controls",
        "placeholder_1108": "Bolder Flight Systems Eigen",
        "placeholder_1109": "Bolder Flight Systems Excitation",
        "placeholder_1110": "Bolder Flight Systems Filter",
        "placeholder_1111": "Bolder Flight Systems Honeywell HG4930",
        "placeholder_1112": "Bolder Flight Systems Imap",
        "placeholder_1113": "Bolder Flight Systems LEB128",
        "placeholder_1114": "Bolder Flight Systems MPU9250",
        "placeholder_1115": "Bolder Flight Systems MS4525",
        "placeholder_1116": "Bolder Flight Systems Message Framing",
        "placeholder_1117": "Bolder Flight Systems PWM",
        "placeholder_1118": "Bolder Flight Systems Polytools",
        "placeholder_1119": "Bolder Flight Systems SBUS",
        "placeholder_1120": "Bolder Flight Systems Statistics",
        "placeholder_1121": "Bolder Flight Systems Terabee",
        "placeholder_1122": "Bolder Flight Systems UBLOX",
        "placeholder_1123": "Bolder Flight Systems ULEB128",
        "placeholder_1124": "Bolder Flight Systems Unit Conversions",
        "placeholder_1125": "Bolder Flight Systems VectorNav",
        "placeholder_1126": "Bonezegei ILI9341",
        "placeholder_1127": "Bonezegei LCD1602 I2C",
        "placeholder_1128": "Bonezegei_A4988",
        "placeholder_1129": "Bonezegei_Compute",
        "placeholder_1130": "Bonezegei_DHT11",
        "placeholder_1131": "Bonezegei_DHT22",
        "placeholder_1132": "Bonezegei_DRV8825",
        "placeholder_1133": "Bonezegei_DS1307",
        "placeholder_1134": "Bonezegei_DS3231",
        "placeholder_1135": "Bonezegei_GL",
        "placeholder_1136": "Bonezegei_GPS",
        "placeholder_1137": "Bonezegei_GSM",
        "placeholder_1138": "Bonezegei_HCSR04",
        "placeholder_1139": "Bonezegei_HD44780",
        "placeholder_1140": "Bonezegei_I2CScan",
        "placeholder_1141": "Bonezegei_ILI9341v2",
        "placeholder_1142": "Bonezegei_LCD2004_I2C",
        "placeholder_1143": "Bonezegei_List",
        "placeholder_1144": "Bonezegei_PCA9685",
        "placeholder_1145": "Bonezegei_PCF8574",
        "placeholder_1146": "Bonezegei_Printf",
        "placeholder_1147": "Bonezegei_Protocol",
        "placeholder_1148": "Bonezegei_RS485",
        "placeholder_1149": "Bonezegei_SSD1306",
        "placeholder_1150": "Bonezegei_Search",
        "placeholder_1151": "Bonezegei_SoftSerial",
        "placeholder_1152": "Bonezegei_ULN2003_Stepper",
        "placeholder_1153": "Bonezegei_Utility",
        "placeholder_1154": "Bonezegei_WS2812",
        "placeholder_1155": "Bonezegei_XPT2046",
        "placeholder_1156": "Bonezegei_XPT2046v2",
        "placeholder_1157": "Boodskap IoT Digital Twin library",
        "placeholder_1158": "Boodskap Message library",
        "placeholder_1159": "BoodskapTransceiver",
        "placeholder_1160": "BoolArray",
        "placeholder_1161": "BooleanButton",
        "placeholder_1162": "Bootstrapper",
        "placeholder_1163": "Bosch_BME280_Arduino",
        "placeholder_1164": "BotleticsSIM7000",
        "placeholder_1165": "Botly",
        "placeholder_1166": "Bounce2",
        "placeholder_1167": "BowlerCom",
        "placeholder_1168": "Braccio",
        "placeholder_1169": "BraccioRobot",
        "placeholder_1170": "BraccioV2",
        "placeholder_1171": "Brasilino",
        "placeholder_1172": "BresserWeatherSensorReceiver",
        "placeholder_1173": "Bridge",
        "placeholder_1174": "BridgeHttpClient",
        "placeholder_1175": "Brief",
        "placeholder_1176": "Brino",
        "placeholder_1177": "Brushless Servo",
        "placeholder_1178": "Brzo I2C",
        "placeholder_1179": "BufferUtils",
        "placeholder_1180": "Buffered Oreon SSD1351",
        "placeholder_1181": "Buffered Streams",
        "placeholder_1182": "Bugtton",
        "placeholder_1183": "BusInOut_Arduino",
        "placeholder_1184": "BusRepeater_NXP_Arduino",
        "placeholder_1185": "ButtinoRAK",
        "placeholder_1186": "Button",
        "placeholder_1187": "Button-Arduino",
        "placeholder_1188": "Button2",
        "placeholder_1189": "ButtonClickCheck",
        "placeholder_1190": "ButtonControl",
        "placeholder_1191": "ButtonDebounce",
        "placeholder_1192": "ButtonFever",
        "placeholder_1193": "ButtonGestures",
        "placeholder_1194": "ButtonKing",
        "placeholder_1195": "ButtonMatrix",
        "placeholder_1196": "ButtonSuite",
        "placeholder_1197": "ButtonToSwitch_ESP32",
        "placeholder_1198": "Button_SL",
        "placeholder_1199": "Button_TT",
        "placeholder_1200": "ButtonnIRQ",
        "placeholder_1201": "Buzz",
        "placeholder_1202": "Buzzer",
        "placeholder_1203": "ByteConvert",
        "placeholder_1204": "BytebeamArduino",
        "placeholder_1205": "Byteduino",
        "placeholder_1206": "CAGEduino",
        "placeholder_1207": "CAN",
        "placeholder_1208": "CAN Adafruit Fork",
        "placeholder_1209": "CAN_BUS_Shield",
        "placeholder_1210": "CB-HCHO-V4",
        "placeholder_1211": "CBUS",
        "placeholder_1212": "CBUS2515",
        "placeholder_1213": "CBUSACAN2040",
        "placeholder_1214": "CBUSBUZZER",
        "placeholder_1215": "CBUSLED",
        "placeholder_1216": "CBUSMCP_CAN",
        "placeholder_1217": "CBUSSwitch",
        "placeholder_1218": "CBUSconfig",
        "placeholder_1219": "CBeeper",
        "placeholder_1220": "CC-Lantern",
        "placeholder_1221": "CC3000 MDNS",
        "placeholder_1222": "CCIR476",
        "placeholder_1223": "CCS811-Soldered",
        "placeholder_1224": "CD22M3494EZ",
        "placeholder_1225": "CD4511B Seven Segment Display Driver",
        "placeholder_1226": "CD74HC4067",
        "placeholder_1227": "CEClient",
        "placeholder_1228": "CERP - DF-Robot Wireless GamePad V2.0 for Arduino library",
        "placeholder_1229": "CESmartCamp",
        "placeholder_1230": "CF Rotary Encoder",
        "placeholder_1231": "CFPushButton",
        "placeholder_1232": "CH32_Deep_Sleep",
        "placeholder_1233": "CH55xSwitchControl",
        "placeholder_1234": "CH9328-Keyboard",
        "placeholder_1235": "CH9329_Keyboard",
        "placeholder_1236": "CHT8305",
        "placeholder_1237": "CHT8310",
        "placeholder_1238": "CHx01",
        "placeholder_1239": "CIE-PN532",
        "placeholder_1240": "CIE1931",
        "placeholder_1241": "CLAIRE",
        "placeholder_1242": "CLed",
        "placeholder_1243": "CM1106 I2C",
        "placeholder_1244": "CMMC Easy",
        "placeholder_1245": "CMMC MQTT Connector",
        "placeholder_1246": "CMMC OTA",
        "placeholder_1247": "CMMC Packet",
        "placeholder_1248": "CMMC WiFi Connector",
        "placeholder_1249": "CMMC_Interval",
        "placeholder_1250": "CMMC_LED",
        "placeholder_1251": "CMMC_NB-IoT",
        "placeholder_1252": "CONTROLLINO",
        "placeholder_1253": "CPPTasks",
        "placeholder_1254": "CPUTemp",
        "placeholder_1255": "CPUVolt",
        "placeholder_1256": "CQRobotTDS",
        "placeholder_1257": "CRC",
        "placeholder_1258": "CRC Simula Arduino IDE Library",
        "placeholder_1259": "CRC VCNL4200 Library",
        "placeholder_1260": "CRC32",
        "placeholder_1261": "CRCx",
        "placeholder_1262": "CRMX_TimoTwo",
        "placeholder_1263": "CRMui3",
        "placeholder_1264": "CROZONE-VEML6040",
        "placeholder_1265": "CRSF",
        "placeholder_1266": "CRT",
        "placeholder_1267": "CS5464 Arduino",
        "placeholder_1268": "CS5490",
        "placeholder_1269": "CS5530",
        "placeholder_1270": "CSE_ArduinoRS485",
        "placeholder_1271": "CSE_CircularBuffer",
        "placeholder_1272": "CSE_GNSS",
        "placeholder_1273": "CSE_MillisTimer",
        "placeholder_1274": "CSE_ModbusRTU",
        "placeholder_1275": "CST816S",
        "placeholder_1276": "CST816_TouchLib",
        "placeholder_1277": "CSV Parser",
        "placeholder_1278": "CSWBattery",
        "placeholder_1279": "CSWButtons",
        "placeholder_1280": "CTBot",
        "placeholder_1281": "CTC GO CORE",
        "placeholder_1282": "CTC GO MOTIONS",
        "placeholder_1283": "CTRL",
        "placeholder_1284": "CV7OEMFR",
        "placeholder_1285": "CWLibrary",
        "placeholder_1286": "CWW Morse Transmit",
        "placeholder_1287": "CX_Devices",
        "placeholder_1288": "CX_MQTT",
        "placeholder_1289": "CafeIOT",
        "placeholder_1290": "CafeIot_Arduino",
        "placeholder_1291": "CalibratedSpeed",
        "placeholder_1292": "CallMyFunction",
        "placeholder_1293": "Callables",
        "placeholder_1294": "Callback",
        "placeholder_1295": "CallbackButton",
        "placeholder_1296": "CallbackHelper",
        "placeholder_1297": "Calliope Arduino library",
        "placeholder_1298": "Callmebot ESP32",
        "placeholder_1299": "Callmebot ESP8266",
        "placeholder_1300": "Camino",
        "placeholder_1301": "CanAirIO Air Quality Sensors Library",
        "placeholder_1302": "CanBusData_asukiaaa",
        "placeholder_1303": "CanBusMCP2515_asukiaaa",
        "placeholder_1304": "CanSat Kit Library",
        "placeholder_1305": "CanSatNeXT",
        "placeholder_1306": "CanSatNeXT_GNSS",
        "placeholder_1307": "Canon BLE remote",
        "placeholder_1308": "CapacitiveSensor",
        "placeholder_1309": "Capacitor",
        "placeholder_1310": "CaptureTimer",
        "placeholder_1311": "Cardinal",
        "placeholder_1312": "Carduino",
        "placeholder_1313": "CarreraDigitalControlUnit",
        "placeholder_1314": "Cat GFX Thermal Printer Library",
        "placeholder_1315": "CayenneLPP",
        "placeholder_1316": "CayenneLPPdec",
        "placeholder_1317": "CayenneMQTT",
        "placeholder_1318": "Cdrv8833",
        "placeholder_1319": "Ch376msc",
        "placeholder_1320": "CharDisplay",
        "placeholder_1321": "Charge n Boost",
        "placeholder_1322": "Charset",
        "placeholder_1323": "Chassis",
        "placeholder_1324": "ChatGPT_Client",
        "placeholder_1325": "ChatGPTuino",
        "placeholder_1326": "CheapLCD",
        "placeholder_1327": "CheapStepper",
        "placeholder_1328": "CheckDS18B20",
        "placeholder_1329": "Chirale_TensorFLowLite",
        "placeholder_1330": "ChirpSDK",
        "placeholder_1331": "Chrono",
        "placeholder_1332": "Chronos",
        "placeholder_1333": "ChronosESP32",
        "placeholder_1334": "Ciao",
        "placeholder_1335": "CipherCode",
        "placeholder_1336": "Circios Roboter-Steuerung",
        "placeholder_1337": "CircuitPlaygroundGestures",
        "placeholder_1338": "CircuitsFunBasic",
        "placeholder_1339": "CircuitsFunProjects",
        "placeholder_1340": "CircularBuffer",
        "placeholder_1341": "CircularBufferLib",
        "placeholder_1342": "CircularQueue",
        "placeholder_1343": "CirquePinnacle",
        "placeholder_1344": "Clap",
        "placeholder_1345": "CleanRTOS",
        "placeholder_1346": "CliTerminal",
        "placeholder_1347": "ClickButton",
        "placeholder_1348": "ClimaStick",
        "placeholder_1349": "ClimateGuard CG Anem",
        "placeholder_1350": "ClimateGuard RadSens",
        "placeholder_1351": "Clip",
        "placeholder_1352": "Clock",
        "placeholder_1353": "ClockForSeg_Lib",
        "placeholder_1354": "ClosedCube BME680",
        "placeholder_1355": "ClosedCube HDC1010",
        "placeholder_1356": "ClosedCube HDC1080",
        "placeholder_1357": "ClosedCube LPS25HB",
        "placeholder_1358": "ClosedCube MAX30205",
        "placeholder_1359": "ClosedCube OPT3001",
        "placeholder_1360": "ClosedCube OPT3002",
        "placeholder_1361": "ClosedCube SHT31D",
        "placeholder_1362": "ClosedCube SHTC3",
        "placeholder_1363": "ClosedCube Si7051",
        "placeholder_1364": "ClosedCube Si7055",
        "placeholder_1365": "ClosedCube TCA9538",
        "placeholder_1366": "ClosedCube TCA9546A",
        "placeholder_1367": "ClosedCube TCA9548A",
        "placeholder_1368": "ClosedCube TMP116",
        "placeholder_1369": "ClosedCube TSYS01",
        "placeholder_1370": "ClosedCube_I2C_Driver",
        "placeholder_1371": "Cloudchip IoT",
        "placeholder_1372": "ClusterDuck Protocol",
        "placeholder_1373": "CmdMessenger",
        "placeholder_1374": "CmdParser",
        "placeholder_1375": "CmdSerial",
        "placeholder_1376": "CoAP simple library",
        "placeholder_1377": "CoDrone",
        "placeholder_1378": "CodeCell",
        "placeholder_1379": "CodeCodeCodec Library",
        "placeholder_1380": "CodeDebugScope",
        "placeholder_1381": "Codec2",
        "placeholder_1382": "CodingArray MotorShield V1 Library",
        "placeholder_1383": "Cohere_Client",
        "placeholder_1384": "CoilCell",
        "placeholder_1385": "CoinMarketCapApi",
        "placeholder_1386": "Cojson",
        "placeholder_1387": "ColorConverter",
        "placeholder_1388": "Coloria",
        "placeholder_1389": "ColourKit",
        "placeholder_1390": "ComDriverSpi",
        "placeholder_1391": "CommandParser",
        "placeholder_1392": "Commander",
        "placeholder_1393": "Commander-API",
        "placeholder_1394": "Commanders",
        "placeholder_1395": "Comp6DOF_n0m1",
        "placeholder_1396": "CompileTime",
        "placeholder_1397": "Complex",
        "placeholder_1398": "Computherm RF Library",
        "placeholder_1399": "ConductivityLib",
        "placeholder_1400": "ConfigAssist",
        "placeholder_1401": "ConfigManager",
        "placeholder_1402": "ConfigPortal32",
        "placeholder_1403": "ConfigPortal8266",
        "placeholder_1404": "ConfigStorage",
        "placeholder_1405": "ConfigTool",
        "placeholder_1406": "ConfigurableFirmata",
        "placeholder_1407": "Connect Arduino-Supabase",
        "placeholder_1408": "ConnectThings_ESP8266",
        "placeholder_1409": "ConnectionHelper",
        "placeholder_1410": "ConsentiumThings",
        "placeholder_1411": "Console",
        "placeholder_1412": "Constellation",
        "placeholder_1413": "ContinuousStepper",
        "placeholder_1414": "ContinuousStepper_Generic",
        "placeholder_1415": "ControlAssist",
        "placeholder_1416": "ControlLoop",
        "placeholder_1417": "ControlSystemsOS",
        "placeholder_1418": "ControleForno",
        "placeholder_1419": "Controlino",
        "placeholder_1420": "ControlledServo",
        "placeholder_1421": "Controller Utilities",
        "placeholder_1422": "ControllerAsI2c_asukiaaa",
        "placeholder_1423": "CoogleIOT",
        "placeholder_1424": "CoopTask",
        "placeholder_1425": "CoopThreads",
        "placeholder_1426": "Cooperative Multitasking",
        "placeholder_1427": "Coordinates",
        "placeholder_1428": "CopyThreads",
        "placeholder_1429": "CoreX",
        "placeholder_1430": "Correlation",
        "placeholder_1431": "Corsair Lighting Protocol",
        "placeholder_1432": "CosmosNV2",
        "placeholder_1433": "CountDown",
        "placeholder_1434": "CountdownLib",
        "placeholder_1435": "Countimer",
        "placeholder_1436": "CowPi",
        "placeholder_1437": "CowPi_stdio",
        "placeholder_1438": "Cozir",
        "placeholder_1439": "CppLinq",
        "placeholder_1440": "CppPotpourri",
        "placeholder_1441": "Cpp_Standard_Library",
        "placeholder_1442": "CraftConnect_ESP8266",
        "placeholder_1443": "Crazy-IoTik",
        "placeholder_1444": "CrazyHC595",
        "placeholder_1445": "CreativeRobotix",
        "placeholder_1446": "CredentialManager",
        "placeholder_1447": "CronAlarms",
        "placeholder_1448": "CrossMgrLapCounter",
        "placeholder_1449": "Crypto",
        "placeholder_1450": "CryptoAES_CBC",
        "placeholder_1451": "CryptoAuthLib",
        "placeholder_1452": "Crystal C Interpreter",
        "placeholder_1453": "Cubigel",
        "placeholder_1454": "Cumulocity IoT Downstream",
        "placeholder_1455": "Cumulocity IoT Upstreaming",
        "placeholder_1456": "Cumulocity IoT client",
        "placeholder_1457": "CurrentSwitch",
        "placeholder_1458": "CurrentTransformer",
        "placeholder_1459": "CurrentTransformerWithCallbacks",
        "placeholder_1460": "CursedDoubleLinkedListInterface",
        "placeholder_1461": "CurveFitting",
        "placeholder_1462": "Custom PID",
        "placeholder_1463": "CustomJWT",
        "placeholder_1464": "CuteBuzzerSounds",
        "placeholder_1465": "Cytron 3A Motor Driver Shield",
        "placeholder_1466": "Cytron ESPWiFi Shield",
        "placeholder_1467": "Cytron G15 Shield",
        "placeholder_1468": "Cytron Maker Sumo Library",
        "placeholder_1469": "Cytron Motor Drivers Library",
        "placeholder_1470": "Cytron Servo Shield",
        "placeholder_1471": "Cytron_PS2_Shield",
        "placeholder_1472": "Cytron_PikaBot",
        "placeholder_1473": "DA16200 Wi-Fi Library for Arduino",
        "placeholder_1474": "DABDUINO",
        "placeholder_1475": "DABShield",
        "placeholder_1476": "DAC121C08x",
        "placeholder_1477": "DAC7574",
        "placeholder_1478": "DAC7611",
        "placeholder_1479": "DAC8550",
        "placeholder_1480": "DAC8551",
        "placeholder_1481": "DAC8552",
        "placeholder_1482": "DAC8554",
        "placeholder_1483": "DAC8571",
        "placeholder_1484": "DBS-Lib",
        "placeholder_1485": "DCCEXProtocol",
        "placeholder_1486": "DCCpp",
        "placeholder_1487": "DCD SDK for Arduino",
        "placeholder_1488": "DCF77",
        "placeholder_1489": "DCF77Decode",
        "placeholder_1490": "DCMotor",
        "placeholder_1491": "DCS-BIOS",
        "placeholder_1492": "DDBot",
        "placeholder_1493": "DDC-CI VPC library",
        "placeholder_1494": "DDNS_Generic",
        "placeholder_1495": "DDS",
        "placeholder_1496": "DDSM115",
        "placeholder_1497": "DEMO-BOARD",
        "placeholder_1498": "DEVFULL",
        "placeholder_1499": "DEVNULL",
        "placeholder_1500": "DEVRANDOM",
        "placeholder_1501": "DEVTAGLibIA",
        "placeholder_1502": "DF-Print",
        "placeholder_1503": "DFL168A_Async",
        "placeholder_1504": "DFL168A_Sync",
        "placeholder_1505": "DFPlayer Mini Mp3 by Makuna",
        "placeholder_1506": "DFPlayerMini",
        "placeholder_1507": "DFPlayerMini_Fast",
        "placeholder_1508": "DFR0554",
        "placeholder_1509": "DFR_Radar",
        "placeholder_1510": "DFRobot SHT",
        "placeholder_1511": "DFRobotDFPlayerMini",
        "placeholder_1512": "DFRobotIRPosition",
        "placeholder_1513": "DFRobot_AD9837",
        "placeholder_1514": "DFRobot_ADS1115",
        "placeholder_1515": "DFRobot_ADXL345",
        "placeholder_1516": "DFRobot_AHT20",
        "placeholder_1517": "DFRobot_AS3935",
        "placeholder_1518": "DFRobot_AS7341",
        "placeholder_1519": "DFRobot_ASR",
        "placeholder_1520": "DFRobot_AirQualitySensor",
        "placeholder_1521": "DFRobot_Alcohol",
        "placeholder_1522": "DFRobot_BC20_Gravity",
        "placeholder_1523": "DFRobot_BME280",
        "placeholder_1524": "DFRobot_BME680",
        "placeholder_1525": "DFRobot_BMI160",
        "placeholder_1526": "DFRobot_BMM150",
        "placeholder_1527": "DFRobot_BMP280",
        "placeholder_1528": "DFRobot_BMP3XX",
        "placeholder_1529": "DFRobot_BMX160",
        "placeholder_1530": "DFRobot_BT401",
        "placeholder_1531": "DFRobot_B_LUX_V30B",
        "placeholder_1532": "DFRobot_BloodOxygen_S",
        "placeholder_1533": "DFRobot_CCS811",
        "placeholder_1534": "DFRobot_CH423",
        "placeholder_1535": "DFRobot_DF1101S",
        "placeholder_1536": "DFRobot_DF1201S",
        "placeholder_1537": "DFRobot_DF2301Q",
        "placeholder_1538": "DFRobot_DHT11",
        "placeholder_1539": "DFRobot_DHT20",
        "placeholder_1540": "DFRobot_DS1307",
        "placeholder_1541": "DFRobot_DS323X",
        "placeholder_1542": "DFRobot_EC10",
        "placeholder_1543": "DFRobot_ENS160",
        "placeholder_1544": "DFRobot_EOxygenSensor",
        "placeholder_1545": "DFRobot_ESP_EC_BY_GREENPONIK",
        "placeholder_1546": "DFRobot_ESP_PH_WITH_ADC_BY_GREENPONIK",
        "placeholder_1547": "DFRobot_EnvironmentalSensor",
        "placeholder_1548": "DFRobot_FreeTenIMU",
        "placeholder_1549": "DFRobot_GDL",
        "placeholder_1550": "DFRobot_GM60",
        "placeholder_1551": "DFRobot_GNSS",
        "placeholder_1552": "DFRobot_GP8302",
        "placeholder_1553": "DFRobot_GP8403",
        "placeholder_1554": "DFRobot_GP8XXX",
        "placeholder_1555": "DFRobot_Gesture_Touch",
        "placeholder_1556": "DFRobot_HX711",
        "placeholder_1557": "DFRobot_HX711_I2C",
        "placeholder_1558": "DFRobot_Heartrate",
        "placeholder_1559": "DFRobot_I2C_Multiplexer",
        "placeholder_1560": "DFRobot_ICG20660L",
        "placeholder_1561": "DFRobot_ICP10111",
        "placeholder_1562": "DFRobot_ID809_I2C",
        "placeholder_1563": "DFRobot_IICSerial",
        "placeholder_1564": "DFRobot_IIS",
        "placeholder_1565": "DFRobot_INA219",
        "placeholder_1566": "DFRobot_ITG3200",
        "placeholder_1567": "DFRobot_LIDAR07",
        "placeholder_1568": "DFRobot_LIS",
        "placeholder_1569": "DFRobot_LPUPS",
        "placeholder_1570": "DFRobot_LSM303",
        "placeholder_1571": "DFRobot_LWLP",
        "placeholder_1572": "DFRobot_LcdDisplay",
        "placeholder_1573": "DFRobot_LedDisplayModule",
        "placeholder_1574": "DFRobot_LoRa",
        "placeholder_1575": "DFRobot_MAX17043",
        "placeholder_1576": "DFRobot_MAX31855",
        "placeholder_1577": "DFRobot_MAX98357A",
        "placeholder_1578": "DFRobot_MCP23017",
        "placeholder_1579": "DFRobot_MCP2515",
        "placeholder_1580": "DFRobot_MCP4725",
        "placeholder_1581": "DFRobot_MCP9808",
        "placeholder_1582": "DFRobot_MGC3130",
        "placeholder_1583": "DFRobot_MLX90614",
        "placeholder_1584": "DFRobot_MPX5700",
        "placeholder_1585": "DFRobot_MaqueenPlus",
        "placeholder_1586": "DFRobot_MotorStepper",
        "placeholder_1587": "DFRobot_OLED12864",
        "placeholder_1588": "DFRobot_OSD",
        "placeholder_1589": "DFRobot_OxygenSensor",
        "placeholder_1590": "DFRobot_PAJ7620U2",
        "placeholder_1591": "DFRobot_PH",
        "placeholder_1592": "DFRobot_PN532",
        "placeholder_1593": "DFRobot_QMC5883",
        "placeholder_1594": "DFRobot_RGBButton",
        "placeholder_1595": "DFRobot_RGBLCD1602",
        "placeholder_1596": "DFRobot_RGBMatrix",
        "placeholder_1597": "DFRobot_RP2040_SCI",
        "placeholder_1598": "DFRobot_RS01",
        "placeholder_1599": "DFRobot_RTU",
        "placeholder_1600": "DFRobot_RainfallSensor",
        "placeholder_1601": "DFRobot_SCD4X",
        "placeholder_1602": "DFRobot_SGP40",
        "placeholder_1603": "DFRobot_SHT20",
        "placeholder_1604": "DFRobot_SIM",
        "placeholder_1605": "DFRobot_SIM7000",
        "placeholder_1606": "DFRobot_SIM808",
        "placeholder_1607": "DFRobot_ST7687S",
        "placeholder_1608": "DFRobot_STS3X",
        "placeholder_1609": "DFRobot_SU03T",
        "placeholder_1610": "DFRobot_SerialScreen771",
        "placeholder_1611": "DFRobot_SpeechSynthesis",
        "placeholder_1612": "DFRobot_TCS3430",
        "placeholder_1613": "DFRobot_TCS34725",
        "placeholder_1614": "DFRobot_TMF8x01",
        "placeholder_1615": "DFRobot_URM07",
        "placeholder_1616": "DFRobot_URM09",
        "placeholder_1617": "DFRobot_URM13",
        "placeholder_1618": "DFRobot_VEML6075",
        "placeholder_1619": "DFRobot_VEML7700",
        "placeholder_1620": "DFRobot_VL53L0X",
        "placeholder_1621": "DFRobot_VL6180X",
        "placeholder_1622": "DFRobot_VisualRotaryEncoder",
        "placeholder_1623": "DFRobot_VoiceRecorder",
        "placeholder_1624": "DFRobot_digitalPot",
        "placeholder_1625": "DFW",
        "placeholder_1626": "DHT Sensors Non-Blocking",
        "placeholder_1627": "DHT kxn",
        "placeholder_1628": "DHT sensor library",
        "placeholder_1629": "DHT sensor library for ESPx",
        "placeholder_1630": "DHT11",
        "placeholder_1631": "DHT118266",
        "placeholder_1632": "DHT12",
        "placeholder_1633": "DHT12 sensor library",
        "placeholder_1634": "DHT20",
        "placeholder_1635": "DHT22",
        "placeholder_1636": "DHT2pin",
        "placeholder_1637": "DHTINT",
        "placeholder_1638": "DHTNEW",
        "placeholder_1639": "DHTStable",
        "placeholder_1640": "DHTlib",
        "placeholder_1641": "DIGI-DOT-BOOSTER Library",
        "placeholder_1642": "DINO PLC",
        "placeholder_1643": "DINO-PLC",
        "placeholder_1644": "DINO-PLC-V2",
        "placeholder_1645": "DINO_PLC_V1",
        "placeholder_1646": "DIO2",
        "placeholder_1647": "DIYables_4Digit7Segment_74HC595",
        "placeholder_1648": "DIYables_IRcontroller",
        "placeholder_1649": "DIYables_Keypad",
        "placeholder_1650": "DIYables_LED_Matrix",
        "placeholder_1651": "DIYsplay",
        "placeholder_1652": "DJIMotorAlgoESP",
        "placeholder_1653": "DJIMotorCtrlESP",
        "placeholder_1654": "DLLN3X ZigBee Mesh Module Library",
        "placeholder_1655": "DLPacket",
        "placeholder_1656": "DL_PAC_NK76",
        "placeholder_1657": "DLxx416_Arduino",
        "placeholder_1658": "DM8BA10",
        "placeholder_1659": "DMD2",
        "placeholder_1660": "DMD2TUR",
        "placeholder_1661": "DMD32",
        "placeholder_1662": "DMD_STM32",
        "placeholder_1663": "DMM",
        "placeholder_1664": "DMOscillator",
        "placeholder_1665": "DMStepper",
        "placeholder_1666": "DMTimer",
        "placeholder_1667": "DMX Serial Transceiver",
        "placeholder_1668": "DMXSerial",
        "placeholder_1669": "DMXSerial2",
        "placeholder_1670": "DMXUSB",
        "placeholder_1671": "DOC_CAT",
        "placeholder_1672": "DRA818",
        "placeholder_1673": "DRV2667",
        "placeholder_1674": "DRV8251-Driver",
        "placeholder_1675": "DRV8434S",
        "placeholder_1676": "DRV8825",
        "placeholder_1677": "DRV8835MotorShield",
        "placeholder_1678": "DRV8870",
        "placeholder_1679": "DS MCP4018 Library",
        "placeholder_1680": "DS PCA9536 Library",
        "placeholder_1681": "DS1307",
        "placeholder_1682": "DS1307 Emulator",
        "placeholder_1683": "DS1307RTC",
        "placeholder_1684": "DS1307newAlarms",
        "placeholder_1685": "DS1624",
        "placeholder_1686": "DS1624_Library",
        "placeholder_1687": "DS1631",
        "placeholder_1688": "DS1821",
        "placeholder_1689": "DS1881",
        "placeholder_1690": "DS18B20",
        "placeholder_1691": "DS18B20Events",
        "placeholder_1692": "DS18B20_RT",
        "placeholder_1693": "DS18B20_int",
        "placeholder_1694": "DS2",
        "placeholder_1695": "DS2401",
        "placeholder_1696": "DS2431",
        "placeholder_1697": "DS2438",
        "placeholder_1698": "DS28CM00",
        "placeholder_1699": "DS3231",
        "placeholder_1700": "DS3231-RTC",
        "placeholder_1701": "DS3231M",
        "placeholder_1702": "DS3231_RTC",
        "placeholder_1703": "DS3232",
        "placeholder_1704": "DS3232RTC",
        "placeholder_1705": "DS323x",
        "placeholder_1706": "DS323x_Generic",
        "placeholder_1707": "DS4",
        "placeholder_1708": "DSC Keybus Interface",
        "placeholder_1709": "DSFamily",
        "placeholder_1710": "DSPFilters",
        "placeholder_1711": "DST RTC",
        "placeholder_1712": "DSpotterSDK_Maker_33BLE",
        "placeholder_1713": "DSpotterSDK_Maker_NiclaVision",
        "placeholder_1714": "DSpotterSDK_Maker_PortentaH7",
        "placeholder_1715": "DSpotterSDK_Maker_RP2040",
        "placeholder_1716": "DTF_ESP32Update",
        "placeholder_1717": "DTF_ESP8266Update",
        "placeholder_1718": "DTime",
        "placeholder_1719": "DU-INO",
        "placeholder_1720": "DUE_ADC_Oversampler",
        "placeholder_1721": "DUE_schmitt",
        "placeholder_1722": "DW1000",
        "placeholder_1723": "DWIN T5L API wrapper",
        "placeholder_1724": "DWIN_DGUS_HMI",
        "placeholder_1725": "Dabble",
        "placeholder_1726": "DabbleESP32",
        "placeholder_1727": "DacESP32",
        "placeholder_1728": "DailyService",
        "placeholder_1729": "DailyStruggleButton",
        "placeholder_1730": "DaisyDuino",
        "placeholder_1731": "DallasTemperature",
        "placeholder_1732": "DarkSkySevenDay",
        "placeholder_1733": "Dashboard IoT",
        "placeholder_1734": "Dashio",
        "placeholder_1735": "DashioBluefruit",
        "placeholder_1736": "DashioBluno",
        "placeholder_1737": "DashioESP",
        "placeholder_1738": "DashioMKR1500",
        "placeholder_1739": "DashioNano33BLE",
        "placeholder_1740": "DashioSAMD_NINA",
        "placeholder_1741": "DataLogger",
        "placeholder_1742": "DataSeriesPod",
        "placeholder_1743": "DataServeriOS",
        "placeholder_1744": "DataTome",
        "placeholder_1745": "DataVisualizer",
        "placeholder_1746": "DatabaseOnSD",
        "placeholder_1747": "DatavisionLCD",
        "placeholder_1748": "DateTimeFunctions",
        "placeholder_1749": "DcDccNanoController",
        "placeholder_1750": "DeadReckoning-library",
        "placeholder_1751": "DebounceEvent",
        "placeholder_1752": "DebounceFilterLib",
        "placeholder_1753": "DebounceMe",
        "placeholder_1754": "DebouncedButton",
        "placeholder_1755": "DebouncedLDR",
        "placeholder_1756": "Debouncer",
        "placeholder_1757": "DebugLog",
        "placeholder_1758": "Debugger",
        "placeholder_1759": "DecodeIR",
        "placeholder_1760": "DeepSleepScheduler",
        "placeholder_1761": "DelayExec",
        "placeholder_1762": "Deneyap 5x7 LED Matris",
        "placeholder_1763": "Deneyap 6 Eksen Alaletsel Olcum Birimi",
        "placeholder_1764": "Deneyap 9-Eksen Ataletsel Olcum Birimi",
        "placeholder_1765": "Deneyap Arduino Examples",
        "placeholder_1766": "Deneyap Arduino Projeleri",
        "placeholder_1767": "Deneyap Basinc Olcer",
        "placeholder_1768": "Deneyap Cift Kanalli Cizgi Algilayici",
        "placeholder_1769": "Deneyap Cift Kanalli Motor Surucu",
        "placeholder_1770": "Deneyap Derinlik Olcer",
        "placeholder_1771": "Deneyap Dokunmatik Tus Takimi",
        "placeholder_1772": "Deneyap Duman Dedektoru",
        "placeholder_1773": "Deneyap GPS ve GLONASS Konum Belirleyici",
        "placeholder_1774": "Deneyap Gercek Zamanli Saat",
        "placeholder_1775": "Deneyap Hareket Algilama",
        "placeholder_1776": "Deneyap Hareket Isik Renk Algilayici Mesafe Olcer",
        "placeholder_1777": "Deneyap Hoparlor",
        "placeholder_1778": "Deneyap Kart IDE Ornekler",
        "placeholder_1779": "Deneyap Kart QRCodeReader",
        "placeholder_1780": "Deneyap Kizilotesi Alici Verici",
        "placeholder_1781": "Deneyap Kumanda Kolu",
        "placeholder_1782": "Deneyap Mesafe Olcer Isik Algilayici",
        "placeholder_1783": "Deneyap Mikrofon",
        "placeholder_1784": "Deneyap OLED Ekran",
        "placeholder_1785": "Deneyap Renk Donusturme",
        "placeholder_1786": "Deneyap Role",
        "placeholder_1787": "Deneyap Servo",
        "placeholder_1788": "Deneyap Sicaklik Nem Basinc Olcer",
        "placeholder_1789": "Deneyap Sicaklik Nem Olcer",
        "placeholder_1790": "Deneyap Telegram",
        "placeholder_1791": "Deneyap Toprak Nemi Olcer",
        "placeholder_1792": "Deneyap Ultraviyole Isik Algilayici",
        "placeholder_1793": "Deneyap Yagmur Algilayici",
        "placeholder_1794": "Derivs_Limiter",
        "placeholder_1795": "Design Informatics Base",
        "placeholder_1796": "DeviceConfigJSON",
        "placeholder_1797": "DeviceController",
        "placeholder_1798": "Devuino",
        "placeholder_1799": "Diablo16-Serial-Arduino-Library",
        "placeholder_1800": "Dictionary",
        "placeholder_1801": "Didactic Robot",
        "placeholder_1802": "Differential Steering",
        "placeholder_1803": "DigiCombo",
        "placeholder_1804": "DigiFont",
        "placeholder_1805": "DigiKeyboardBe",
        "placeholder_1806": "DigiKeyboardFr",
        "placeholder_1807": "DigiPotX9Cxxx",
        "placeholder_1808": "DigiSpark_PWM",
        "placeholder_1809": "DigitLed72xx",
        "placeholder_1810": "DigitLedDisplay",
        "placeholder_1811": "DigitSeparator",
        "placeholder_1812": "Digital Infrared Temperature Sensor MLX90615",
        "placeholder_1813": "Digital Rain Animation",
        "placeholder_1814": "DigitalIO",
        "placeholder_1815": "DigitalPressureSensor",
        "placeholder_1816": "DigitalSignalsArduino",
        "placeholder_1817": "DimSwitch",
        "placeholder_1818": "Dimmable Light for Arduino",
        "placeholder_1819": "Dimmer class for ATmega32U4",
        "placeholder_1820": "Dimmer class for SAMD21",
        "placeholder_1821": "DimmerControl",
        "placeholder_1822": "DiodeIoT_SI-1104",
        "placeholder_1823": "DiodeIoT_SI-1108",
        "placeholder_1824": "DiodeIoT_SI-1116",
        "placeholder_1825": "DirectCurrent_Motor_Module",
        "placeholder_1826": "DirectNECTransmitter",
        "placeholder_1827": "DisCard",
        "placeholder_1828": "Discord_WebHook",
        "placeholder_1829": "DisplayMenu",
        "placeholder_1830": "DisplayUtils",
        "placeholder_1831": "DistanceSensor",
        "placeholder_1832": "DistanceTable",
        "placeholder_1833": "DmtrPots",
        "placeholder_1834": "DmxSimple",
        "placeholder_1835": "DonoLed",
        "placeholder_1836": "Dorpac-timer",
        "placeholder_1837": "DotMatrix5x7",
        "placeholder_1838": "DotMatrixDisplay",
        "placeholder_1839": "DoubleEMAFilterLib",
        "placeholder_1840": "DoubleLinkedList",
        "placeholder_1841": "DoubleResetDetect",
        "placeholder_1842": "DoubleResetDetector",
        "placeholder_1843": "DoubleResetDetector_Generic",
        "placeholder_1844": "DoublyLinkedList",
        "placeholder_1845": "DovesLapTimer",
        "placeholder_1846": "Drive",
        "placeholder_1847": "DriveCell",
        "placeholder_1848": "DriveMaster",
        "placeholder_1849": "DropboxManager",
        "placeholder_1850": "Ds1302",
        "placeholder_1851": "DualG2HighPowerMotorShield",
        "placeholder_1852": "DualMAX14870MotorShield",
        "placeholder_1853": "DualMC33926MotorShield",
        "placeholder_1854": "DualSenseController",
        "placeholder_1855": "DualTB9051FTGMotorShield",
        "placeholder_1856": "DualVNH5019MotorShield",
        "placeholder_1857": "DualVNH5019MotorShieldMod3",
        "placeholder_1858": "DueAdcFast",
        "placeholder_1859": "DueFlashStorage",
        "placeholder_1860": "DueTimer",
        "placeholder_1861": "DumbDisplay",
        "placeholder_1862": "Dump",
        "placeholder_1863": "DunogeonENG",
        "placeholder_1864": "DunogeonFR",
        "placeholder_1865": "Dusk2Dawn",
        "placeholder_1866": "DvG_StreamCommand",
        "placeholder_1867": "Dx_PWM",
        "placeholder_1868": "Dx_Slow_PWM",
        "placeholder_1869": "Dx_TimerInterrupt",
        "placeholder_1870": "Dynamixel",
        "placeholder_1871": "Dynamixel2Arduino",
        "placeholder_1872": "DynamixelShield",
        "placeholder_1873": "Dynamixel_Servo",
        "placeholder_1874": "E131",
        "placeholder_1875": "E220-900T22S-JP",
        "placeholder_1876": "E220Lib",
        "placeholder_1877": "E24",
        "placeholder_1878": "EAA_MLX90614",
        "placeholder_1879": "EASE_ArduinoCode",
        "placeholder_1880": "EButton",
        "placeholder_1881": "EByte LoRa E22 library",
        "placeholder_1882": "EByte LoRa E220 library",
        "placeholder_1883": "EByte LoRa E32 library",
        "placeholder_1884": "EByte RF E70 library",
        "placeholder_1885": "EDB",
        "placeholder_1886": "EE895 Arduino Library",
        "placeholder_1887": "EEBoom",
        "placeholder_1888": "EEManager",
        "placeholder_1889": "EEPROM-Storage",
        "placeholder_1890": "EEPROM32_Rotate",
        "placeholder_1891": "EEPROMAdapter",
        "placeholder_1892": "EEPROMEx",
        "placeholder_1893": "EEPROMReader",
        "placeholder_1894": "EEPROMTyped",
        "placeholder_1895": "EEPROMWearLevel",
        "placeholder_1896": "EEPROM_24LC64F",
        "placeholder_1897": "EEPROM_CAT25",
        "placeholder_1898": "EEPROM_Rotate",
        "placeholder_1899": "EEPROM_SPI_WE",
        "placeholder_1900": "EEPROM_STM_Arduino",
        "placeholder_1901": "EEPROM_WL",
        "placeholder_1902": "EEPROMextent",
        "placeholder_1903": "EEPROMsimple",
        "placeholder_1904": "EEPstore",
        "placeholder_1905": "EERAM_47XXX",
        "placeholder_1906": "EEWL",
        "placeholder_1907": "EEWrap",
        "placeholder_1908": "EEvar",
        "placeholder_1909": "ELIO-ARDUINO-EXAMPLE",
        "placeholder_1910": "ELMDuino",
        "placeholder_1911": "ELMo",
        "placeholder_1912": "ELT S300 Library",
        "placeholder_1913": "EL_dev_arduino",
        "placeholder_1914": "ELi_McM_4_00",
        "placeholder_1915": "ELi_MdM_4_00",
        "placeholder_1916": "EMFButton",
        "placeholder_1917": "EMUSerial",
        "placeholder_1918": "EMUcan",
        "placeholder_1919": "EMailSender",
        "placeholder_1920": "EMoRo 2560",
        "placeholder_1921": "ENGR100-950",
        "placeholder_1922": "ENGR100-980",
        "placeholder_1923": "ENS160 - Adafruit Fork",
        "placeholder_1924": "ENS210",
        "placeholder_1925": "ENS22",
        "placeholder_1926": "EPD",
        "placeholder_1927": "EQSP32",
        "placeholder_1928": "ERLtech-RobotControl",
        "placeholder_1929": "ERLtechRobotcontrol",
        "placeholder_1930": "ERM19264_UC1609",
        "placeholder_1931": "ERO",
        "placeholder_1932": "ERPC",
        "placeholder_1933": "ER_OLEDM1_CH1115",
        "placeholder_1934": "ERa",
        "placeholder_1935": "ES32Lab",
        "placeholder_1936": "ES920",
        "placeholder_1937": "ESC Thermal Printer BLE",
        "placeholder_1938": "ESP Async E1.31",
        "placeholder_1939": "ESP Async Web Server",
        "placeholder_1940": "ESP Async WebServer",
        "placeholder_1941": "ESP Battery",
        "placeholder_1942": "ESP Line Notify",
        "placeholder_1943": "ESP Mail Client",
        "placeholder_1944": "ESP OTA GitHub",
        "placeholder_1945": "ESP QRcode",
        "placeholder_1946": "ESP Rotary",
        "placeholder_1947": "ESP Telnet",
        "placeholder_1948": "ESP-DASH",
        "placeholder_1949": "ESP-FlexyStepper",
        "placeholder_1950": "ESP-Google-Forms-Client",
        "placeholder_1951": "ESP-Google-Sheet-Client",
        "placeholder_1952": "ESP-NOW MIDI",
        "placeholder_1953": "ESP-StepperMotor-Server",
        "placeholder_1954": "ESP-WiFiSettings",
        "placeholder_1955": "ESP-Wifi-Config",
        "placeholder_1956": "ESP2SOTA",
        "placeholder_1957": "ESP32 AnalogWrite",
        "placeholder_1958": "ESP32 BLE ANCS Notifications",
        "placeholder_1959": "ESP32 BLE Arduino",
        "placeholder_1960": "ESP32 Control",
        "placeholder_1961": "ESP32 Control lite",
        "placeholder_1962": "ESP32 Digital RGB LED Drivers",
        "placeholder_1963": "ESP32 ESP32S2 AnalogWrite",
        "placeholder_1964": "ESP32 FX1N PLC",
        "placeholder_1965": "ESP32 File Manager for Generation Klick ESPFMfGK",
        "placeholder_1966": "ESP32 HUB75 LED MATRIX PANEL DMA Display",
        "placeholder_1967": "ESP32 I2C Slave",
        "placeholder_1968": "ESP32 Lite Pack Library",
        "placeholder_1969": "ESP32 Mail Client",
        "placeholder_1970": "ESP32 Microsoft Graph",
        "placeholder_1971": "ESP32 RMT Peripheral VAN bus reader library",
        "placeholder_1972": "ESP32 Rest Client",
        "placeholder_1973": "ESP32 ULP Debugger",
        "placeholder_1974": "ESP32-BLE-Gamepad",
        "placeholder_1975": "ESP32-BLE-MIDI",
        "placeholder_1976": "ESP32-Chimera-Core",
        "placeholder_1977": "ESP32-ENC28J60",
        "placeholder_1978": "ESP32-OTA",
        "placeholder_1979": "ESP32-OTA-Pull",
        "placeholder_1980": "ESP32-PSRamFS",
        "placeholder_1981": "ESP32-PTQS1005",
        "placeholder_1982": "ESP32-TWAI-CAN",
        "placeholder_1983": "ESP32-USB-Soft-Host",
        "placeholder_1984": "ESP32-imgur-uploader",
        "placeholder_1985": "ESP32-targz",
        "placeholder_1986": "ESP32AnalogRead",
        "placeholder_1987": "ESP32CAR",
        "placeholder_1988": "ESP32Console",
        "placeholder_1989": "ESP32DMASPI",
        "placeholder_1990": "ESP32Dispatcher",
        "placeholder_1991": "ESP32Encoder",
        "placeholder_1992": "ESP32Logger",
        "placeholder_1993": "ESP32Logger2",
        "placeholder_1994": "ESP32MQTTClient",
        "placeholder_1995": "ESP32MX1508",
        "placeholder_1996": "ESP32MotorControl",
        "placeholder_1997": "ESP32PsramLock",
        "placeholder_1998": "ESP32RotaryEncoder",
        "placeholder_1999": "ESP32SPISlave",
        "placeholder_2000": "ESP32Servo",
        "placeholder_2001": "ESP32Servo360",
        "placeholder_2002": "ESP32Time",
        "placeholder_2003": "ESP32TimerInterrupt",
        "placeholder_2004": "ESP32TinyUSB",
        "placeholder_2005": "ESP32WebRemoteControl",
        "placeholder_2006": "ESP32_BleSerial",
        "placeholder_2007": "ESP32_Button",
        "placeholder_2008": "ESP32_C3_ISR_Servo",
        "placeholder_2009": "ESP32_C3_TimerInterrupt",
        "placeholder_2010": "ESP32_Display_Panel",
        "placeholder_2011": "ESP32_ENC_Manager",
        "placeholder_2012": "ESP32_Ethernet_Manager",
        "placeholder_2013": "ESP32_FastPWM",
        "placeholder_2014": "ESP32_HTTPS_Server",
        "placeholder_2015": "ESP32_IDF5_HTTPS_Server",
        "placeholder_2016": "ESP32_IO_Expander",
        "placeholder_2017": "ESP32_ISR_Servo",
        "placeholder_2018": "ESP32_Knob",
        "placeholder_2019": "ESP32_MySQL",
        "placeholder_2020": "ESP32_New_ISR_Servo",
        "placeholder_2021": "ESP32_New_TimerInterrupt",
        "placeholder_2022": "ESP32_PWM",
        "placeholder_2023": "ESP32_Pinoo",
        "placeholder_2024": "ESP32_RTC_EEPROM",
        "placeholder_2025": "ESP32_S2_ISR_Servo",
        "placeholder_2026": "ESP32_S2_TimerInterrupt",
        "placeholder_2027": "ESP32_SC_ENC_Manager",
        "placeholder_2028": "ESP32_SC_Ethernet_Manager",
        "placeholder_2029": "ESP32_SC_W5500_Manager",
        "placeholder_2030": "ESP32_SC_W6100_Manager",
        "placeholder_2031": "ESP32_SemBeacon",
        "placeholder_2032": "ESP32_SoftWire",
        "placeholder_2033": "ESP32_USB_STREAM",
        "placeholder_2034": "ESP32_VS1053_Stream",
        "placeholder_2035": "ESP32_W5500_Manager",
        "placeholder_2036": "ESP32_W6100_Manager",
        "placeholder_2037": "ESP32_WS2812_Lib",
        "placeholder_2038": "ESP32_easy_wifi_data",
        "placeholder_2039": "ESP32httpUpdate",
        "placeholder_2040": "ESP32softPWM",
        "placeholder_2041": "ESP8266 Influxdb",
        "placeholder_2042": "ESP8266 MQTT Mesh",
        "placeholder_2043": "ESP8266 Microgear",
        "placeholder_2044": "ESP8266 QRcode",
        "placeholder_2045": "ESP8266 Weather Station",
        "placeholder_2046": "ESP8266 and ESP32 OLED driver for SSD1306 displays",
        "placeholder_2047": "ESP8266-OLED Display Library",
        "placeholder_2048": "ESP8266-ping",
        "placeholder_2049": "ESP8266Audio",
        "placeholder_2050": "ESP8266AutoWifi",
        "placeholder_2051": "ESP8266IoTHelper",
        "placeholder_2052": "ESP8266MQTTClient",
        "placeholder_2053": "ESP8266RTTTLPlus",
        "placeholder_2054": "ESP8266RestClient",
        "placeholder_2055": "ESP8266SAM_ES",
        "placeholder_2056": "ESP8266SDUpdater",
        "placeholder_2057": "ESP8266Scheduler",
        "placeholder_2058": "ESP8266TimerInterrupt",
        "placeholder_2059": "ESP8266_AT_WebServer",
        "placeholder_2060": "ESP8266_ENC_Manager",
        "placeholder_2061": "ESP8266_Ethernet_Manager",
        "placeholder_2062": "ESP8266_ISR_Servo",
        "placeholder_2063": "ESP8266_LED_64x16_Matrix",
        "placeholder_2064": "ESP8266_PWM",
        "placeholder_2065": "ESP8266_W5100_Manager",
        "placeholder_2066": "ESP8266_W5500_Manager",
        "placeholder_2067": "ESP8266_multipart",
        "placeholder_2068": "ESPAsyncButton",
        "placeholder_2069": "ESPAsyncHTTPUpdateServer",
        "placeholder_2070": "ESPAsyncTCP",
        "placeholder_2071": "ESPAsyncWebServer",
        "placeholder_2072": "ESPAsyncWebSrv",
        "placeholder_2073": "ESPAsync_WiFiManager",
        "placeholder_2074": "ESPAsync_WiFiManager_Lite",
        "placeholder_2075": "ESPAutoWiFiConfig",
        "placeholder_2076": "ESPAutoWifi",
        "placeholder_2077": "ESPCanary",
        "placeholder_2078": "ESPConnect",
        "placeholder_2079": "ESPDateTime",
        "placeholder_2080": "ESPDisplay",
        "placeholder_2081": "ESPEssentials",
        "placeholder_2082": "ESPFlash",
        "placeholder_2083": "ESPHap",
        "placeholder_2084": "ESPLogger",
        "placeholder_2085": "ESPMail",
        "placeholder_2086": "ESPManager",
        "placeholder_2087": "ESPNexUpload",
        "placeholder_2088": "ESPPerfectTime",
        "placeholder_2089": "ESPPubSubClientWrapper",
        "placeholder_2090": "ESPSerialFlasher",
        "placeholder_2091": "ESPStringTemplate",
        "placeholder_2092": "ESPSupabase",
        "placeholder_2093": "ESPUI",
        "placeholder_2094": "ESPVGAX",
        "placeholder_2095": "ESPVGAX2",
        "placeholder_2096": "ESPWebDAV",
        "placeholder_2097": "ESPWiFiMqttWrapper",
        "placeholder_2098": "ESP_8_BIT Color Composite Video Library",
        "placeholder_2099": "ESP_AT_Lib",
        "placeholder_2100": "ESP_AT_WM_Lite",
        "placeholder_2101": "ESP_AT_WiFiManager",
        "placeholder_2102": "ESP_DoubleResetDetector",
        "placeholder_2103": "ESP_EEPROM",
        "placeholder_2104": "ESP_LM35",
        "placeholder_2105": "ESP_MultiResetDetector",
        "placeholder_2106": "ESP_MultiWiFi",
        "placeholder_2107": "ESP_NOW_Network",
        "placeholder_2108": "ESP_SSLClient",
        "placeholder_2109": "ESP_TF",
        "placeholder_2110": "ESP_WiFiManager",
        "placeholder_2111": "ESP_WiFiManager_Lite",
        "placeholder_2112": "ESPboy",
        "placeholder_2113": "ESPectro",
        "placeholder_2114": "ESPectro32",
        "placeholder_2115": "ESPert",
        "placeholder_2116": "ESPiLight",
        "placeholder_2117": "ESPpassthrough",
        "placeholder_2118": "ESPping",
        "placeholder_2119": "ESPxRGB",
        "placeholder_2120": "ESensors",
        "placeholder_2121": "EVN",
        "placeholder_2122": "EWMA",
        "placeholder_2123": "EZButton",
        "placeholder_2124": "EZPROM",
        "placeholder_2125": "EZ_USB_MIDI_HOST",
        "placeholder_2126": "EasIno",
        "placeholder_2127": "Easing",
        "placeholder_2128": "Easy IoT with CC1101 - Sub-1GHz LORA-like",
        "placeholder_2129": "Easy MFRC522",
        "placeholder_2130": "Easy NeoPixels",
        "placeholder_2131": "Easy Nextion Library",
        "placeholder_2132": "Easy SevenSeg",
        "placeholder_2133": "EasyAndee",
        "placeholder_2134": "EasyAndee101",
        "placeholder_2135": "EasyBNO055 ESP",
        "placeholder_2136": "EasyButton",
        "placeholder_2137": "EasyButtonAtInt01",
        "placeholder_2138": "EasyBuzzer",
        "placeholder_2139": "EasyColor",
        "placeholder_2140": "EasyCommaLib",
        "placeholder_2141": "EasyDDNS",
        "placeholder_2142": "EasyGNSS",
        "placeholder_2143": "EasyHTTP",
        "placeholder_2144": "EasyLed",
        "placeholder_2145": "EasyLogger",
        "placeholder_2146": "EasyMorse",
        "placeholder_2147": "EasyNTPClient",
        "placeholder_2148": "EasyOpenTherm",
        "placeholder_2149": "EasyPCF8574",
        "placeholder_2150": "EasyPCF8575",
        "placeholder_2151": "EasyPin",
        "placeholder_2152": "EasyPreferences",
        "placeholder_2153": "EasySSDP",
        "placeholder_2154": "EasyStringStream",
        "placeholder_2155": "EasyTask",
        "placeholder_2156": "EasyUltrasonic",
        "placeholder_2157": "EasyVR",
        "placeholder_2158": "EasyWebServer",
        "placeholder_2159": "EasyingLib",
        "placeholder_2160": "Easyiot-Esp8266",
        "placeholder_2161": "Easyuino",
        "placeholder_2162": "Eccel-C1",
        "placeholder_2163": "Edge-fel",
        "placeholder_2164": "EdgeML-Arduino",
        "placeholder_2165": "EdgeNeuron",
        "placeholder_2166": "EdgieD",
        "placeholder_2167": "EduBox",
        "placeholder_2168": "EduIntro",
        "placeholder_2169": "EduShield",
        "placeholder_2170": "EduShield-2 Library",
        "placeholder_2171": "EducationShield",
        "placeholder_2172": "EepromSecureData",
        "placeholder_2173": "Effortless-SPIFFS",
        "placeholder_2174": "EgoSmartHeaterRS485",
        "placeholder_2175": "EiMOS",
        "placeholder_2176": "EiMOS_U8X8",
        "placeholder_2177": "Eigen",
        "placeholder_2178": "Electronic Cats PN7150",
        "placeholder_2179": "ElectronicsEducation",
        "placeholder_2180": "ElegantOTA",
        "placeholder_2181": "Elegoo",
        "placeholder_2182": "Elektor_AudioDSP",
        "placeholder_2183": "Elog",
        "placeholder_2184": "EloquentArduino",
        "placeholder_2185": "EloquentEsp32cam",
        "placeholder_2186": "EloquentRTLS",
        "placeholder_2187": "EloquentSurveillance",
        "placeholder_2188": "EloquentTensorFlow32",
        "placeholder_2189": "EloquentTensorFlowCortexM",
        "placeholder_2190": "EloquentTinyML",
        "placeholder_2191": "EloquentVision",
        "placeholder_2192": "Eloquent_EdgeImpulse",
        "placeholder_2193": "EmSevenSegment",
        "placeholder_2194": "EmbAJAX",
        "placeholder_2195": "EmbUI",
        "placeholder_2196": "EmbedUI",
        "placeholder_2197": "Embedded Template Library ETL",
        "placeholder_2198": "Embedded Type-C PID",
        "placeholder_2199": "EmbeddedMqttBroker",
        "placeholder_2200": "EmbeddedSparkplugNode",
        "placeholder_2201": "EmbeddedUtils",
        "placeholder_2202": "EmbeddronicsBleOTA",
        "placeholder_2203": "Embedis",
        "placeholder_2204": "EmberGL",
        "placeholder_2205": "EmonLib",
        "placeholder_2206": "EmotiBit ADS1X15",
        "placeholder_2207": "EmotiBit ArduinoFilters",
        "placeholder_2208": "EmotiBit BMI160",
        "placeholder_2209": "EmotiBit EmojiLib",
        "placeholder_2210": "EmotiBit External EEPROM",
        "placeholder_2211": "EmotiBit FeatherWing",
        "placeholder_2212": "EmotiBit MAX30101",
        "placeholder_2213": "EmotiBit MLX90632",
        "placeholder_2214": "EmotiBit NCP5623",
        "placeholder_2215": "EmotiBit SI7013",
        "placeholder_2216": "EmotiBit SimpleFTPServer",
        "placeholder_2217": "EmotiBit XPlat Utils",
        "placeholder_2218": "Emulation",
        "placeholder_2219": "EnableInterrupt",
        "placeholder_2220": "EncButton",
        "placeholder_2221": "Encoder",
        "placeholder_2222": "EncoderButton",
        "placeholder_2223": "EncoderStepCounter",
        "placeholder_2224": "EncoderTool",
        "placeholder_2225": "Endo-Continuum-Robot",
        "placeholder_2226": "Energesis LM35",
        "placeholder_2227": "Energesis_GenericSensor",
        "placeholder_2228": "EnergyBoard",
        "placeholder_2229": "EnergyMeter",
        "placeholder_2230": "Engineer EasyEEPROM",
        "placeholder_2231": "Engineer Regulator",
        "placeholder_2232": "EnviroDIY_DS3231",
        "placeholder_2233": "Environment",
        "placeholder_2234": "Ephemeris",
        "placeholder_2235": "Epson_PNL_CE02",
        "placeholder_2236": "Epson_SU_SPI",
        "placeholder_2237": "Epson_SU_UART",
        "placeholder_2238": "Eridano-Septentrio",
        "placeholder_2239": "EscalatorSwitch",
        "placeholder_2240": "EscapeAutomate",
        "placeholder_2241": "Escon",
        "placeholder_2242": "Escornabot-Library",
        "placeholder_2243": "Escornabot-lib",
        "placeholder_2244": "EscornabotEXT",
        "placeholder_2245": "Esp32SimplePacketComs",
        "placeholder_2246": "Esp32WifiManager",
        "placeholder_2247": "Esp8266-Mqtt-Canary",
        "placeholder_2248": "EspATMQTT",
        "placeholder_2249": "EspBootstrap",
        "placeholder_2250": "EspEasyUtils",
        "placeholder_2251": "EspHtmlTemplateProcessor",
        "placeholder_2252": "EspMQTTClient",
        "placeholder_2253": "EspNow2Mqtt",
        "placeholder_2254": "EspNowCam",
        "placeholder_2255": "EspNowJoystick",
        "placeholder_2256": "EspNowNetworkHost",
        "placeholder_2257": "EspNowNetworkHostDriver",
        "placeholder_2258": "EspNowNetworkNode",
        "placeholder_2259": "EspNowNetworkShared",
        "placeholder_2260": "EspSaveCrash",
        "placeholder_2261": "EspSimpleRemoteUpdate",
        "placeholder_2262": "EspSimpleWifiHandler",
        "placeholder_2263": "EspSleep",
        "placeholder_2264": "EspSoftwareSerial",
        "placeholder_2265": "EspUsbHost",
        "placeholder_2266": "EspWii",
        "placeholder_2267": "Espalexa",
        "placeholder_2268": "Esparto",
        "placeholder_2269": "Esplora",
        "placeholder_2270": "Espressif ESP32 Azure IoT Kit Sensors",
        "placeholder_2271": "EtherCard",
        "placeholder_2272": "EtherSia",
        "placeholder_2273": "Etherkit JTEncode",
        "placeholder_2274": "Etherkit Morse",
        "placeholder_2275": "Etherkit Si5351",
        "placeholder_2276": "Ethernet",
        "placeholder_2277": "Ethernet2",
        "placeholder_2278": "Ethernet3",
        "placeholder_2279": "EthernetBonjour",
        "placeholder_2280": "EthernetENC",
        "placeholder_2281": "EthernetESP32",
        "placeholder_2282": "EthernetEspAT",
        "placeholder_2283": "EthernetIndustruino",
        "placeholder_2284": "EthernetSP",
        "placeholder_2285": "EthernetWebServer",
        "placeholder_2286": "EthernetWebServer_SSL",
        "placeholder_2287": "EthernetWebServer_SSL_STM32",
        "placeholder_2288": "EthernetWebServer_STM32",
        "placeholder_2289": "Ethernet_Generic",
        "placeholder_2290": "Ethernet_Manager",
        "placeholder_2291": "Ethernet_Manager_Portenta_H7",
        "placeholder_2292": "Ethernet_Manager_STM32",
        "placeholder_2293": "Ethernet_Shield_W5200",
        "placeholder_2294": "EventAnalog",
        "placeholder_2295": "EventButton",
        "placeholder_2296": "EventEthernet",
        "placeholder_2297": "EventJoystick",
        "placeholder_2298": "EventLinkInterrupt",
        "placeholder_2299": "EventOS",
        "placeholder_2300": "EventSystem",
        "placeholder_2301": "Eventfun",
        "placeholder_2302": "Eventually",
        "placeholder_2303": "Eventually2",
        "placeholder_2304": "EventuallyCommand",
        "placeholder_2305": "EventuallyStateMachine",
        "placeholder_2306": "Eventuino",
        "placeholder_2307": "Every",
        "placeholder_2308": "EveryTimer",
        "placeholder_2309": "ExampleLibrary",
        "placeholder_2310": "Excelsior",
        "placeholder_2311": "Excelsior_Ambassador",
        "placeholder_2312": "Excelsior_Light",
        "placeholder_2313": "Executive",
        "placeholder_2314": "ExodeCore",
        "placeholder_2315": "Exosite",
        "placeholder_2316": "ExponentMap",
        "placeholder_2317": "ExtFlashLoader",
        "placeholder_2318": "ExtendedTouchEvent",
        "placeholder_2319": "EzArduino",
        "placeholder_2320": "EzDmaHelper",
        "placeholder_2321": "EzLoRaWAN",
        "placeholder_2322": "EzLoRaWAN_BLE",
        "placeholder_2323": "FC0001614614",
        "placeholder_2324": "FC0003390327",
        "placeholder_2325": "FC0005748911",
        "placeholder_2326": "FCWRobot_Model2",
        "placeholder_2327": "FDC2214",
        "placeholder_2328": "FED3",
        "placeholder_2329": "FFT",
        "placeholder_2330": "FFT_C",
        "placeholder_2331": "FHEM",
        "placeholder_2332": "FIFOEE",
        "placeholder_2333": "FIFObuf",
        "placeholder_2334": "FIR filter",
        "placeholder_2335": "FLE",
        "placeholder_2336": "FLINT_E220-900T22S-JP",
        "placeholder_2337": "FM25060",
        "placeholder_2338": "FMDataClient",
        "placeholder_2339": "FORCE2",
        "placeholder_2340": "FOR_MACRO",
        "placeholder_2341": "FPGAArcade Replay MKR Vidor 4000",
        "placeholder_2342": "FRAM_Cache",
        "placeholder_2343": "FRAM_I2C",
        "placeholder_2344": "FS_MX1508",
        "placeholder_2345": "FS_Nano33BLE",
        "placeholder_2346": "FSerial",
        "placeholder_2347": "FT6236G",
        "placeholder_2348": "FT81x Arduino Driver",
        "placeholder_2349": "FTDebouncer",
        "placeholder_2350": "FTOLED",
        "placeholder_2351": "FTPClient_Generic",
        "placeholder_2352": "FTP_Server_Teensy41",
        "placeholder_2353": "FTPduino",
        "placeholder_2354": "FTRGBLED",
        "placeholder_2355": "FTTech Aqualabo Sensors",
        "placeholder_2356": "FTTech LoRaWAN",
        "placeholder_2357": "FTTech SAMD51 Clicks",
        "placeholder_2358": "FTTech SAMD51 XBee",
        "placeholder_2359": "FTTech Swarm",
        "placeholder_2360": "FUSB302 PD UFP sink",
        "placeholder_2361": "FXLS89xx_Arduino",
        "placeholder_2362": "FXPS7xxx_Arduino",
        "placeholder_2363": "FaBo 201 3Axis ADXL345",
        "placeholder_2364": "FaBo 202 9Axis MPU9250",
        "placeholder_2365": "FaBo 203 Color S11059",
        "placeholder_2366": "FaBo 204 Baromter MPL115A2",
        "placeholder_2367": "FaBo 205 Proximity VCNL4010",
        "placeholder_2368": "FaBo 206 UV Si1132",
        "placeholder_2369": "FaBo 207 Temperature ADT7410",
        "placeholder_2370": "FaBo 208 Humidity HTS221",
        "placeholder_2371": "FaBo 209 KTemp MCP3421",
        "placeholder_2372": "FaBo 210 GPIO PCAL6408A",
        "placeholder_2373": "FaBo 211 7Segment LED TLC59208F",
        "placeholder_2374": "FaBo 212 LCD PCF8574",
        "placeholder_2375": "FaBo 213 LCD mini AQM0802A",
        "placeholder_2376": "FaBo 214 OLED EROLED096",
        "placeholder_2377": "FaBo 215 RTC PCF2129",
        "placeholder_2378": "FaBo 217 Ambient Light ISL29034",
        "placeholder_2379": "FaBo 222 Environment BME680",
        "placeholder_2380": "FaBo 223 Gas CCS811",
        "placeholder_2381": "FaBo 230 Color BH1749NUC",
        "placeholder_2382": "FaBo 301 BLE SiliconLabs",
        "placeholder_2383": "FaBo 307 BLE Nordic",
        "placeholder_2384": "FaBo GPIO40 PCA9698",
        "placeholder_2385": "FaBo Motor DRV8830",
        "placeholder_2386": "FaBo PWM PCA9685",
        "placeholder_2387": "FabGL",
        "placeholder_2388": "Fabrik2D",
        "placeholder_2389": "FacebookApi",
        "placeholder_2390": "FadeLed",
        "placeholder_2391": "FanController",
        "placeholder_2392": "FancyTerminal",
        "placeholder_2393": "Fast4ier",
        "placeholder_2394": "FastAccelStepper",
        "placeholder_2395": "FastBLE",
        "placeholder_2396": "FastBot",
        "placeholder_2397": "FastBot2",
        "placeholder_2398": "FastCRC",
        "placeholder_2399": "FastCapacitiveSensor",
        "placeholder_2400": "FastDisplayPrototyping",
        "placeholder_2401": "FastGPIO",
        "placeholder_2402": "FastIMU",
        "placeholder_2403": "FastInterruptEncoder",
        "placeholder_2404": "FastLED",
        "placeholder_2405": "FastLED NeoMatrix",
        "placeholder_2406": "FastLED NeoPixel",
        "placeholder_2407": "FastLEDHub",
        "placeholder_2408": "FastLEDManager",
        "placeholder_2409": "FastLED_RPIRGBPanel_GFX",
        "placeholder_2410": "FastLED_SPITFT_GFX",
        "placeholder_2411": "FastLED_TFTWrapper_GFX",
        "placeholder_2412": "FastMap",
        "placeholder_2413": "FastPID",
        "placeholder_2414": "FastShiftIn",
        "placeholder_2415": "FastShiftInOut",
        "placeholder_2416": "FastShiftOut",
        "placeholder_2417": "FastTrig",
        "placeholder_2418": "Fastcore",
        "placeholder_2419": "FatFs",
        "placeholder_2420": "FauxmoESP",
        "placeholder_2421": "FeatherFault",
        "placeholder_2422": "Feature-Variables",
        "placeholder_2423": "Fetch",
        "placeholder_2424": "FifteenStep",
        "placeholder_2425": "FileConfig",
        "placeholder_2426": "FileData",
        "placeholder_2427": "FileFetcher",
        "placeholder_2428": "FilesystemAccessInterface",
        "placeholder_2429": "FilesystemUtility",
        "placeholder_2430": "Filter Easy",
        "placeholder_2431": "Filters",
        "placeholder_2432": "Finder 6M for Finder Opta",
        "placeholder_2433": "Finder 7M for Finder Opta",
        "placeholder_2434": "FingerLib",
        "placeholder_2435": "Fingerprint Scanner TTL",
        "placeholder_2436": "Finite-State",
        "placeholder_2437": "Finite-State-Machine-Arduino",
        "placeholder_2438": "FiniteStateMachine",
        "placeholder_2439": "FireBase32",
        "placeholder_2440": "FireTimer",
        "placeholder_2441": "Firebase",
        "placeholder_2442": "Firebase Arduino Client Library for ESP8266 and ESP32",
        "placeholder_2443": "Firebase Arduino based on WiFi101",
        "placeholder_2444": "Firebase Arduino based on WiFiNINA",
        "placeholder_2445": "Firebase ESP32 Client",
        "placeholder_2446": "Firebase ESP8266 Client",
        "placeholder_2447": "FirebaseClient",
        "placeholder_2448": "FirebaseJson",
        "placeholder_2449": "FirebaseRealtime",
        "placeholder_2450": "FireplaceMLX",
        "placeholder_2451": "Firmata",
        "placeholder_2452": "FirmataExpress",
        "placeholder_2453": "FirmataWithDeviceFeature",
        "placeholder_2454": "Firmetix",
        "placeholder_2455": "FirstBuild - Relay",
        "placeholder_2456": "FixMath",
        "placeholder_2457": "FixedPoint_LUT",
        "placeholder_2458": "FixedPoints",
        "placeholder_2459": "FixedString",
        "placeholder_2460": "Flanco",
        "placeholder_2461": "Flash",
        "placeholder_2462": "FlashLightLED",
        "placeholder_2463": "FlashStorage",
        "placeholder_2464": "FlashStorage_RTL8720",
        "placeholder_2465": "FlashStorage_SAMD",
        "placeholder_2466": "FlashStorage_STM32",
        "placeholder_2467": "FlashStorage_STM32F1",
        "placeholder_2468": "FlashStringTable",
        "placeholder_2469": "Fletcher",
        "placeholder_2470": "FlexLibrary",
        "placeholder_2471": "FlexWire",
        "placeholder_2472": "FlexiPlot Arduino Library",
        "placeholder_2473": "FlexyStepper",
        "placeholder_2474": "Flicker",
        "placeholder_2475": "FlightSimOutputs",
        "placeholder_2476": "FlightSimSwitches",
        "placeholder_2477": "Flinders_ENGR2781",
        "placeholder_2478": "Flinduino_Sensorkit",
        "placeholder_2479": "FlipDisc",
        "placeholder_2480": "FlixPeriph",
        "placeholder_2481": "FloatArrayManager",
        "placeholder_2482": "FloatToAscii",
        "placeholder_2483": "FlowSensor",
        "placeholder_2484": "FontCollection",
        "placeholder_2485": "Force",
        "placeholder_2486": "Forced-BME280",
        "placeholder_2487": "Forecaster",
        "placeholder_2488": "Formulinha",
        "placeholder_2489": "FortniteAPI",
        "placeholder_2490": "FourBitLedDigitalTube",
        "placeholder_2491": "FourRegs",
        "placeholder_2492": "FourteenSegDisplay",
        "placeholder_2493": "Fraction",
        "placeholder_2494": "Fram",
        "placeholder_2495": "Framebuffer GFX",
        "placeholder_2496": "Franzininho_LiquidCrystal",
        "placeholder_2497": "Free-ESPAtHome",
        "placeholder_2498": "FreeRTOS",
        "placeholder_2499": "FreeRTOS_SAMD21",
        "placeholder_2500": "FreeRTOS_SAMD51",
        "placeholder_2501": "Freenove IR Lib for ESP32",
        "placeholder_2502": "Freenove RFID Lib for Pico",
        "placeholder_2503": "Freenove VK16K33 Lib",
        "placeholder_2504": "Freenove WS2812 Lib for ESP32",
        "placeholder_2505": "Freenove WS2812B RGBLED Controller",
        "placeholder_2506": "FreqCount",
        "placeholder_2507": "FreqMeasure",
        "placeholder_2508": "FreqPeriodCounter",
        "placeholder_2509": "FrequencyDetector",
        "placeholder_2510": "FrequencyTimer2",
        "placeholder_2511": "FuGPS Library",
        "placeholder_2512": "FunctionFsm",
        "placeholder_2513": "FunctionGenerator",
        "placeholder_2514": "Functional-Vlpp",
        "placeholder_2515": "Functor",
        "placeholder_2516": "FutabaVfdM202MD10C",
        "placeholder_2517": "Fuzzy Spooder",
        "placeholder_2518": "G4Enc",
        "placeholder_2519": "GAMMA",
        "placeholder_2520": "GC9A01A AVR",
        "placeholder_2521": "GCodeParser",
        "placeholder_2522": "GDXLib",
        "placeholder_2523": "GEENYmodem",
        "placeholder_2524": "GEM",
        "placeholder_2525": "GFButton",
        "placeholder_2526": "GFX Library for Arduino",
        "placeholder_2527": "GFX4DIoD9",
        "placeholder_2528": "GFX4d",
        "placeholder_2529": "GFX4dESP32",
        "placeholder_2530": "GFX_Extensions",
        "placeholder_2531": "GFX_Root",
        "placeholder_2532": "GFX_Thaana",
        "placeholder_2533": "GG",
        "placeholder_2534": "GGreg20_V3",
        "placeholder_2535": "GKScroll",
        "placeholder_2536": "GLEE Beelan LoRaWAN",
        "placeholder_2537": "GLEE2023",
        "placeholder_2538": "GM1602lib",
        "placeholder_2539": "GMSN Pure Digit",
        "placeholder_2540": "GP20U7 GPS Library",
        "placeholder_2541": "GP2Y0A21YK_lib",
        "placeholder_2542": "GPIOViewer",
        "placeholder_2543": "GPIO_NXP_Arduino",
        "placeholder_2544": "GPRSbee",
        "placeholder_2545": "GPS",
        "placeholder_2546": "GPSP",
        "placeholder_2547": "GPT_Stepper",
        "placeholder_2548": "GParser",
        "placeholder_2549": "GRC_AI",
        "placeholder_2550": "GRGB",
        "placeholder_2551": "GSL1680",
        "placeholder_2552": "GSM",
        "placeholder_2553": "GSM-Playground",
        "placeholder_2554": "GSMSim",
        "placeholder_2555": "GSM_Generic",
        "placeholder_2556": "GSON",
        "placeholder_2557": "GST",
        "placeholder_2558": "GSheet32",
        "placeholder_2559": "GT5X",
        "placeholder_2560": "GT811 Library",
        "placeholder_2561": "GTL",
        "placeholder_2562": "GTT",
        "placeholder_2563": "GU140X32F-7703A",
        "placeholder_2564": "GUIslice",
        "placeholder_2565": "GUVB-C31SM",
        "placeholder_2566": "GU_Elements",
        "placeholder_2567": "GY26Compass",
        "placeholder_2568": "GY521",
        "placeholder_2569": "GadgetBox",
        "placeholder_2570": "Gadget_Shield",
        "placeholder_2571": "Gadgetron Libraries",
        "placeholder_2572": "Gamebuino Classic",
        "placeholder_2573": "Gamebuino META",
        "placeholder_2574": "Gamer",
        "placeholder_2575": "GamerIR",
        "placeholder_2576": "GammaCorrectionLib",
        "placeholder_2577": "Gauge_asukiaaa",
        "placeholder_2578": "Gauss",
        "placeholder_2579": "Gaussian",
        "placeholder_2580": "GaussianFilter1D",
        "placeholder_2581": "GeekFactory Shell Library",
        "placeholder_2582": "Geekble_LieDetector",
        "placeholder_2583": "Geekble_Note2Freq",
        "placeholder_2584": "Geekble_Oscillator",
        "placeholder_2585": "Gemelon Pushbutton",
        "placeholder_2586": "GeneralShield",
        "placeholder_2587": "Generic-Queue",
        "placeholder_2588": "GenericMotorDriver",
        "placeholder_2589": "GeoIP",
        "placeholder_2590": "Geometry",
        "placeholder_2591": "Gesture PAJ7620",
        "placeholder_2592": "GestureDetector",
        "placeholder_2593": "GetInTouch",
        "placeholder_2594": "GhostLab42Reboot",
        "placeholder_2595": "GifDecoder",
        "placeholder_2596": "GigaAudio",
        "placeholder_2597": "GigaScope",
        "placeholder_2598": "Gigabits",
        "placeholder_2599": "Gizmo",
        "placeholder_2600": "GlobalCovfefe",
        "placeholder_2601": "Glue",
        "placeholder_2602": "GoGoBoard Arduino Library",
        "placeholder_2603": "GoPRO",
        "placeholder_2604": "GoProControl",
        "placeholder_2605": "GoWired-lib",
        "placeholder_2606": "GobbitLineCommand",
        "placeholder_2607": "Goertzel",
        "placeholder_2608": "Goldelox-Serial-Arduino-Library",
        "placeholder_2609": "Goldfish4Tech",
        "placeholder_2610": "Goldilocks Analogue DAC Library",
        "placeholder_2611": "Goldilocks Analogue SPI RAM Library",
        "placeholder_2612": "Google Cloud IoT Core JWT",
        "placeholder_2613": "GoogleCalendarClient",
        "placeholder_2614": "GoogleFormPost",
        "placeholder_2615": "GoogleMapsApi",
        "placeholder_2616": "GovoroxSSLClient",
        "placeholder_2617": "GrafanaLoki",
        "placeholder_2618": "Grafici-GFX",
        "placeholder_2619": "Grandeur",
        "placeholder_2620": "Gravitone",
        "placeholder_2621": "Gravity Soil Moisture Sensor",
        "placeholder_2622": "Green Beacon",
        "placeholder_2623": "GroPointModbus",
        "placeholder_2624": "Grove - 125KHz RFID Reader",
        "placeholder_2625": "Grove - 2-Channel Inductive Sensor LDC1612",
        "placeholder_2626": "Grove - 6Axis Accelerometer And Compass v2",
        "placeholder_2627": "Grove - Air quality sensor",
        "placeholder_2628": "Grove - Barometer Sensor BME280",
        "placeholder_2629": "Grove - Barometer Sensor BMP280",
        "placeholder_2630": "Grove - Capacitive Touch Slide Sensor CY8C40XX",
        "placeholder_2631": "Grove - Chainable RGB LED",
        "placeholder_2632": "Grove - Coulomb Counter for 3.3V to 5V LTC2941",
        "placeholder_2633": "Grove - Digital Light Sensor",
        "placeholder_2634": "Grove - Haptic Motor",
        "placeholder_2635": "Grove - High Precision RTC",
        "placeholder_2636": "Grove - High Temperature Sensor",
        "placeholder_2637": "Grove - I2C Color Sensor",
        "placeholder_2638": "Grove - I2C High Accuracy Temp_Humi Sensor SHT35",
        "placeholder_2639": "Grove - I2C Thermocouple Amplifier MCP9600",
        "placeholder_2640": "Grove - I2C UV Sensor VEML6070",
        "placeholder_2641": "Grove - Infrared Receiver And Emitter",
        "placeholder_2642": "Grove - LCD RGB Backlight",
        "placeholder_2643": "Grove - LED Matrix Driver",
        "placeholder_2644": "Grove - Laser PM2.5 Sensor HM3301",
        "placeholder_2645": "Grove - LoRa Radio 433MHz 868MHz",
        "placeholder_2646": "Grove - Motor Driver TB6612FNG",
        "placeholder_2647": "Grove - Multichannel Gas Sensor",
        "placeholder_2648": "Grove - OLED Display 0.96",
        "placeholder_2649": "Grove - Q Touch Sensor",
        "placeholder_2650": "Grove - RTC DS1307",
        "placeholder_2651": "Grove - Sunlight Sensor",
        "placeholder_2652": "Grove - Temperature And Humidity Sensor HDC1000",
        "placeholder_2653": "Grove 3-Axis Digital Compass HMC5883L",
        "placeholder_2654": "Grove 3-Axis Digital Gyro",
        "placeholder_2655": "Grove 3Axis Compass V2.0 BMM150",
        "placeholder_2656": "Grove 4-Digit Display",
        "placeholder_2657": "Grove 6Axis_Digital_Accelerometer_Gyroscope4_ADIS16470",
        "placeholder_2658": "Grove Barometer Sensor",
        "placeholder_2659": "Grove I2C Motor Driver v1.3",
        "placeholder_2660": "Grove IMU 9DOF",
        "placeholder_2661": "Grove LED Bar",
        "placeholder_2662": "Grove Mini Track Ball",
        "placeholder_2663": "Grove Ranging sensor - VL53L0X",
        "placeholder_2664": "Grove SHT31 Temp Humi Sensor",
        "placeholder_2665": "Grove Serial MP3 Player V2.0",
        "placeholder_2666": "Grove Temper Humidity TH02",
        "placeholder_2667": "Grove Temperature And Humidity Sensor",
        "placeholder_2668": "Grove Ultrasonic Ranger",
        "placeholder_2669": "Grove barometer HP20x",
        "placeholder_2670": "Grove-3-Axis-Digital-Accelerometer-2g-to-16g-LIS3DHTR",
        "placeholder_2671": "GroveDriverPack",
        "placeholder_2672": "GroveEncoder",
        "placeholder_2673": "Grove_AS3935Lightning_sensor",
        "placeholder_2674": "GuL_NovaFitness",
        "placeholder_2675": "GuL_Plantower",
        "placeholder_2676": "GuL_TI_Humidity_HDC10XX",
        "placeholder_2677": "GuaraTeca_Hardware",
        "placeholder_2678": "GuaraTeca_Menu",
        "placeholder_2679": "GuaraTeca_OBR",
        "placeholder_2680": "Guarateca_Demo",
        "placeholder_2681": "GuiN-E Bot",
        "placeholder_2682": "Guppy",
        "placeholder_2683": "Gwiot 7941E",
        "placeholder_2684": "GxEPD",
        "placeholder_2685": "GxEPD2",
        "placeholder_2686": "Gyro_Tomer",
        "placeholder_2687": "Gyver433",
        "placeholder_2688": "GyverBME280",
        "placeholder_2689": "GyverBeeper",
        "placeholder_2690": "GyverBlinker",
        "placeholder_2691": "GyverBus",
        "placeholder_2692": "GyverButton",
        "placeholder_2693": "GyverDB",
        "placeholder_2694": "GyverDS18",
        "placeholder_2695": "GyverDS3231",
        "placeholder_2696": "GyverDimmer",
        "placeholder_2697": "GyverEncoder",
        "placeholder_2698": "GyverFIFO",
        "placeholder_2699": "GyverFilters",
        "placeholder_2700": "GyverGFX",
        "placeholder_2701": "GyverHC595",
        "placeholder_2702": "GyverHTTP",
        "placeholder_2703": "GyverHTU21D",
        "placeholder_2704": "GyverHX711",
        "placeholder_2705": "GyverINA",
        "placeholder_2706": "GyverIO",
        "placeholder_2707": "GyverJoy",
        "placeholder_2708": "GyverLBUF",
        "placeholder_2709": "GyverMAX6675",
        "placeholder_2710": "GyverMAX7219",
        "placeholder_2711": "GyverMotor",
        "placeholder_2712": "GyverNTC",
        "placeholder_2713": "GyverNTP",
        "placeholder_2714": "GyverOLED",
        "placeholder_2715": "GyverOLEDMenu",
        "placeholder_2716": "GyverOS",
        "placeholder_2717": "GyverPID",
        "placeholder_2718": "GyverPWM",
        "placeholder_2719": "GyverPortal",
        "placeholder_2720": "GyverPower",
        "placeholder_2721": "GyverRelay",
        "placeholder_2722": "GyverSegment",
        "placeholder_2723": "GyverShift",
        "placeholder_2724": "GyverStepper",
        "placeholder_2725": "GyverTM1637",
        "placeholder_2726": "GyverTimer",
        "placeholder_2727": "GyverTimers",
        "placeholder_2728": "GyverTransfer",
        "placeholder_2729": "GyverUART",
        "placeholder_2730": "GyverWDT",
        "placeholder_2731": "HAMqttDevice",
        "placeholder_2732": "HAMqttDiscoveryHandler",
        "placeholder_2733": "HC-SR04",
        "placeholder_2734": "HC0x_AT_Config",
        "placeholder_2735": "HC4051",
        "placeholder_2736": "HC4052",
        "placeholder_2737": "HC4053",
        "placeholder_2738": "HC4067",
        "placeholder_2739": "HCSR04",
        "placeholder_2740": "HCSR04 ultrasonic MKL",
        "placeholder_2741": "HCSR04 ultrasonic distance sensor",
        "placeholder_2742": "HCSR04 ultrasonic sensor",
        "placeholder_2743": "HC_SR04",
        "placeholder_2744": "HD44780_LCD_PCF8574",
        "placeholder_2745": "HDC1000",
        "placeholder_2746": "HDC2010",
        "placeholder_2747": "HDC302x",
        "placeholder_2748": "HID Buttons",
        "placeholder_2749": "HID-Project",
        "placeholder_2750": "HIH61xx",
        "placeholder_2751": "HITIComm",
        "placeholder_2752": "HITICommSupport",
        "placeholder_2753": "HL1606 LED Strip",
        "placeholder_2754": "HL1606 LED Strip PWM",
        "placeholder_2755": "HLK-LD2450",
        "placeholder_2756": "HLW8012",
        "placeholder_2757": "HM330X by Tomoto",
        "placeholder_2758": "HMC6352",
        "placeholder_2759": "HONEYLemon",
        "placeholder_2760": "HP03S",
        "placeholder_2761": "HPDL1414",
        "placeholder_2762": "HPDL1414-74HC595",
        "placeholder_2763": "HSCDTD008A",
        "placeholder_2764": "HS_CAN_485_ESP32",
        "placeholder_2765": "HS_JOY_ESP32",
        "placeholder_2766": "HT1621",
        "placeholder_2767": "HT1632",
        "placeholder_2768": "HT16K33",
        "placeholder_2769": "HTL_onboard",
        "placeholder_2770": "HTTP",
        "placeholder_2771": "HTTPS_Server_Generic",
        "placeholder_2772": "HTTPed",
        "placeholder_2773": "HTU21D Sensor Library",
        "placeholder_2774": "HUB75Enano",
        "placeholder_2775": "HUB75nano",
        "placeholder_2776": "HUSB238",
        "placeholder_2777": "HUSB238Driver",
        "placeholder_2778": "HV518",
        "placeholder_2779": "HX710",
        "placeholder_2780": "HX711",
        "placeholder_2781": "HX711 Arduino Library",
        "placeholder_2782": "HX711_ADC",
        "placeholder_2783": "HX711_MP",
        "placeholder_2784": "HX711_asukiaaa",
        "placeholder_2785": "HX711_light",
        "placeholder_2786": "HaCEspSockets",
        "placeholder_2787": "HaCTimers",
        "placeholder_2788": "HaCWifiManager",
        "placeholder_2789": "HaLake-M5Stack-Library",
        "placeholder_2790": "HaLakeKit",
        "placeholder_2791": "HaLakeKitFirst",
        "placeholder_2792": "HaMqttEntities",
        "placeholder_2793": "HalfStepper",
        "placeholder_2794": "Hall-Switch",
        "placeholder_2795": "HamShield",
        "placeholder_2796": "HamShield_KISS",
        "placeholder_2797": "Hamming",
        "placeholder_2798": "Hanuman",
        "placeholder_2799": "Haptic_DA7280",
        "placeholder_2800": "Haptic_DRV2605",
        "placeholder_2801": "HardWire",
        "placeholder_2802": "Hardware Buttons",
        "placeholder_2803": "HardwareBLESerial",
        "placeholder_2804": "HardwareSerial_RS485",
        "placeholder_2805": "Harvard_TinyMLx",
        "placeholder_2806": "Hashtable",
        "placeholder_2807": "HeartBeat",
        "placeholder_2808": "HeatpumpIR",
        "placeholder_2809": "HeidelbergInterface",
        "placeholder_2810": "HeliOS",
        "placeholder_2811": "Helium",
        "placeholder_2812": "Hello Drum",
        "placeholder_2813": "Heltec ESP32 Dev-Boards",
        "placeholder_2814": "Heltec ESP8266 Dev-Boards",
        "placeholder_2815": "Heltec_ESP32_LoRa_v3",
        "placeholder_2816": "Heltec_LoRa_OLED_Examples",
        "placeholder_2817": "Hercules Dual 15A 6-20V Motor Controller",
        "placeholder_2818": "HerkulexServo",
        "placeholder_2819": "HexFabQuadroMotorShield",
        "placeholder_2820": "HiTechnic-Arduino",
        "placeholder_2821": "High Performance IMU BMI085",
        "placeholder_2822": "High-Side-Switch",
        "placeholder_2823": "HighPowerStepperDriver",
        "placeholder_2824": "Histogram",
        "placeholder_2825": "Hlw8032",
        "placeholder_2826": "HoldButton",
        "placeholder_2827": "HomeAssistantEntities",
        "placeholder_2828": "HomeAssistantMQTT",
        "placeholder_2829": "HomeDing",
        "placeholder_2830": "HomeKit-ESP8266",
        "placeholder_2831": "HomeSpan",
        "placeholder_2832": "Homeyduino",
        "placeholder_2833": "HoneyWellFMA_SPI",
        "placeholder_2834": "Honeywell TruStability SPI",
        "placeholder_2835": "Honeywell Zephyr I2C",
        "placeholder_2836": "HotButton",
        "placeholder_2837": "HoverboardAPI",
        "placeholder_2838": "HttpClient",
        "placeholder_2839": "HuemonelabKit",
        "placeholder_2840": "Husarnet ESP32",
        "placeholder_2841": "HydroinoJobMgr",
        "placeholder_2842": "HyperDeck",
        "placeholder_2843": "Hyperduino Library",
        "placeholder_2844": "Hysteresis",
        "placeholder_2845": "HzMeter_asukiaaa",
        "placeholder_2846": "I0Servo",
        "placeholder_2847": "I2C",
        "placeholder_2848": "I2C AXP192 Power management",
        "placeholder_2849": "I2C BM8563 RTC",
        "placeholder_2850": "I2C MPU6886 IMU",
        "placeholder_2851": "I2C SLG",
        "placeholder_2852": "I2C Temperature Sensors derived from the LM75",
        "placeholder_2853": "I2C-IRSENSE Library",
        "placeholder_2854": "I2C-Sensor-Lib iLib",
        "placeholder_2855": "I2CDisplayController",
        "placeholder_2856": "I2CExtension",
        "placeholder_2857": "I2CHelper",
        "placeholder_2858": "I2CIP",
        "placeholder_2859": "I2CKeyPad",
        "placeholder_2860": "I2CKeyPad8x8",
        "placeholder_2861": "I2CScanner",
        "placeholder_2862": "I2CSoilMoistureSensor",
        "placeholder_2863": "I2C_24LC1025",
        "placeholder_2864": "I2C_ASDX",
        "placeholder_2865": "I2C_DMAC",
        "placeholder_2866": "I2C_EEPROM",
        "placeholder_2867": "I2C_Functions",
        "placeholder_2868": "I2C_Insarianne",
        "placeholder_2869": "I2C_LCD",
        "placeholder_2870": "I2C_LCD12864",
        "placeholder_2871": "I2C_SCANNER",
        "placeholder_2872": "I2C_Scanner",
        "placeholder_2873": "I2C_Slave",
        "placeholder_2874": "I2C_device_Arduino",
        "placeholder_2875": "I2Commands",
        "placeholder_2876": "I2Cwrapper",
        "placeholder_2877": "I2cControlPanel_asukiaaa",
        "placeholder_2878": "I2cDiscreteIoExpander",
        "placeholder_2879": "I2cMotors_asukiaaa",
        "placeholder_2880": "I2cMultipleMotors_asukiaaa",
        "placeholder_2881": "IBM LMIC framework",
        "placeholder_2882": "IBot",
        "placeholder_2883": "IBusBM",
        "placeholder_2884": "ICM20689",
        "placeholder_2885": "ICM20948_WE",
        "placeholder_2886": "ICM42605",
        "placeholder_2887": "ICM42670P",
        "placeholder_2888": "ICM42670S",
        "placeholder_2889": "ICM42688",
        "placeholder_2890": "ICM45605",
        "placeholder_2891": "ICM45686",
        "placeholder_2892": "ICM7218",
        "placeholder_2893": "ICM7218C",
        "placeholder_2894": "ICOM 746 CAT Control",
        "placeholder_2895": "ICP-101xx Pressure Sensor Library",
        "placeholder_2896": "ICP101xx",
        "placeholder_2897": "ICP201xx",
        "placeholder_2898": "ICRS 101",
        "placeholder_2899": "ICUX0201",
        "placeholder_2900": "IEEE754tools",
        "placeholder_2901": "IFTTTMaker",
        "placeholder_2902": "IFTTTWebhook",
        "placeholder_2903": "IFX007T-Motor-Control",
        "placeholder_2904": "IFX9201_XMC1300_StepperMotor",
        "placeholder_2905": "IGB-FlashSst26",
        "placeholder_2906": "IHCSoapClient",
        "placeholder_2907": "ILI9341-Layout-Manager",
        "placeholder_2908": "ILI9341_T4",
        "placeholder_2909": "ILI9341_t3",
        "placeholder_2910": "ILI9341_t3n",
        "placeholder_2911": "ILI9342_T4",
        "placeholder_2912": "ILI9486_SPI",
        "placeholder_2913": "ILIB",
        "placeholder_2914": "IMU_Fusion_SYC",
        "placeholder_2915": "INA219",
        "placeholder_2916": "INA219B",
        "placeholder_2917": "INA219_WE",
        "placeholder_2918": "INA226",
        "placeholder_2919": "INA226Lib",
        "placeholder_2920": "INA226_WE",
        "placeholder_2921": "INA226_asukiaaa",
        "placeholder_2922": "INA228",
        "placeholder_2923": "INA236",
        "placeholder_2924": "INA2xx",
        "placeholder_2925": "INA3221",
        "placeholder_2926": "INA3221_RT",
        "placeholder_2927": "INA780x",
        "placeholder_2928": "INFICON Spot Library",
        "placeholder_2929": "IO7F32",
        "placeholder_2930": "IO7F8266",
        "placeholder_2931": "IOSignal",
        "placeholder_2932": "IOTAppStory-ESP",
        "placeholder_2933": "IOTClient",
        "placeholder_2934": "IOTKME",
        "placeholder_2935": "IOXESP32Audio",
        "placeholder_2936": "IOXESP32Motor",
        "placeholder_2937": "IOXESP32_4-20mA_Receiver",
        "placeholder_2938": "IP2368",
        "placeholder_2939": "IP5306_I2C",
        "placeholder_2940": "IPGeolocation",
        "placeholder_2941": "IPS-7100-I2C-Arduino",
        "placeholder_2942": "IQ Module Communication",
        "placeholder_2943": "IR-infrared Remote Control Decoder-Simulator",
        "placeholder_2944": "IRLremote",
        "placeholder_2945": "IRM Mini",
        "placeholder_2946": "IRMP",
        "placeholder_2947": "IRProxSensor",
        "placeholder_2948": "IRRemoteControl",
        "placeholder_2949": "IRRemoteESP32",
        "IRremote.hpp": "IRremote",
        "placeholder_2951": "IRremoteESP8266",
        "placeholder_2952": "IRsmallDecoder",
        "placeholder_2953": "IS31FL3729_LED_Matrix",
        "placeholder_2954": "ISE I2C-MCP3427 Library",
        "placeholder_2955": "ISFET board library",
        "placeholder_2956": "ISL1208-RTC-Library",
        "placeholder_2957": "IbusTrx",
        "placeholder_2958": "Improv WiFi Library",
        "placeholder_2959": "Indio",
        "placeholder_2960": "Infrared",
        "placeholder_2961": "InfraredMLX",
        "placeholder_2962": "Ingenia Serial Servo Drive Library",
        "placeholder_2963": "IniFile",
        "placeholder_2964": "InkplateLibrary",
        "placeholder_2965": "InkyBoard",
        "placeholder_2966": "InputDebounce",
        "placeholder_2967": "InqPortal",
        "placeholder_2968": "InstagramFollowers",
        "placeholder_2969": "InstructableApi",
        "placeholder_2970": "Int64String",
        "placeholder_2971": "InternalTemperature",
        "placeholder_2972": "InterpolationLib",
        "placeholder_2973": "Interstitial Quadrant",
        "placeholder_2974": "Interval",
        "placeholder_2975": "IntervalCallback",
        "placeholder_2976": "IntervalTimerEx",
        "placeholder_2977": "IoAbstraction",
        "placeholder_2978": "IoT Pipe",
        "placeholder_2979": "IoT Suite",
        "placeholder_2980": "IoTController",
        "placeholder_2981": "IoTGuru",
        "placeholder_2982": "IoTWay",
        "placeholder_2983": "IoTWebConf_for_Visuino_modified_by_IoT_Jedi",
        "placeholder_2984": "IoT_Modules-Buttons",
        "placeholder_2985": "IoTeX-blockchain-client",
        "placeholder_2986": "IoTesla-client",
        "placeholder_2987": "IoTivity-Lite",
        "placeholder_2988": "IoTivity-Lite_Arduino-porting",
        "placeholder_2989": "IoTtweet",
        "placeholder_2990": "IoTtweetESP32",
        "placeholder_2991": "IoTtweetNBIoT",
        "placeholder_2992": "IoTtweetSIEMENS_SIMATIC",
        "placeholder_2993": "Iobeam",
        "placeholder_2994": "IoliteCoding SerialCommands",
        "placeholder_2995": "IonDB",
        "placeholder_2996": "IotKernel",
        "placeholder_2997": "IotWebConf",
        "placeholder_2998": "Iotkaran",
        "placeholder_2999": "Iridium SBD",
        "placeholder_3000": "Iridium9704LaunchPad",
        "placeholder_3001": "IridiumGPP",
        "placeholder_3002": "IridiumSBDi2c",
        "placeholder_3003": "Irms_calc",
        "placeholder_3004": "Isolated EC Probe Interface",
        "placeholder_3005": "Isolated ISE Probe Interface",
        "placeholder_3006": "Itty Bitty",
        "placeholder_3007": "IwitVolumeKnob",
        "placeholder_3008": "J1850 Arduino Transceiver Library",
        "placeholder_3009": "J1850 VPW Arduino Transceiver Library",
        "placeholder_3010": "JAREL",
        "placeholder_3011": "JBLogger",
        "placeholder_3012": "JBWopr",
        "placeholder_3013": "JC_Button",
        "placeholder_3014": "JC_EEPROM",
        "placeholder_3015": "JC_Sunrise",
        "placeholder_3016": "JDI_MIP_Display",
        "placeholder_3017": "JJYReceiver",
        "placeholder_3018": "JLed",
        "placeholder_3019": "JLedPCA9685-HAL",
        "placeholder_3020": "JMAFoundation",
        "placeholder_3021": "JMA_SPComm",
        "placeholder_3022": "JMotor",
        "placeholder_3023": "JOAAT",
        "placeholder_3024": "JPEGDEC",
        "placeholder_3025": "JPEGDecoder",
        "placeholder_3026": "JPEGENC",
        "placeholder_3027": "JRCCARLIB",
        "placeholder_3028": "JTAG",
        "placeholder_3029": "JTAG_Interface",
        "placeholder_3030": "JVC-Stereo",
        "placeholder_3031": "JWA BME280",
        "placeholder_3032": "JWT_RS256",
        "placeholder_3033": "JavaScript",
        "placeholder_3034": "JeVe_EasyOTA",
        "placeholder_3035": "Joba Tsl2561 Library",
        "placeholder_3036": "Jobber",
        "placeholder_3037": "Joystick",
        "placeholder_3038": "Joystick 5-Pin",
        "placeholder_3039": "JoystickController",
        "placeholder_3040": "Joystick_ESP32S2",
        "placeholder_3041": "JrkG2",
        "placeholder_3042": "JsmnStream",
        "placeholder_3043": "Json Streaming Parser",
        "placeholder_3044": "Json Streaming Parser 2",
        "placeholder_3045": "JsonLogger",
        "placeholder_3046": "JustWifi",
        "placeholder_3047": "Justina interpreter",
        "placeholder_3048": "K1200",
        "placeholder_3049": "K24C16 EEPROM Library",
        "placeholder_3050": "KAI Pro Library",
        "placeholder_3051": "KAIST_IoTDataScience",
        "placeholder_3052": "KCN_Utility",
        "placeholder_3053": "KIM",
        "placeholder_3054": "KIM Arduino Library",
        "placeholder_3055": "KIMlib",
        "placeholder_3056": "KLEncoder",
        "placeholder_3057": "KMESerial",
        "placeholder_3058": "KMP_MCP23S08",
        "placeholder_3059": "KMP_RS485",
        "placeholder_3060": "KOCOAFAB",
        "placeholder_3061": "KONNEKTING Device Library",
        "placeholder_3062": "KS0108_GLCD",
        "placeholder_3063": "KT0803",
        "placeholder_3064": "KTMS1201",
        "placeholder_3065": "KWP2000",
        "placeholder_3066": "KX0231025IMU",
        "placeholder_3067": "KXTJ3-1057",
        "placeholder_3068": "Kaa IoT Platform",
        "placeholder_3069": "Kadita",
        "placeholder_3070": "Kalman",
        "placeholder_3071": "Kalman Filter Library",
        "placeholder_3072": "Kangaroo Motion Controller",
        "placeholder_3073": "KellerModbus",
        "placeholder_3074": "Kelvin2RGB",
        "placeholder_3075": "KerbalSimpit",
        "placeholder_3076": "KermiteCore_Arduino",
        "placeholder_3077": "KeyDetector",
        "placeholder_3078": "KeyMatrix",
        "placeholder_3079": "Keyboard",
        "placeholder_3080": "KeyboardAzertyFr",
        "placeholder_3081": "Keyhole",
        "placeholder_3082": "Keypad",
        "placeholder_3083": "KickFFT",
        "placeholder_3084": "KickFilters",
        "placeholder_3085": "KickFiltersRT",
        "placeholder_3086": "KickMath",
        "placeholder_3087": "KickSort",
        "placeholder_3088": "KickstarterStats",
        "placeholder_3089": "KidMotorV4-Arduino",
        "placeholder_3090": "KiddeeExpress",
        "placeholder_3091": "Kinematics",
        "placeholder_3092": "Kinematrix",
        "placeholder_3093": "Kionix_KX023",
        "placeholder_3094": "Klang Electronics 8 Digit VFD",
        "placeholder_3095": "KmeStepper",
        "placeholder_3096": "Kniwwelino",
        "placeholder_3097": "Knock Detector",
        "placeholder_3098": "KnockPatternDetector",
        "placeholder_3099": "KolabseCarsCan",
        "placeholder_3100": "KomootBLEConnect",
        "placeholder_3101": "Komotion",
        "placeholder_3102": "KonnektingFlashStorage",
        "placeholder_3103": "Koyn",
        "placeholder_3104": "KrokoTS",
        "placeholder_3105": "Krypton",
        "placeholder_3106": "Kurtosis",
        "placeholder_3107": "L293",
        "placeholder_3108": "L293D",
        "placeholder_3109": "L298 Motor Driver",
        "placeholder_3110": "L298N",
        "placeholder_3111": "L298NDriver",
        "placeholder_3112": "L298N_MotorDriver",
        "placeholder_3113": "L3G",
        "placeholder_3114": "LC709204F",
        "placeholder_3115": "LCBUrl",
        "placeholder_3116": "LCD-I2C",
        "placeholder_3117": "LCD03",
        "placeholder_3118": "LCDBigNumbers",
        "placeholder_3119": "LCDDisplay10",
        "placeholder_3120": "LCDDrivers_NXP_Arduino",
        "placeholder_3121": "LCDGraph",
        "placeholder_3122": "LCDIC2",
        "placeholder_3123": "LCDMenuLib",
        "placeholder_3124": "LCDMenuLib2",
        "placeholder_3125": "LCD_BacklightRGB",
        "placeholder_3126": "LCD_HD44780",
        "placeholder_3127": "LCD_I2C",
        "placeholder_3128": "LCD_ST7032",
        "placeholder_3129": "LCLV",
        "placeholder_3130": "LCT200",
        "placeholder_3131": "LC_baseTools",
        "placeholder_3132": "LC_lilParser",
        "placeholder_3133": "LC_neoPixel",
        "placeholder_3134": "LC_slowServo",
        "placeholder_3135": "LDC1312-1314 I2C Library",
        "placeholder_3136": "LDS",
        "placeholder_3137": "LEADS",
        "placeholder_3138": "LED",
        "placeholder_3139": "LED Dithering",
        "placeholder_3140": "LED744511",
        "placeholder_3141": "LEDDriver",
        "placeholder_3142": "LEDDrivers_NXP_Arduino",
        "placeholder_3143": "LEDMatrixDriver",
        "placeholder_3144": "LED_Controls",
        "placeholder_3145": "LEDuino",
        "placeholder_3146": "LGFXMeter",
        "placeholder_3147": "LG_Matrix_Print",
        "placeholder_3148": "LIDAR-Lite",
        "placeholder_3149": "LILCMU GoGoBoard Library",
        "placeholder_3150": "LILCMU GoGoBright Library",
        "placeholder_3151": "LIN master emulation with background operation",
        "placeholder_3152": "LIN master portable",
        "placeholder_3153": "LINBus_stack",
        "placeholder_3154": "LIS331",
        "placeholder_3155": "LIS3DH motion detection",
        "placeholder_3156": "LIS3MDL",
        "placeholder_3157": "LM35",
        "placeholder_3158": "LM35 Sensor",
        "placeholder_3159": "LM73",
        "placeholder_3160": "LM75A Arduino library",
        "placeholder_3161": "LM96163",
        "placeholder_3162": "LMI",
        "placeholder_3163": "LMP91000",
        "placeholder_3164": "LMT87",
        "placeholder_3165": "LP50XX",
        "placeholder_3166": "LPD6803 RGB Pixels",
        "placeholder_3167": "LPD8806",
        "placeholder_3168": "LPS",
        "placeholder_3169": "LPS35HW",
        "placeholder_3170": "LSA08",
        "placeholder_3171": "LSM303",
        "placeholder_3172": "LSM6",
        "placeholder_3173": "LTC1392 library",
        "placeholder_3174": "LTC230x",
        "placeholder_3175": "LTC2942",
        "placeholder_3176": "LTC2991",
        "placeholder_3177": "LTR-329ALS-01",
        "placeholder_3178": "LTR308 library",
        "placeholder_3179": "LTR390",
        "placeholder_3180": "LTR390_DFR",
        "placeholder_3181": "LTR390_RT",
        "placeholder_3182": "LTS01A_MAX31725",
        "placeholder_3183": "LUHN",
        "placeholder_3184": "Labvee Library",
        "placeholder_3185": "LapI2CTop",
        "placeholder_3186": "LapINA219",
        "placeholder_3187": "LapX9C10X",
        "placeholder_3188": "Layad Circuits Saleng GSM Shield",
        "placeholder_3189": "LcdBarGraph",
        "placeholder_3190": "LcdBarGraphX",
        "placeholder_3191": "LcdEffects",
        "placeholder_3192": "LcdMenu",
        "placeholder_3193": "LcdProgressBar",
        "placeholder_3194": "LcdProgressBarDouble",
        "placeholder_3195": "LcdUi",
        "placeholder_3196": "LeafonySTM32",
        "placeholder_3197": "Leaphy Extensions",
        "placeholder_3198": "Leaphy Extra Extension",
        "placeholder_3199": "Leaphy Original Extension",
        "placeholder_3200": "LectroboxKeypadShield",
        "placeholder_3201": "LectroboxPCJoyShield",
        "placeholder_3202": "Led",
        "placeholder_3203": "Led 7 Segment",
        "placeholder_3204": "LedBlinky",
        "placeholder_3205": "LedControl",
        "placeholder_3206": "LedController",
        "placeholder_3207": "LedDisplay",
        "placeholder_3208": "LedLib",
        "placeholder_3209": "LedMatrix8X8",
        "placeholder_3210": "LedRGB565",
        "placeholder_3211": "LedRGBlib",
        "placeholder_3212": "LedSync",
        "placeholder_3213": "LedTask",
        "placeholder_3214": "LedUtil",
        "placeholder_3215": "Leeman Geophysical Learning Shield",
        "placeholder_3216": "LegoSensorAdapter",
        "placeholder_3217": "Legoino",
        "placeholder_3218": "Lepton FLiR Thermal Camera Module Library",
        "placeholder_3219": "Letters and Numbers Seven Segment Display Library",
        "placeholder_3220": "LettersKeypad",
        "placeholder_3221": "LevelShifter_NXP_Arduino",
        "placeholder_3222": "Lewis",
        "placeholder_3223": "LibAPRS_Tracker",
        "placeholder_3224": "LibEdificio",
        "placeholder_3225": "LibEstacionamiento",
        "placeholder_3226": "LibLCC",
        "placeholder_3227": "LibLanc",
        "placeholder_3228": "LibLucesCiudad",
        "placeholder_3229": "LibMiniSys",
        "placeholder_3230": "LibPrintf",
        "placeholder_3231": "LibSSH-ESP32",
        "placeholder_3232": "LibSemaforo",
        "placeholder_3233": "LibSemaforosCiudad",
        "placeholder_3234": "LibYxml",
        "placeholder_3235": "Libdevlpr",
        "placeholder_3236": "LidarArray",
        "placeholder_3237": "Lifely Agrumino Lemon",
        "placeholder_3238": "LightDimmer",
        "placeholder_3239": "LightEffect",
        "placeholder_3240": "LightningStepper",
        "placeholder_3241": "LilyGO T-Wristband and T-Glass",
        "placeholder_3242": "LilyGo-AMOLED-Series",
        "placeholder_3243": "LilyGo-EPD47",
        "placeholder_3244": "LilyGo-T-RGB",
        "placeholder_3245": "Lime Labs HDC2080",
        "placeholder_3246": "LineFollowerPID",
        "placeholder_3247": "LineFormatter",
        "placeholder_3248": "LineTracker5 Library",
        "placeholder_3249": "Linear Position Control",
        "placeholder_3250": "LinkedList",
        "placeholder_3251": "LinkedListLib",
        "placeholder_3252": "LinkedPointerList",
        "placeholder_3253": "LinxESP32",
        "placeholder_3254": "LionBit-STEM-library",
        "placeholder_3255": "Liquid Handling Robotics",
        "placeholder_3256": "LiquidCrystal",
        "LiquidCrystal_I2C.h": "LiquidCrystal I2C",
        "placeholder_3258": "LiquidCrystal I2C Multilingual",
        "placeholder_3259": "LiquidCrystal NKC",
        "placeholder_3260": "LiquidCrystalIO",
        "placeholder_3261": "LiquidCrystalSerial",
        "placeholder_3262": "LiquidCrystalWired",
        "placeholder_3263": "LiquidCrystal_74HC595",
        "placeholder_3264": "LiquidCrystal_AIP31068",
        "placeholder_3265": "LiquidCrystal_I2C_Hangul",
        "placeholder_3266": "LiquidCrystal_I2C_STEM",
        "placeholder_3267": "LiquidCrystal_I2C_UTF8",
        "placeholder_3268": "LiquidCrystal_PCF8574",
        "placeholder_3269": "LiquidMenu",
        "placeholder_3270": "LircPlayer101",
        "placeholder_3271": "LispIO",
        "placeholder_3272": "LispMotor",
        "placeholder_3273": "List",
        "placeholder_3274": "ListLib",
        "placeholder_3275": "LitSwitch",
        "placeholder_3276": "LiteLED",
        "placeholder_3277": "LiteOSCParser",
        "placeholder_3278": "Lithium-Powered",
        "placeholder_3279": "LittleFS_Mbed_RP2040",
        "placeholder_3280": "LittleFS_Portenta_H7",
        "placeholder_3281": "LittleFS_esp32",
        "placeholder_3282": "LittleVector",
        "placeholder_3283": "LiveObjectsSDK",
        "placeholder_3284": "Lixie",
        "placeholder_3285": "Lixie II",
        "placeholder_3286": "LoR",
        "placeholder_3287": "LoRa",
        "placeholder_3288": "LoRa Node",
        "placeholder_3289": "LoRa Serialization",
        "placeholder_3290": "LoRa-payload-BKU",
        "placeholder_3291": "LoRaFi",
        "placeholder_3292": "LoRaLayer2",
        "placeholder_3293": "LoRaNow",
        "placeholder_3294": "LoRaRF",
        "placeholder_3295": "LoRaWAN-Seeed-Grove-Wio-E5",
        "placeholder_3296": "LoRaWAN_ESP32",
        "placeholder_3297": "LoRa_Library",
        "placeholder_3298": "LoRandom",
        "placeholder_3299": "LocoNet",
        "placeholder_3300": "Log",
        "placeholder_3301": "LogToQueue",
        "placeholder_3302": "LogansGreatButton",
        "placeholder_3303": "Logger",
        "placeholder_3304": "LogicAnalyzer",
        "placeholder_3305": "Logistic",
        "placeholder_3306": "LongFi",
        "placeholder_3307": "Looper",
        "placeholder_3308": "LoraID",
        "placeholder_3309": "LoraSx1262",
        "placeholder_3310": "LoveButton",
        "placeholder_3311": "LovyanGFX",
        "placeholder_3312": "Low level quick digital IO",
        "placeholder_3313": "Low-Power",
        "placeholder_3314": "LowPower_LowPowerLab",
        "placeholder_3315": "LualtekCubecell",
        "placeholder_3316": "LualtekRAKRUI",
        "placeholder_3317": "LualtekTTN",
        "placeholder_3318": "Luni",
        "placeholder_3319": "Lynxmotion Smart Servo -LSS-",
        "placeholder_3320": "M10ADC",
        "placeholder_3321": "M10CODEC",
        "placeholder_3322": "M10DTMF",
        "placeholder_3323": "M10ESP8266",
        "placeholder_3324": "M10Examples",
        "placeholder_3325": "M10I2C",
        "placeholder_3326": "M10JTAG",
        "placeholder_3327": "M10LCD",
        "placeholder_3328": "M10PS2",
        "placeholder_3329": "M10PWM",
        "placeholder_3330": "M10SD",
        "placeholder_3331": "M10SRAM",
        "placeholder_3332": "M10SerialAUX",
        "placeholder_3333": "M10SevenSeg",
        "placeholder_3334": "M2M Solutions Logger Library",
        "placeholder_3335": "M2M Solutions MiraOne Library",
        "placeholder_3336": "M2M Solutions Purplepoint Boards Library",
        "placeholder_3337": "M2M Solutions Quectel Library",
        "placeholder_3338": "M2M Solutions TLV Library",
        "placeholder_3339": "M304 Library",
        "placeholder_3340": "M5 Stack 4Relay Library",
        "placeholder_3341": "M5-ADS1100",
        "placeholder_3342": "M5-ADS1115",
        "placeholder_3343": "M5-DLight",
        "placeholder_3344": "M5-Depends",
        "placeholder_3345": "M5-Ethernet",
        "placeholder_3346": "M5-FPC1020A",
        "placeholder_3347": "M5-LoRa-E220-JP",
        "placeholder_3348": "M5-LoRaWAN",
        "placeholder_3349": "M5-Outdepends",
        "placeholder_3350": "M5-RoverC",
        "placeholder_3351": "M5-STHS34PF80",
        "placeholder_3352": "M5-SX127x",
        "placeholder_3353": "M5ANGLE8",
        "placeholder_3354": "M5Atom",
        "placeholder_3355": "M5AtomS3",
        "placeholder_3356": "M5Atomic-Motion",
        "placeholder_3357": "M5BurnerNVS",
        "placeholder_3358": "M5Capsule",
        "placeholder_3359": "M5Cardputer",
        "placeholder_3360": "M5Core-Ink",
        "placeholder_3361": "M5Core2",
        "placeholder_3362": "M5CoreS3",
        "placeholder_3363": "M5Dial",
        "placeholder_3364": "M5DinMeter",
        "placeholder_3365": "M5EPD",
        "placeholder_3366": "M5EasyUI",
        "placeholder_3367": "M5FacesEncoder",
        "placeholder_3368": "M5Family",
        "placeholder_3369": "M5GFX",
        "placeholder_3370": "M5Hat-8Servos",
        "placeholder_3371": "M5Hat-JoyC",
        "placeholder_3372": "M5Module-4Relay",
        "placeholder_3373": "M5Module-GNSS",
        "placeholder_3374": "M5Module-LAN-13.2",
        "placeholder_3375": "M5NanoC6",
        "placeholder_3376": "M5PoECAM",
        "placeholder_3377": "M5ROTATE8",
        "placeholder_3378": "M5Stack",
        "placeholder_3379": "M5Stack-SD-Updater",
        "placeholder_3380": "M5StackMenuSystem",
        "placeholder_3381": "M5StackToio",
        "placeholder_3382": "M5Stack_Avatar",
        "placeholder_3383": "M5Stack_OnScreenKeyboard",
        "placeholder_3384": "M5Stack_SimpleBeep",
        "placeholder_3385": "M5Stack_TreeView",
        "placeholder_3386": "M5StampC3LED",
        "placeholder_3387": "M5Station",
        "placeholder_3388": "M5StickC",
        "placeholder_3389": "M5StickCPlus",
        "placeholder_3390": "M5StickCPlus2",
        "placeholder_3391": "M5UNIT_8Encoder",
        "placeholder_3392": "M5Unified",
        "placeholder_3393": "M5Unit-4RELAY",
        "placeholder_3394": "M5Unit-ACSSR",
        "placeholder_3395": "M5Unit-BLDC",
        "placeholder_3396": "M5Unit-CAN",
        "placeholder_3397": "M5Unit-CatM",
        "placeholder_3398": "M5Unit-DDS",
        "placeholder_3399": "M5Unit-DigiClock",
        "placeholder_3400": "M5Unit-ENV",
        "placeholder_3401": "M5Unit-EXTIO2",
        "placeholder_3402": "M5Unit-Encoder",
        "placeholder_3403": "M5Unit-IMU-Pro-Mini",
        "placeholder_3404": "M5Unit-KMeter",
        "placeholder_3405": "M5Unit-MQTT",
        "placeholder_3406": "M5Unit-PbHub",
        "placeholder_3407": "M5Unit-PoESP32",
        "placeholder_3408": "M5Unit-RELAY",
        "placeholder_3409": "M5Unit-RTC",
        "placeholder_3410": "M5Unit-Sonic",
        "placeholder_3411": "M5Unit-Thermal2",
        "placeholder_3412": "M5Unit-ToF4M",
        "placeholder_3413": "M5Unit-UHF-RFID",
        "placeholder_3414": "M5UnitQRCode",
        "placeholder_3415": "M5UnitSynth",
        "placeholder_3416": "M5UnitWeightI2C",
        "placeholder_3417": "M5_BMM150",
        "placeholder_3418": "M5_EzData",
        "placeholder_3419": "M5_PbHub",
        "placeholder_3420": "M5_RTC_Module",
        "placeholder_3421": "M5ez",
        "placeholder_3422": "M62429",
        "placeholder_3423": "M62429 Volume Control Library",
        "placeholder_3424": "M8058",
        "placeholder_3425": "M95_EEPROM",
        "placeholder_3426": "MAGELLAN",
        "placeholder_3427": "MAKERLABVN",
        "placeholder_3428": "MATRIX7219",
        "placeholder_3429": "MAVLink",
        "placeholder_3430": "MAX11643",
        "placeholder_3431": "MAX1464 Arduino library",
        "placeholder_3432": "MAX14661",
        "placeholder_3433": "MAX17048",
        "placeholder_3434": "MAX1704X",
        "placeholder_3435": "MAX17055",
        "placeholder_3436": "MAX30100",
        "placeholder_3437": "MAX30100_milan",
        "placeholder_3438": "MAX30100lib",
        "placeholder_3439": "MAX3010x Sensor Library",
        "placeholder_3440": "MAX3100 Serial",
        "placeholder_3441": "MAX31850",
        "placeholder_3442": "MAX31850 DallasTemp",
        "placeholder_3443": "MAX31850 OneWire",
        "placeholder_3444": "MAX31855",
        "placeholder_3445": "MAX31855_RT",
        "placeholder_3446": "MAX44009 library",
        "placeholder_3447": "MAX471",
        "placeholder_3448": "MAX471_RT",
        "placeholder_3449": "MAX520",
        "placeholder_3450": "MAX541X",
        "placeholder_3451": "MAX6626",
        "placeholder_3452": "MAX6675",
        "placeholder_3453": "MAX6675 library",
        "MAX6675.h": "MAX6675 with hardware SPI",
        "placeholder_3455": "MAX6675_Thermocouple",
        "placeholder_3456": "MAX6816",
        "placeholder_3457": "MAX7219Segment",
        "placeholder_3458": "MAX77650-Arduino-Library",
        "placeholder_3459": "MAX78630",
        "placeholder_3460": "MAX7XX-7-Segment",
        "placeholder_3461": "MAX_RS485",
        "placeholder_3462": "MB85_FRAM",
        "placeholder_3463": "MBEDSpeech",
        "placeholder_3464": "MBED_RP2040_PWM",
        "placeholder_3465": "MBED_RP2040_Slow_PWM",
        "placeholder_3466": "MBED_RPI_PICO_TimerInterrupt",
        "placeholder_3467": "MBUSPayload",
        "placeholder_3468": "MBusinoLib",
        "placeholder_3469": "MCCI Arduino Development Kit ADK",
        "placeholder_3470": "MCCI Arduino LoRaWAN Library",
        "placeholder_3471": "MCCI Catena Arduino Platform",
        "placeholder_3472": "MCCI Catena SCD30",
        "placeholder_3473": "MCCI Catena SDP",
        "placeholder_3474": "MCCI FRAM I2C",
        "placeholder_3475": "MCCI LTR-329ALS",
        "placeholder_3476": "MCCI LoRaWAN LMIC library",
        "placeholder_3477": "MCCI SofwareSerial",
        "placeholder_3478": "MCCI-Catena-PMS7003",
        "placeholder_3479": "MCCI-Catena-SHT3x",
        "placeholder_3480": "MCMVoltSense",
        "placeholder_3481": "MCM_BL0940",
        "placeholder_3482": "MCP23008",
        "placeholder_3483": "MCP23008_I2C",
        "placeholder_3484": "MCP23017",
        "placeholder_3485": "MCP23017 Port Expander",
        "placeholder_3486": "MCP23017_Attiny85",
        "placeholder_3487": "MCP23017_I2C",
        "placeholder_3488": "MCP23017_RT",
        "placeholder_3489": "MCP23017_WE",
        "placeholder_3490": "MCP23S08",
        "placeholder_3491": "MCP23S17",
        "placeholder_3492": "MCP2515-nb",
        "placeholder_3493": "MCP3201",
        "placeholder_3494": "MCP3202",
        "placeholder_3495": "MCP3208",
        "placeholder_3496": "MCP3221",
        "placeholder_3497": "MCP3304",
        "placeholder_3498": "MCP3421",
        "placeholder_3499": "MCP3424",
        "placeholder_3500": "MCP342x",
        "placeholder_3501": "MCP3X21",
        "placeholder_3502": "MCP3XXX",
        "placeholder_3503": "MCP4131 library",
        "placeholder_3504": "MCP4151",
        "placeholder_3505": "MCP4251",
        "placeholder_3506": "MCP4261",
        "placeholder_3507": "MCP45HVX1",
        "placeholder_3508": "MCP4661_asukiaaa",
        "placeholder_3509": "MCP4725",
        "placeholder_3510": "MCP4728",
        "placeholder_3511": "MCP48xx DAC Library",
        "placeholder_3512": "MCP7940",
        "placeholder_3513": "MCP79412RTC",
        "placeholder_3514": "MCP9800",
        "placeholder_3515": "MCP9802",
        "placeholder_3516": "MCP9808",
        "placeholder_3517": "MCP9808_RT",
        "placeholder_3518": "MCP_23017",
        "placeholder_3519": "MCP_3208",
        "placeholder_3520": "MCP_ADC",
        "placeholder_3521": "MCP_DAC",
        "placeholder_3522": "MCP_POT",
        "placeholder_3523": "MCUFRIEND_kbv",
        "placeholder_3524": "MCUOS",
        "placeholder_3525": "MCUVoltage",
        "placeholder_3526": "MCreator Link",
        "placeholder_3527": "MDNS_Generic",
        "placeholder_3528": "MD_AButton",
        "placeholder_3529": "MD_AD9833",
        "placeholder_3530": "MD_CirQueue",
        "placeholder_3531": "MD_Cubo",
        "placeholder_3532": "MD_DS1307",
        "placeholder_3533": "MD_DS3231",
        "placeholder_3534": "MD_HX711",
        "placeholder_3535": "MD_KeySwitch",
        "placeholder_3536": "MD_LM335A",
        "placeholder_3537": "MD_MAX72XX",
        "placeholder_3538": "MD_MAXPanel",
        "placeholder_3539": "MD_MIDIFile",
        "placeholder_3540": "MD_MSGEQ7",
        "placeholder_3541": "MD_Menu",
        "placeholder_3542": "MD_OnePin",
        "placeholder_3543": "MD_PWM",
        "placeholder_3544": "MD_Parola",
        "placeholder_3545": "MD_REncoder",
        "placeholder_3546": "MD_SN76489",
        "placeholder_3547": "MD_SmartCar",
        "placeholder_3548": "MD_SmartCar2",
        "placeholder_3549": "MD_Stepper",
        "placeholder_3550": "MD_TCS230",
        "placeholder_3551": "MD_TTT",
        "placeholder_3552": "MD_UISwitch",
        "placeholder_3553": "MD_YM2413",
        "placeholder_3554": "MD_YX5300",
        "placeholder_3555": "MFRC522",
        "placeholder_3556": "MFRC522-spi-i2c-uart-async",
        "placeholder_3557": "MFRC522_I2C",
        "placeholder_3558": "MFRC522_NTAG424DNA",
        "placeholder_3559": "MFRC522_PN512",
        "placeholder_3560": "MFUthings",
        "placeholder_3561": "MH-Z CO2 Sensors",
        "placeholder_3562": "MH-Z14A Library",
        "placeholder_3563": "MH-Z19",
        "placeholder_3564": "MHGroveBLE",
        "placeholder_3565": "MHZCO2",
        "placeholder_3566": "MIDI Device Controller",
        "placeholder_3567": "MIDI Library",
        "placeholder_3568": "MIDIUSB",
        "placeholder_3569": "MIDIcontroller",
        "placeholder_3570": "MIKROE_4_20mA_RT_Click",
        "placeholder_3571": "MINDS-i-Drone",
        "placeholder_3572": "MINDSi",
        "placeholder_3573": "MINMAX",
        "placeholder_3574": "MJScore",
        "placeholder_3575": "MKHC595",
        "placeholder_3576": "MKL_DHT sensor library",
        "placeholder_3577": "MKL_DS18B20",
        "placeholder_3578": "MKL_RTClib",
        "placeholder_3579": "MKPin",
        "placeholder_3580": "MKRGSM",
        "placeholder_3581": "MKRIMU",
        "placeholder_3582": "MKRMotorCarrier",
        "placeholder_3583": "MKRNB",
        "placeholder_3584": "MKRWAN",
        "placeholder_3585": "MKRWAN_v2",
        "placeholder_3586": "MKRWiFiLed",
        "placeholder_3587": "MKS_SERVO42",
        "placeholder_3588": "MKS_SERVO57",
        "placeholder_3589": "ML8511",
        "placeholder_3590": "MLX90393_raw",
        "placeholder_3591": "MLX90614",
        "placeholder_3592": "MM-S50MV",
        "placeholder_3593": "MMA7455 sensor Library",
        "placeholder_3594": "MMA8453_n0m1",
        "placeholder_3595": "MMA8652",
        "placeholder_3596": "MMA8653",
        "placeholder_3597": "MMC34160PJ",
        "placeholder_3598": "MODI",
        "placeholder_3599": "MODULE_2RELAY",
        "placeholder_3600": "MODULE_4IN8OUT",
        "placeholder_3601": "MOREbot Games Library",
        "placeholder_3602": "MOREbot Library",
        "placeholder_3603": "MOVI Voice Dialog Shield",
        "placeholder_3604": "MP3Player",
        "placeholder_3605": "MPC_ruih",
        "placeholder_3606": "MPG",
        "placeholder_3607": "MPL3115A2_Arduino",
        "placeholder_3608": "MPR121",
        "placeholder_3609": "MPU6050",
        "placeholder_3610": "MPU6050_IND",
        "placeholder_3611": "MPU6050_light",
        "placeholder_3612": "MPU6050_tockn",
        "placeholder_3613": "MPU9250",
        "placeholder_3614": "MPU9250_WE",
        "placeholder_3615": "MPU9250_asukiaaa",
        "placeholder_3616": "MPXA6115A",
        "placeholder_3617": "MPXHZ6116A",
        "placeholder_3618": "MQ131 gas sensor",
        "placeholder_3619": "MQ135",
        "placeholder_3620": "MQ137",
        "placeholder_3621": "MQ7Sensor",
        "placeholder_3622": "MQSensor",
        "placeholder_3623": "MQSpaceData",
        "placeholder_3624": "MQTT",
        "placeholder_3625": "MQTT Client",
        "placeholder_3626": "MQTT and Serial Printer",
        "placeholder_3627": "MQTTPubSubClient",
        "placeholder_3628": "MQTTPubSubClient_Generic",
        "placeholder_3629": "MQTTRemote",
        "placeholder_3630": "MQTT_Looped",
        "placeholder_3631": "MQUnifiedsensor",
        "placeholder_3632": "MS5611",
        "placeholder_3633": "MS5611_SPI",
        "placeholder_3634": "MS5837",
        "placeholder_3635": "MS5837_30BA_Library",
        "placeholder_3636": "MS5x",
        "placeholder_3637": "MS5xxx",
        "placeholder_3638": "MSGEQ7",
        "placeholder_3639": "MSMPLOTTER",
        "placeholder_3640": "MSP300",
        "placeholder_3641": "MT-arduino-momentary-button",
        "placeholder_3642": "MT-arduino-pin-debouncer",
        "placeholder_3643": "MT-arduino-stepper-driver",
        "placeholder_3644": "MT6701",
        "placeholder_3645": "MT6701-arduino",
        "placeholder_3646": "MT8870",
        "placeholder_3647": "MTCParser",
        "placeholder_3648": "MTP40C",
        "placeholder_3649": "MTP40F",
        "placeholder_3650": "MTR_ADS7830",
        "placeholder_3651": "MTR_STUSB4500",
        "placeholder_3652": "MUX_SW_NXP_Arduino",
        "placeholder_3653": "MWings",
        "placeholder_3654": "MX1508",
        "placeholder_3655": "MacroDebugger",
        "placeholder_3656": "MacroLogger",
        "placeholder_3657": "Madgwick",
        "placeholder_3658": "MaerklinMotorola",
        "placeholder_3659": "MagAlpha Angle Sensor Library",
        "placeholder_3660": "MagStripe",
        "placeholder_3661": "MagStripe_ESP32",
        "placeholder_3662": "MagVector 3D Magnetic Sensor",
        "placeholder_3663": "Magellan_BC95",
        "placeholder_3664": "Magellan_BC95_lite",
        "placeholder_3665": "Magellan_SIM7020E",
        "placeholder_3666": "MagicHome",
        "placeholder_3667": "MagicPot",
        "placeholder_3668": "Mahony",
        "placeholder_3669": "Maidenhead",
        "placeholder_3670": "MakeBlock Drive Updated",
        "placeholder_3671": "MakeBlockDrive",
        "placeholder_3672": "MakerBoard",
        "placeholder_3673": "MakerVision",
        "placeholder_3674": "Makerlabvn_I2C_Motor_Driver",
        "placeholder_3675": "Makerlabvn_SimpleMotor",
        "placeholder_3676": "Makerlabvn_kit_CIA0_BOT",
        "placeholder_3677": "MakestroCloudClient",
        "placeholder_3678": "ManuvrDrivers",
        "placeholder_3679": "Mapf",
        "placeholder_3680": "MaquinitasParams",
        "placeholder_3681": "MaquinitasRitmos",
        "placeholder_3682": "Marceau",
        "placeholder_3683": "Marisa ESP32 Wrapper",
        "placeholder_3684": "Masaylo",
        "placeholder_3685": "MaterialBoard",
        "placeholder_3686": "MatesController",
        "placeholder_3687": "Matrix Color Sensor",
        "placeholder_3688": "Matrix Controller",
        "placeholder_3689": "Matrix Laser Sensor",
        "placeholder_3690": "Matrix Mini Library",
        "placeholder_3691": "Matrix Motion Sensor",
        "placeholder_3692": "Matrix Motor Extension",
        "placeholder_3693": "Matrix Servo Extension",
        "placeholder_3694": "Matrix Ultrasonic Sensor",
        "placeholder_3695": "MatrixCharlieplex",
        "placeholder_3696": "MatrixKeypad",
        "placeholder_3697": "MatrixMath",
        "placeholder_3698": "MatrixMiniR4",
        "placeholder_3699": "MatrizLed",
        "placeholder_3700": "Max31328RTC",
        "placeholder_3701": "Max44007",
        "placeholder_3702": "Max44009",
        "placeholder_3703": "Max86141",
        "placeholder_3704": "MaxEssentialToolkit",
        "placeholder_3705": "MaxLedControl",
        "placeholder_3706": "MaxMtrParser",
        "placeholder_3707": "MaximWire",
        "placeholder_3708": "Mbed BLE HID",
        "placeholder_3709": "Mbed BLE Mouse",
        "placeholder_3710": "MbedNanoTLS",
        "placeholder_3711": "Mcp3208",
        "placeholder_3712": "MeArm-Robot-Arm",
        "placeholder_3713": "MeanAndVarOnTheFly",
        "placeholder_3714": "MeanFilterLib",
        "placeholder_3715": "Mechasolution R finder10D",
        "placeholder_3716": "Mechasolution Voice Recognition Module",
        "placeholder_3717": "Mechatro",
        "placeholder_3718": "MedianFilterLib",
        "placeholder_3719": "MedianFilterLib2",
        "placeholder_3720": "Meeo",
        "placeholder_3721": "MegunoLink",
        "placeholder_3722": "MegunoLink File Manager",
        "placeholder_3723": "Meiro",
        "placeholder_3724": "Melody",
        "placeholder_3725": "Melody Player",
        "placeholder_3726": "Melopero AMG8833",
        "placeholder_3727": "Melopero APDS9960",
        "placeholder_3728": "Melopero BME280",
        "placeholder_3729": "Melopero Cookie RP2040",
        "placeholder_3730": "Melopero LSM9DS1",
        "placeholder_3731": "Melopero RV3028",
        "placeholder_3732": "Melopero SAM-M8Q",
        "placeholder_3733": "Melopero UBX Protocol",
        "placeholder_3734": "Melopero VL53L1X",
        "placeholder_3735": "Melt7SegLcd",
        "placeholder_3736": "MemoryDumper",
        "placeholder_3737": "MemoryHexDump",
        "placeholder_3738": "MemoryLib",
        "placeholder_3739": "MemoryUsage",
        "placeholder_3740": "MentorBit-Library",
        "placeholder_3741": "MergedStreams",
        "placeholder_3742": "Meridian",
        "placeholder_3743": "MeshGnome",
        "placeholder_3744": "Meshtastic",
        "placeholder_3745": "MessagingLib",
        "placeholder_3746": "MeteoFunctions",
        "placeholder_3747": "MeteoLabBeacon",
        "placeholder_3748": "Mhz19",
        "placeholder_3749": "MiCS6814-I2C",
        "placeholder_3750": "MiDispositivoMIDI_V3",
        "placeholder_3751": "MicroAnimation",
        "placeholder_3752": "MicroBeaut",
        "placeholder_3753": "MicroDebug",
        "placeholder_3754": "MicroFlow",
        "placeholder_3755": "MicroGamer",
        "placeholder_3756": "MicroMidiDevices",
        "placeholder_3757": "MicroMidiEnc",
        "placeholder_3758": "MicroMidiPot",
        "placeholder_3759": "MicroNMEA",
        "placeholder_3760": "MicroOsc",
        "placeholder_3761": "MicroPOP32",
        "placeholder_3762": "MicroQt",
        "placeholder_3763": "MicroShell",
        "placeholder_3764": "MicroTFLite",
        "placeholder_3765": "MicroTone",
        "placeholder_3766": "MicroTuple",
        "placeholder_3767": "MicroUART",
        "placeholder_3768": "MicroWakeupper Wemos D1 Mini Battery Shield",
        "placeholder_3769": "MicrobitV2-HHS",
        "placeholder_3770": "Microbot_Motor_Shield",
        "placeholder_3771": "MicrochipSRAM",
        "placeholder_3772": "Microchip_RN487x",
        "placeholder_3773": "Microchip_RNBD451",
        "placeholder_3774": "Microcontroller-id",
        "placeholder_3775": "Microfire Mod-NTC",
        "placeholder_3776": "Microfire_HABridge",
        "placeholder_3777": "Microfire_Mod-EC",
        "placeholder_3778": "Microfire_Mod-ORP",
        "placeholder_3779": "Microfire_Mod-pH",
        "placeholder_3780": "Microfire_SHT3x",
        "placeholder_3781": "MicromationDevboardV3",
        "placeholder_3782": "Microsoft_HidForWindows",
        "placeholder_3783": "MicrostepToLinear",
        "placeholder_3784": "Midea AC infrared remote controller with ESP32 RMT Peripheral",
        "placeholder_3785": "MideaIRWrapper",
        "placeholder_3786": "MidiDmxBridge",
        "placeholder_3787": "Midier",
        "placeholder_3788": "MightyOhmGeigerCounter",
        "placeholder_3789": "MillaMilla DS7505 Library",
        "placeholder_3790": "MilliStopper",
        "placeholder_3791": "MillisCounter",
        "placeholder_3792": "MillisTimer",
        "placeholder_3793": "MillisTimerLib",
        "placeholder_3794": "Mini Grafx",
        "placeholder_3795": "Mini QOI",
        "placeholder_3796": "MiniMP3",
        "placeholder_3797": "MiniPLC_FX2N",
        "placeholder_3798": "MinimalLinkedList",
        "placeholder_3799": "Ministache",
        "placeholder_3800": "Mintrix",
        "placeholder_3801": "Mirobot",
        "placeholder_3802": "MissionList",
        "placeholder_3803": "MjGrove",
        "placeholder_3804": "MkrGsm1400IoT",
        "placeholder_3805": "MobaLedLib",
        "placeholder_3806": "MobaTools",
        "placeholder_3807": "Mock",
        "placeholder_3808": "MockEEPROM",
        "placeholder_3809": "ModBusSlave",
        "placeholder_3810": "Modbus",
        "placeholder_3811": "Modbus-Arduino",
        "placeholder_3812": "Modbus-Esp8266AT",
        "placeholder_3813": "Modbus-EtherCard",
        "placeholder_3814": "Modbus-Ethernet",
        "placeholder_3815": "Modbus-Radio",
        "placeholder_3816": "Modbus-Serial",
        "placeholder_3817": "ModbusADU",
        "placeholder_3818": "ModbusConfig",
        "placeholder_3819": "ModbusMaster",
        "placeholder_3820": "ModbusPowerMeter",
        "placeholder_3821": "ModbusRTUComm",
        "placeholder_3822": "ModbusRTUMaster",
        "placeholder_3823": "ModbusRTUSlave",
        "placeholder_3824": "ModbusRTU_Slave",
        "placeholder_3825": "ModbusRTU_Slave_RS485",
        "placeholder_3826": "ModernPIDControlSS",
        "placeholder_3827": "Modmata",
        "placeholder_3828": "Modular",
        "placeholder_3829": "ModuleInterface",
        "placeholder_3830": "ModuleMore Sumo V2",
        "placeholder_3831": "Module_GRBL_13.2",
        "placeholder_3832": "Module_Stepmotor",
        "placeholder_3833": "Modulino",
        "placeholder_3834": "Modulo",
        "placeholder_3835": "MonteCarloPi",
        "placeholder_3836": "MoonPhase",
        "placeholder_3837": "MoonRise",
        "placeholder_3838": "MoonStruck",
        "placeholder_3839": "MorePins",
        "placeholder_3840": "Morse",
        "placeholder_3841": "MorseCodeMachine",
        "placeholder_3842": "MorseDuino",
        "placeholder_3843": "MorseEncoder",
        "placeholder_3844": "Mosiwi_Basic_Learning_Kit",
        "placeholder_3845": "Moteus",
        "placeholder_3846": "MotoMama Library",
        "placeholder_3847": "Motor Driver Library",
        "placeholder_3848": "Motor Shield V2.0",
        "placeholder_3849": "MotorCVD_asukiaaa",
        "placeholder_3850": "MotorCell",
        "placeholder_3851": "MotorController",
        "placeholder_3852": "MotorGo_Mini_Driver",
        "placeholder_3853": "MotorVID28",
        "placeholder_3854": "Motor_PID",
        "placeholder_3855": "Motor_RS",
        "placeholder_3856": "Motoron",
        "placeholder_3857": "Mouse",
        "placeholder_3858": "Move Buffer",
        "placeholder_3859": "Moving-Average",
        "placeholder_3860": "MovingAverage",
        "placeholder_3861": "MovingAverageAngle",
        "placeholder_3862": "MovingAverageFloat",
        "placeholder_3863": "MovingAveragePlus",
        "placeholder_3864": "MovingAverager",
        "placeholder_3865": "MovingPlatform",
        "placeholder_3866": "Mozzi",
        "placeholder_3867": "MpesaSTK",
        "placeholder_3868": "MqttLogger",
        "placeholder_3869": "MrMx - AW9523B",
        "placeholder_3870": "MrMx - Arduino SI4012",
        "placeholder_3871": "MsTimer2",
        "placeholder_3872": "MsgPack",
        "placeholder_3873": "MsgPackRosInterfaces",
        "placeholder_3874": "MsgPacketizer",
        "placeholder_3875": "MteCore",
        "placeholder_3876": "Multi Channel Relay Arduino Library",
        "placeholder_3877": "MultiButton",
        "placeholder_3878": "MultiButtons",
        "placeholder_3879": "MultiFuncShield",
        "placeholder_3880": "MultiFunctionShield",
        "placeholder_3881": "MultiLcd",
        "placeholder_3882": "MultiMAX6675",
        "placeholder_3883": "MultiMap",
        "placeholder_3884": "MultiResetDetector_Generic",
        "placeholder_3885": "MultiTaskLib",
        "placeholder_3886": "MultiTrans",
        "placeholder_3887": "MultiWire",
        "placeholder_3888": "Multi_BitBang",
        "placeholder_3889": "Multi_OLED",
        "placeholder_3890": "Multiplex",
        "placeholder_3891": "MultitapKeypad",
        "placeholder_3892": "Multitasker",
        "placeholder_3893": "MultivariateNormal",
        "placeholder_3894": "Music Shield",
        "placeholder_3895": "MusicBuzzer",
        "placeholder_3896": "MusicWithoutDelay",
        "placeholder_3897": "Musician",
        "placeholder_3898": "MusiciansMate",
        "placeholder_3899": "Mutila",
        "placeholder_3900": "Muwerk scheduler library",
        "placeholder_3901": "Muwerk ustd library",
        "placeholder_3902": "MvcWebServerLib",
        "placeholder_3903": "MyAlarm",
        "placeholder_3904": "MyBlinker",
        "placeholder_3905": "MyButton",
        "placeholder_3906": "MyDelay",
        "placeholder_3907": "MyKeywords",
        "placeholder_3908": "MyLD2410",
        "placeholder_3909": "MyMacros",
        "placeholder_3910": "MyOwnBricks",
        "placeholder_3911": "MySQL Connector Arduino",
        "placeholder_3912": "MySQL Query Client",
        "placeholder_3913": "MySQL_MariaDB_Generic",
        "placeholder_3914": "MySensors",
        "placeholder_3915": "MyTimer",
        "placeholder_3916": "Mybotic Durian Blynk ESP8266",
        "placeholder_3917": "MycilaConfig",
        "placeholder_3918": "MycilaDS18",
        "placeholder_3919": "MycilaESPConnect",
        "placeholder_3920": "MycilaEasyDisplay",
        "placeholder_3921": "MycilaHADiscovery",
        "placeholder_3922": "MycilaJSY",
        "placeholder_3923": "MycilaLogger",
        "placeholder_3924": "MycilaMQTT",
        "placeholder_3925": "MycilaNTP",
        "placeholder_3926": "MycilaPZEM004Tv3",
        "placeholder_3927": "MycilaPulseAnalyzer",
        "placeholder_3928": "MycilaRelay",
        "placeholder_3929": "MycilaSystem",
        "placeholder_3930": "MycilaTaskManager",
        "placeholder_3931": "MycilaTaskMonitor",
        "placeholder_3932": "MycilaTrial",
        "placeholder_3933": "MycilaUtilities",
        "placeholder_3934": "MycilaWebSerial",
        "placeholder_3935": "MyoWare Arduino Library",
        "placeholder_3936": "N64Controller",
        "placeholder_3937": "N64Pad",
        "placeholder_3938": "NB_Generic",
        "placeholder_3939": "NBitArray",
        "placeholder_3940": "NColor",
        "placeholder_3941": "NDEF_MFRC522",
        "placeholder_3942": "NDNOverUDP",
        "placeholder_3943": "NDefs",
        "placeholder_3944": "NE555",
        "placeholder_3945": "NETSGPClient",
        "placeholder_3946": "NEvents",
        "placeholder_3947": "NFC Tag M24LR6E",
        "placeholder_3948": "NFuncs",
        "placeholder_3949": "NGLedFlasher Library",
        "placeholder_3950": "NH8CHIR-lib",
        "placeholder_3951": "NHB_AD7124",
        "placeholder_3952": "NHB_AD7794",
        "placeholder_3953": "NHBot",
        "placeholder_3954": "NHCSR04",
        "placeholder_3955": "NHD_Character_LCD",
        "placeholder_3956": "NINA-Wi-Fi",
        "placeholder_3957": "NL2Client",
        "placeholder_3958": "NMEAParser",
        "placeholder_3959": "NMEA_Parser",
        "placeholder_3960": "NMH1000_Arduino",
        "placeholder_3961": "NOKIA5110_TEXT",
        "placeholder_3962": "NPush",
        "placeholder_3963": "NRF51_Radio_library",
        "placeholder_3964": "NRF52_ISR_Servo",
        "placeholder_3965": "NRF52_MBED_TimerInterrupt",
        "placeholder_3966": "NRF52_TimerInterrupt",
        "placeholder_3967": "NRFLite",
        "placeholder_3968": "NRF_HAL",
        "placeholder_3969": "NRotary",
        "placeholder_3970": "NST1001",
        "placeholder_3971": "NST1001Driver",
        "placeholder_3972": "NStreamCom",
        "placeholder_3973": "NTC_Thermistor",
        "placeholder_3974": "NTP",
        "placeholder_3975": "NTPClient",
        "placeholder_3976": "NTPClient_Generic",
        "placeholder_3977": "NTPtime",
        "placeholder_3978": "NTimer",
        "placeholder_3979": "NVSRAM",
        "placeholder_3980": "NX2003 library",
        "placeholder_3981": "NXP PCA9633",
        "placeholder_3982": "NXPMotionSense",
        "placeholder_3983": "NXTBluetooth",
        "placeholder_3984": "Namino_Industrial_Boards",
        "placeholder_3985": "NanitLib",
        "placeholder_3986": "Nano33BLESensor",
        "placeholder_3987": "NanoBLEFlashPrefs",
        "placeholder_3988": "NanoConnectHcSr04",
        "placeholder_3989": "NanoPlayBoard",
        "placeholder_3990": "NanoProtoShield",
        "placeholder_3991": "Nano_Every_WS2812B",
        "placeholder_3992": "Navigador",
        "placeholder_3993": "NbMicro",
        "placeholder_3994": "NceCabBus",
        "placeholder_3995": "NecDecoder",
        "placeholder_3996": "Neo7Segment",
        "placeholder_3997": "NeoBufferedPrint",
        "placeholder_3998": "NeoGPS",
        "placeholder_3999": "NeoHWSerial",
        "placeholder_4000": "NeoNextion",
        "placeholder_4001": "NeoPatterns",
        "placeholder_4002": "NeoPixel Painter",
        "placeholder_4003": "NeoPixelBus by Makuna",
        "placeholder_4004": "NeoPixelConnect",
        "placeholder_4005": "NeoSWSerial",
        "placeholder_4006": "Neosegment",
        "placeholder_4007": "Neotimer",
        "placeholder_4008": "NesRob",
        "placeholder_4009": "NetApiHelpers",
        "placeholder_4010": "NetEEPROM",
        "placeholder_4011": "NetWizard",
        "placeholder_4012": "NetworkMonitor",
        "placeholder_4013": "NeumannCorrector",
        "placeholder_4014": "NeuralNetwork",
        "placeholder_4015": "NeuroMaster",
        "placeholder_4016": "Neurona",
        "placeholder_4017": "NewEncoder",
        "placeholder_4018": "NewPing",
        "placeholder_4019": "NewServo",
        "placeholder_4020": "Newhaven_CharacterOLED_SPI",
        "placeholder_4021": "Newt_Display",
        "placeholder_4022": "Nexgen_Rover",
        "placeholder_4023": "Nextion",
        "placeholder_4024": "Nextion Serial String",
        "placeholder_4025": "NextionX2",
        "placeholder_4026": "NibbleArray",
        "placeholder_4027": "NimBLE-Arduino",
        "placeholder_4028": "Nintendo",
        "placeholder_4029": "Nintendo Extension Ctrl",
        "placeholder_4030": "NintendoControllersSTM32",
        "placeholder_4031": "NintendoSwitchControlLibrary",
        "placeholder_4032": "NmraDcc",
        "placeholder_4033": "NoBlockEEPROM",
        "placeholder_4034": "NoDelay",
        "placeholder_4035": "NodeRedTime",
        "placeholder_4036": "Nokia 1.8 Inch Display SPFD54124B",
        "placeholder_4037": "Nokia 5110",
        "placeholder_4038": "Nokia 5110 LCD library",
        "placeholder_4039": "Nokia5110",
        "placeholder_4040": "NonBlockingDallas",
        "placeholder_4041": "NonBlockingDelay",
        "placeholder_4042": "NonBlockingRTTTL",
        "placeholder_4043": "NonBlockingSequence",
        "placeholder_4044": "Norman",
        "placeholder_4045": "Nostr",
        "placeholder_4046": "NotasMIDI",
        "placeholder_4047": "Notched Shaft Encoder",
        "placeholder_4048": "Nouryas Advanced Line Follower",
        "placeholder_4049": "Nova Fitness Sds dust sensors library",
        "placeholder_4050": "Nova_SDS011 Sensor Library",
        "placeholder_4051": "NoveltyDetection",
        "placeholder_4052": "NtpClientLib",
        "placeholder_4053": "NuS-NimBLE-Serial",
        "placeholder_4054": "NukiClientESP",
        "placeholder_4055": "NullPacketComms",
        "placeholder_4056": "NullSerial",
        "placeholder_4057": "NumberSpeaker",
        "placeholder_4058": "Nusabot Simple Timer",
        "placeholder_4059": "OBD2",
        "placeholder_4060": "ODriveArduino",
        "placeholder_4061": "OLED Display 96x96",
        "placeholder_4062": "OLED Display VGY12864L-03",
        "placeholder_4063": "OLED SSD1306 - SH1106",
        "placeholder_4064": "OLED_Display_SSD1306",
        "placeholder_4065": "OLED_SSD1306_Chart",
        "placeholder_4066": "OOCSI",
        "placeholder_4067": "OOKwiz",
        "placeholder_4068": "OPC",
        "placeholder_4069": "OPT3101",
        "placeholder_4070": "OPT4048",
        "placeholder_4071": "OPTIGA Trust M",
        "placeholder_4072": "OPTIGATrustX",
        "placeholder_4073": "OROCA-EduBot",
        "placeholder_4074": "OSC",
        "placeholder_4075": "OSFS",
        "placeholder_4076": "OSP 2wireSPI aospi",
        "placeholder_4077": "OSP CommandInterpreter aocmd",
        "placeholder_4078": "OSP Middleware aomw",
        "placeholder_4079": "OSP ResultCodes aoresult",
        "placeholder_4080": "OSP Telegrams aoosp",
        "placeholder_4081": "OSP UIDriversOSP32 aoui32",
        "placeholder_4082": "OSS-EC ABLIC S-58LM20A 00000057",
        "placeholder_4083": "OSS-EC NXP MPXA4250A 00000057",
        "placeholder_4084": "OSS-EC_ABLIC_S-5813A_5814A_00000057",
        "placeholder_4085": "OSS-EC_ABLIC_S-8110C_8120C_00000057",
        "placeholder_4086": "OSS-EC_ADI_AD22100A_00000057",
        "placeholder_4087": "OSS-EC_ADI_AD22100K_00000057",
        "placeholder_4088": "OSS-EC_ADI_AD22100S_00000057",
        "placeholder_4089": "OSS-EC_ADI_AD22103K_00000057",
        "placeholder_4090": "OSS-EC_MAXIM_MAX6605MXKV_00000057",
        "placeholder_4091": "OSS-EC_MAXIM_MAX6605MXK_00000057",
        "placeholder_4092": "OSS-EC_MAXIM_MAX6607IXK_MAX6608IUK_00000057",
        "placeholder_4093": "OSS-EC_MAXIM_MAX6613MXK_MAX6613MXKV_00000057",
        "placeholder_4094": "OSS-EC_MICROCHIP_MCP9700_MCP9700A_00000057",
        "placeholder_4095": "OSS-EC_MICROCHIP_MCP9701_MCP9701A_00000057",
        "placeholder_4096": "OSS-EC_MICROCHIP_TC1046_00000057",
        "placeholder_4097": "OSS-EC_MICROCHIP_TC1047_TC1047A_00000057",
        "placeholder_4098": "OSS-EC_NXP_MPX5999D_00000057",
        "placeholder_4099": "OSS-EC_NXP_MPXH6115A_00000057",
        "placeholder_4100": "OSS-EC_NXP_MPXH6400A_00000057",
        "placeholder_4101": "OSS-EC_NXP_MPXHZ6250A_00000057",
        "placeholder_4102": "OSS-EC_ROHM_BD1020HFV_00000057",
        "placeholder_4103": "OSS-EC_STM_STLM20DD9F_00000057",
        "placeholder_4104": "OSS-EC_STM_STLM20W87F_00000057",
        "placeholder_4105": "OSS-EC_TDK_CHS-UPS_UPR_UGS_UGR_00000057",
        "placeholder_4106": "OSS-EC_TDK_CHS_MSS_00000057",
        "placeholder_4107": "OSS-EC_TI_LM35C_LM35CA_00000057",
        "placeholder_4108": "OSS-EC_TI_LM35D_00000057",
        "placeholder_4109": "OSS-EC_TI_LM35_LM35A_00000057",
        "placeholder_4110": "OSS-EC_TI_LM45B_LM45C_00000057",
        "placeholder_4111": "OSS-EC_TI_LM50B_00000057",
        "placeholder_4112": "OSS-EC_TI_LM50C_00000057",
        "placeholder_4113": "OSS-EC_TI_TMP9A00_00000057",
        "placeholder_4114": "OTAUpdateManager",
        "placeholder_4115": "OTAWrapper",
        "placeholder_4116": "OTAdrive_ESP",
        "placeholder_4117": "OV5640 Auto Focus for ESP32 Camera",
        "placeholder_4118": "OVS",
        "placeholder_4119": "OZGPS_NMEA",
        "placeholder_4120": "OakOLED",
        "placeholder_4121": "ObjectButton",
        "placeholder_4122": "ObloqAdafruit",
        "placeholder_4123": "OctoPrintAPI",
        "placeholder_4124": "OctoPrinter",
        "placeholder_4125": "OctoSonar",
        "placeholder_4126": "OctoWS2811",
        "placeholder_4127": "Octofet",
        "placeholder_4128": "Octopus Firmware",
        "placeholder_4129": "OctopusLab-Library",
        "placeholder_4130": "Oddly Specific Objects LCD FeatherWing Library",
        "placeholder_4131": "Oled UI Components",
        "placeholder_4132": "Olimex16x2",
        "placeholder_4133": "Olympic Robotic Challenge",
        "placeholder_4134": "OmEspHelpers",
        "placeholder_4135": "Omron D6F-PH Arduino Library",
        "placeholder_4136": "OneBitDisplay",
        "placeholder_4137": "OneButton",
        "placeholder_4138": "OneIoT Connectivity",
        "placeholder_4139": "OneSheeld",
        "placeholder_4140": "OneShot",
        "placeholder_4141": "OneSystemLibrary",
        "placeholder_4142": "OneTime-BH1750",
        "placeholder_4143": "OneWire",
        "placeholder_4144": "OneWireHub",
        "placeholder_4145": "OneWireNg",
        "placeholder_4146": "Onion Arduino Library",
        "placeholder_4147": "OnlyTimer",
        "placeholder_4148": "OpcServer",
        "placeholder_4149": "Open RTS",
        "placeholder_4150": "OpenBCI_32bit_Library",
        "placeholder_4151": "OpenBCI_32bit_SD",
        "placeholder_4152": "OpenBCI_Ganglion_Library",
        "placeholder_4153": "OpenBCI_Radios",
        "placeholder_4154": "OpenBCI_Wifi",
        "placeholder_4155": "OpenBCI_Wifi_Master",
        "placeholder_4156": "OpenBehavior",
        "placeholder_4157": "OpenBuildsBlox",
        "placeholder_4158": "OpenDevice",
        "placeholder_4159": "OpenJigWare_A",
        "placeholder_4160": "OpenLCB_Single_Thread",
        "placeholder_4161": "OpenMRNLite",
        "placeholder_4162": "OpenMV Arduino RPC",
        "placeholder_4163": "OpenMenuOS",
        "placeholder_4164": "OpenTherm Library",
        "placeholder_4165": "OpenWeather",
        "placeholder_4166": "OpenWeatherOneCall",
        "placeholder_4167": "Opentherm",
        "placeholder_4168": "OptaUSBUpdate",
        "placeholder_4169": "OptoDebounce",
        "placeholder_4170": "Orbo",
        "placeholder_4171": "Oregon",
        "placeholder_4172": "OrientalCommon_asukiaaa",
        "placeholder_4173": "Orvibo WiWo S20 Library",
        "placeholder_4174": "Oscup",
        "placeholder_4175": "Ospom",
        "placeholder_4176": "OtD Library",
        "placeholder_4177": "OtaHelper",
        "placeholder_4178": "OttoArduinoLib",
        "placeholder_4179": "OttoDIYLib",
        "placeholder_4180": "Oversampling",
        "placeholder_4181": "OvhAPI",
        "placeholder_4182": "P1AM",
        "placeholder_4183": "P1AM_Serial",
        "placeholder_4184": "PAR27979",
        "placeholder_4185": "PAX Graphics",
        "placeholder_4186": "PBEnhancer",
        "placeholder_4187": "PCA6408A",
        "placeholder_4188": "PCA9505_06 Library",
        "placeholder_4189": "PCA9536",
        "placeholder_4190": "PCA9536Arduino",
        "placeholder_4191": "PCA9536D",
        "placeholder_4192": "PCA9536_RGB",
        "placeholder_4193": "PCA9547",
        "placeholder_4194": "PCA9549",
        "placeholder_4195": "PCA9551",
        "placeholder_4196": "PCA9552",
        "placeholder_4197": "PCA9553",
        "placeholder_4198": "PCA9554",
        "placeholder_4199": "PCA9557-arduino",
        "placeholder_4200": "PCA95x5",
        "placeholder_4201": "PCA9622",
        "placeholder_4202": "PCA9624",
        "placeholder_4203": "PCA9634",
        "placeholder_4204": "PCA9634 Arduino Library",
        "placeholder_4205": "PCA9634 library",
        "placeholder_4206": "PCA9635",
        "placeholder_4207": "PCA9685",
        "placeholder_4208": "PCA9685 16-Channel PWM Driver Module Library",
        "placeholder_4209": "PCA9685_LED_DRIVER",
        "placeholder_4210": "PCA9685_RT",
        "placeholder_4211": "PCA9698",
        "placeholder_4212": "PCD8544",
        "placeholder_4213": "PCF2129",
        "placeholder_4214": "PCF8523",
        "placeholder_4215": "PCF8563_RTC",
        "placeholder_4216": "PCF8574",
        "placeholder_4217": "PCF8574 library",
        "placeholder_4218": "PCF8575",
        "placeholder_4219": "PCF8575 library",
        "placeholder_4220": "PCF8575-lib",
        "placeholder_4221": "PCF8583",
        "placeholder_4222": "PCF8591",
        "placeholder_4223": "PCF8591 library",
        "placeholder_4224": "PCM",
        "placeholder_4225": "PCM51xx DAC",
        "placeholder_4226": "PCR",
        "placeholder_4227": "PD-10LX-Library",
        "placeholder_4228": "PDLS_EXT3_Basic_BWRY",
        "placeholder_4229": "PDLS_EXT3_Basic_Fast",
        "placeholder_4230": "PDLS_EXT3_Basic_Global",
        "placeholder_4231": "PDLS_EXT3_Basic_Touch",
        "placeholder_4232": "PE43xx",
        "placeholder_4233": "PERIPUMP",
        "placeholder_4234": "PF",
        "placeholder_4235": "PGMTools",
        "placeholder_4236": "PGMWrap",
        "placeholder_4237": "PH4502C-Sensor",
        "placeholder_4238": "PHPoC",
        "placeholder_4239": "PHPoC Expansion",
        "placeholder_4240": "PI3EQX12908A2",
        "placeholder_4241": "PI4IOE5V6416",
        "placeholder_4242": "PI4IOE5V9554",
        "placeholder_4243": "PICxel",
        "placeholder_4244": "PID",
        "placeholder_4245": "PID controllers Modular Professional",
        "placeholder_4246": "PIDController",
        "placeholder_4247": "PID_DG",
        "placeholder_4248": "PID_RT",
        "placeholder_4249": "PID_Timed",
        "placeholder_4250": "PID_v1_bc",
        "placeholder_4251": "PID_v2",
        "placeholder_4252": "PIO8255",
        "placeholder_4253": "PIR",
        "placeholder_4254": "PIRSensor",
        "placeholder_4255": "PJON",
        "placeholder_4256": "PL ADXL355",
        "placeholder_4257": "PLCCore2",
        "placeholder_4258": "PLCustomDevices",
        "placeholder_4259": "PLEN5Stack",
        "placeholder_4260": "PLS7 shield",
        "placeholder_4261": "PLSduino",
        "placeholder_4262": "PL_microEPD",
        "placeholder_4263": "PM1006K",
        "placeholder_4264": "PM2005Lib",
        "placeholder_4265": "PM2008 I2C",
        "placeholder_4266": "PMIC_BQ25896",
        "placeholder_4267": "PMS Library",
        "placeholder_4268": "PMSensor-HPMA115",
        "placeholder_4269": "PMW3360 Module",
        "placeholder_4270": "PMsensor",
        "placeholder_4271": "PNGdec",
        "placeholder_4272": "PNGenc",
        "placeholder_4273": "POV library",
        "placeholder_4274": "PPM",
        "placeholder_4275": "PPM-reader",
        "placeholder_4276": "PPMEncoder",
        "placeholder_4277": "PPPOSClient",
        "placeholder_4278": "PRDC_AD7193",
        "placeholder_4279": "PRDC_AD7194",
        "placeholder_4280": "PRDC_AD7797",
        "placeholder_4281": "PRDC_FreePort",
        "placeholder_4282": "PRDC_RS485HD_STM32",
        "placeholder_4283": "PRDC_ServoHT",
        "placeholder_4284": "PRDC_TMAESC",
        "placeholder_4285": "PROGMEMAssert",
        "placeholder_4286": "PROMPLUS",
        "placeholder_4287": "PS-33D I2C",
        "placeholder_4288": "PS2KeyAdvanced",
        "placeholder_4289": "PS2KeyMap",
        "placeholder_4290": "PS2KeyRaw",
        "placeholder_4291": "PS2Keyboard",
        "placeholder_4292": "PS3 Controller Host",
        "placeholder_4293": "PS4Controller",
        "placeholder_4294": "PSACrypto",
        "placeholder_4295": "PT2258",
        "placeholder_4296": "PT2314",
        "placeholder_4297": "PT6312",
        "placeholder_4298": "PTSolns_I2CBackpack",
        "placeholder_4299": "PTSolns_InterfaceShield",
        "placeholder_4300": "PTSolns_microWatt",
        "placeholder_4301": "PTW-Arduino-Assert",
        "placeholder_4302": "PU2CLR AKC695X",
        "placeholder_4303": "PU2CLR BK108X",
        "placeholder_4304": "PU2CLR KT0915",
        "placeholder_4305": "PU2CLR MCP23008",
        "placeholder_4306": "PU2CLR PCF8574",
        "placeholder_4307": "PU2CLR RDA5807",
        "placeholder_4308": "PU2CLR SI470X",
        "placeholder_4309": "PU2CLR SI4735",
        "placeholder_4310": "PU2CLR SI4844",
        "placeholder_4311": "PU2REO Si5351ArduinoLite",
        "placeholder_4312": "PU2REO_AD9851",
        "placeholder_4313": "PU2REO_Si570",
        "placeholder_4314": "PVision",
        "placeholder_4315": "PWFusion_MAX31856",
        "placeholder_4316": "PWFusion_Max31865",
        "placeholder_4317": "PWFusion_Mcp2515",
        "placeholder_4318": "PWFusion_Mcp960x",
        "placeholder_4319": "PWFusion_TCA9548A",
        "placeholder_4320": "PWFusion_VL53L3C",
        "placeholder_4321": "PWMFreak",
        "placeholder_4322": "PWMMotorControl",
        "placeholder_4323": "PWMOutESP32",
        "placeholder_4324": "PWMServo",
        "placeholder_4325": "PWMrelay",
        "placeholder_4326": "PZEM004Tv30",
        "placeholder_4327": "Pablo",
        "placeholder_4328": "PacketSerial",
        "placeholder_4329": "Packetizer",
        "placeholder_4330": "PadComLib",
        "placeholder_4331": "PageBuilder",
        "placeholder_4332": "PagonGameDev GameLoop",
        "placeholder_4333": "Painless Mesh",
        "placeholder_4334": "Pairs",
        "placeholder_4335": "Palazzetti",
        "placeholder_4336": "Panel.h for NeoPixel Matrix",
        "placeholder_4337": "PanelLan",
        "placeholder_4338": "Pantalla12x8",
        "placeholder_4339": "Paperdink",
        "placeholder_4340": "Parallax LCD",
        "placeholder_4341": "ParallelPrinter",
        "placeholder_4342": "Parameter",
        "placeholder_4343": "Parse Arduino SDK",
        "placeholder_4344": "ParseCommands",
        "placeholder_4345": "Parser",
        "placeholder_4346": "Pasos",
        "placeholder_4347": "Password",
        "placeholder_4348": "PathVariableHandlers",
        "placeholder_4349": "PaunaStepper",
        "placeholder_4350": "PciManager",
        "placeholder_4351": "PeanutKing ArduinoShield",
        "placeholder_4352": "PeanutKing Soccer",
        "placeholder_4353": "Pelco_And_Arduino",
        "placeholder_4354": "PenYX",
        "placeholder_4355": "PersWiFiManager",
        "placeholder_4356": "PersistentQueue",
        "placeholder_4357": "PestoLink-Receive",
        "placeholder_4358": "PetriNetLib",
        "placeholder_4359": "Phant",
        "placeholder_4360": "PhysicsLabFirmware",
        "placeholder_4361": "Piano Board",
        "placeholder_4362": "Picaso-Serial-Arduino-Library",
        "placeholder_4363": "Pico PIO USB",
        "placeholder_4364": "Pico-DMX",
        "placeholder_4365": "PicoAnalogCorrection",
        "placeholder_4366": "PicoDVI - Adafruit Fork",
        "placeholder_4367": "PicoEncoder",
        "placeholder_4368": "PicoMQTT",
        "placeholder_4369": "PicoPLC",
        "placeholder_4370": "PicoSoftwareSerial",
        "placeholder_4371": "PicoStep",
        "placeholder_4372": "PicoWebsocket",
        "placeholder_4373": "Picovoice_AR",
        "placeholder_4374": "Picovoice_DE",
        "placeholder_4375": "Picovoice_EN",
        "placeholder_4376": "Picovoice_ES",
        "placeholder_4377": "Picovoice_FA",
        "placeholder_4378": "Picovoice_FR",
        "placeholder_4379": "Picovoice_HI",
        "placeholder_4380": "Picovoice_IT",
        "placeholder_4381": "Picovoice_JA",
        "placeholder_4382": "Picovoice_KO",
        "placeholder_4383": "Picovoice_NL",
        "placeholder_4384": "Picovoice_PL",
        "placeholder_4385": "Picovoice_PT",
        "placeholder_4386": "Picovoice_RU",
        "placeholder_4387": "Picovoice_SV",
        "placeholder_4388": "Picovoice_VN",
        "placeholder_4389": "Picovoice_ZH",
        "placeholder_4390": "Pictiva OS288048",
        "placeholder_4391": "Pikabot",
        "placeholder_4392": "PimientoClockLib",
        "placeholder_4393": "Pin",
        "placeholder_4394": "PinButtonEvents",
        "placeholder_4395": "PinChangeInterrupt",
        "placeholder_4396": "PinExtender Library",
        "placeholder_4397": "PinInGroup",
        "placeholder_4398": "PinMatrix",
        "placeholder_4399": "PinOutGroup",
        "placeholder_4400": "Pinduino",
        "placeholder_4401": "PioSPI",
        "placeholder_4402": "PixelGrid",
        "placeholder_4403": "PixelMaestro",
        "placeholder_4404": "Pixel_Spork",
        "placeholder_4405": "Pixetto",
        "placeholder_4406": "PixettoLite",
        "placeholder_4407": "PixhawkArduinoMAVLink",
        "placeholder_4408": "Pixie",
        "placeholder_4409": "PixieChromaLite",
        "placeholder_4410": "Pixie_Chroma",
        "placeholder_4411": "Pixxi-Serial-Arduino-Library",
        "placeholder_4412": "Plaquette",
        "placeholder_4413": "PlayRtttl",
        "placeholder_4414": "Plex64",
        "placeholder_4415": "PlotPlus",
        "placeholder_4416": "Plotter",
        "placeholder_4417": "PlugAndPlayForLoRa",
        "placeholder_4418": "PlugPiBlack",
        "placeholder_4419": "PmodCls",
        "placeholder_4420": "PneumaticStepper",
        "placeholder_4421": "PodEnoSim",
        "placeholder_4422": "PointzNet",
        "placeholder_4423": "Pokerobo_ABC",
        "placeholder_4424": "Pokerobo_Arm",
        "placeholder_4425": "Pokerobo_Car",
        "placeholder_4426": "Pokerobo_I2C",
        "placeholder_4427": "Pokerobo_IRx",
        "placeholder_4428": "Pokerobo_Labs",
        "placeholder_4429": "Pokerobo_PSx",
        "placeholder_4430": "Pokerobo_RCB",
        "placeholder_4431": "PollingTimer",
        "placeholder_4432": "Pololu3piPlus32U4",
        "placeholder_4433": "PololuBuzzer",
        "placeholder_4434": "PololuHD44780",
        "placeholder_4435": "PololuLedStrip",
        "placeholder_4436": "PololuMaestro",
        "placeholder_4437": "PololuMenu",
        "placeholder_4438": "PololuOLED",
        "placeholder_4439": "PololuQik",
        "placeholder_4440": "PololuRPiSlave",
        "placeholder_4441": "Polyline",
        "placeholder_4442": "Polymorphic Buttons",
        "placeholder_4443": "Ponoor L6470 Library",
        "placeholder_4444": "Ponoor PowerSTEP01 Library",
        "placeholder_4445": "Porcupine_AR",
        "placeholder_4446": "Porcupine_DE",
        "placeholder_4447": "Porcupine_EN",
        "placeholder_4448": "Porcupine_ES",
        "placeholder_4449": "Porcupine_FA",
        "placeholder_4450": "Porcupine_FR",
        "placeholder_4451": "Porcupine_HI",
        "placeholder_4452": "Porcupine_IT",
        "placeholder_4453": "Porcupine_JA",
        "placeholder_4454": "Porcupine_KO",
        "placeholder_4455": "Porcupine_NL",
        "placeholder_4456": "Porcupine_PL",
        "placeholder_4457": "Porcupine_PT",
        "placeholder_4458": "Porcupine_RU",
        "placeholder_4459": "Porcupine_SV",
        "placeholder_4460": "Porcupine_VN",
        "placeholder_4461": "Porcupine_ZH",
        "placeholder_4462": "PortaMob",
        "placeholder_4463": "Portenta_H7_AsyncHTTPRequest",
        "placeholder_4464": "Portenta_H7_AsyncTCP",
        "placeholder_4465": "Portenta_H7_AsyncUDP",
        "placeholder_4466": "Portenta_H7_AsyncWebServer",
        "placeholder_4467": "Portenta_H7_ISR_Servo",
        "placeholder_4468": "Portenta_H7_PWM",
        "placeholder_4469": "Portenta_H7_Slow_PWM",
        "placeholder_4470": "Portenta_H7_TimerInterrupt",
        "placeholder_4471": "Posit",
        "placeholder_4472": "PositionControl",
        "placeholder_4473": "PostNeoSWSerial",
        "placeholder_4474": "Potentiometer_ADI_Arduino",
        "placeholder_4475": "Potentiostat_Shield",
        "placeholder_4476": "PowerFeather-SDK",
        "placeholder_4477": "PowerFlex4m",
        "placeholder_4478": "PowerMonitor",
        "placeholder_4479": "Powerbaas",
        "placeholder_4480": "Pozyx",
        "placeholder_4481": "Prandom",
        "placeholder_4482": "PreMo - Virtual Path Following",
        "placeholder_4483": "PreciseLM35",
        "placeholder_4484": "Preferences",
        "placeholder_4485": "PreferencesCLI",
        "placeholder_4486": "PressureNXPMXP",
        "placeholder_4487": "PrimitiveStepperMotor",
        "placeholder_4488": "PrintCharArray",
        "placeholder_4489": "PrintCppVersion",
        "placeholder_4490": "PrintEx",
        "placeholder_4491": "PrintSize",
        "placeholder_4492": "PrintString",
        "placeholder_4493": "PrinterDuino",
        "placeholder_4494": "Printoo_Library",
        "placeholder_4495": "Pro Trinket USB Keyboard Library",
        "placeholder_4496": "Pro Trinket USB Mouse",
        "placeholder_4497": "ProcessScheduler",
        "placeholder_4498": "Profiler",
        "placeholder_4499": "Progetto One Pin Keypad",
        "placeholder_4500": "PromLokiTransport",
        "placeholder_4501": "PrometheusArduino",
        "placeholder_4502": "PropertyChangeLib",
        "placeholder_4503": "ProtoCentral ADS1220 24-bit ADC Library",
        "placeholder_4504": "ProtoCentral ADS1262 32-bit precision ADC Library",
        "placeholder_4505": "ProtoCentral ADS1292R ECG and Respiration boards library",
        "placeholder_4506": "ProtoCentral ADS1293 ECG Library",
        "placeholder_4507": "ProtoCentral AFE4490 PPG and SpO2 boards library",
        "placeholder_4508": "ProtoCentral FDC1004 Capacitive Sensor Library",
        "placeholder_4509": "ProtoCentral HealthyPi v4 Library",
        "placeholder_4510": "ProtoCentral MAX30001",
        "placeholder_4511": "ProtoCentral MAX30003 ECG AFE Sensor Library",
        "placeholder_4512": "ProtoCentral MAX30205 Body Temperature Sensor Library",
        "placeholder_4513": "ProtoCentral MAX86150 PPG and ECG IC library",
        "placeholder_4514": "ProtoCentral MLX90632 Non-contact temperature Library",
        "placeholder_4515": "ProtoCentral Pulse Express SpO2 Heartrate and BPT sensor",
        "placeholder_4516": "ProtoCentral TLA20xx",
        "placeholder_4517": "Protothreads",
        "placeholder_4518": "Proyectil GD3300",
        "placeholder_4519": "Proyectil MedeaWiz",
        "placeholder_4520": "Proyectil digitalIO",
        "placeholder_4521": "Ps2KeyboardHost",
        "placeholder_4522": "Psgino",
        "placeholder_4523": "PsxNewLib",
        "placeholder_4524": "PsychicHttp",
        "placeholder_4525": "Psychrometer",
        "placeholder_4526": "PubSubClient",
        "placeholder_4527": "PubSubClientTools",
        "placeholder_4528": "PubSubClient_iiot",
        "placeholder_4529": "Pubnub",
        "placeholder_4530": "PulseCom",
        "placeholder_4531": "PulseDivider",
        "placeholder_4532": "PulseFlowMeter",
        "placeholder_4533": "PulsePattern",
        "placeholder_4534": "PulsePosition",
        "placeholder_4535": "PulseRainUARTConsole",
        "placeholder_4536": "PulseSensor Playground",
        "placeholder_4537": "Pulser",
        "placeholder_4538": "PushButton Event Modelling Library",
        "placeholder_4539": "PushButtonTaps",
        "placeholder_4540": "Pushbutton",
        "placeholder_4541": "Pushdata_ESP8266_SSL",
        "placeholder_4542": "Pushetta",
        "placeholder_4543": "PwFusion_Data_Transfer",
        "placeholder_4544": "PwFusion_I2C_Buttons_Arduino_Library",
        "placeholder_4545": "PwFusion_I2C_Encoder_Arduino_Library",
        "placeholder_4546": "PwFusion_I2C_Joystick_Arduino_Library",
        "placeholder_4547": "PwFusion_I2C_Toggle_Arduino_Library",
        "placeholder_4548": "PwmSin",
        "placeholder_4549": "PxMatrix Christmas Icons",
        "placeholder_4550": "PxMatrix LED MATRIX library",
        "placeholder_4551": "PxMatrix-1R",
        "placeholder_4552": "PxServ",
        "placeholder_4553": "PyArduinoDebug",
        "placeholder_4554": "PyDuinoBridge",
        "placeholder_4555": "QC2Control",
        "placeholder_4556": "QC3Control",
        "placeholder_4557": "QCFA",
        "placeholder_4558": "QDEC",
        "placeholder_4559": "QDispatch",
        "placeholder_4560": "QList",
        "placeholder_4561": "QMC5883LCompass",
        "placeholder_4562": "QN8066",
        "placeholder_4563": "QNEthernet",
        "placeholder_4564": "QPESP32",
        "placeholder_4565": "QRCode",
        "placeholder_4566": "QRcodeDisplay",
        "placeholder_4567": "QRcodeEink",
        "placeholder_4568": "QRcodeOled",
        "placeholder_4569": "QRcode_ST7789",
        "placeholder_4570": "QRcode_eSPI",
        "placeholder_4571": "QTRSensors",
        "placeholder_4572": "QUAD7SHIFT",
        "placeholder_4573": "QZQSM",
        "placeholder_4574": "Qmi8658c",
        "placeholder_4575": "QuadratureEncoder",
        "placeholder_4576": "QuarkTS",
        "placeholder_4577": "QubitroMqttClient",
        "placeholder_4578": "Queue",
        "placeholder_4579": "Queuetue Digital Balance Library",
        "placeholder_4580": "Queuetue HX711 Library",
        "placeholder_4581": "QuickCharge",
        "placeholder_4582": "QuickMedianLib",
        "placeholder_4583": "QuickPID",
        "placeholder_4584": "QuickSortLib",
        "placeholder_4585": "QuickStats",
        "placeholder_4586": "R30X-Fingerprint-Sensor-Library",
        "placeholder_4587": "R4A_ESP32",
        "placeholder_4588": "R4A_I2C",
        "placeholder_4589": "R4A_Robot",
        "placeholder_4590": "R4HttpClient",
        "placeholder_4591": "R4_Touch",
        "placeholder_4592": "RADAR",
        "placeholder_4593": "RAIN",
        "placeholder_4594": "RAK12019_LTR390_UV_Light",
        "placeholder_4595": "RAK12022-MAX31865",
        "placeholder_4596": "RAK12027-D7S",
        "placeholder_4597": "RAK12029-LDC1614",
        "placeholder_4598": "RAK12035_SoilMoisture",
        "placeholder_4599": "RAK12039_PM_Sensor",
        "placeholder_4600": "RAK12052-MLX90640",
        "placeholder_4601": "RAK13006-MCP2518 library",
        "placeholder_4602": "RAK13800_W5100S",
        "placeholder_4603": "RAK13801_UWB",
        "placeholder_4604": "RAK14000_EPD",
        "placeholder_4605": "RAK14014-FT6336U",
        "placeholder_4606": "RAK15007-CY15B108QN",
        "placeholder_4607": "RAK1500x-MB85RC",
        "placeholder_4608": "RAK5814-ATECC608A",
        "placeholder_4609": "RAKwireless ADS7830 library",
        "placeholder_4610": "RAKwireless CAP1293 Touch Pad library",
        "placeholder_4611": "RAKwireless I3G4250D Gyroscope library",
        "placeholder_4612": "RAKwireless LED Matrix",
        "placeholder_4613": "RAKwireless MQx library",
        "placeholder_4614": "RAKwireless NCP5623 RGB LED library",
        "placeholder_4615": "RAKwireless RAK12033 Library",
        "placeholder_4616": "RAKwireless RAK12034",
        "placeholder_4617": "RAKwireless RAK13600 RFID library",
        "placeholder_4618": "RAKwireless Storage",
        "placeholder_4619": "RAKwireless TLE7259 LIN Bus library",
        "placeholder_4620": "RAKwireless VEML Light Sensor",
        "placeholder_4621": "RAKwireless-Audio-library",
        "placeholder_4622": "RAKwireless-RAK12021-TCS37725",
        "placeholder_4623": "RAKwireless_ADC_SGM58031_library",
        "placeholder_4624": "RAKwireless_SDI-12",
        "placeholder_4625": "RBD_Button",
        "placeholder_4626": "RBD_Capacitance",
        "placeholder_4627": "RBD_HumanSensor",
        "placeholder_4628": "RBD_Light",
        "placeholder_4629": "RBD_LightSensor",
        "placeholder_4630": "RBD_Motor",
        "placeholder_4631": "RBD_SerialManager",
        "placeholder_4632": "RBD_Servo",
        "placeholder_4633": "RBD_Threshold",
        "placeholder_4634": "RBD_Timer",
        "placeholder_4635": "RBD_WaterSensor",
        "placeholder_4636": "RBE1001Lib",
        "placeholder_4637": "RBL_nRF8001",
        "placeholder_4638": "RC Receiver",
        "placeholder_4639": "RC.Easy",
        "placeholder_4640": "RCLSwitch",
        "placeholder_4641": "RCReceiver",
        "placeholder_4642": "RCWL0516",
        "placeholder_4643": "RCWL_1X05",
        "placeholder_4644": "RC_ESC",
        "placeholder_4645": "RDV GY-512 Library",
        "placeholder_4646": "RESTClient",
        "placeholder_4647": "RESTuino",
        "placeholder_4648": "RF24",
        "placeholder_4649": "RF24Ethernet",
        "placeholder_4650": "RF24G",
        "placeholder_4651": "RF24Mesh",
        "placeholder_4652": "RF24Network",
        "placeholder_4653": "RF433any",
        "placeholder_4654": "RF433recv",
        "placeholder_4655": "RF433send",
        "placeholder_4656": "RFCodes",
        "placeholder_4657": "RFExplorer 3GP IoT",
        "placeholder_4658": "RFID_MFRC522v2",
        "placeholder_4659": "RFM69_LowPowerLab",
        "placeholder_4660": "RGB",
        "placeholder_4661": "RGB LED Lighting Shield XMC1202",
        "placeholder_4662": "RGB matrix Panel",
        "placeholder_4663": "RGB-LED-Lighting-Shield",
        "placeholder_4664": "RGBLEDBlender",
        "placeholder_4665": "RGBProgress",
        "placeholder_4666": "RGBWConverter",
        "placeholder_4667": "RGB_LED",
        "placeholder_4668": "RLEBitmap",
        "placeholder_4669": "RLNode",
        "placeholder_4670": "RL_ToneSongPlayer",
        "placeholder_4671": "RLab",
        "placeholder_4672": "RMCS-220X",
        "placeholder_4673": "RMDX",
        "placeholder_4674": "RN487x",
        "placeholder_4675": "ROBLEX",
        "placeholder_4676": "ROKduino",
        "placeholder_4677": "RP2040-BrtEve",
        "placeholder_4678": "RP2040_ISR_Servo",
        "placeholder_4679": "RP2040_PIO_Charlieplexing",
        "placeholder_4680": "RP2040_PWM",
        "placeholder_4681": "RP2040_RTC",
        "placeholder_4682": "RP2040_SD",
        "placeholder_4683": "RP2040_Slow_PWM",
        "placeholder_4684": "RPI_PICO_TimerInterrupt",
        "placeholder_4685": "RPM",
        "placeholder_4686": "RPlatform",
        "placeholder_4687": "RPulse",
        "placeholder_4688": "RRE Font Library",
        "placeholder_4689": "RS485",
        "placeholder_4690": "RS485HwSerial",
        "placeholder_4691": "RSbus",
        "placeholder_4692": "RT-Thread",
        "placeholder_4693": "RTC",
        "placeholder_4694": "RTC RV-3028-C7 Arduino Library",
        "placeholder_4695": "RTC3231",
        "placeholder_4696": "RTC4543lib",
        "placeholder_4697": "RTCCounter",
        "placeholder_4698": "RTCDS1307",
        "placeholder_4699": "RTCDue",
        "placeholder_4700": "RTCLib by NeiroN",
        "placeholder_4701": "RTCMemory",
        "placeholder_4702": "RTCTimer",
        "placeholder_4703": "RTCVars",
        "placeholder_4704": "RTCZero",
        "placeholder_4705": "RTC_NXP_Arduino",
        "placeholder_4706": "RTC_RX8025NB",
        "placeholder_4707": "RTC_RX8025T",
        "placeholder_4708": "RTClib",
        "placeholder_4709": "RTCtime",
        "placeholder_4710": "RTCx",
        "placeholder_4711": "RTD10K-temp-sensor",
        "placeholder_4712": "RTL8720_RTC",
        "placeholder_4713": "RTL8720_TimerInterrupt",
        "placeholder_4714": "RTT QRCode",
        "placeholder_4715": "RTT Stream",
        "placeholder_4716": "RTT-CMSIS-OS",
        "placeholder_4717": "RTT-Ethernet",
        "placeholder_4718": "RTT-GUI",
        "placeholder_4719": "RUI3-Arduino-Library",
        "placeholder_4720": "RV-1805-C3",
        "placeholder_4721": "RV-3028-C7",
        "placeholder_4722": "RV3028",
        "placeholder_4723": "RV8803Tiny",
        "placeholder_4724": "RX8010SJ",
        "placeholder_4725": "RX8025",
        "placeholder_4726": "RadSensBoard",
        "placeholder_4727": "RadarIQ",
        "placeholder_4728": "RadiationWatch",
        "placeholder_4729": "Radio",
        "placeholder_4730": "RadioHead",
        "placeholder_4731": "RadioLib",
        "placeholder_4732": "RadioengeLoraWAN",
        "placeholder_4733": "Ramp",
        "placeholder_4734": "Rando HX711 Library",
        "placeholder_4735": "Random16",
        "placeholder_4736": "RapifireMqttClient",
        "placeholder_4737": "Raspberry Pi Pico CPU Temperature",
        "placeholder_4738": "RazorIMU_9DOF",
        "placeholder_4739": "Rcn600",
        "placeholder_4740": "Rdebug",
        "placeholder_4741": "ReGIS",
        "placeholder_4742": "ReWire MAX32664 Biosensor Hub Library",
        "placeholder_4743": "ReactESP",
        "placeholder_4744": "React_Generic",
        "placeholder_4745": "ReactiveArduino",
        "placeholder_4746": "ReactorProtocol",
        "placeholder_4747": "ReadFilter",
        "placeholder_4748": "ReciclaBot",
        "placeholder_4749": "RedEye",
        "placeholder_4750": "Redis for Arduino",
        "placeholder_4751": "Redis for ESP8266",
        "placeholder_4752": "ReefwingAHRS",
        "placeholder_4753": "ReefwingFilter",
        "placeholder_4754": "ReefwingLPS22HB",
        "placeholder_4755": "ReefwingLSM9DS1",
        "placeholder_4756": "ReefwingMPU6050",
        "placeholder_4757": "ReefwingMPU6x00",
        "placeholder_4758": "ReefwingMSP",
        "placeholder_4759": "ReefwingMotorShield",
        "placeholder_4760": "ReefwingPWM",
        "placeholder_4761": "ReefwingSBUS",
        "placeholder_4762": "ReefwingTimer",
        "placeholder_4763": "Reefwing_imuTypes",
        "placeholder_4764": "Reefwing_xIMU3",
        "placeholder_4765": "Regexp",
        "placeholder_4766": "Regression",
        "placeholder_4767": "Relay",
        "placeholder_4768": "RelayModule",
        "placeholder_4769": "Remocon",
        "placeholder_4770": "RemoteDebug",
        "placeholder_4771": "RemoteDebug2",
        "placeholder_4772": "RemoteDebugger",
        "placeholder_4773": "RemoteMe",
        "placeholder_4774": "RemoteMeUtils",
        "placeholder_4775": "RemoteSensor",
        "placeholder_4776": "RemoteSerial",
        "placeholder_4777": "RemoteSignal",
        "placeholder_4778": "RemoteXY",
        "placeholder_4779": "RepeatButton",
        "placeholder_4780": "RequestBuilder",
        "placeholder_4781": "ResistorReader_asukiaaa",
        "placeholder_4782": "ResponsiveAnalogRead",
        "placeholder_4783": "Restfully",
        "placeholder_4784": "RevEng PAJ7620",
        "placeholder_4785": "Rfid134 by Makuna",
        "placeholder_4786": "RfidDb",
        "placeholder_4787": "RhinoServo",
        "placeholder_4788": "RichHttpServer",
        "placeholder_4789": "RingBuf",
        "placeholder_4790": "RingBufCPP",
        "placeholder_4791": "RingBuffer",
        "placeholder_4792": "RingEEPROM",
        "placeholder_4793": "Ringo by CircuitMess Library",
        "placeholder_4794": "Riscduino_MCUFRIEND_kbv",
        "placeholder_4795": "Rivers Engineering",
        "placeholder_4796": "RobbusKidsy",
        "placeholder_4797": "RoboCore - BRIICK Keypad",
        "placeholder_4798": "RoboCore - MMA8452Q",
        "placeholder_4799": "RoboCore - Rocky",
        "placeholder_4800": "RoboCore - SMW_SX1262M0",
        "placeholder_4801": "RoboCore - SMW_SX1276M0",
        "placeholder_4802": "RoboCore - Serial Relay",
        "placeholder_4803": "RoboCore - Vespa",
        "placeholder_4804": "RoboFi",
        "placeholder_4805": "RoboHeart",
        "placeholder_4806": "RoboWunduino",
        "placeholder_4807": "Robopoly Bluetooth",
        "placeholder_4808": "Robopoly Linear Camera",
        "placeholder_4809": "Robopoly PRismino",
        "placeholder_4810": "Robopoly RomeEnco",
        "placeholder_4811": "Robot",
        "placeholder_4812": "Robot Control",
        "placeholder_4813": "Robot IR Remote",
        "placeholder_4814": "Robot Motor",
        "placeholder_4815": "RobotControl",
        "placeholder_4816": "RobotDuLAB Arduino Library",
        "placeholder_4817": "RobotLib",
        "placeholder_4818": "Robotec",
        "placeholder_4819": "Robust-EEPROM",
        "placeholder_4820": "RocciBoard-Library",
        "placeholder_4821": "Rocket Scream LowPowerAVRZero",
        "placeholder_4822": "Rocket Scream RTCAVRZero",
        "placeholder_4823": "RogueMP3",
        "placeholder_4824": "RogueSD",
        "placeholder_4825": "RokitSmart",
        "placeholder_4826": "Romans Audio FastDigitalPin Library",
        "placeholder_4827": "Romans Audio RARGBLED Library",
        "placeholder_4828": "Romi32U4",
        "placeholder_4829": "RoomWeather",
        "placeholder_4830": "RootCertificates",
        "placeholder_4831": "Rosserial Arduino Library",
        "placeholder_4832": "RotEnc",
        "placeholder_4833": "Rotary",
        "placeholder_4834": "RotaryDial",
        "placeholder_4835": "RotaryEncoder",
        "placeholder_4836": "RotaryEncoderPCNT",
        "placeholder_4837": "RotaryEncoder_Zanduino",
        "placeholder_4838": "RoverWing",
        "placeholder_4839": "RoxMux",
        "placeholder_4840": "Rtc by Makuna",
        "placeholder_4841": "Rtc_Pcf8563",
        "placeholder_4842": "Rtttl",
        "placeholder_4843": "RunAvgWeight",
        "placeholder_4844": "RunningAverage",
        "placeholder_4845": "RunningMedian",
        "placeholder_4846": "RunningStats",
        "placeholder_4847": "RussianText_u8g",
        "placeholder_4848": "RustyKeypad",
        "placeholder_4849": "RustyVoltmeter",
        "placeholder_4850": "S.Port sensor library for FrSky",
        "placeholder_4851": "S11059",
        "placeholder_4852": "S4ALib",
        "placeholder_4853": "S5851A",
        "placeholder_4854": "S7XG",
        "placeholder_4855": "S8_UART",
        "placeholder_4856": "S9706",
        "placeholder_4857": "SAM32WiFiEsp",
        "placeholder_4858": "SAMD21 Audio Player",
        "placeholder_4859": "SAMD21 turbo PWM",
        "placeholder_4860": "SAMDUE_PWM",
        "placeholder_4861": "SAMDUE_Slow_PWM",
        "placeholder_4862": "SAMDUE_TimerInterrupt",
        "placeholder_4863": "SAMD_ISR_Servo",
        "placeholder_4864": "SAMD_PWM",
        "placeholder_4865": "SAMD_Slow_PWM",
        "placeholder_4866": "SAMD_TimerInterrupt",
        "placeholder_4867": "SBC",
        "placeholder_4868": "SBUS2",
        "placeholder_4869": "SC16IS7X0",
        "placeholder_4870": "SCA100T",
        "placeholder_4871": "SCL3300",
        "placeholder_4872": "SCL3400",
        "placeholder_4873": "SCPI_Parser",
        "placeholder_4874": "SCServo",
        "placeholder_4875": "SD",
        "placeholder_4876": "SDConfig",
        "placeholder_4877": "SDConfigCommand",
        "placeholder_4878": "SDHT",
        "placeholder_4879": "SDI-12",
        "placeholder_4880": "SDList",
        "placeholder_4881": "SDPSensor-ESP",
        "placeholder_4882": "SDS011 sensor Library",
        "placeholder_4883": "SDS011_vers",
        "placeholder_4884": "SDU AGS SensorBoard",
        "placeholder_4885": "SDU_CAR",
        "placeholder_4886": "SD_card_logger",
        "placeholder_4887": "SEN10724",
        "placeholder_4888": "SET",
        "placeholder_4889": "SE_BasicUnit",
        "placeholder_4890": "SE_Button",
        "placeholder_4891": "SE_EEPROM",
        "placeholder_4892": "SFFS",
        "placeholder_4893": "SFM-V1.7",
        "placeholder_4894": "SGP30",
        "placeholder_4895": "SHCSR04",
        "placeholder_4896": "SHEX",
        "placeholder_4897": "SHT1x sensor library for ESPx",
        "placeholder_4898": "SHT2x",
        "placeholder_4899": "SHT31",
        "placeholder_4900": "SHT31_SW",
        "placeholder_4901": "SHT31_SWW",
        "placeholder_4902": "SHT85",
        "placeholder_4903": "SHTC3 Soldered Library",
        "placeholder_4904": "SI1145_WE",
        "placeholder_4905": "SID6581",
        "placeholder_4906": "SIKTEC Keys",
        "placeholder_4907": "SIKTEC_AVR_Controller",
        "placeholder_4908": "SIKTEC_EPD",
        "placeholder_4909": "SIKTEC_MDSwitch",
        "placeholder_4910": "SIKTEC_Rotary",
        "placeholder_4911": "SIKTEC_SPI",
        "placeholder_4912": "SIKTEC_SRAM",
        "placeholder_4913": "SIKTEC_SdExplore",
        "placeholder_4914": "SIM800L HTTP connector",
        "placeholder_4915": "SIM800_YL",
        "placeholder_4916": "SIM808",
        "placeholder_4917": "SIM900",
        "placeholder_4918": "SIMON",
        "placeholder_4919": "SLIC",
        "placeholder_4920": "SLIPStream",
        "placeholder_4921": "SMA SunnyBoy Reader",
        "placeholder_4922": "SMV_CAN_Bus",
        "placeholder_4923": "SM_16DIGIN",
        "placeholder_4924": "SM_16UNIVIN",
        "placeholder_4925": "SM_4REL4IN",
        "placeholder_4926": "SM_BAS",
        "placeholder_4927": "SM_ESP32Pi",
        "placeholder_4928": "SM_LCDAdapter",
        "placeholder_4929": "SM_RTD",
        "placeholder_4930": "SM_TC",
        "placeholder_4931": "SMoS",
        "placeholder_4932": "SN76489",
        "placeholder_4933": "SNMP",
        "placeholder_4934": "SNMP Manager",
        "placeholder_4935": "SNMP_Agent",
        "placeholder_4936": "SNP_Sensor",
        "placeholder_4937": "SOLDERED HX711 Arduino Library",
        "placeholder_4938": "SOLOMotorControllers",
        "placeholder_4939": "SOMOIoD",
        "placeholder_4940": "SPC",
        "placeholder_4941": "SPFD5408 TFT Library",
        "placeholder_4942": "SPI VFD",
        "placeholder_4943": "SPI-DAC7611",
        "placeholder_4944": "SPI-FlashMem",
        "placeholder_4945": "SPIExtension",
        "placeholder_4946": "SPIFFS ImageReader Library",
        "placeholder_4947": "SPIFFSIniFile",
        "placeholder_4948": "SPIFFSReadServer",
        "placeholder_4949": "SPIFFS_FilePrint",
        "placeholder_4950": "SPIFFS_Shell",
        "placeholder_4951": "SPIFlash_LowPowerLab",
        "placeholder_4952": "SPIMemory",
        "placeholder_4953": "SPIShiftRegister",
        "placeholder_4954": "SPL06-001",
        "placeholder_4955": "SPL06-007",
        "placeholder_4956": "SQLiteDatabaseConnection",
        "placeholder_4957": "SRAM",
        "placeholder_4958": "SRAM_23LC",
        "placeholder_4959": "SRAMsimple",
        "placeholder_4960": "SRF05",
        "placeholder_4961": "SSD1306Ascii",
        "placeholder_4962": "SSD1306TUR",
        "placeholder_4963": "SSD1306wire",
        "placeholder_4964": "SSD1803A_I2C",
        "placeholder_4965": "SSLClient",
        "placeholder_4966": "SSLClientESP32",
        "placeholder_4967": "SST25VF",
        "placeholder_4968": "SSVAnySensor",
        "placeholder_4969": "SSVLongTime",
        "placeholder_4970": "SSVNTPCoreClass",
        "placeholder_4971": "SSVQueueStackArray",
        "placeholder_4972": "SSVRGBGradientCalc",
        "placeholder_4973": "SSVTimer",
        "placeholder_4974": "SSVWaitForStringInStream",
        "placeholder_4975": "SSVXYMatrix",
        "placeholder_4976": "SSVXYMatrixText",
        "placeholder_4977": "ST7032_asukiaaa",
        "placeholder_4978": "ST7565 LCD",
        "placeholder_4979": "ST7789 AVR",
        "placeholder_4980": "STAMP-PICO",
        "placeholder_4981": "STEAMbot",
        "placeholder_4982": "STLED316S",
        "placeholder_4983": "STM32F1_RTC",
        "placeholder_4984": "STM32_CAN",
        "placeholder_4985": "STM32_ISR_Servo",
        "placeholder_4986": "STM32_PWM",
        "placeholder_4987": "STM32_Slow_PWM",
        "placeholder_4988": "STM32_TimerInterrupt",
        "placeholder_4989": "STM32ad9833",
        "placeholder_4990": "STM32duino ASM330LHH",
        "placeholder_4991": "STM32duino Examples",
        "placeholder_4992": "STM32duino FP_Examples",
        "placeholder_4993": "STM32duino FreeRTOS",
        "placeholder_4994": "STM32duino HTS221",
        "placeholder_4995": "STM32duino I-NUCLEO-LRWAN1",
        "placeholder_4996": "STM32duino IIS2DLPC",
        "placeholder_4997": "STM32duino IIS2MDC",
        "placeholder_4998": "STM32duino ISM330DHCX",
        "placeholder_4999": "STM32duino ISM330DLC",
        "placeholder_5000": "STM32duino ISM43362-M3G-L44",
        "placeholder_5001": "STM32duino LIS2DU12",
        "placeholder_5002": "STM32duino LIS2DUXS12",
        "placeholder_5003": "STM32duino LIS2DW12",
        "placeholder_5004": "STM32duino LIS2MDL",
        "placeholder_5005": "STM32duino LIS3MDL",
        "placeholder_5006": "STM32duino LPS22DF",
        "placeholder_5007": "STM32duino LPS22HB",
        "placeholder_5008": "STM32duino LPS22HH",
        "placeholder_5009": "STM32duino LPS25HB",
        "placeholder_5010": "STM32duino LSM303AGR",
        "placeholder_5011": "STM32duino LSM6DS0",
        "placeholder_5012": "STM32duino LSM6DS3",
        "placeholder_5013": "STM32duino LSM6DSL",
        "placeholder_5014": "STM32duino LSM6DSO",
        "placeholder_5015": "STM32duino LSM6DSO16IS",
        "placeholder_5016": "STM32duino LSM6DSOX",
        "placeholder_5017": "STM32duino LSM6DSR",
        "placeholder_5018": "STM32duino LSM6DSV16X",
        "placeholder_5019": "STM32duino Low Power",
        "placeholder_5020": "STM32duino LwIP",
        "placeholder_5021": "STM32duino M24SR64-Y",
        "placeholder_5022": "STM32duino M95640-R",
        "placeholder_5023": "STM32duino MX25R6435F",
        "placeholder_5024": "STM32duino MotionFX",
        "placeholder_5025": "STM32duino NFC-RFAL",
        "placeholder_5026": "STM32duino Proximity Gesture",
        "placeholder_5027": "STM32duino RTC",
        "placeholder_5028": "STM32duino S2-LP",
        "placeholder_5029": "STM32duino SHT40-AD1B",
        "placeholder_5030": "STM32duino SPBTLE-RF",
        "placeholder_5031": "STM32duino ST25DV",
        "placeholder_5032": "STM32duino ST25R3911B",
        "placeholder_5033": "STM32duino ST25R3916",
        "placeholder_5034": "STM32duino ST25R95",
        "placeholder_5035": "STM32duino STEVAL-MKBOXPRO-Audio",
        "placeholder_5036": "STM32duino STEVAL-MKBOXPRO-Examples",
        "placeholder_5037": "STM32duino STM32Ethernet",
        "placeholder_5038": "STM32duino STM32SD",
        "placeholder_5039": "STM32duino STTS22H",
        "placeholder_5040": "STM32duino STTS751",
        "placeholder_5041": "STM32duino VL53L0X",
        "placeholder_5042": "STM32duino VL53L1",
        "placeholder_5043": "STM32duino VL53L1X",
        "placeholder_5044": "STM32duino VL53L3CX",
        "placeholder_5045": "STM32duino VL53L4CD",
        "placeholder_5046": "STM32duino VL53L4CX",
        "placeholder_5047": "STM32duino VL53L4ED",
        "placeholder_5048": "STM32duino VL53L5CX",
        "placeholder_5049": "STM32duino VL53L7CH",
        "placeholder_5050": "STM32duino VL53L7CX",
        "placeholder_5051": "STM32duino VL53L8CH",
        "placeholder_5052": "STM32duino VL53L8CX",
        "placeholder_5053": "STM32duino VL6180",
        "placeholder_5054": "STM32duino VL6180X",
        "placeholder_5055": "STM32duino X-NUCLEO-53L0A1",
        "placeholder_5056": "STM32duino X-NUCLEO-53L1A1",
        "placeholder_5057": "STM32duino X-NUCLEO-53L1A2",
        "placeholder_5058": "STM32duino X-NUCLEO-53L3A2",
        "placeholder_5059": "STM32duino X-NUCLEO-53L4A1",
        "placeholder_5060": "STM32duino X-NUCLEO-53L4A2",
        "placeholder_5061": "STM32duino X-NUCLEO-53L4A3",
        "placeholder_5062": "STM32duino X-NUCLEO-53L5A1",
        "placeholder_5063": "STM32duino X-NUCLEO-53L7A1",
        "placeholder_5064": "STM32duino X-NUCLEO-53L8A1",
        "placeholder_5065": "STM32duino X-NUCLEO-6180A1",
        "placeholder_5066": "STM32duino X-NUCLEO-6180XA1",
        "placeholder_5067": "STM32duino X-NUCLEO-GNSS1A1",
        "placeholder_5068": "STM32duino X-NUCLEO-IDB05A1",
        "placeholder_5069": "STM32duino X-NUCLEO-IHM01A1",
        "placeholder_5070": "STM32duino X-NUCLEO-IHM02A1",
        "placeholder_5071": "STM32duino X-NUCLEO-IHM05A1",
        "placeholder_5072": "STM32duino X-NUCLEO-IHM12A1",
        "placeholder_5073": "STM32duino X-NUCLEO-IHM15A1",
        "placeholder_5074": "STM32duino X-NUCLEO-IKA01A1",
        "placeholder_5075": "STM32duino X-NUCLEO-IKS01A1",
        "placeholder_5076": "STM32duino X-NUCLEO-IKS01A2",
        "placeholder_5077": "STM32duino X-NUCLEO-IKS01A3",
        "placeholder_5078": "STM32duino X-NUCLEO-IKS02A1",
        "placeholder_5079": "STM32duino X-NUCLEO-IKS02A1 Audio",
        "placeholder_5080": "STM32duino X-NUCLEO-IKS4A1",
        "placeholder_5081": "STM32duino X-NUCLEO-LED61A1",
        "placeholder_5082": "STM32duino X-NUCLEO-NFC01A1",
        "placeholder_5083": "STM32duino X-NUCLEO-NFC03A1",
        "placeholder_5084": "STM32duino X-NUCLEO-NFC04A1",
        "placeholder_5085": "STM32duino X-NUCLEO-NFC05A1",
        "placeholder_5086": "STM32duino X-NUCLEO-NFC06A1",
        "placeholder_5087": "STM32duino X-NUCLEO-NFC07A1",
        "placeholder_5088": "STM32duino X-NUCLEO-NFC08A1",
        "placeholder_5089": "STM32duino X-NUCLEO-S2868A1",
        "placeholder_5090": "STM32duino X-NUCLEO-S2868A2",
        "placeholder_5091": "STM32duino X-NUCLEO-S2915A1",
        "placeholder_5092": "STM32duino-Semihosting",
        "placeholder_5093": "STM32duinoBLE",
        "placeholder_5094": "STM32duinoLoRaWAN",
        "placeholder_5095": "STM32encoder",
        "placeholder_5096": "STM32mcp4151",
        "placeholder_5097": "STMSpeeduino",
        "placeholder_5098": "STS_Servos",
        "placeholder_5099": "STUSB4500",
        "placeholder_5100": "ST_HW_HC_SR04",
        "placeholder_5101": "STools",
        "placeholder_5102": "SUSHI-EXP-BOARD",
        "placeholder_5103": "SWAP",
        "placeholder_5104": "SWI2C",
        "placeholder_5105": "SWSerialOut",
        "placeholder_5106": "SX126x-Arduino",
        "placeholder_5107": "SX1509 IO Expander",
        "placeholder_5108": "SX150x",
        "placeholder_5109": "SX8634",
        "placeholder_5110": "SXAccessoire",
        "placeholder_5111": "SafeString",
        "placeholder_5112": "SakuraIO",
        "placeholder_5113": "Salesforce",
        "placeholder_5114": "SandTimer",
        "placeholder_5115": "Sanke",
        "placeholder_5116": "Satspares_DWIN_DGUS_HMI",
        "placeholder_5117": "SavLayFilter",
        "placeholder_5118": "SavitzkyGolayFilter",
        "placeholder_5119": "Sbutton",
        "placeholder_5120": "SceneManager",
        "placeholder_5121": "SchedTask",
        "placeholder_5122": "ScheduleTable",
        "placeholder_5123": "Scheduler",
        "placeholder_5124": "SchedulerESP8266",
        "placeholder_5125": "SchmittTrigger",
        "placeholder_5126": "SchooMyUtilities",
        "placeholder_5127": "ScioSense_APC1",
        "placeholder_5128": "ScioSense_ENS16x",
        "placeholder_5129": "ScioSense_ENS21x",
        "placeholder_5130": "ScioSense_ENS220",
        "placeholder_5131": "Scissors",
        "placeholder_5132": "ScreenUi",
        "placeholder_5133": "ScrollingText8x8Display",
        "placeholder_5134": "SdCardServer",
        "placeholder_5135": "SdFat",
        "placeholder_5136": "SdFat - Adafruit Fork",
        "placeholder_5137": "SdTerminal",
        "placeholder_5138": "SecureMQTT",
        "placeholder_5139": "Seeed Arduino 24GHz Radar Sensor",
        "placeholder_5140": "Seeed Arduino 8Channel I2C Hub",
        "placeholder_5141": "Seeed Arduino Audio",
        "placeholder_5142": "Seeed Arduino FS",
        "placeholder_5143": "Seeed Arduino IR",
        "placeholder_5144": "Seeed Arduino LSM6DS3",
        "placeholder_5145": "Seeed Arduino Mic",
        "placeholder_5146": "Seeed Arduino RTC",
        "placeholder_5147": "Seeed Arduino SFUD",
        "placeholder_5148": "Seeed Arduino SSCMA",
        "placeholder_5149": "Seeed Arduino Sketchbook",
        "placeholder_5150": "Seeed Arduino rpcBLE",
        "placeholder_5151": "Seeed Arduino rpcUnified",
        "placeholder_5152": "Seeed Arduino rpcWiFi",
        "placeholder_5153": "Seeed Wio GPS Board",
        "placeholder_5154": "Seeed-GroveOfflineVoiceRecognition",
        "placeholder_5155": "Seeed-PCA9685",
        "placeholder_5156": "SeeedNrf52480Battery",
        "placeholder_5157": "Seeed_Arduino_AHT20",
        "placeholder_5158": "Seeed_Arduino_mbedtls",
        "placeholder_5159": "Seeeduino GPRS",
        "placeholder_5160": "Seg16",
        "placeholder_5161": "Seg7",
        "placeholder_5162": "Segma",
        "placeholder_5163": "Segment",
        "placeholder_5164": "SenseBoxBLE",
        "placeholder_5165": "SensesInnoma",
        "placeholder_5166": "Senses_NBIoT",
        "placeholder_5167": "Senses_wifi",
        "placeholder_5168": "Senses_wifi_esp32",
        "placeholder_5169": "Sensesiot",
        "placeholder_5170": "Sensirion Core",
        "placeholder_5171": "Sensirion Gadget BLE Arduino Lib",
        "placeholder_5172": "Sensirion Gas Index Algorithm",
        "placeholder_5173": "Sensirion I2C SCD30",
        "placeholder_5174": "Sensirion I2C SCD4x",
        "placeholder_5175": "Sensirion I2C SDP",
        "placeholder_5176": "Sensirion I2C SEN44",
        "placeholder_5177": "Sensirion I2C SEN5X",
        "placeholder_5178": "Sensirion I2C SF06-LF",
        "placeholder_5179": "Sensirion I2C SFA3x",
        "placeholder_5180": "Sensirion I2C SFM-SF06",
        "placeholder_5181": "Sensirion I2C SFM3000",
        "placeholder_5182": "Sensirion I2C SFx6xxx",
        "placeholder_5183": "Sensirion I2C SGP40",
        "placeholder_5184": "Sensirion I2C SGP41",
        "placeholder_5185": "Sensirion I2C SHT3x",
        "placeholder_5186": "Sensirion I2C SHT4x",
        "placeholder_5187": "Sensirion I2C STC3x",
        "placeholder_5188": "Sensirion I2C STS3x",
        "placeholder_5189": "Sensirion I2C STS4x",
        "placeholder_5190": "Sensirion I2C SVM4x",
        "placeholder_5191": "Sensirion UART SEN44",
        "placeholder_5192": "Sensirion UART SFA3x",
        "placeholder_5193": "Sensirion UART SFx6xxx",
        "placeholder_5194": "Sensirion UART Svm4x",
        "placeholder_5195": "Sensirion UPT BLE Auto Detection",
        "placeholder_5196": "Sensirion UPT Core",
        "placeholder_5197": "Sensirion UPT I2C Auto Detection",
        "placeholder_5198": "Sensor",
        "placeholder_5199": "Sensor Communication Library",
        "placeholder_5200": "SensorFusion",
        "placeholder_5201": "SensorLib",
        "placeholder_5202": "SensorModbusMaster",
        "placeholder_5203": "SensorNormalization",
        "placeholder_5204": "SensorPlot WebInterface",
        "placeholder_5205": "SensorToButton",
        "placeholder_5206": "SensorWLED",
        "placeholder_5207": "SeqButton",
        "placeholder_5208": "SeqTimer",
        "placeholder_5209": "Sequent Home Automation HAT",
        "placeholder_5210": "SercomSPISlave",
        "placeholder_5211": "Serde",
        "placeholder_5212": "Serial Controlled Motor Driver",
        "placeholder_5213": "Serial Data Exporter",
        "placeholder_5214": "SerialBuffSender",
        "placeholder_5215": "SerialBus",
        "placeholder_5216": "SerialCAN",
        "placeholder_5217": "SerialCmd",
        "placeholder_5218": "SerialCom",
        "placeholder_5219": "SerialCommand",
        "placeholder_5220": "SerialCommand Advanced",
        "placeholder_5221": "SerialCommands",
        "placeholder_5222": "SerialConfigCommand",
        "placeholder_5223": "SerialDebug",
        "placeholder_5224": "SerialDebugger",
        "placeholder_5225": "SerialDraw",
        "placeholder_5226": "SerialFlash",
        "placeholder_5227": "SerialMIIO",
        "placeholder_5228": "SerialMP3",
        "placeholder_5229": "SerialMP3Player",
        "placeholder_5230": "SerialMenuCmd",
        "placeholder_5231": "SerialRFID",
        "placeholder_5232": "SerialRecord",
        "placeholder_5233": "SerialTerminal",
        "placeholder_5234": "SerialTerminalIO",
        "placeholder_5235": "SerialTerminalPRO",
        "placeholder_5236": "SerialToWifi",
        "placeholder_5237": "SerialTransfer",
        "placeholder_5238": "SerialTuning",
        "placeholder_5239": "SerialUI",
        "placeholder_5240": "SerialUtil",
        "placeholder_5241": "SerialVariable",
        "placeholder_5242": "SerialWireOutput",
        "placeholder_5243": "SerialWombat",
        "placeholder_5244": "SerialWombat18ABVGADriver",
        "placeholder_5245": "Serial_BLE",
        "placeholder_5246": "Serial_Monitor",
        "placeholder_5247": "Serie",
        "placeholder_5248": "Series",
        "Servo.h": "Servo",
        "placeholder_5250": "Servo Hardware PWM",
        "placeholder_5251": "Servo328",
        "placeholder_5252": "ServoCtrl",
        "placeholder_5253": "ServoESP32",
        "placeholder_5254": "ServoESP32Fix",
        "placeholder_5255": "ServoEasing",
        "placeholder_5256": "ServoInput",
        "placeholder_5257": "ServoMotor",
        "placeholder_5258": "ServoOsc",
        "placeholder_5259": "ServoSmooth",
        "placeholder_5260": "Servo_Motor_Module",
        "placeholder_5261": "SessionManager",
        "placeholder_5262": "SetPoint",
        "placeholder_5263": "Settings",
        "placeholder_5264": "Settings Manager",
        "placeholder_5265": "SettingsManagerESP32",
        "placeholder_5266": "SevSeg",
        "placeholder_5267": "SevSegShift",
        "placeholder_5268": "Seven Segment Library",
        "placeholder_5269": "Seven Segment Pixel",
        "placeholder_5270": "Seven Segments K",
        "placeholder_5271": "SevenSeg",
        "placeholder_5272": "SevenSeg4D",
        "placeholder_5273": "SevenSegDisplays",
        "placeholder_5274": "SevenSegInt",
        "placeholder_5275": "SevenSegmentPanel",
        "placeholder_5276": "SevenSegmentTM1637",
        "placeholder_5277": "SevenSegmentsDisp",
        "placeholder_5278": "Sharer",
        "placeholder_5279": "Sharp GP2Y Dust Sensor",
        "placeholder_5280": "SharpDistSensor",
        "placeholder_5281": "SharpIR",
        "placeholder_5282": "Shellminator",
        "placeholder_5283": "Shift Register LED Matrix Lib",
        "placeholder_5284": "ShiftDisplay",
        "placeholder_5285": "ShiftDisplay2",
        "placeholder_5286": "ShiftInSlow",
        "placeholder_5287": "ShiftLcd",
        "placeholder_5288": "ShiftOutMega",
        "placeholder_5289": "ShiftOutSlow",
        "placeholder_5290": "ShiftRegister",
        "placeholder_5291": "ShiftRegister-PWM-Library",
        "placeholder_5292": "ShiftRegister74HC595",
        "placeholder_5293": "ShiftRegisterController",
        "placeholder_5294": "Shifty",
        "placeholder_5295": "Shox96 Progmem Compression",
        "placeholder_5296": "Shutters",
        "placeholder_5297": "Si4703",
        "placeholder_5298": "SiC45x",
        "placeholder_5299": "SiC45xDriver",
        "placeholder_5300": "SiderealObjects",
        "placeholder_5301": "SiderealPlanets",
        "placeholder_5302": "SigmaDSP",
        "placeholder_5303": "SignalAcquisition",
        "placeholder_5304": "SignalControl",
        "placeholder_5305": "Signature",
        "placeholder_5306": "SiguesAhi",
        "placeholder_5307": "Silvervest OLED-0010 SPI",
        "placeholder_5308": "Sim Racing Library",
        "placeholder_5309": "Sim800L Library",
        "placeholder_5310": "Sim800L Library Revised",
        "placeholder_5311": "Simple FOC",
        "placeholder_5312": "Simple LED Matrix",
        "placeholder_5313": "Simple Repository IO",
        "placeholder_5314": "Simple Web Serial",
        "placeholder_5315": "Simple-Hydroponics-Arduino",
        "placeholder_5316": "Simple-SolarTracker-Arduino",
        "placeholder_5317": "Simple5641AS",
        "placeholder_5318": "SimpleBME280",
        "placeholder_5319": "SimpleBox",
        "placeholder_5320": "SimpleCLI",
        "placeholder_5321": "SimpleCollections",
        "placeholder_5322": "SimpleComponents",
        "placeholder_5323": "SimpleControl",
        "placeholder_5324": "SimpleDCMotor",
        "placeholder_5325": "SimpleDHT",
        "placeholder_5326": "SimpleEncoder",
        "placeholder_5327": "SimpleEspNowConnection",
        "placeholder_5328": "SimpleExpressions",
        "placeholder_5329": "SimpleFOCDrivers",
        "placeholder_5330": "SimpleFSM",
        "placeholder_5331": "SimpleFTPServer",
        "placeholder_5332": "SimpleFilter",
        "placeholder_5333": "SimpleFusion",
        "placeholder_5334": "SimpleHOTP",
        "placeholder_5335": "SimpleIMU",
        "placeholder_5336": "SimpleIOT",
        "placeholder_5337": "SimpleJ1939",
        "placeholder_5338": "SimpleKalmanFilter",
        "placeholder_5339": "SimpleKeypad",
        "placeholder_5340": "SimpleLed",
        "placeholder_5341": "SimpleLogger",
        "placeholder_5342": "SimpleMelt",
        "placeholder_5343": "SimpleMeteoCalc",
        "placeholder_5344": "SimpleMotionV2-Arduino",
        "placeholder_5345": "SimplePacketComs",
        "placeholder_5346": "SimplePortal",
        "placeholder_5347": "SimpleProperties",
        "placeholder_5348": "SimpleRelay",
        "placeholder_5349": "SimpleRotary",
        "placeholder_5350": "SimpleSerialProtocol",
        "placeholder_5351": "SimpleSerialShell",
        "placeholder_5352": "SimpleShell",
        "placeholder_5353": "SimpleShell Enhanced",
        "placeholder_5354": "SimpleShiftRegisterController",
        "placeholder_5355": "SimpleStack",
        "placeholder_5356": "SimpleStepper",
        "placeholder_5357": "SimpleSyslog",
        "placeholder_5358": "SimpleTaskManager",
        "placeholder_5359": "SimpleTicker",
        "placeholder_5360": "SimpleTime",
        "placeholder_5361": "SimpleTimeout",
        "placeholder_5362": "SimpleTimer",
        "placeholder_5363": "SimpleTiming",
        "placeholder_5364": "SimpleUDPController",
        "placeholder_5365": "SimpleUltrasonic",
        "placeholder_5366": "SimpleVector",
        "placeholder_5367": "SimpleWiFiClient",
        "placeholder_5368": "Simple_HC-SR04_Control",
        "placeholder_5369": "Simple_HCSR04",
        "placeholder_5370": "Simpletimer",
        "placeholder_5371": "SimplifiedTimer",
        "placeholder_5372": "SimplyAtomic",
        "placeholder_5373": "Sindormir SevenSegments",
        "placeholder_5374": "Single LED Library",
        "placeholder_5375": "SingleEMAFilterLib",
        "placeholder_5376": "SingleSevenSegment",
        "placeholder_5377": "SingleWireSerial",
        "placeholder_5378": "SinricPro",
        "placeholder_5379": "SinricPro_Generic",
        "placeholder_5380": "SinricPro_Renesas",
        "placeholder_5381": "SinricTeleport",
        "placeholder_5382": "Sitron Labs OPT3001 Ambient Light Sensor Arduino Library",
        "placeholder_5383": "Sitron Labs SH1106 Arduino Library",
        "placeholder_5384": "Sitron Labs ST75256 Arduino Library",
        "placeholder_5385": "Sitron Labs TIC Arduino Library",
        "placeholder_5386": "Sitron Labs WK2132 Arduino Library",
        "placeholder_5387": "SixAxisRing",
        "placeholder_5388": "Sixfab_CellularIoT",
        "placeholder_5389": "Sixfab_NBIoT",
        "placeholder_5390": "SketchBinder",
        "placeholder_5391": "SkyMap",
        "placeholder_5392": "SlackAPI",
        "placeholder_5393": "Sleep_n0m1",
        "placeholder_5394": "Sleepy Pi 2",
        "placeholder_5395": "SlimLoRa",
        "placeholder_5396": "SlipMassage",
        "placeholder_5397": "SlowMotionServo",
        "placeholder_5398": "Small e-paper Shield V2",
        "placeholder_5399": "SmallProjects",
        "placeholder_5400": "SmallRTC",
        "placeholder_5401": "SmallSetup",
        "placeholder_5402": "Smart Motor Driver - SAMI",
        "placeholder_5403": "SmartButton Library",
        "placeholder_5404": "SmartCard",
        "placeholder_5405": "SmartCardReader",
        "placeholder_5406": "SmartDial",
        "placeholder_5407": "SmartEverything CC2541",
        "placeholder_5408": "SmartEverything HTS221",
        "placeholder_5409": "SmartEverything LPS25H",
        "placeholder_5410": "SmartEverything LSM6DS3",
        "placeholder_5411": "SmartEverything LSM9DS1",
        "placeholder_5412": "SmartEverything Lion RN2483",
        "placeholder_5413": "SmartEverything NFC NT3H1101",
        "placeholder_5414": "SmartEverything SE868-AS",
        "placeholder_5415": "SmartEverything SIGFOX LE51-868",
        "placeholder_5416": "SmartEverything VL6180X",
        "placeholder_5417": "SmartLadder",
        "placeholder_5418": "SmartMatrix",
        "placeholder_5419": "SmartMatrix GFX",
        "placeholder_5420": "SmartPin",
        "placeholder_5421": "SmartRC-CC1101-Driver-Lib",
        "placeholder_5422": "Smart_Duty_Cycling",
        "placeholder_5423": "Smartcar shield",
        "placeholder_5424": "Smooth",
        "placeholder_5425": "SmoothADC",
        "placeholder_5426": "SmoothLed",
        "placeholder_5427": "SmoothProgress",
        "placeholder_5428": "SmoothThermistor",
        "placeholder_5429": "SmoothTouch",
        "placeholder_5430": "Smoothed",
        "placeholder_5431": "SnailwalkPromptpay",
        "placeholder_5432": "Snake",
        "placeholder_5433": "SnappyProto",
        "placeholder_5434": "SnappyXO-PreciseMovement-library",
        "placeholder_5435": "Snowduino",
        "placeholder_5436": "SoapESP32",
        "placeholder_5437": "SocketIoClient",
        "placeholder_5438": "Sodaq_BMP085",
        "placeholder_5439": "Sodaq_DS3231",
        "placeholder_5440": "Sodaq_HTS221",
        "placeholder_5441": "Sodaq_LIS3DE",
        "placeholder_5442": "Sodaq_LPS22HB",
        "placeholder_5443": "Sodaq_LSM303AGR",
        "placeholder_5444": "Sodaq_N2X",
        "placeholder_5445": "Sodaq_PcInt",
        "placeholder_5446": "Sodaq_R4X",
        "placeholder_5447": "Sodaq_R4X_MQTT",
        "placeholder_5448": "Sodaq_RN2483",
        "placeholder_5449": "Sodaq_SHT2x",
        "placeholder_5450": "Sodaq_UBlox_GPS",
        "placeholder_5451": "Sodaq_dataflash",
        "placeholder_5452": "Sodaq_nbIOT",
        "placeholder_5453": "Sodaq_wdt",
        "placeholder_5454": "SoftFilters",
        "placeholder_5455": "SoftI2C",
        "placeholder_5456": "SoftI2CMaster",
        "placeholder_5457": "SoftModem",
        "placeholder_5458": "SoftPWM",
        "placeholder_5459": "SoftPathElectronics",
        "placeholder_5460": "SoftSPIB",
        "placeholder_5461": "SoftServo",
        "placeholder_5462": "SoftTimer",
        "placeholder_5463": "SoftTimers",
        "placeholder_5464": "SoftWire",
        "placeholder_5465": "SoftwareReset",
        "placeholder_5466": "SoftwareSerialTX",
        "placeholder_5467": "SoftwareTimer",
        "placeholder_5468": "SoftwareWire",
        "placeholder_5469": "Soict_IoT_Labs",
        "placeholder_5470": "SoilHygrometer",
        "placeholder_5471": "SoilSensor",
        "placeholder_5472": "SolarCalculator",
        "placeholder_5473": "SolarCharger",
        "placeholder_5474": "Soldered ADS1015 and ADS1115 EasyC Library",
        "placeholder_5475": "Soldered AS3935 Lightning sensor library",
        "placeholder_5476": "Soldered BME280 and BME680 EasyC Library",
        "placeholder_5477": "Soldered BMP280 Arduino Library",
        "placeholder_5478": "Soldered BQ27441-G1 Arduino Library",
        "placeholder_5479": "Soldered CAN Bus Breakout Arduino Library",
        "placeholder_5480": "Soldered Fingerprint Sensor",
        "placeholder_5481": "Soldered Hall Effect Arduino Library",
        "placeholder_5482": "Soldered INA219 Board Arduino Library",
        "placeholder_5483": "Soldered LCD",
        "placeholder_5484": "Soldered LSM9DS1TR Arduino Library",
        "placeholder_5485": "Soldered LTR-507 Arduino Library",
        "placeholder_5486": "Soldered MCP23017 Arduino Library",
        "placeholder_5487": "Soldered MCP4018 Arduino Library",
        "placeholder_5488": "Soldered MCP47A1 DAC library",
        "placeholder_5489": "Soldered MQ-X Gas Sensor Arduino Library",
        "placeholder_5490": "Soldered OLED Display Arduino Library",
        "placeholder_5491": "Soldered Obstacle Sensor Arduino Library",
        "placeholder_5492": "Soldered PCF85063A RTC Arduino Library",
        "placeholder_5493": "Soldered PMS7003 Arduino Library",
        "placeholder_5494": "Soldered SI114X Light Sensor Arduino Library",
        "placeholder_5495": "Soldered SIM7020 NB-IoT Library",
        "placeholder_5496": "Soldered SIM800L Arduino Library",
        "placeholder_5497": "Soldered TCA9548A Multiplexer Arduino Library",
        "placeholder_5498": "Soldered Ultrasonic Distance Sensor Arduino library",
        "placeholder_5499": "Soldered WS2812 Arduino Library",
        "placeholder_5500": "Soldered nRF24 Arduino Library",
        "placeholder_5501": "Soldering Machine",
        "placeholder_5502": "SomeSerial",
        "placeholder_5503": "Somfy_RTS",
        "placeholder_5504": "Somfy_Remote_Lib",
        "placeholder_5505": "SonarI2C",
        "placeholder_5506": "Sony9PinRemote",
        "placeholder_5507": "SoracomArcESP32",
        "placeholder_5508": "SoundPlayer",
        "placeholder_5509": "Soundex",
        "placeholder_5510": "SpaceTrek EasyStarterKit",
        "placeholder_5511": "SpaceTrek ExoNaut",
        "placeholder_5512": "SpaceTrek_ClassBot2",
        "placeholder_5513": "SpacebrewYun",
        "placeholder_5514": "Spacecat",
        "placeholder_5515": "SparkFun 6DoF ISM330DHCX",
        "placeholder_5516": "SparkFun 6DoF LSM6DSV16X",
        "placeholder_5517": "SparkFun 9DoF IMU Breakout - ICM 20948 - Arduino Library",
        "placeholder_5518": "SparkFun ACS37800 Power Monitor Arduino Library",
        "placeholder_5519": "SparkFun AD5330",
        "placeholder_5520": "SparkFun ADIN1110 Arduino Library",
        "placeholder_5521": "SparkFun ADS1015 Arduino Library",
        "placeholder_5522": "SparkFun ADS1219 Arduino Library",
        "placeholder_5523": "SparkFun ADS122C04 ADC Arduino Library",
        "placeholder_5524": "SparkFun ADXL313 Arduino Library",
        "SparkFun_ADXL345.h": "SparkFun ADXL345 Arduino Library",
        "placeholder_5526": "SparkFun AK9750 Human Presence Sensor Library",
        "placeholder_5527": "SparkFun AK975X Human Presence Sensor Library",
        "placeholder_5528": "SparkFun APDS-9301 Lux Sensor",
        "placeholder_5529": "SparkFun APDS9960 RGB and Gesture Sensor",
        "placeholder_5530": "SparkFun ARGOS ARTIC R2 Arduino Library",
        "placeholder_5531": "SparkFun AS3935 Lightning Detector Arduino Library",
        "placeholder_5532": "SparkFun AS6212 Qwiic Arduino Library",
        "placeholder_5533": "SparkFun AS726X",
        "placeholder_5534": "SparkFun AS7331 Arduino Library",
        "placeholder_5535": "SparkFun ATECCX08a Arduino Library",
        "placeholder_5536": "SparkFun ATSHA204 Library",
        "placeholder_5537": "SparkFun AVR ISP Programming Library",
        "placeholder_5538": "SparkFun Ambient Light Sensor Arduino Library",
        "placeholder_5539": "SparkFun Angular Displacement Sensor Arduino Library",
        "placeholder_5540": "SparkFun BH1749NUC Arduino Library",
        "placeholder_5541": "SparkFun BMA400 Arduino Library",
        "placeholder_5542": "SparkFun BME280",
        "placeholder_5543": "SparkFun BMI270 Arduino Library",
        "placeholder_5544": "SparkFun BMP384 Arduino Library",
        "placeholder_5545": "SparkFun BMP581 Arduino Library",
        "placeholder_5546": "SparkFun BNO080 Cortex Based IMU",
        "placeholder_5547": "SparkFun BNO08x Cortex Based IMU",
        "placeholder_5548": "SparkFun BQ27441 LiPo Fuel Gauge Arduino Library",
        "placeholder_5549": "SparkFun BQ40Z50 Battery Manager Arduino Library",
        "placeholder_5550": "SparkFun Bar Graph Library",
        "placeholder_5551": "SparkFun Bio Sensor Hub Library",
        "placeholder_5552": "SparkFun CAP1203 Arduino Library",
        "placeholder_5553": "SparkFun CCS811 Arduino Library",
        "placeholder_5554": "SparkFun Clock 5P49V60 Arduino Library",
        "placeholder_5555": "SparkFun Color LCD Shield",
        "placeholder_5556": "SparkFun Color Sensor OPT4048",
        "placeholder_5557": "SparkFun DE2120 2D Barcode Reader",
        "placeholder_5558": "SparkFun DMX Shield Library",
        "placeholder_5559": "SparkFun Extensible Message Parser",
        "placeholder_5560": "SparkFun External EEPROM Arduino Library",
        "placeholder_5561": "SparkFun Flexible Grayscale OLED Breakout",
        "placeholder_5562": "SparkFun Flying Jalapeno 2 Arduino Library",
        "placeholder_5563": "SparkFun Flying Jalapeno Arduino Library",
        "placeholder_5564": "SparkFun Garmin LIDAR-Lite v4 Arduino Library",
        "placeholder_5565": "SparkFun Graphic LCD Serial Backpack",
        "placeholder_5566": "SparkFun GridEYE AMG88 Library",
        "placeholder_5567": "SparkFun HM1X Bluetooth Arduino Library",
        "placeholder_5568": "SparkFun HTU21D Humidity and Temperature Sensor Breakout",
        "placeholder_5569": "SparkFun Haptic Motor Driver",
        "placeholder_5570": "SparkFun High Precision Temperature Sensor TMP117 Qwiic",
        "placeholder_5571": "SparkFun Himax HM01B0 Camera",
        "placeholder_5572": "SparkFun HyperDisplay",
        "placeholder_5573": "SparkFun HyperDisplay 4DLCD-320240",
        "placeholder_5574": "SparkFun HyperDisplay ILI9163C",
        "placeholder_5575": "SparkFun HyperDisplay ILI9341",
        "placeholder_5576": "SparkFun HyperDisplay KWH018ST01",
        "placeholder_5577": "SparkFun HyperDisplay SSD1309",
        "placeholder_5578": "SparkFun HyperDisplay Transparent Graphical OLED",
        "placeholder_5579": "SparkFun I2C GPS Reading and Control",
        "placeholder_5580": "SparkFun I2C Mux Arduino Library",
        "placeholder_5581": "SparkFun IM19 IMU Arduino Library",
        "placeholder_5582": "SparkFun ISL29125 Breakout",
        "placeholder_5583": "SparkFun Indoor Air Quality Sensor - ENS160",
        "placeholder_5584": "SparkFun KX13X Arduino Library",
        "placeholder_5585": "SparkFun LIS2DH12 Arduino Library",
        "placeholder_5586": "SparkFun LIS3DH Arduino Library",
        "placeholder_5587": "SparkFun LP55231 Breakout",
        "placeholder_5588": "SparkFun LPS25HB Pressure Sensor Library",
        "placeholder_5589": "SparkFun LPS28DFW Arduino Library",
        "placeholder_5590": "SparkFun LSM303C 6 DOF IMU Breakout",
        "placeholder_5591": "SparkFun LSM6DS3 Breakout",
        "placeholder_5592": "SparkFun LSM9DS0 Breakout",
        "placeholder_5593": "SparkFun LSM9DS1 IMU",
        "placeholder_5594": "SparkFun LTE Shield Arduino Library",
        "placeholder_5595": "SparkFun Line Follower Array",
        "placeholder_5596": "SparkFun MAX1704x Fuel Gauge Arduino Library",
        "placeholder_5597": "SparkFun MAX3010x Pulse and Proximity Sensor Library",
        "placeholder_5598": "SparkFun MAX31855K Thermocouple Digitizer",
        "placeholder_5599": "SparkFun MCP9600 Thermocouple Library",
        "placeholder_5600": "SparkFun MG2639 CellShield",
        "placeholder_5601": "SparkFun MLX90632 Noncontact Infrared Temperature Sensor",
        "placeholder_5602": "SparkFun MMA8452Q Accelerometer",
        "placeholder_5603": "SparkFun MMC5983MA Magnetometer Arduino Library",
        "placeholder_5604": "SparkFun MPL3115A2 Altitude and Pressure Sensor Breakout",
        "placeholder_5605": "SparkFun MPU-9250 9 DOF IMU Breakout",
        "placeholder_5606": "SparkFun MS5637 Barometric Pressure Library",
        "placeholder_5607": "SparkFun MS5803-14BA Pressure Sensor",
        "placeholder_5608": "SparkFun MetaWatch",
        "placeholder_5609": "SparkFun Micro OLED Breakout",
        "placeholder_5610": "SparkFun MicroMod Button",
        "placeholder_5611": "SparkFun MicroPressure Library",
        "placeholder_5612": "SparkFun MicroView",
        "placeholder_5613": "SparkFun MiniGen",
        "placeholder_5614": "SparkFun MiniMoto",
        "placeholder_5615": "SparkFun OWire Arduino Library",
        "placeholder_5616": "SparkFun PCA9536 Arduino Library",
        "placeholder_5617": "SparkFun PCA9846 Mux Arduino Library",
        "placeholder_5618": "SparkFun PHT MS8607 Arduino Library",
        "placeholder_5619": "SparkFun Particle Sensor Panasonic SN-GCJA5",
        "placeholder_5620": "SparkFun ProDriver TC78G670FTG Arduino Library",
        "placeholder_5621": "SparkFun Quadstepper Motor Driver",
        "placeholder_5622": "SparkFun Qwiic 6Dof - LSM6DS0",
        "placeholder_5623": "SparkFun Qwiic AS7341L 10-Channel Spectral Sensor",
        "placeholder_5624": "SparkFun Qwiic Alphanumeric Display Arduino Library",
        "placeholder_5625": "SparkFun Qwiic Button and Qwiic Switch Library",
        "placeholder_5626": "SparkFun Qwiic Buzzer Library",
        "placeholder_5627": "SparkFun Qwiic Digital Capacitor Arduino Library",
        "placeholder_5628": "SparkFun Qwiic Fan Arduino Library",
        "placeholder_5629": "SparkFun Qwiic GPIO TCA9534 Arduino Library",
        "placeholder_5630": "SparkFun Qwiic Haptic Driver DA7280 Library",
        "placeholder_5631": "SparkFun Qwiic Humidity AHT20",
        "placeholder_5632": "SparkFun Qwiic IR Thermometer MLX90614 Arduino Library",
        "placeholder_5633": "SparkFun Qwiic Joystick Arduino Library",
        "placeholder_5634": "SparkFun Qwiic Keypad Arduino Library",
        "placeholder_5635": "SparkFun Qwiic LED Stick Library",
        "placeholder_5636": "SparkFun Qwiic MP3 Trigger Arduino Library",
        "placeholder_5637": "SparkFun Qwiic OLED Arduino Library",
        "placeholder_5638": "SparkFun Qwiic OTOS Arduino Library",
        "placeholder_5639": "SparkFun Qwiic OpenLog",
        "placeholder_5640": "SparkFun Qwiic PIR Library",
        "placeholder_5641": "SparkFun Qwiic Power Switch Arduino Library",
        "placeholder_5642": "SparkFun Qwiic RFID Arduino Library",
        "placeholder_5643": "SparkFun Qwiic RTC RV1805 Arduino Library",
        "placeholder_5644": "SparkFun Qwiic RTC RV8803 Arduino Library",
        "placeholder_5645": "SparkFun Qwiic Relay Arduino Library",
        "placeholder_5646": "SparkFun Qwiic Scale NAU7802 Arduino Library",
        "placeholder_5647": "SparkFun Qwiic Step Arduino Library",
        "placeholder_5648": "SparkFun Qwiic TMF-8801 Time-of-flight Library",
        "placeholder_5649": "SparkFun Qwiic TMF882X Library",
        "placeholder_5650": "SparkFun Qwiic Twist Arduino Library",
        "placeholder_5651": "SparkFun Qwiic Ultrasonic Arduino Library",
        "placeholder_5652": "SparkFun Qwiic Universal Auto-Detect",
        "placeholder_5653": "SparkFun QwiicNES Arduino Library",
        "placeholder_5654": "SparkFun QwiicRF",
        "placeholder_5655": "SparkFun RFD77402 Distance Sensor - VCSEL Time of Flight",
        "placeholder_5656": "SparkFun RGB OLED 64x64 Library",
        "placeholder_5657": "SparkFun RHT03 Arduino Library",
        "placeholder_5658": "SparkFun RedBot Library",
        "placeholder_5659": "SparkFun SCD30 Arduino Library",
        "placeholder_5660": "SparkFun SCD4x Arduino Library",
        "placeholder_5661": "SparkFun SDP3x Arduino Library",
        "placeholder_5662": "SparkFun SGP30 Arduino Library",
        "placeholder_5663": "SparkFun SGP4 Arduino Library",
        "placeholder_5664": "SparkFun SGP40 Arduino Library",
        "placeholder_5665": "SparkFun SHTC3 Humidity and Temperature Sensor Library",
        "placeholder_5666": "SparkFun SPI SerialFlash Arduino Library",
        "placeholder_5667": "SparkFun ST25DV64KC Arduino Library",
        "placeholder_5668": "SparkFun STC3x Arduino Library",
        "placeholder_5669": "SparkFun STHS34PF80 Arduino Library",
        "placeholder_5670": "SparkFun STUSB4500",
        "placeholder_5671": "SparkFun SerLCD Arduino Library",
        "placeholder_5672": "SparkFun Serial Fingerprint Scanners AS-108M and AD-013",
        "placeholder_5673": "SparkFun Si7021 Humidity and Temperature Sensor",
        "placeholder_5674": "SparkFun Simultaneous RFID Tag Reader Library",
        "placeholder_5675": "SparkFun Spectral Triad AS7265X",
        "placeholder_5676": "SparkFun Swarm Satellite Arduino Library",
        "placeholder_5677": "SparkFun TLC5940",
        "placeholder_5678": "SparkFun TMAG5273 Arduino Library",
        "placeholder_5679": "SparkFun TMP102 Breakout",
        "placeholder_5680": "SparkFun TPA2016D2 Arduino Library",
        "placeholder_5681": "SparkFun TSL2561",
        "placeholder_5682": "SparkFun Temperature Sensor - STTS22H",
        "placeholder_5683": "SparkFun Toolkit",
        "placeholder_5684": "SparkFun TouchInput Arduino Library",
        "placeholder_5685": "SparkFun TouchInput Driver FT5xx6",
        "placeholder_5686": "SparkFun Tsunami Super WAV Trigger Qwiic",
        "placeholder_5687": "SparkFun UM980 Triband RTK GNSS Arduino Library",
        "placeholder_5688": "SparkFun USB Hub Qwiic USB251x",
        "placeholder_5689": "SparkFun VCNL4040 Proximity Sensor Library",
        "placeholder_5690": "SparkFun VEML6075 Arduino Library",
        "placeholder_5691": "SparkFun VEML7700 Arduino Library",
        "placeholder_5692": "SparkFun VKey Arduino Library",
        "placeholder_5693": "SparkFun VL53L1X 4m Laser Distance Sensor",
        "placeholder_5694": "SparkFun VL53L5CX Arduino Library",
        "placeholder_5695": "SparkFun VL6180 Sensor",
        "placeholder_5696": "SparkFun WM8960 Arduino Library",
        "placeholder_5697": "SparkFun WT2003S MP3 Decoder Library",
        "placeholder_5698": "SparkFun Weather Meter Kit Arduino Library",
        "placeholder_5699": "SparkFun WiseChip HUD",
        "placeholder_5700": "SparkFun XM125 Arduino Library",
        "placeholder_5701": "SparkFun ZX Distance and Gesture Sensor",
        "placeholder_5702": "SparkFun ePaper Arduino Library",
        "placeholder_5703": "SparkFun smol Power Board Arduino Library",
        "placeholder_5704": "SparkFun u-blox Arduino Library",
        "placeholder_5705": "SparkFun u-blox Cellular Arduino Library",
        "placeholder_5706": "SparkFun u-blox GNSS Arduino Library",
        "placeholder_5707": "SparkFun u-blox GNSS v3",
        "placeholder_5708": "SparkFun u-blox PointPerfect Library",
        "placeholder_5709": "SparkFun u-blox SARA-R5 Arduino Library",
        "placeholder_5710": "SparkFun_FS3000_Arduino_Library",
        "placeholder_5711": "SparkFun_WebServer_ESP32_W5500",
        "placeholder_5712": "Sparkfun T5403 Barometric Sensor Library",
        "placeholder_5713": "Sparkpad",
        "placeholder_5714": "SparseArray",
        "placeholder_5715": "SparseMatrix",
        "placeholder_5716": "Sparthan Module",
        "placeholder_5717": "Sparthan Myo",
        "placeholder_5718": "Sparthan gForce",
        "placeholder_5719": "SpeedControl",
        "placeholder_5720": "SpeedMeasurer",
        "placeholder_5721": "Speeduino",
        "placeholder_5722": "SpeeduinoGL",
        "placeholder_5723": "SpeedyStepper",
        "placeholder_5724": "SpheroRVR",
        "placeholder_5725": "SpinWearables",
        "placeholder_5726": "Splash",
        "placeholder_5727": "SplashScreen",
        "placeholder_5728": "SpotifyEsp32",
        "placeholder_5729": "SpresenseNeoPixel",
        "placeholder_5730": "SpritzCipher",
        "placeholder_5731": "Sqlite Micro Logger",
        "placeholder_5732": "Sqlite3 for ESP8266",
        "placeholder_5733": "Sqlite3Esp32",
        "placeholder_5734": "Stack",
        "placeholder_5735": "StackString",
        "placeholder_5736": "StackmatTimer",
        "placeholder_5737": "Stamp",
        "placeholder_5738": "StarterRemote",
        "placeholder_5739": "StateMachine",
        "placeholder_5740": "StateMachineLib",
        "placeholder_5741": "StateSpaceControl",
        "placeholder_5742": "StaticSerialCommands",
        "placeholder_5743": "Statistic",
        "placeholder_5744": "Statistical",
        "placeholder_5745": "Stator",
        "placeholder_5746": "StatsD",
        "placeholder_5747": "SteerBot_TB6612",
        "placeholder_5748": "StensTimer",
        "placeholder_5749": "StepMotor4windings",
        "placeholder_5750": "Step_CYC10_I2C",
        "placeholder_5751": "Step_CYC10_Seven_Seg_Display",
        "placeholder_5752": "Stepper",
        "placeholder_5753": "Stepper Async 5",
        "placeholder_5754": "StepperControl",
        "placeholder_5755": "StepperDriver",
        "placeholder_5756": "StepperMotor",
        "placeholder_5757": "Stepper_28BYJ_48",
        "placeholder_5758": "StereoSID",
        "placeholder_5759": "StevesAwesomeButton",
        "placeholder_5760": "StivSeg",
        "placeholder_5761": "Stone_serial",
        "placeholder_5762": "StopLoop",
        "placeholder_5763": "StopWatch_RT",
        "placeholder_5764": "StopwatchLib",
        "placeholder_5765": "StoryBoardLib",
        "placeholder_5766": "Strawbees Quirkbot",
        "placeholder_5767": "StreamAverage",
        "placeholder_5768": "StreamDebugger",
        "placeholder_5769": "StreamDeviceAT",
        "placeholder_5770": "StreamIO",
        "placeholder_5771": "StreamLib",
        "placeholder_5772": "StreamLog",
        "placeholder_5773": "StreamUtilities",
        "placeholder_5774": "StreamUtils",
        "placeholder_5775": "Streaming",
        "placeholder_5776": "StreamlabsArduinoAlerts",
        "placeholder_5777": "StringAction",
        "placeholder_5778": "StringLib",
        "placeholder_5779": "StringSplitter",
        "placeholder_5780": "StringUtils",
        "placeholder_5781": "Stringcalculater",
        "placeholder_5782": "StripDisplay",
        "placeholder_5783": "Strober",
        "placeholder_5784": "Student",
        "placeholder_5785": "Subpixie",
        "placeholder_5786": "SunFounder AI Camera",
        "placeholder_5787": "SunFounderPowerControl",
        "placeholder_5788": "SunPosition",
        "placeholder_5789": "SunRise",
        "placeholder_5790": "SuperButton",
        "placeholder_5791": "SuperTimers",
        "placeholder_5792": "SuplaDevice",
        "placeholder_5793": "SupmeaDO7016",
        "placeholder_5794": "SvgParser",
        "placeholder_5795": "SwarmTile",
        "placeholder_5796": "SwissHandmade MiniPirate",
        "placeholder_5797": "Switch",
        "placeholder_5798": "Switch2_lib",
        "placeholder_5799": "SwitchLib",
        "placeholder_5800": "Switch_lib",
        "placeholder_5801": "Synapse",
        "placeholder_5802": "SyncGenie",
        "placeholder_5803": "SyncWaveformsLib",
        "placeholder_5804": "Syncano Arduino Library",
        "placeholder_5805": "TA6932",
        "placeholder_5806": "TAMC_FT62X6",
        "placeholder_5807": "TAMC_GT911",
        "placeholder_5808": "TB67H450-arduino-library",
        "placeholder_5809": "TB9051FTGMotorCarrier",
        "placeholder_5810": "TBPubSubClient",
        "placeholder_5811": "TB_TFT_eSPI",
        "placeholder_5812": "TC78B009FTG_asukiaaa",
        "placeholder_5813": "TCA6416A",
        "placeholder_5814": "TCA9534",
        "placeholder_5815": "TCA9534-GPIO",
        "placeholder_5816": "TCA9548",
        "placeholder_5817": "TCA9548A",
        "placeholder_5818": "TCA9555",
        "placeholder_5819": "TCM2lib",
        "placeholder_5820": "TCP over Serial",
        "placeholder_5821": "TCS230_ESP32",
        "placeholder_5822": "TCS3200-Sensor",
        "placeholder_5823": "TCS34725",
        "placeholder_5824": "TCS34725 async",
        "placeholder_5825": "TCS34725AutoGain",
        "placeholder_5826": "TCXWriter",
        "placeholder_5827": "TCone",
        "placeholder_5828": "TE SM9000-series",
        "placeholder_5829": "TEE UC20 Shield",
        "placeholder_5830": "TFA 433 Receiver",
        "placeholder_5831": "TFA 433 Receiver for Dostmann 30.3208.02",
        "placeholder_5832": "TFL-Status",
        "TFLI2C.h": "TFLI2C",
        "placeholder_5834": "TFMPI2C",
        "placeholder_5835": "TFMPlus",
        "placeholder_5836": "TFMini",
        "placeholder_5837": "TFT",
        "placeholder_5838": "TFT Touch Shield V1.0",
        "placeholder_5839": "TFT Touch Shield v2.0",
        "placeholder_5840": "TFTTerminal",
        "placeholder_5841": "TFT_22_ILI9225",
        "placeholder_5842": "TFT_eSPI",
        "placeholder_5843": "TFT_eSPI_ES32Lab",
        "placeholder_5844": "TFT_eSPI_Scroll",
        "placeholder_5845": "TFT_eSPI_Widgets",
        "placeholder_5846": "TFT_eWidget",
        "placeholder_5847": "TFminiArduino",
        "placeholder_5848": "TFminiS",
        "placeholder_5849": "TGP Bouton",
        "placeholder_5850": "TGP Decodeur",
        "placeholder_5851": "TGP Del",
        "placeholder_5852": "TGP Ecran",
        "placeholder_5853": "TGP LCD Keypad",
        "placeholder_5854": "TGP Menu OLED",
        "placeholder_5855": "TGP ProtoTGP",
        "placeholder_5856": "TGP Suiveur",
        "placeholder_5857": "THERMISTOR",
        "placeholder_5858": "THiNX",
        "placeholder_5859": "THiNX32",
        "placeholder_5860": "TI TCA9548A",
        "placeholder_5861": "TIFF_G4",
        "placeholder_5862": "TIL306",
        "placeholder_5863": "TI_SN76489",
        "placeholder_5864": "TJpg_Decoder",
        "placeholder_5865": "TLA2518",
        "placeholder_5866": "TLC5615",
        "placeholder_5867": "TLC5916_Lite",
        "placeholder_5868": "TLC5917",
        "placeholder_5869": "TLC591x",
        "placeholder_5870": "TLC5947",
        "placeholder_5871": "TLE493D",
        "placeholder_5872": "TLE5012B",
        "placeholder_5873": "TLE72X",
        "placeholder_5874": "TLE9012_BMS_IC",
        "placeholder_5875": "TLE94112",
        "placeholder_5876": "TLE9879 BLDC Motor Control Shield",
        "placeholder_5877": "TLI493D",
        "placeholder_5878": "TLI4970",
        "placeholder_5879": "TLI4971-Current-Sensor",
        "placeholder_5880": "TLV493D-A1B6",
        "placeholder_5881": "TLog",
        "placeholder_5882": "TLx4966-Direction-Speed-Sensor",
        "placeholder_5883": "TM1637",
        "placeholder_5884": "TM1637 Driver",
        "placeholder_5885": "TM1637TinyDisplay",
        "placeholder_5886": "TM1637_RT",
        "placeholder_5887": "TM1638",
        "placeholder_5888": "TM1638lite",
        "placeholder_5889": "TM1638plus",
        "placeholder_5890": "TM1650",
        "placeholder_5891": "TM16xx LEDs and Buttons",
        "placeholder_5892": "TMC2130",
        "placeholder_5893": "TMC2130Stepper",
        "placeholder_5894": "TMC2208Stepper",
        "placeholder_5895": "TMC2209",
        "placeholder_5896": "TMC429",
        "placeholder_5897": "TMC5072",
        "placeholder_5898": "TMC7300",
        "placeholder_5899": "TMCStepper",
        "placeholder_5900": "TMD3725",
        "placeholder_5901": "TMP117-Arduino",
        "placeholder_5902": "TMP36",
        "placeholder_5903": "TMP6x",
        "placeholder_5904": "TMRpcm",
        "placeholder_5905": "TN_SwitchState",
        "placeholder_5906": "TOPMAX",
        "placeholder_5907": "TOPMIN",
        "placeholder_5908": "TOTP library",
        "placeholder_5909": "TOTP-RC6236-generator",
        "placeholder_5910": "TQDF_WatchOS",
        "placeholder_5911": "TR064",
        "placeholder_5912": "TS4231 Library",
        "placeholder_5913": "TS8000 Library",
        "placeholder_5914": "TSBridge",
        "placeholder_5915": "TSC2004",
        "placeholder_5916": "TSController",
        "placeholder_5917": "TSD305lib",
        "placeholder_5918": "TSIC",
        "placeholder_5919": "TSL235R",
        "placeholder_5920": "TSL2591MI",
        "placeholder_5921": "TSL260R",
        "placeholder_5922": "TTN_esp32",
        "placeholder_5923": "TTP229",
        "placeholder_5924": "TVout",
        "placeholder_5925": "TWI_GPS",
        "placeholder_5926": "TXOnlySerial",
        "placeholder_5927": "TabahiConsole",
        "placeholder_5928": "Table",
        "placeholder_5929": "Tachometer",
        "placeholder_5930": "TactNecklace",
        "placeholder_5931": "TactileSwitch",
        "placeholder_5932": "Tago ESP32",
        "placeholder_5933": "Talk2",
        "placeholder_5934": "Talkie",
        "placeholder_5935": "TalkingButton",
        "placeholder_5936": "TalkingLED",
        "placeholder_5937": "Talking_Display",
        "placeholder_5938": "TankController",
        "placeholder_5939": "TapCode",
        "placeholder_5940": "TapatioElectronics",
        "placeholder_5941": "Tarmos",
        "placeholder_5942": "Task Scheduler",
        "placeholder_5943": "Task by Makuna",
        "placeholder_5944": "TaskJockey",
        "placeholder_5945": "TaskManager",
        "placeholder_5946": "TaskManagerIO",
        "placeholder_5947": "TaskScheduler",
        "placeholder_5948": "Tasker",
        "placeholder_5949": "Taskfun",
        "placeholder_5950": "Taskrunner",
        "placeholder_5951": "Tasks",
        "placeholder_5952": "TcBUTTON",
        "placeholder_5953": "TcMenuLog",
        "placeholder_5954": "TeXie arduino Client",
        "placeholder_5955": "Technoshield-ui-lib",
        "placeholder_5956": "TeeGrid",
        "placeholder_5957": "TeeRec",
        "placeholder_5958": "Teensy41_AsyncTCP",
        "placeholder_5959": "TeensyAudioFlashLoader",
        "placeholder_5960": "TeensyAudioLaunchCtrl",
        "placeholder_5961": "TeensyAudioSampler",
        "placeholder_5962": "TeensyDMX",
        "placeholder_5963": "TeensyID",
        "placeholder_5964": "TeensySimplePacketComs",
        "placeholder_5965": "TeensyStep",
        "placeholder_5966": "TeensyTimerTool",
        "placeholder_5967": "TeensyUserInterface",
        "placeholder_5968": "TeensyVariablePlayback",
        "placeholder_5969": "TeensyView",
        "placeholder_5970": "Teensy_3X_Multipurpose_Board",
        "placeholder_5971": "Teensy_PWM",
        "placeholder_5972": "Teensy_Slow_PWM",
        "placeholder_5973": "Teensy_TimerInterrupt",
        "placeholder_5974": "Telaire T6700 CO2 Sensor Module Library",
        "placeholder_5975": "TelegramBot",
        "placeholder_5976": "TelegramBotClient",
        "placeholder_5977": "Telegraph",
        "placeholder_5978": "Teleinfo",
        "placeholder_5979": "Telemetrix4Arduino",
        "placeholder_5980": "Telemetrix4Connect2040",
        "placeholder_5981": "Telemetrix4Esp32",
        "placeholder_5982": "Telemetrix4Esp8266",
        "placeholder_5983": "Telemetrix4RPiPicoW",
        "placeholder_5984": "Telemetrix4UnoR4",
        "placeholder_5985": "TelemetryJet",
        "placeholder_5986": "Telit xE910 Series GSM Modem Library",
        "placeholder_5987": "TelnetStream",
        "placeholder_5988": "TelnetStream2",
        "placeholder_5989": "Temboo",
        "placeholder_5990": "TempReader",
        "placeholder_5991": "TempSensors_NXP_Arduino",
        "placeholder_5992": "Temperature",
        "placeholder_5993": "TemperatureZero",
        "placeholder_5994": "TemplateTango",
        "placeholder_5995": "TencentCloudIoTSDK",
        "placeholder_5996": "TensorFlowLite_ESP32",
        "placeholder_5997": "Terminal",
        "placeholder_5998": "TerminalCommander",
        "placeholder_5999": "TeslaCloud",
        "placeholder_6000": "TetrisAnimation",
        "placeholder_6001": "Text2Matrix",
        "placeholder_6002": "Tgui",
        "placeholder_6003": "TheThingsNetwork",
        "placeholder_6004": "TheThingsNode",
        "placeholder_6005": "TheTroll",
        "placeholder_6006": "TheVaporTrail SubPixel",
        "placeholder_6007": "TheengsDecoder",
        "placeholder_6008": "Thermal Printer Library",
        "placeholder_6009": "ThermistorLibrary",
        "placeholder_6010": "ThinSat Program TSLPB Library",
        "placeholder_6011": "ThingESP",
        "placeholder_6012": "ThingPulse XPT2046 Touch",
        "placeholder_6013": "ThingSpeak",
        "placeholder_6014": "ThingSpeak_asukiaaa",
        "placeholder_6015": "ThingerCore32",
        "placeholder_6016": "ThingfaceClient",
        "placeholder_6017": "Thingpings",
        "placeholder_6018": "Thingplus",
        "placeholder_6019": "ThingsBoard",
        "placeholder_6020": "ThingsCloud_ESP_SDK",
        "placeholder_6021": "ThingsIoT",
        "placeholder_6022": "ThingsML",
        "placeholder_6023": "ThingsOfValue SDK for Arduino",
        "placeholder_6024": "Thingworx ESP32",
        "placeholder_6025": "Thread",
        "placeholder_6026": "ThreadedTimer",
        "placeholder_6027": "ThreeD",
        "placeholder_6028": "ThresholdLib",
        "placeholder_6029": "Throttle",
        "placeholder_6030": "Tic",
        "placeholder_6031": "TickTwo",
        "placeholder_6032": "Ticker",
        "placeholder_6033": "TiltSensor",
        "placeholder_6034": "Timber",
        "placeholder_6035": "Time",
        "placeholder_6036": "TimeAlarms",
        "placeholder_6037": "TimeInterrupt",
        "placeholder_6038": "TimeInterval",
        "placeholder_6039": "TimeOut",
        "placeholder_6040": "TimeProfiler",
        "placeholder_6041": "TimeRandom",
        "placeholder_6042": "TimedBlink",
        "placeholder_6043": "TimedPID",
        "placeholder_6044": "TimedState",
        "placeholder_6045": "TimeoutCallback",
        "placeholder_6046": "TimeoutTaskLib",
        "placeholder_6047": "Timer",
        "placeholder_6048": "Timer-CAM",
        "placeholder_6049": "TimerEvent",
        "placeholder_6050": "TimerExtensions",
        "placeholder_6051": "TimerFa",
        "placeholder_6052": "TimerFive",
        "placeholder_6053": "TimerFour",
        "placeholder_6054": "TimerFour32u4",
        "placeholder_6055": "TimerInterrupt",
        "placeholder_6056": "TimerInterrupt_Generic",
        "placeholder_6057": "TimerMs",
        "placeholder_6058": "TimerOne",
        "placeholder_6059": "TimerOne_V2",
        "placeholder_6060": "TimerThree",
        "placeholder_6061": "TimerUtils",
        "placeholder_6062": "Timers",
        "placeholder_6063": "TimersOneForAll",
        "placeholder_6064": "Timezone",
        "placeholder_6065": "Timezone_Generic",
        "placeholder_6066": "TimonelTwiM",
        "placeholder_6067": "TinBus",
        "placeholder_6068": "TindieApi",
        "placeholder_6069": "TinkerController",
        "placeholder_6070": "Tiny Key Value Store",
        "placeholder_6071": "Tiny-I2C-Drivers",
        "placeholder_6072": "Tiny4kOLED",
        "placeholder_6073": "TinyButton",
        "placeholder_6074": "TinyCBOR",
        "placeholder_6075": "TinyCmdTable",
        "placeholder_6076": "TinyConsole",
        "placeholder_6077": "TinyDHT sensor library",
        "placeholder_6078": "TinyDMXSerial",
        "placeholder_6079": "TinyDatabase_Arduino",
        "placeholder_6080": "TinyDebug",
        "placeholder_6081": "TinyDecisionTreeClassifier",
        "placeholder_6082": "TinyFontRenderer",
        "placeholder_6083": "TinyGPS",
        "placeholder_6084": "TinyGPSMinus",
        "placeholder_6085": "TinyGPSPlus",
        "placeholder_6086": "TinyGPSPlus-ESP32",
        "placeholder_6087": "TinyGPSPlusPlus",
        "placeholder_6088": "TinyGSM",
        "placeholder_6089": "TinyGuixhe",
        "placeholder_6090": "TinyIO",
        "placeholder_6091": "TinyKT0803",
        "placeholder_6092": "TinyLiquidCrystal",
        "placeholder_6093": "TinyLiquidCrystal_I2C",
        "placeholder_6094": "TinyLoRa",
        "placeholder_6095": "TinyMPU6050",
        "placeholder_6096": "TinyMatrixMath",
        "placeholder_6097": "TinyMegaI2C",
        "placeholder_6098": "TinyMenu",
        "placeholder_6099": "TinyMqtt",
        "placeholder_6100": "TinyNunchuk",
        "placeholder_6101": "TinyOLED-Fonts",
        "placeholder_6102": "TinyPICO Helper Library",
        "placeholder_6103": "TinyRTCLib",
        "placeholder_6104": "TinyScheduler",
        "placeholder_6105": "TinyScreen",
        "placeholder_6106": "TinySnore",
        "placeholder_6107": "TinyStepper",
        "placeholder_6108": "TinyStepper_28BYJ_48",
        "placeholder_6109": "TinySuite",
        "placeholder_6110": "TinyTemplateEngine",
        "placeholder_6111": "TinyTrainable",
        "placeholder_6112": "TinyUPnP",
        "placeholder_6113": "TinyUSBSimplePacketComs",
        "placeholder_6114": "TinyWireM",
        "placeholder_6115": "TinyXML",
        "placeholder_6116": "Tinyfox",
        "placeholder_6117": "Tlc5940",
        "placeholder_6118": "Toggl API v8 - Arduino Implementation",
        "placeholder_6119": "Toggle",
        "placeholder_6120": "TomIBT2",
        "placeholder_6121": "TomServo",
        "placeholder_6122": "TomStick",
        "placeholder_6123": "Tone",
        "placeholder_6124": "ToneESP32",
        "placeholder_6125": "ToneLibrary",
        "placeholder_6126": "TonePitch",
        "placeholder_6127": "TonePlayer",
        "placeholder_6128": "TongHopThuVien",
        "placeholder_6129": "TongHopThuVienCon1",
        "placeholder_6130": "Tools",
        "placeholder_6131": "Tools.Easy",
        "placeholder_6132": "TopView NBduino Library",
        "placeholder_6133": "Totem Library",
        "placeholder_6134": "Touch Screen Driver",
        "placeholder_6135": "TouchEvent",
        "placeholder_6136": "TouchKeypad",
        "placeholder_6137": "TouchLed",
        "placeholder_6138": "TouchWheel",
        "placeholder_6139": "TouchyTouch",
        "placeholder_6140": "TpdButton",
        "placeholder_6141": "Tr4cker",
        "placeholder_6142": "Transform",
        "placeholder_6143": "TrapeZoid",
        "placeholder_6144": "TriSonica_Mini",
        "placeholder_6145": "TriacDimmer",
        "placeholder_6146": "TriangleSolverLib",
        "placeholder_6147": "TridentTD_EasyFreeRTOS32",
        "placeholder_6148": "TridentTD_Linenotify",
        "placeholder_6149": "TridentTD_SimplePair",
        "placeholder_6150": "TrigDef",
        "placeholder_6151": "Trill",
        "placeholder_6152": "TrimWright",
        "placeholder_6153": "Trinamic_TMC4210",
        "placeholder_6154": "Trioe",
        "placeholder_6155": "TrivialKalmanFilter",
        "placeholder_6156": "Troolean",
        "placeholder_6157": "Troyka-IMU",
        "placeholder_6158": "TroykaAccelerometer",
        "placeholder_6159": "TroykaDHT",
        "placeholder_6160": "TroykaGPS",
        "placeholder_6161": "TroykaI2CHub",
        "placeholder_6162": "TroykaLight",
        "placeholder_6163": "TroykaThermometer",
        "placeholder_6164": "TrueProx",
        "placeholder_6165": "TsicSensor",
        "placeholder_6166": "Tsunami",
        "placeholder_6167": "TsyDMASPI",
        "placeholder_6168": "TunePlayer",
        "placeholder_6169": "TurnoutPulser",
        "placeholder_6170": "Tuya_BLE_MCU_SDK",
        "placeholder_6171": "Tuya_WiFi_MCU_SDK",
        "placeholder_6172": "Tuya_ZIGBEE_MCU_SDK",
        "placeholder_6173": "Tuyav",
        "placeholder_6174": "Tweakly",
        "placeholder_6175": "Tween",
        "placeholder_6176": "TwiBus",
        "placeholder_6177": "TwiLiquidCrystal by Arnakazim",
        "placeholder_6178": "TwitchApi",
        "placeholder_6179": "TwitterApi",
        "placeholder_6180": "Two Way ESP",
        "placeholder_6181": "TwoButtonsInterface",
        "placeholder_6182": "TwoWheelRobot",
        "placeholder_6183": "Tympan_Library",
        "placeholder_6184": "U8g2",
        "placeholder_6185": "U8g2_for_Adafruit_GFX",
        "placeholder_6186": "U8glib",
        "placeholder_6187": "U8glib-HAL",
        "placeholder_6188": "U8xLaserDistance",
        "placeholder_6189": "UARDECS Library",
        "placeholder_6190": "UARDECS_MEGA Library",
        "placeholder_6191": "UC121902-TNARX-A",
        "placeholder_6192": "UC1701",
        "placeholder_6193": "UCR ESP8266",
        "placeholder_6194": "UCloudIoTSDK",
        "placeholder_6195": "UHS2-MIDI",
        "placeholder_6196": "UIPEthernet",
        "placeholder_6197": "UKESF Sixth-Formers",
        "placeholder_6198": "ULWOS2",
        "placeholder_6199": "UMIRobot",
        "placeholder_6200": "UMS3 Helper",
        "placeholder_6201": "UNIT_GLASS",
        "placeholder_6202": "UNOR4WMatrixGFX",
        "placeholder_6203": "UPnP_Generic",
        "placeholder_6204": "URLCode",
        "placeholder_6205": "USB Host Shield Library 2.0",
        "placeholder_6206": "USB-MIDI",
        "placeholder_6207": "USBBlaster",
        "placeholder_6208": "USBControllerLib",
        "placeholder_6209": "USBHID",
        "placeholder_6210": "USBHost",
        "placeholder_6211": "USBMIDI",
        "placeholder_6212": "USBPause",
        "placeholder_6213": "USBPowerDelivery",
        "placeholder_6214": "USBStatus",
        "placeholder_6215": "USIWire",
        "placeholder_6216": "UTF8 Print AdaGfx",
        "placeholder_6217": "UTF8ToGB2312",
        "placeholder_6218": "UTFT_SdRaw",
        "placeholder_6219": "UUID",
        "placeholder_6220": "Ubidots Arduino YUN",
        "placeholder_6221": "Ubidots FONA Library",
        "placeholder_6222": "Ubidots GPRS Library",
        "placeholder_6223": "Ubidots MQTT for ESP8266",
        "placeholder_6224": "UbidotsXLR8",
        "placeholder_6225": "UbxGps",
        "placeholder_6226": "Ucglib",
        "placeholder_6227": "Ufox",
        "placeholder_6228": "UiUiUi",
        "placeholder_6229": "Ulm_Weatherballoon",
        "placeholder_6230": "Ultimate_ESP_MQTT_Ubidots",
        "placeholder_6231": "UltraDistSensor",
        "placeholder_6232": "UltraSonic_Lib",
        "placeholder_6233": "Ultrasonic",
        "placeholder_6234": "UltrasonicHCSR04",
        "placeholder_6235": "UltrasonicSensor",
        "placeholder_6236": "Ultrasonic_hc_sr04",
        "placeholder_6237": "UncleRus",
        "placeholder_6238": "Unified Log",
        "placeholder_6239": "Unishox Progmem Decompressor",
        "placeholder_6240": "Unistep2",
        "placeholder_6241": "Units",
        "placeholder_6242": "Universal Inputs",
        "placeholder_6243": "UniversalTelegramBot",
        "placeholder_6244": "UniversalTimer",
        "placeholder_6245": "UniversalTransmitter",
        "placeholder_6246": "UnixTime",
        "placeholder_6247": "Uno WiFi Developer Edition Serial1",
        "placeholder_6248": "UnoCar",
        "placeholder_6249": "Uno_HUB75_Driver",
        "placeholder_6250": "UnorderedMap",
        "placeholder_6251": "UpbeatLabs MCP39F521",
        "placeholder_6252": "Uptime",
        "placeholder_6253": "Uptime Library",
        "placeholder_6254": "UrlEncode",
        "placeholder_6255": "UselessLib",
        "placeholder_6256": "UserManager",
        "placeholder_6257": "Utilities",
        "placeholder_6258": "Utils",
        "placeholder_6259": "UtilsBoards",
        "placeholder_6260": "VCNL3040 Proximity Sensor Library",
        "placeholder_6261": "VCNL36687",
        "placeholder_6262": "VCNL4010",
        "placeholder_6263": "VEDirect",
        "placeholder_6264": "VEGAIoT_BusIO",
        "placeholder_6265": "VEGA_ArduinoBLE",
        "placeholder_6266": "VEGA_BMI088",
        "placeholder_6267": "VEGA_ChainableLED",
        "placeholder_6268": "VEGA_FirebaseArduino",
        "placeholder_6269": "VEGA_IRremote",
        "placeholder_6270": "VEGA_MAX30100",
        "placeholder_6271": "VEGA_MAX30102",
        "placeholder_6272": "VEGA_MLX90614",
        "placeholder_6273": "VEGA_SH1106",
        "placeholder_6274": "VEGA_ST7735_and_ST7789",
        "placeholder_6275": "VEGA_SoftwareSerial",
        "placeholder_6276": "VEGA_WiFiNINA",
        "placeholder_6277": "VEML6040",
        "placeholder_6278": "VEML6070",
        "placeholder_6279": "VEML6075",
        "placeholder_6280": "VGAX",
        "placeholder_6281": "VGAXUA",
        "placeholder_6282": "VIDI-X_BQ24295",
        "placeholder_6283": "VL53L0X",
        "placeholder_6284": "VL53L0X_mod",
        "placeholder_6285": "VL53L1X",
        "placeholder_6286": "VL53L1X_ULD",
        "placeholder_6287": "VL6180X",
        "placeholder_6288": "VL6180X_WE",
        "placeholder_6289": "VMA11",
        "placeholder_6290": "VNCL4020C-Arduino",
        "placeholder_6291": "VNH3SP30",
        "placeholder_6292": "VRPC",
        "placeholder_6293": "VS1053 for use with SdFat",
        "placeholder_6294": "VSCP",
        "placeholder_6295": "VT100",
        "placeholder_6296": "VanBus",
        "placeholder_6297": "VariableTimedAction",
        "placeholder_6298": "Vcc",
        "placeholder_6299": "Vector",
        "placeholder_6300": "Vector datatype",
        "placeholder_6301": "VectorDisplay",
        "placeholder_6302": "VectorXf",
        "placeholder_6303": "VernierLib",
        "placeholder_6304": "VersatileSwitch",
        "placeholder_6305": "Versatile_RotaryEncoder",
        "placeholder_6306": "VescMotorController",
        "placeholder_6307": "Vibration",
        "placeholder_6308": "VibrationMotor",
        "placeholder_6309": "VidorGraphics",
        "placeholder_6310": "VidorPeripherals",
        "placeholder_6311": "ViewMarq",
        "placeholder_6312": "ViraLink-MQTT-Client",
        "placeholder_6313": "Virtual Joystick for LVGL",
        "placeholder_6314": "VirtualButton",
        "placeholder_6315": "VirtualScreen",
        "placeholder_6316": "VirtualTherm",
        "placeholder_6317": "Virtuino",
        "placeholder_6318": "Virtuino library for STM32 boards",
        "placeholder_6319": "Virtuino library for all ESP8266 and ESP32 boards",
        "placeholder_6320": "VirtuinoCM",
        "placeholder_6321": "Vishay_VCNL4200",
        "placeholder_6322": "VitconCommon",
        "placeholder_6323": "VitconIOT",
        "placeholder_6324": "VitconLink",
        "placeholder_6325": "VitconMQTT",
        "placeholder_6326": "VivicoreSerial",
        "placeholder_6327": "VizIoTMqttClient",
        "placeholder_6328": "VolAnalyzer",
        "placeholder_6329": "Voltage Reference",
        "placeholder_6330": "Voltmeter",
        "placeholder_6331": "Volume",
        "placeholder_6332": "Volume 3",
        "placeholder_6333": "Volume2",
        "placeholder_6334": "VolumeConverter",
        "placeholder_6335": "Vrekrer SCPI parser",
        "placeholder_6336": "Vulintus_ATWINC3400",
        "placeholder_6337": "W3bstreamClient",
        "placeholder_6338": "WBIOExtMini",
        "placeholder_6339": "WD Easy",
        "placeholder_6340": "WEDO 2.0 BLE for ESP32",
        "placeholder_6341": "WIOTerminal_WiFiManager",
        "placeholder_6342": "WMM_Tinier",
        "placeholder_6343": "WMS7202",
        "placeholder_6344": "WPI430-VMA430 GPS",
        "placeholder_6345": "WS2812 Lib for Air001",
        "placeholder_6346": "WS2812FX",
        "placeholder_6347": "WSN_RFM69",
        "placeholder_6348": "WTV020SD16P",
        "placeholder_6349": "WZ Library",
        "placeholder_6350": "WakeOnLan",
        "placeholder_6351": "WarmCat6x14backpack",
        "placeholder_6352": "Wasm3",
        "placeholder_6353": "Watch",
        "placeholder_6354": "WatchDog",
        "placeholder_6355": "Watchdog",
        "placeholder_6356": "Watchy",
        "placeholder_6357": "WaterFlow",
        "placeholder_6358": "WaterMix",
        "placeholder_6359": "Watermeter",
        "placeholder_6360": "Waterproof_Ultrasonic",
        "placeholder_6361": "WaveHC",
        "placeholder_6362": "WaveMix",
        "placeholder_6363": "Waveshare 4 Inch Tft Touchscreen",
        "placeholder_6364": "Waveshare ILI9486",
        "placeholder_6365": "Waveshare_ST7262_LVGL",
        "placeholder_6366": "WearLeveling",
        "placeholder_6367": "WeatherFlowAPI",
        "placeholder_6368": "WeatherMeters",
        "placeholder_6369": "WeatherStationDataRx",
        "placeholder_6370": "Web3JBC",
        "placeholder_6371": "WebConfig",
        "placeholder_6372": "WebConsole",
        "placeholder_6373": "WebMonitor",
        "placeholder_6374": "WebSerial",
        "placeholder_6375": "WebSerialLite",
        "placeholder_6376": "WebServerFileUpload",
        "placeholder_6377": "WebServer_ESP32_ENC",
        "placeholder_6378": "WebServer_ESP32_SC_ENC",
        "placeholder_6379": "WebServer_ESP32_SC_W5500",
        "placeholder_6380": "WebServer_ESP32_SC_W6100",
        "placeholder_6381": "WebServer_ESP32_W5500",
        "placeholder_6382": "WebServer_ESP32_W6100",
        "placeholder_6383": "WebServer_WT32_ETH01",
        "placeholder_6384": "WebSocketStreamClient",
        "placeholder_6385": "WebSockets",
        "placeholder_6386": "WebSockets2_Generic",
        "placeholder_6387": "WebSockets_Generic",
        "placeholder_6388": "WebTerminal",
        "placeholder_6389": "Webbino",
        "placeholder_6390": "WeeklyAlarm",
        "placeholder_6391": "Wemos Matrix Adafruit GFX",
        "placeholder_6392": "Whadda LED bar graph",
        "placeholder_6393": "WhareHauoraWiFiManager",
        "placeholder_6394": "WiFi",
        "placeholder_6395": "WiFi Link",
        "placeholder_6396": "WiFi Picker",
        "placeholder_6397": "WiFi101",
        "placeholder_6398": "WiFi101OTA",
        "placeholder_6399": "WiFi101_Generic",
        "placeholder_6400": "WiFiConnect",
        "placeholder_6401": "WiFiConnect Lite",
        "placeholder_6402": "WiFiConnector",
        "placeholder_6403": "WiFiEsp",
        "placeholder_6404": "WiFiEspAT",
        "placeholder_6405": "WiFiMQTTManager Library",
        "placeholder_6406": "WiFiMan",
        "placeholder_6407": "WiFiManager",
        "placeholder_6408": "WiFiManagerDesign",
        "placeholder_6409": "WiFiManagerTz",
        "placeholder_6410": "WiFiManager_Generic_Lite",
        "placeholder_6411": "WiFiManager_NINA_Lite",
        "placeholder_6412": "WiFiManager_Portenta_H7_Lite",
        "placeholder_6413": "WiFiManager_RP2040W",
        "placeholder_6414": "WiFiManager_RP2040W_Lite",
        "placeholder_6415": "WiFiManager_RTL8720",
        "placeholder_6416": "WiFiMulti_Generic",
        "placeholder_6417": "WiFiNINA",
        "placeholder_6418": "WiFiNINA_Generic",
        "placeholder_6419": "WiFiProvision",
        "placeholder_6420": "WiFiProvisioner",
        "placeholder_6421": "WiFiSpi",
        "placeholder_6422": "WiFiTri",
        "placeholder_6423": "WiFiWebServer",
        "placeholder_6424": "WiFiWebServer_RTL8720",
        "placeholder_6425": "WiFiWire",
        "placeholder_6426": "WiThrottle",
        "placeholder_6427": "WiThrottleProtocol",
        "placeholder_6428": "WifiLocation",
        "placeholder_6429": "WiiChuck",
        "placeholder_6430": "Winbond W25N",
        "placeholder_6431": "Wind Functions",
        "placeholder_6432": "WindSensorHWD_asukiaaa",
        "placeholder_6433": "Windows Virtual Shields for Arduino",
        "placeholder_6434": "WinkelICT ADXL362",
        "placeholder_6435": "WinkelICT Tiny AT Command Parser",
        "placeholder_6436": "WinsonLib",
        "placeholder_6437": "Wio 3G for Arduino",
        "placeholder_6438": "Wio LTE Arduino Library",
        "placeholder_6439": "Wio LTE for Arduino",
        "placeholder_6440": "Wio cell lib for Arduino",
        "placeholder_6441": "WioCellular",
        "placeholder_6442": "WireData",
        "placeholder_6443": "WireGuard-ESP32",
        "placeholder_6444": "WireSusi",
        "placeholder_6445": "WireUpdate",
        "placeholder_6446": "WireUtility Library",
        "placeholder_6447": "WireWrapper",
        "placeholder_6448": "WiredController_asukiaaa",
        "placeholder_6449": "Wireling",
        "placeholder_6450": "WisBlock-API",
        "placeholder_6451": "WisBlock-API-V2",
        "placeholder_6452": "Witsanu",
        "placeholder_6453": "Witty",
        "placeholder_6454": "WizFi250",
        "placeholder_6455": "WizFi310",
        "placeholder_6456": "WizFi360",
        "placeholder_6457": "WolkConnect",
        "placeholder_6458": "Word100 Library",
        "placeholder_6459": "WrapperFreeRTOS",
        "placeholder_6460": "WroobImp",
        "placeholder_6461": "X9C103S",
        "placeholder_6462": "X9C10X",
        "placeholder_6463": "XBee-Arduino library",
        "placeholder_6464": "XBeeATCmds",
        "placeholder_6465": "XBoxControllerHandler",
        "placeholder_6466": "XENSIV 3D Magnetic Sensor TLx493D",
        "placeholder_6467": "XENSIV Digital Pressure Sensor",
        "placeholder_6468": "XENSIV PAS CO2",
        "placeholder_6469": "XGZP6897D",
        "placeholder_6470": "XInput",
        "placeholder_6471": "XLR8ADC",
        "placeholder_6472": "XLR8AddrPack",
        "placeholder_6473": "XLR8BuildTemplate",
        "placeholder_6474": "XLR8Core",
        "placeholder_6475": "XLR8DMem",
        "placeholder_6476": "XLR8DigitalIO",
        "placeholder_6477": "XLR8Float",
        "placeholder_6478": "XLR8HardwareSerial",
        "placeholder_6479": "XLR8Info",
        "placeholder_6480": "XLR8LFSR",
        "placeholder_6481": "XLR8NeoPixel",
        "placeholder_6482": "XLR8PID",
        "placeholder_6483": "XLR8PWM",
        "placeholder_6484": "XLR8Pong",
        "placeholder_6485": "XLR8Quadrature",
        "placeholder_6486": "XLR8RC",
        "placeholder_6487": "XLR8SPI",
        "placeholder_6488": "XLR8Servo",
        "placeholder_6489": "XLR8USB",
        "placeholder_6490": "XLR8Wire",
        "placeholder_6491": "XMC_Servo",
        "placeholder_6492": "XMLWriter",
        "placeholder_6493": "XModem",
        "placeholder_6494": "XPT2046_Bitbang",
        "placeholder_6495": "XPT2046_Bitbang_Slim",
        "placeholder_6496": "XPT2046_Calibrated",
        "placeholder_6497": "XPT2046_Touchscreen",
        "placeholder_6498": "XPT2046_Touchscreen_TT",
        "placeholder_6499": "XP_Button",
        "placeholder_6500": "XPowersLib",
        "placeholder_6501": "XRA1405",
        "placeholder_6502": "XRA1405_Button",
        "placeholder_6503": "XTEA-Cipher",
        "placeholder_6504": "XYZgeomag",
        "placeholder_6505": "XYZrobotServo",
        "placeholder_6506": "Xbox 360 Controller LEDs",
        "placeholder_6507": "XboxControllerNotificationParser",
        "placeholder_6508": "XboxSeriesXControllerESP32_asukiaaa",
        "placeholder_6509": "XboxSeriesXHIDReportBuilder_asukiaaa",
        "placeholder_6510": "Xiao NRF52840 Battery",
        "placeholder_6511": "Xsens_MTi_I2C",
        "placeholder_6512": "Xsens_MTi_SPI",
        "placeholder_6513": "XxHash_arduino",
        "placeholder_6514": "YAAWS",
        "placeholder_6515": "YACL",
        "placeholder_6516": "YAMLDuino",
        "placeholder_6517": "YASM",
        "placeholder_6518": "YK04_Module",
        "placeholder_6519": "YLEsp8266",
        "placeholder_6520": "YX5300 for ESP32",
        "placeholder_6521": "Yaesu FT857D CAT",
        "placeholder_6522": "Yeelight",
        "placeholder_6523": "Yet Another Arduino Debounce Library",
        "placeholder_6524": "Yet Another Arduino PcInt Library",
        "placeholder_6525": "Yet Another Arduino Wiegand Library",
        "placeholder_6526": "YetAnotherButtonLibrary",
        "placeholder_6527": "Yfrobot Fingerprint Identification Sensor Library",
        "placeholder_6528": "Yfrobot I2C Line Follow Sensor Library",
        "placeholder_6529": "Yfrobot Motor Driver IIC1508 Library",
        "placeholder_6530": "Yfrobot Motor Driver Library",
        "placeholder_6531": "Yfrobot VALON-I3 Library",
        "placeholder_6532": "YosemitechModbus",
        "placeholder_6533": "YouMadeIt",
        "placeholder_6534": "YouTube Sight",
        "placeholder_6535": "YouTubeLiveStreamArduino",
        "placeholder_6536": "Youless Arduino Library",
        "placeholder_6537": "YoupiLabESP32_IOT",
        "placeholder_6538": "YoupiLabEsp8266",
        "placeholder_6539": "YoutubeApi",
        "placeholder_6540": "Z80",
        "placeholder_6541": "Z80RetroShield",
        "placeholder_6542": "ZACwire for TSic",
        "placeholder_6543": "ZEEPROM",
        "placeholder_6544": "ZEeprom",
        "placeholder_6545": "ZEncoder",
        "placeholder_6546": "ZMCP23017 Library",
        "placeholder_6547": "ZMPT101B",
        "placeholder_6548": "ZMPT101B-Sensor",
        "placeholder_6549": "ZMotor2 Library",
        "placeholder_6550": "ZMotor3Library",
        "placeholder_6551": "ZOHO-IOT-SDK",
        "placeholder_6552": "ZPCA9685 Library",
        "placeholder_6553": "ZSSC3230 I2C Driver",
        "placeholder_6554": "ZSharpIR Library",
        "placeholder_6555": "Zaber ASCII",
        "placeholder_6556": "Zaber Binary",
        "placeholder_6557": "Zanduino SmoothLED Library 10-bit",
        "placeholder_6558": "Zanduino SmoothLED Library 8-bit",
        "placeholder_6559": "ZcmdMotor Library",
        "placeholder_6560": "Zentser ESP SDK",
        "placeholder_6561": "ZeroRegs",
        "placeholder_6562": "ZeroTC45",
        "placeholder_6563": "ZikoMatrix",
        "placeholder_6564": "Zumo32U4",
        "placeholder_6565": "ZumoAutomation",
        "placeholder_6566": "ZumoShield",
        "placeholder_6567": "ZzzButton",
        "placeholder_6568": "ZzzMovingAvg",
        "placeholder_6569": "aE2",
        "placeholder_6570": "aREST",
        "placeholder_6571": "aREST UI",
        "placeholder_6572": "aTalkArduino",
        "placeholder_6573": "aWOT",
        "placeholder_6574": "absmouse",
        "placeholder_6575": "ad5243",
        "placeholder_6576": "ad7124",
        "placeholder_6577": "adafruit_fram_i2c_mock",
        "placeholder_6578": "adafruit_ina219_mock",
        "placeholder_6579": "advancedSerial",
        "placeholder_6580": "alarm",
        "placeholder_6581": "analogComp",
        "placeholder_6582": "anto-esp8266-arduino",
        "placeholder_6583": "arduFPGA-app-common-arduino",
        "placeholder_6584": "ardubson",
        "placeholder_6585": "arducam_dvp",
        "placeholder_6586": "arduino-NVM",
        "placeholder_6587": "arduino-async-duplex",
        "placeholder_6588": "arduino-async-modem",
        "placeholder_6589": "arduino-display-lcdkeypad",
        "placeholder_6590": "arduino-ess",
        "placeholder_6591": "arduino-fsm",
        "placeholder_6592": "arduino-managed-serial-device",
        "placeholder_6593": "arduino-menusystem",
        "placeholder_6594": "arduino-sht",
        "placeholder_6595": "arduino-timer",
        "placeholder_6596": "arduino-timer-api",
        "placeholder_6597": "arduinoFFT",
        "placeholder_6598": "arduinoVNC",
        "placeholder_6599": "ardukit",
        "placeholder_6600": "ardyno",
        "placeholder_6601": "array-helpers",
        "placeholder_6602": "artemis-cubesat",
        "placeholder_6603": "asip",
        "placeholder_6604": "asip-services",
        "placeholder_6605": "astra_esp8266",
        "placeholder_6606": "asyncino",
        "placeholder_6607": "atlas OEM module",
        "placeholder_6608": "attiny85FasterPin",
        "placeholder_6609": "autorequest",
        "placeholder_6610": "autowp-mcp2515",
        "placeholder_6611": "avdweb_AnalogReadFast",
        "placeholder_6612": "avdweb_SAMDtimer",
        "placeholder_6613": "avdweb_VirtualDelay",
        "placeholder_6614": "avr-fast-div",
        "placeholder_6615": "avr-fast-map",
        "placeholder_6616": "avr-fast-shift",
        "placeholder_6617": "avrCalibrate",
        "placeholder_6618": "avr_stl",
        "placeholder_6619": "avrtos",
        "placeholder_6620": "base64",
        "placeholder_6621": "base64_encode",
        "placeholder_6622": "basicCalculus",
        "placeholder_6623": "basicGLCD",
        "placeholder_6624": "basicMPU6050",
        "placeholder_6625": "bb_captouch",
        "placeholder_6626": "bb_hx1230",
        "placeholder_6627": "bb_ltr390",
        "placeholder_6628": "bb_rtc",
        "placeholder_6629": "bb_scd41",
        "placeholder_6630": "bb_spi_lcd",
        "placeholder_6631": "bb_uc1701",
        "placeholder_6632": "bcl",
        "placeholder_6633": "bitHelpers",
        "placeholder_6634": "bitluni ESP32Lib",
        "placeholder_6635": "bits_asukiaaa",
        "placeholder_6636": "ble_definitions",
        "placeholder_6637": "blesdlib",
        "placeholder_6638": "blite",
        "placeholder_6639": "bluemicro_engine",
        "placeholder_6640": "bluemicro_exmpl",
        "placeholder_6641": "bluemicro_hid",
        "placeholder_6642": "bluemicro_nrf52",
        "placeholder_6643": "bluemicro_rp2040",
        "placeholder_6644": "bluemicro_samd",
        "placeholder_6645": "bosejis_AMV",
        "placeholder_6646": "bosejis_Bin",
        "placeholder_6647": "bosejis_PString",
        "placeholder_6648": "bosejis_TWI",
        "placeholder_6649": "bosejis_Types",
        "placeholder_6650": "bsec2",
        "placeholder_6651": "btnapi",
        "placeholder_6652": "buildTime",
        "placeholder_6653": "button_asukiaaa",
        "placeholder_6654": "byte-sized-encoder-decoder",
        "placeholder_6655": "cI2C",
        "placeholder_6656": "cQueue",
        "placeholder_6657": "cSerialWatcher",
        "placeholder_6658": "car robot vip",
        "placeholder_6659": "cerebro",
        "placeholder_6660": "cgnuino",
        "placeholder_6661": "clicli",
        "placeholder_6662": "cloud4rpi-esp-arduino",
        "placeholder_6663": "cmd",
        "placeholder_6664": "cmdArduino",
        "placeholder_6665": "controlKeyboard",
        "placeholder_6666": "controlVoltage",
        "placeholder_6667": "crc_asukiaaa",
        "placeholder_6668": "cronos",
        "placeholder_6669": "cst816t",
        "placeholder_6670": "currency",
        "placeholder_6671": "custom_PortentaBreakout",
        "placeholder_6672": "dWin",
        "placeholder_6673": "databot",
        "placeholder_6674": "databot2",
        "placeholder_6675": "dateTimeHelpers",
        "placeholder_6676": "dbg-trace",
        "placeholder_6677": "dcf77_xtal",
        "placeholder_6678": "ddns-nightly",
        "placeholder_6679": "debounce",
        "placeholder_6680": "debug-cli",
        "placeholder_6681": "debuggery",
        "placeholder_6682": "deepC",
        "placeholder_6683": "deploii",
        "placeholder_6684": "desklab",
        "placeholder_6685": "detaBaseArduinoESP32",
        "placeholder_6686": "detaBaseESP8266",
        "placeholder_6687": "dht11esp8266",
        "placeholder_6688": "dht11esp8266examples",
        "placeholder_6689": "dhtESP32-rmt",
        "placeholder_6690": "digiedge_frame_generator",
        "placeholder_6691": "digitalPinFast",
        "placeholder_6692": "digitalWriteFast",
        "placeholder_6693": "directADC",
        "placeholder_6694": "directTimers",
        "placeholder_6695": "diwa",
        "placeholder_6696": "ds3231FS",
        "placeholder_6697": "dswpainelpro",
        "placeholder_6698": "due_can",
        "placeholder_6699": "dustSensor_kocoa",
        "placeholder_6700": "dwarf433",
        "placeholder_6701": "dynaHTML",
        "placeholder_6702": "dynaconfig",
        "placeholder_6703": "eBoard shackle the Arduino",
        "placeholder_6704": "eBtn",
        "placeholder_6705": "eFLL",
        "placeholder_6706": "eFlexPwm",
        "placeholder_6707": "eForth1",
        "placeholder_6708": "eHaJo Absolute Pressure Addon",
        "placeholder_6709": "eHaJo LM75-Addon-Board",
        "placeholder_6710": "eOS",
        "placeholder_6711": "easyConfig",
        "placeholder_6712": "easyLiDAR",
        "placeholder_6713": "eeprom_25AA02EXX",
        "placeholder_6714": "efont Unicode Font Data",
        "placeholder_6715": "egoShieldS",
        "placeholder_6716": "egoShieldTeach",
        "placeholder_6717": "egoShieldTimeLapse",
        "placeholder_6718": "elapsedMillis",
        "placeholder_6719": "electricui-embedded",
        "placeholder_6720": "electuno",
        "placeholder_6721": "elk",
        "placeholder_6722": "ellipse",
        "placeholder_6723": "eloquent_remote",
        "placeholder_6724": "em4095",
        "placeholder_6725": "emGUI",
        "placeholder_6726": "emWin",
        "placeholder_6727": "enum_asukiaaa",
        "placeholder_6728": "escornabot",
        "placeholder_6729": "escposprinter",
        "placeholder_6730": "esp-brookesia",
        "placeholder_6731": "esp-echonet-lite",
        "placeholder_6732": "esp-fs-webserver",
        "placeholder_6733": "esp-iot-core",
        "placeholder_6734": "esp32-BG95",
        "placeholder_6735": "esp32-BLE112",
        "placeholder_6736": "esp32-ds18b20",
        "placeholder_6737": "esp32-flashz",
        "placeholder_6738": "esp32-rmt-ir",
        "placeholder_6739": "esp32FOTA",
        "placeholder_6740": "esp32_codec2",
        "placeholder_6741": "esp32_ftpclient",
        "placeholder_6742": "esp32_gamepad",
        "placeholder_6743": "esp32_https_server_compat",
        "placeholder_6744": "esp32_idf5_https_server_compat",
        "placeholder_6745": "esp32_moga",
        "placeholder_6746": "esp32_opus",
        "placeholder_6747": "esp8266-framework",
        "placeholder_6748": "esp8266-google-home-notifier",
        "placeholder_6749": "esp8266-google-tts",
        "placeholder_6750": "esp826611",
        "placeholder_6751": "esp8266_mdns",
        "placeholder_6752": "esp8266channel3lib",
        "placeholder_6753": "esp_abus",
        "placeholder_6754": "esp_dmx",
        "placeholder_6755": "esp_sds011",
        "placeholder_6756": "espwifiarduino",
        "placeholder_6757": "ev3-arduino",
        "placeholder_6758": "everytime",
        "placeholder_6759": "evive",
        "placeholder_6760": "evo_bsp",
        "placeholder_6761": "evo_build_template",
        "placeholder_6762": "evo_pmux_csr",
        "placeholder_6763": "evo_servo",
        "placeholder_6764": "extEEPROM",
        "placeholder_6765": "extendFor",
        "placeholder_6766": "ezAnalogKeypad",
        "placeholder_6767": "ezButton",
        "placeholder_6768": "ezBuzzer",
        "placeholder_6769": "ezLED",
        "placeholder_6770": "ezOutput",
        "placeholder_6771": "ezTime",
        "placeholder_6772": "ez_SIPO8_lib",
        "placeholder_6773": "ez_switch_lib",
        "placeholder_6774": "fANSI",
        "placeholder_6775": "fDigitsSegtPin",
        "placeholder_6776": "fastIO",
        "placeholder_6777": "fast_math",
        "placeholder_6778": "fast_samd21_tc",
        "placeholder_6779": "fishyDIYdevices",
        "placeholder_6780": "fix_fft",
        "placeholder_6781": "fixed",
        "placeholder_6782": "flagsapi",
        "placeholder_6783": "flex_DST",
        "placeholder_6784": "float16",
        "placeholder_6785": "float16ext",
        "placeholder_6786": "floatToString",
        "placeholder_6787": "fmt",
        "placeholder_6788": "fog",
        "placeholder_6789": "forcedBMX280",
        "placeholder_6790": "fork-webbino-ahmsec",
        "placeholder_6791": "fp64lib",
        "placeholder_6792": "frt",
        "placeholder_6793": "ft817",
        "placeholder_6794": "ftp32",
        "placeholder_6795": "functional_button",
        "placeholder_6796": "gButton",
        "placeholder_6797": "generic-Arduino",
        "placeholder_6798": "genieArduino",
        "placeholder_6799": "genieArduinoDEV",
        "placeholder_6800": "geomath",
        "placeholder_6801": "ggwave",
        "placeholder_6802": "ghaemShopSmSim",
        "placeholder_6803": "ghostl",
        "placeholder_6804": "glpi_esp8266",
        "placeholder_6805": "gma3",
        "placeholder_6806": "gmp-ino",
        "placeholder_6807": "gob_unifiedButton",
        "placeholder_6808": "goblin3d",
        "placeholder_6809": "gpiobj",
        "placeholder_6810": "gyroturn",
        "placeholder_6811": "hackAIR",
        "placeholder_6812": "haversine",
        "placeholder_6813": "hd44780",
        "placeholder_6814": "hellothing_BG96_NBIoT",
        "placeholder_6815": "hellschreiberlib",
        "placeholder_6816": "heltec-eink-modules",
        "placeholder_6817": "high-side-switch-ino",
        "placeholder_6818": "home-assistant-integration",
        "placeholder_6819": "homecontrol-mqtt",
        "placeholder_6820": "hp_BH1750",
        "placeholder_6821": "hsmcpp",
        "placeholder_6822": "hueDino",
        "placeholder_6823": "hw262",
        "placeholder_6824": "hx710b_arduino",
        "placeholder_6825": "i2c-for-esp32",
        "placeholder_6826": "i2c_adc_ads7828",
        "placeholder_6827": "i2cdetect",
        "placeholder_6828": "iAQ-CoreMI",
        "placeholder_6829": "iBit_Arduino",
        "placeholder_6830": "iBotX",
        "placeholder_6831": "iKB1_Arduino",
        "placeholder_6832": "iMakeBeta",
        "placeholder_6833": "iMakerPS2",
        "placeholder_6834": "iSYNC",
        "placeholder_6835": "iSYNC_BC95_Arduino",
        "placeholder_6836": "iarduino Frequency",
        "placeholder_6837": "iarduino GSM",
        "placeholder_6838": "iarduino_4LED",
        "placeholder_6839": "iarduino_ACS712",
        "placeholder_6840": "iarduino_ADC_CS1237",
        "placeholder_6841": "iarduino_AM2320",
        "placeholder_6842": "iarduino_APDS9930",
        "placeholder_6843": "iarduino_Bluetooth_HC05",
        "placeholder_6844": "iarduino_DHT",
        "placeholder_6845": "iarduino_DS18XXX",
        "placeholder_6846": "iarduino_Encoder_tmr",
        "placeholder_6847": "iarduino_GPS_ATGM336",
        "placeholder_6848": "iarduino_GPS_NMEA",
        "placeholder_6849": "iarduino_GprsClient_A9",
        "placeholder_6850": "iarduino_HC_SR04",
        "placeholder_6851": "iarduino_HC_SR04_int",
        "placeholder_6852": "iarduino_HC_SR04_tmr",
        "placeholder_6853": "iarduino_Hexapod",
        "placeholder_6854": "iarduino_I2C_4LED",
        "placeholder_6855": "iarduino_I2C_Address",
        "placeholder_6856": "iarduino_I2C_Bumper",
        "placeholder_6857": "iarduino_I2C_DSL",
        "placeholder_6858": "iarduino_I2C_Encoder",
        "placeholder_6859": "iarduino_I2C_Expander",
        "placeholder_6860": "iarduino_I2C_IO",
        "placeholder_6861": "iarduino_I2C_IR",
        "placeholder_6862": "iarduino_I2C_Joystick",
        "placeholder_6863": "iarduino_I2C_Keyboard",
        "placeholder_6864": "iarduino_I2C_Matrix_8x8",
        "placeholder_6865": "iarduino_I2C_Motor",
        "placeholder_6866": "iarduino_I2C_ORP",
        "placeholder_6867": "iarduino_I2C_Relay",
        "placeholder_6868": "iarduino_I2C_SHT",
        "placeholder_6869": "iarduino_I2C_Software",
        "placeholder_6870": "iarduino_I2C_TDS",
        "placeholder_6871": "iarduino_I2C_Track",
        "placeholder_6872": "iarduino_I2C_connect",
        "placeholder_6873": "iarduino_I2C_pH",
        "placeholder_6874": "iarduino_IR",
        "placeholder_6875": "iarduino_IR_Thermometer",
        "placeholder_6876": "iarduino_KB",
        "placeholder_6877": "iarduino_MB_HTL",
        "placeholder_6878": "iarduino_MB_Pump",
        "placeholder_6879": "iarduino_MB_ShtSgpLtr",
        "placeholder_6880": "iarduino_MB_Socket",
        "placeholder_6881": "iarduino_MB_TDS",
        "placeholder_6882": "iarduino_MB_eCO2",
        "placeholder_6883": "iarduino_MB_pH",
        "placeholder_6884": "iarduino_Metro",
        "placeholder_6885": "iarduino_Modbus",
        "placeholder_6886": "iarduino_MultiServo",
        "placeholder_6887": "iarduino_NeoPixel",
        "placeholder_6888": "iarduino_OLED",
        "placeholder_6889": "iarduino_OLED_txt",
        "placeholder_6890": "iarduino_PCA9555",
        "placeholder_6891": "iarduino_Position_BMX055",
        "placeholder_6892": "iarduino_Pressure_BMP",
        "placeholder_6893": "iarduino_REG_595",
        "placeholder_6894": "iarduino_RF433",
        "placeholder_6895": "iarduino_RTC",
        "placeholder_6896": "iarduino_SensorPulse",
        "placeholder_6897": "iarduino_VCC",
        "placeholder_6898": "iarduino_VpH",
        "placeholder_6899": "iarduino_Wattmeter",
        "placeholder_6900": "iarduino_nLED",
        "placeholder_6901": "imuFilter",
        "placeholder_6902": "incbin",
        "placeholder_6903": "indhilib",
        "placeholder_6904": "infiniteAverage",
        "placeholder_6905": "integer24",
        "placeholder_6906": "iocontrol",
        "placeholder_6907": "iotec_MAX7319",
        "placeholder_6908": "iotsa",
        "placeholder_6909": "ipMIDI",
        "placeholder_6910": "irBoard Library for ESP32",
        "placeholder_6911": "is31fl3733",
        "placeholder_6912": "jeager-one",
        "placeholder_6913": "jm_CPPM",
        "placeholder_6914": "jm_LCM2004A_I2C",
        "placeholder_6915": "jm_LiquidCrystal_I2C",
        "placeholder_6916": "jm_PCF8574",
        "placeholder_6917": "jm_Pin",
        "placeholder_6918": "jm_Scheduler",
        "placeholder_6919": "jm_Wire",
        "placeholder_6920": "jm_crc-ccitt",
        "placeholder_6921": "joystick_module",
        "placeholder_6922": "jsnsr04t",
        "placeholder_6923": "json2asw",
        "placeholder_6924": "jsonlib",
        "placeholder_6925": "jsons",
        "placeholder_6926": "kMeans",
        "placeholder_6927": "kRPC",
        "placeholder_6928": "kc868-arduino-library",
        "placeholder_6929": "keyboardButton",
        "placeholder_6930": "keyboard_peripheral_modules",
        "placeholder_6931": "keybrd",
        "placeholder_6932": "kxnTask",
        "placeholder_6933": "laboratorioFW-DIY",
        "placeholder_6934": "lansium-arduino",
        "placeholder_6935": "lazyjson",
        "placeholder_6936": "lcdgfx",
        "placeholder_6937": "ld2410",
        "placeholder_6938": "leOS",
        "placeholder_6939": "leOS2",
        "placeholder_6940": "ledflasher",
        "placeholder_6941": "libCBOR",
        "placeholder_6942": "libTrial",
        "placeholder_6943": "libasm",
        "placeholder_6944": "libcli",
        "placeholder_6945": "libedge",
        "placeholder_6946": "libnapc",
        "placeholder_6947": "light_CD74HC4067",
        "placeholder_6948": "linaGFX",
        "placeholder_6949": "log4Esp",
        "placeholder_6950": "log4arduino",
        "placeholder_6951": "looper",
        "placeholder_6952": "losant-mqtt-arduino",
        "placeholder_6953": "lv_arduino",
        "placeholder_6954": "lv_examples",
        "placeholder_6955": "lvgl",
        "placeholder_6956": "lvglCpp",
        "placeholder_6957": "lwIOLink",
        "placeholder_6958": "lwIP",
        "placeholder_6959": "lx16a-servo",
        "placeholder_6960": "m0_tweak",
        "placeholder_6961": "mDNSResolver",
        "placeholder_6962": "mDash",
        "placeholder_6963": "mDriver",
        "placeholder_6964": "mPower",
        "placeholder_6965": "mString",
        "placeholder_6966": "mWebSockets",
        "placeholder_6967": "madflight",
        "placeholder_6968": "map2bits",
        "placeholder_6969": "map2colour",
        "placeholder_6970": "maqui",
        "placeholder_6971": "max7219",
        "placeholder_6972": "mbino",
        "placeholder_6973": "mc74hc595a",
        "placeholder_6974": "mcp_can",
        "placeholder_6975": "mcp_canbus",
        "placeholder_6976": "mcu-max",
        "placeholder_6977": "mcu-renderer",
        "placeholder_6978": "mdif",
        "placeholder_6979": "megaAVR_PWM",
        "placeholder_6980": "megaAVR_Slow_PWM",
        "placeholder_6981": "megaAVR_TimerInterrupt",
        "placeholder_6982": "mergCBUS",
        "placeholder_6983": "micro Maqueen",
        "placeholder_6984": "micro-ecc",
        "placeholder_6985": "microDS18B20",
        "placeholder_6986": "microDS3231",
        "placeholder_6987": "microLED",
        "placeholder_6988": "microWire",
        "placeholder_6989": "micro_ros_kaia",
        "placeholder_6990": "microgear-nbiot",
        "placeholder_6991": "microlzw",
        "placeholder_6992": "mimuz-ch55x",
        "placeholder_6993": "minIniFS",
        "placeholder_6994": "minbasecli",
        "placeholder_6995": "mini-ppm-info",
        "placeholder_6996": "miniDAC",
        "placeholder_6997": "mjson",
        "placeholder_6998": "modbus-esp8266",
        "placeholder_6999": "modbusrtu",
        "placeholder_7000": "modem-freeRTOS",
        "placeholder_7001": "moduloMap",
        "placeholder_7002": "monitor_printf",
        "placeholder_7003": "motix-btn99x0",
        "placeholder_7004": "motor system IC TLE956x",
        "placeholder_7005": "movingAvg",
        "placeholder_7006": "mpbToSwitch",
        "placeholder_7007": "mqtt5nano",
        "placeholder_7008": "mqtt_fuota_duino",
        "placeholder_7009": "mrm-8x8a",
        "placeholder_7010": "mrm-bldc2x50",
        "placeholder_7011": "mrm-bldc4x2.5",
        "placeholder_7012": "mrm-board",
        "placeholder_7013": "mrm-can-bus",
        "placeholder_7014": "mrm-col-b",
        "placeholder_7015": "mrm-col-can",
        "placeholder_7016": "mrm-common",
        "placeholder_7017": "mrm-fet-can",
        "placeholder_7018": "mrm-imu",
        "placeholder_7019": "mrm-ir-finder-can",
        "placeholder_7020": "mrm-ir-finder2",
        "placeholder_7021": "mrm-ir-finder3",
        "placeholder_7022": "mrm-lid-can-b",
        "placeholder_7023": "mrm-lid-can-b2",
        "placeholder_7024": "mrm-lid-d",
        "placeholder_7025": "mrm-lid1",
        "placeholder_7026": "mrm-lid2",
        "placeholder_7027": "mrm-mot2x50",
        "placeholder_7028": "mrm-mot4x10",
        "placeholder_7029": "mrm-mot4x3.6can",
        "placeholder_7030": "mrm-node",
        "placeholder_7031": "mrm-pid",
        "placeholder_7032": "mrm-ref-can",
        "placeholder_7033": "mrm-robot",
        "placeholder_7034": "mrm-servo",
        "placeholder_7035": "mrm-switch",
        "placeholder_7036": "mrm-therm-b-can",
        "placeholder_7037": "mrm-us-b",
        "placeholder_7038": "mrm-us1",
        "placeholder_7039": "ms5540c",
        "placeholder_7040": "msTask",
        "placeholder_7041": "msToString",
        "placeholder_7042": "muCom",
        "placeholder_7043": "muTimer",
        "placeholder_7044": "mudlink",
        "placeholder_7045": "mufonts",
        "placeholder_7046": "multi-half-bridge",
        "placeholder_7047": "multiplePinOps",
        "placeholder_7048": "munet",
        "placeholder_7049": "mupplet-core",
        "placeholder_7050": "mupplet-display",
        "placeholder_7051": "mupplet-sensor",
        "placeholder_7052": "mwc_stepper",
        "placeholder_7053": "my92xx",
        "placeholder_7054": "my_STL",
        "placeholder_7055": "n2cmu",
        "placeholder_7056": "nRF52_MBED_PWM",
        "placeholder_7057": "nRF52_MBED_Slow_PWM",
        "placeholder_7058": "nRF52_OLED",
        "placeholder_7059": "nRF52_PWM",
        "placeholder_7060": "nRF52_Slow_PWM",
        "placeholder_7061": "nRF905 Radio Library",
        "placeholder_7062": "nanoFORTH",
        "placeholder_7063": "nb-twi-cmd",
        "placeholder_7064": "nlohmann-json",
        "placeholder_7065": "nodepp",
        "placeholder_7066": "nonblockingtimer",
        "placeholder_7067": "noolite_tx",
        "placeholder_7068": "nrf_rng",
        "placeholder_7069": "nrf_to_nrf",
        "placeholder_7070": "nuMROBO",
        "placeholder_7071": "num7",
        "placeholder_7072": "nw2s_portenta_SSD1322",
        "placeholder_7073": "oatmeal-protocol",
        "placeholder_7074": "omnicrystal",
        "placeholder_7075": "openafe",
        "placeholder_7076": "openafe_comm",
        "placeholder_7077": "oprintstream",
        "placeholder_7078": "optoma",
        "placeholder_7079": "osap",
        "placeholder_7080": "pImpl",
        "placeholder_7081": "pRNG",
        "placeholder_7082": "palindrome",
        "placeholder_7083": "pca9633",
        "placeholder_7084": "pcf8574",
        "placeholder_7085": "pdulib",
        "placeholder_7086": "percent_encode",
        "placeholder_7087": "pfodParser",
        "placeholder_7088": "pgm_utils",
        "placeholder_7089": "phyphox BLE",
        "placeholder_7090": "pid-autotune",
        "placeholder_7091": "pimoroniTrackball",
        "placeholder_7092": "ping-arduino",
        "placeholder_7093": "pixels-dice-interface",
        "placeholder_7094": "plotutils",
        "placeholder_7095": "pm25senses",
        "placeholder_7096": "pngle",
        "placeholder_7097": "pocketBME280",
        "placeholder_7098": "portenta-pro-community-solutions",
        "placeholder_7099": "precise_sntp",
        "placeholder_7100": "pressure",
        "placeholder_7101": "printHelpers",
        "placeholder_7102": "programmable_air",
        "placeholder_7103": "protectedAES",
        "placeholder_7104": "ps2dev",
        "placeholder_7105": "ps2shebei",
        "placeholder_7106": "ps2zhuji",
        "placeholder_7107": "pseudospectrum",
        "placeholder_7108": "ptScheduler",
        "placeholder_7109": "pulseAny",
        "placeholder_7110": "pulseInput",
        "placeholder_7111": "pushButton",
        "placeholder_7112": "pzem-edl",
        "placeholder_7113": "qlibs",
        "placeholder_7114": "r4SwRTC",
        "placeholder_7115": "r89m Buttons",
        "placeholder_7116": "r89m CapacitiveButton",
        "placeholder_7117": "r89m MPR121Button",
        "placeholder_7118": "r89m PushButton",
        "placeholder_7119": "radar-bgt60",
        "placeholder_7120": "randomHelpers",
        "placeholder_7121": "rastr",
        "placeholder_7122": "rc-switch",
        "placeholder_7123": "readguy",
        "placeholder_7124": "redkea",
        "placeholder_7125": "relativity",
        "placeholder_7126": "retroTerm",
        "placeholder_7127": "rgbled",
        "placeholder_7128": "rhio-LIS2HH12",
        "placeholder_7129": "rhio-pinmap",
        "placeholder_7130": "roo_collections",
        "placeholder_7131": "roo_control",
        "placeholder_7132": "roo_display",
        "placeholder_7133": "roo_flags",
        "placeholder_7134": "roo_icons",
        "placeholder_7135": "roo_logging",
        "placeholder_7136": "roo_material_icons",
        "placeholder_7137": "roo_onewire",
        "placeholder_7138": "roo_prefs",
        "placeholder_7139": "roo_scheduler",
        "placeholder_7140": "roo_temperature",
        "placeholder_7141": "roo_time",
        "placeholder_7142": "roo_wifi",
        "placeholder_7143": "roo_windows",
        "placeholder_7144": "roo_windows_onewire",
        "placeholder_7145": "roo_windows_wifi",
        "placeholder_7146": "ros2arduino",
        "placeholder_7147": "rotaryDecoder",
        "placeholder_7148": "rotaryDecoderSwitch",
        "placeholder_7149": "rp2040-encoder-library",
        "placeholder_7150": "rrdtool",
        "placeholder_7151": "rs485_asukiaaa",
        "placeholder_7152": "rssRead",
        "placeholder_7153": "rtc_utils",
        "placeholder_7154": "runner",
        "placeholder_7155": "runningAngle",
        "placeholder_7156": "rupertobot",
        "placeholder_7157": "sACN",
        "placeholder_7158": "sACNSource",
        "placeholder_7159": "sMQTTBroker",
        "placeholder_7160": "sTune",
        "placeholder_7161": "sarmfsw",
        "placeholder_7162": "scd30_modbus",
        "placeholder_7163": "sclm-p105_shield",
        "placeholder_7164": "sd-ducky-v1",
        "placeholder_7165": "secTimer",
        "placeholder_7166": "semilimes",
        "placeholder_7167": "sensirion-sps",
        "placeholder_7168": "serial-readline",
        "placeholder_7169": "serial-transport",
        "placeholder_7170": "serialEEPROM",
        "placeholder_7171": "serialIO",
        "placeholder_7172": "serialMux",
        "placeholder_7173": "servodht11",
        "placeholder_7174": "settingsManager",
        "placeholder_7175": "sevenSegment",
        "placeholder_7176": "sevenSegmentDisplay",
        "placeholder_7177": "sf22aswt",
        "placeholder_7178": "sharpIRSensor",
        "placeholder_7179": "shift7seg",
        "placeholder_7180": "sht3x-dis-arduino-lib",
        "placeholder_7181": "simple ht16k33 library",
        "placeholder_7182": "simple-web-dashboard",
        "placeholder_7183": "simpleDSTadjust",
        "placeholder_7184": "simpleEvents",
        "placeholder_7185": "simpleRPC",
        "placeholder_7186": "siot_core_lib",
        "placeholder_7187": "sipf-arduino-client",
        "placeholder_7188": "six-digit-seven-segment",
        "placeholder_7189": "slight_ButtonInput",
        "placeholder_7190": "slight_DebugMenu",
        "placeholder_7191": "slight_FDC1004",
        "placeholder_7192": "slight_Fade",
        "placeholder_7193": "slight_LiquidCrystalDummy",
        "placeholder_7194": "slight_PlainTime",
        "placeholder_7195": "slight_RotaryEncoder",
        "placeholder_7196": "slight_TLC5957",
        "placeholder_7197": "slight_easing",
        "placeholder_7198": "slight_mapping",
        "placeholder_7199": "slowAES",
        "placeholder_7200": "smart-input-filter",
        "placeholder_7201": "smooth",
        "placeholder_7202": "snakelights",
        "placeholder_7203": "solar2lunar",
        "placeholder_7204": "somo-ii-lib",
        "placeholder_7205": "souliss",
        "placeholder_7206": "spaiot-lib",
        "placeholder_7207": "spartan_edge_esp32_boot",
        "placeholder_7208": "spin-timer",
        "placeholder_7209": "sprinkler-system",
        "placeholder_7210": "ss_oled",
        "placeholder_7211": "ssd1306",
        "placeholder_7212": "ssd1306xled",
        "placeholder_7213": "ssd1327",
        "placeholder_7214": "st7567sfGK 128x64 i2c LCD driver for Generation Klick",
        "placeholder_7215": "stackchan-arduino",
        "placeholder_7216": "statHelpers",
        "placeholder_7217": "staticFunctional",
        "placeholder_7218": "statsdclient",
        "placeholder_7219": "statusled",
        "placeholder_7220": "stdcol",
        "placeholder_7221": "steamrocket",
        "placeholder_7222": "stemi-hexapod",
        "placeholder_7223": "string_asukiaaa",
        "placeholder_7224": "sunezy-mon",
        "placeholder_7225": "sunset",
        "placeholder_7226": "super_easing",
        "placeholder_7227": "surf-checker",
        "placeholder_7228": "swRTC",
        "placeholder_7229": "sx1280OverSpi",
        "placeholder_7230": "sysfile",
        "placeholder_7231": "t6iot",
        "placeholder_7232": "tcMenu",
        "placeholder_7233": "tcUnicodeHelper",
        "placeholder_7234": "tca9544a",
        "placeholder_7235": "tcs3200",
        "placeholder_7236": "tdslite",
        "placeholder_7237": "text1306",
        "placeholder_7238": "textparser",
        "placeholder_7239": "tflm_cortexm",
        "placeholder_7240": "tflm_esp32",
        "placeholder_7241": "thinger.io",
        "placeholder_7242": "timersapi",
        "placeholder_7243": "timestamp32bits",
        "placeholder_7244": "timing",
        "placeholder_7245": "tiny-collections",
        "placeholder_7246": "tinyCommand",
        "placeholder_7247": "tinyCore",
        "placeholder_7248": "tinyECC",
        "placeholder_7249": "tinyESPNow",
        "placeholder_7250": "tinyI2S",
        "placeholder_7251": "tinySHT2x",
        "placeholder_7252": "tinySPI",
        "placeholder_7253": "tinyTimeR",
        "placeholder_7254": "tinyUDP",
        "placeholder_7255": "tinyhal",
        "placeholder_7256": "tinyml4all",
        "placeholder_7257": "tinyproto",
        "placeholder_7258": "toneAC",
        "placeholder_7259": "toolbox",
        "placeholder_7260": "ttestTable",
        "placeholder_7261": "twilio-esp32-client",
        "placeholder_7262": "tynyDC",
        "placeholder_7263": "u-blox GNSS",
        "placeholder_7264": "uArmLibrary",
        "placeholder_7265": "uBitcoin",
        "placeholder_7266": "uCDB",
        "placeholder_7267": "uCOS-II",
        "placeholder_7268": "uCOS-III_Due",
        "placeholder_7269": "uCRC16BPBLib",
        "placeholder_7270": "uCRC16Lib",
        "placeholder_7271": "uCRC16XModemLib",
        "placeholder_7272": "uClock",
        "placeholder_7273": "uDebugLib",
        "placeholder_7274": "uECG",
        "placeholder_7275": "uEEPROMLib",
        "placeholder_7276": "uFire PAR Sensor",
        "placeholder_7277": "uFire SHT20",
        "placeholder_7278": "uHexLib",
        "placeholder_7279": "uICAL",
        "placeholder_7280": "uKit Explore",
        "placeholder_7281": "uMFMLib",
        "placeholder_7282": "uMT",
        "placeholder_7283": "uMulti",
        "placeholder_7284": "uMuxOutputLib",
        "placeholder_7285": "uMyo_BLE",
        "placeholder_7286": "uMyo_RF24",
        "placeholder_7287": "uNeurai",
        "placeholder_7288": "uRTCLib",
        "placeholder_7289": "uS82",
        "placeholder_7290": "uSevenSegmentLib",
        "placeholder_7291": "uStepper",
        "placeholder_7292": "uStepper S",
        "placeholder_7293": "uStepper S-lite",
        "placeholder_7294": "uStepperS32",
        "placeholder_7295": "uTLGBotLib",
        "placeholder_7296": "uTimerBrokerLib",
        "placeholder_7297": "uTimerLib",
        "placeholder_7298": "uUnixDate",
        "placeholder_7299": "ucPack",
        "placeholder_7300": "uiwidgets",
        "placeholder_7301": "ultrasonic",
        "placeholder_7302": "um3750-library",
        "placeholder_7303": "unPhoneLibrary",
        "placeholder_7304": "unit-system",
        "placeholder_7305": "unoHID",
        "placeholder_7306": "unzipLIB",
        "placeholder_7307": "usb_midi_host",
        "placeholder_7308": "utils_asukiaaa",
        "placeholder_7309": "vbus-arduino",
        "placeholder_7310": "vdp-gl",
        "placeholder_7311": "virtmem",
        "placeholder_7312": "vl53l0xTOFA",
        "placeholder_7313": "vn_lunar",
        "placeholder_7314": "vovagorodok_ArduinoBleChess",
        "placeholder_7315": "vovagorodok_ArduinoBleOTA",
        "placeholder_7316": "vovagorodok_ArduinoPin",
        "placeholder_7317": "vovagorodok_ArduinoStreamLogger",
        "placeholder_7318": "vovagorodok_ArrayUtils",
        "placeholder_7319": "vovagorodok_PicChess",
        "placeholder_7320": "vovagorodok_Servo",
        "placeholder_7321": "waver",
        "placeholder_7322": "wdt_samd21",
        "placeholder_7323": "weathercall",
        "placeholder_7324": "webthing-arduino",
        "placeholder_7325": "weight",
        "placeholder_7326": "wire_asukiaaa",
        "placeholder_7327": "wiring-timer",
        "placeholder_7328": "wiring_analog_SAMD_TT",
        "placeholder_7329": "wm8978-esp32",
        "placeholder_7330": "wolfssl",
        "placeholder_7331": "wordwrap",
        "placeholder_7332": "wpi-32u4-library",
        "placeholder_7333": "xbee_serial_array",
        "placeholder_7334": "xsens_mti",
        "placeholder_7335": "xy6020l",
        "placeholder_7336": "yatest",
        "placeholder_7337": "yfrobot_tts",
        "placeholder_7338": "youkey_stepper",
        "placeholder_7339": "zForce Air Library",
        "placeholder_7340": "zlib_turbo",
    };
});
define("lib/avr8js/types", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("lib/avr8js/peripherals/gpio", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRIOPort = exports.PinOverrideMode = exports.PinState = exports.portLConfig = exports.portKConfig = exports.portJConfig = exports.portHConfig = exports.portGConfig = exports.portFConfig = exports.portEConfig = exports.portDConfig = exports.portCConfig = exports.portBConfig = exports.portAConfig = exports.PCINT2 = exports.PCINT1 = exports.PCINT0 = exports.INT1 = exports.INT0 = void 0;
    exports.INT0 = {
        EICR: 0x69,
        EIMSK: 0x3d,
        EIFR: 0x3c,
        index: 0,
        iscOffset: 0,
        interrupt: 2,
    };
    exports.INT1 = {
        EICR: 0x69,
        EIMSK: 0x3d,
        EIFR: 0x3c,
        index: 1,
        iscOffset: 2,
        interrupt: 4,
    };
    exports.PCINT0 = {
        PCIE: 0,
        PCICR: 0x68,
        PCIFR: 0x3b,
        PCMSK: 0x6b,
        pinChangeInterrupt: 6,
        mask: 0xff,
        offset: 0,
    };
    exports.PCINT1 = {
        PCIE: 1,
        PCICR: 0x68,
        PCIFR: 0x3b,
        PCMSK: 0x6c,
        pinChangeInterrupt: 8,
        mask: 0xff,
        offset: 0,
    };
    exports.PCINT2 = {
        PCIE: 2,
        PCICR: 0x68,
        PCIFR: 0x3b,
        PCMSK: 0x6d,
        pinChangeInterrupt: 10,
        mask: 0xff,
        offset: 0,
    };
    exports.portAConfig = {
        PIN: 0x20,
        DDR: 0x21,
        PORT: 0x22,
        externalInterrupts: [],
    };
    exports.portBConfig = {
        PIN: 0x23,
        DDR: 0x24,
        PORT: 0x25,
        pinChange: exports.PCINT0,
        externalInterrupts: [],
    };
    exports.portCConfig = {
        PIN: 0x26,
        DDR: 0x27,
        PORT: 0x28,
        pinChange: exports.PCINT1,
        externalInterrupts: [],
    };
    exports.portDConfig = {
        PIN: 0x29,
        DDR: 0x2a,
        PORT: 0x2b,
        pinChange: exports.PCINT2,
        externalInterrupts: [null, null, exports.INT0, exports.INT1],
    };
    exports.portEConfig = {
        PIN: 0x2c,
        DDR: 0x2d,
        PORT: 0x2e,
        externalInterrupts: [],
    };
    exports.portFConfig = {
        PIN: 0x2f,
        DDR: 0x30,
        PORT: 0x31,
        externalInterrupts: [],
    };
    exports.portGConfig = {
        PIN: 0x32,
        DDR: 0x33,
        PORT: 0x34,
        externalInterrupts: [],
    };
    exports.portHConfig = {
        PIN: 0x100,
        DDR: 0x101,
        PORT: 0x102,
        externalInterrupts: [],
    };
    exports.portJConfig = {
        PIN: 0x103,
        DDR: 0x104,
        PORT: 0x105,
        externalInterrupts: [],
    };
    exports.portKConfig = {
        PIN: 0x106,
        DDR: 0x107,
        PORT: 0x108,
        externalInterrupts: [],
    };
    exports.portLConfig = {
        PIN: 0x109,
        DDR: 0x10a,
        PORT: 0x10b,
        externalInterrupts: [],
    };
    var PinState;
    (function (PinState) {
        PinState[PinState["Low"] = 0] = "Low";
        PinState[PinState["High"] = 1] = "High";
        PinState[PinState["Input"] = 2] = "Input";
        PinState[PinState["InputPullUp"] = 3] = "InputPullUp";
    })(PinState || (exports.PinState = PinState = {}));
    var PinOverrideMode;
    (function (PinOverrideMode) {
        PinOverrideMode[PinOverrideMode["None"] = 0] = "None";
        PinOverrideMode[PinOverrideMode["Enable"] = 1] = "Enable";
        PinOverrideMode[PinOverrideMode["Set"] = 2] = "Set";
        PinOverrideMode[PinOverrideMode["Clear"] = 3] = "Clear";
        PinOverrideMode[PinOverrideMode["Toggle"] = 4] = "Toggle";
    })(PinOverrideMode || (exports.PinOverrideMode = PinOverrideMode = {}));
    var InterruptMode;
    (function (InterruptMode) {
        InterruptMode[InterruptMode["LowLevel"] = 0] = "LowLevel";
        InterruptMode[InterruptMode["Change"] = 1] = "Change";
        InterruptMode[InterruptMode["FallingEdge"] = 2] = "FallingEdge";
        InterruptMode[InterruptMode["RisingEdge"] = 3] = "RisingEdge";
    })(InterruptMode || (InterruptMode = {}));
    class AVRIOPort {
        constructor(cpu, portConfig) {
            var _a, _b, _c, _d;
            this.cpu = cpu;
            this.portConfig = portConfig;
            this.externalClockListeners = [];
            this.listeners = [];
            this.pinValue = 0;
            this.overrideMask = 0xff;
            this.overrideValue = 0;
            this.lastValue = 0;
            this.lastDdr = 0;
            this.lastPin = 0;
            this.openCollector = 0;
            cpu.gpioPorts.add(this);
            cpu.gpioByPort[portConfig.PORT] = this;
            cpu.writeHooks[portConfig.DDR] = (value) => {
                const portValue = cpu.data[portConfig.PORT];
                cpu.data[portConfig.DDR] = value;
                this.writeGpio(portValue, value);
                this.updatePinRegister(value);
                return true;
            };
            cpu.writeHooks[portConfig.PORT] = (value) => {
                const ddrMask = cpu.data[portConfig.DDR];
                cpu.data[portConfig.PORT] = value;
                this.writeGpio(value, ddrMask);
                this.updatePinRegister(ddrMask);
                return true;
            };
            cpu.writeHooks[portConfig.PIN] = (value, oldValue, addr, mask) => {
                const oldPortValue = cpu.data[portConfig.PORT];
                const ddrMask = cpu.data[portConfig.DDR];
                const portValue = oldPortValue ^ (value & mask);
                cpu.data[portConfig.PORT] = portValue;
                this.writeGpio(portValue, ddrMask);
                this.updatePinRegister(ddrMask);
                return true;
            };
            const { externalInterrupts } = portConfig;
            this.externalInts = externalInterrupts.map((externalConfig) => externalConfig
                ? {
                    address: externalConfig.interrupt,
                    flagRegister: externalConfig.EIFR,
                    flagMask: 1 << externalConfig.index,
                    enableRegister: externalConfig.EIMSK,
                    enableMask: 1 << externalConfig.index,
                }
                : null);
            const EICR = new Set(externalInterrupts.map((item) => item === null || item === void 0 ? void 0 : item.EICR));
            for (const EICRx of EICR) {
                this.attachInterruptHook(EICRx || 0);
            }
            const EIMSK = (_b = (_a = externalInterrupts.find((item) => item && item.EIMSK)) === null || _a === void 0 ? void 0 : _a.EIMSK) !== null && _b !== void 0 ? _b : 0;
            this.attachInterruptHook(EIMSK, 'mask');
            const EIFR = (_d = (_c = externalInterrupts.find((item) => item && item.EIFR)) === null || _c === void 0 ? void 0 : _c.EIFR) !== null && _d !== void 0 ? _d : 0;
            this.attachInterruptHook(EIFR, 'flag');
            const { pinChange } = portConfig;
            this.PCINT = pinChange
                ? {
                    address: pinChange.pinChangeInterrupt,
                    flagRegister: pinChange.PCIFR,
                    flagMask: 1 << pinChange.PCIE,
                    enableRegister: pinChange.PCICR,
                    enableMask: 1 << pinChange.PCIE,
                }
                : null;
            if (pinChange) {
                const { PCIFR, PCMSK } = pinChange;
                cpu.writeHooks[PCIFR] = (value) => {
                    for (const gpio of this.cpu.gpioPorts) {
                        const { PCINT } = gpio;
                        if (PCINT) {
                            cpu.clearInterruptByFlag(PCINT, value);
                        }
                    }
                    return true;
                };
                cpu.writeHooks[PCMSK] = (value) => {
                    cpu.data[PCMSK] = value;
                    for (const gpio of this.cpu.gpioPorts) {
                        const { PCINT } = gpio;
                        if (PCINT) {
                            cpu.updateInterruptEnable(PCINT, value);
                        }
                    }
                    return true;
                };
            }
        }
        addListener(listener) {
            this.listeners.push(listener);
        }
        removeListener(listener) {
            this.listeners = this.listeners.filter((l) => l !== listener);
        }
        pinState(index) {
            const ddr = this.cpu.data[this.portConfig.DDR];
            const port = this.cpu.data[this.portConfig.PORT];
            const bitMask = 1 << index;
            const openState = port & bitMask ? PinState.InputPullUp : PinState.Input;
            const highValue = this.openCollector & bitMask ? openState : PinState.High;
            if (ddr & bitMask) {
                return this.lastValue & bitMask ? highValue : PinState.Low;
            }
            else {
                return openState;
            }
        }
        setPin(index, value) {
            const bitMask = 1 << index;
            this.pinValue &= ~bitMask;
            if (value) {
                this.pinValue |= bitMask;
            }
            this.updatePinRegister(this.cpu.data[this.portConfig.DDR]);
        }
        timerOverridePin(pin, mode) {
            const { cpu, portConfig } = this;
            const pinMask = 1 << pin;
            if (mode === PinOverrideMode.None) {
                this.overrideMask |= pinMask;
                this.overrideValue &= ~pinMask;
            }
            else {
                this.overrideMask &= ~pinMask;
                switch (mode) {
                    case PinOverrideMode.Enable:
                        this.overrideValue &= ~pinMask;
                        this.overrideValue |= cpu.data[portConfig.PORT] & pinMask;
                        break;
                    case PinOverrideMode.Set:
                        this.overrideValue |= pinMask;
                        break;
                    case PinOverrideMode.Clear:
                        this.overrideValue &= ~pinMask;
                        break;
                    case PinOverrideMode.Toggle:
                        this.overrideValue ^= pinMask;
                        break;
                }
            }
            const ddrMask = cpu.data[portConfig.DDR];
            this.writeGpio(cpu.data[portConfig.PORT], ddrMask);
            this.updatePinRegister(ddrMask);
        }
        updatePinRegister(ddr) {
            var _a, _b;
            const newPin = (this.pinValue & ~ddr) | (this.lastValue & ddr);
            this.cpu.data[this.portConfig.PIN] = newPin;
            if (this.lastPin !== newPin) {
                for (let index = 0; index < 8; index++) {
                    if ((newPin & (1 << index)) !== (this.lastPin & (1 << index))) {
                        const value = !!(newPin & (1 << index));
                        this.toggleInterrupt(index, value);
                        (_b = (_a = this.externalClockListeners)[index]) === null || _b === void 0 ? void 0 : _b.call(_a, value);
                    }
                }
                this.lastPin = newPin;
            }
        }
        toggleInterrupt(pin, risingEdge) {
            const { cpu, portConfig, externalInts, PCINT } = this;
            const { externalInterrupts, pinChange } = portConfig;
            const externalConfig = externalInterrupts[pin];
            const external = externalInts[pin];
            if (external && externalConfig) {
                const { EIMSK, index, EICR, iscOffset } = externalConfig;
                if (cpu.data[EIMSK] & (1 << index)) {
                    const configuration = (cpu.data[EICR] >> iscOffset) & 0x3;
                    let generateInterrupt = false;
                    external.constant = false;
                    switch (configuration) {
                        case InterruptMode.LowLevel:
                            generateInterrupt = !risingEdge;
                            external.constant = true;
                            break;
                        case InterruptMode.Change:
                            generateInterrupt = true;
                            break;
                        case InterruptMode.FallingEdge:
                            generateInterrupt = !risingEdge;
                            break;
                        case InterruptMode.RisingEdge:
                            generateInterrupt = risingEdge;
                            break;
                    }
                    if (generateInterrupt) {
                        cpu.setInterruptFlag(external);
                    }
                    else if (external.constant) {
                        cpu.clearInterrupt(external, true);
                    }
                }
            }
            if (pinChange && PCINT && pinChange.mask & (1 << pin)) {
                const { PCMSK } = pinChange;
                if (cpu.data[PCMSK] & (1 << (pin + pinChange.offset))) {
                    cpu.setInterruptFlag(PCINT);
                }
            }
        }
        attachInterruptHook(register, registerType = 'other') {
            if (!register) {
                return;
            }
            const { cpu } = this;
            cpu.writeHooks[register] = (value) => {
                if (registerType !== 'flag') {
                    cpu.data[register] = value;
                }
                for (const gpio of cpu.gpioPorts) {
                    for (const external of gpio.externalInts) {
                        if (external && registerType === 'mask') {
                            cpu.updateInterruptEnable(external, value);
                        }
                        if (external && !external.constant && registerType === 'flag') {
                            cpu.clearInterruptByFlag(external, value);
                        }
                    }
                    gpio.checkExternalInterrupts();
                }
                return true;
            };
        }
        checkExternalInterrupts() {
            const { cpu } = this;
            const { externalInterrupts } = this.portConfig;
            for (let pin = 0; pin < 8; pin++) {
                const external = externalInterrupts[pin];
                if (!external) {
                    continue;
                }
                const pinValue = !!(this.lastPin & (1 << pin));
                const { EIFR, EIMSK, index, EICR, iscOffset, interrupt } = external;
                if (!(cpu.data[EIMSK] & (1 << index)) || pinValue) {
                    continue;
                }
                const configuration = (cpu.data[EICR] >> iscOffset) & 0x3;
                if (configuration === InterruptMode.LowLevel) {
                    cpu.queueInterrupt({
                        address: interrupt,
                        flagRegister: EIFR,
                        flagMask: 1 << index,
                        enableRegister: EIMSK,
                        enableMask: 1 << index,
                        constant: true,
                    });
                }
            }
        }
        writeGpio(value, ddr) {
            const newValue = (((value & this.overrideMask) | this.overrideValue) & ddr) | (value & ~ddr);
            const prevValue = this.lastValue;
            if (newValue !== prevValue || ddr !== this.lastDdr) {
                this.lastValue = newValue;
                this.lastDdr = ddr;
                for (const listener of this.listeners) {
                    listener(newValue, prevValue);
                }
            }
        }
    }
    exports.AVRIOPort = AVRIOPort;
});
define("lib/avr8js/cpu/interrupt", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.avrInterrupt = void 0;
    function avrInterrupt(cpu, addr) {
        const sp = cpu.dataView.getUint16(93, true);
        cpu.data[sp] = cpu.pc & 0xff;
        cpu.data[sp - 1] = (cpu.pc >> 8) & 0xff;
        if (cpu.pc22Bits) {
            cpu.data[sp - 2] = (cpu.pc >> 16) & 0xff;
        }
        cpu.dataView.setUint16(93, sp - (cpu.pc22Bits ? 3 : 2), true);
        cpu.data[95] &= 0x7f;
        cpu.cycles += 2;
        cpu.pc = addr;
    }
    exports.avrInterrupt = avrInterrupt;
});
define("lib/avr8js/cpu/cpu", ["require", "exports", "lib/avr8js/cpu/interrupt"], function (require, exports, interrupt_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CPU = void 0;
    const registerSpace = 0x100;
    const MAX_INTERRUPTS = 128;
    class CPU {
        constructor(progMem, sramBytes = 8192) {
            this.progMem = progMem;
            this.sramBytes = sramBytes;
            this.data = new Uint8Array(this.sramBytes + registerSpace);
            this.data16 = new Uint16Array(this.data.buffer);
            this.dataView = new DataView(this.data.buffer);
            this.progBytes = new Uint8Array(this.progMem.buffer);
            this.readHooks = [];
            this.writeHooks = [];
            this.pendingInterrupts = new Array(MAX_INTERRUPTS);
            this.nextClockEvent = null;
            this.clockEventPool = [];
            this.pc22Bits = this.progBytes.length > 0x20000;
            this.gpioPorts = new Set();
            this.gpioByPort = [];
            this.onWatchdogReset = () => {
            };
            this.pc = 0;
            this.cycles = 0;
            this.nextInterrupt = -1;
            this.maxInterrupt = 0;
            this.reset();
        }
        reset() {
            this.SP = this.data.length - 1;
            this.pc = 0;
            this.pendingInterrupts.fill(null);
            this.nextInterrupt = -1;
            this.nextClockEvent = null;
        }
        readData(addr) {
            if (addr >= 32 && this.readHooks[addr]) {
                return this.readHooks[addr](addr);
            }
            return this.data[addr];
        }
        writeData(addr, value, mask = 0xff) {
            const hook = this.writeHooks[addr];
            if (hook) {
                if (hook(value, this.data[addr], addr, mask)) {
                    return;
                }
            }
            this.data[addr] = value;
        }
        get SP() {
            return this.dataView.getUint16(93, true);
        }
        set SP(value) {
            this.dataView.setUint16(93, value, true);
        }
        get SREG() {
            return this.data[95];
        }
        get interruptsEnabled() {
            return this.SREG & 0x80 ? true : false;
        }
        setInterruptFlag(interrupt) {
            const { flagRegister, flagMask, enableRegister, enableMask } = interrupt;
            if (interrupt.inverseFlag) {
                this.data[flagRegister] &= ~flagMask;
            }
            else {
                this.data[flagRegister] |= flagMask;
            }
            if (this.data[enableRegister] & enableMask) {
                this.queueInterrupt(interrupt);
            }
        }
        updateInterruptEnable(interrupt, registerValue) {
            const { enableMask, flagRegister, flagMask, inverseFlag } = interrupt;
            if (registerValue & enableMask) {
                const bitSet = this.data[flagRegister] & flagMask;
                if (inverseFlag ? !bitSet : bitSet) {
                    this.queueInterrupt(interrupt);
                }
            }
            else {
                this.clearInterrupt(interrupt, false);
            }
        }
        queueInterrupt(interrupt) {
            const { address } = interrupt;
            this.pendingInterrupts[address] = interrupt;
            if (this.nextInterrupt === -1 || this.nextInterrupt > address) {
                this.nextInterrupt = address;
            }
            if (address > this.maxInterrupt) {
                this.maxInterrupt = address;
            }
        }
        clearInterrupt({ address, flagRegister, flagMask }, clearFlag = true) {
            if (clearFlag) {
                this.data[flagRegister] &= ~flagMask;
            }
            const { pendingInterrupts, maxInterrupt } = this;
            if (!pendingInterrupts[address]) {
                return;
            }
            pendingInterrupts[address] = null;
            if (this.nextInterrupt === address) {
                this.nextInterrupt = -1;
                for (let i = address + 1; i <= maxInterrupt; i++) {
                    if (pendingInterrupts[i]) {
                        this.nextInterrupt = i;
                        break;
                    }
                }
            }
        }
        clearInterruptByFlag(interrupt, registerValue) {
            const { flagRegister, flagMask } = interrupt;
            if (registerValue & flagMask) {
                this.data[flagRegister] &= ~flagMask;
                this.clearInterrupt(interrupt);
            }
        }
        addClockEvent(callback, cycles) {
            const { clockEventPool } = this;
            cycles = this.cycles + Math.max(1, cycles);
            const maybeEntry = clockEventPool.pop();
            const entry = maybeEntry !== null && maybeEntry !== void 0 ? maybeEntry : { cycles, callback, next: null };
            entry.cycles = cycles;
            entry.callback = callback;
            let { nextClockEvent: clockEvent } = this;
            let lastItem = null;
            while (clockEvent && clockEvent.cycles < cycles) {
                lastItem = clockEvent;
                clockEvent = clockEvent.next;
            }
            if (lastItem) {
                lastItem.next = entry;
                entry.next = clockEvent;
            }
            else {
                this.nextClockEvent = entry;
                entry.next = clockEvent;
            }
            return callback;
        }
        updateClockEvent(callback, cycles) {
            if (this.clearClockEvent(callback)) {
                this.addClockEvent(callback, cycles);
                return true;
            }
            return false;
        }
        clearClockEvent(callback) {
            let { nextClockEvent: clockEvent } = this;
            if (!clockEvent) {
                return false;
            }
            const { clockEventPool } = this;
            let lastItem = null;
            while (clockEvent) {
                if (clockEvent.callback === callback) {
                    if (lastItem) {
                        lastItem.next = clockEvent.next;
                    }
                    else {
                        this.nextClockEvent = clockEvent.next;
                    }
                    if (clockEventPool.length < 10) {
                        clockEventPool.push(clockEvent);
                    }
                    return true;
                }
                lastItem = clockEvent;
                clockEvent = clockEvent.next;
            }
            return false;
        }
        tick() {
            const { nextClockEvent } = this;
            if (nextClockEvent && nextClockEvent.cycles <= this.cycles) {
                nextClockEvent.callback();
                this.nextClockEvent = nextClockEvent.next;
                if (this.clockEventPool.length < 10) {
                    this.clockEventPool.push(nextClockEvent);
                }
            }
            const { nextInterrupt } = this;
            if (this.interruptsEnabled && nextInterrupt >= 0) {
                const interrupt = this.pendingInterrupts[nextInterrupt];
                (0, interrupt_1.avrInterrupt)(this, interrupt.address);
                if (!interrupt.constant) {
                    this.clearInterrupt(interrupt);
                }
            }
        }
    }
    exports.CPU = CPU;
});
define("lib/avr8js/cpu/instruction", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.avrInstruction = void 0;
    function isTwoWordInstruction(opcode) {
        return ((opcode & 0xfe0f) === 0x9000 ||
            (opcode & 0xfe0f) === 0x9200 ||
            (opcode & 0xfe0e) === 0x940e ||
            (opcode & 0xfe0e) === 0x940c);
    }
    function avrInstruction(cpu) {
        const opcode = cpu.progMem[cpu.pc];
        if ((opcode & 0xfc00) === 0x1c00) {
            const d = cpu.data[(opcode & 0x1f0) >> 4];
            const r = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            const sum = d + r + (cpu.data[95] & 1);
            const R = sum & 255;
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= (R ^ r) & (d ^ R) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= sum & 256 ? 1 : 0;
            sreg |= 1 & ((d & r) | (r & ~R) | (~R & d)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0xc00) {
            const d = cpu.data[(opcode & 0x1f0) >> 4];
            const r = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            const R = (d + r) & 255;
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= (R ^ r) & (R ^ d) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= (d + r) & 256 ? 1 : 0;
            sreg |= 1 & ((d & r) | (r & ~R) | (~R & d)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xff00) === 0x9600) {
            const addr = 2 * ((opcode & 0x30) >> 4) + 24;
            const value = cpu.dataView.getUint16(addr, true);
            const R = (value + ((opcode & 0xf) | ((opcode & 0xc0) >> 2))) & 0xffff;
            cpu.dataView.setUint16(addr, R, true);
            let sreg = cpu.data[95] & 0xe0;
            sreg |= R ? 0 : 2;
            sreg |= 0x8000 & R ? 4 : 0;
            sreg |= ~value & R & 0x8000 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= ~R & value & 0x8000 ? 1 : 0;
            cpu.data[95] = sreg;
            cpu.cycles++;
        }
        else if ((opcode & 0xfc00) === 0x2000) {
            const R = cpu.data[(opcode & 0x1f0) >> 4] & cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf000) === 0x7000) {
            const R = cpu.data[((opcode & 0xf0) >> 4) + 16] & ((opcode & 0xf) | ((opcode & 0xf00) >> 4));
            cpu.data[((opcode & 0xf0) >> 4) + 16] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfe0f) === 0x9405) {
            const value = cpu.data[(opcode & 0x1f0) >> 4];
            const R = (value >>> 1) | (128 & value);
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= value & 1;
            sreg |= ((sreg >> 2) & 1) ^ (sreg & 1) ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xff8f) === 0x9488) {
            cpu.data[95] &= ~(1 << ((opcode & 0x70) >> 4));
        }
        else if ((opcode & 0xfe08) === 0xf800) {
            const b = opcode & 7;
            const d = (opcode & 0x1f0) >> 4;
            cpu.data[d] = (~(1 << b) & cpu.data[d]) | (((cpu.data[95] >> 6) & 1) << b);
        }
        else if ((opcode & 0xfc00) === 0xf400) {
            if (!(cpu.data[95] & (1 << (opcode & 7)))) {
                cpu.pc = cpu.pc + (((opcode & 0x1f8) >> 3) - (opcode & 0x200 ? 0x40 : 0));
                cpu.cycles++;
            }
        }
        else if ((opcode & 0xfc00) === 0xf000) {
            if (cpu.data[95] & (1 << (opcode & 7))) {
                cpu.pc = cpu.pc + (((opcode & 0x1f8) >> 3) - (opcode & 0x200 ? 0x40 : 0));
                cpu.cycles++;
            }
        }
        else if ((opcode & 0xff8f) === 0x9408) {
            cpu.data[95] |= 1 << ((opcode & 0x70) >> 4);
        }
        else if ((opcode & 0xfe08) === 0xfa00) {
            const d = cpu.data[(opcode & 0x1f0) >> 4];
            const b = opcode & 7;
            cpu.data[95] = (cpu.data[95] & 0xbf) | ((d >> b) & 1 ? 0x40 : 0);
        }
        else if ((opcode & 0xfe0e) === 0x940e) {
            const k = cpu.progMem[cpu.pc + 1] | ((opcode & 1) << 16) | ((opcode & 0x1f0) << 13);
            const ret = cpu.pc + 2;
            const sp = cpu.dataView.getUint16(93, true);
            const { pc22Bits } = cpu;
            cpu.data[sp] = 255 & ret;
            cpu.data[sp - 1] = (ret >> 8) & 255;
            if (pc22Bits) {
                cpu.data[sp - 2] = (ret >> 16) & 255;
            }
            cpu.dataView.setUint16(93, sp - (pc22Bits ? 3 : 2), true);
            cpu.pc = k - 1;
            cpu.cycles += pc22Bits ? 4 : 3;
        }
        else if ((opcode & 0xff00) === 0x9800) {
            const A = opcode & 0xf8;
            const b = opcode & 7;
            const R = cpu.readData((A >> 3) + 32);
            const mask = 1 << b;
            cpu.writeData((A >> 3) + 32, R & ~mask, mask);
        }
        else if ((opcode & 0xfe0f) === 0x9400) {
            const d = (opcode & 0x1f0) >> 4;
            const R = 255 - cpu.data[d];
            cpu.data[d] = R;
            let sreg = (cpu.data[95] & 0xe1) | 1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0x1400) {
            const val1 = cpu.data[(opcode & 0x1f0) >> 4];
            const val2 = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            const R = val1 - val2;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= 0 !== ((val1 ^ val2) & (val1 ^ R) & 128) ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= val2 > val1 ? 1 : 0;
            sreg |= 1 & ((~val1 & val2) | (val2 & R) | (R & ~val1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0x400) {
            const arg1 = cpu.data[(opcode & 0x1f0) >> 4];
            const arg2 = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            let sreg = cpu.data[95];
            const r = arg1 - arg2 - (sreg & 1);
            sreg = (sreg & 0xc0) | (!r && (sreg >> 1) & 1 ? 2 : 0) | (arg2 + (sreg & 1) > arg1 ? 1 : 0);
            sreg |= 128 & r ? 4 : 0;
            sreg |= (arg1 ^ arg2) & (arg1 ^ r) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= 1 & ((~arg1 & arg2) | (arg2 & r) | (r & ~arg1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf000) === 0x3000) {
            const arg1 = cpu.data[((opcode & 0xf0) >> 4) + 16];
            const arg2 = (opcode & 0xf) | ((opcode & 0xf00) >> 4);
            const r = arg1 - arg2;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= r ? 0 : 2;
            sreg |= 128 & r ? 4 : 0;
            sreg |= (arg1 ^ arg2) & (arg1 ^ r) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= arg2 > arg1 ? 1 : 0;
            sreg |= 1 & ((~arg1 & arg2) | (arg2 & r) | (r & ~arg1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0x1000) {
            if (cpu.data[(opcode & 0x1f0) >> 4] === cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)]) {
                const nextOpcode = cpu.progMem[cpu.pc + 1];
                const skipSize = isTwoWordInstruction(nextOpcode) ? 2 : 1;
                cpu.pc += skipSize;
                cpu.cycles += skipSize;
            }
        }
        else if ((opcode & 0xfe0f) === 0x940a) {
            const value = cpu.data[(opcode & 0x1f0) >> 4];
            const R = value - 1;
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= 128 === value ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if (opcode === 0x9519) {
            const retAddr = cpu.pc + 1;
            const sp = cpu.dataView.getUint16(93, true);
            const eind = cpu.data[0x5c];
            cpu.data[sp] = retAddr & 255;
            cpu.data[sp - 1] = (retAddr >> 8) & 255;
            cpu.data[sp - 2] = (retAddr >> 16) & 255;
            cpu.dataView.setUint16(93, sp - 3, true);
            cpu.pc = ((eind << 16) | cpu.dataView.getUint16(30, true)) - 1;
            cpu.cycles += 3;
        }
        else if (opcode === 0x9419) {
            const eind = cpu.data[0x5c];
            cpu.pc = ((eind << 16) | cpu.dataView.getUint16(30, true)) - 1;
            cpu.cycles++;
        }
        else if (opcode === 0x95d8) {
            const rampz = cpu.data[0x5b];
            cpu.data[0] = cpu.progBytes[(rampz << 16) | cpu.dataView.getUint16(30, true)];
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9006) {
            const rampz = cpu.data[0x5b];
            cpu.data[(opcode & 0x1f0) >> 4] =
                cpu.progBytes[(rampz << 16) | cpu.dataView.getUint16(30, true)];
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9007) {
            const rampz = cpu.data[0x5b];
            const i = cpu.dataView.getUint16(30, true);
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.progBytes[(rampz << 16) | i];
            cpu.dataView.setUint16(30, i + 1, true);
            if (i === 0xffff) {
                cpu.data[0x5b] = (rampz + 1) % (cpu.progBytes.length >> 16);
            }
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfc00) === 0x2400) {
            const R = cpu.data[(opcode & 0x1f0) >> 4] ^ cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xff88) === 0x308) {
            const v1 = cpu.data[((opcode & 0x70) >> 4) + 16];
            const v2 = cpu.data[(opcode & 7) + 16];
            const R = (v1 * v2) << 1;
            cpu.dataView.setUint16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 0 : 2) | ((v1 * v2) & 0x8000 ? 1 : 0);
            cpu.cycles++;
        }
        else if ((opcode & 0xff88) === 0x380) {
            const v1 = cpu.dataView.getInt8(((opcode & 0x70) >> 4) + 16);
            const v2 = cpu.dataView.getInt8((opcode & 7) + 16);
            const R = (v1 * v2) << 1;
            cpu.dataView.setInt16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 0 : 2) | ((v1 * v2) & 0x8000 ? 1 : 0);
            cpu.cycles++;
        }
        else if ((opcode & 0xff88) === 0x388) {
            const v1 = cpu.dataView.getInt8(((opcode & 0x70) >> 4) + 16);
            const v2 = cpu.data[(opcode & 7) + 16];
            const R = (v1 * v2) << 1;
            cpu.dataView.setInt16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 2 : 0) | ((v1 * v2) & 0x8000 ? 1 : 0);
            cpu.cycles++;
        }
        else if (opcode === 0x9509) {
            const retAddr = cpu.pc + 1;
            const sp = cpu.dataView.getUint16(93, true);
            const { pc22Bits } = cpu;
            cpu.data[sp] = retAddr & 255;
            cpu.data[sp - 1] = (retAddr >> 8) & 255;
            if (pc22Bits) {
                cpu.data[sp - 2] = (retAddr >> 16) & 255;
            }
            cpu.dataView.setUint16(93, sp - (pc22Bits ? 3 : 2), true);
            cpu.pc = cpu.dataView.getUint16(30, true) - 1;
            cpu.cycles += pc22Bits ? 3 : 2;
        }
        else if (opcode === 0x9409) {
            cpu.pc = cpu.dataView.getUint16(30, true) - 1;
            cpu.cycles++;
        }
        else if ((opcode & 0xf800) === 0xb000) {
            const i = cpu.readData(((opcode & 0xf) | ((opcode & 0x600) >> 5)) + 32);
            cpu.data[(opcode & 0x1f0) >> 4] = i;
        }
        else if ((opcode & 0xfe0f) === 0x9403) {
            const d = cpu.data[(opcode & 0x1f0) >> 4];
            const r = (d + 1) & 255;
            cpu.data[(opcode & 0x1f0) >> 4] = r;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= r ? 0 : 2;
            sreg |= 128 & r ? 4 : 0;
            sreg |= 127 === d ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfe0e) === 0x940c) {
            cpu.pc = (cpu.progMem[cpu.pc + 1] | ((opcode & 1) << 16) | ((opcode & 0x1f0) << 13)) - 1;
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9206) {
            const r = (opcode & 0x1f0) >> 4;
            const clear = cpu.data[r];
            const value = cpu.readData(cpu.dataView.getUint16(30, true));
            cpu.writeData(cpu.dataView.getUint16(30, true), value & (255 - clear));
            cpu.data[r] = value;
        }
        else if ((opcode & 0xfe0f) === 0x9205) {
            const r = (opcode & 0x1f0) >> 4;
            const set = cpu.data[r];
            const value = cpu.readData(cpu.dataView.getUint16(30, true));
            cpu.writeData(cpu.dataView.getUint16(30, true), value | set);
            cpu.data[r] = value;
        }
        else if ((opcode & 0xfe0f) === 0x9207) {
            const r = cpu.data[(opcode & 0x1f0) >> 4];
            const R = cpu.readData(cpu.dataView.getUint16(30, true));
            cpu.writeData(cpu.dataView.getUint16(30, true), r ^ R);
            cpu.data[(opcode & 0x1f0) >> 4] = R;
        }
        else if ((opcode & 0xf000) === 0xe000) {
            cpu.data[((opcode & 0xf0) >> 4) + 16] = (opcode & 0xf) | ((opcode & 0xf00) >> 4);
        }
        else if ((opcode & 0xfe0f) === 0x9000) {
            cpu.cycles++;
            const value = cpu.readData(cpu.progMem[cpu.pc + 1]);
            cpu.data[(opcode & 0x1f0) >> 4] = value;
            cpu.pc++;
        }
        else if ((opcode & 0xfe0f) === 0x900c) {
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(cpu.dataView.getUint16(26, true));
        }
        else if ((opcode & 0xfe0f) === 0x900d) {
            const x = cpu.dataView.getUint16(26, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(x);
            cpu.dataView.setUint16(26, x + 1, true);
        }
        else if ((opcode & 0xfe0f) === 0x900e) {
            const x = cpu.dataView.getUint16(26, true) - 1;
            cpu.dataView.setUint16(26, x, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(x);
        }
        else if ((opcode & 0xfe0f) === 0x8008) {
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(cpu.dataView.getUint16(28, true));
        }
        else if ((opcode & 0xfe0f) === 0x9009) {
            const y = cpu.dataView.getUint16(28, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(y);
            cpu.dataView.setUint16(28, y + 1, true);
        }
        else if ((opcode & 0xfe0f) === 0x900a) {
            const y = cpu.dataView.getUint16(28, true) - 1;
            cpu.dataView.setUint16(28, y, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(y);
        }
        else if ((opcode & 0xd208) === 0x8008 &&
            (opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)) {
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(cpu.dataView.getUint16(28, true) +
                ((opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)));
        }
        else if ((opcode & 0xfe0f) === 0x8000) {
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(cpu.dataView.getUint16(30, true));
        }
        else if ((opcode & 0xfe0f) === 0x9001) {
            const z = cpu.dataView.getUint16(30, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(z);
            cpu.dataView.setUint16(30, z + 1, true);
        }
        else if ((opcode & 0xfe0f) === 0x9002) {
            const z = cpu.dataView.getUint16(30, true) - 1;
            cpu.dataView.setUint16(30, z, true);
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(z);
        }
        else if ((opcode & 0xd208) === 0x8000 &&
            (opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)) {
            cpu.cycles++;
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.readData(cpu.dataView.getUint16(30, true) +
                ((opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)));
        }
        else if (opcode === 0x95c8) {
            cpu.data[0] = cpu.progBytes[cpu.dataView.getUint16(30, true)];
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9004) {
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.progBytes[cpu.dataView.getUint16(30, true)];
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9005) {
            const i = cpu.dataView.getUint16(30, true);
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.progBytes[i];
            cpu.dataView.setUint16(30, i + 1, true);
            cpu.cycles += 2;
        }
        else if ((opcode & 0xfe0f) === 0x9406) {
            const value = cpu.data[(opcode & 0x1f0) >> 4];
            const R = value >>> 1;
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe0;
            sreg |= R ? 0 : 2;
            sreg |= value & 1;
            sreg |= ((sreg >> 2) & 1) ^ (sreg & 1) ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0x2c00) {
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
        }
        else if ((opcode & 0xff00) === 0x100) {
            const r2 = 2 * (opcode & 0xf);
            const d2 = 2 * ((opcode & 0xf0) >> 4);
            cpu.data[d2] = cpu.data[r2];
            cpu.data[d2 + 1] = cpu.data[r2 + 1];
        }
        else if ((opcode & 0xfc00) === 0x9c00) {
            const R = cpu.data[(opcode & 0x1f0) >> 4] * cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            cpu.dataView.setUint16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 0 : 2) | (0x8000 & R ? 1 : 0);
            cpu.cycles++;
        }
        else if ((opcode & 0xff00) === 0x200) {
            const R = cpu.dataView.getInt8(((opcode & 0xf0) >> 4) + 16) * cpu.dataView.getInt8((opcode & 0xf) + 16);
            cpu.dataView.setInt16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 0 : 2) | (0x8000 & R ? 1 : 0);
            cpu.cycles++;
        }
        else if ((opcode & 0xff88) === 0x300) {
            const R = cpu.dataView.getInt8(((opcode & 0x70) >> 4) + 16) * cpu.data[(opcode & 7) + 16];
            cpu.dataView.setInt16(0, R, true);
            cpu.data[95] = (cpu.data[95] & 0xfc) | (0xffff & R ? 0 : 2) | (0x8000 & R ? 1 : 0);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x9401) {
            const d = (opcode & 0x1f0) >> 4;
            const value = cpu.data[d];
            const R = 0 - value;
            cpu.data[d] = R;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= 128 === R ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= R ? 1 : 0;
            sreg |= 1 & (R | value) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if (opcode === 0) {
        }
        else if ((opcode & 0xfc00) === 0x2800) {
            const R = cpu.data[(opcode & 0x1f0) >> 4] | cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf000) === 0x6000) {
            const R = cpu.data[((opcode & 0xf0) >> 4) + 16] | ((opcode & 0xf) | ((opcode & 0xf00) >> 4));
            cpu.data[((opcode & 0xf0) >> 4) + 16] = R;
            let sreg = cpu.data[95] & 0xe1;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf800) === 0xb800) {
            cpu.writeData(((opcode & 0xf) | ((opcode & 0x600) >> 5)) + 32, cpu.data[(opcode & 0x1f0) >> 4]);
        }
        else if ((opcode & 0xfe0f) === 0x900f) {
            const value = cpu.dataView.getUint16(93, true) + 1;
            cpu.dataView.setUint16(93, value, true);
            cpu.data[(opcode & 0x1f0) >> 4] = cpu.data[value];
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x920f) {
            const value = cpu.dataView.getUint16(93, true);
            cpu.data[value] = cpu.data[(opcode & 0x1f0) >> 4];
            cpu.dataView.setUint16(93, value - 1, true);
            cpu.cycles++;
        }
        else if ((opcode & 0xf000) === 0xd000) {
            const k = (opcode & 0x7ff) - (opcode & 0x800 ? 0x800 : 0);
            const retAddr = cpu.pc + 1;
            const sp = cpu.dataView.getUint16(93, true);
            const { pc22Bits } = cpu;
            cpu.data[sp] = 255 & retAddr;
            cpu.data[sp - 1] = (retAddr >> 8) & 255;
            if (pc22Bits) {
                cpu.data[sp - 2] = (retAddr >> 16) & 255;
            }
            cpu.dataView.setUint16(93, sp - (pc22Bits ? 3 : 2), true);
            cpu.pc += k;
            cpu.cycles += pc22Bits ? 3 : 2;
        }
        else if (opcode === 0x9508) {
            const { pc22Bits } = cpu;
            const i = cpu.dataView.getUint16(93, true) + (pc22Bits ? 3 : 2);
            cpu.dataView.setUint16(93, i, true);
            cpu.pc = (cpu.data[i - 1] << 8) + cpu.data[i] - 1;
            if (pc22Bits) {
                cpu.pc |= cpu.data[i - 2] << 16;
            }
            cpu.cycles += pc22Bits ? 4 : 3;
        }
        else if (opcode === 0x9518) {
            const { pc22Bits } = cpu;
            const i = cpu.dataView.getUint16(93, true) + (pc22Bits ? 3 : 2);
            cpu.dataView.setUint16(93, i, true);
            cpu.pc = (cpu.data[i - 1] << 8) + cpu.data[i] - 1;
            if (pc22Bits) {
                cpu.pc |= cpu.data[i - 2] << 16;
            }
            cpu.cycles += pc22Bits ? 4 : 3;
            cpu.data[95] |= 0x80;
        }
        else if ((opcode & 0xf000) === 0xc000) {
            cpu.pc = cpu.pc + ((opcode & 0x7ff) - (opcode & 0x800 ? 0x800 : 0));
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x9407) {
            const d = cpu.data[(opcode & 0x1f0) >> 4];
            const r = (d >>> 1) | ((cpu.data[95] & 1) << 7);
            cpu.data[(opcode & 0x1f0) >> 4] = r;
            let sreg = cpu.data[95] & 0xe0;
            sreg |= r ? 0 : 2;
            sreg |= 128 & r ? 4 : 0;
            sreg |= 1 & d ? 1 : 0;
            sreg |= ((sreg >> 2) & 1) ^ (sreg & 1) ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfc00) === 0x800) {
            const val1 = cpu.data[(opcode & 0x1f0) >> 4];
            const val2 = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            let sreg = cpu.data[95];
            const R = val1 - val2 - (sreg & 1);
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            sreg = (sreg & 0xc0) | (!R && (sreg >> 1) & 1 ? 2 : 0) | (val2 + (sreg & 1) > val1 ? 1 : 0);
            sreg |= 128 & R ? 4 : 0;
            sreg |= (val1 ^ val2) & (val1 ^ R) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= 1 & ((~val1 & val2) | (val2 & R) | (R & ~val1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf000) === 0x4000) {
            const val1 = cpu.data[((opcode & 0xf0) >> 4) + 16];
            const val2 = (opcode & 0xf) | ((opcode & 0xf00) >> 4);
            let sreg = cpu.data[95];
            const R = val1 - val2 - (sreg & 1);
            cpu.data[((opcode & 0xf0) >> 4) + 16] = R;
            sreg = (sreg & 0xc0) | (!R && (sreg >> 1) & 1 ? 2 : 0) | (val2 + (sreg & 1) > val1 ? 1 : 0);
            sreg |= 128 & R ? 4 : 0;
            sreg |= (val1 ^ val2) & (val1 ^ R) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= 1 & ((~val1 & val2) | (val2 & R) | (R & ~val1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xff00) === 0x9a00) {
            const target = ((opcode & 0xf8) >> 3) + 32;
            const mask = 1 << (opcode & 7);
            cpu.writeData(target, cpu.readData(target) | mask, mask);
            cpu.cycles++;
        }
        else if ((opcode & 0xff00) === 0x9900) {
            const value = cpu.readData(((opcode & 0xf8) >> 3) + 32);
            if (!(value & (1 << (opcode & 7)))) {
                const nextOpcode = cpu.progMem[cpu.pc + 1];
                const skipSize = isTwoWordInstruction(nextOpcode) ? 2 : 1;
                cpu.cycles += skipSize;
                cpu.pc += skipSize;
            }
        }
        else if ((opcode & 0xff00) === 0x9b00) {
            const value = cpu.readData(((opcode & 0xf8) >> 3) + 32);
            if (value & (1 << (opcode & 7))) {
                const nextOpcode = cpu.progMem[cpu.pc + 1];
                const skipSize = isTwoWordInstruction(nextOpcode) ? 2 : 1;
                cpu.cycles += skipSize;
                cpu.pc += skipSize;
            }
        }
        else if ((opcode & 0xff00) === 0x9700) {
            const i = 2 * ((opcode & 0x30) >> 4) + 24;
            const a = cpu.dataView.getUint16(i, true);
            const l = (opcode & 0xf) | ((opcode & 0xc0) >> 2);
            const R = a - l;
            cpu.dataView.setUint16(i, R, true);
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 0x8000 & R ? 4 : 0;
            sreg |= a & ~R & 0x8000 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= l > a ? 1 : 0;
            sreg |= 1 & ((~a & l) | (l & R) | (R & ~a)) ? 0x20 : 0;
            cpu.data[95] = sreg;
            cpu.cycles++;
        }
        else if ((opcode & 0xfe08) === 0xfc00) {
            if (!(cpu.data[(opcode & 0x1f0) >> 4] & (1 << (opcode & 7)))) {
                const nextOpcode = cpu.progMem[cpu.pc + 1];
                const skipSize = isTwoWordInstruction(nextOpcode) ? 2 : 1;
                cpu.cycles += skipSize;
                cpu.pc += skipSize;
            }
        }
        else if ((opcode & 0xfe08) === 0xfe00) {
            if (cpu.data[(opcode & 0x1f0) >> 4] & (1 << (opcode & 7))) {
                const nextOpcode = cpu.progMem[cpu.pc + 1];
                const skipSize = isTwoWordInstruction(nextOpcode) ? 2 : 1;
                cpu.cycles += skipSize;
                cpu.pc += skipSize;
            }
        }
        else if (opcode === 0x9588) {
        }
        else if (opcode === 0x95e8) {
        }
        else if (opcode === 0x95f8) {
        }
        else if ((opcode & 0xfe0f) === 0x9200) {
            const value = cpu.data[(opcode & 0x1f0) >> 4];
            const addr = cpu.progMem[cpu.pc + 1];
            cpu.writeData(addr, value);
            cpu.pc++;
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x920c) {
            cpu.writeData(cpu.dataView.getUint16(26, true), cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x920d) {
            const x = cpu.dataView.getUint16(26, true);
            cpu.writeData(x, cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.dataView.setUint16(26, x + 1, true);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x920e) {
            const i = cpu.data[(opcode & 0x1f0) >> 4];
            const x = cpu.dataView.getUint16(26, true) - 1;
            cpu.dataView.setUint16(26, x, true);
            cpu.writeData(x, i);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x8208) {
            cpu.writeData(cpu.dataView.getUint16(28, true), cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x9209) {
            const i = cpu.data[(opcode & 0x1f0) >> 4];
            const y = cpu.dataView.getUint16(28, true);
            cpu.writeData(y, i);
            cpu.dataView.setUint16(28, y + 1, true);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x920a) {
            const i = cpu.data[(opcode & 0x1f0) >> 4];
            const y = cpu.dataView.getUint16(28, true) - 1;
            cpu.dataView.setUint16(28, y, true);
            cpu.writeData(y, i);
            cpu.cycles++;
        }
        else if ((opcode & 0xd208) === 0x8208 &&
            (opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)) {
            cpu.writeData(cpu.dataView.getUint16(28, true) +
                ((opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)), cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x8200) {
            cpu.writeData(cpu.dataView.getUint16(30, true), cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x9201) {
            const z = cpu.dataView.getUint16(30, true);
            cpu.writeData(z, cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.dataView.setUint16(30, z + 1, true);
            cpu.cycles++;
        }
        else if ((opcode & 0xfe0f) === 0x9202) {
            const i = cpu.data[(opcode & 0x1f0) >> 4];
            const z = cpu.dataView.getUint16(30, true) - 1;
            cpu.dataView.setUint16(30, z, true);
            cpu.writeData(z, i);
            cpu.cycles++;
        }
        else if ((opcode & 0xd208) === 0x8200 &&
            (opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)) {
            cpu.writeData(cpu.dataView.getUint16(30, true) +
                ((opcode & 7) | ((opcode & 0xc00) >> 7) | ((opcode & 0x2000) >> 8)), cpu.data[(opcode & 0x1f0) >> 4]);
            cpu.cycles++;
        }
        else if ((opcode & 0xfc00) === 0x1800) {
            const val1 = cpu.data[(opcode & 0x1f0) >> 4];
            const val2 = cpu.data[(opcode & 0xf) | ((opcode & 0x200) >> 5)];
            const R = val1 - val2;
            cpu.data[(opcode & 0x1f0) >> 4] = R;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= (val1 ^ val2) & (val1 ^ R) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= val2 > val1 ? 1 : 0;
            sreg |= 1 & ((~val1 & val2) | (val2 & R) | (R & ~val1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xf000) === 0x5000) {
            const val1 = cpu.data[((opcode & 0xf0) >> 4) + 16];
            const val2 = (opcode & 0xf) | ((opcode & 0xf00) >> 4);
            const R = val1 - val2;
            cpu.data[((opcode & 0xf0) >> 4) + 16] = R;
            let sreg = cpu.data[95] & 0xc0;
            sreg |= R ? 0 : 2;
            sreg |= 128 & R ? 4 : 0;
            sreg |= (val1 ^ val2) & (val1 ^ R) & 128 ? 8 : 0;
            sreg |= ((sreg >> 2) & 1) ^ ((sreg >> 3) & 1) ? 0x10 : 0;
            sreg |= val2 > val1 ? 1 : 0;
            sreg |= 1 & ((~val1 & val2) | (val2 & R) | (R & ~val1)) ? 0x20 : 0;
            cpu.data[95] = sreg;
        }
        else if ((opcode & 0xfe0f) === 0x9402) {
            const d = (opcode & 0x1f0) >> 4;
            const i = cpu.data[d];
            cpu.data[d] = ((15 & i) << 4) | ((240 & i) >>> 4);
        }
        else if (opcode === 0x95a8) {
            cpu.onWatchdogReset();
        }
        else if ((opcode & 0xfe0f) === 0x9204) {
            const r = (opcode & 0x1f0) >> 4;
            const val1 = cpu.data[r];
            const val2 = cpu.data[cpu.dataView.getUint16(30, true)];
            cpu.data[cpu.dataView.getUint16(30, true)] = val1;
            cpu.data[r] = val2;
        }
        cpu.pc = (cpu.pc + 1) % cpu.progMem.length;
        cpu.cycles++;
    }
    exports.avrInstruction = avrInstruction;
});
define("lib/avr8js/peripherals/adc", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRADC = exports.adcConfig = exports.atmega328Channels = exports.ADCMuxInputType = exports.ADCReference = void 0;
    var ADCReference;
    (function (ADCReference) {
        ADCReference[ADCReference["AVCC"] = 0] = "AVCC";
        ADCReference[ADCReference["AREF"] = 1] = "AREF";
        ADCReference[ADCReference["Internal1V1"] = 2] = "Internal1V1";
        ADCReference[ADCReference["Internal2V56"] = 3] = "Internal2V56";
        ADCReference[ADCReference["Reserved"] = 4] = "Reserved";
    })(ADCReference || (exports.ADCReference = ADCReference = {}));
    var ADCMuxInputType;
    (function (ADCMuxInputType) {
        ADCMuxInputType[ADCMuxInputType["SingleEnded"] = 0] = "SingleEnded";
        ADCMuxInputType[ADCMuxInputType["Differential"] = 1] = "Differential";
        ADCMuxInputType[ADCMuxInputType["Constant"] = 2] = "Constant";
        ADCMuxInputType[ADCMuxInputType["Temperature"] = 3] = "Temperature";
    })(ADCMuxInputType || (exports.ADCMuxInputType = ADCMuxInputType = {}));
    exports.atmega328Channels = {
        0: { type: ADCMuxInputType.SingleEnded, channel: 0 },
        1: { type: ADCMuxInputType.SingleEnded, channel: 1 },
        2: { type: ADCMuxInputType.SingleEnded, channel: 2 },
        3: { type: ADCMuxInputType.SingleEnded, channel: 3 },
        4: { type: ADCMuxInputType.SingleEnded, channel: 4 },
        5: { type: ADCMuxInputType.SingleEnded, channel: 5 },
        6: { type: ADCMuxInputType.SingleEnded, channel: 6 },
        7: { type: ADCMuxInputType.SingleEnded, channel: 7 },
        8: { type: ADCMuxInputType.Temperature },
        14: { type: ADCMuxInputType.Constant, voltage: 1.1 },
        15: { type: ADCMuxInputType.Constant, voltage: 0 },
    };
    const fallbackMuxInput = {
        type: ADCMuxInputType.Constant,
        voltage: 0,
    };
    exports.adcConfig = {
        ADMUX: 0x7c,
        ADCSRA: 0x7a,
        ADCSRB: 0x7b,
        ADCL: 0x78,
        ADCH: 0x79,
        DIDR0: 0x7e,
        adcInterrupt: 0x2a,
        numChannels: 8,
        muxInputMask: 0xf,
        muxChannels: exports.atmega328Channels,
        adcReferences: [
            ADCReference.AREF,
            ADCReference.AVCC,
            ADCReference.Reserved,
            ADCReference.Internal1V1,
        ],
    };
    const ADPS_MASK = 0x7;
    const ADIE = 0x8;
    const ADIF = 0x10;
    const ADSC = 0x40;
    const ADEN = 0x80;
    const MUX_MASK = 0x1f;
    const ADLAR = 0x20;
    const MUX5 = 0x8;
    const REFS2 = 0x8;
    const REFS_MASK = 0x3;
    const REFS_SHIFT = 6;
    class AVRADC {
        constructor(cpu, config) {
            this.cpu = cpu;
            this.config = config;
            this.channelValues = new Array(this.config.numChannels);
            this.avcc = 5;
            this.aref = 5;
            this.onADCRead = (input) => {
                var _a;
                let voltage = 0;
                switch (input.type) {
                    case ADCMuxInputType.Constant:
                        voltage = input.voltage;
                        break;
                    case ADCMuxInputType.SingleEnded:
                        voltage = (_a = this.channelValues[input.channel]) !== null && _a !== void 0 ? _a : 0;
                        break;
                    case ADCMuxInputType.Differential:
                        voltage =
                            input.gain *
                                ((this.channelValues[input.positiveChannel] || 0) -
                                    (this.channelValues[input.negativeChannel] || 0));
                        break;
                    case ADCMuxInputType.Temperature:
                        voltage = 0.378125;
                        break;
                }
                const rawValue = (voltage / this.referenceVoltage) * 1024;
                const result = Math.min(Math.max(Math.floor(rawValue), 0), 1023);
                this.cpu.addClockEvent(() => this.completeADCRead(result), this.sampleCycles);
            };
            this.converting = false;
            this.conversionCycles = 25;
            this.ADC = {
                address: this.config.adcInterrupt,
                flagRegister: this.config.ADCSRA,
                flagMask: ADIF,
                enableRegister: this.config.ADCSRA,
                enableMask: ADIE,
            };
            cpu.writeHooks[config.ADCSRA] = (value, oldValue) => {
                var _a;
                if (value & ADEN && !(oldValue && ADEN)) {
                    this.conversionCycles = 25;
                }
                cpu.data[config.ADCSRA] = value;
                cpu.updateInterruptEnable(this.ADC, value);
                if (!this.converting && value & ADSC) {
                    if (!(value & ADEN)) {
                        this.cpu.addClockEvent(() => this.completeADCRead(0), this.sampleCycles);
                        return true;
                    }
                    let channel = this.cpu.data[this.config.ADMUX] & MUX_MASK;
                    if (cpu.data[config.ADCSRB] & MUX5) {
                        channel |= 0x20;
                    }
                    channel &= config.muxInputMask;
                    const muxInput = (_a = config.muxChannels[channel]) !== null && _a !== void 0 ? _a : fallbackMuxInput;
                    this.converting = true;
                    this.onADCRead(muxInput);
                    return true;
                }
            };
        }
        completeADCRead(value) {
            const { ADCL, ADCH, ADMUX, ADCSRA } = this.config;
            this.converting = false;
            this.conversionCycles = 13;
            if (this.cpu.data[ADMUX] & ADLAR) {
                this.cpu.data[ADCL] = (value << 6) & 0xff;
                this.cpu.data[ADCH] = value >> 2;
            }
            else {
                this.cpu.data[ADCL] = value & 0xff;
                this.cpu.data[ADCH] = (value >> 8) & 0x3;
            }
            this.cpu.data[ADCSRA] &= ~ADSC;
            this.cpu.setInterruptFlag(this.ADC);
        }
        get prescaler() {
            const { ADCSRA } = this.config;
            const adcsra = this.cpu.data[ADCSRA];
            const adps = adcsra & ADPS_MASK;
            switch (adps) {
                case 0:
                case 1:
                    return 2;
                case 2:
                    return 4;
                case 3:
                    return 8;
                case 4:
                    return 16;
                case 5:
                    return 32;
                case 6:
                    return 64;
                case 7:
                default:
                    return 128;
            }
        }
        get referenceVoltageType() {
            var _a;
            const { ADMUX, adcReferences } = this.config;
            let refs = (this.cpu.data[ADMUX] >> REFS_SHIFT) & REFS_MASK;
            if (adcReferences.length > 4 && this.cpu.data[ADMUX] & REFS2) {
                refs |= 0x4;
            }
            return (_a = adcReferences[refs]) !== null && _a !== void 0 ? _a : ADCReference.Reserved;
        }
        get referenceVoltage() {
            switch (this.referenceVoltageType) {
                case ADCReference.AVCC:
                    return this.avcc;
                case ADCReference.AREF:
                    return this.aref;
                case ADCReference.Internal1V1:
                    return 1.1;
                case ADCReference.Internal2V56:
                    return 2.56;
                default:
                    return this.avcc;
            }
        }
        get sampleCycles() {
            return this.conversionCycles * this.prescaler;
        }
    }
    exports.AVRADC = AVRADC;
});
define("lib/avr8js/peripherals/clock", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRClock = exports.clockConfig = void 0;
    const CLKPCE = 128;
    exports.clockConfig = {
        CLKPR: 0x61,
    };
    const prescalers = [
        1, 2, 4, 8, 16, 32, 64, 128, 256,
        2, 4, 8, 16, 32, 64, 128,
    ];
    class AVRClock {
        constructor(cpu, baseFreqHz, config = exports.clockConfig) {
            this.cpu = cpu;
            this.baseFreqHz = baseFreqHz;
            this.config = config;
            this.clockEnabledCycles = 0;
            this.prescalerValue = 1;
            this.cyclesDelta = 0;
            this.cpu.writeHooks[this.config.CLKPR] = (clkpr) => {
                if ((!this.clockEnabledCycles || this.clockEnabledCycles < cpu.cycles) && clkpr === CLKPCE) {
                    this.clockEnabledCycles = this.cpu.cycles + 4;
                }
                else if (this.clockEnabledCycles && this.clockEnabledCycles >= cpu.cycles) {
                    this.clockEnabledCycles = 0;
                    const index = clkpr & 0xf;
                    const oldPrescaler = this.prescalerValue;
                    this.prescalerValue = prescalers[index];
                    this.cpu.data[this.config.CLKPR] = index;
                    if (oldPrescaler !== this.prescalerValue) {
                        this.cyclesDelta =
                            (cpu.cycles + this.cyclesDelta) * (oldPrescaler / this.prescalerValue) - cpu.cycles;
                    }
                }
                return true;
            };
        }
        get frequency() {
            return this.baseFreqHz / this.prescalerValue;
        }
        get prescaler() {
            return this.prescalerValue;
        }
        get timeNanos() {
            return ((this.cpu.cycles + this.cyclesDelta) / this.frequency) * 1e9;
        }
        get timeMicros() {
            return ((this.cpu.cycles + this.cyclesDelta) / this.frequency) * 1e6;
        }
        get timeMillis() {
            return ((this.cpu.cycles + this.cyclesDelta) / this.frequency) * 1e3;
        }
    }
    exports.AVRClock = AVRClock;
});
define("lib/avr8js/peripherals/eeprom", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVREEPROM = exports.eepromConfig = exports.EEPROMMemoryBackend = void 0;
    class EEPROMMemoryBackend {
        constructor(size) {
            this.memory = new Uint8Array(size);
            this.memory.fill(0xff);
        }
        readMemory(addr) {
            return this.memory[addr];
        }
        writeMemory(addr, value) {
            this.memory[addr] &= value;
        }
        eraseMemory(addr) {
            this.memory[addr] = 0xff;
        }
    }
    exports.EEPROMMemoryBackend = EEPROMMemoryBackend;
    exports.eepromConfig = {
        eepromReadyInterrupt: 0x2c,
        EECR: 0x3f,
        EEDR: 0x40,
        EEARL: 0x41,
        EEARH: 0x42,
        eraseCycles: 28800,
        writeCycles: 28800,
    };
    const EERE = 1 << 0;
    const EEPE = 1 << 1;
    const EEMPE = 1 << 2;
    const EERIE = 1 << 3;
    const EEPM0 = 1 << 4;
    const EEPM1 = 1 << 5;
    const EECR_WRITE_MASK = EEPE | EEMPE | EERIE | EEPM0 | EEPM1;
    class AVREEPROM {
        constructor(cpu, backend, config = exports.eepromConfig) {
            this.cpu = cpu;
            this.backend = backend;
            this.config = config;
            this.writeEnabledCycles = 0;
            this.writeCompleteCycles = 0;
            this.EER = {
                address: this.config.eepromReadyInterrupt,
                flagRegister: this.config.EECR,
                flagMask: EEPE,
                enableRegister: this.config.EECR,
                enableMask: EERIE,
                constant: true,
                inverseFlag: true,
            };
            this.cpu.writeHooks[this.config.EECR] = (eecr) => {
                const { EEARH, EEARL, EECR, EEDR } = this.config;
                const addr = (this.cpu.data[EEARH] << 8) | this.cpu.data[EEARL];
                this.cpu.data[EECR] = (this.cpu.data[EECR] & ~EECR_WRITE_MASK) | (eecr & EECR_WRITE_MASK);
                this.cpu.updateInterruptEnable(this.EER, eecr);
                if (eecr & EERE) {
                    this.cpu.clearInterrupt(this.EER);
                }
                if (eecr & EEMPE) {
                    const eempeCycles = 4;
                    this.writeEnabledCycles = this.cpu.cycles + eempeCycles;
                    this.cpu.addClockEvent(() => {
                        this.cpu.data[EECR] &= ~EEMPE;
                    }, eempeCycles);
                }
                if (eecr & EERE) {
                    this.cpu.data[EEDR] = this.backend.readMemory(addr);
                    this.cpu.cycles += 4;
                    return true;
                }
                if (eecr & EEPE) {
                    if (this.cpu.cycles >= this.writeEnabledCycles) {
                        this.cpu.data[EECR] &= ~EEPE;
                        return true;
                    }
                    if (this.cpu.cycles < this.writeCompleteCycles) {
                        return true;
                    }
                    const eedr = this.cpu.data[EEDR];
                    this.writeCompleteCycles = this.cpu.cycles;
                    if (!(eecr & EEPM1)) {
                        this.backend.eraseMemory(addr);
                        this.writeCompleteCycles += this.config.eraseCycles;
                    }
                    if (!(eecr & EEPM0)) {
                        this.backend.writeMemory(addr, eedr);
                        this.writeCompleteCycles += this.config.writeCycles;
                    }
                    this.cpu.data[EECR] |= EEPE;
                    this.cpu.addClockEvent(() => {
                        this.cpu.setInterruptFlag(this.EER);
                    }, this.writeCompleteCycles - this.cpu.cycles);
                    this.cpu.cycles += 2;
                }
                return true;
            };
        }
    }
    exports.AVREEPROM = AVREEPROM;
});
define("lib/avr8js/peripherals/spi", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRSPI = exports.spiConfig = void 0;
    const SPCR_SPIE = 0x80;
    const SPCR_SPE = 0x40;
    const SPCR_DORD = 0x20;
    const SPCR_MSTR = 0x10;
    const SPCR_CPOL = 0x8;
    const SPCR_CPHA = 0x4;
    const SPCR_SPR1 = 0x2;
    const SPCR_SPR0 = 0x1;
    const SPSR_SPR_MASK = SPCR_SPR1 | SPCR_SPR0;
    const SPSR_SPIF = 0x80;
    const SPSR_WCOL = 0x40;
    const SPSR_SPI2X = 0x1;
    exports.spiConfig = {
        spiInterrupt: 0x22,
        SPCR: 0x4c,
        SPSR: 0x4d,
        SPDR: 0x4e,
    };
    const bitsPerByte = 8;
    class AVRSPI {
        constructor(cpu, config, freqHz) {
            this.cpu = cpu;
            this.config = config;
            this.freqHz = freqHz;
            this.onTransfer = () => 0;
            this.onByte = (value) => {
                this.listeners.forEach((onByteFn) => onByteFn(value));
            };
            this.transmissionActive = false;
            this.listeners = [];
            this.SPI = {
                address: this.config.spiInterrupt,
                flagRegister: this.config.SPSR,
                flagMask: SPSR_SPIF,
                enableRegister: this.config.SPCR,
                enableMask: SPCR_SPIE,
            };
            const { SPCR, SPSR, SPDR } = config;
            cpu.writeHooks[SPDR] = (value) => {
                if (!(cpu.data[SPCR] & SPCR_SPE)) {
                    return;
                }
                if (this.transmissionActive) {
                    cpu.data[SPSR] |= SPSR_WCOL;
                    return true;
                }
                cpu.data[SPSR] &= ~SPSR_WCOL;
                this.cpu.clearInterrupt(this.SPI);
                this.transmissionActive = true;
                this.onByte(value);
                return true;
            };
            cpu.writeHooks[SPCR] = (value) => {
                this.cpu.updateInterruptEnable(this.SPI, value);
            };
            cpu.writeHooks[SPSR] = (value) => {
                this.cpu.data[SPSR] = value;
                this.cpu.clearInterruptByFlag(this.SPI, value);
            };
        }
        addListener(listener) {
            this.listeners.push(listener);
        }
        removeListener(listener) {
            this.listeners = this.listeners.filter((l) => l !== listener);
        }
        reset() {
            this.transmissionActive = false;
        }
        completeTransfer(receivedByte) {
            const { SPDR } = this.config;
            this.cpu.data[SPDR] = receivedByte;
            this.cpu.setInterruptFlag(this.SPI);
            this.transmissionActive = false;
        }
        get isMaster() {
            return this.cpu.data[this.config.SPCR] & SPCR_MSTR ? true : false;
        }
        get dataOrder() {
            return this.cpu.data[this.config.SPCR] & SPCR_DORD ? 'lsbFirst' : 'msbFirst';
        }
        get spiMode() {
            const CPHA = this.cpu.data[this.config.SPCR] & SPCR_CPHA;
            const CPOL = this.cpu.data[this.config.SPCR] & SPCR_CPOL;
            return ((CPHA ? 2 : 0) | (CPOL ? 1 : 0));
        }
        get clockDivider() {
            const base = this.cpu.data[this.config.SPSR] & SPSR_SPI2X ? 2 : 4;
            switch (this.cpu.data[this.config.SPCR] & SPSR_SPR_MASK) {
                case 0b00:
                    return base;
                case 0b01:
                    return base * 4;
                case 0b10:
                    return base * 16;
                case 0b11:
                    return base * 32;
            }
            throw new Error('Invalid divider value!');
        }
        get transferCycles() {
            return this.clockDivider * bitsPerByte;
        }
        get spiFrequency() {
            return this.freqHz / this.clockDivider;
        }
    }
    exports.AVRSPI = AVRSPI;
});
define("lib/avr8js/peripherals/timer", ["require", "exports", "lib/avr8js/peripherals/gpio"], function (require, exports, gpio_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRTimer = exports.timer2Config = exports.timer1Config = exports.timer0Config = void 0;
    const timer01Dividers = {
        0: 0,
        1: 1,
        2: 8,
        3: 64,
        4: 256,
        5: 1024,
        6: 0,
        7: 0,
    };
    var ExternalClockMode;
    (function (ExternalClockMode) {
        ExternalClockMode[ExternalClockMode["FallingEdge"] = 6] = "FallingEdge";
        ExternalClockMode[ExternalClockMode["RisingEdge"] = 7] = "RisingEdge";
    })(ExternalClockMode || (ExternalClockMode = {}));
    const defaultTimerBits = {
        TOV: 1,
        OCFA: 2,
        OCFB: 4,
        OCFC: 0,
        TOIE: 1,
        OCIEA: 2,
        OCIEB: 4,
        OCIEC: 0,
    };
    exports.timer0Config = Object.assign({ bits: 8, captureInterrupt: 0, compAInterrupt: 0x1c, compBInterrupt: 0x1e, compCInterrupt: 0, ovfInterrupt: 0x20, TIFR: 0x35, OCRA: 0x47, OCRB: 0x48, OCRC: 0, ICR: 0, TCNT: 0x46, TCCRA: 0x44, TCCRB: 0x45, TCCRC: 0, TIMSK: 0x6e, dividers: timer01Dividers, compPortA: gpio_1.portDConfig.PORT, compPinA: 6, compPortB: gpio_1.portDConfig.PORT, compPinB: 5, compPortC: 0, compPinC: 0, externalClockPort: gpio_1.portDConfig.PORT, externalClockPin: 4 }, defaultTimerBits);
    exports.timer1Config = Object.assign({ bits: 16, captureInterrupt: 0x14, compAInterrupt: 0x16, compBInterrupt: 0x18, compCInterrupt: 0, ovfInterrupt: 0x1a, TIFR: 0x36, OCRA: 0x88, OCRB: 0x8a, OCRC: 0, ICR: 0x86, TCNT: 0x84, TCCRA: 0x80, TCCRB: 0x81, TCCRC: 0x82, TIMSK: 0x6f, dividers: timer01Dividers, compPortA: gpio_1.portBConfig.PORT, compPinA: 1, compPortB: gpio_1.portBConfig.PORT, compPinB: 2, compPortC: 0, compPinC: 0, externalClockPort: gpio_1.portDConfig.PORT, externalClockPin: 5 }, defaultTimerBits);
    exports.timer2Config = Object.assign({ bits: 8, captureInterrupt: 0, compAInterrupt: 0x0e, compBInterrupt: 0x10, compCInterrupt: 0, ovfInterrupt: 0x12, TIFR: 0x37, OCRA: 0xb3, OCRB: 0xb4, OCRC: 0, ICR: 0, TCNT: 0xb2, TCCRA: 0xb0, TCCRB: 0xb1, TCCRC: 0, TIMSK: 0x70, dividers: {
            0: 0,
            1: 1,
            2: 8,
            3: 32,
            4: 64,
            5: 128,
            6: 256,
            7: 1024,
        }, compPortA: gpio_1.portBConfig.PORT, compPinA: 3, compPortB: gpio_1.portDConfig.PORT, compPinB: 3, compPortC: 0, compPinC: 0, externalClockPort: 0, externalClockPin: 0 }, defaultTimerBits);
    var TimerMode;
    (function (TimerMode) {
        TimerMode[TimerMode["Normal"] = 0] = "Normal";
        TimerMode[TimerMode["PWMPhaseCorrect"] = 1] = "PWMPhaseCorrect";
        TimerMode[TimerMode["CTC"] = 2] = "CTC";
        TimerMode[TimerMode["FastPWM"] = 3] = "FastPWM";
        TimerMode[TimerMode["PWMPhaseFrequencyCorrect"] = 4] = "PWMPhaseFrequencyCorrect";
        TimerMode[TimerMode["Reserved"] = 5] = "Reserved";
    })(TimerMode || (TimerMode = {}));
    var TOVUpdateMode;
    (function (TOVUpdateMode) {
        TOVUpdateMode[TOVUpdateMode["Max"] = 0] = "Max";
        TOVUpdateMode[TOVUpdateMode["Top"] = 1] = "Top";
        TOVUpdateMode[TOVUpdateMode["Bottom"] = 2] = "Bottom";
    })(TOVUpdateMode || (TOVUpdateMode = {}));
    var OCRUpdateMode;
    (function (OCRUpdateMode) {
        OCRUpdateMode[OCRUpdateMode["Immediate"] = 0] = "Immediate";
        OCRUpdateMode[OCRUpdateMode["Top"] = 1] = "Top";
        OCRUpdateMode[OCRUpdateMode["Bottom"] = 2] = "Bottom";
    })(OCRUpdateMode || (OCRUpdateMode = {}));
    const TopOCRA = 1;
    const TopICR = 2;
    const OCToggle = 1;
    const { Normal, PWMPhaseCorrect, CTC, FastPWM, Reserved, PWMPhaseFrequencyCorrect } = TimerMode;
    const wgmModes8Bit = [
        [Normal, 0xff, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [PWMPhaseCorrect, 0xff, OCRUpdateMode.Top, TOVUpdateMode.Bottom, 0],
        [CTC, TopOCRA, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [FastPWM, 0xff, OCRUpdateMode.Bottom, TOVUpdateMode.Max, 0],
        [Reserved, 0xff, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [PWMPhaseCorrect, TopOCRA, OCRUpdateMode.Top, TOVUpdateMode.Bottom, OCToggle],
        [Reserved, 0xff, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [FastPWM, TopOCRA, OCRUpdateMode.Bottom, TOVUpdateMode.Top, OCToggle],
    ];
    const wgmModes16Bit = [
        [Normal, 0xffff, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [PWMPhaseCorrect, 0x00ff, OCRUpdateMode.Top, TOVUpdateMode.Bottom, 0],
        [PWMPhaseCorrect, 0x01ff, OCRUpdateMode.Top, TOVUpdateMode.Bottom, 0],
        [PWMPhaseCorrect, 0x03ff, OCRUpdateMode.Top, TOVUpdateMode.Bottom, 0],
        [CTC, TopOCRA, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [FastPWM, 0x00ff, OCRUpdateMode.Bottom, TOVUpdateMode.Top, 0],
        [FastPWM, 0x01ff, OCRUpdateMode.Bottom, TOVUpdateMode.Top, 0],
        [FastPWM, 0x03ff, OCRUpdateMode.Bottom, TOVUpdateMode.Top, 0],
        [PWMPhaseFrequencyCorrect, TopICR, OCRUpdateMode.Bottom, TOVUpdateMode.Bottom, 0],
        [PWMPhaseFrequencyCorrect, TopOCRA, OCRUpdateMode.Bottom, TOVUpdateMode.Bottom, OCToggle],
        [PWMPhaseCorrect, TopICR, OCRUpdateMode.Top, TOVUpdateMode.Bottom, 0],
        [PWMPhaseCorrect, TopOCRA, OCRUpdateMode.Top, TOVUpdateMode.Bottom, OCToggle],
        [CTC, TopICR, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [Reserved, 0xffff, OCRUpdateMode.Immediate, TOVUpdateMode.Max, 0],
        [FastPWM, TopICR, OCRUpdateMode.Bottom, TOVUpdateMode.Top, OCToggle],
        [FastPWM, TopOCRA, OCRUpdateMode.Bottom, TOVUpdateMode.Top, OCToggle],
    ];
    function compToOverride(comp) {
        switch (comp) {
            case 1:
                return gpio_1.PinOverrideMode.Toggle;
            case 2:
                return gpio_1.PinOverrideMode.Clear;
            case 3:
                return gpio_1.PinOverrideMode.Set;
            default:
                return gpio_1.PinOverrideMode.Enable;
        }
    }
    const FOCA = 1 << 7;
    const FOCB = 1 << 6;
    const FOCC = 1 << 5;
    class AVRTimer {
        constructor(cpu, config) {
            this.cpu = cpu;
            this.config = config;
            this.MAX = this.config.bits === 16 ? 0xffff : 0xff;
            this.lastCycle = 0;
            this.ocrA = 0;
            this.nextOcrA = 0;
            this.ocrB = 0;
            this.nextOcrB = 0;
            this.hasOCRC = this.config.OCRC > 0;
            this.ocrC = 0;
            this.nextOcrC = 0;
            this.ocrUpdateMode = OCRUpdateMode.Immediate;
            this.tovUpdateMode = TOVUpdateMode.Max;
            this.icr = 0;
            this.tcnt = 0;
            this.tcntNext = 0;
            this.tcntUpdated = false;
            this.updateDivider = false;
            this.countingUp = true;
            this.divider = 0;
            this.externalClockRisingEdge = false;
            this.highByteTemp = 0;
            this.OVF = {
                address: this.config.ovfInterrupt,
                flagRegister: this.config.TIFR,
                flagMask: this.config.TOV,
                enableRegister: this.config.TIMSK,
                enableMask: this.config.TOIE,
            };
            this.OCFA = {
                address: this.config.compAInterrupt,
                flagRegister: this.config.TIFR,
                flagMask: this.config.OCFA,
                enableRegister: this.config.TIMSK,
                enableMask: this.config.OCIEA,
            };
            this.OCFB = {
                address: this.config.compBInterrupt,
                flagRegister: this.config.TIFR,
                flagMask: this.config.OCFB,
                enableRegister: this.config.TIMSK,
                enableMask: this.config.OCIEB,
            };
            this.OCFC = {
                address: this.config.compCInterrupt,
                flagRegister: this.config.TIFR,
                flagMask: this.config.OCFC,
                enableRegister: this.config.TIMSK,
                enableMask: this.config.OCIEC,
            };
            this.count = (reschedule = true, external = false) => {
                const { divider, lastCycle, cpu } = this;
                const { cycles } = cpu;
                const delta = cycles - lastCycle;
                if ((divider && delta >= divider) || external) {
                    const counterDelta = external ? 1 : Math.floor(delta / divider);
                    this.lastCycle += counterDelta * divider;
                    const val = this.tcnt;
                    const { timerMode, TOP } = this;
                    const phasePwm = timerMode === PWMPhaseCorrect || timerMode === PWMPhaseFrequencyCorrect;
                    const newVal = phasePwm
                        ? this.phasePwmCount(val, counterDelta)
                        : (val + counterDelta) % (TOP + 1);
                    const overflow = val + counterDelta > TOP;
                    if (!this.tcntUpdated) {
                        this.tcnt = newVal;
                        if (!phasePwm) {
                            this.timerUpdated(newVal, val);
                        }
                    }
                    if (!phasePwm) {
                        if (timerMode === FastPWM && overflow) {
                            const { compA, compB } = this;
                            if (compA) {
                                this.updateCompPin(compA, 'A', true);
                            }
                            if (compB) {
                                this.updateCompPin(compB, 'B', true);
                            }
                        }
                        if (this.ocrUpdateMode == OCRUpdateMode.Bottom && overflow) {
                            this.ocrA = this.nextOcrA;
                            this.ocrB = this.nextOcrB;
                            this.ocrC = this.nextOcrC;
                        }
                        if (overflow && (this.tovUpdateMode == TOVUpdateMode.Top || TOP === this.MAX)) {
                            cpu.setInterruptFlag(this.OVF);
                        }
                    }
                }
                if (this.tcntUpdated) {
                    this.tcnt = this.tcntNext;
                    this.tcntUpdated = false;
                    if ((this.tcnt === 0 && this.ocrUpdateMode === OCRUpdateMode.Bottom) ||
                        (this.tcnt === this.TOP && this.ocrUpdateMode === OCRUpdateMode.Top)) {
                        this.ocrA = this.nextOcrA;
                        this.ocrB = this.nextOcrB;
                        this.ocrC = this.nextOcrC;
                    }
                }
                if (this.updateDivider) {
                    const { CS } = this;
                    const { externalClockPin } = this.config;
                    const newDivider = this.config.dividers[CS];
                    this.lastCycle = newDivider ? this.cpu.cycles : 0;
                    this.updateDivider = false;
                    this.divider = newDivider;
                    if (this.config.externalClockPort && !this.externalClockPort) {
                        this.externalClockPort = this.cpu.gpioByPort[this.config.externalClockPort];
                    }
                    if (this.externalClockPort) {
                        this.externalClockPort.externalClockListeners[externalClockPin] = null;
                    }
                    if (newDivider) {
                        cpu.addClockEvent(this.count, this.lastCycle + newDivider - cpu.cycles);
                    }
                    else if (this.externalClockPort &&
                        (CS === ExternalClockMode.FallingEdge || CS === ExternalClockMode.RisingEdge)) {
                        this.externalClockPort.externalClockListeners[externalClockPin] =
                            this.externalClockCallback;
                        this.externalClockRisingEdge = CS === ExternalClockMode.RisingEdge;
                    }
                    return;
                }
                if (reschedule && divider) {
                    cpu.addClockEvent(this.count, this.lastCycle + divider - cpu.cycles);
                }
            };
            this.externalClockCallback = (value) => {
                if (value === this.externalClockRisingEdge) {
                    this.count(false, true);
                }
            };
            this.updateWGMConfig();
            this.cpu.readHooks[config.TCNT] = (addr) => {
                this.count(false);
                if (this.config.bits === 16) {
                    this.cpu.data[addr + 1] = this.tcnt >> 8;
                }
                return (this.cpu.data[addr] = this.tcnt & 0xff);
            };
            this.cpu.writeHooks[config.TCNT] = (value) => {
                this.tcntNext = (this.highByteTemp << 8) | value;
                this.countingUp = true;
                this.tcntUpdated = true;
                this.cpu.updateClockEvent(this.count, 0);
                if (this.divider) {
                    this.timerUpdated(this.tcntNext, this.tcntNext);
                }
            };
            this.cpu.writeHooks[config.OCRA] = (value) => {
                this.nextOcrA = (this.highByteTemp << 8) | value;
                if (this.ocrUpdateMode === OCRUpdateMode.Immediate) {
                    this.ocrA = this.nextOcrA;
                }
            };
            this.cpu.writeHooks[config.OCRB] = (value) => {
                this.nextOcrB = (this.highByteTemp << 8) | value;
                if (this.ocrUpdateMode === OCRUpdateMode.Immediate) {
                    this.ocrB = this.nextOcrB;
                }
            };
            if (this.hasOCRC) {
                this.cpu.writeHooks[config.OCRC] = (value) => {
                    this.nextOcrC = (this.highByteTemp << 8) | value;
                    if (this.ocrUpdateMode === OCRUpdateMode.Immediate) {
                        this.ocrC = this.nextOcrC;
                    }
                };
            }
            if (this.config.bits === 16) {
                this.cpu.writeHooks[config.ICR] = (value) => {
                    this.icr = (this.highByteTemp << 8) | value;
                };
                const updateTempRegister = (value) => {
                    this.highByteTemp = value;
                };
                const updateOCRHighRegister = (value, old, addr) => {
                    this.highByteTemp = value & (this.ocrMask >> 8);
                    cpu.data[addr] = this.highByteTemp;
                    return true;
                };
                this.cpu.writeHooks[config.TCNT + 1] = updateTempRegister;
                this.cpu.writeHooks[config.OCRA + 1] = updateOCRHighRegister;
                this.cpu.writeHooks[config.OCRB + 1] = updateOCRHighRegister;
                if (this.hasOCRC) {
                    this.cpu.writeHooks[config.OCRC + 1] = updateOCRHighRegister;
                }
                this.cpu.writeHooks[config.ICR + 1] = updateTempRegister;
            }
            cpu.writeHooks[config.TCCRA] = (value) => {
                this.cpu.data[config.TCCRA] = value;
                this.updateWGMConfig();
                return true;
            };
            cpu.writeHooks[config.TCCRB] = (value) => {
                if (!config.TCCRC) {
                    this.checkForceCompare(value);
                    value &= ~(FOCA | FOCB);
                }
                this.cpu.data[config.TCCRB] = value;
                this.updateDivider = true;
                this.cpu.clearClockEvent(this.count);
                this.cpu.addClockEvent(this.count, 0);
                this.updateWGMConfig();
                return true;
            };
            if (config.TCCRC) {
                cpu.writeHooks[config.TCCRC] = (value) => {
                    this.checkForceCompare(value);
                };
            }
            cpu.writeHooks[config.TIFR] = (value) => {
                this.cpu.data[config.TIFR] = value;
                this.cpu.clearInterruptByFlag(this.OVF, value);
                this.cpu.clearInterruptByFlag(this.OCFA, value);
                this.cpu.clearInterruptByFlag(this.OCFB, value);
                return true;
            };
            cpu.writeHooks[config.TIMSK] = (value) => {
                this.cpu.updateInterruptEnable(this.OVF, value);
                this.cpu.updateInterruptEnable(this.OCFA, value);
                this.cpu.updateInterruptEnable(this.OCFB, value);
            };
        }
        reset() {
            this.divider = 0;
            this.lastCycle = 0;
            this.ocrA = 0;
            this.nextOcrA = 0;
            this.ocrB = 0;
            this.nextOcrB = 0;
            this.ocrC = 0;
            this.nextOcrC = 0;
            this.icr = 0;
            this.tcnt = 0;
            this.tcntNext = 0;
            this.tcntUpdated = false;
            this.countingUp = false;
            this.updateDivider = true;
        }
        get TCCRA() {
            return this.cpu.data[this.config.TCCRA];
        }
        get TCCRB() {
            return this.cpu.data[this.config.TCCRB];
        }
        get TIMSK() {
            return this.cpu.data[this.config.TIMSK];
        }
        get CS() {
            return (this.TCCRB & 0x7);
        }
        get WGM() {
            const mask = this.config.bits === 16 ? 0x18 : 0x8;
            return ((this.TCCRB & mask) >> 1) | (this.TCCRA & 0x3);
        }
        get TOP() {
            switch (this.topValue) {
                case TopOCRA:
                    return this.ocrA;
                case TopICR:
                    return this.icr;
                default:
                    return this.topValue;
            }
        }
        get ocrMask() {
            switch (this.topValue) {
                case TopOCRA:
                case TopICR:
                    return 0xffff;
                default:
                    return this.topValue;
            }
        }
        get debugTCNT() {
            return this.tcnt;
        }
        updateWGMConfig() {
            const { config, WGM } = this;
            const wgmModes = config.bits === 16 ? wgmModes16Bit : wgmModes8Bit;
            const TCCRA = this.cpu.data[config.TCCRA];
            const [timerMode, topValue, ocrUpdateMode, tovUpdateMode, flags] = wgmModes[WGM];
            this.timerMode = timerMode;
            this.topValue = topValue;
            this.ocrUpdateMode = ocrUpdateMode;
            this.tovUpdateMode = tovUpdateMode;
            const pwmMode = timerMode === FastPWM ||
                timerMode === PWMPhaseCorrect ||
                timerMode === PWMPhaseFrequencyCorrect;
            const prevCompA = this.compA;
            this.compA = ((TCCRA >> 6) & 0x3);
            if (this.compA === 1 && pwmMode && !(flags & OCToggle)) {
                this.compA = 0;
            }
            if (!!prevCompA !== !!this.compA) {
                this.updateCompA(this.compA ? gpio_1.PinOverrideMode.Enable : gpio_1.PinOverrideMode.None);
            }
            const prevCompB = this.compB;
            this.compB = ((TCCRA >> 4) & 0x3);
            if (this.compB === 1 && pwmMode) {
                this.compB = 0;
            }
            if (!!prevCompB !== !!this.compB) {
                this.updateCompB(this.compB ? gpio_1.PinOverrideMode.Enable : gpio_1.PinOverrideMode.None);
            }
            if (this.hasOCRC) {
                const prevCompC = this.compC;
                this.compC = ((TCCRA >> 2) & 0x3);
                if (this.compC === 1 && pwmMode) {
                    this.compC = 0;
                }
                if (!!prevCompC !== !!this.compC) {
                    this.updateCompC(this.compC ? gpio_1.PinOverrideMode.Enable : gpio_1.PinOverrideMode.None);
                }
            }
        }
        phasePwmCount(value, delta) {
            const { ocrA, ocrB, ocrC, hasOCRC, TOP, MAX, tcntUpdated } = this;
            if (!value && !TOP) {
                delta = 0;
                if (this.ocrUpdateMode === OCRUpdateMode.Top) {
                    this.ocrA = this.nextOcrA;
                    this.ocrB = this.nextOcrB;
                    this.ocrC = this.nextOcrC;
                }
            }
            while (delta > 0) {
                if (this.countingUp) {
                    value++;
                    if (value === TOP && !tcntUpdated) {
                        this.countingUp = false;
                        if (this.ocrUpdateMode === OCRUpdateMode.Top) {
                            this.ocrA = this.nextOcrA;
                            this.ocrB = this.nextOcrB;
                            this.ocrC = this.nextOcrC;
                        }
                    }
                }
                else {
                    value--;
                    if (!value && !tcntUpdated) {
                        this.countingUp = true;
                        this.cpu.setInterruptFlag(this.OVF);
                        if (this.ocrUpdateMode === OCRUpdateMode.Bottom) {
                            this.ocrA = this.nextOcrA;
                            this.ocrB = this.nextOcrB;
                            this.ocrC = this.nextOcrC;
                        }
                    }
                }
                if (!tcntUpdated) {
                    if (value === ocrA) {
                        this.cpu.setInterruptFlag(this.OCFA);
                        if (this.compA) {
                            this.updateCompPin(this.compA, 'A');
                        }
                    }
                    if (value === ocrB) {
                        this.cpu.setInterruptFlag(this.OCFB);
                        if (this.compB) {
                            this.updateCompPin(this.compB, 'B');
                        }
                    }
                    if (hasOCRC && value === ocrC) {
                        this.cpu.setInterruptFlag(this.OCFC);
                        if (this.compC) {
                            this.updateCompPin(this.compC, 'C');
                        }
                    }
                }
                delta--;
            }
            return value & MAX;
        }
        timerUpdated(value, prevValue) {
            const { ocrA, ocrB, ocrC, hasOCRC } = this;
            const overflow = prevValue > value;
            if (((prevValue < ocrA || overflow) && value >= ocrA) || (prevValue < ocrA && overflow)) {
                this.cpu.setInterruptFlag(this.OCFA);
                if (this.compA) {
                    this.updateCompPin(this.compA, 'A');
                }
            }
            if (((prevValue < ocrB || overflow) && value >= ocrB) || (prevValue < ocrB && overflow)) {
                this.cpu.setInterruptFlag(this.OCFB);
                if (this.compB) {
                    this.updateCompPin(this.compB, 'B');
                }
            }
            if (hasOCRC &&
                (((prevValue < ocrC || overflow) && value >= ocrC) || (prevValue < ocrC && overflow))) {
                this.cpu.setInterruptFlag(this.OCFC);
                if (this.compC) {
                    this.updateCompPin(this.compC, 'C');
                }
            }
        }
        checkForceCompare(value) {
            if (this.timerMode == TimerMode.FastPWM ||
                this.timerMode == TimerMode.PWMPhaseCorrect ||
                this.timerMode == TimerMode.PWMPhaseFrequencyCorrect) {
                return;
            }
            if (value & FOCA) {
                this.updateCompPin(this.compA, 'A');
            }
            if (value & FOCB) {
                this.updateCompPin(this.compB, 'B');
            }
            if (this.config.compPortC && value & FOCC) {
                this.updateCompPin(this.compC, 'C');
            }
        }
        updateCompPin(compValue, pinName, bottom = false) {
            let newValue = gpio_1.PinOverrideMode.None;
            const invertingMode = compValue === 3;
            const isSet = this.countingUp === invertingMode;
            switch (this.timerMode) {
                case Normal:
                case CTC:
                    newValue = compToOverride(compValue);
                    break;
                case FastPWM:
                    if (compValue === 1) {
                        newValue = bottom ? gpio_1.PinOverrideMode.None : gpio_1.PinOverrideMode.Toggle;
                    }
                    else {
                        newValue = invertingMode !== bottom ? gpio_1.PinOverrideMode.Set : gpio_1.PinOverrideMode.Clear;
                    }
                    break;
                case PWMPhaseCorrect:
                case PWMPhaseFrequencyCorrect:
                    if (compValue === 1) {
                        newValue = gpio_1.PinOverrideMode.Toggle;
                    }
                    else {
                        newValue = isSet ? gpio_1.PinOverrideMode.Set : gpio_1.PinOverrideMode.Clear;
                    }
                    break;
            }
            if (newValue !== gpio_1.PinOverrideMode.None) {
                if (pinName === 'A') {
                    this.updateCompA(newValue);
                }
                else if (pinName === 'B') {
                    this.updateCompB(newValue);
                }
                else {
                    this.updateCompC(newValue);
                }
            }
        }
        updateCompA(value) {
            const { compPortA, compPinA } = this.config;
            const port = this.cpu.gpioByPort[compPortA];
            port === null || port === void 0 ? void 0 : port.timerOverridePin(compPinA, value);
        }
        updateCompB(value) {
            const { compPortB, compPinB } = this.config;
            const port = this.cpu.gpioByPort[compPortB];
            port === null || port === void 0 ? void 0 : port.timerOverridePin(compPinB, value);
        }
        updateCompC(value) {
            const { compPortC, compPinC } = this.config;
            const port = this.cpu.gpioByPort[compPortC];
            port === null || port === void 0 ? void 0 : port.timerOverridePin(compPinC, value);
        }
    }
    exports.AVRTimer = AVRTimer;
});
define("lib/i2c-bus", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.I2CBus = void 0;
    class I2CBus {
        constructor(twi) {
            this.twi = twi;
            this.controllers = {};
            this.activeController = null;
            this.writeMode = false;
            twi.eventHandler = this;
        }
        registerController(addr, device) {
            this.controllers[addr] = device;
        }
        start() {
            this.twi.completeStart();
        }
        stop() {
            if (this.activeController) {
                this.activeController.i2cDisconnect();
                this.activeController = null;
            }
            this.twi.completeStop();
        }
        connectToSlave(addr, write) {
            let result = false;
            const device = this.controllers[addr];
            if (device) {
                result = device.i2cConnect(addr, write);
                if (result) {
                    this.activeController = device;
                    this.writeMode = write;
                }
            }
            this.twi.completeConnect(result);
        }
        writeByte(value) {
            if (this.activeController && this.writeMode) {
                this.twi.completeWrite(this.activeController.i2cWriteByte(value));
            }
            else {
                this.twi.completeWrite(false);
            }
        }
        readByte(ack) {
            if (this.activeController && !this.writeMode) {
                this.twi.completeRead(this.activeController.i2cReadByte(ack));
            }
            else {
                this.twi.completeRead(0xff);
            }
        }
    }
    exports.I2CBus = I2CBus;
});
define("lib/avr8js/peripherals/twi", ["require", "exports", "lib/i2c-bus"], function (require, exports, i2c_bus_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRTWI = exports.twiConfig = void 0;
    const TWCR_TWINT = 0x80;
    const TWCR_TWEA = 0x40;
    const TWCR_TWSTA = 0x20;
    const TWCR_TWSTO = 0x10;
    const TWCR_TWWC = 0x8;
    const TWCR_TWEN = 0x4;
    const TWCR_TWIE = 0x1;
    const TWSR_TWS_MASK = 0xf8;
    const TWSR_TWPS1 = 0x2;
    const TWSR_TWPS0 = 0x1;
    const TWSR_TWPS_MASK = TWSR_TWPS1 | TWSR_TWPS0;
    const TWAR_TWA_MASK = 0xfe;
    const TWAR_TWGCE = 0x1;
    const STATUS_BUS_ERROR = 0x0;
    const STATUS_TWI_IDLE = 0xf8;
    const STATUS_START = 0x08;
    const STATUS_REPEATED_START = 0x10;
    const STATUS_SLAW_ACK = 0x18;
    const STATUS_SLAW_NACK = 0x20;
    const STATUS_DATA_SENT_ACK = 0x28;
    const STATUS_DATA_SENT_NACK = 0x30;
    const STATUS_DATA_LOST_ARBITRATION = 0x38;
    const STATUS_SLAR_ACK = 0x40;
    const STATUS_SLAR_NACK = 0x48;
    const STATUS_DATA_RECEIVED_ACK = 0x50;
    const STATUS_DATA_RECEIVED_NACK = 0x58;
    exports.twiConfig = {
        twiInterrupt: 0x30,
        TWBR: 0xb8,
        TWSR: 0xb9,
        TWAR: 0xba,
        TWDR: 0xbb,
        TWCR: 0xbc,
        TWAMR: 0xbd,
    };
    class AVRTWI {
        constructor(cpu, config, freqHz) {
            this.cpu = cpu;
            this.config = config;
            this.freqHz = freqHz;
            this.eventHandler = new i2c_bus_1.I2CBus(this);
            this.busy = false;
            this.TWI = {
                address: this.config.twiInterrupt,
                flagRegister: this.config.TWCR,
                flagMask: TWCR_TWINT,
                enableRegister: this.config.TWCR,
                enableMask: TWCR_TWIE,
            };
            this.updateStatus(STATUS_TWI_IDLE);
            this.cpu.writeHooks[config.TWCR] = (value) => {
                this.cpu.data[config.TWCR] = value;
                const clearInt = value & TWCR_TWINT;
                this.cpu.clearInterruptByFlag(this.TWI, value);
                this.cpu.updateInterruptEnable(this.TWI, value);
                const { status } = this;
                if (clearInt && value & TWCR_TWEN && !this.busy) {
                    const twdrValue = this.cpu.data[this.config.TWDR];
                    this.cpu.addClockEvent(() => {
                        if (value & TWCR_TWSTA) {
                            this.busy = true;
                            this.eventHandler.start(status !== STATUS_TWI_IDLE);
                        }
                        else if (value & TWCR_TWSTO) {
                            this.busy = true;
                            this.eventHandler.stop();
                        }
                        else if (status === STATUS_START || status === STATUS_REPEATED_START) {
                            this.busy = true;
                            this.eventHandler.connectToSlave(twdrValue >> 1, twdrValue & 0x1 ? false : true);
                        }
                        else if (status === STATUS_SLAW_ACK || status === STATUS_DATA_SENT_ACK) {
                            this.busy = true;
                            this.eventHandler.writeByte(twdrValue);
                        }
                        else if (status === STATUS_SLAR_ACK || status === STATUS_DATA_RECEIVED_ACK) {
                            this.busy = true;
                            const ack = !!(value & TWCR_TWEA);
                            this.eventHandler.readByte(ack);
                        }
                    }, 0);
                    return true;
                }
            };
        }
        get prescaler() {
            switch (this.cpu.data[this.config.TWSR] & TWSR_TWPS_MASK) {
                case 0:
                    return 1;
                case 1:
                    return 4;
                case 2:
                    return 16;
                case 3:
                    return 64;
            }
            throw new Error('Invalid prescaler value!');
        }
        get sclFrequency() {
            return this.freqHz / (16 + 2 * this.cpu.data[this.config.TWBR] * this.prescaler);
        }
        completeStart() {
            this.busy = false;
            this.updateStatus(this.status === STATUS_TWI_IDLE ? STATUS_START : STATUS_REPEATED_START);
        }
        completeStop() {
            this.busy = false;
            this.cpu.data[this.config.TWCR] &= ~TWCR_TWSTO;
            this.updateStatus(STATUS_TWI_IDLE);
        }
        completeConnect(ack) {
            this.busy = false;
            if (this.cpu.data[this.config.TWDR] & 0x1) {
                this.updateStatus(ack ? STATUS_SLAR_ACK : STATUS_SLAR_NACK);
            }
            else {
                this.updateStatus(ack ? STATUS_SLAW_ACK : STATUS_SLAW_NACK);
            }
        }
        completeWrite(ack) {
            this.busy = false;
            this.updateStatus(ack ? STATUS_DATA_SENT_ACK : STATUS_DATA_SENT_NACK);
        }
        completeRead(value) {
            this.busy = false;
            const ack = !!(this.cpu.data[this.config.TWCR] & TWCR_TWEA);
            this.cpu.data[this.config.TWDR] = value;
            this.updateStatus(ack ? STATUS_DATA_RECEIVED_ACK : STATUS_DATA_RECEIVED_NACK);
        }
        get status() {
            return this.cpu.data[this.config.TWSR] & TWSR_TWS_MASK;
        }
        updateStatus(value) {
            const { TWSR } = this.config;
            this.cpu.data[TWSR] = (this.cpu.data[TWSR] & ~TWSR_TWS_MASK) | value;
            this.cpu.setInterruptFlag(this.TWI);
        }
    }
    exports.AVRTWI = AVRTWI;
});
define("lib/avr8js/peripherals/usart", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRUSART = exports.usart0Config = void 0;
    exports.usart0Config = {
        rxCompleteInterrupt: 0x24,
        dataRegisterEmptyInterrupt: 0x26,
        txCompleteInterrupt: 0x28,
        UCSRA: 0xc0,
        UCSRB: 0xc1,
        UCSRC: 0xc2,
        UBRRL: 0xc4,
        UBRRH: 0xc5,
        UDR: 0xc6,
    };
    const UCSRA_RXC = 0x80;
    const UCSRA_TXC = 0x40;
    const UCSRA_UDRE = 0x20;
    const UCSRA_FE = 0x10;
    const UCSRA_DOR = 0x8;
    const UCSRA_UPE = 0x4;
    const UCSRA_U2X = 0x2;
    const UCSRA_MPCM = 0x1;
    const UCSRA_CFG_MASK = UCSRA_U2X;
    const UCSRB_RXCIE = 0x80;
    const UCSRB_TXCIE = 0x40;
    const UCSRB_UDRIE = 0x20;
    const UCSRB_RXEN = 0x10;
    const UCSRB_TXEN = 0x8;
    const UCSRB_UCSZ2 = 0x4;
    const UCSRB_RXB8 = 0x2;
    const UCSRB_TXB8 = 0x1;
    const UCSRB_CFG_MASK = UCSRB_UCSZ2 | UCSRB_RXEN | UCSRB_TXEN;
    const UCSRC_UMSEL1 = 0x80;
    const UCSRC_UMSEL0 = 0x40;
    const UCSRC_UPM1 = 0x20;
    const UCSRC_UPM0 = 0x10;
    const UCSRC_USBS = 0x8;
    const UCSRC_UCSZ1 = 0x4;
    const UCSRC_UCSZ0 = 0x2;
    const UCSRC_UCPOL = 0x1;
    const rxMasks = {
        5: 0x1f,
        6: 0x3f,
        7: 0x7f,
        8: 0xff,
        9: 0xff,
    };
    class AVRUSART {
        constructor(cpu, config, freqHz) {
            this.cpu = cpu;
            this.config = config;
            this.freqHz = freqHz;
            this.onByteTransmit = null;
            this.onLineTransmit = null;
            this.onRxComplete = null;
            this.onConfigurationChange = null;
            this.rxBusyValue = false;
            this.rxByte = 0;
            this.lineBuffer = '';
            this.RXC = {
                address: this.config.rxCompleteInterrupt,
                flagRegister: this.config.UCSRA,
                flagMask: UCSRA_RXC,
                enableRegister: this.config.UCSRB,
                enableMask: UCSRB_RXCIE,
                constant: true,
            };
            this.UDRE = {
                address: this.config.dataRegisterEmptyInterrupt,
                flagRegister: this.config.UCSRA,
                flagMask: UCSRA_UDRE,
                enableRegister: this.config.UCSRB,
                enableMask: UCSRB_UDRIE,
            };
            this.TXC = {
                address: this.config.txCompleteInterrupt,
                flagRegister: this.config.UCSRA,
                flagMask: UCSRA_TXC,
                enableRegister: this.config.UCSRB,
                enableMask: UCSRB_TXCIE,
            };
            this.reset();
            this.cpu.writeHooks[config.UCSRA] = (value, oldValue) => {
                var _a;
                cpu.data[config.UCSRA] = value & (UCSRA_MPCM | UCSRA_U2X);
                cpu.clearInterruptByFlag(this.TXC, value);
                if ((value & UCSRA_CFG_MASK) !== (oldValue & UCSRA_CFG_MASK)) {
                    (_a = this.onConfigurationChange) === null || _a === void 0 ? void 0 : _a.call(this);
                }
                return true;
            };
            this.cpu.writeHooks[config.UCSRB] = (value, oldValue) => {
                var _a;
                cpu.updateInterruptEnable(this.RXC, value);
                cpu.updateInterruptEnable(this.UDRE, value);
                cpu.updateInterruptEnable(this.TXC, value);
                if (value & UCSRB_RXEN && oldValue & UCSRB_RXEN) {
                    cpu.clearInterrupt(this.RXC);
                }
                if (value & UCSRB_TXEN && !(oldValue & UCSRB_TXEN)) {
                    cpu.setInterruptFlag(this.UDRE);
                }
                cpu.data[config.UCSRB] = value;
                if ((value & UCSRB_CFG_MASK) !== (oldValue & UCSRB_CFG_MASK)) {
                    (_a = this.onConfigurationChange) === null || _a === void 0 ? void 0 : _a.call(this);
                }
                return true;
            };
            this.cpu.writeHooks[config.UCSRC] = (value) => {
                var _a;
                cpu.data[config.UCSRC] = value;
                (_a = this.onConfigurationChange) === null || _a === void 0 ? void 0 : _a.call(this);
                return true;
            };
            this.cpu.readHooks[config.UDR] = () => {
                var _a;
                const mask = (_a = rxMasks[this.bitsPerChar]) !== null && _a !== void 0 ? _a : 0xff;
                const result = this.rxByte & mask;
                this.rxByte = 0;
                this.cpu.clearInterrupt(this.RXC);
                return result;
            };
            this.cpu.writeHooks[config.UDR] = (value) => {
                if (this.onByteTransmit) {
                    this.onByteTransmit(value);
                }
                if (this.onLineTransmit) {
                    const ch = String.fromCharCode(value);
                    if (ch === '\n') {
                        this.onLineTransmit(this.lineBuffer);
                        this.lineBuffer = '';
                    }
                    else {
                        this.lineBuffer += ch;
                    }
                }
                this.cpu.addClockEvent(() => {
                    cpu.setInterruptFlag(this.UDRE);
                    cpu.setInterruptFlag(this.TXC);
                }, this.cyclesPerChar);
                this.cpu.clearInterrupt(this.TXC);
                this.cpu.clearInterrupt(this.UDRE);
            };
            this.cpu.writeHooks[config.UBRRH] = (value) => {
                var _a;
                this.cpu.data[config.UBRRH] = value;
                (_a = this.onConfigurationChange) === null || _a === void 0 ? void 0 : _a.call(this);
                return true;
            };
            this.cpu.writeHooks[config.UBRRL] = (value) => {
                var _a;
                this.cpu.data[config.UBRRL] = value;
                (_a = this.onConfigurationChange) === null || _a === void 0 ? void 0 : _a.call(this);
                return true;
            };
        }
        reset() {
            this.cpu.data[this.config.UCSRA] = UCSRA_UDRE;
            this.cpu.data[this.config.UCSRB] = 0;
            this.cpu.data[this.config.UCSRC] = UCSRC_UCSZ1 | UCSRC_UCSZ0;
            this.rxBusyValue = false;
            this.rxByte = 0;
            this.lineBuffer = '';
        }
        get rxBusy() {
            return this.rxBusyValue;
        }
        writeByte(value, immediate = false) {
            var _a;
            const { cpu } = this;
            if (this.rxBusyValue || !this.rxEnable) {
                return false;
            }
            if (immediate) {
                this.rxByte = value;
                cpu.setInterruptFlag(this.RXC);
                (_a = this.onRxComplete) === null || _a === void 0 ? void 0 : _a.call(this);
            }
            else {
                this.rxBusyValue = true;
                cpu.addClockEvent(() => {
                    this.rxBusyValue = false;
                    this.writeByte(value, true);
                }, this.cyclesPerChar);
                return true;
            }
        }
        get cyclesPerChar() {
            const symbolsPerChar = 1 + this.bitsPerChar + this.stopBits + (this.parityEnabled ? 1 : 0);
            return (this.UBRR + 1) * this.multiplier * symbolsPerChar;
        }
        get UBRR() {
            const { UBRRH, UBRRL } = this.config;
            return (this.cpu.data[UBRRH] << 8) | this.cpu.data[UBRRL];
        }
        get multiplier() {
            return this.cpu.data[this.config.UCSRA] & UCSRA_U2X ? 8 : 16;
        }
        get rxEnable() {
            return !!(this.cpu.data[this.config.UCSRB] & UCSRB_RXEN);
        }
        get txEnable() {
            return !!(this.cpu.data[this.config.UCSRB] & UCSRB_TXEN);
        }
        get baudRate() {
            return Math.floor(this.freqHz / (this.multiplier * (1 + this.UBRR)));
        }
        get bitsPerChar() {
            const ucsz = ((this.cpu.data[this.config.UCSRC] & (UCSRC_UCSZ1 | UCSRC_UCSZ0)) >> 1) |
                (this.cpu.data[this.config.UCSRB] & UCSRB_UCSZ2);
            switch (ucsz) {
                case 0:
                    return 5;
                case 1:
                    return 6;
                case 2:
                    return 7;
                case 3:
                    return 8;
                default:
                case 7:
                    return 9;
            }
        }
        get stopBits() {
            return this.cpu.data[this.config.UCSRC] & UCSRC_USBS ? 2 : 1;
        }
        get parityEnabled() {
            return this.cpu.data[this.config.UCSRC] & UCSRC_UPM1 ? true : false;
        }
        get parityOdd() {
            return this.cpu.data[this.config.UCSRC] & UCSRC_UPM0 ? true : false;
        }
    }
    exports.AVRUSART = AVRUSART;
});
define("lib/avr8js/peripherals/usi", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRUSI = void 0;
    const USICR = 0x2d;
    const USISR = 0x2e;
    const USIDR = 0x2f;
    const USIBR = 0x30;
    const USICNT_MASK = 0xf;
    const USIDC = 1 << 4;
    const USIPF = 1 << 5;
    const USIOIF = 1 << 6;
    const USISIF = 1 << 7;
    const USITC = 1 << 0;
    const USICLK = 1 << 1;
    const USICS0 = 1 << 2;
    const USICS1 = 1 << 3;
    const USIWM0 = 1 << 4;
    const USIWM1 = 1 << 5;
    const USIOIE = 1 << 6;
    const USISIE = 1 << 7;
    class AVRUSI {
        constructor(cpu, port, portPin, dataPin, clockPin) {
            this.START = {
                address: 0xd,
                flagRegister: USISR,
                flagMask: USISIF,
                enableRegister: USICR,
                enableMask: USISIE,
            };
            this.OVF = {
                address: 0xe,
                flagRegister: USISR,
                flagMask: USIOIF,
                enableRegister: USICR,
                enableMask: USIOIE,
            };
            const PIN = portPin;
            const PORT = PIN + 2;
            port.addListener((value) => {
                const twoWire = (cpu.data[USICR] & USIWM1) === USIWM1;
                if (twoWire) {
                    if (value & (1 << clockPin) && !(value & (1 << dataPin))) {
                        cpu.setInterruptFlag(this.START);
                    }
                    if (value & (1 << clockPin) && value & (1 << dataPin)) {
                        cpu.data[USISR] |= USIPF;
                    }
                }
            });
            const updateOutput = () => {
                const oldValue = cpu.data[PORT];
                const newValue = cpu.data[USIDR] & 0x80 ? oldValue | (1 << dataPin) : oldValue & ~(1 << dataPin);
                cpu.writeHooks[PORT](newValue, oldValue, PORT, 0xff);
                if (newValue & 0x80 && !(cpu.data[PIN] & 0x80)) {
                    cpu.data[USISR] |= USIDC;
                }
                else {
                    cpu.data[USISR] &= ~USIDC;
                }
            };
            const count = () => {
                const counter = (cpu.data[USISR] + 1) & USICNT_MASK;
                cpu.data[USISR] = (cpu.data[USISR] & ~USICNT_MASK) | counter;
                if (!counter) {
                    cpu.data[USIBR] = cpu.data[USIDR];
                    cpu.setInterruptFlag(this.OVF);
                }
            };
            const shift = (inputValue) => {
                cpu.data[USIDR] = (cpu.data[USIDR] << 1) | inputValue;
                updateOutput();
            };
            cpu.writeHooks[USIDR] = (value) => {
                cpu.data[USIDR] = value;
                updateOutput();
                return true;
            };
            cpu.writeHooks[USISR] = (value) => {
                const writeClearMask = USISIF | USIOIF | USIPF;
                cpu.data[USISR] = (cpu.data[USISR] & writeClearMask & ~value) | (value & 0xf);
                cpu.clearInterruptByFlag(this.START, value);
                cpu.clearInterruptByFlag(this.OVF, value);
                return true;
            };
            cpu.writeHooks[USICR] = (value) => {
                cpu.data[USICR] = value & ~(USICLK | USITC);
                cpu.updateInterruptEnable(this.START, value);
                cpu.updateInterruptEnable(this.OVF, value);
                const clockSrc = value & ((USICS1 | USICS0) >> 2);
                const mode = value & ((USIWM1 | USIWM0) >> 4);
                const usiClk = value & USICLK;
                port.openCollector = mode >= 2 ? 1 << dataPin : 0;
                const inputValue = cpu.data[PIN] & (1 << dataPin) ? 1 : 0;
                if (usiClk && !clockSrc) {
                    shift(inputValue);
                    count();
                }
                if (value & USITC) {
                    cpu.writeHooks[PIN](1 << clockPin, cpu.data[PIN], PIN, 0xff);
                    const newValue = cpu.data[PIN] & (1 << clockPin);
                    if (usiClk && (clockSrc === 2 || clockSrc === 3)) {
                        if (clockSrc === 2 && newValue) {
                            shift(inputValue);
                        }
                        if (clockSrc === 3 && !newValue) {
                            shift(inputValue);
                        }
                        count();
                    }
                    return true;
                }
            };
        }
    }
    exports.AVRUSI = AVRUSI;
});
define("lib/avr8js/peripherals/watchdog", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRWatchdog = exports.watchdogConfig = void 0;
    const MCUSR_WDRF = 0x8;
    const WDTCSR_WDIF = 0x80;
    const WDTCSR_WDIE = 0x40;
    const WDTCSR_WDP3 = 0x20;
    const WDTCSR_WDCE = 0x10;
    const WDTCSR_WDE = 0x8;
    const WDTCSR_WDP2 = 0x4;
    const WDTCSR_WDP1 = 0x2;
    const WDTCSR_WDP0 = 0x1;
    const WDTCSR_WDP210 = WDTCSR_WDP2 | WDTCSR_WDP1 | WDTCSR_WDP0;
    const WDTCSR_PROTECT_MASK = WDTCSR_WDE | WDTCSR_WDP3 | WDTCSR_WDP210;
    exports.watchdogConfig = {
        watchdogInterrupt: 0x0c,
        MCUSR: 0x54,
        WDTCSR: 0x60,
    };
    class AVRWatchdog {
        constructor(cpu, config, clock) {
            this.cpu = cpu;
            this.config = config;
            this.clock = clock;
            this.clockFrequency = 128000;
            this.changeEnabledCycles = 0;
            this.watchdogTimeout = 0;
            this.enabledValue = false;
            this.scheduled = false;
            this.Watchdog = {
                address: this.config.watchdogInterrupt,
                flagRegister: this.config.WDTCSR,
                flagMask: WDTCSR_WDIF,
                enableRegister: this.config.WDTCSR,
                enableMask: WDTCSR_WDIE,
            };
            this.checkWatchdog = () => {
                if (this.enabled && this.cpu.cycles >= this.watchdogTimeout) {
                    const wdtcsr = this.cpu.data[this.config.WDTCSR];
                    if (wdtcsr & WDTCSR_WDIE) {
                        this.cpu.setInterruptFlag(this.Watchdog);
                    }
                    if (wdtcsr & WDTCSR_WDE) {
                        if (wdtcsr & WDTCSR_WDIE) {
                            this.cpu.data[this.config.WDTCSR] &= ~WDTCSR_WDIE;
                        }
                        else {
                            this.cpu.reset();
                            this.scheduled = false;
                            this.cpu.data[this.config.MCUSR] |= MCUSR_WDRF;
                            return;
                        }
                    }
                    this.resetWatchdog();
                }
                if (this.enabled) {
                    this.scheduled = true;
                    this.cpu.addClockEvent(this.checkWatchdog, this.watchdogTimeout - this.cpu.cycles);
                }
                else {
                    this.scheduled = false;
                }
            };
            const { WDTCSR } = config;
            this.cpu.onWatchdogReset = () => {
                this.resetWatchdog();
            };
            cpu.writeHooks[WDTCSR] = (value, oldValue) => {
                if (value & WDTCSR_WDCE && value & WDTCSR_WDE) {
                    this.changeEnabledCycles = this.cpu.cycles + 4;
                    value = value & ~WDTCSR_PROTECT_MASK;
                }
                else {
                    if (this.cpu.cycles >= this.changeEnabledCycles) {
                        value = (value & ~WDTCSR_PROTECT_MASK) | (oldValue & WDTCSR_PROTECT_MASK);
                    }
                    this.enabledValue = !!(value & WDTCSR_WDE || value & WDTCSR_WDIE);
                    this.cpu.data[WDTCSR] = value;
                }
                if (this.enabled) {
                    this.resetWatchdog();
                }
                if (this.enabled && !this.scheduled) {
                    this.cpu.addClockEvent(this.checkWatchdog, this.watchdogTimeout - this.cpu.cycles);
                }
                this.cpu.clearInterruptByFlag(this.Watchdog, value);
                return true;
            };
        }
        resetWatchdog() {
            const cycles = Math.floor((this.clock.frequency / this.clockFrequency) * this.prescaler);
            this.watchdogTimeout = this.cpu.cycles + cycles;
        }
        get enabled() {
            return this.enabledValue;
        }
        get prescaler() {
            const wdtcsr = this.cpu.data[this.config.WDTCSR];
            const value = ((wdtcsr & WDTCSR_WDP3) >> 2) | (wdtcsr & WDTCSR_WDP210);
            return 2048 << value;
        }
    }
    exports.AVRWatchdog = AVRWatchdog;
});
define("lib/avr8js/index", ["require", "exports", "lib/avr8js/cpu/cpu", "lib/avr8js/cpu/instruction", "lib/avr8js/cpu/interrupt", "lib/avr8js/peripherals/adc", "lib/avr8js/peripherals/clock", "lib/avr8js/peripherals/eeprom", "lib/avr8js/peripherals/gpio", "lib/avr8js/peripherals/spi", "lib/avr8js/peripherals/timer", "lib/avr8js/peripherals/twi", "lib/avr8js/peripherals/usart", "lib/avr8js/peripherals/usi", "lib/avr8js/peripherals/watchdog"], function (require, exports, cpu_1, instruction_1, interrupt_2, adc_1, clock_1, eeprom_1, gpio_2, spi_1, timer_1, twi_1, usart_1, usi_1, watchdog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.watchdogConfig = exports.AVRWatchdog = exports.AVRUSI = exports.usart0Config = exports.AVRUSART = exports.timer2Config = exports.timer1Config = exports.timer0Config = exports.AVRTimer = exports.spiConfig = exports.AVRSPI = exports.portLConfig = exports.portKConfig = exports.portJConfig = exports.portHConfig = exports.portGConfig = exports.portFConfig = exports.portEConfig = exports.portDConfig = exports.portCConfig = exports.portBConfig = exports.portAConfig = exports.PinState = exports.PCINT2 = exports.PCINT1 = exports.PCINT0 = exports.INT1 = exports.INT0 = exports.AVRIOPort = exports.EEPROMMemoryBackend = exports.eepromConfig = exports.AVREEPROM = exports.clockConfig = exports.AVRClock = exports.AVRADC = exports.atmega328Channels = exports.ADCReference = exports.ADCMuxInputType = exports.adcConfig = exports.avrInterrupt = exports.avrInstruction = exports.CPU = void 0;
    Object.defineProperty(exports, "CPU", { enumerable: true, get: function () { return cpu_1.CPU; } });
    Object.defineProperty(exports, "avrInstruction", { enumerable: true, get: function () { return instruction_1.avrInstruction; } });
    Object.defineProperty(exports, "avrInterrupt", { enumerable: true, get: function () { return interrupt_2.avrInterrupt; } });
    Object.defineProperty(exports, "adcConfig", { enumerable: true, get: function () { return adc_1.adcConfig; } });
    Object.defineProperty(exports, "ADCMuxInputType", { enumerable: true, get: function () { return adc_1.ADCMuxInputType; } });
    Object.defineProperty(exports, "ADCReference", { enumerable: true, get: function () { return adc_1.ADCReference; } });
    Object.defineProperty(exports, "atmega328Channels", { enumerable: true, get: function () { return adc_1.atmega328Channels; } });
    Object.defineProperty(exports, "AVRADC", { enumerable: true, get: function () { return adc_1.AVRADC; } });
    Object.defineProperty(exports, "AVRClock", { enumerable: true, get: function () { return clock_1.AVRClock; } });
    Object.defineProperty(exports, "clockConfig", { enumerable: true, get: function () { return clock_1.clockConfig; } });
    Object.defineProperty(exports, "AVREEPROM", { enumerable: true, get: function () { return eeprom_1.AVREEPROM; } });
    Object.defineProperty(exports, "eepromConfig", { enumerable: true, get: function () { return eeprom_1.eepromConfig; } });
    Object.defineProperty(exports, "EEPROMMemoryBackend", { enumerable: true, get: function () { return eeprom_1.EEPROMMemoryBackend; } });
    Object.defineProperty(exports, "AVRIOPort", { enumerable: true, get: function () { return gpio_2.AVRIOPort; } });
    Object.defineProperty(exports, "INT0", { enumerable: true, get: function () { return gpio_2.INT0; } });
    Object.defineProperty(exports, "INT1", { enumerable: true, get: function () { return gpio_2.INT1; } });
    Object.defineProperty(exports, "PCINT0", { enumerable: true, get: function () { return gpio_2.PCINT0; } });
    Object.defineProperty(exports, "PCINT1", { enumerable: true, get: function () { return gpio_2.PCINT1; } });
    Object.defineProperty(exports, "PCINT2", { enumerable: true, get: function () { return gpio_2.PCINT2; } });
    Object.defineProperty(exports, "PinState", { enumerable: true, get: function () { return gpio_2.PinState; } });
    Object.defineProperty(exports, "portAConfig", { enumerable: true, get: function () { return gpio_2.portAConfig; } });
    Object.defineProperty(exports, "portBConfig", { enumerable: true, get: function () { return gpio_2.portBConfig; } });
    Object.defineProperty(exports, "portCConfig", { enumerable: true, get: function () { return gpio_2.portCConfig; } });
    Object.defineProperty(exports, "portDConfig", { enumerable: true, get: function () { return gpio_2.portDConfig; } });
    Object.defineProperty(exports, "portEConfig", { enumerable: true, get: function () { return gpio_2.portEConfig; } });
    Object.defineProperty(exports, "portFConfig", { enumerable: true, get: function () { return gpio_2.portFConfig; } });
    Object.defineProperty(exports, "portGConfig", { enumerable: true, get: function () { return gpio_2.portGConfig; } });
    Object.defineProperty(exports, "portHConfig", { enumerable: true, get: function () { return gpio_2.portHConfig; } });
    Object.defineProperty(exports, "portJConfig", { enumerable: true, get: function () { return gpio_2.portJConfig; } });
    Object.defineProperty(exports, "portKConfig", { enumerable: true, get: function () { return gpio_2.portKConfig; } });
    Object.defineProperty(exports, "portLConfig", { enumerable: true, get: function () { return gpio_2.portLConfig; } });
    Object.defineProperty(exports, "AVRSPI", { enumerable: true, get: function () { return spi_1.AVRSPI; } });
    Object.defineProperty(exports, "spiConfig", { enumerable: true, get: function () { return spi_1.spiConfig; } });
    Object.defineProperty(exports, "AVRTimer", { enumerable: true, get: function () { return timer_1.AVRTimer; } });
    Object.defineProperty(exports, "timer0Config", { enumerable: true, get: function () { return timer_1.timer0Config; } });
    Object.defineProperty(exports, "timer1Config", { enumerable: true, get: function () { return timer_1.timer1Config; } });
    Object.defineProperty(exports, "timer2Config", { enumerable: true, get: function () { return timer_1.timer2Config; } });
    __exportStar(twi_1, exports);
    Object.defineProperty(exports, "AVRUSART", { enumerable: true, get: function () { return usart_1.AVRUSART; } });
    Object.defineProperty(exports, "usart0Config", { enumerable: true, get: function () { return usart_1.usart0Config; } });
    Object.defineProperty(exports, "AVRUSI", { enumerable: true, get: function () { return usi_1.AVRUSI; } });
    Object.defineProperty(exports, "AVRWatchdog", { enumerable: true, get: function () { return watchdog_1.AVRWatchdog; } });
    Object.defineProperty(exports, "watchdogConfig", { enumerable: true, get: function () { return watchdog_1.watchdogConfig; } });
});
define("boards/board", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("controllers/controller", ["require", "exports", "lib/execute"], function (require, exports, execute_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Controller = void 0;
    class Controller {
        constructor() {
            this.pins = {};
            execute_1.AVRRunner.getInstance().addController(this);
        }
        delete() {
            execute_1.AVRRunner.getInstance().removeController(this);
        }
        cleanup() {
        }
        ;
        init() {
            for (const [canonicalPinName, indices] of Object.entries(this.pinIndices)) {
                this.pins[canonicalPinName] = indices.map(index => execute_1.AVRRunner.getInstance().board.pins[index]);
            }
            this.setup();
        }
        static create(id, pins, component) {
            const instance = new this();
            instance.element = document.getElementById(`component-${id}`);
            instance.pinIndices = pins;
            instance.component = component;
            return instance;
        }
        sleep(cycles) {
            return new Promise(resolve => {
                execute_1.AVRRunner.getInstance().board.cpu.addClockEvent(() => resolve(void 0), cycles);
            });
        }
    }
    exports.Controller = Controller;
});
define("boards/arduino/arduino", ["require", "exports", "lib/avr8js/index"], function (require, exports, avr8js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArduinoAnalog = exports.ArduinoDigital = exports.ArduinoUSART = exports.ArduinoTWI = exports.ArduinoTimer = exports.ArduinoSPI = exports.ArduinoCPU = exports.MHZ = void 0;
    exports.MHZ = 16e6;
    class ArduinoCPU {
        constructor(cpu) {
            this.cpu = cpu;
        }
        clock() {
            (0, avr8js_1.avrInstruction)(this.cpu);
            this.cpu.tick();
        }
        get cycles() {
            return this.cpu.cycles;
        }
        get frequency() {
            return exports.MHZ;
        }
        addClockEvent(callback, cycles) {
            this.cpu.addClockEvent(callback, cycles);
        }
    }
    exports.ArduinoCPU = ArduinoCPU;
    class ArduinoSPI {
        constructor(spi) {
            this.spi = spi;
        }
        addListener(listener) {
            this.spi.addListener(listener);
        }
        removeListener(listener) {
            this.spi.removeListener(listener);
        }
        completeTransfer(receivedByte) {
            this.spi.completeTransfer(receivedByte);
        }
        get transferCycles() {
            return this.spi.transferCycles;
        }
    }
    exports.ArduinoSPI = ArduinoSPI;
    class ArduinoTimer {
        constructor(timer) {
            this.timer = timer;
        }
    }
    exports.ArduinoTimer = ArduinoTimer;
    class ArduinoTWI {
        constructor(twi) {
            this.twi = twi;
        }
        registerController(addr, device) {
            this.twi.eventHandler.registerController(addr, device);
        }
    }
    exports.ArduinoTWI = ArduinoTWI;
    class ArduinoUSART {
        constructor(usart) {
            this.usart = usart;
        }
        set onByteTransmit(listener) {
            this.usart.onByteTransmit = listener;
        }
        writeByte(value, immediate = false) {
            return this.usart.writeByte(value, immediate);
        }
    }
    exports.ArduinoUSART = ArduinoUSART;
    class ArduinoDigital {
        get state() {
            return this.port.pinState(this.index);
        }
        addListener(listener) {
            this.port.addListener(() => {
                let state = this.port.pinState(this.index);
                if (state !== this.previousState) {
                    listener(state);
                }
                this.previousState = state;
            });
        }
        set state(state) {
            this.port.setPin(this.index, state);
        }
        constructor(port, index) {
            this.port = port;
            this.index = index;
        }
    }
    exports.ArduinoDigital = ArduinoDigital;
    class ArduinoAnalog {
        get voltage() {
            return this.adc.channelValues[this.channel];
        }
        set voltage(voltage) {
            this.adc.channelValues[this.channel] = voltage;
        }
        constructor(adc, channel) {
            this.adc = adc;
            this.channel = channel;
        }
    }
    exports.ArduinoAnalog = ArduinoAnalog;
});
define("boards/arduino/arduino-uno/arduino-uno", ["require", "exports", "lib/avr8js/index", "boards/arduino/arduino"], function (require, exports, avr8js_2, arduino_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArduinoUno = void 0;
    class ArduinoUno {
        constructor(program) {
            const avrCPU = new avr8js_2.CPU(program);
            const adc = new avr8js_2.AVRADC(avrCPU, avr8js_2.adcConfig);
            const portB = new avr8js_2.AVRIOPort(avrCPU, avr8js_2.portBConfig);
            const portC = new avr8js_2.AVRIOPort(avrCPU, avr8js_2.portCConfig);
            const portD = new avr8js_2.AVRIOPort(avrCPU, avr8js_2.portDConfig);
            this.cpu = new arduino_1.ArduinoCPU(avrCPU);
            this.spis = [new arduino_1.ArduinoSPI(new avr8js_2.AVRSPI(avrCPU, avr8js_2.spiConfig, arduino_1.MHZ))];
            this.timers = [new arduino_1.ArduinoTimer(new avr8js_2.AVRTimer(avrCPU, avr8js_2.timer0Config)),
                new arduino_1.ArduinoTimer(new avr8js_2.AVRTimer(avrCPU, avr8js_2.timer1Config)),
                new arduino_1.ArduinoTimer(new avr8js_2.AVRTimer(avrCPU, avr8js_2.timer2Config))];
            this.twis = [new arduino_1.ArduinoTWI(new avr8js_2.AVRTWI(avrCPU, avr8js_2.twiConfig, arduino_1.MHZ))];
            this.usarts = [new arduino_1.ArduinoUSART(new avr8js_2.AVRUSART(avrCPU, avr8js_2.usart0Config, arduino_1.MHZ))];
            this.pins = [
                { digital: new arduino_1.ArduinoDigital(portD, 0), usart: this.usarts[0] },
                { digital: new arduino_1.ArduinoDigital(portD, 1), usart: this.usarts[0] },
                { digital: new arduino_1.ArduinoDigital(portD, 2) },
                { digital: new arduino_1.ArduinoDigital(portD, 3) },
                { digital: new arduino_1.ArduinoDigital(portD, 4) },
                { digital: new arduino_1.ArduinoDigital(portD, 5) },
                { digital: new arduino_1.ArduinoDigital(portD, 6) },
                { digital: new arduino_1.ArduinoDigital(portD, 7) },
                { digital: new arduino_1.ArduinoDigital(portB, 0) },
                { digital: new arduino_1.ArduinoDigital(portB, 1) },
                { digital: new arduino_1.ArduinoDigital(portB, 2) },
                { digital: new arduino_1.ArduinoDigital(portB, 3) },
                { digital: new arduino_1.ArduinoDigital(portB, 4) },
                { digital: new arduino_1.ArduinoDigital(portB, 5) },
                { analog: new arduino_1.ArduinoAnalog(adc, 0), digital: new arduino_1.ArduinoDigital(portC, 0) },
                { analog: new arduino_1.ArduinoAnalog(adc, 1), digital: new arduino_1.ArduinoDigital(portC, 1) },
                { analog: new arduino_1.ArduinoAnalog(adc, 2), digital: new arduino_1.ArduinoDigital(portC, 2) },
                { analog: new arduino_1.ArduinoAnalog(adc, 3), digital: new arduino_1.ArduinoDigital(portC, 3) },
                { analog: new arduino_1.ArduinoAnalog(adc, 4), digital: new arduino_1.ArduinoDigital(portC, 4), twi: this.twis[0] },
                { analog: new arduino_1.ArduinoAnalog(adc, 5), digital: new arduino_1.ArduinoDigital(portC, 5), twi: this.twis[0] },
            ];
        }
    }
    exports.ArduinoUno = ArduinoUno;
    ArduinoUno.FLASH = 0x8000;
});
define("lib/execute", ["require", "exports", "lib/compile-util", "boards/arduino/arduino-uno/arduino-uno"], function (require, exports, compile_util_1, arduino_uno_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AVRRunner = exports.BoardType = void 0;
    var BoardType;
    (function (BoardType) {
        BoardType[BoardType["ArduinoUno"] = 0] = "ArduinoUno";
        BoardType[BoardType["ArduinoMega"] = 1] = "ArduinoMega";
    })(BoardType || (exports.BoardType = BoardType = {}));
    class AVRRunner {
        constructor() {
            this.boardConstructor = arduino_uno_1.ArduinoUno;
            this.instructions = [];
            this.pausedOn = [];
            this.stopped = false;
            this.controllers = [];
        }
        static getInstance() {
            if (!AVRRunner._instance) {
                AVRRunner._instance = new AVRRunner();
            }
            return AVRRunner._instance;
        }
        addController(controller) {
            this.controllers.push(controller);
        }
        removeController(controller) {
            this.controllers = this.controllers.filter(c => c !== controller);
        }
        loadProgram(hex) {
            return __awaiter(this, void 0, void 0, function* () {
                const program = new Uint16Array(this.boardConstructor.FLASH);
                (0, compile_util_1.loadHex)(hex, new Uint8Array(program.buffer));
                this.board = new this.boardConstructor(program);
                for (const controller of this.controllers) {
                    controller.init();
                }
            });
        }
        execute(callback) {
            return __awaiter(this, void 0, void 0, function* () {
                this.stopped = false;
                for (;;) {
                    if (this.pausedOn.length == 0) {
                        this.board.cpu.clock();
                    }
                    else {
                        yield new Promise(resolve => setTimeout(resolve, 0));
                    }
                    if (this.board.cpu.cycles % 50000 === 0) {
                        callback(this.board.cpu);
                        yield new Promise(resolve => setTimeout(resolve, 0));
                        if (this.stopped) {
                            break;
                        }
                    }
                }
            });
        }
        stop() {
            this.stopped = true;
            for (const controller of this.controllers) {
                controller.cleanup();
            }
        }
        usToCycles(us) {
            if (!(this.board.cpu.frequency > 0)) {
                throw new Error("Board does not have a frequency. This should never happen");
            }
            return us * this.board.cpu.frequency / 1e6;
        }
    }
    exports.AVRRunner = AVRRunner;
    AVRRunner._instance = null;
});
define("lib/compile-util", ["require", "exports", "lib/library_dictionary", "lib/execute", "boards/arduino/arduino-uno/arduino-uno"], function (require, exports, library_dictionary_1, execute_2, arduino_uno_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildHex = exports.loadHex = void 0;
    function loadHex(source, target) {
        for (const line of source.split('\n')) {
            if (line[0] === ':' && line.substr(7, 2) === '00') {
                const bytes = parseInt(line.substr(1, 2), 16);
                const addr = parseInt(line.substr(3, 4), 16);
                for (let i = 0; i < bytes; i++) {
                    target[addr + i] = parseInt(line.substr(9 + i * 2, 2), 16);
                }
            }
        }
    }
    exports.loadHex = loadHex;
    const url = 'https://hexi.wokwi.com';
    function buildHex(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const include = Array.from(source.matchAll(/#include <([^>]+)>/g)).map(match => match[1]);
            const renameInclude = include.map(lib => library_dictionary_1.library[lib]).filter(lib => lib !== undefined);
            let listString = "";
            listString += renameInclude.join("\n") + "\n";
            const resp = yield fetch(url + '/build', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    files: [{
                            name: "libraries.txt",
                            content: listString
                        }], sketch: source, board: execute_2.AVRRunner.getInstance().boardConstructor == arduino_uno_2.ArduinoUno ? "" : "mega"
                })
            });
            return (yield resp.json());
        });
    }
    exports.buildHex = buildHex;
});
let observer;
let isObserving = false;
const config = { childList: true };
const callback = function (mutationsList) {
    const targetNode = document.getElementById('console-container');
    if (!targetNode) {
        console.warn("console-container does not exist for some reason");
        return;
    }
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            targetNode.scrollTop = targetNode.scrollHeight;
        }
    }
};
function toggleConsoleOutputBehavior() {
    const targetNode = document.getElementById('console-container');
    if (!targetNode) {
        return;
    }
    if (isObserving) {
        observer.disconnect();
    }
    else {
        observer = new MutationObserver(callback);
        if (targetNode) {
            observer.observe(targetNode, config);
        }
    }
    isObserving = !isObserving;
}
define("lib/avr8js/utils/assembler", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assemble = void 0;
    function destRindex(r, min = 0, max = 31) {
        const match = r.match(/[Rr](\d{1,2})/);
        if (!match) {
            throw 'Not a register: ' + r;
        }
        const d = parseInt(match[1]);
        if (d < min || d > max) {
            throw 'Rd out of range: ' + min + '<>' + max;
        }
        return (d & 0x1f) << 4;
    }
    function srcRindex(r, min = 0, max = 31) {
        const match = r.match(/[Rr](\d{1,2})/);
        if (!match) {
            throw 'Not a register: ' + r;
        }
        const d = parseInt(match[1]);
        if (d < min || d > max) {
            throw 'Rd out of range: ' + min + '<>' + max;
        }
        let s = d & 0xf;
        s |= ((d >> 4) & 1) << 9;
        return s;
    }
    function constValue(r, min = 0, max = 255) {
        const d = typeof r === 'string' ? parseInt(r) : r;
        if (isNaN(d)) {
            throw 'constant is not a number.';
        }
        if (d < min || d > max) {
            throw '[Ks] out of range: ' + min + '<>' + max;
        }
        return d;
    }
    function fitTwoC(r, bits) {
        if (bits < 2) {
            throw 'Need at least 2 bits to be signed.';
        }
        if (bits > 16) {
            throw 'fitTwoC only works on 16bit numbers for now.';
        }
        if (Math.abs(r) > Math.pow(2, bits - 1))
            throw 'Not enough bits for number. (' + r + ', ' + bits + ')';
        if (r < 0) {
            r = 0xffff + r + 1;
        }
        const mask = 0xffff >> (16 - bits);
        return r & mask;
    }
    function constOrLabel(c, labels, offset = 0) {
        if (typeof c === 'string') {
            let d = parseInt(c);
            if (isNaN(d)) {
                if (c in labels) {
                    d = labels[c] - offset;
                }
                else {
                    return NaN;
                }
            }
            c = d;
        }
        return c;
    }
    function zeroPad(r, len = 4) {
        r = Number(r).toString(16);
        const base = Array(len + 1).join('0');
        const t = base.substr(0, len - r.length) + r;
        return t;
    }
    function stldXYZ(xyz) {
        switch (xyz) {
            case 'X':
                return 0x900c;
            case 'X+':
                return 0x900d;
            case '-X':
                return 0x900e;
            case 'Y':
                return 0x8008;
            case 'Y+':
                return 0x9009;
            case '-Y':
                return 0x900a;
            case 'Z':
                return 0x8000;
            case 'Z+':
                return 0x9001;
            case '-Z':
                return 0x9002;
            default:
                throw 'Not -?[XYZ]\\+?';
        }
    }
    function stldYZq(yzq) {
        const d = yzq.match(/([YZ])\+(\d+)/);
        let r = 0x8000;
        if (d == null) {
            throw 'Invalid arguments';
        }
        switch (d[1]) {
            case 'Y':
                r |= 0x8;
                break;
            case 'Z':
                break;
            default:
                throw 'Not Y or Z with q';
        }
        const q = parseInt(d[2]);
        if (q < 0 || q > 64) {
            throw 'q is out of range';
        }
        r |= ((q & 0x20) << 8) | ((q & 0x18) << 7) | (q & 0x7);
        return r;
    }
    const SEflag = (a) => zeroPad(0x9408 | (constValue(a, 0, 7) << 4));
    const OPTABLE = {
        ADD(a, b) {
            const r = 0x0c00 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        ADC(a, b) {
            const r = 0x1c00 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        ADIW(a, b) {
            let r = 0x9600;
            const dm = a.match(/[Rr](24|26|28|30)/);
            if (!dm) {
                throw 'Rd must be 24, 26, 28, or 30';
            }
            let d = parseInt(dm[1]);
            d = (d - 24) / 2;
            r |= (d & 0x3) << 4;
            const k = constValue(b, 0, 63);
            r |= ((k & 0x30) << 2) | (k & 0x0f);
            return zeroPad(r);
        },
        AND(a, b) {
            const r = 0x2000 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        ANDI(a, b) {
            let r = 0x7000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0xf);
            return zeroPad(r);
        },
        ASR(a) {
            const r = 0x9405 | destRindex(a);
            return zeroPad(r);
        },
        BCLR(a) {
            let r = 0x9488;
            const s = constValue(a, 0, 7);
            r |= (s & 0x7) << 4;
            return zeroPad(r);
        },
        BLD(a, b) {
            const r = 0xf800 | destRindex(a) | (constValue(b, 0, 7) & 0x7);
            return zeroPad(r);
        },
        BRBC(a, b, byteLoc, labels) {
            const k = constOrLabel(b, labels, byteLoc + 2);
            if (isNaN(k)) {
                return (l) => OPTABLE['BRBC'](a, b, byteLoc, l);
            }
            let r = 0xf400 | constValue(a, 0, 7);
            r |= fitTwoC(constValue(k >> 1, -64, 63), 7) << 3;
            return zeroPad(r);
        },
        BRBS(a, b, byteLoc, labels) {
            const k = constOrLabel(b, labels, byteLoc + 2);
            if (isNaN(k)) {
                return (l) => OPTABLE['BRBS'](a, b, byteLoc, l);
            }
            let r = 0xf000 | constValue(a, 0, 7);
            r |= fitTwoC(constValue(k >> 1, -64, 63), 7) << 3;
            return zeroPad(r);
        },
        BRCC(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('0', a, byteLoc, labels);
        },
        BRCS(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('0', a, byteLoc, labels);
        },
        BREAK() {
            return '9598';
        },
        BREQ(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('1', a, byteLoc, labels);
        },
        BRGE(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('4', a, byteLoc, labels);
        },
        BRHC(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('5', a, byteLoc, labels);
        },
        BRHS(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('5', a, byteLoc, labels);
        },
        BRID(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('7', a, byteLoc, labels);
        },
        BRIE(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('7', a, byteLoc, labels);
        },
        BRLO(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('0', a, byteLoc, labels);
        },
        BRLT(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('4', a, byteLoc, labels);
        },
        BRMI(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('2', a, byteLoc, labels);
        },
        BRNE(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('1', a, byteLoc, labels);
        },
        BRPL(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('2', a, byteLoc, labels);
        },
        BRSH(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('0', a, byteLoc, labels);
        },
        BRTC(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('6', a, byteLoc, labels);
        },
        BRTS(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('6', a, byteLoc, labels);
        },
        BRVC(a, _, byteLoc, labels) {
            return OPTABLE['BRBC']('3', a, byteLoc, labels);
        },
        BRVS(a, _, byteLoc, labels) {
            return OPTABLE['BRBS']('3', a, byteLoc, labels);
        },
        BSET(a) {
            let r = 0x9408;
            const s = constValue(a, 0, 7);
            r |= (s & 0x7) << 4;
            return zeroPad(r);
        },
        BST(a, b) {
            const r = 0xfa00 | destRindex(a) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        CALL(a, b, byteLoc, labels) {
            let k = constOrLabel(a, labels);
            if (isNaN(k)) {
                return [(l) => OPTABLE['CALL'](a, b, byteLoc, l), 'xxxx'];
            }
            let r = 0x940e;
            k = constValue(k, 0, 0x400000) >> 1;
            const lk = k & 0xffff;
            const hk = (k >> 16) & 0x3f;
            r |= ((hk & 0x3e) << 3) | (hk & 1);
            return [zeroPad(r), zeroPad(lk)];
        },
        CBI(a, b) {
            const r = 0x9800 | (constValue(a, 0, 31) << 3) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        CRB(a, b, byteLoc, l) {
            const k = constValue(b);
            return OPTABLE['ANDI'](a.toString(), (~k & 0xff).toString(), byteLoc, l);
        },
        CLC() {
            return '9488';
        },
        CLH() {
            return '94d8';
        },
        CLI() {
            return '94f8';
        },
        CLN() {
            return '94a8';
        },
        CLR(a, _, byteLoc, l) {
            return OPTABLE['EOR'](a, a, byteLoc, l);
        },
        CLS() {
            return '94c8';
        },
        CLT() {
            return '94e8';
        },
        CLV() {
            return '94b8';
        },
        CLZ() {
            return '9498';
        },
        COM(a) {
            const r = 0x9400 | destRindex(a);
            return zeroPad(r);
        },
        CP(a, b) {
            const r = 0x1400 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        CPC(a, b) {
            const r = 0x0400 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        CPI(a, b) {
            let r = 0x3000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0xf);
            return zeroPad(r);
        },
        CPSE(a, b) {
            const r = 0x1000 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        DEC(a) {
            const r = 0x940a | destRindex(a);
            return zeroPad(r);
        },
        DES(a) {
            const r = 0x940b | (constValue(a, 0, 15) << 4);
            return zeroPad(r);
        },
        EICALL() {
            return '9519';
        },
        EIJMP() {
            return '9419';
        },
        ELPM(a, b) {
            if (typeof a === 'undefined' || a === '') {
                return '95d8';
            }
            else {
                let r = 0x9000 | destRindex(a);
                switch (b) {
                    case 'Z':
                        r |= 6;
                        break;
                    case 'Z+':
                        r |= 7;
                        break;
                    default:
                        throw 'Bad operand';
                }
                return zeroPad(r);
            }
        },
        EOR(a, b) {
            const r = 0x2400 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        FMUL(a, b) {
            const r = 0x0308 | (destRindex(a, 16, 23) & 0x70) | (srcRindex(b, 16, 23) & 0x7);
            return zeroPad(r);
        },
        FMULS(a, b) {
            const r = 0x0380 | (destRindex(a, 16, 23) & 0x70) | (srcRindex(b, 16, 23) & 0x7);
            return zeroPad(r);
        },
        FMULSU(a, b) {
            const r = 0x0388 | (destRindex(a, 16, 23) & 0x70) | (srcRindex(b, 16, 23) & 0x7);
            return zeroPad(r);
        },
        ICALL() {
            return '9509';
        },
        IJMP() {
            return '9409';
        },
        IN(a, b) {
            let r = 0xb000 | destRindex(a);
            const A = constValue(b, 0, 63);
            r |= ((A & 0x30) << 5) | (A & 0x0f);
            return zeroPad(r);
        },
        INC(a) {
            const r = 0x9403 | destRindex(a);
            return zeroPad(r);
        },
        JMP(a, b, byteLoc, labels) {
            let k = constOrLabel(a, labels);
            if (isNaN(k)) {
                return [(l) => OPTABLE['JMP'](a, b, byteLoc, l), 'xxxx'];
            }
            let r = 0x940c;
            k = constValue(k, 0, 0x400000) >> 1;
            const lk = k & 0xffff;
            const hk = (k >> 16) & 0x3f;
            r |= ((hk & 0x3e) << 3) | (hk & 1);
            return [zeroPad(r), zeroPad(lk)];
        },
        LAC(a, b) {
            if (a !== 'Z') {
                throw 'First Operand is not Z';
            }
            const r = 0x9206 | destRindex(b);
            return zeroPad(r);
        },
        LAS(a, b) {
            if (a !== 'Z') {
                throw 'First Operand is not Z';
            }
            const r = 0x9205 | destRindex(b);
            return zeroPad(r);
        },
        LAT(a, b) {
            if (a !== 'Z') {
                throw 'First Operand is not Z';
            }
            const r = 0x9207 | destRindex(b);
            return zeroPad(r);
        },
        LD(a, b) {
            const r = 0x0000 | destRindex(a) | stldXYZ(b);
            return zeroPad(r);
        },
        LDD(a, b) {
            const r = 0x0000 | destRindex(a) | stldYZq(b);
            return zeroPad(r);
        },
        LDI(a, b) {
            let r = 0xe000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0xf);
            return zeroPad(r);
        },
        LDS(a, b) {
            const k = constValue(b, 0, 65535);
            const r = 0x9000 | destRindex(a);
            return [zeroPad(r), zeroPad(k)];
        },
        LPM(a, b) {
            if (typeof a === 'undefined' || a === '') {
                return '95c8';
            }
            else {
                let r = 0x9000 | destRindex(a);
                switch (b) {
                    case 'Z':
                        r |= 4;
                        break;
                    case 'Z+':
                        r |= 5;
                        break;
                    default:
                        throw 'Bad operand';
                }
                return zeroPad(r);
            }
        },
        LSL(a, _, byteLoc, l) {
            return OPTABLE['ADD'](a, a, byteLoc, l);
        },
        LSR(a) {
            const r = 0x9406 | destRindex(a);
            return zeroPad(r);
        },
        MOV(a, b) {
            const r = 0x2c00 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        MOVW(a, b) {
            const r = 0x0100 | ((destRindex(a) >> 1) & 0xf0) | ((destRindex(b) >> 5) & 0xf);
            return zeroPad(r);
        },
        MUL(a, b) {
            const r = 0x9c00 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        MULS(a, b) {
            const r = 0x0200 | (destRindex(a, 16, 31) & 0xf0) | (srcRindex(b, 16, 31) & 0xf);
            return zeroPad(r);
        },
        MULSU(a, b) {
            const r = 0x0300 | (destRindex(a, 16, 23) & 0x70) | (srcRindex(b, 16, 23) & 0x7);
            return zeroPad(r);
        },
        NEG(a) {
            const r = 0x9401 | destRindex(a);
            return zeroPad(r);
        },
        NOP() {
            return '0000';
        },
        OR(a, b) {
            const r = 0x2800 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        ORI(a, b) {
            let r = 0x6000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0xf);
            return zeroPad(r);
        },
        OUT(a, b) {
            let r = 0xb800 | destRindex(b);
            const A = constValue(a, 0, 63);
            r |= ((A & 0x30) << 5) | (A & 0x0f);
            return zeroPad(r);
        },
        POP(a) {
            const r = 0x900f | destRindex(a);
            return zeroPad(r);
        },
        PUSH(a) {
            const r = 0x920f | destRindex(a);
            return zeroPad(r);
        },
        RCALL(a, b, byteLoc, labels) {
            const k = constOrLabel(a, labels, byteLoc + 2);
            if (isNaN(k)) {
                return (l) => OPTABLE['RCALL'](a, b, byteLoc, l);
            }
            const r = 0xd000 | fitTwoC(constValue(k >> 1, -2048, 2047), 12);
            return zeroPad(r);
        },
        RET() {
            return '9508';
        },
        RETI() {
            return '9518';
        },
        RJMP(a, b, byteLoc, labels) {
            const k = constOrLabel(a, labels, byteLoc + 2);
            if (isNaN(k)) {
                return (l) => OPTABLE['RJMP'](a, b, byteLoc, l);
            }
            const r = 0xc000 | fitTwoC(constValue(k >> 1, -2048, 2047), 12);
            return zeroPad(r);
        },
        ROL(a, _, byteLoc, l) {
            return OPTABLE['ADC'](a, a, byteLoc, l);
        },
        ROR(a) {
            const r = 0x9407 | destRindex(a);
            return zeroPad(r);
        },
        SBC(a, b) {
            const r = 0x0800 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        SBCI(a, b) {
            let r = 0x4000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0x0f);
            return zeroPad(r);
        },
        SBI(a, b) {
            const r = 0x9a00 | (constValue(a, 0, 31) << 3) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        SBIC(a, b) {
            const r = 0x9900 | (constValue(a, 0, 31) << 3) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        SBIS(a, b) {
            const r = 0x9b00 | (constValue(a, 0, 31) << 3) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        SBIW(a, b) {
            let r = 0x9700;
            const dm = a.match(/[Rr](24|26|28|30)/);
            if (!dm) {
                throw 'Rd must be 24, 26, 28, or 30';
            }
            let d = parseInt(dm[1]);
            d = (d - 24) / 2;
            r |= (d & 0x3) << 4;
            const k = constValue(b, 0, 63);
            r |= ((k & 0x30) << 2) | (k & 0x0f);
            return zeroPad(r);
        },
        SBR(a, b) {
            let r = 0x6000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0x0f);
            return zeroPad(r);
        },
        SBRC(a, b) {
            const r = 0xfc00 | destRindex(a) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        SBRS(a, b) {
            const r = 0xfe00 | destRindex(a) | constValue(b, 0, 7);
            return zeroPad(r);
        },
        SEC() {
            return SEflag(0);
        },
        SEH() {
            return SEflag(5);
        },
        SEI() {
            return SEflag(7);
        },
        SEN() {
            return SEflag(2);
        },
        SER(a) {
            const r = 0xef0f | (destRindex(a, 16, 31) & 0xf0);
            return zeroPad(r);
        },
        SES() {
            return SEflag(4);
        },
        SET() {
            return SEflag(6);
        },
        SEV() {
            return SEflag(3);
        },
        SEZ() {
            return SEflag(1);
        },
        SLEEP() {
            return '9588';
        },
        SPM(a) {
            if (typeof a === 'undefined' || a === '') {
                return '95e8';
            }
            else {
                if (a !== 'Z+') {
                    throw 'Bad param to SPM';
                }
                return '95f8';
            }
        },
        ST(a, b) {
            const r = 0x0200 | destRindex(b) | stldXYZ(a);
            return zeroPad(r);
        },
        STD(a, b) {
            const r = 0x0200 | destRindex(b) | stldYZq(a);
            return zeroPad(r);
        },
        STS(a, b) {
            const k = constValue(a, 0, 65535);
            const r = 0x9200 | destRindex(b);
            return [zeroPad(r), zeroPad(k)];
        },
        SUB(a, b) {
            const r = 0x1800 | destRindex(a) | srcRindex(b);
            return zeroPad(r);
        },
        SUBI(a, b) {
            let r = 0x5000 | (destRindex(a, 16, 31) & 0xf0);
            const k = constValue(b);
            r |= ((k & 0xf0) << 4) | (k & 0xf);
            return zeroPad(r);
        },
        SWAP(a) {
            const r = 0x9402 | destRindex(a);
            return zeroPad(r);
        },
        TST(a, _, byteLoc, l) {
            return OPTABLE['AND'](a, a, byteLoc, l);
        },
        WDR() {
            return '95a8';
        },
        XCH(a, b) {
            const r = 0x9204 | destRindex(b);
            if (a !== 'Z') {
                throw 'Bad param, not Z';
            }
            return zeroPad(r);
        },
    };
    function passOne(inputdata) {
        const lines = inputdata.split('\n');
        const commentReg = /[#;].*$/;
        const labelReg = /^(\w+):/;
        const codeReg = /^\s*(\w+)(?:\s+([^,]+)(?:,\s*(\S+))?)?\s*$/;
        let lt;
        let res;
        let rets;
        let instruction;
        let byteOffset = 0;
        const lableTable = {};
        const replacements = {};
        const errorTable = [];
        const lineTable = [];
        for (let idx = 0; idx < lines.length; idx++) {
            res = lines[idx].trim();
            if (res.length === 0) {
                continue;
            }
            lt = { line: idx + 1, text: res, bytes: [], byteOffset: 0 };
            res = res.replace(commentReg, '').trim();
            if (res.length === 0) {
                continue;
            }
            rets = res.match(labelReg);
            if (rets) {
                lableTable[rets[1]] = byteOffset;
                res = res.replace(labelReg, '').trim();
            }
            if (res.length === 0) {
                continue;
            }
            const resMatch = res.match(codeReg);
            try {
                if (resMatch === null) {
                    throw "doesn't match as code!";
                }
                if (!resMatch[1]) {
                    throw 'Empty mnemonic field!';
                }
                instruction = resMatch[1].toUpperCase().trim();
                switch (instruction) {
                    case '_REPLACE':
                        replacements[resMatch[2]] = resMatch[3];
                        continue;
                    case '_LOC': {
                        const num = parseInt(resMatch[2]);
                        if (isNaN(num)) {
                            throw 'Location is not a number.';
                        }
                        if (num & 0x1) {
                            throw 'Location is odd';
                        }
                        byteOffset = num;
                        continue;
                    }
                    case '_IW': {
                        const num = parseInt(resMatch[2]);
                        if (isNaN(num)) {
                            throw 'Immeadiate Word is not a number.';
                        }
                        lt.bytes = zeroPad(num);
                        lt.byteOffset = byteOffset;
                        byteOffset += 2;
                        continue;
                    }
                }
                if (!(instruction in OPTABLE)) {
                    throw 'No such instruction: ' + instruction;
                }
                if (resMatch[2] in replacements) {
                    resMatch[2] = replacements[resMatch[2]];
                }
                if (resMatch[3] in replacements) {
                    resMatch[3] = replacements[resMatch[3]];
                }
                const bytes = OPTABLE[instruction](resMatch[2], resMatch[3], byteOffset, lableTable);
                lt.byteOffset = byteOffset;
                switch (typeof bytes) {
                    case 'function':
                    case 'string':
                        byteOffset += 2;
                        break;
                    case 'object':
                        byteOffset += bytes.length * 2;
                        break;
                    default:
                        throw 'unknown return type from optable.';
                }
                lt.bytes = bytes;
                lineTable.push(lt);
            }
            catch (err) {
                errorTable.push('Line ' + idx + ': ' + err);
            }
        }
        return {
            labels: lableTable,
            errors: errorTable,
            lines: lineTable,
        };
    }
    function elementSize(lt) {
        return typeof lt.bytes === 'string' ? lt.bytes.length / 2 : lt.bytes.length * 2;
    }
    function passTwo(lineTable, labels) {
        const errorTable = [];
        const lastElement = lineTable[lineTable.length - 1];
        const byteSize = lastElement ? lastElement.byteOffset + elementSize(lastElement) : 0;
        const resultTable = new Uint8Array(byteSize);
        for (const ltEntry of lineTable) {
            try {
                if (typeof ltEntry.bytes === 'function') {
                    ltEntry.bytes = ltEntry.bytes(labels);
                }
                if (ltEntry.bytes instanceof Array &&
                    ltEntry.bytes.length >= 1 &&
                    typeof ltEntry.bytes[0] === 'function') {
                    ltEntry.bytes = ltEntry.bytes[0](labels);
                }
                switch (typeof ltEntry.bytes) {
                    case 'string':
                        resultTable[ltEntry.byteOffset + 1] = parseInt(ltEntry.bytes.substr(0, 2), 16);
                        resultTable[ltEntry.byteOffset] = parseInt(ltEntry.bytes.substr(2, 4), 16);
                        break;
                    case 'object':
                        if (ltEntry.bytes.length < 1) {
                            throw 'Empty array in lineTable.';
                        }
                        for (let j = 0, bi = ltEntry.byteOffset; j < ltEntry.bytes.length; j++, bi += 2) {
                            const value = ltEntry.bytes[j];
                            if (typeof value !== 'string') {
                                throw 'Not an array of strings.';
                            }
                            resultTable[bi + 1] = parseInt(value.substr(0, 2), 16);
                            resultTable[bi] = parseInt(value.substr(2, 4), 16);
                        }
                        break;
                    default:
                        throw 'unknown return type from optable.';
                }
            }
            catch (err) {
                errorTable.push('Line: ' + ltEntry.line + ': ' + err);
            }
        }
        return { errors: errorTable, bytes: resultTable, lines: lineTable, labels };
    }
    function assemble(input) {
        const mid = passOne(input);
        if (mid.errors.length > 0) {
            return {
                bytes: new Uint8Array(0),
                errors: mid.errors,
                lines: [],
                labels: {},
            };
        }
        return passTwo(mid.lines, mid.labels);
    }
    exports.assemble = assemble;
});
define("lib/avr8js/utils/test-utils", ["require", "exports", "lib/avr8js/utils/assembler", "lib/avr8js/cpu/instruction"], function (require, exports, assembler_1, instruction_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TestProgramRunner = exports.asmProgram = void 0;
    const BREAK_OPCODE = 0x9598;
    function asmProgram(source) {
        const { bytes, errors, lines, labels } = (0, assembler_1.assemble)(source);
        if (errors.length) {
            throw new Error('Assembly failed: ' + errors);
        }
        return { program: new Uint16Array(bytes.buffer), lines, instructionCount: lines.length, labels };
    }
    exports.asmProgram = asmProgram;
    const defaultOnBreak = () => {
        throw new Error('BREAK instruction encountered');
    };
    class TestProgramRunner {
        constructor(cpu, onBreak = defaultOnBreak) {
            this.cpu = cpu;
            this.onBreak = onBreak;
        }
        runInstructions(count) {
            const { cpu, onBreak } = this;
            for (let i = 0; i < count; i++) {
                if (cpu.progMem[cpu.pc] === BREAK_OPCODE) {
                    onBreak === null || onBreak === void 0 ? void 0 : onBreak(cpu);
                }
                (0, instruction_2.avrInstruction)(cpu);
                cpu.tick();
            }
        }
        runUntil(predicate, maxIterations = 5000) {
            const { cpu, onBreak } = this;
            for (let i = 0; i < maxIterations; i++) {
                if (cpu.progMem[cpu.pc] === BREAK_OPCODE) {
                    onBreak === null || onBreak === void 0 ? void 0 : onBreak(cpu);
                }
                if (predicate(cpu)) {
                    return;
                }
                (0, instruction_2.avrInstruction)(cpu);
                cpu.tick();
            }
            throw new Error('Test program ran for too long, check your predicate');
        }
        runToBreak() {
            this.runUntil((cpu) => cpu.progMem[cpu.pc] === BREAK_OPCODE);
        }
        runToAddress(byteAddr) {
            this.runUntil((cpu) => cpu.pc * 2 === byteAddr);
        }
    }
    exports.TestProgramRunner = TestProgramRunner;
});
define("boards/arduino/arduino-mega/configs", ["require", "exports", "lib/avr8js/index"], function (require, exports, avr8js_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.adcConfig = exports.twiConfig = exports.usart3Config = exports.usart2Config = exports.usart1Config = exports.usart0Config = exports.timer5Config = exports.timer4Config = exports.timer3Config = exports.timer2Config = exports.timer1Config = exports.timer0Config = exports.spiConfig = void 0;
    exports.spiConfig = Object.assign(Object.assign({}, avr8js_3.spiConfig), { spiInterrupt: 0x30 });
    const defaultTimerBits = {
        TOV: 1,
        OCFA: 2,
        OCFB: 4,
        OCFC: 0,
        TOIE: 1,
        OCIEA: 2,
        OCIEB: 4,
        OCIEC: 0,
    };
    const timer01Dividers = {
        0: 0,
        1: 1,
        2: 8,
        3: 64,
        4: 256,
        5: 1024,
        6: 0,
        7: 0,
    };
    exports.timer0Config = Object.assign({ ICR: 0, OCRA: 0x47, OCRB: 0x48, OCRC: 0, TCCRA: 0x44, TCCRB: 0x45, TCCRC: 0, TCNT: 0x46, TIFR: 0x35, TIMSK: 0x6E, bits: 8, captureInterrupt: 0, compAInterrupt: 0x2A, compBInterrupt: 0x2C, compCInterrupt: 0, compPinA: 7, compPinB: 5, compPinC: 0, compPortA: avr8js_3.portBConfig.PORT, compPortB: avr8js_3.portGConfig.PORT, compPortC: 0, dividers: timer01Dividers, externalClockPin: 7, externalClockPort: avr8js_3.portDConfig.PORT, ovfInterrupt: 0x2E }, defaultTimerBits);
    exports.timer1Config = Object.assign({ ICR: 0x86, OCRA: 0x88, OCRB: 0x8A, OCRC: 0x8C, TCCRA: 0x80, TCCRB: 0x81, TCCRC: 0x82, TCNT: 0x84, TIFR: 0x36, TIMSK: 0x6F, bits: 16, captureInterrupt: 0x20, compAInterrupt: 0x22, compBInterrupt: 0x24, compCInterrupt: 0x26, compPinA: 5, compPinB: 6, compPinC: 7, compPortA: avr8js_3.portBConfig.PORT, compPortB: avr8js_3.portBConfig.PORT, compPortC: avr8js_3.portBConfig.PORT, dividers: timer01Dividers, externalClockPin: 6, externalClockPort: avr8js_3.portDConfig.PORT, ovfInterrupt: 0x28 }, defaultTimerBits);
    exports.timer2Config = Object.assign({ ICR: 0, OCRA: 0xB3, OCRB: 0xB4, OCRC: 0, TCCRA: 0xB0, TCCRB: 0xB1, TCCRC: 0, TCNT: 0xB2, TIFR: 0x37, TIMSK: 0x70, bits: 8, captureInterrupt: 0, compAInterrupt: 0x1A, compBInterrupt: 0x1C, compCInterrupt: 0x1E, compPinA: 4, compPinB: 6, compPinC: 0, compPortA: avr8js_3.portBConfig.PORT, compPortB: avr8js_3.portHConfig.PORT, compPortC: 0, dividers: {
            0: 0,
            1: 1,
            2: 8,
            3: 32,
            4: 64,
            5: 128,
            6: 256,
            7: 1024,
        }, externalClockPin: 0, externalClockPort: 0, ovfInterrupt: 0x12 }, defaultTimerBits);
    exports.timer3Config = Object.assign({ ICR: 0x96, OCRA: 0x98, OCRB: 0x9A, OCRC: 0x9C, TCCRA: 0x90, TCCRB: 0x91, TCCRC: 0x92, TCNT: 0x94, TIFR: 0x38, TIMSK: 0x71, bits: 16, captureInterrupt: 0x3E, compAInterrupt: 0x40, compBInterrupt: 0x42, compCInterrupt: 0x44, compPinA: 3, compPinB: 4, compPinC: 5, compPortA: avr8js_3.portEConfig.PORT, compPortB: avr8js_3.portEConfig.PORT, compPortC: avr8js_3.portEConfig.PORT, dividers: timer01Dividers, externalClockPin: 6, externalClockPort: avr8js_3.portEConfig.PORT, ovfInterrupt: 0x46 }, defaultTimerBits);
    exports.timer4Config = Object.assign({ ICR: 0xA6, OCRA: 0xA8, OCRB: 0xAB, OCRC: 0xAC, TCCRA: 0xA0, TCCRB: 0xA1, TCCRC: 0xA2, TCNT: 0xA4, TIFR: 0x39, TIMSK: 0x72, bits: 16, captureInterrupt: 0x52, compAInterrupt: 0x54, compBInterrupt: 0x56, compCInterrupt: 0x58, compPinA: 3, compPinB: 4, compPinC: 5, compPortA: avr8js_3.portHConfig.PORT, compPortB: avr8js_3.portHConfig.PORT, compPortC: avr8js_3.portHConfig.PORT, dividers: timer01Dividers, externalClockPin: 7, externalClockPort: avr8js_3.portHConfig.PORT, ovfInterrupt: 0x5A }, defaultTimerBits);
    exports.timer5Config = Object.assign({ ICR: 0x126, OCRA: 0x128, OCRB: 0x12A, OCRC: 0x12C, TCCRA: 0x120, TCCRB: 0x121, TCCRC: 0x122, TCNT: 0x124, TIFR: 0x3A, TIMSK: 0x73, bits: 16, captureInterrupt: 0x5C, compAInterrupt: 0x5E, compBInterrupt: 0x60, compCInterrupt: 0x62, compPinA: 3, compPinB: 4, compPinC: 5, compPortA: avr8js_3.portLConfig.PORT, compPortB: avr8js_3.portLConfig.PORT, compPortC: avr8js_3.portLConfig.PORT, dividers: timer01Dividers, externalClockPin: 2, externalClockPort: avr8js_3.portLConfig.PORT, ovfInterrupt: 0x64 }, defaultTimerBits);
    exports.usart0Config = {
        rxCompleteInterrupt: 0x32,
        dataRegisterEmptyInterrupt: 0x34,
        txCompleteInterrupt: 0x36,
        UCSRA: 0xc0,
        UCSRB: 0xc1,
        UCSRC: 0xc2,
        UBRRL: 0xc4,
        UBRRH: 0xc5,
        UDR: 0xc6,
    };
    exports.usart1Config = {
        rxCompleteInterrupt: 0x48,
        dataRegisterEmptyInterrupt: 0x4A,
        txCompleteInterrupt: 0x4C,
        UCSRA: 0xc8,
        UCSRB: 0xc9,
        UCSRC: 0xca,
        UBRRL: 0xcc,
        UBRRH: 0xcd,
        UDR: 0xce,
    };
    exports.usart2Config = {
        rxCompleteInterrupt: 0x66,
        dataRegisterEmptyInterrupt: 0x68,
        txCompleteInterrupt: 0x6A,
        UCSRA: 0xD0,
        UCSRB: 0xD1,
        UCSRC: 0xD2,
        UBRRL: 0xD4,
        UBRRH: 0xD5,
        UDR: 0xD6,
    };
    exports.usart3Config = {
        rxCompleteInterrupt: 0x6C,
        dataRegisterEmptyInterrupt: 0x6E,
        txCompleteInterrupt: 0x70,
        UCSRA: 0x130,
        UCSRB: 0x131,
        UCSRC: 0x132,
        UBRRL: 0x134,
        UBRRH: 0x135,
        UDR: 0x136,
    };
    exports.twiConfig = {
        twiInterrupt: 0x4E,
        TWBR: 0xb8,
        TWSR: 0xb9,
        TWAR: 0xba,
        TWDR: 0xbb,
        TWCR: 0xbc,
        TWAMR: 0xbd,
    };
    exports.adcConfig = {
        ADMUX: 0x7c,
        ADCSRA: 0x7a,
        ADCSRB: 0x7b,
        ADCL: 0x78,
        ADCH: 0x79,
        DIDR0: 0x7e,
        adcInterrupt: 0x3a,
        numChannels: 16,
        muxInputMask: 0xf,
        muxChannels: avr8js_3.atmega328Channels,
        adcReferences: [
            avr8js_3.ADCReference.AREF,
            avr8js_3.ADCReference.AVCC,
            avr8js_3.ADCReference.Reserved,
            avr8js_3.ADCReference.Internal1V1,
        ],
    };
});
define("boards/arduino/arduino-mega/arduino-mega", ["require", "exports", "lib/avr8js/index", "boards/arduino/arduino-mega/configs", "boards/arduino/arduino"], function (require, exports, avr8js_4, configs_1, arduino_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArduinoMega = void 0;
    class ArduinoMega {
        constructor(program) {
            const avrCPU = new avr8js_4.CPU(program, 0x2200);
            const adc = new avr8js_4.AVRADC(avrCPU, configs_1.adcConfig);
            const portA = new avr8js_4.AVRIOPort(avrCPU, avr8js_4.portAConfig);
            const portB = new avr8js_4.AVRIOPort(avrCPU, avr8js_4.portBConfig);
            const portC = new avr8js_4.AVRIOPort(avrCPU, avr8js_4.portCConfig);
            const portD = new avr8js_4.AVRIOPort(avrCPU, avr8js_4.portDConfig);
            const portE = new avr8js_4.AVRIOPort(avrCPU, avr8js_4.portEConfig);
            const portF = new avr8js_4.AVRIOPort(avrCPU, avr8js_4.portFConfig);
            const portG = new avr8js_4.AVRIOPort(avrCPU, avr8js_4.portGConfig);
            const portH = new avr8js_4.AVRIOPort(avrCPU, avr8js_4.portHConfig);
            const portJ = new avr8js_4.AVRIOPort(avrCPU, avr8js_4.portJConfig);
            const portK = new avr8js_4.AVRIOPort(avrCPU, avr8js_4.portKConfig);
            const portL = new avr8js_4.AVRIOPort(avrCPU, avr8js_4.portLConfig);
            this.cpu = new arduino_2.ArduinoCPU(avrCPU);
            this.spis = [new arduino_2.ArduinoSPI(new avr8js_4.AVRSPI(avrCPU, configs_1.spiConfig, arduino_2.MHZ))];
            this.timers = [
                new arduino_2.ArduinoTimer(new avr8js_4.AVRTimer(avrCPU, configs_1.timer0Config)),
                new arduino_2.ArduinoTimer(new avr8js_4.AVRTimer(avrCPU, configs_1.timer1Config)),
                new arduino_2.ArduinoTimer(new avr8js_4.AVRTimer(avrCPU, configs_1.timer2Config)),
                new arduino_2.ArduinoTimer(new avr8js_4.AVRTimer(avrCPU, configs_1.timer3Config)),
                new arduino_2.ArduinoTimer(new avr8js_4.AVRTimer(avrCPU, configs_1.timer4Config)),
                new arduino_2.ArduinoTimer(new avr8js_4.AVRTimer(avrCPU, configs_1.timer5Config))
            ];
            this.twis = [new arduino_2.ArduinoTWI(new avr8js_4.AVRTWI(avrCPU, configs_1.twiConfig, arduino_2.MHZ))];
            this.usarts = [
                new arduino_2.ArduinoUSART(new avr8js_4.AVRUSART(avrCPU, configs_1.usart0Config, arduino_2.MHZ)),
                new arduino_2.ArduinoUSART(new avr8js_4.AVRUSART(avrCPU, configs_1.usart1Config, arduino_2.MHZ)),
                new arduino_2.ArduinoUSART(new avr8js_4.AVRUSART(avrCPU, configs_1.usart2Config, arduino_2.MHZ)),
                new arduino_2.ArduinoUSART(new avr8js_4.AVRUSART(avrCPU, configs_1.usart3Config, arduino_2.MHZ)),
            ];
            this.pins = [
                { digital: new arduino_2.ArduinoDigital(portE, 0), usart: this.usarts[0] },
                { digital: new arduino_2.ArduinoDigital(portE, 1), usart: this.usarts[0] },
                { digital: new arduino_2.ArduinoDigital(portE, 4) },
                { digital: new arduino_2.ArduinoDigital(portE, 5) },
                { digital: new arduino_2.ArduinoDigital(portG, 5) },
                { digital: new arduino_2.ArduinoDigital(portE, 3) },
                { digital: new arduino_2.ArduinoDigital(portH, 3) },
                { digital: new arduino_2.ArduinoDigital(portH, 4) },
                { digital: new arduino_2.ArduinoDigital(portH, 5) },
                { digital: new arduino_2.ArduinoDigital(portH, 6) },
                { digital: new arduino_2.ArduinoDigital(portB, 4) },
                { digital: new arduino_2.ArduinoDigital(portB, 5) },
                { digital: new arduino_2.ArduinoDigital(portB, 6) },
                { digital: new arduino_2.ArduinoDigital(portB, 7) },
                { digital: new arduino_2.ArduinoDigital(portJ, 1), usart: this.usarts[3] },
                { digital: new arduino_2.ArduinoDigital(portJ, 0), usart: this.usarts[3] },
                { digital: new arduino_2.ArduinoDigital(portH, 1), usart: this.usarts[2] },
                { digital: new arduino_2.ArduinoDigital(portH, 0), usart: this.usarts[2] },
                { digital: new arduino_2.ArduinoDigital(portD, 3), usart: this.usarts[1] },
                { digital: new arduino_2.ArduinoDigital(portD, 2), usart: this.usarts[1] },
                { digital: new arduino_2.ArduinoDigital(portD, 1), twi: this.twis[0] },
                { digital: new arduino_2.ArduinoDigital(portD, 0), twi: this.twis[0] },
                { digital: new arduino_2.ArduinoDigital(portA, 0) },
                { digital: new arduino_2.ArduinoDigital(portA, 1) },
                { digital: new arduino_2.ArduinoDigital(portA, 2) },
                { digital: new arduino_2.ArduinoDigital(portA, 3) },
                { digital: new arduino_2.ArduinoDigital(portA, 4) },
                { digital: new arduino_2.ArduinoDigital(portA, 5) },
                { digital: new arduino_2.ArduinoDigital(portA, 6) },
                { digital: new arduino_2.ArduinoDigital(portA, 7) },
                { digital: new arduino_2.ArduinoDigital(portC, 7) },
                { digital: new arduino_2.ArduinoDigital(portC, 6) },
                { digital: new arduino_2.ArduinoDigital(portC, 5) },
                { digital: new arduino_2.ArduinoDigital(portC, 4) },
                { digital: new arduino_2.ArduinoDigital(portC, 3) },
                { digital: new arduino_2.ArduinoDigital(portC, 2) },
                { digital: new arduino_2.ArduinoDigital(portC, 1) },
                { digital: new arduino_2.ArduinoDigital(portC, 0) },
                { digital: new arduino_2.ArduinoDigital(portD, 7) },
                { digital: new arduino_2.ArduinoDigital(portG, 2) },
                { digital: new arduino_2.ArduinoDigital(portG, 1) },
                { digital: new arduino_2.ArduinoDigital(portG, 0) },
                { digital: new arduino_2.ArduinoDigital(portL, 7) },
                { digital: new arduino_2.ArduinoDigital(portL, 6) },
                { digital: new arduino_2.ArduinoDigital(portL, 5) },
                { digital: new arduino_2.ArduinoDigital(portL, 4) },
                { digital: new arduino_2.ArduinoDigital(portL, 3) },
                { digital: new arduino_2.ArduinoDigital(portL, 2) },
                { digital: new arduino_2.ArduinoDigital(portL, 1) },
                { digital: new arduino_2.ArduinoDigital(portL, 0) },
                { digital: new arduino_2.ArduinoDigital(portB, 3), spi: this.spis[0] },
                { digital: new arduino_2.ArduinoDigital(portB, 2), spi: this.spis[0] },
                { digital: new arduino_2.ArduinoDigital(portB, 1), spi: this.spis[0] },
                { digital: new arduino_2.ArduinoDigital(portB, 0), spi: this.spis[0] },
                { digital: new arduino_2.ArduinoDigital(portF, 0), analog: new arduino_2.ArduinoAnalog(adc, 0) },
                { digital: new arduino_2.ArduinoDigital(portF, 1), analog: new arduino_2.ArduinoAnalog(adc, 1) },
                { digital: new arduino_2.ArduinoDigital(portF, 2), analog: new arduino_2.ArduinoAnalog(adc, 2) },
                { digital: new arduino_2.ArduinoDigital(portF, 3), analog: new arduino_2.ArduinoAnalog(adc, 3) },
                { digital: new arduino_2.ArduinoDigital(portF, 4), analog: new arduino_2.ArduinoAnalog(adc, 4) },
                { digital: new arduino_2.ArduinoDigital(portF, 5), analog: new arduino_2.ArduinoAnalog(adc, 5) },
                { digital: new arduino_2.ArduinoDigital(portF, 6), analog: new arduino_2.ArduinoAnalog(adc, 6) },
                { digital: new arduino_2.ArduinoDigital(portF, 7), analog: new arduino_2.ArduinoAnalog(adc, 7) },
                { digital: new arduino_2.ArduinoDigital(portK, 0), analog: new arduino_2.ArduinoAnalog(adc, 8) },
                { digital: new arduino_2.ArduinoDigital(portK, 1), analog: new arduino_2.ArduinoAnalog(adc, 9) },
                { digital: new arduino_2.ArduinoDigital(portK, 2), analog: new arduino_2.ArduinoAnalog(adc, 10) },
                { digital: new arduino_2.ArduinoDigital(portK, 3), analog: new arduino_2.ArduinoAnalog(adc, 11) },
                { digital: new arduino_2.ArduinoDigital(portK, 4), analog: new arduino_2.ArduinoAnalog(adc, 12) },
                { digital: new arduino_2.ArduinoDigital(portK, 5), analog: new arduino_2.ArduinoAnalog(adc, 13) },
                { digital: new arduino_2.ArduinoDigital(portK, 6), analog: new arduino_2.ArduinoAnalog(adc, 14) },
                { digital: new arduino_2.ArduinoDigital(portK, 7), analog: new arduino_2.ArduinoAnalog(adc, 15) },
            ];
        }
    }
    exports.ArduinoMega = ArduinoMega;
    ArduinoMega.FLASH = 0x40000;
});
define("interopManager", ["require", "exports", "lib/TimingPacket", "lib/avr8js/index", "lib/compile-util", "lib/execute", "boards/arduino/arduino-uno/arduino-uno", "boards/arduino/arduino-mega/arduino-mega"], function (require, exports, TimingPacket_1, index_1, compile_util_2, execute_3, arduino_uno_3, arduino_mega_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.interopManager = void 0;
    var interopManager;
    (function (interopManager) {
        class InteropManager {
            constructor() {
                this.interopLoc = "ADArCWebApp";
                this.runner = execute_3.AVRRunner.getInstance();
                this.awaitResponseOn = [];
                this.prevB = 0;
                this.prevC = 0;
                this.prevD = 0;
            }
            getChangedPins(newReg, regIndex) {
                var diff;
                var delta;
                if (regIndex === 0) {
                    diff = newReg ^ this.prevB;
                    delta = 8;
                }
                else if (regIndex === 1) {
                    diff = newReg ^ this.prevC;
                    delta = 14;
                }
                else {
                    diff = newReg ^ this.prevD;
                    delta = 0;
                }
                return [...Array(8)].map((x, i) => ((diff >> i) & 1) * (i + 1)).filter(e => e !== 0).map(e => e + (delta - 1));
            }
            startCodeLoop() {
                this.runner.board.usarts[0].onByteTransmit = ((value) => __awaiter(this, void 0, void 0, function* () {
                    yield DotNet.invokeMethodAsync(this.interopLoc, "sendSerial", String.fromCharCode(value));
                }));
                this.runCode();
            }
            getWindowWidth() {
                return window.innerWidth;
            }
            getWindowHeight() {
                return window.innerHeight;
            }
            getModel() {
                return window.monaco.editor.getModels()[0];
            }
            updateCodeInPane(code) {
                this.getModel().setValue(code);
            }
            getCodeInPane() {
                return this.getModel().getValue();
            }
            makeMonacoError(message, line, column) {
                var marker = {
                    message: message,
                    severity: monaco.MarkerSeverity.Error,
                    startLineNumber: line,
                    startColumn: column,
                    endLineNumber: line,
                    endColumn: column,
                };
                window.monaco.editor.setModelMarkers(this.getModel(), "owner", [marker]);
            }
            clearMonacoErrors() {
                window.monaco.editor.setModelMarkers(this.getModel(), "owner", []);
            }
            compile() {
                return __awaiter(this, void 0, void 0, function* () {
                    var res = yield (0, compile_util_2.buildHex)(this.getCodeInPane());
                    yield this.runner.loadProgram(res.hex);
                    return { stdout: res.stdout, stderr: res.stderr };
                });
            }
            runCode() {
                this.runner.execute(cpu => {
                });
            }
            stop() {
                this.runner.stop();
                this.runner.pausedOn = [];
            }
            addResponseReqFlag(absoluteIndex) {
                this.awaitResponseOn.push(absoluteIndex);
            }
            removeResponseReqFlag(absoluteIndex) {
                const indexInAwaits = this.awaitResponseOn.indexOf(absoluteIndex);
                if (indexInAwaits > -1) {
                    this.awaitResponseOn.splice(indexInAwaits, 1);
                }
            }
            arduinoInput(insts) {
                var real = TimingPacket_1.TimingPacket.fix(insts);
                this.runner.instructions.push(real);
                const index = this.runner.pausedOn.indexOf(insts.instructions[0].pin);
                if (index > -1) {
                    this.runner.pausedOn.splice(index, 1);
                }
            }
            getPinState(index) {
                const state = this.runner.board.pins[index].digital.state;
                if (state == index_1.PinState.High || state == index_1.PinState.InputPullUp) {
                    return true;
                }
                else {
                    return false;
                }
            }
            downloadFile(filename, contentStreamRef) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield contentStreamRef;
                    filename = new Date(Date.now()).toISOString() + " - " + filename;
                    console.log(filename);
                    const data = yield contentStreamRef.arrayBuffer();
                    const blob = new Blob([data]);
                    const url = URL.createObjectURL(blob);
                    const anchor = document.createElement('a');
                    anchor.href = url;
                    anchor.download = filename !== null && filename !== void 0 ? filename : "";
                    anchor.click();
                    anchor.remove();
                    URL.revokeObjectURL(url);
                });
            }
            runTutorial() {
                const intro = window.introJs().setOption('keyboardNavigation', false);
                ;
                if (intro) {
                    console.log("intro is a valid object");
                }
                else {
                    console.log("intro not valid");
                }
                intro.start();
            }
            setBoard(board) {
                let boardConstructor;
                switch (board) {
                    case execute_3.BoardType.ArduinoUno:
                        boardConstructor = arduino_uno_3.ArduinoUno;
                        break;
                    case execute_3.BoardType.ArduinoMega:
                        boardConstructor = arduino_mega_1.ArduinoMega;
                        break;
                }
                this.runner.boardConstructor = boardConstructor;
            }
        }
        interopManager.InteropManager = InteropManager;
        function getInteropManager() {
            return new InteropManager();
        }
        interopManager.getInteropManager = getInteropManager;
    })(interopManager || (exports.interopManager = interopManager = {}));
});
define("controllers/lcd1602i2c", ["require", "exports", "controllers/controller", "lib/execute"], function (require, exports, controller_1, execute_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fontA00 = exports.LCD1602I2C = exports.LCD1602_ADDR = void 0;
    exports.LCD1602_ADDR = 0x27;
    const LCD_MODE_CMD = 0x00;
    const LCD_MODE_DATA = 0x40;
    const LCD_CMD_CLEAR = 0x01;
    const LCD_CMD_HOME = 0x02;
    const LCD_CMD_ENTRY_MODE = 0x04;
    const LCD_CMD_ENTRY_MODE_INCREMENT = 0x02;
    const LCD_CMD_ENTRY_MODE_DECREMENT = 0x00;
    const LCD_CMD_ENTRY_MODE_SHIFT = 0x01;
    const LCD_CMD_DISPLAY_CONTROL = 0x08;
    const LCD_CMD_DISPLAY_ENABLE = 0x04;
    const LCD_CMD_DISPLAY_CURSOR = 0x02;
    const LCD_CMD_DISPLAY_CURSOR_BLINK = 0x01;
    const LCD_CMD_SHIFT = 0x10;
    const LCD_CMD_SHIFT_CURSOR = 0x00;
    const LCD_CMD_SHIFT_DISPLAY = 0x08;
    const LCD_CMD_SHIFT_LEFT = 0x00;
    const LCD_CMD_SHIFT_RIGHT = 0x04;
    const LCD_CMD_FUNCTION = 0x20;
    const LCD_CMD_FUNCTION_LCD_1LINE = 0x00;
    const LCD_CMD_FUNCTION_LCD_2LINE = 0x08;
    const LCD_CMD_FUNCTION_5x10_DOTS = 0x04;
    const LCD_CMD_SET_CGRAM_ADDR = 0x40;
    const LCD_CMD_SET_DRAM_ADDR = 0x80;
    const LCD_CMD_SET_CONTRAST = 0x81;
    const fOsc = 270000;
    class LCD1602I2C extends controller_1.Controller {
        constructor() {
            super(...arguments);
            this.cgram = new Uint8Array(64);
            this.ddram = new Uint8Array(128);
            this.addr = 0x00;
            this.shift = 0x00;
            this.data = 0x00;
            this.displayOn = false;
            this.blinkOn = false;
            this.cursorOn = false;
            this.backlight = false;
            this.firstByte = true;
            this.commandMode = false;
            this.cgramMode = false;
            this.cgramUpdated = true;
            this.incrementMode = true;
            this.shiftMode = false;
            this.is8bit = true;
            this.updated = false;
        }
        setup() {
            execute_4.AVRRunner.getInstance().board.twis[0].registerController(exports.LCD1602_ADDR, this);
        }
        cleanup() {
            this.cgram.fill(0);
            this.ddram.fill(0);
            this.addr = 0x00;
            this.shift = 0x00;
            this.data = 0x00;
            this.displayOn = false;
            this.blinkOn = false;
            this.cursorOn = false;
            this.backlight = false;
            this.firstByte = true;
            this.commandMode = false;
            this.cgramMode = false;
            this.cgramUpdated = true;
            this.incrementMode = true;
            this.shiftMode = false;
            this.is8bit = true;
            this.updated = false;
        }
        update() {
            if (this.updated) {
                this.updated = false;
                return this.render();
            }
            return false;
        }
        render() {
            let characters = new Uint8Array(32);
            if (this.displayOn) {
                const r1 = this.shift % 64;
                const r2 = 64 + this.shift % 64;
                characters.set(this.ddram.slice(r1, r1 + 16));
                characters.set(this.ddram.slice(r2, r2 + 16), 16);
            }
            else {
                characters.fill(32);
            }
            this.cgramUpdated = false;
            const backlight = this.element.querySelector(".backlight");
            const path = this.element.querySelector(".path");
            backlight.style.opacity = this.backlight ? '0' : '0.5';
            path.setAttribute("d", this.path(characters));
            this.renderCursor(this.addr % 64, Math.floor(this.addr / 64));
        }
        renderCursor(cursorX, cursorY) {
            const cursor = this.element.querySelector(".cursor");
            const xOffset = 12.45 + cursorX * 3.55;
            const yOffset = 12.55 + cursorY * 5.95;
            cursor.innerHTML = '';
            if (cursorX >= 0 && cursorX < 16 && cursorY >= 0 && cursorY < 2) {
                if (this.blinkOn) {
                    cursor.innerHTML += `
                        <rect x="${xOffset}" y="${yOffset}" width="2.95" height="5.55" fill="black">
                            <animate attributeName="opacity" values="0;0;0;0;1;1;0;0;0;0" dur="1s" fill="freeze" repeatCount="indefinite"/>
                        </rect>
                    `;
                }
                if (this.cursorOn) {
                    const y = yOffset + 0.7 * 7;
                    cursor.innerHTML += `
                        <rect x="${xOffset}" y="${y}" width="2.95" height="0.65" fill="black"/>
                    `;
                }
            }
        }
        path(characters) {
            const xSpacing = 0.6;
            const ySpacing = 0.7;
            const charXSpacing = 3.55;
            const charYSpacing = 5.95;
            const result = [];
            const cols = 16;
            for (let i = 0; i < characters.length; i++) {
                const charX = (i % cols) * charXSpacing;
                const charY = Math.floor(i / cols) * charYSpacing;
                for (let py = 0; py < 8; py++) {
                    const row = exports.fontA00[characters[i] * 8 + py];
                    for (let px = 0; px < 5; px++) {
                        if (row & (1 << px)) {
                            const x = (charX + px * xSpacing).toFixed(2);
                            const y = (charY + py * ySpacing).toFixed(2);
                            result.push(`M ${x} ${y}h0.55v0.65h-0.55Z`);
                        }
                    }
                }
            }
            return result.join(' ');
        }
        backlightOn(value) {
            if (this.backlight !== value) {
                this.backlight = value;
            }
        }
        i2cConnect() {
            return true;
        }
        i2cDisconnect() { }
        i2cReadByte() {
            return 0xff;
        }
        i2cWriteByte(value) {
            const data = value & 0xF0;
            const rs = (value & 0x01) ? true : false;
            const bl = (value & LCD_CMD_DISPLAY_CONTROL) ? true : false;
            this.backlightOn(bl);
            if ((value & 0x04) && !(value & 0x02)) {
                this.writeData(data, rs);
            }
            this.update();
            return this.updated = true;
        }
        writeData(value, rs) {
            if (!this.is8bit) {
                if (this.firstByte) {
                    this.firstByte = false;
                    this.data = value;
                    return false;
                }
                value = this.data | value >> 4;
                this.firstByte = true;
            }
            if (rs) {
                this.processData(value);
            }
            else {
                this.processCommand(value);
            }
            this.updated = true;
        }
        processCommand(value) {
            if (value & LCD_CMD_FUNCTION) {
                this.is8bit = (value & 0x10) ? true : false;
            }
            else if (value & LCD_CMD_SET_DRAM_ADDR) {
                this.cgramMode = false;
                this.addr = value & 0x7F;
            }
            else if (value & LCD_CMD_SET_CGRAM_ADDR) {
                this.cgramMode = true;
                this.addr = value & 0x3F;
            }
            else if (value & LCD_CMD_SHIFT) {
                const shiftDisplay = (value & LCD_CMD_SHIFT_DISPLAY) ? true : false;
                const shiftRight = (value & LCD_CMD_SHIFT_RIGHT) ? 1 : -1;
                this.cgramMode = false;
                this.addr = (this.addr + shiftRight) % 128;
                if (shiftDisplay) {
                    this.shift = (this.shift + shiftRight) % 64;
                }
            }
            else if (value & LCD_CMD_DISPLAY_CONTROL) {
                this.displayOn = (value & LCD_CMD_DISPLAY_ENABLE) ? true : false;
                this.blinkOn = (value & LCD_CMD_DISPLAY_CURSOR_BLINK) ? true : false;
                this.cursorOn = (value & LCD_CMD_DISPLAY_CURSOR) ? true : false;
            }
            else if (value & LCD_CMD_ENTRY_MODE) {
                this.cgramMode = false;
                this.incrementMode = (value & LCD_CMD_ENTRY_MODE_INCREMENT) ? true : false;
                this.shiftMode = (value & LCD_CMD_ENTRY_MODE_SHIFT) ? true : false;
            }
            else if (value & LCD_CMD_HOME) {
                this.cgramMode = false;
                this.addr = 0x00;
                this.shift = 0x00;
            }
            else if (value & LCD_CMD_CLEAR) {
                this.cgramMode = false;
                this.incrementMode = true;
                this.addr = 0x00;
                this.shift = 0x00;
                this.ddram.fill(32);
            }
            else {
                console.warn('Unknown LCD1602 Command', value.toString(16));
            }
        }
        processData(value) {
            if (this.cgramMode) {
                const data = (value & 0x01) << 4 | (value & 0x02) << 2 | (value & 0x04) | (value & 0x08) >> 2 | (value & 0x10) >> 4;
                this.cgram[this.addr] = data;
                this.addr = (this.addr + 1) % 64;
                this.cgramUpdated = true;
            }
            else {
                const mode = this.incrementMode ? 1 : -1;
                this.ddram[this.addr] = value;
                this.addr = (this.addr + mode) % 128,
                    this.shiftMode && (this.shift = (this.shift + mode) % 40);
            }
        }
    }
    exports.LCD1602I2C = LCD1602I2C;
    exports.fontA00 = new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        4, 4, 4, 4, 0, 0, 4, 0,
        10, 10, 10, 0, 0, 0, 0, 0,
        10, 10, 31, 10, 31, 10, 10, 0,
        4, 30, 5, 14, 20, 15, 4, 0,
        3, 19, 8, 4, 2, 25, 24, 0,
        6, 9, 5, 2, 21, 9, 22, 0,
        6, 4, 2, 0, 0, 0, 0, 0,
        8, 4, 2, 2, 2, 4, 8, 0,
        2, 4, 8, 8, 8, 4, 2, 0,
        0, 4, 21, 14, 21, 4, 0, 0,
        0, 4, 4, 31, 4, 4, 0, 0,
        0, 0, 0, 0, 6, 4, 2, 0,
        0, 0, 0, 31, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 6, 6, 0,
        0, 16, 8, 4, 2, 1, 0, 0,
        14, 17, 25, 21, 19, 17, 14, 0,
        4, 6, 4, 4, 4, 4, 14, 0,
        14, 17, 16, 8, 4, 2, 31, 0,
        31, 8, 4, 8, 16, 17, 14, 0,
        8, 12, 10, 9, 31, 8, 8, 0,
        31, 1, 15, 16, 16, 17, 14, 0,
        12, 2, 1, 15, 17, 17, 14, 0,
        31, 17, 16, 8, 4, 4, 4, 0,
        14, 17, 17, 14, 17, 17, 14, 0,
        14, 17, 17, 30, 16, 8, 6, 0,
        0, 6, 6, 0, 6, 6, 0, 0,
        0, 6, 6, 0, 6, 4, 2, 0,
        8, 4, 2, 1, 2, 4, 8, 0,
        0, 0, 31, 0, 31, 0, 0, 0,
        2, 4, 8, 16, 8, 4, 2, 0,
        14, 17, 16, 8, 4, 0, 4, 0,
        14, 17, 16, 22, 21, 21, 14, 0,
        14, 17, 17, 17, 31, 17, 17, 0,
        15, 17, 17, 15, 17, 17, 15, 0,
        14, 17, 1, 1, 1, 17, 14, 0,
        7, 9, 17, 17, 17, 9, 7, 0,
        31, 1, 1, 15, 1, 1, 31, 0,
        31, 1, 1, 15, 1, 1, 1, 0,
        14, 17, 1, 29, 17, 17, 30, 0,
        17, 17, 17, 31, 17, 17, 17, 0,
        14, 4, 4, 4, 4, 4, 14, 0,
        28, 8, 8, 8, 8, 9, 6, 0,
        17, 9, 5, 3, 5, 9, 17, 0,
        1, 1, 1, 1, 1, 1, 31, 0,
        17, 27, 21, 21, 17, 17, 17, 0,
        17, 17, 19, 21, 25, 17, 17, 0,
        14, 17, 17, 17, 17, 17, 14, 0,
        15, 17, 17, 15, 1, 1, 1, 0,
        14, 17, 17, 17, 21, 9, 22, 0,
        15, 17, 17, 15, 5, 9, 17, 0,
        30, 1, 1, 14, 16, 16, 15, 0,
        31, 4, 4, 4, 4, 4, 4, 0,
        17, 17, 17, 17, 17, 17, 14, 0,
        17, 17, 17, 17, 17, 10, 4, 0,
        17, 17, 17, 21, 21, 21, 10, 0,
        17, 17, 10, 4, 10, 17, 17, 0,
        17, 17, 17, 10, 4, 4, 4, 0,
        31, 16, 8, 4, 2, 1, 31, 0,
        7, 1, 1, 1, 1, 1, 7, 0,
        17, 10, 31, 4, 31, 4, 4, 0,
        14, 8, 8, 8, 8, 8, 14, 0,
        4, 10, 17, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 31, 0,
        2, 4, 8, 0, 0, 0, 0, 0,
        0, 0, 14, 16, 30, 17, 30, 0,
        1, 1, 13, 19, 17, 17, 15, 0,
        0, 0, 14, 1, 1, 17, 14, 0,
        16, 16, 22, 25, 17, 17, 30, 0,
        0, 0, 14, 17, 31, 1, 14, 0,
        12, 18, 2, 7, 2, 2, 2, 0,
        0, 30, 17, 17, 30, 16, 14, 0,
        1, 1, 13, 19, 17, 17, 17, 0,
        4, 0, 6, 4, 4, 4, 14, 0,
        8, 0, 12, 8, 8, 9, 6, 0,
        1, 1, 9, 5, 3, 5, 9, 0,
        6, 4, 4, 4, 4, 4, 14, 0,
        0, 0, 11, 21, 21, 17, 17, 0,
        0, 0, 13, 19, 17, 17, 17, 0,
        0, 0, 14, 17, 17, 17, 14, 0,
        0, 0, 15, 17, 15, 1, 1, 0,
        0, 0, 22, 25, 30, 16, 16, 0,
        0, 0, 13, 19, 1, 1, 1, 0,
        0, 0, 14, 1, 14, 16, 15, 0,
        2, 2, 7, 2, 2, 18, 12, 0,
        0, 0, 17, 17, 17, 25, 22, 0,
        0, 0, 17, 17, 17, 10, 4, 0,
        0, 0, 17, 21, 21, 21, 10, 0,
        0, 0, 17, 10, 4, 10, 17, 0,
        0, 0, 17, 17, 30, 16, 14, 0,
        0, 0, 31, 8, 4, 2, 31, 0,
        8, 4, 4, 2, 4, 4, 8, 0,
        4, 4, 4, 4, 4, 4, 4, 0,
        2, 4, 4, 8, 4, 4, 2, 0,
        0, 4, 8, 31, 8, 4, 0, 0,
        0, 4, 2, 31, 2, 4, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 7, 5, 7, 0,
        28, 4, 4, 4, 0, 0, 0, 0,
        0, 0, 0, 4, 4, 4, 7, 0,
        0, 0, 0, 0, 1, 2, 4, 0,
        0, 0, 0, 6, 6, 0, 0, 0,
        0, 31, 16, 31, 16, 8, 4, 0,
        0, 0, 31, 16, 12, 4, 2, 0,
        0, 0, 8, 4, 6, 5, 4, 0,
        0, 0, 4, 31, 17, 16, 12, 0,
        0, 0, 31, 4, 4, 4, 31, 0,
        0, 0, 8, 31, 12, 10, 9, 0,
        0, 0, 2, 31, 18, 10, 2, 0,
        0, 0, 0, 14, 8, 8, 31, 0,
        0, 0, 15, 8, 15, 8, 15, 0,
        0, 0, 0, 21, 21, 16, 12, 0,
        0, 0, 0, 31, 0, 0, 0, 0,
        31, 16, 20, 12, 4, 4, 2, 0,
        16, 8, 4, 6, 5, 4, 4, 0,
        4, 31, 17, 17, 16, 8, 4, 0,
        0, 31, 4, 4, 4, 4, 31, 0,
        8, 31, 8, 12, 10, 9, 8, 0,
        2, 31, 18, 18, 18, 18, 9, 0,
        4, 31, 4, 31, 4, 4, 4, 0,
        0, 30, 18, 17, 16, 8, 6, 0,
        2, 30, 9, 8, 8, 8, 4, 0,
        0, 31, 16, 16, 16, 16, 31, 0,
        10, 31, 10, 10, 8, 4, 2, 0,
        0, 3, 16, 19, 16, 8, 7, 0,
        0, 31, 16, 8, 4, 10, 17, 0,
        2, 31, 18, 10, 2, 2, 28, 0,
        0, 17, 17, 18, 16, 8, 6, 0,
        0, 30, 18, 21, 24, 8, 6, 0,
        8, 7, 4, 31, 4, 4, 2, 0,
        0, 21, 21, 21, 16, 8, 4, 0,
        14, 0, 31, 4, 4, 4, 2, 0,
        2, 2, 2, 6, 10, 2, 2, 0,
        4, 4, 31, 4, 4, 2, 1, 0,
        0, 14, 0, 0, 0, 0, 31, 0,
        0, 31, 16, 10, 4, 10, 1, 0,
        4, 31, 8, 4, 14, 21, 4, 0,
        8, 8, 8, 8, 8, 4, 2, 0,
        0, 4, 8, 17, 17, 17, 17, 0,
        1, 1, 31, 1, 1, 1, 30, 0,
        0, 31, 16, 16, 16, 8, 6, 0,
        0, 2, 5, 8, 16, 16, 0, 0,
        4, 31, 4, 4, 21, 21, 4, 0,
        0, 31, 16, 16, 10, 4, 8, 0,
        0, 14, 0, 14, 0, 14, 16, 0,
        0, 4, 2, 1, 17, 31, 16, 0,
        0, 16, 16, 10, 4, 10, 1, 0,
        0, 31, 2, 31, 2, 2, 28, 0,
        2, 2, 31, 18, 10, 2, 2, 0,
        0, 14, 8, 8, 8, 8, 31, 0,
        0, 31, 16, 31, 16, 16, 31, 0,
        14, 0, 31, 16, 16, 8, 4, 0,
        9, 9, 9, 9, 8, 4, 2, 0,
        0, 4, 5, 5, 21, 21, 13, 0,
        0, 1, 1, 17, 9, 5, 3, 0,
        0, 31, 17, 17, 17, 17, 31, 0,
        0, 31, 17, 17, 16, 8, 4, 0,
        0, 3, 0, 16, 16, 8, 7, 0,
        4, 9, 2, 0, 0, 0, 0, 0,
        7, 5, 7, 0, 0, 0, 0, 0,
        0, 0, 18, 21, 9, 9, 22, 0,
        10, 0, 14, 16, 30, 17, 30, 0,
        0, 0, 14, 17, 15, 17, 15, 1,
        0, 0, 14, 1, 6, 17, 14, 0,
        0, 0, 17, 17, 17, 25, 23, 1,
        0, 0, 30, 5, 9, 17, 14, 0,
        0, 0, 12, 18, 17, 17, 15, 1,
        0, 0, 30, 17, 17, 17, 30, 16,
        0, 0, 28, 4, 4, 5, 2, 0,
        0, 8, 11, 8, 0, 0, 0, 0,
        8, 0, 12, 8, 8, 8, 8, 8,
        0, 5, 2, 5, 0, 0, 0, 0,
        0, 4, 14, 5, 21, 14, 4, 0,
        2, 2, 7, 2, 7, 2, 30, 0,
        14, 0, 13, 19, 17, 17, 17, 0,
        10, 0, 14, 17, 17, 17, 14, 0,
        0, 0, 13, 19, 17, 17, 15, 1,
        0, 0, 22, 25, 17, 17, 30, 16,
        0, 14, 17, 31, 17, 17, 14, 0,
        0, 0, 0, 26, 21, 11, 0, 0,
        0, 0, 14, 17, 17, 10, 27, 0,
        10, 0, 17, 17, 17, 17, 25, 22,
        31, 1, 2, 4, 2, 1, 31, 0,
        0, 0, 31, 10, 10, 10, 25, 0,
        31, 0, 17, 10, 4, 10, 17, 0,
        0, 0, 17, 17, 17, 17, 30, 16,
        0, 16, 15, 4, 31, 4, 4, 0,
        0, 0, 31, 2, 30, 18, 17, 0,
        0, 0, 31, 21, 31, 17, 17, 0,
        0, 4, 0, 31, 0, 4, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        31, 31, 31, 31, 31, 31, 31, 31,
    ]);
});
define("controllers/max6675", ["require", "exports", "controllers/controller", "lib/execute", "lib/avr8js/index"], function (require, exports, controller_2, execute_5, avr8js_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MAX6675 = void 0;
    class MAX6675 extends controller_2.Controller {
        constructor() {
            super(...arguments);
            this.setTemperature = (temperature) => {
                this._temperature = temperature;
            };
            this.nextByteIsHigh = false;
            this.spiCallback = (byte) => {
                if (!this.shouldReadSPI) {
                    return;
                }
                if (this._temperature == undefined) {
                    console.log("Undefined\n");
                }
                let temperature = Math.round((this._temperature / 0.25) << 3);
                let byteToSend;
                if (!this.nextByteIsHigh) {
                    byteToSend = (temperature >> 8) & 0xFF;
                }
                else {
                    byteToSend = temperature & 0xFF;
                }
                this.nextByteIsHigh = !this.nextByteIsHigh;
                execute_5.AVRRunner.getInstance().board.cpu.addClockEvent(() => execute_5.AVRRunner.getInstance().board.spis[0].completeTransfer(byteToSend), execute_5.AVRRunner.getInstance().board.spis[0].transferCycles);
            };
        }
        setup() {
            execute_5.AVRRunner.getInstance().board.spis[0].addListener(this.spiCallback);
        }
        get shouldReadSPI() {
            return this.pins.cs[0].digital.state == avr8js_5.PinState.Low;
        }
    }
    exports.MAX6675 = MAX6675;
});
define("controllers/ky012", ["require", "exports", "controllers/controller", "lib/avr8js/index"], function (require, exports, controller_3, avr8js_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KY012 = void 0;
    class KY012 extends controller_3.Controller {
        constructor() {
            super(...arguments);
            this.audioContext = null;
            this.oscillator = null;
            this.gainNode = null;
            this.BUZZER_FREQUENCY = 2500;
            this.isActive = false;
        }
        setup() {
            this.initAudio();
            const signalPins = this.pins["digital_out"];
            if (!(signalPins === null || signalPins === void 0 ? void 0 : signalPins.length)) {
                console.warn("KY-012: Signal pin not connected");
                return;
            }
            signalPins[0].digital.addListener(this.handleStateChange.bind(this));
        }
        initAudio() {
            try {
                this.audioContext = new AudioContext();
                this.gainNode = this.audioContext.createGain();
                this.gainNode.gain.value = 0.1;
                this.gainNode.connect(this.audioContext.destination);
            }
            catch (err) {
                console.error("KY-012: Failed to initialize audio", err);
            }
        }
        handleStateChange(state) {
            switch (state) {
                case avr8js_6.PinState.High:
                    if (!this.isActive) {
                        this.startBuzzer();
                    }
                    break;
                case avr8js_6.PinState.Low:
                    if (this.isActive) {
                        this.stopBuzzer();
                    }
                    break;
                default:
                    if (this.isActive) {
                        this.stopBuzzer();
                    }
            }
        }
        startBuzzer() {
            try {
                if (!this.audioContext || this.audioContext.state === 'closed') {
                    this.initAudio();
                }
                this.oscillator = this.audioContext.createOscillator();
                this.oscillator.type = 'square';
                this.oscillator.frequency.setValueAtTime(this.BUZZER_FREQUENCY, this.audioContext.currentTime);
                this.oscillator.connect(this.gainNode);
                this.oscillator.start();
                this.isActive = true;
            }
            catch (err) {
                console.error("KY-012: Failed to start buzzer", err);
            }
        }
        stopBuzzer() {
            if (!this.isActive)
                return;
            try {
                if (this.oscillator) {
                    this.oscillator.stop();
                    this.oscillator.disconnect();
                    this.oscillator = null;
                }
                this.isActive = false;
            }
            catch (err) {
                console.error("KY-012: Failed to stop buzzer", err);
            }
        }
        cleanup() {
            this.stopBuzzer();
            if (this.audioContext) {
                this.audioContext.close();
                this.audioContext = null;
                this.gainNode = null;
            }
        }
    }
    exports.KY012 = KY012;
});
define("controllers/bno055", ["require", "exports", "controllers/controller", "lib/execute"], function (require, exports, controller_4, execute_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BNO055 = exports.BNO055_ADDR = void 0;
    exports.BNO055_ADDR = 0x28;
    const registers = {
        CHIP_ID: { address: 0x00, default: 0xA0 },
        ACCEL_X_LSB: { address: 0x08 },
        ACCEL_X_MSB: { address: 0x09 },
        ACCEL_Y_LSB: { address: 0x0A },
        ACCEL_Y_MSB: { address: 0x0B },
        ACCEL_Z_LSB: { address: 0x0C },
        ACCEL_Z_MSB: { address: 0x0D },
        MAG_X_LSB: { address: 0x0E },
        MAG_X_MSB: { address: 0x0F },
        MAG_Y_LSB: { address: 0x10 },
        MAG_Y_MSB: { address: 0x11 },
        MAG_Z_LSB: { address: 0x12 },
        MAG_Z_MSB: { address: 0x13 },
        GYRO_X_LSB: { address: 0x14 },
        GYRO_X_MSB: { address: 0x15 },
        GYRO_Y_LSB: { address: 0x16 },
        GYRO_Y_MSB: { address: 0x17 },
        GYRO_Z_LSB: { address: 0x18 },
        GYRO_Z_MSB: { address: 0x19 },
        EULER_HEADING_LSB: { address: 0x1A },
        EULER_HEADING_MSB: { address: 0x1B },
        EULER_ROLL_LSB: { address: 0x1C },
        EULER_ROLL_MSB: { address: 0x1D },
        EULER_PITCH_LSB: { address: 0x1E },
        EULER_PITCH_MSB: { address: 0x1F },
        QUATERNION_W_LSB: { address: 0x20 },
        QUATERNION_W_MSB: { address: 0x21 },
        QUATERNION_X_LSB: { address: 0x22 },
        QUATERNION_X_MSB: { address: 0x23 },
        QUATERNION_Y_LSB: { address: 0x24 },
        QUATERNION_Y_MSB: { address: 0x25 },
        QUATERNION_Z_LSB: { address: 0x26 },
        QUATERNION_Z_MSB: { address: 0x27 },
        LINEAR_ACCEL_X_LSB: { address: 0x28 },
        LINEAR_ACCEL_X_MSB: { address: 0x29 },
        LINEAR_ACCEL_Y_LSB: { address: 0x2A },
        LINEAR_ACCEL_Y_MSB: { address: 0x2B },
        LINEAR_ACCEL_Z_LSB: { address: 0x2C },
        LINEAR_ACCEL_Z_MSB: { address: 0x2D },
        GRAVITY_X_LSB: { address: 0x2E },
        GRAVITY_X_MSB: { address: 0x2F },
        GRAVITY_Y_LSB: { address: 0x30 },
        GRAVITY_Y_MSB: { address: 0x31 },
        GRAVITY_Z_LSB: { address: 0x32 },
        GRAVITY_Z_MSB: { address: 0x33 },
        TEMP: { address: 0x34 },
        CALIBRATION: { address: 0x35, default: 0xFF },
    };
    class BNO055 extends controller_4.Controller {
        constructor() {
            super(...arguments);
            this.address = null;
            this.memory = new Uint8Array(128);
            this.accelerometer = { x: 0, y: 0, z: 0 };
            this.gyroscope = { x: 0, y: 0, z: 0 };
            this.magnetometer = { x: 0, y: 0, z: 0 };
            this.orientation = { x: 0, y: 0, z: 0 };
            this.rotating = false;
            this.sensorControls = {
                setAcceleration: (x, y, z) => {
                    this.accelerometer = { x, y, z };
                    this.setVector(registers.ACCEL_X_LSB.address, [x, y, z], 100);
                    this.calculateOrientation();
                },
                setGravity: (x, y, z) => {
                    this.setVector(registers.GRAVITY_X_LSB.address, [x, y, z], 100);
                },
                setMagnetometer: (x, y, z) => {
                    this.magnetometer = { x, y, z };
                    this.setVector(registers.MAG_X_LSB.address, [x, y, z], 16);
                    this.calculateOrientation();
                },
                setGyroscope: (x, y, z) => {
                    this.gyroscope = { x, y, z };
                    this.setVector(registers.GYRO_X_LSB.address, [x, y, z], 16);
                    this.calculateOrientation();
                },
                setLinearAcceleration: (x, y, z) => {
                    this.setVector(registers.LINEAR_ACCEL_X_LSB.address, [x, y, z], 100);
                },
                setTemp: (temp) => {
                    this.memory[registers.TEMP.address] = temp;
                },
            };
        }
        setVector(address, vector, scalar) {
            let writePointer = address;
            for (const num of vector) {
                const scaled = Math.round(num * scalar);
                const lsb = scaled & 0xFF;
                const msb = (scaled >> 8) & 0xFF;
                this.memory[writePointer] = lsb;
                writePointer++;
                this.memory[writePointer] = msb;
                writePointer++;
            }
        }
        eulerToQuaternion(heading, roll, pitch) {
            const toRadians = (degrees) => degrees * (Math.PI / 180);
            heading = toRadians(heading);
            roll = toRadians(roll);
            pitch = toRadians(pitch);
            const cy = Math.cos(heading * 0.5);
            const sy = Math.sin(heading * 0.5);
            const cr = Math.cos(roll * 0.5);
            const sr = Math.sin(roll * 0.5);
            const cp = Math.cos(pitch * 0.5);
            const sp = Math.sin(pitch * 0.5);
            const qx = sr * cp * cy - cr * sp * sy;
            const qy = cr * sp * cy + sr * cp * sy;
            const qz = cr * cp * sy - sr * sp * cy;
            const qw = cr * cp * cy + sr * sp * sy;
            return { x: qx, y: qy, z: qz, w: qw };
        }
        setMotion(rotating) {
            if (rotating) {
                this.sensorControls.setGyroscope(0, 0, 90);
            }
            this.rotating = rotating;
        }
        calculateOrientation() {
            const avgX = (this.accelerometer.x + this.gyroscope.x + this.magnetometer.x) / 3;
            const avgY = (this.accelerometer.y + this.gyroscope.y + this.magnetometer.y) / 3;
            const avgZ = (this.accelerometer.z + this.gyroscope.z + this.magnetometer.z) / 3;
            this.setVector(registers.EULER_HEADING_LSB.address, [avgX, avgY, avgZ], 16);
            const { w, x, y, z } = this.eulerToQuaternion(avgX, avgY, avgZ);
            this.setVector(registers.QUATERNION_W_LSB.address, [w, x, y, z], 16384);
        }
        setup() {
            execute_6.AVRRunner.getInstance().board.twis[0].registerController(exports.BNO055_ADDR, this);
            for (const register of Object.values(registers)) {
                if (register.default) {
                    this.memory[register.address] = register.default;
                }
            }
            this.sensorControls.setGravity(0.0, 0.0, 9.81);
            this.sensorControls.setLinearAcceleration(0.1, 0.2, 0.3);
            this.sensorControls.setTemp(75);
        }
        i2cConnect(addr, write) {
            return true;
        }
        i2cDisconnect() { }
        i2cReadByte(acked) {
            let byte;
            if (this.address !== null) {
                if (this.address === registers.EULER_HEADING_LSB.address && this.rotating) {
                    const currentTime = Date.now();
                    const timeDiff = (this.lastRead !== undefined) ? (currentTime - this.lastRead) / 1000 : 0;
                    if (timeDiff > 0) {
                        const gyroX = this.gyroscope.x * timeDiff;
                        const gyroY = this.gyroscope.y * timeDiff;
                        const gyroZ = this.gyroscope.z * timeDiff;
                        this.orientation.x += gyroZ;
                        this.orientation.y += gyroX;
                        this.orientation.z += gyroY;
                        this.orientation.x = this.orientation.x % 360;
                        this.orientation.y = Math.max(-90, Math.min(90, this.orientation.y));
                        this.orientation.z = Math.max(-90, Math.min(90, this.orientation.z));
                        this.lastRead = currentTime;
                        this.setVector(registers.EULER_HEADING_LSB.address, [this.orientation.x, this.orientation.y, this.orientation.z], 16);
                    }
                }
                byte = this.memory[this.address];
                if (this.address === registers.EULER_PITCH_MSB.address && this.rotating) {
                    this.lastRead = Date.now();
                }
            }
            else {
                byte = 0xff;
            }
            this.address = acked ? (this.address + 1) % this.memory.length : null;
            return byte;
        }
        i2cWriteByte(value) {
            if (this.address !== null) {
                this.memory[this.address] = value;
                this.address = null;
            }
            else {
                this.address = value;
            }
            return true;
        }
    }
    exports.BNO055 = BNO055;
});
define("controllers/hcsr501", ["require", "exports", "controllers/controller"], function (require, exports, controller_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HCSR501 = void 0;
    class HCSR501 extends controller_5.Controller {
        constructor() {
            super(...arguments);
            this.isInSimulation = false;
            this.setIsMotionDetected = (isMotionDetected) => {
                this.isMotionDetected = isMotionDetected > 0;
                if (this.isInSimulation && this.isMotionDetected) {
                    this.detectMotion();
                }
            };
            this.setTriggerMode = (triggerMode) => {
                this.triggerMode = triggerMode > 0;
            };
            this.setTimeDelaySeconds = (timeDelaySeconds) => {
                this.timeDelaySeconds = timeDelaySeconds;
            };
        }
        setup() {
            clearTimeout(this.motionTimeoutId);
            this.isInTimeWindow = false;
            this.isInSimulation = true;
            console.log("setup");
        }
        cleanup() {
            clearTimeout(this.motionTimeoutId);
        }
        detectMotion() {
            if (this.triggerMode) {
                if (!this.isInTimeWindow) {
                    this.pins.digital_out[0].digital.state = true;
                    this.isInTimeWindow = true;
                    this.motionTimeoutId = setTimeout(() => {
                        this.pins.digital_out[0].digital.state = false;
                        this.isMotionDetected = false;
                        this.isInTimeWindow = false;
                        this.motionTimeoutId = 0;
                    }, this.timeDelaySeconds * 1000);
                }
                else {
                    clearTimeout(this.motionTimeoutId);
                    this.motionTimeoutId = this.motionTimeoutId = setTimeout(() => {
                        this.pins.digital_out[0].digital.state = false;
                        this.isMotionDetected = false;
                        this.isInTimeWindow = false;
                        this.motionTimeoutId = 0;
                    }, this.timeDelaySeconds * 1000);
                }
            }
            else {
                if (this.isInTimeWindow) {
                    return;
                }
                else {
                    this.isInTimeWindow = true;
                    this.pins.digital_out[0].digital.state = true;
                    this.motionTimeoutId = setTimeout(() => {
                        this.pins.digital_out[0].digital.state = false;
                        this.isMotionDetected = false;
                        this.isInTimeWindow = false;
                        this.motionTimeoutId = 0;
                    }, this.timeDelaySeconds * 1000);
                }
            }
        }
    }
    exports.HCSR501 = HCSR501;
});
define("controllers/ky018", ["require", "exports", "controllers/controller"], function (require, exports, controller_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KY018 = void 0;
    class KY018 extends controller_6.Controller {
        constructor() {
            super(...arguments);
            this.lux = 100;
            this.GAMMA = .7;
            this.RL10 = 50000;
            this.R_FIXED = 10000;
            this.isInSimulation = false;
        }
        setLux(lux) {
            if (lux < .1) {
                this.lux = .1;
            }
            else if (lux > 100000) {
                this.lux = 100000;
            }
            else {
                this.lux = lux;
            }
            if (this.isInSimulation) {
                this.luxToVoltage(lux);
            }
        }
        setup() {
            this.isInSimulation = true;
            this.luxToVoltage(this.lux);
        }
        luxToVoltage(lux) {
            const R_PHOTO = (this.RL10 * Math.pow(10, this.GAMMA)) / Math.pow(lux, this.GAMMA);
            const V_OUT = 5 * (R_PHOTO / (R_PHOTO + this.R_FIXED));
            this.pins.analog_out[0].analog.voltage = V_OUT;
        }
    }
    exports.KY018 = KY018;
});
define("controllers/arcade-push-button", ["require", "exports", "controllers/controller"], function (require, exports, controller_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArcadePushButton = void 0;
    class ArcadePushButton extends controller_7.Controller {
        setup() {
            this.digitalOut = this.pins.digital_out[0];
        }
        setPushed(pushed) {
            const surface = this.element.querySelector(".surface");
            if (surface) {
                surface.style.transform = pushed ? "translateY(5px)" : "translateY(0)";
            }
            this.digitalOut.digital.state = pushed;
        }
    }
    exports.ArcadePushButton = ArcadePushButton;
});
define("controllers/sg90", ["require", "exports", "controllers/controller", "lib/avr8js/index", "lib/execute"], function (require, exports, controller_8, avr8js_7, execute_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SG90 = void 0;
    class SG90 extends controller_8.Controller {
        setup() {
            var _a;
            this.fallingEdgeCycle = undefined;
            this.risingEdgeCycle = undefined;
            this.signal = this.pins.orange[0].digital;
            (_a = this.signal) === null || _a === void 0 ? void 0 : _a.addListener(this.onSignalChange.bind(this));
        }
        onSignalChange(state) {
            const currentCycle = execute_7.AVRRunner.getInstance().board.cpu.cycles;
            if (state === avr8js_7.PinState.High) {
                this.risingEdgeCycle = currentCycle;
            }
            else if (state === avr8js_7.PinState.Low && this.risingEdgeCycle !== undefined) {
                this.fallingEdgeCycle = currentCycle;
                const pulseWidthCycles = this.fallingEdgeCycle - this.risingEdgeCycle;
                const pulseWidthMs = this.cyclesToMs(pulseWidthCycles);
                const angle = Math.round(this.msToAngle(pulseWidthMs));
                if (this.previousAngle !== angle) {
                    this.renderHorn(angle);
                }
                this.previousAngle = angle;
            }
        }
        renderHorn(angle) {
            const horn = this.element.querySelector(".horn");
            const transformValue = `translate(91.467 59.773) rotate(${angle}) translate(-91.467 -59.773)`;
            horn.setAttribute('transform', transformValue);
        }
        cyclesToMs(cycles) {
            return (cycles * 1000) / (execute_7.AVRRunner.getInstance().board.cpu.frequency / 1000);
        }
        msToAngle(ms) {
            const minPulse = 544;
            const maxPulse = 2400;
            const minAngle = 0;
            const maxAngle = 180;
            if (ms <= minPulse)
                return minAngle;
            if (ms >= maxPulse)
                return maxAngle;
            return ((ms - minPulse) / (maxPulse - minPulse)) * (maxAngle - minAngle) + minAngle;
        }
    }
    exports.SG90 = SG90;
});
define("controllers/memory", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Memory = void 0;
    class Memory {
        constructor(size) {
            this.memory = new Uint8Array(size);
            return new Proxy(this, {
                get(target, prop) {
                    if (prop in target) {
                        return target[prop];
                    }
                    return target.memory[prop];
                },
                set(target, prop, value) {
                    target.memory[prop] = value;
                    return true;
                }
            });
        }
        clear() {
            this.memory.fill(0);
        }
        get size() {
            return this.memory.length;
        }
        read(register) {
            const bytes = this.memory.subarray(register.address, register.address + register.size);
            let value = 0;
            for (let i = 0; i < register.size; i++) {
                value |= bytes[i] << (i * 8);
            }
            return value;
        }
        write(register, value) {
            const bytes = new Uint8Array(register.size);
            for (let i = 0; i < register.size; i++) {
                bytes[i] = (value >> (i * 8)) & 0xFF;
            }
            this.memory.set(bytes, register.address);
        }
    }
    exports.Memory = Memory;
});
define("controllers/tf-luna-lidar-i2c", ["require", "exports", "controllers/controller", "lib/execute", "controllers/memory"], function (require, exports, controller_9, execute_8, memory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TFLunaLidarI2C = void 0;
    const TF_LUNA_LIDAR_ADDR = 0x10;
    const REGISTERS = {
        DIST: { address: 0x00, size: 2 },
        FLUX: { address: 0x02, size: 2 },
        TEMP: { address: 0x04, size: 2 },
        TICK: { address: 0x06, size: 2 },
        ERROR: { address: 0x08, size: 2 },
    };
    class TFLunaLidarI2C extends controller_9.Controller {
        constructor() {
            super(...arguments);
            this.address = null;
            this.memory = new memory_1.Memory(128);
        }
        setRegister(register, value) {
            this.memory.write(REGISTERS[register], value);
        }
        setup() {
            execute_8.AVRRunner.getInstance().board.twis[0].registerController(TF_LUNA_LIDAR_ADDR, this);
            this.memory.clear();
            this.address = null;
            this.startTime = Date.now();
            this.setRegister("DIST", 50);
            this.setRegister("FLUX", 200);
            this.setRegister("TEMP", 2500);
        }
        i2cConnect(addr, write) {
            return true;
        }
        i2cDisconnect() {
        }
        i2cReadByte(acked) {
            this.updateTime();
            let byte;
            if (this.address !== null) {
                byte = this.memory[this.address];
            }
            else {
                byte = 0xff;
            }
            this.address = acked ? (this.address + 1) % this.memory.size : null;
            return byte;
        }
        i2cWriteByte(value) {
            if (this.address !== null) {
                this.memory[this.address] = value;
                this.address = null;
            }
            else {
                this.address = value;
            }
            return true;
        }
        updateTime() {
            const elapsedTime = Date.now() - this.startTime;
            this.setRegister("TICK", elapsedTime);
        }
    }
    exports.TFLunaLidarI2C = TFLunaLidarI2C;
});
define("controllers/ky008", ["require", "exports", "controllers/controller", "lib/avr8js/index"], function (require, exports, controller_10, avr8js_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KY008 = void 0;
    class KY008 extends controller_10.Controller {
        constructor() {
            super(...arguments);
            this.toggleLaser = (state) => {
                const beam = this.element.querySelector("#laser-beam");
                beam.style.fill = state === avr8js_8.PinState.High ? "url(#a)" : "none";
            };
        }
        setup() {
            this.pins.digital_in[0].digital.addListener(this.toggleLaser);
        }
    }
    exports.KY008 = KY008;
});
define("controllers/adxl345i2c", ["require", "exports", "controllers/controller", "lib/execute", "controllers/memory"], function (require, exports, controller_11, execute_9, memory_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ADXL345I2C = exports.ADXL345_ADDR = void 0;
    exports.ADXL345_ADDR = 0x53;
    const REGISTERS = {
        DEVID: { address: 0x00, size: 1 },
        THRESH_TAP: { address: 0x1D, size: 1 },
        OFSX: { address: 0x1E, size: 1 },
        OFSY: { address: 0x1F, size: 1 },
        OFSZ: { address: 0x20, size: 1 },
        DUR: { address: 0X21, size: 1 },
        LATENT: { address: 0x22, size: 1 },
        WINDOW: { address: 0x23, size: 1 },
        THRESH_ACT: { address: 0x24, size: 1 },
        THRES_INACT: { address: 0x25, size: 1 },
        TIME_INACT: { address: 0x26, size: 1 },
        ACT_INACT_CTL: { address: 0x27, size: 1 },
        THRESH_FF: { address: 0x28, size: 1 },
        TIME_FF: { address: 0x29, size: 1 },
        TAP_AXES: { address: 0x2A, size: 1 },
        ACT_TAP_STATUS: { address: 0x2B, size: 1 },
        BW_RATE: { address: 0x2C, size: 1 },
        POWER_CTL: { address: 0x2D, size: 1 },
        INT_ENABLE: { address: 0x2E, size: 1 },
        INT_MAP: { address: 0x2F, size: 1 },
        INT_SOURCE: { address: 0x30, size: 1 },
        DATA_FORMAT: { address: 0x31, size: 1 },
        DATAX: { address: 0x32, size: 2 },
        DATAY: { address: 0x34, size: 2 },
        DATAZ: { address: 0x36, size: 2 },
        FIFO_CTL: { address: 0x38, size: 1 },
        FIFO_STATUS: { address: 0x39, size: 1 },
    };
    class ADXL345I2C extends controller_11.Controller {
        constructor() {
            super(...arguments);
            this.address = null;
            this.memory = new memory_2.Memory(128);
        }
        setMotion(moving) {
            if (moving) {
                this.setAccel(1, 1, 1);
            }
            else {
                this.setAccel(0, 1, 0);
            }
        }
        setAccel(x, y, z) {
            this.setRegister("DATAX", x);
            this.setRegister("DATAY", y);
            this.setRegister("DATAZ", z);
        }
        setup() {
            execute_9.AVRRunner.getInstance().board.twis[0].registerController(exports.ADXL345_ADDR, this);
            this.memory.clear();
            this.address = null;
            this.setRegister("DEVID", 0xE5);
            this.setRegister("BW_RATE", 0xA);
            this.setRegister("INT_SOURCE", 0x2);
            this.setMotion(false);
        }
        setRegister(register, value) {
            this.memory.write(REGISTERS[register], value);
        }
        i2cConnect(addr, write) {
            return true;
        }
        i2cDisconnect() {
        }
        i2cReadByte(acked) {
            let byte;
            if (this.address !== null) {
                byte = this.memory[this.address];
            }
            else {
                byte = 0xff;
            }
            this.address = acked ? (this.address + 1) % this.memory.size : null;
            return byte;
        }
        i2cWriteByte(value) {
            if (this.address !== null) {
                this.memory[this.address] = value;
                this.address = null;
            }
            else {
                this.address = value;
            }
            return true;
        }
    }
    exports.ADXL345I2C = ADXL345I2C;
});
define("controllers/mq3", ["require", "exports", "controllers/controller"], function (require, exports, controller_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MQ3 = void 0;
    class MQ3 extends controller_12.Controller {
        setAlcohol(alcohol) {
            if (alcohol < 0) {
                this.alcohol = 0;
            }
            else if (alcohol > 1024) {
                this.alcohol = 5;
            }
            else {
                this.alcohol = alcohol * 5 / 1024;
            }
            if (!this.inSimulation) {
                return;
            }
            this.pins.analog_out[0].analog.voltage = this.alcohol;
        }
        setup() {
            this.inSimulation = true;
        }
    }
    exports.MQ3 = MQ3;
});
define("controllers/hcsr04", ["require", "exports", "controllers/controller", "lib/execute", "lib/avr8js/index"], function (require, exports, controller_13, execute_10, avr8js_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HCSR04 = void 0;
    class HCSR04 extends controller_13.Controller {
        constructor() {
            super(...arguments);
            this.distance = 20;
        }
        setDistance(distance) {
            this.distance = distance;
        }
        setup() {
            console.log(JSON.stringify(this.pins.trigger));
            this.pins.trigger[0].digital.addListener(this.trigger.bind(this));
        }
        trigger(state) {
            if (state === avr8js_9.PinState.High) {
                setTimeout(() => this.echo(), 1);
            }
        }
        echo() {
            this.pins.echo[0].digital.state = true;
            execute_10.AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                this.pins.echo[0].digital.state = false;
            }, this.distance * 58 * (execute_10.AVRRunner.getInstance().board.cpu.frequency / 1e6));
        }
    }
    exports.HCSR04 = HCSR04;
});
define("controllers/ky003", ["require", "exports", "controllers/controller"], function (require, exports, controller_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KY003 = void 0;
    class KY003 extends controller_14.Controller {
        setup() {
            this.inSimulation = true;
        }
        setFieldDetected(isFieldDetected) {
            if (!this.inSimulation)
                return;
            isFieldDetected ? this.pins.digital_out[0].digital.state = true : this.pins.digital_out[0].digital.state = false;
        }
    }
    exports.KY003 = KY003;
});
define("controllers/ky022", ["require", "exports", "controllers/controller", "lib/execute"], function (require, exports, controller_15, execute_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KY022 = void 0;
    class KY022 extends controller_15.Controller {
        constructor() {
            super(...arguments);
            this.inSimulation = false;
            this.inTransfer = false;
        }
        setup() {
            this.setNecAddress(0);
            this.setNecCommand(0);
            this.inSimulation = true;
        }
        setNecAddress(address) {
            this.address = address & 0xFF;
            this.invAddress = (~address) & 0xFF;
            if (!this.inSimulation)
                return;
            if (this.inTransfer)
                return;
            this.inTransfer = true;
            this.sendNecFrame();
        }
        setNecCommand(command) {
            this.command = command & 0xFF;
            this.invCommand = (~command) & 0xFF;
            if (!this.inSimulation)
                return;
            if (this.inTransfer)
                return;
            this.inTransfer = true;
            this.sendNecFrame();
        }
        sendNecFrame() {
            const frame = this.encodeNecFrame();
            let count = 0;
            for (const packet of frame) {
                execute_11.AVRRunner.getInstance().board.cpu.addClockEvent(() => {
                    console.log("previous state:", this.pins.digital_out[0].digital.state);
                    console.log("desired state:", packet.state);
                    this.pins.digital_out[0].digital.state = packet.state;
                    console.log("current state:", this.pins.digital_out[0].digital.state);
                    console.log("current cycle:", execute_11.AVRRunner.getInstance().board.cpu.cycles);
                }, execute_11.AVRRunner.getInstance().usToCycles(packet.us));
                count += packet.us;
            }
            this.inTransfer = false;
        }
        encodeNecFrame() {
            let frame = [];
            frame.push({ state: true, us: 9000 });
            frame.push({ state: false, us: 4500 });
            this.packNecFrame(frame, this.address);
            this.packNecFrame(frame, this.invAddress);
            this.packNecFrame(frame, this.command);
            this.packNecFrame(frame, this.invCommand);
            frame.push({ state: true, us: 565.5 });
            frame.push({ state: false, us: 0 });
            return frame;
        }
        packNecFrame(frame, byte) {
            for (let i = 7; i >= 0; i--) {
                const bit = (byte >> i) & 1;
                if (bit === 1) {
                    frame.push({ state: true, us: 565.5 });
                    frame.push({ state: false, us: 1687.5 });
                }
                else {
                    frame.push({ state: true, us: 565.5 });
                    frame.push({ state: false, us: 565.5 });
                }
            }
        }
    }
    exports.KY022 = KY022;
});
define("controllers/led", ["require", "exports", "controllers/controller", "lib/avr8js/index"], function (require, exports, controller_16, avr8js_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LED = void 0;
    class LED extends controller_16.Controller {
        constructor() {
            super(...arguments);
            this.color = "#ff8080";
            this.lightColors = {
                "red": "#ff8080",
                "green": "#80ff80",
                "blue": "#8080ff",
                "yellow": "#ffff80",
                "orange": "#ffcf80",
                "white": "#ffffff",
                "purple": "#ff80ff"
            };
        }
        setup() {
            this.pins.anode[0].digital.addListener((state) => this.toggleLed(state));
        }
        cleanup() {
            this.element.querySelector("#ledDisplay").style.display = "none";
        }
        setColor(color) {
            this.color = this.lightColors[color];
        }
        toggleLed(state) {
            this.element.querySelector("#ledColor").style.fill = this.color;
            this.element.querySelector("#ledColorBrightness").style.fill = this.color;
            if (state == avr8js_10.PinState.Low) {
                this.element.querySelector("#ledDisplay").style.display = "none";
            }
            else if (state == avr8js_10.PinState.High || state === avr8js_10.PinState.InputPullUp) {
                this.element.querySelector("#ledDisplay").style.display = "";
            }
        }
    }
    exports.LED = LED;
});
define("controllers/mpu6050", ["require", "exports", "controllers/controller", "lib/execute"], function (require, exports, controller_17, execute_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MPU6050 = exports.I2C_MST_CTRL = void 0;
    exports.I2C_MST_CTRL = 0x68;
    const registers = {
        CONFIG: { address: 0x1A },
        GYRO_CONFIG: { address: 0x1B },
        ACCEL_CONFIG: { address: 0x1C },
        ACCEL_XOUT_H: { address: 0x3B },
        ACCEL_XOUT_L: { address: 0x3C },
        ACCEL_YOUT_H: { address: 0x3D },
        ACCEL_YOUT_L: { address: 0x3E },
        ACCEL_ZOUT_H: { address: 0x3F },
        ACCEL_ZOUT_L: { address: 0x40 },
        TEMP_OUT_H: { address: 0x41 },
        TEMP_OUT_L: { address: 0x42 },
        GYRO_XOUT_H: { address: 0x43 },
        GYRO_XOUT_L: { address: 0x44 },
        GYRO_YOUT_H: { address: 0x45 },
        GYRO_YOUT_L: { address: 0x46 },
        GYRO_ZOUT_H: { address: 0x47 },
        GYRO_ZOUT_L: { address: 0x48 },
        EULER_HEADING_H: { address: 0x49 },
        EULER_HEADING_L: { address: 0x4A },
        EULER_ROLL_H: { address: 0x4B },
        EULER_ROLL_L: { address: 0x4C },
        EULER_PITCH_H: { address: 0x4D },
        EULER_PITCH_L: { address: 0x4E },
        QUATERNIONW_H: { address: 0x4F },
        QUATERNIONW_L: { address: 0x50 },
        QUATERNIONX_H: { address: 0x51 },
        QUATERNIONX_L: { address: 0x52 },
        QUATERNIONY_H: { address: 0x53 },
        QUATERNIONY_L: { address: 0x54 },
        QUATERNIONZ_H: { address: 0x55 },
        QUATERNIONZ_L: { address: 0x56 },
        LINEAR_ACCEL_X_H: { address: 0x57 },
        LINEAR_ACCEL_X_L: { address: 0x58 },
        LINEAR_ACCEL_Y_H: { address: 0x59 },
        LINEAR_ACCEL_Y_L: { address: 0x5A },
        LINEAR_ACCEL_Z_H: { address: 0x5B },
        LINEAR_ACCEL_Z_L: { address: 0x5C },
        PWR_MGMT_1: { address: 0x6B, default: 0x40 },
        PWR_MGMT_2: { address: 0X6C, default: 0x00 },
        WHO_AM_I: { address: 0x75, default: 0x68 }
    };
    class MPU6050 extends controller_17.Controller {
        constructor() {
            super(...arguments);
            this.address = null;
            this.memory = new Uint8Array(128);
            this.accelerometer = { x: 0, y: 0, z: 0 };
            this.gyroscope = { x: 0, y: 0, z: 0 };
            this.orientation = { x: 0, y: 0, z: 0 };
            this.rotating = false;
            this.sensorControls = {
                setAcceleration: (x, y, z) => {
                    this.accelerometer = { x, y, z };
                    this.setVector(registers.ACCEL_XOUT_H.address, [x, y, z], 100);
                    this.calculateOrientation();
                },
                setGyroscope: (x, y, z) => {
                    this.gyroscope = { x, y, z };
                    this.setVector(registers.GYRO_XOUT_H.address, [x, y, z], 16);
                    this.calculateOrientation();
                },
                setTemp: (temp) => {
                    this.memory[registers.TEMP_OUT_H.address] = temp;
                },
                setLinearAcceleration: (x, y, z) => {
                    this.setVector(registers.LINEAR_ACCEL_X_H.address, [x, y, z], 100);
                },
            };
        }
        setVector(address, vector, scalar) {
            let writePointer = address;
            for (const num of vector) {
                const scaled = Math.round(num * scalar);
                const lsb = scaled & 0xFF;
                const msb = (scaled >> 8) & 0xFF;
                this.memory[writePointer] = lsb;
                writePointer++;
                this.memory[writePointer] = msb;
                writePointer++;
            }
        }
        eulerToQuaternion(heading, roll, pitch) {
            const toRadians = (degrees) => degrees * (Math.PI / 180);
            heading = toRadians(heading);
            roll = toRadians(roll);
            pitch = toRadians(pitch);
            const cy = Math.cos(heading * 0.5);
            const sy = Math.sin(heading * 0.5);
            const cr = Math.cos(roll * 0.5);
            const sr = Math.sin(roll * 0.5);
            const cp = Math.cos(pitch * 0.5);
            const sp = Math.sin(pitch * 0.5);
            const qx = sr * cp * cy - cr * sp * sy;
            const qy = cr * sp * cy + sr * cp * sy;
            const qz = cr * cp * sy - sr * sp * cy;
            const qw = cr * cp * cy + sr * sp * sy;
            return { x: qx, y: qy, z: qz, w: qw };
        }
        calculateOrientation() {
            const avgX = (this.accelerometer.x + this.gyroscope.x) / 2;
            const avgY = (this.accelerometer.y + this.gyroscope.y) / 2;
            const avgZ = (this.accelerometer.z + this.gyroscope.z) / 2;
            this.setVector(registers.EULER_HEADING_H.address, [avgX, avgY, avgZ], 16);
            const { w, x, y, z } = this.eulerToQuaternion(avgX, avgY, avgZ);
            this.setVector(registers.QUATERNIONW_H.address, [w, x, y, z], 16384);
        }
        setup() {
            execute_12.AVRRunner.getInstance().board.twis[0].registerController(exports.I2C_MST_CTRL, this);
            for (const register of Object.values(registers)) {
                if (register.default) {
                    this.memory[register.address] = register.default;
                }
            }
            this.sensorControls.setLinearAcceleration(0.1, 0.2, 0.3);
            this.sensorControls.setTemp(75);
        }
        i2cConnect(addr, write) {
            return true;
        }
        i2cDisconnect() { }
        i2cReadByte(acked) {
            let byte;
            if (this.address !== null) {
                if (this.address === registers.EULER_HEADING_H.address && this.rotating) {
                    const currentTime = Date.now();
                    const timeDiff = (this.lastRead !== undefined) ? (currentTime - this.lastRead) / 1000 : 0;
                    if (timeDiff > 0) {
                        const gyroX = this.gyroscope.x * timeDiff;
                        const gyroY = this.gyroscope.y * timeDiff;
                        const gyroZ = this.gyroscope.z * timeDiff;
                        this.orientation.x += gyroZ;
                        this.orientation.y += gyroX;
                        this.orientation.z += gyroY;
                        this.orientation.x = this.orientation.x % 360;
                        this.orientation.y = Math.max(-90, Math.min(90, this.orientation.y));
                        this.orientation.z = Math.max(-90, Math.min(90, this.orientation.z));
                        this.lastRead = currentTime;
                        this.setVector(registers.EULER_HEADING_H.address, [this.orientation.x, this.orientation.y, this.orientation.z], 16);
                    }
                }
                byte = this.memory[this.address];
                if (this.address === registers.EULER_PITCH_L.address && this.rotating) {
                    this.lastRead = Date.now();
                }
            }
            else {
                byte = 0xff;
            }
            this.address = acked ? (this.address + 1) % this.memory.length : null;
            return byte;
        }
        i2cWriteByte(value) {
            if (this.address !== null) {
                this.memory[this.address] = value;
                this.address = null;
            }
            else {
                this.address = value;
            }
            return true;
        }
    }
    exports.MPU6050 = MPU6050;
});
define("controllers/ky024", ["require", "exports", "controllers/controller"], function (require, exports, controller_18) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KY024 = void 0;
    class KY024 extends controller_18.Controller {
        constructor() {
            super(...arguments);
            this.gauss = 0;
            this.isInSimulation = false;
            this.isMagneticFieldDetected = false;
        }
        setGauss(gauss) {
            if (gauss < -1000) {
                this.gauss = -1000;
            }
            else if (gauss > 1000) {
                this.gauss = 1000;
            }
            else {
                this.gauss = gauss;
            }
            if (this.isInSimulation) {
                this.gaussToVoltage(this.gauss);
            }
        }
        setIsMagneticFieldDetected(isDetected) {
            this.isMagneticFieldDetected = isDetected > 0;
            if (this.isInSimulation) {
                this.pins.digital_out[0].digital.state = this.isMagneticFieldDetected;
            }
        }
        setup() {
            this.isInSimulation = true;
            this.gaussToVoltage(this.gauss);
        }
        gaussToVoltage(gauss) {
            const V_OUT = 1.0 + ((gauss + 1000) / 2000) * 3.0;
            this.pins.analog_out[0].analog.voltage = V_OUT;
        }
    }
    exports.KY024 = KY024;
});
define("main", ["require", "exports", "interopManager", "controllers/lcd1602i2c", "controllers/max6675", "controllers/ky012", "controllers/bno055", "controllers/hcsr501", "controllers/ky018", "controllers/arcade-push-button", "controllers/sg90", "controllers/tf-luna-lidar-i2c", "controllers/ky008", "controllers/adxl345i2c", "controllers/mq3", "controllers/hcsr04", "controllers/ky003", "controllers/ky022", "controllers/led", "controllers/mpu6050", "controllers/ky024"], function (require, exports, interopManager_1, lcd1602i2c_1, max6675_1, ky012_1, bno055_1, hcsr501_1, ky018_1, arcade_push_button_1, sg90_1, tf_luna_lidar_i2c_1, ky008_1, adxl345i2c_1, mq3_1, hcsr04_1, ky003_1, ky022_1, led_1, mpu6050_1, ky024_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getInteropManager = interopManager_1.interopManager.getInteropManager;
    window.interopManager = interopManager_1.interopManager;
    window.addEventListener("resize", (e) => __awaiter(void 0, void 0, void 0, function* () {
        yield DotNet.invokeMethodAsync("ADArCWebApp", "updateScreenRatios", getInteropManager().getWindowWidth(), getInteropManager().getWindowHeight());
    }));
    window.LCD1602I2C = lcd1602i2c_1.LCD1602I2C;
    window.BNO055 = bno055_1.BNO055;
    window.MAX6675 = max6675_1.MAX6675;
    window.KY012 = ky012_1.KY012;
    window.ArcadePushButton = arcade_push_button_1.ArcadePushButton;
    window.SG90 = sg90_1.SG90;
    window.HCSR501 = hcsr501_1.HCSR501;
    window.KY018 = ky018_1.KY018;
    window.TFLunaLidarI2C = tf_luna_lidar_i2c_1.TFLunaLidarI2C;
    window.KY008 = ky008_1.KY008;
    window.ADXL345I2C = adxl345i2c_1.ADXL345I2C;
    window.MQ3 = mq3_1.MQ3;
    window.HCSR04 = hcsr04_1.HCSR04;
    window.KY003 = ky003_1.KY003;
    window.KY022 = ky022_1.KY022;
    window.LED = led_1.LED;
    window.MPU6050 = mpu6050_1.MPU6050;
    window.KY024 = ky024_1.KY024;
});
define("controllers/ky001", ["require", "exports", "controllers/controller"], function (require, exports, controller_19) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KY001 = void 0;
    class KY001 extends controller_19.Controller {
        setTemperature(temperature) {
        }
        setup() { }
    }
    exports.KY001 = KY001;
});
define("controllers/rplidar", ["require", "exports", "controllers/controller"], function (require, exports, controller_20) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RPLidarA1M9 = void 0;
    const RPLIDAR_CMD_STOP = 0x25;
    const RPLIDAR_CMD_SCAN = 0x20;
    const RPLIDAR_CMD_FORCE_SCAN = 0x21;
    const RPLIDAR_CMD_RESET = 0x40;
    const RPLIDAR_CMD_GET_DEVICE_INFO = 0x50;
    const RPLIDAR_CMD_GET_DEVICE_HEALTH = 0x52;
    const RPLIDAR_ANS_TYPE_MEASUREMENT = 0x81;
    const RPLIDAR_ANS_TYPE_DEVINFO = 0x4;
    const RPLIDAR_ANS_TYPE_DEVHEALTH = 0x6;
    const RPLIDAR_STATUS_OK = 0x0;
    const RPLIDAR_STATUS_WARNING = 0x1;
    const RPLIDAR_STATUS_ERROR = 0x2;
    const RPLIDAR_RESP_MEASUREMENT_SYNCBIT = (0x1 << 0);
    const RPLIDAR_RESP_MEASUREMENT_QUALITY_SHIFT = 2;
    const RPLIDAR_RESP_MEASUREMENT_CHECKBIT = (0x1 << 0);
    const RPLIDAR_RESP_MEASUREMENT_ANGLE_SHIFT = 1;
    const RPLIDAR_CMD_SYNC_BYTE = 0xA5;
    const RPLIDAR_CMDFLAG_HAS_PAYLOAD = 0x80;
    const RPLIDAR_ANS_SYNC_BYTE1 = 0xA5;
    const RPLIDAR_ANS_SYNC_BYTE2 = 0x5A;
    const RPLIDAR_ANS_PKTFLAG_LOOP = 0x1;
    class RPLidarA1M9 extends controller_20.Controller {
        constructor() {
            super(...arguments);
            this.distance = 0;
            this.angle = 0;
            this.serialNumber = 1;
            this.currentCmd = null;
            this.inSync = false;
            this.payloadSize = null;
            this.payload = null;
            this.checksum = null;
        }
        setup() {
            this.pins.rx[0].usart.onByteTransmit = this.rxListener.bind(this);
        }
        rxListener(value) {
            if (value === RPLIDAR_CMD_SYNC_BYTE && !this.inSync) {
                this.inSync = true;
                return;
            }
            if (this.inSync) {
                if (this.currentCmd == null) {
                    this.currentCmd = value;
                    if (this.currentCmd == RPLIDAR_CMD_STOP ||
                        this.currentCmd == RPLIDAR_CMD_SCAN ||
                        this.currentCmd == RPLIDAR_CMD_FORCE_SCAN ||
                        this.currentCmd == RPLIDAR_CMD_RESET ||
                        this.currentCmd == RPLIDAR_CMD_GET_DEVICE_INFO ||
                        this.currentCmd == RPLIDAR_CMD_GET_DEVICE_HEALTH) {
                    }
                    return;
                }
                else if (this.payloadSize == null) {
                    this.payloadSize = value;
                    return;
                }
                else if (this.payload.length < this.payloadSize) {
                    this.payload.push(value);
                    return;
                }
                else {
                    this.checksum = value;
                    return;
                }
            }
            return this.notOk();
        }
        afterCmdFinishSelfReset() {
            this.inSync = false;
            this.currentCmd = null;
            this.payloadSize = null;
            this.payload = null;
            this.checksum = null;
        }
        notOk() {
        }
        cmdStop() {
        }
        cmdScan() {
        }
        cmdForceScan() {
        }
        cmdReset() {
        }
        cmdGetDeviceInfo() {
        }
        cmdGetDeviceHealth() {
        }
        writeBack() {
        }
    }
    exports.RPLidarA1M9 = RPLidarA1M9;
});
//# sourceMappingURL=build.js.map