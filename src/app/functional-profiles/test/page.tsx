"use client";

import { XmlTestPage } from "@/components/test/xml-test-page";
import { parseFunctionalProfile } from "@/sections/functional-profile/functional-profile-mapper";
import { buildFunctionalProfileToXml } from "@/sections/functional-profile/functional-profile-builder";

export default function FunctionalProfileTestPage() {
  return <XmlTestPage parse={parseFunctionalProfile} build={buildFunctionalProfileToXml} />;
}
