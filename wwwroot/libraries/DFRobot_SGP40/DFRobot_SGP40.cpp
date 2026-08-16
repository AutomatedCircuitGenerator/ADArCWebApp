#include "DFRobot_SGP40.h"

DFRobot_SGP40::DFRobot_SGP40(TwoWire *pWire) : _pWire(pWire) {
  _deviceAddr = 0x59;
}

DFRobot_SGP40::~DFRobot_SGP40() {}

bool DFRobot_SGP40::begin(uint32_t duration) {
  _pWire->begin();
  
  // Simple check to make sure the sensor is present on the I2C bus
  _pWire->beginTransmission(_deviceAddr);
  if (_pWire->endTransmission() == 0) {
    return true;
  }
  return false;
}

uint16_t DFRobot_SGP40::getVocalIndex(float relativeHumidity, float temperatureC) {
  // Communicate with the simulated SGP40 sensor via I2C to read raw VOC index or ticks!
  // Send measurement command (0x260F)
  _pWire->beginTransmission(_deviceAddr);
  _pWire->write(0x26);
  _pWire->write(0x0F);
  _pWire->endTransmission();

  // Short delay for simulated response
  delay(1);

  // Read response
  uint8_t data[3] = {0, 0, 0};
  _pWire->requestFrom(_deviceAddr, (uint8_t)3);
  for (uint8_t i = 0; i < 3; i++) {
    data[i] = _pWire->read();
  }

  // Convert to 16-bit value
  uint16_t value = (data[0] << 8) | data[1];
  return value;
}
