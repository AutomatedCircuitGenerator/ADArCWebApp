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
#include "DTH_Turbidity.h"


DTH_Turbidity::DTH_Turbidity()
{
	_sample = TURBIDITY_SAMPLE;
	
}

DTH_Turbidity::DTH_Turbidity(int sensorPin)
{
	_sample = TURBIDITY_SAMPLE;
	begin(sensorPin, -1);
}

DTH_Turbidity::DTH_Turbidity(int sensorPin, int powerPin)
{
	_sample = TURBIDITY_SAMPLE;
	begin(sensorPin, powerPin);
}

DTH_Turbidity::~DTH_Turbidity()
{
}

void DTH_Turbidity::selectionSort(float  *buff, int len)
{
	int i, z, pos;
	float tmp;

	for (i = 0; i < (len - 1); i++)
	{
		pos = i;
		for (z = i + 1; z < len; z++)
		{
			if (buff[pos] > buff[z])
				pos = z;
		}
		if (pos != i)
		{
			tmp = buff[i];
			buff[i] = buff[pos];
			buff[pos] = tmp;
		}
	}
}

float DTH_Turbidity::getVoltageFilterAvg(int sample, int sensorPin)
{	
	int i;
	float val_buff[sample];
	float val = 0.0;

	for(i = 0; i < sample; i++)
	{
		val_buff[i] = analogRead(_sensorPin);
		delayMicroseconds(10);
	}
	/* Sort buffer */	
	selectionSort(val_buff, sample); 
	/* get averages in the middle of the buffer */
	for(i = sample/4; i < (3*(sample/4)); i++)
		val += val_buff[i];
	val = val/(sample/2);
	val = (val/1024)*5.0;
	return val;
}

/* 
 *  Relatile betwwen voltage and NTU 
 *  NTU:     3000 - 0 NTU . With Pure water: NTU < 0.5
 *  Voltage: 2.5V - 4.2V
 *  Format to convert voltage to NTU is : y = -1120.4*sqr(x) + 5742.3*x - 4352.9
*/
float DTH_Turbidity::convertToNTU(float volt)
{
	float ntu = 0;
	
	if(volt < DTH_MAX_NTU_VOLTAGE)
	{
		ntu = 3000;
	}
	else
	{
		ntu = (-1120.4 * volt * volt) + (5742.3 * volt) - 4352.9;
		if(ntu < 0)
			ntu = 0;
	}
	return ntu;
}

void DTH_Turbidity::setSampe(int sample)
{
	_sample = sample;	
}

void DTH_Turbidity::begin(int sensorPin, int powerPin)
{
	_sensorPin = sensorPin;
	_powerPin = powerPin;
	pinMode(_sensorPin, INPUT_PULLUP);
	if(_powerPin != -1)
	{
		pinMode(_powerPin, OUTPUT);
		digitalWrite(_powerPin, LOW); /* Power off */
	}	
}

float DTH_Turbidity::getVoltage(void)
{
	float volt;	
	
	if(_powerPin != -1)
	{
		digitalWrite(_powerPin, HIGH); /* Power on */
		delay(100);
	}
	/* Read data */
	volt = getVoltageFilterAvg(_sample,  _sensorPin);
	if(_powerPin != -1)
		digitalWrite(_powerPin, LOW); /* Power off */ 
	return volt;
}

float DTH_Turbidity::readTurbidity(void)
{
	float volt;   
	
	volt = getVoltage();	 
	return convertToNTU(volt);
}

