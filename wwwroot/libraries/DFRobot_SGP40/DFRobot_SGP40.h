#ifndef _DFROBOT_SGP40_H_
#define _DFROBOT_SGP40_H_

#include <Arduino.h>
#include <Wire.h>

class DFRobot_SGP40 {
public:
  DFRobot_SGP40(TwoWire *pWire = &Wire);
  ~DFRobot_SGP40();

  bool begin(uint32_t duration = 10000);
  
  // Custom direct method supporting the user's sketch natively
  uint16_t getVocalIndex(float relativeHumidity, float temperatureC);

private:
  TwoWire* _pWire;
  uint8_t _deviceAddr;
};

#endif
