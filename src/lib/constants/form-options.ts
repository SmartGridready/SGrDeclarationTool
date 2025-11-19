import {
  FunctionalProfileCategory,
  LevelOfOperation,
  ReleaseState,
} from "../models";

export const RELEASE_STATE_OPTIONS: { value: ReleaseState; label: string }[] = [
  { value: "Draft", label: "Draft" },
  { value: "Review", label: "Review" },
  { value: "Published", label: "Published" },
  { value: "Revoked", label: "Revoked" },
];

export const PROFILE_IDENTIFICATION_CATEGORY: {
  value: FunctionalProfileCategory;
  label: string;
}[] = [
  { value: "Battery", label: "Battery" },
  { value: "Compressor", label: "Compressor" },
  { value: "DeviceInformation", label: "Device Information" },
  { value: "DHWCircuit", label: "DHW Circuit" },
  { value: "DHWStorage", label: "DHW Storage" },
  { value: "Dishwasher", label: "Dishwasher" },
  { value: "Dryer", label: "Dryer" },
  { value: "ElectricalImmersionHeater", label: "Electrical Immersion Heater" },
  { value: "Fan", label: "Fan" },
  { value: "GasHeatingAppliance", label: "Gas Heating Appliance" },
  { value: "Metering", label: "Metering" },
  { value: "HeatingBufferStorage", label: "Heating Buffer Storage" },
  { value: "HeatingCircuit", label: "Heating Circuit" },
  { value: "HeatingObject", label: "Heating Object" },
  { value: "HeatingZone", label: "Heating Zone" },
  { value: "HeatPumpControl", label: "Heat Pump Control" },
  { value: "HeatSinkCircuit", label: "Heat Sink Circuit" },
  { value: "HeatSourceCircuit", label: "Heat Source Circuit" },
  { value: "HeatSourceUnit", label: "Heat Source Unit" },
  { value: "HVACController", label: "HVAC Controller" },
  { value: "HVACRoom", label: "HVAC Room" },
  { value: "InstantDHWHeater", label: "Instant DHW Heater" },
  { value: "Inverter", label: "Inverter" },
  { value: "OilHeatingAppliance", label: "Oil Heating Appliance" },
  { value: "Pump", label: "Pump" },
  { value: "RefrigerantCircuit", label: "Refrigerant Circuit" },
  { value: "SmartEnergyAppliance", label: "Smart Energy Appliance" },
  { value: "SolarDHWStorage", label: "Solar DHW Storage" },
  { value: "SolarThermalCircuit", label: "Solar Thermal Circuit" },
  { value: "SubMeterElectricity", label: "Sub Meter Electricity" },
  { value: "TemperatureSensor", label: "Temperature Sensor" },
  { value: "Washer", label: "Washer" },
  { value: "BatterySystem", label: "Battery System" },
  {
    value: "ElectricityGenerationSystem",
    label: "Electricity Generation System",
  },
  { value: "ElectricityStorageSystem", label: "Electricity Storage System" },
  { value: "SGCP", label: "SGCP" },
  { value: "Household", label: "Household" },
  { value: "PVSystem", label: "PV System" },
  { value: "EV", label: "EV" },
  { value: "EVSE", label: "EVSE" },
  { value: "ChargingOutlet", label: "Charging Outlet" },
  { value: "CEM", label: "CEM" },
  { value: "Actuator", label: "Actuator" },
  { value: "Sensor", label: "Sensor" },
  { value: "Controller", label: "Controller" },
  { value: "EnvCondition", label: "Environment Condition" },
  { value: "FlexBuildingCampus", label: "Flex Building Campus" },
  { value: "DynamicTariff", label: "Dynamic Tariff" },
  { value: "R50", label: "R50" },
];

export const LEVEL_OF_OPERATION: {
  value: LevelOfOperation;
  label: string;
}[] = [
  { value: "m", label: "m" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "1m", label: "1m" },
  { value: "2m", label: "2m" },
  { value: "3m", label: "3m" },
  { value: "4m", label: "4m" },
  { value: "5m", label: "5m" },
  { value: "6m", label: "6m" },
];