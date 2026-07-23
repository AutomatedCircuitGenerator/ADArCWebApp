// Most of the functionality of this library is based on the VL53L4CD ULD API
// provided by ST (STSW-IMG026), and some of the explanatory comments are quoted
// or paraphrased from the ULD source code, ULD user manual (UM2931), and
// VL53L4CD datasheet.

#include "VL53L4CD.h"

// Constructors ////////////////////////////////////////////////////////////////

VL53L4CD::VL53L4CD()
#if !defined(NO_GLOBAL_INSTANCES) && !defined(NO_GLOBAL_TWOWIRE)
  : bus(&Wire)
#else
  : bus(nullptr)
#endif
  , address(AddressDefault)
  , io_timeout(0) // no timeout
  , did_timeout(false)
{
}

// Public Methods //////////////////////////////////////////////////////////////

void VL53L4CD::setAddress(uint8_t new_addr)
{
  writeReg(I2C_SLAVE__DEVICE_ADDRESS, new_addr & 0x7F);
  address = new_addr;
}

// Initialize sensor using settings taken mostly from VL53L1_DataInit() and
// VL53L1_StaticInit().
// If io_2v8 (optional) is true or not given, the sensor is configured for 2V8
// mode.
bool VL53L4CD::init(bool io_2v8, bool fast_mode_plus)
{
  // check model ID and module type registers (values specified in datasheet)
  if (readReg16Bit(IDENTIFICATION__MODEL_ID) != 0xEBAA) { return false; }

  // from VL53L4CD_SensorInit()

  // "Wait for boot"
  // check last_status in case we get a NACK to try to deal with it correctly
  startTimeout();
  while (readReg(FIRMWARE__SYSTEM_STATUS) != 0x3 || last_status != 0)
  {
    if (checkTimeoutExpired())
    {
      did_timeout = true;
      return false;
    }
  }

  // "Load default configuration"

  // "0x2d : set bit 2 and 5 to 1 for fast plus mode (1MHz I2C), else don't touch"
  writeReg(0x2D, fast_mode_plus ? 0x12 : 0x00);

  // "0x2e : bit 0 if I2C pulled up at 1.8V, else set bit 0 to 1 (pull up at AVDD)"
  writeReg(0x2E, io_2v8 ? 0x01 : 0x00);

  // "0x2f : bit 0 if GPIO pulled up at 1.8V, else set bit 0 to 1 (pull up at AVDD)"
  writeReg(0x2F, io_2v8 ? 0x01 : 0x00);

  // rest of default configuration copied from VL53L4CD_api.c (comments are also
  // copied verbatim and refer to ULD functions), but starting at 0x30 instead
  // of 0x2D since we handle the first 3 regs above based on this function's
  // args
  static const uint8_t VL53L4CD_DEFAULT_CONFIGURATION[] PROGMEM = {
    0x11, /* 0x30 : set bit 4 to 0 for active high interrupt and 1 for active low
    (bits 3:0 must be 0x1), use SetInterruptPolarity() */
    0x02, /* 0x31 : bit 1 = interrupt depending on the polarity,
    use CheckForDataReady() */
    0x00, /* 0x32 : not user-modifiable */
    0x02, /* 0x33 : not user-modifiable */
    0x08, /* 0x34 : not user-modifiable */
    0x00, /* 0x35 : not user-modifiable */
    0x08, /* 0x36 : not user-modifiable */
    0x10, /* 0x37 : not user-modifiable */
    0x01, /* 0x38 : not user-modifiable */
    0x01, /* 0x39 : not user-modifiable */
    0x00, /* 0x3a : not user-modifiable */
    0x00, /* 0x3b : not user-modifiable */
    0x00, /* 0x3c : not user-modifiable */
    0x00, /* 0x3d : not user-modifiable */
    0xff, /* 0x3e : not user-modifiable */
    0x00, /* 0x3f : not user-modifiable */
    0x0F, /* 0x40 : not user-modifiable */
    0x00, /* 0x41 : not user-modifiable */
    0x00, /* 0x42 : not user-modifiable */
    0x00, /* 0x43 : not user-modifiable */
    0x00, /* 0x44 : not user-modifiable */
    0x00, /* 0x45 : not user-modifiable */
    0x20, /* 0x46 : interrupt configuration 0->level low detection, 1-> level high,
    2-> Out of window, 3->In window, 0x20-> New sample ready , TBC */
    0x0b, /* 0x47 : not user-modifiable */
    0x00, /* 0x48 : not user-modifiable */
    0x00, /* 0x49 : not user-modifiable */
    0x02, /* 0x4a : not user-modifiable */
    0x14, /* 0x4b : not user-modifiable */
    0x21, /* 0x4c : not user-modifiable */
    0x00, /* 0x4d : not user-modifiable */
    0x00, /* 0x4e : not user-modifiable */
    0x05, /* 0x4f : not user-modifiable */
    0x00, /* 0x50 : not user-modifiable */
    0x00, /* 0x51 : not user-modifiable */
    0x00, /* 0x52 : not user-modifiable */
    0x00, /* 0x53 : not user-modifiable */
    0xc8, /* 0x54 : not user-modifiable */
    0x00, /* 0x55 : not user-modifiable */
    0x00, /* 0x56 : not user-modifiable */
    0x38, /* 0x57 : not user-modifiable */
    0xff, /* 0x58 : not user-modifiable */
    0x01, /* 0x59 : not user-modifiable */
    0x00, /* 0x5a : not user-modifiable */
    0x08, /* 0x5b : not user-modifiable */
    0x00, /* 0x5c : not user-modifiable */
    0x00, /* 0x5d : not user-modifiable */
    0x01, /* 0x5e : not user-modifiable */
    0xcc, /* 0x5f : not user-modifiable */
    0x07, /* 0x60 : not user-modifiable */
    0x01, /* 0x61 : not user-modifiable */
    0xf1, /* 0x62 : not user-modifiable */
    0x05, /* 0x63 : not user-modifiable */
    0x00, /* 0x64 : Sigma threshold MSB (mm in 14.2 format for MSB+LSB),
    use SetSigmaThreshold(), default value 90 mm  */
    0xa0, /* 0x65 : Sigma threshold LSB */
    0x00, /* 0x66 : Min count Rate MSB (MCPS in 9.7 format for MSB+LSB),
    use SetSignalThreshold() */
    0x80, /* 0x67 : Min count Rate LSB */
    0x08, /* 0x68 : not user-modifiable */
    0x38, /* 0x69 : not user-modifiable */
    0x00, /* 0x6a : not user-modifiable */
    0x00, /* 0x6b : not user-modifiable */
    0x00, /* 0x6c : Intermeasurement period MSB, 32 bits register,
    use SetIntermeasurementInMs() */
    0x00, /* 0x6d : Intermeasurement period */
    0x0f, /* 0x6e : Intermeasurement period */
    0x89, /* 0x6f : Intermeasurement period LSB */
    0x00, /* 0x70 : not user-modifiable */
    0x00, /* 0x71 : not user-modifiable */
    0x00, /* 0x72 : distance threshold high MSB (in mm, MSB+LSB),
    use SetD:tanceThreshold() */
    0x00, /* 0x73 : distance threshold high LSB */
    0x00, /* 0x74 : distance threshold low MSB ( in mm, MSB+LSB),
    use SetD:tanceThreshold() */
    0x00, /* 0x75 : distance threshold low LSB */
    0x00, /* 0x76 : not user-modifiable */
    0x01, /* 0x77 : not user-modifiable */
    0x07, /* 0x78 : not user-modifiable */
    0x05, /* 0x79 : not user-modifiable */
    0x06, /* 0x7a : not user-modifiable */
    0x06, /* 0x7b : not user-modifiable */
    0x00, /* 0x7c : not user-modifiable */
    0x00, /* 0x7d : not user-modifiable */
    0x02, /* 0x7e : not user-modifiable */
    0xc7, /* 0x7f : not user-modifiable */
    0xff, /* 0x80 : not user-modifiable */
    0x9B, /* 0x81 : not user-modifiable */
    0x00, /* 0x82 : not user-modifiable */
    0x00, /* 0x83 : not user-modifiable */
    0x00, /* 0x84 : not user-modifiable */
    0x01, /* 0x85 : not user-modifiable */
    0x00, /* 0x86 : clear interrupt, use ClearInterrupt() */
    0x00  /* 0x87 : start ranging, use StartRanging() or StopRanging(),
    If you want an automatic start after VL53L4CD_init() call,
      put 0x40 in location 0x87 */
  };

  // Load the rest of the default config (0x30-0x87) with a few block writes.
  // The Wire library for AVR uses a 32-byte tx buffer, and 2 bytes are needed
  // for the starting register address of each write, so we can write 30
  // registers at a time.
  const uint8_t block_size = 30;
  for (uint8_t start_reg = 0x30; start_reg <= 0x87; start_reg += block_size)
  {
    bus->beginTransmission(address);
    bus->write(0);    // reg high byte
    bus->write(start_reg); // reg low byte
    for (uint8_t reg = start_reg; (reg < start_reg + block_size) && (reg <= 0x87); reg++)
    {
      bus->write(pgm_read_byte(VL53L4CD_DEFAULT_CONFIGURATION + reg - 0x30));
    }
    last_status = bus->endTransmission();
    if (last_status) { return false; }
  }

  // "Start VHV"
  writeReg(SYSTEM_START, 0x40);
  startTimeout();
  while (!dataReady())
  {
    if (checkTimeoutExpired())
    {
      did_timeout = true;
      return false;
    }
  }

  clearInterrupt();
  stopContinuous();
  writeReg(VHV_CONFIG__TIMEOUT_MACROP_LOOP_BOUND, 0x09);
  writeReg(0x0B, 0);
  writeReg16Bit(0x24, 0x500);

  // default to 50 ms timing budget, 0 inter-measurement period (continuous)
  setRangeTiming(50, 0);

  return true;
}

