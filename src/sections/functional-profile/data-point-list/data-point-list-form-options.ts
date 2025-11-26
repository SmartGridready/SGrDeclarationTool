/**
 * Form options for DataPointList select fields
 */

export const DATA_DIRECTION_OPTIONS = [
  { value: "R", label: "Read (R)" },
  { value: "W", label: "Write (W)" },
  { value: "RW", label: "Read-Write (RW)" },
] as const;

export const PRESENCE_LEVEL_OPTIONS = [
  { value: "M", label: "Mandatory (M)" },
  { value: "R", label: "Recommended (R)" },
  { value: "O", label: "Optional (O)" },
] as const;

export const DATA_TYPE_OPTIONS = [
  { value: "boolean", label: "Boolean" },
  { value: "int8", label: "Int8" },
  { value: "int16", label: "Int16" },
  { value: "int32", label: "Int32" },
  { value: "int64", label: "Int64" },
  { value: "int8U", label: "UInt8" },
  { value: "int16U", label: "UInt16" },
  { value: "int32U", label: "UInt32" },
  { value: "int64U", label: "UInt64" },
  { value: "float32", label: "Float32" },
  { value: "float64", label: "Float64" },
  { value: "dateTime", label: "DateTime" },
  { value: "string", label: "String" },
  { value: "enum", label: "Enum" },
  { value: "bitmap", label: "Bitmap" },
  { value: "json", label: "JSON" },
] as const;

export const UNIT_OPTIONS = [
  { value: "AMPERES", label: "Amperes" },
  { value: "BARS", label: "Bars" },
  { value: "CUBIC_METERS", label: "Cubic Meters" },
  { value: "CUBIC_METERS_PER_SECOND", label: "Cubic Meters/Second" },
  { value: "DEGREES_CELSIUS", label: "Degrees Celsius" },
  { value: "DEGREES_KELVIN", label: "Degrees Kelvin" },
  { value: "DEGREES_PHASE", label: "Degrees Phase" },
  { value: "HERTZ", label: "Hertz" },
  { value: "HOURS", label: "Hours" },
  { value: "JOULES", label: "Joules" },
  { value: "KILOGRAMS", label: "Kilograms" },
  { value: "KILOVOLT_AMPERES", label: "Kilovolt Amperes" },
  { value: "KILOVOLT_AMPERE_HOURS", label: "Kilovolt Ampere Hours" },
  { value: "KILOVOLT_AMPERES_REACTIVE", label: "Kilovolt Amperes Reactive" },
  { value: "KILOVOLT_AMPERES_REACTIVE_HOURS", label: "kVAR Hours" },
  { value: "KILOWATT_HOURS", label: "Kilowatt Hours" },
  { value: "KILOWATTS", label: "Kilowatts" },
  { value: "METERS", label: "Meters" },
  { value: "METERS_PER_SECOND", label: "Meters/Second" },
  { value: "METERS_PER_SECOND_PER_SECOND", label: "Meters/Second²" },
  { value: "MINUTES", label: "Minutes" },
  { value: "NO_UNITS", label: "No Units" },
  { value: "OHMS", label: "Ohms" },
  { value: "PARTS_PER_MILLION", label: "Parts Per Million" },
  { value: "PASCALS", label: "Pascals" },
  { value: "PER_HOUR", label: "Per Hour" },
  { value: "PERCENT", label: "Percent" },
  { value: "PERCENT_RELATIVE_HUMIDITY", label: "% Relative Humidity" },
  { value: "POWER_FACTOR", label: "Power Factor" },
  { value: "RADIANS", label: "Radians" },
  { value: "RADIANS_PER_SECOND", label: "Radians/Second" },
  { value: "REVOLUTIONS_PER_MINUTE", label: "RPM" },
  { value: "SECONDS", label: "Seconds" },
  { value: "SQUARE_METERS", label: "Square Meters" },
  { value: "VOLT_AMPERES", label: "Volt Amperes" },
  { value: "VOLT_AMPERES_REACTIVE", label: "Volt Amperes Reactive" },
  { value: "VOLTS", label: "Volts" },
  { value: "WATT_HOURS", label: "Watt Hours" },
  { value: "WATTS", label: "Watts" },
  { value: "WATTS_PER_SQUARE_METER", label: "Watts/Square Meter" },
  { value: "MEGAWATT_HOURS", label: "Megawatt Hours" },
  { value: "NONE", label: "None" },
] as const;
