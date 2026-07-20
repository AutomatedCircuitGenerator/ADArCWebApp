#pragma once

#include <Arduino.h>
#include <Wire.h>

class VL53L4CD
{
  public:

    // register addresses from ULD VL43L4CD_api.h
    enum regAddr : uint16_t
    {
      SOFT_RESET                            = 0x0000,
      I2C_SLAVE__DEVICE_ADDRESS             = 0x0001,
      VHV_CONFIG__TIMEOUT_MACROP_LOOP_BOUND = 0x0008,
      XTALK_PLANE_OFFSET_KCPS               = 0x0016,
      XTALK_X_PLANE_GRADIENT_KCPS           = 0x0018,
      XTALK_Y_PLANE_GRADIENT_KCPS           = 0x001A,
      RANGE_OFFSET_MM                       = 0x001E,
      INNER_OFFSET_MM                       = 0x0020,
      OUTER_OFFSET_MM                       = 0x0022,
      GPIO_HV_MUX__CTRL                     = 0x0030,
      GPIO__TIO_HV_STATUS                   = 0x0031,
      SYSTEM__INTERRUPT                     = 0x0046,
      RANGE_CONFIG_A                        = 0x005E,
      RANGE_CONFIG_B                        = 0x0061,
      RANGE_CONFIG__SIGMA_THRESH            = 0x0064,
      MIN_COUNT_RATE_RTN_LIMIT_MCPS         = 0x0066,
      INTERMEASUREMENT_MS                   = 0x006C,
      THRESH_HIGH                           = 0x0072,
      THRESH_LOW                            = 0x0074,
      SYSTEM__INTERRUPT_CLEAR               = 0x0086,
      SYSTEM_START                          = 0x0087,
      RESULT__RANGE_STATUS                  = 0x0089,
      RESULT__SPAD_NB                       = 0x008C,
      RESULT__SIGNAL_RATE                   = 0x008E,
      RESULT__AMBIENT_RATE                  = 0x0090,
      RESULT__SIGMA                         = 0x0092,
      RESULT__DISTANCE                      = 0x0096,
      RESULT__OSC_CALIBRATE_VAL             = 0x00DE,
      FIRMWARE__SYSTEM_STATUS               = 0x00E5,
      IDENTIFICATION__MODEL_ID              = 0x010F,
    };

    struct RangingData
    {
      uint16_t range_mm;
      uint8_t range_status;
      uint8_t number_of_spad;
      uint16_t signal_rate_kcps;
      uint16_t ambient_rate_kcps;
      uint16_t signal_per_spad_kcps;
      uint16_t ambient_per_spad_kcps;
      uint16_t sigma_mm;
    };

    RangingData ranging_data;

    uint8_t last_status; // status of last I2C transmission

    VL53L4CD();

    void setBus(TwoWire * bus) { this->bus = bus; }
    TwoWire * getBus() { return bus; }

    void setAddress(uint8_t new_addr);
    uint8_t getAddress() { return address; }

    bool init(bool io_2v8 = true, bool fast_mode_plus = false);

    void writeReg(uint16_t reg, uint8_t value);
    void writeReg16Bit(uint16_t reg, uint16_t value);
    void writeReg32Bit(uint16_t reg, uint32_t value);
    uint8_t readReg(uint16_t reg);
    uint16_t readReg16Bit(uint16_t reg);
    uint32_t readReg32Bit(uint16_t reg);

    bool setRangeTiming(uint8_t timing_budget_ms, uint32_t inter_measurement_ms);
    uint8_t getTimingBudget();
    uint32_t getInterMeasurement();

    void startContinuous();
    void stopContinuous();
    uint16_t read(bool blocking = true);
    uint16_t readRangeContinuousMillimeters(bool blocking = true) { return read(blocking); } // alias of read()

    // check if sensor has new reading available
    // assumes interrupt is active low (GPIO_HV_MUX__CTRL bit 4 is 1)
    bool dataReady() { return (readReg(GPIO__TIO_HV_STATUS) & 0x01) == 0; }

    // based on VL53L4CD_ClearInterrupt()
    void clearInterrupt() { writeReg(SYSTEM__INTERRUPT_CLEAR, 0x01); }

    void setTimeout(uint16_t timeout) { io_timeout = timeout; }
    uint16_t getTimeout() { return io_timeout; }
    bool timeoutOccurred();

  private:

    // The Arduino two-wire interface uses a 7-bit number for the address,
    // and sets the last bit correctly based on reads and writes
    static const uint8_t AddressDefault = 0b0101001;

    TwoWire * bus;

    uint8_t address;

    uint16_t io_timeout;
    bool did_timeout;
    uint16_t timeout_start_ms;

    // Record the current time to check an upcoming timeout against
    void startTimeout() { timeout_start_ms = millis(); }

    // Check if timeout is enabled (set to nonzero value) and has expired
    bool checkTimeoutExpired() {return (io_timeout > 0) && ((uint16_t)(millis() - timeout_start_ms) > io_timeout); }

    void readResults();
};
