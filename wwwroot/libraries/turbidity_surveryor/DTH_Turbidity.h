/*
 *  Turbidity sensor library.
 *
 *  Copyright (C) 2018 Duy Huynh
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  Version 0.1
 *  Author: Duy Huynh
 *  Email: duytel@gmail.com
 */
 
#ifndef DTH_TURBIDITY_H_
#define DTH_TURBIDITY_H_

/*------------------------------------------------------------------*
 *                           Includes                               *
 *------------------------------------------------------------------*/ 
#include "Arduino.h"

/*------------------------------------------------------------------*
 *                          Define macro                            *
 *------------------------------------------------------------------*/
#define TURBIDITY_SAMPLE 16
#define DTH_MAX_NTU_VOLTAGE 2.5     /* > 3000 NTU with 2.5V */
#define DTH_ZERO_NTU_VOLTAGE 4.25     /* < 0.5 NTU with 4.25 V */

/*------------------------------------------------------------------*
 *                        Class declaration                         *
 *------------------------------------------------------------------*/
class DTH_Turbidity
{
	public:
		//! Class constructor.
		DTH_Turbidity();
		DTH_Turbidity(int sensorPin);
		DTH_Turbidity(int sensorPin, int powerPin);		
		~DTH_Turbidity();
		
		void begin(int sensorPin, int powerPin);
		float readTurbidity(void);
		void setSampe(int sample);
		float getVoltage(void);
		
	private:		
		float getVoltageFilterAvg(int sample, int sensorPin);
		float convertToNTU(float volt);
		void selectionSort(float  *buff, int len); 

	protected:
		int _sample; 
		int _sensorPin;
		int _powerPin;   
};

#endif //DTH_TURBIDITY_H_