// Write an 8-bit register
void VL53L4CD::writeReg(uint16_t reg, uint8_t value)
{
  bus->beginTransmission(address);
  bus->write((uint8_t)(reg >> 8)); // reg high byte
  bus->write((uint8_t)(reg));      // reg low byte
  bus->write(value);
  last_status = bus->endTransmission();
}

// Write a 16-bit register
void VL53L4CD::writeReg16Bit(uint16_t reg, uint16_t value)
{
  bus->beginTransmission(address);
  bus->write((uint8_t)(reg >> 8)); // reg high byte
  bus->write((uint8_t)(reg));      // reg low byte
  bus->write((uint8_t)(value >> 8)); // value high byte
  bus->write((uint8_t)(value));      // value low byte
  last_status = bus->endTransmission();
}

// Write a 32-bit register
void VL53L4CD::writeReg32Bit(uint16_t reg, uint32_t value)
{
  bus->beginTransmission(address);
  bus->write((uint8_t)(reg >> 8)); // reg high byte
  bus->write((uint8_t)(reg));      // reg low byte
  bus->write((uint8_t)(value >> 24)); // value highest byte
  bus->write((uint8_t)(value >> 16));
  bus->write((uint8_t)(value >>  8));
  bus->write((uint8_t)(value));       // value lowest byte
  last_status = bus->endTransmission();
}

