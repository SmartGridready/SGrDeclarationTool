# KI-Prompts: Single Sektionen

Diese Dokumentation enthält die Prompts für Sektionen, die **einzeln und nur in einem Kontext** (Device ODER Functional Profile) verwendet werden (müssen nicht wiederverwendet werden können).

---

## Inhaltsverzeichnis

1. [Wann dieses Dokument verwenden?](#wann-dieses-dokument-verwenden)
2. [Ordnerstruktur](#ordnerstruktur)
3. [Entwicklungsreihenfolge](#entwicklungsreihenfolge)

**Prompts:**
1. [Factory (Leere Objekte erstellen)](#1-factory-leere-objekte-erstellen)
2. [Schema (Zod Validation)](#2-schema-zod-validation)
3. [Store-Slice (Direkter State-Zugriff)](#3-store-slice-direkter-state-zugriff)
4. [Form (Direkter Store-Import)](#4-form-direkter-store-import)
5. [Mapper (XML → Model)](#5-mapper-xml--model)
6. [Builder (Model → XML)](#6-builder-model--xml)

**Referenz:**
- [Slice-Komposition](#slice-komposition)
- [Anhang: Utility-Funktionen Übersicht](#anhang-utility-funktionen-übersicht)

---

## Wann dieses Dokument verwenden?

Verwende diese Prompts, wenn folgende Kriterien zutreffen:

| Kriterium | Beispiel |
|-----------|----------|
| Die Sektion wird **nur in einem Kontext** verwendet | `DeviceInformation` → nur Device |
| Die Sektion kommt **nur einmal** vor | `ConfigurationList` → nur auf Device-Ebene |

**Andernfalls:** Verwende `prompts-shared.md` für wiederverwendbare Implementierungen.

---

## Ordnerstruktur

Bei einer kontext-spezifischen Implementierung entstehen alle Dateien im jeweiligen Kontext-Ordner:

```
src/sections/
└── device/                          # ODER functional-profile/
    └── [sektion-name]/
        ├── [sektion-name]-builder.ts
        ├── [sektion-name]-form.tsx   # Direkter Store-Zugriff
        ├── [sektion-name]-mapper.ts
        ├── [sektion-name]-schema.ts
        └── [sektion-name]-slice.ts   # Direkter State-Zugriff
```

---

## Entwicklungsreihenfolge

| Schritt | Komponente | Dateipfad |
|---------|------------|-----------|
| 0 | **Model** *(manuell)* | `src/models/[bereich]/[name].ts` |
| 1 | **Factory** | `src/utils/factory-utils.ts` |
| 2 | **Schema** | `src/sections/[kontext]/[name]/[name]-schema.ts` |
| 3 | **Slice** | `src/sections/[kontext]/[name]/[name]-slice.ts` |
| 4 | **Form** | `src/sections/[kontext]/[name]/[name]-form.tsx` |
| 5 | **Mapper** | `src/sections/[kontext]/[name]/[name]-mapper.ts` |
| 6 | **Builder** | `src/sections/[kontext]/[name]/[name]-builder.ts` |

> **Voraussetzung:** Bevor eine neue Sektion implementiert wird, müssen die dazugehörigen TypeScript-Interfaces und Types im Model manuell definiert werden (siehe `src/models/`).

---

## 1. Factory (Leere Objekte erstellen)

### Kontext

Die Factory stellt Funktionen bereit, um leere Objekte für neue Elemente zu erstellen. Diese werden vom Store-Slice verwendet, wenn der Benutzer ein neues Element hinzufügt.

### Prompt

Erstelle eine Factory-Funktion für die Sektion "[SEKTION_NAME]" in:
`src/utils/factory-utils.ts`

**Voraussetzung - Model-Interface:**
Das Interface `[ElementType]` ist bereits in `src/models/` definiert und hat folgende Struktur:
[HIER DAS INTERFACE EINFÜGEN ODER BESCHREIBEN]

**Pattern:**

```typescript
import { [ElementType] } from "@/models";

/**
 * Creates an empty [ElementName] with default values.
 */
export function createEmpty[ElementName](): [ElementType] {
  return {
    // Pflichtfelder mit sinnvollen Defaults
    name: "",
    type: "DefaultValue",
    
    // Optionale Felder NICHT setzen (undefined lassen)
  };
}
```

**Regeln:**
- Import des Model-Interfaces aus `@/models`
- Rückgabetyp muss dem Interface entsprechen
- Nur Pflichtfelder (ohne `?` im Interface) initialisieren
- Optionale Felder weglassen (werden undefined)
- Enum-Felder: Wert aus dem definierten Union-Type verwenden
- Leere Strings für Text-Felder
- 0 für numerische Felder (wenn sinnvoll)

**Referenz:**
Siehe bestehende `createEmpty...`-Funktionen in `factory-utils.ts`

**Integration:** Die Factory-Funktion wird automatisch verfügbar, da sie in der zentralen `factory-utils.ts` Datei definiert wird. Sie wird vom Slice importiert und in `add[Sektion]()` / `addEmpty[Element]()` verwendet.

---

## 2. Schema (Zod Validation)

### Kontext

Das Schema definiert Zod-Validierungsregeln basierend auf dem Model-Interface und XSD-Schema. Es wird vom Builder für Validierung und vom Form für Fehleranzeige verwendet.

### Prompt

Erstelle ein Validierungsschema für die Sektion "[SEKTION_NAME]" im Pfad:
`src/sections/[kontext]/[sektion-name]/[sektion-name]-schema.ts`

**Voraussetzung - Model-Interfaces:**
Die folgenden Interfaces sind in `src/models/` definiert:
- `[SektionType]` - Der Listen-Container
- `[ElementType]` - Ein einzelnes Element
[HIER DIE INTERFACES EINFÜGEN]

Das Zod-Schema muss diese Interfaces validieren.

**Folgende Patterns müssen eingehalten werden:**

1. **Imports:**
   ```typescript
   import { z } from "zod";
   // Model-Interfaces für Typisierung der Validator-Funktionen
   import { [SektionType], [ElementType] } from "@/models";
   import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
   ```

2. **Schemas - müssen zum Interface passen:**
   ```typescript
   // Schema für [ElementType] Interface
   export const [element]Schema = z.object({
     // Pflichtfelder (ohne ? im Interface)
     name: z.string({ message: "Name is required" })
           .min(1, "Name cannot be empty"),
     
     // Optionale Felder (mit ? im Interface)
     description: z.string().optional(),
     
     // Union-Types aus dem Model
     type: z.enum(["A", "B", "C"], { message: "Invalid type" }),
   });

   // Schema für [SektionType] Interface
   // WICHTIG: Der Array-Feldname muss dem Model-Interface entsprechen!
   // z.B. "items", "changeLog", "authors", "entries" etc.
   export const [sektion]Schema = z.object({
     // Einfache Felder der Sektion
     sektionField: z.string().optional(),
     
     // Array-Feld (Name gemäss Model-Interface)
     [arrayName]: z.array([element]Schema)
            .min(1, "At least one item is required"),
   });
   ```

3. **Type Exports - abgeleitet vom Schema:**
   ```typescript
   export type [Element]Input = z.input<typeof [element]Schema>;
   export type [Sektion]Input = z.input<typeof [sektion]Schema>;
   ```

4. **Validator-Funktionen - typisiert mit Model-Interfaces:**
   ```typescript
   export function validate[Element](item: [ElementType]): ValidationResult<[ElementType]> {
     return validateWithSchema([element]Schema, item) as ValidationResult<[ElementType]>;
   }

   export function validate[Sektion](data: [SektionType]): ValidationResult<[SektionType]> {
     return validateWithSchema([sektion]Schema, data) as ValidationResult<[SektionType]>;
   }
   ```

5. **Interface zu Zod Mapping:**
   - `field: string` → `z.string().min(1)`
   - `field?: string` → `z.string().optional()`
   - `field: number` → `z.number()`
   - `field?: number` → `z.number().optional()`
   - `field: UnionType` → `z.enum([...UNION_VALUES])`
   - `field: Type[]` → `z.array(typeSchema)`
   - `field?: Type[]` → `z.array(typeSchema).optional()`

**Referenz-Implementierung:**
Siehe bestehende Schemas im Projekt unter `src/sections/`

**Integration:** Das Schema wird vom Builder importiert (`import { validate[SektionName] } from "./[sektion-name]-schema"`) und für die Validierung vor dem XML-Export verwendet.

---

## 3. Store-Slice (Direkter State-Zugriff)

### Kontext

Der Slice verwaltet den Zustand der Sektion mit Zustand und Immer. Bei kontext-spezifischen Implementierungen hat der Slice **direkten Zugriff** auf den State (z.B. `state.device`).

### Prompt

Erstelle einen Store-Slice für die Sektion "[SEKTION_NAME]" im Pfad:
`src/sections/[kontext]/[sektion-name]/[sektion-name]-slice.ts`

**Kontext:** [device | functional-profile]

**Voraussetzung - Model-Interfaces:**
Die folgenden Interfaces sind in `src/models/` definiert:
- `[SektionType]` - Der Listen-Container der Sektion
- `[ElementType]` - Ein einzelnes Element
[HIER DIE INTERFACES BESCHREIBEN]

Der Slice verwaltet den Zustand dieser Interfaces mit Zustand + Immer.

**Folgende Patterns müssen eingehalten werden:**

1. **Imports - Model-Typen und Utilities:**
   ```typescript
   // Model-Interfaces importieren
   import { [SektionType], [ElementType] } from "@/models";
   
   // Factory für leere Objekte (Sektion UND Elemente!)
   import { createEmpty[Sektion], createEmpty[Element] } from "@/utils/factory-utils";
   
   // Slice-Utilities
   import { ensureArray, removeArrayItem, normalizeString } from "@/utils/slice-utils";
   ```
   
   > **WICHTIG:** Für jede Sektion sollte eine `createEmpty[Sektion]()` Factory-Funktion in `factory-utils.ts` existieren!
   > Diese wird in `add[Sektion]()` verwendet, um konsistente Default-Werte zu gewährleisten.

2. **Slice-Interface definieren - Actions für das Model:**

   **Pattern A: Required Section (z.B. DeviceInformation):**
   ```typescript
   export interface [SektionName]Slice {
     // NUR Update-Actions - keine add/remove da Section immer vorhanden!
     updateField1: (value: FieldType1) => void;
     updateField2: (value: FieldType2 | undefined) => void;
     // ... weitere Felder
   }
   ```

   **Pattern B: Optional Section mit Array (z.B. ConfigurationList):**
   ```typescript
   export interface [SektionName]Slice {
     // Haupt-Operationen für die Sektion
     add[Sektion]: () => void;
     remove[Sektion]: () => void;
     
     // CRUD für Array-Elemente
     add[Element]: () => void;  // oder addEmpty[Element]
     remove[Element]: (index: number) => void;
     
     // Updates für einzelne Felder eines Elements
     update[Element]Name: (index: number, value: string) => void;
     update[Element]Field: (index: number, value: FieldType) => void;
     // ... weitere Felder gemäss Interface
   }
   ```

3. **Factory-Funktion mit direktem State-Zugriff:**

   **Pattern A: Required Section (z.B. DeviceInformation):**
   ```typescript
   export function create[SektionName]Slice<TState extends { device?: DeviceFrame }>(
     set: (fn: (state: TState) => void) => void
   ): [SektionName]Slice {
     // Helper für direkten Zugriff
     const getSektion = (state: TState) => state.device?.[sektionName];

     return {
       updateField1: (value) =>
         set((state) => {
           const sektion = getSektion(state);
           if (sektion) sektion.field1 = value;
         }),

       updateField2: (value) =>
         set((state) => {
           const sektion = getSektion(state);
           if (sektion) sektion.field2 = normalizeString(value);
         }),
       // ... weitere Update-Actions
     };
   }
   ```

   **Pattern B: Optional Section mit Array (z.B. ConfigurationList):**

   > **Hinweis zur Array-Struktur:** `[arrayName]` ist ein Platzhalter für den Array-Feldnamen 
   > aus dem Model-Interface (z.B. `configurationListElement`, `genericAttributeListElement`).

   ```typescript
   export function create[SektionName]Slice<TState extends { device?: DeviceFrame }>(
     set: (fn: (state: TState) => void) => void
   ): [SektionName]Slice {
     return {
       add[Sektion]: () =>
         set((state) => {
           if (state.device) {
             state.device.[sektionName] = createEmpty[Sektion]();  // Factory-Funktion verwenden!
           }
         }),

       remove[Sektion]: () =>
         set((state) => {
           if (state.device) {
             state.device.[sektionName] = undefined;
           }
         }),

       add[Element]: () =>
         set((state) => {
           if (state.device) {
             if (!state.device.[sektionName]) {
               state.device.[sektionName] = createEmpty[Sektion]();  // Factory-Funktion verwenden!
             }
             const arr = ensureArray(state.device.[sektionName]![arrayName], () => []);
             arr.push(createEmpty[Element]());
             state.device.[sektionName]![arrayName] = arr;
           }
         }),

       remove[Element]: (index) =>
         set((state) => {
           const sektion = state.device?.[sektionName];
           if (sektion?.[arrayName]) {
             removeArrayItem(sektion.[arrayName], index, () => {
               // Sektion entfernen wenn Array leer (je nach XSD-Anforderung)
               if (state.device) {
                 state.device.[sektionName] = undefined;
               }
             });
           }
         }),

       update[Element]Name: (index, value) =>
         set((state) => {
           const arr = state.device?.[sektionName]?.[arrayName];
           if (arr?.[index]) {
             arr[index].name = value;
           }
         }),
     };
   }
   ```

   **Für Functional-Profile-Kontext:** Analog, aber mit `state.profile` statt `state.device`:
   ```typescript
   export function create[SektionName]Slice<TState extends { profile?: FunctionalProfileFrame }>(
     set: (fn: (state: TState) => void) => void
   ): [SektionName]Slice {
     // state.profile statt state.device verwenden
     // ...
   }
   ```

4. **Wichtige Konzepte:**
   - **Direkter Zugriff:** `state.device.[sektionName]` oder `state.profile.[sektionName]`
   - Immer ermöglicht direkte Mutation
   - `normalizeString()` konvertiert leere Strings zu undefined

**Integration in Parent-Store:**
```typescript
// In parent-store.ts (z.B. device-store.ts):
import { create[SektionName]Slice, [SektionName]Slice } from "./[sektion-name]/[sektion-name]-slice";

export type StoreState = BaseStore & ... & [SektionName]Slice;

export const useDeviceStore = create<StoreState>()(
  persist(
    immer((set) => ({
      ...
      ...create[SektionName]Slice(set),
    })),
    { ... }
  )
);

// ODER in parent-slice.ts (bei tieferer Verschachtelung):
export function createParentSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ParentSlice {
  const [sektionName]Slice = create[SektionName]Slice(set);
  
  return {
    ...[sektionName]Slice,
    // ... eigene Actions
  };
}
```

**Referenz-Implementierung:**
Siehe bestehende Slices im Projekt unter `src/sections/device/` oder `src/sections/functional-profile/`

---

## 4. Form (Direkter Store-Import)

### Kontext

Das Formular ist die React-Komponente für die Benutzeroberfläche. Bei kontext-spezifischen Implementierungen importiert das Form **direkt** den Store.

### Prompt

Erstelle ein Formular für die Sektion "[SEKTION_NAME]" im Pfad:
`src/sections/[kontext]/[sektion-name]/[sektion-name]-form.tsx`

**Kontext:** [device | functional-profile]

**Voraussetzung - Model-Interfaces:**
Die folgenden Interfaces sind in `src/models/` definiert:
- `[SektionType]` - Der Listen-Container
- `[ElementType]` - Ein einzelnes Element
[HIER DAS INTERFACE BESCHREIBEN]

Das Formular verwendet diese Interfaces für die Typisierung der UI-Komponenten.

**Folgende Patterns müssen eingehalten werden:**

1. **Imports (Device-Kontext):**
   ```typescript
   "use client";

   // UI-Komponenten
   import { FormSection } from "@/components/forms/form-section";
   import { FormGroup } from "@/components/forms/form-group";
   import { ArrayField } from "@/components/forms/array-field";
   import { InputField } from "@/components/forms/input-field";
   import { SelectField } from "@/components/forms/select-field";
   import { TextareaField } from "@/components/forms/textarea-field";
   import { DateField } from "@/components/forms/date-field";
   import { ComboboxField } from "@/components/forms/combobox-field";
   
   // Model-Interface für Typisierung
   import { [SektionType], [ElementType] } from "@/models";
   
   // Store und Hooks - DIREKT importieren
   import { useDeviceStore } from "@/sections/device/device-store";
   import { useDeviceValidation } from "@/hooks/use-validation";
   import { useHasDevice, useDeviceField } from "@/hooks/use-store-field";
   ```

   ```typescript
   // Imports (Functional-Profile-Kontext):
   import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
   import { useProfileValidation } from "@/hooks/use-validation";
   import { useHasProfile, useProfileField } from "@/hooks/use-store-field";
   ```

2. **Komponenten-Struktur (Device-Kontext):**

   > **Hinweis:** Der Array-Feldname (`sektion.[arrayName]`) muss dem Model-Interface entsprechen.
   > Ebenso muss der Fehler-Pfad (`[sektionName].[arrayName][${index}]`) zum Schema passen.

   **Store-Zugriff Patterns:**
   - **Reaktiv (für State):** `useDeviceField()` - triggert Re-Renders bei Änderungen
   - **Synchron (für Actions):** `useDeviceStore.getState()` - KEINE Re-Renders

   > **WICHTIG: Granulare Field-Selektoren verwenden!**
   > Im Projekt werden für **jedes Feld einzelne Selektoren** verwendet, nicht ein Selektor für die ganze Sektion.
   > Das optimiert Re-Renders: Nur das Feld das sich ändert triggert ein Re-Render.

   **Pattern A: Required Section (immer vorhanden, z.B. DeviceInformation):**
   ```typescript
   export function [SektionName]Form() {
     // Prüfen ob Device vorhanden
     const hasDevice = useHasDevice();
     const hasSection = useDeviceField((d) => !!d?.[sektionName]);
     
     // GRANULARE SELEKTOREN: Jedes Feld einzeln selektieren!
     const field1 = useDeviceField((d) => d?.[sektionName]?.field1);
     const field2 = useDeviceField((d) => d?.[sektionName]?.field2);
     // ... weitere Felder
     
     const { getError } = useDeviceValidation();
     const store = useDeviceStore.getState();

     const getFieldError = (field: string) => getError(`[sektionName].${field}`);

     if (!hasDevice || !hasSection) {
       return null;
     }

     return (
       <FormSection
         title="[Sektion Titel]"
         description="[Beschreibung]"
         required={true}  // Required = keine Add/Remove Buttons
       >
         <FormGroup>
           <InputField
             label="Field 1"
             value={field1 ?? ""}
             onChange={(value) => store.updateField1(value)}
             error={getFieldError("field1")}
           />
         </FormGroup>
       </FormSection>
     );
   }
   ```

   **Pattern B: Optional Section mit Array (z.B. ConfigurationList):**
   ```typescript
   export function [SektionName]Form() {
     const hasDevice = useHasDevice();
     const isAdded = useDeviceField((d) => !!d?.[sektionName]);
     const arrayField = useDeviceField((d) => d?.[sektionName]?.[arrayName]);
     
     const { getError } = useDeviceValidation();
     const store = useDeviceStore.getState();

     const getItemError = (index: number, field: string) => 
       getError(`[sektionName].[arrayName][${index}].${field}`);

     if (!hasDevice) {
       return null;
     }

     return (
       <FormSection
         title="[Sektion Titel]"
         description="[Beschreibung]"
         required={false}
         isAdded={isAdded}
         onAdd={() => store.add[Sektion]()}
         onRemove={() => store.remove[Sektion]()}
       >
         {isAdded && (
           <ArrayField<[ElementType]>
             label="[Array Label]"
             items={arrayField}
             onAdd={() => store.addEmpty[Element]()}
             onRemove={(index) => store.remove[Element](index)}
             emptyMessage="No items added"
             renderItem={(item, index) => (
               <>
                 <InputField
                   label="Name"
                   name={`[sektion]-${index}-name`}
                   value={item.name}
                   onChange={(value) => store.update[Element]Name(index, value)}
                   placeholder="Enter name"
                   required={true}
                   error={getItemError(index, "name")}
                 />
               </>
             )}
           />
         )}
       </FormSection>
     );
   }
   ```

   ```typescript
   // Komponenten-Struktur (Functional-Profile-Kontext):
   // Analog zu Device, aber mit useProfileStore, useProfileField, useProfileValidation
   export function [SektionName]Form() {
     const hasProfile = useHasProfile();
     const isAdded = useProfileField((p) => !!p?.[sektionName]);
     
     // GRANULARE SELEKTOREN: Jedes Feld einzeln!
     const arrayField = useProfileField((p) => p?.[sektionName]?.[arrayName]);
     
     const { getError } = useProfileValidation();
     const store = useProfileStore.getState();
     
     if (!hasProfile) {
       return null;
     }
     
     // Pattern A (required): Kein isAdded check, kein onAdd/onRemove
     // Pattern B (optional): isAdded check + onAdd/onRemove wie bei Device
     return (
       <FormSection
         isAdded={isAdded}
         onAdd={() => store.add[Sektion]()}
         onRemove={() => store.remove[Sektion]()}
       >
         {isAdded && (
           <ArrayField
             items={arrayField}
             onAdd={() => store.addEmpty[Element]()}
             onRemove={(index) => store.remove[Element](index)}
             // ...
           />
         )}
       </FormSection>
     );
   }
   ```

3. **Verfügbare Form-Komponenten:**
   - `FormSection` - Collapsible Container mit Add/Remove
   - `FormGroup` - Gruppiert Felder in Spalten
   - `ArrayField<T>` - Generisch typisiert für Listen
   - `InputField` - Text/Number-Eingabe
   - `SelectField` - Dropdown
   - `TextareaField` - Mehrzeiliger Text
   - `DateField` - Datumsauswahl
   - `ComboboxField` - Autocomplete/Suche

4. **Interface-Feld zu UI-Komponente:**
   - `name: string` → `InputField` (required)
   - `description?: string` → `TextareaField`
   - `type: UnionType` → `SelectField` mit Options aus Union
   - `count?: number` → `InputField` type="number"
   - `date?: string` → `DateField`
   - `items: Type[]` → Verschachteltes `ArrayField<Type>`
   - Mehrere Felder nebeneinander → `FormGroup` mit columns

5. **Fehler-Pfade (müssen zum Schema passen):**
   - Root-Level Felder: `fieldName` (z.B. `deviceName`)
   - Verschachtelte Felder: `sektionName.fieldName`
   - Array-Elemente: `sektionName.[arrayName][index].fieldName`
   
   > **Beispiele aus dem Projekt:**
   > - `deviceName` (Root-Level Feld bei DeviceIdentification)
   > - `deviceInformation.deviceCategory` (verschachteltes Feld)
   > - `releaseNotes.changeLog[0].version` (Array-Element mit Feldname `changeLog`)
   > - `configurationList.configurationListElement[0].name` (Array-Element mit Feldname `configurationListElement`)

**Integration in Parent-Form:**
```typescript
// In parent-form.tsx (z.B. device-form.tsx oder device-information-form.tsx):
import { [SektionName]Form } from "./[sektion-name]/[sektion-name]-form";

export function ParentForm() {
  return (
    <div className="space-y-4">
      ...
      <[SektionName]Form />
    </div>
  );
}
```

**Referenz-Implementierung:**
Siehe bestehende Forms im Projekt unter `src/sections/device/` oder `src/sections/functional-profile/`

---

### Slice-Komposition

Slices können andere Slices inkludieren, wenn eine Sektion Sub-Sektionen enthält. Dies ist besonders nützlich, wenn eine Single-Section Shared-Komponenten als Sub-Sektionen verwendet.

> **Hinweis:** Die Sub-Slice-Wrapper-Funktionen (z.B. `createAlternativeNamesSliceForDevice`) 
> werden in `prompts-shared.md` (Abschnitt "Slice-Wrapper") dokumentiert.

**Beispiel: DeviceInformation mit Shared Sub-Sektionen:**

```typescript
// 1. Interface erweitert die Shared Slice-Interfaces
export interface DeviceInformationSlice 
  extends AlternativeNamesSlice, 
          LegibleDescriptionSlice,
          ProgrammerHintsSlice {
  // Eigene Actions dieser Sektion
  updateDeviceCategory: (value: DeviceCategory) => void;
  updateIsLocalControl: (value: boolean) => void;
  // ...
}

// 2. Factory erstellt und kombiniert Sub-Slices
export function createDeviceInformationSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): DeviceInformationSlice {
  // Helper für direkten Zugriff
  const getDeviceInformation = (state: TState) => state.device?.deviceInformation;

  // Sub-Slices erstellen (aus shared/ mit Wrapper-Funktion)
  const alternativeNamesSlice = createAlternativeNamesSliceForDevice(set);
  const legibleDescriptionSlice = createLegibleDescriptionSliceForDevice(set);
  const programmerHintsSlice = createProgrammerHintsSliceForDevice(set);

  return {
    // Sub-Slices spreaden
    ...alternativeNamesSlice,
    ...legibleDescriptionSlice,
    ...programmerHintsSlice,
    
    // Eigene Actions dieser Sektion
    updateDeviceCategory: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.deviceCategory = value;
      }),

    updateIsLocalControl: (value) =>
      set((state) => {
        const info = getDeviceInformation(state);
        if (info) info.isLocalControl = value;
      }),
  };
}
```

**Beispiel: ConfigurationList mit DataType Sub-Slices:**

```typescript
export interface ConfigurationListSlice
  extends ConfigurationListEnumSlice,
          ConfigurationListBitmapSlice,
          ConfigurationDescriptionsSlice {
  addConfigurationList: () => void;
  removeConfigurationList: () => void;
  addConfigurationListElement: () => void;
  // ...
}

export function createConfigurationListSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ConfigurationListSlice {
  // Sub-Slices für verschiedene DataTypes
  const enumSlice = createConfigurationListEnumSlice(set);
  const bitmapSlice = createConfigurationListBitmapSlice(set);
  const descriptionsSlice = createConfigurationDescriptionsSlice(set);

  return {
    ...enumSlice,
    ...bitmapSlice,
    ...descriptionsSlice,
    // ... eigene Actions
  };
}
```

---

## 5. Mapper (XML → Model)

### Kontext

Der Mapper transformiert XML-Daten (geparst mit xml2js) in das TypeScript-Model. Er wird beim Laden/Importieren von XML-Dateien verwendet.

### Prompt

Erstelle einen Mapper für die Sektion "[SEKTION_NAME]" im Pfad:
`src/sections/[kontext]/[sektion-name]/[sektion-name]-mapper.ts`

**Voraussetzung - Model-Interfaces:**
Die folgenden Interfaces sind in `src/models/` definiert:
- `[SektionType]` - Der Listen-Container
- `[ElementType]` - Ein einzelnes Element
[HIER DIE INTERFACES BESCHREIBEN ODER EINFÜGEN]

Der Mapper transformiert XML-Daten (geparst mit xml2js) in diese Model-Interfaces.

**Folgende Patterns müssen eingehalten werden:**

1. **Imports:**
   ```typescript
   // Model-Typen importieren
   import { [SektionType], [ElementType] } from "@/models";
   
   // Mapper-Utilities
   import {
     mapArray,
     mapOptionalArray,
     getStringValue,
     getOptionalStringValue,
     getNumberValue,
     getOptionalNumberValue,
     getTypedValue,
     getFirstElement,
     setOptionalField,
     Xml2JsObject,
   } from "@/utils/mapper-utils";
   ```

2. **Hauptfunktion - Rückgabetyp ist das Model-Interface:**
   ```typescript
   export function map[SektionName](xml: Xml2JsObject): [SektionType] {
     return {
       items: mapArray(xml, "itemElement", mapSingleItem),
     };
   }
   ```

3. **Helper-Funktionen - Rückgabetyp ist das Element-Interface:**
   ```typescript
   function mapSingleItem(itemXml: Xml2JsObject): [ElementType] {
     const result: [ElementType] = {
       name: getStringValue(itemXml, "name"),
     };
     
     setOptionalField(result, "description", getOptionalStringValue(itemXml, "description"));
     
     return result;
   }
   ```

4. **Utility-Funktionen nach Feld-Typ:**
   - `string` (Pflicht) → `getStringValue(xml, field)`
   - `string?` (Optional) → `getOptionalStringValue(xml, field)`
   - `number` (Pflicht) → `getNumberValue(xml, field)`
   - `number?` (Optional) → `getOptionalNumberValue(xml, field)`
   - Union-Type → `getTypedValue<UnionType>(xml, field, defaultValue)`
   - Array (Pflicht) → `mapArray(xml, field, mapperFn)`
   - Array (Optional) → `mapOptionalArray(xml, field, mapperFn)`
   - Verschachteltes Objekt → `getFirstElement(xml, field)`

5. **XML-Besonderheiten beachten:**
   - xml2js parsed alles in Arrays: `xml.field[0]`
   - Leere Tags wie `<enum />` werden zu `[""]` geparst
   - Attribute stehen unter `$`: `xml.$?.attributeName`

**Referenz-Implementierung:** 
Siehe bestehende Mapper im Projekt unter `src/sections/`

**Integration in Parent-Mapper:** Der Mapper wird vom übergeordneten Mapper aufgerufen:
```typescript
// In parent-mapper.ts (z.B. device-mapper.ts)
import { map[SektionName] } from "./[sektion-name]/[sektion-name]-mapper";

export function mapDevice(xml: Xml2JsObject): DeviceFrame {
  const result: DeviceFrame = { ... };
  
  // Sektion mappen
  const [sektionName]Xml = getFirstElement(xml, "[sektionName]");
  if ([sektionName]Xml) {
    result.[sektionName] = map[SektionName]([sektionName]Xml);
  }
  
  return result;
}
```

---

## 6. Builder (Model → XML)

### Kontext

Der Builder transformiert das TypeScript-Model zurück in ein xml2js-kompatibles XML-Objekt. Er wird beim Exportieren/Speichern verwendet und validiert die Daten vor dem Export.

### Prompt

Erstelle einen Builder für die Sektion "[SEKTION_NAME]" im Pfad:
`src/sections/[kontext]/[sektion-name]/[sektion-name]-builder.ts`

**Voraussetzung - Model-Interface:**
Das Interface `[SektionType]` ist in `src/models/` definiert:
[HIER DAS INTERFACE BESCHREIBEN ODER EINFÜGEN]

Der Builder transformiert dieses Model-Interface zurück in ein xml2js-kompatibles XML-Objekt.

**Folgende Patterns müssen eingehalten werden:**

1. **Imports:**
   ```typescript
   // Model-Typ importieren
   import { [SektionType] } from "@/models";
   
   // Validator (verwendet das gleiche Interface)
   import { validate[SektionName] } from "./[sektion-name]-schema";
   
   // Builder-Utilities
   import { wrapInArray, setOptionalXmlField, setOptionalXmlArray } from "@/utils/builder-utils";
   ```

2. **Hauptfunktion - Parameter-Typ ist das Model-Interface:**
   ```typescript
   export function build[SektionName](data: [SektionType]): Record<string, unknown> {
     // Validierung gegen das Schema
     const validation = validate[SektionName](data);
     if (!validation.success) {
       const firstError = validation.errors?.issues[0];
       throw new Error(firstError?.message || "Validation failed");
     }

     // XML-Objekt bauen
     return {
       elementName: data.items.map((item) => ({
         fieldName: wrapInArray(item.fieldName),
       })),
     };
   }
   ```

3. **Feld-Mapping nach Interface-Typ:**
   - `string` / `number` → `wrapInArray(value)`
   - `string?` / `number?` → `setOptionalXmlField(obj, field, value)`
   - `Array` → `.map()` mit verschachteltem Objekt
   - `Array?` → `setOptionalXmlArray(obj, field, array?.map(...))`

4. **XML-Format:**
   - Alle Werte in Arrays: `wrapInArray(value)`
   - Leere Tags: `{ tagName: [""] }` ergibt `<tagName/>`
   - Verschachtelte Elemente: Objekte in Arrays

**Referenz-Implementierung:**
Siehe bestehende Builder im Projekt unter `src/sections/`

**Integration in Parent-Builder:** Der Builder wird vom übergeordneten Builder aufgerufen:
```typescript
// In parent-builder.ts (z.B. device-builder.ts)
import { build[SektionName] } from "./[sektion-name]/[sektion-name]-builder";

export function buildDevice(data: DeviceFrame): Record<string, unknown> {
  const result: Record<string, unknown> = { ... };
  
  // Sektion builden
  if (data.[sektionName]) {
    result.[sektionName] = [build[SektionName](data.[sektionName])];
  }
  
  return result;
}
```

---

## Anhang: Utility-Funktionen Übersicht

### mapper-utils.ts
| Funktion | Zweck |
|----------|-------|
| `getStringValue(xml, field)` | Pflicht-String aus XML |
| `getOptionalStringValue(xml, field)` | Optionaler String |
| `getNumberValue(xml, field)` | Pflicht-Zahl |
| `getOptionalNumberValue(xml, field)` | Optionale Zahl |
| `getTypedValue<T>(xml, field, default)` | Union-Type mit Default |
| `mapArray(xml, field, mapperFn)` | Pflicht-Array mappen |
| `mapOptionalArray(xml, field, mapperFn)` | Optionales Array mappen |
| `getFirstElement(xml, field)` | Erstes Element holen |
| `setOptionalField(obj, field, value)` | Optionales Feld setzen |

### builder-utils.ts
| Funktion | Zweck |
|----------|-------|
| `wrapInArray(value)` | Wert in Array wrappen |
| `setOptionalXmlField(obj, field, value)` | Optionales XML-Feld |
| `setOptionalXmlArray(obj, field, array)` | Optionales XML-Array |

### slice-utils.ts
| Funktion | Zweck |
|----------|-------|
| `ensureArray(array, createFn)` | Array initialisieren |
| `removeArrayItem(array, index, onEmpty)` | Item entfernen mit Callback |
| `normalizeString(value)` | Leere Strings → undefined |

### validation-utils.ts
| Funktion | Zweck |
|----------|-------|
| `validateWithSchema(schema, data)` | Zod-Validierung durchführen |
