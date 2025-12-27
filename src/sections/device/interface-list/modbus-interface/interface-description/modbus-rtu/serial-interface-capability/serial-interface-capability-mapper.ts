import {
  SerialInterfaceCapability,
  BaudRate,
  ByteLength,
  Parity,
  StopBitLength,
} from "@/models/generic";
import { getStringValue, mapArray, Xml2JsObject } from "@/utils/mapper-utils";

/**
 * Maps XML serialInterfaceCapability to SerialInterfaceCapability model
 */
export function mapSerialInterfaceCapability(
  capabilityXml: Xml2JsObject | undefined
): SerialInterfaceCapability {
  if (!capabilityXml) {
    throw new Error("serialInterfaceCapability is required");
  }

  // Handle arrays of string values (xml2js converts repeated elements to arrays)
  const mapStringArray = <T>(array: unknown): T[] => {
    if (!Array.isArray(array)) {
      return [];
    }
    return array.filter((item): item is T => typeof item === "string");
  };

  return {
    baudRatesSupported: mapStringArray<BaudRate>(capabilityXml.baudRatesSupported),
    byteLenSupported: mapStringArray<ByteLength>(capabilityXml.byteLenSupported),
    paritySupported: mapStringArray<Parity>(capabilityXml.paritySupported),
    stopBitLenSupported: mapStringArray<StopBitLength>(capabilityXml.stopBitLenSupported),
  };
}