// Read an 8-bit register
uint8_t VL53L4CD::readReg(uint16_t reg)
{
  uint8_t value;

  bus->beginTransmission(address);
  bus->write((uint8_t)(reg >> 8)); // reg high byte
  bus->write((uint8_t)(reg));      // reg low byte
  last_status = bus->endTransmission();

  bus->requestFrom(address, (uint8_t)1);
  value = bus->read();

  return value;
}

// Read a 16-bit register
uint16_t VL53L4CD::readReg16Bit(uint16_t reg)
{
  uint16_t value;

  bus->beginTransmission(address);
  bus->write((uint8_t)(reg >> 8)); // reg high byte
  bus->write((uint8_t)(reg));      // reg low byte
  last_status = bus->endTransmission();

  bus->requestFrom(address, (uint8_t)2);
  value  = (uint16_t)bus->read() << 8; // value high byte
  value |=           bus->read();      // value low byte

  return value;
}

// Read a 32-bit register
uint32_t VL53L4CD::readReg32Bit(uint16_t reg)
{
  uint32_t value;

  bus->beginTransmission(address);
  bus->write((uint8_t)(reg >> 8)); // reg high byte
  bus->write((uint8_t)(reg));      // reg low byte
  last_status = bus->endTransmission();

  bus->requestFrom(address, (uint8_t)4);
  value  = (uint32_t)bus->read() << 24; // value highest byte
  value |= (uint32_t)bus->read() << 16;
  value |= (uint16_t)bus->read() <<  8;
  value |=           bus->read();       // value lowest byte

  return value;
}

// Set the measurement timing budget and inter-measurement period in
// milliseconds
// based on VL53L4CD_SetRangeTimings()
bool VL53L4CD::setRangeTiming(uint8_t timing_budget_ms, uint32_t inter_measurement_ms)
{
  // timing budget must be 10 to 200 ms
  if (timing_budget_ms < 10 || timing_budget_ms > 200)
  {
    return false;
  }

  // inter-measurement period must be either 0 or > timing budget
  // UM2931 lists a max of 5000 ms, but the ULD doesn't seem to enforce this
  if (inter_measurement_ms != 0 && inter_measurement_ms <= timing_budget_ms)
  {
    return false;
  }

  uint16_t osc_frequency = readReg16Bit(0x06);
  if (osc_frequency == 0)
  {
    return false;
  }

  uint32_t timing_budget_us = (uint32_t)timing_budget_ms * 1000;
  uint32_t macro_period_us = ((uint32_t)2304 * (0x40000000 / osc_frequency)) >> 6;

  if (inter_measurement_ms == 0)
  {
    // continuous mode
    writeReg32Bit(INTERMEASUREMENT_MS, 0);

    timing_budget_us -= 2500;
  }
  else
  {
    // autonomous low power mode
    uint16_t clock_pll = readReg16Bit(RESULT__OSC_CALIBRATE_VAL) & 0x3FF;
    // note that this value of 1.055 (inter_measurement_factor) from
    // VL53L4CD_SetRangeTiming is different than the value of 1.065
    // (clock_pll_factor) used in VL53L4CD_GetRangeTiming()
    uint32_t inter_measurement = 1.055 * inter_measurement_ms * clock_pll;
    writeReg32Bit(INTERMEASUREMENT_MS, inter_measurement);

    timing_budget_us -= 4300;
    timing_budget_us /= 2;
  }

  timing_budget_us <<= 12;

  uint32_t tmp;
  uint16_t ls_byte;
  uint8_t ms_byte;

  tmp = (macro_period_us * 16) >> 6;
  ls_byte = ((timing_budget_us + (tmp >> 1)) / tmp) - 1;
  ms_byte = 0;
  while (ls_byte > 0xFF)
  {
    ls_byte >>= 1;
    ms_byte++;
  }
  writeReg16Bit(RANGE_CONFIG_A, (uint16_t)ms_byte << 8 | ls_byte);

  tmp = (macro_period_us * 12) >> 6;
  ls_byte = ((timing_budget_us + (tmp >> 1)) / tmp) - 1;
  ms_byte = 0;
  while (ls_byte > 0xFF)
  {
    ls_byte >>= 1;
    ms_byte++;
  }
  writeReg16Bit(RANGE_CONFIG_B, (uint16_t)ms_byte << 8 | ls_byte);

  return true;
}

// Get the measurement timing budget in milliseconds
// based on VL53L4CD_GetRangeTiming()
uint8_t VL53L4CD::getTimingBudget()
{
  uint16_t osc_frequency = readReg16Bit(0x06);
  uint16_t range_config_macrop_high = readReg16Bit(RANGE_CONFIG_A);
  uint32_t macro_period_us = ((uint32_t)2304 * (0x40000000 / osc_frequency)) >> 6;
  uint16_t ls_byte = (range_config_macrop_high & 0xFF) << 4;
  uint8_t ms_byte = (range_config_macrop_high & 0xFF00) >> 8;

  uint32_t tmp = (macro_period_us * 16) >> 6;
  // VL53L4CD_GetRangeTiming() reassigns ms_byte equal to (4 - ms_byte), then in
  // the following timing budget calculation, it shifts right by 12 and again by
  // the new ms_byte after checking that the new ms_byte is < 12. We combine
  // these two shifts into a single shift of (12 + 4 - ms_byte) = (16 -
  // ms_byte), and we skip the check since we've observed the original value of
  // ms_byte is in the range 0 to 4 for all valid timing budgets (meaning 4 -
  // ms_byte is also 0 to 4).
  uint32_t timing_budget_us = (((uint32_t)ls_byte + 1) * tmp - (tmp >> 1)) >> (16 - ms_byte);

  if (readReg32Bit(INTERMEASUREMENT_MS) == 0)
  {
    // continuous mode
    timing_budget_us += 2500;
  }
  else
  {
    // autonomous low power mode
    timing_budget_us *= 2;
    timing_budget_us += 4300;
  }

  return timing_budget_us / 1000;
}

// Get the inter-measurement period in milliseconds
// based on VL53L4CD_GetRangeTiming()
uint32_t VL53L4CD::getInterMeasurement()
{
  uint32_t inter_measurement = readReg32Bit(INTERMEASUREMENT_MS);
  // note that this value of 1.065 (clock_pll_factor) from
  // VL53L4CD_GetRangeTiming is different than the value of 1.065
  // (inter_measurement_factor) used in VL53L4CD_SetRangeTiming()
  uint16_t clock_pll = 1.065 * (readReg16Bit(RESULT__OSC_CALIBRATE_VAL) & 0x3FF);
  return inter_measurement / clock_pll;
}

// Start continuous ranging measurements.
// based on VL53L4CD_StartRanging()
void VL53L4CD::startContinuous()
{
  if (readReg32Bit(INTERMEASUREMENT_MS) == 0)
  {
    // continuous mode
    writeReg(SYSTEM_START, 0x21);
  }
  else
  {
    // autonomous low power mode
    writeReg(SYSTEM_START, 0x40);
  }
}

// Stop continuous measurements
// based on VL53L4CD_StopRanging()
void VL53L4CD::stopContinuous()
{
  writeReg(SYSTEM_START, 0x80);
}

// Returns a range reading in millimeters when continuous mode is active. If
// blocking is true (the default), this function waits for a new measurement to
// be available. If blocking is false, it will try to return data immediately.
// (readSingle() also calls this function after starting a single-shot range
// measurement)
uint16_t VL53L4CD::read(bool blocking)
{
  if (blocking)
  {
    startTimeout();
    while (!dataReady())
    {
      if (checkTimeoutExpired())
      {
        did_timeout = true;
        return 0;
      }
    }
  }

  clearInterrupt();
  readResults();
  return ranging_data.range_mm;
}

// Did a timeout occur in one of the read functions since the last call to
// timeoutOccurred()?
bool VL53L4CD::timeoutOccurred()
{
  bool tmp = did_timeout;
  did_timeout = false;
  return tmp;
}

// Private Methods /////////////////////////////////////////////////////////////

// read and process measurement results
// based on VL53L4CD_GetResult()
void VL53L4CD::readResults()
{
  static const uint8_t status_rtn[24] = { 255, 255, 255, 5, 2, 4, 1, 7, 3,
    0, 255, 255, 9, 13, 255, 255, 255, 255, 10, 6,
    255, 255, 11, 12 };

  // Block read 15 bytes from 0x89 (RESULT__RANGE_STATUS) to 0x97 (lower byte of
  // RESULT_DISTANCE). This is faster than reading each register individually.

  bus->beginTransmission(address);
  bus->write((uint8_t)(RESULT__RANGE_STATUS >> 8)); // reg high byte
  bus->write((uint8_t)(RESULT__RANGE_STATUS));      // reg low byte
  last_status = bus->endTransmission();

  bus->requestFrom(address, (uint8_t)15);

  uint8_t buffer[15];
  for (uint8_t i = 0; i < 15; i++)
  {
    buffer[i] = bus->read();
  }

  uint8_t status = buffer[0] & 0x1F; // 0x89
  if (status < 24) { status = status_rtn[status]; }
  ranging_data.range_status = status;

  // The ULD reads RESULT__SPAD_NB as a 16-bit reg but then divides the value by
  // 256, so we can just ignore the lower byte entirely.
  ranging_data.number_of_spad = buffer[3]; // 0x8C
  ranging_data.signal_rate_kcps = ((uint16_t)buffer[5] << 8 | buffer[6]) * 8; // 0x8E, 0x8F
  ranging_data.ambient_rate_kcps = ((uint16_t)buffer[7] << 8 | buffer[8]) * 8; // 0x90, 0x91
  ranging_data.sigma_mm = ((uint16_t)buffer[9] << 8 | buffer[10]) / 4; // 0x92, 0x93
  ranging_data.range_mm = (uint16_t)buffer[13] << 8 | buffer[14]; // 0x96, 0x97

  ranging_data.signal_per_spad_kcps =  ranging_data.signal_rate_kcps / ranging_data.number_of_spad;
  ranging_data.ambient_per_spad_kcps =  ranging_data.ambient_rate_kcps / ranging_data.number_of_spad;
}