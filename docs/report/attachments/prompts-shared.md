# KI-Prompts: Shared-Sektionen

Diese Dokumentation enthält die Prompts für Sektionen, die **wiederverwendbar** sind und in **mehreren Kontexten oder mehrfach im gleichen Kontext** verwendet werden (Device UND Functional Profile, oder mehrmals innerhalb eines Kontexts).

---

## Inhaltsverzeichnis

1. [Wann dieses Dokument verwenden?](#wann-dieses-dokument-verwenden)
2. [Ordnerstruktur](#ordnerstruktur)
3. [Entwicklungsreihenfolge](#entwicklungsreihenfolge)

**Prompts:**
1. [Factory (Leere Objekte erstellen)](#1-factory-leere-objekte-erstellen)
2. [Schema (Zod Validation)](#2-schema-zod-validation)
3. [Store-Slice (Generisch mit Getter/Setter)](#3-store-slice-generisch-mit-gettersetter)
4. [Slice-Wrapper](#4-slice-wrapper)
5. [Form (Generisch mit Props)](#5-form-generisch-mit-props)
6. [Form-Wrapper](#6-form-wrapper)
7. [Mapper (XML → Model)](#7-mapper-xml--model)
8. [Builder (Model → XML)](#8-builder-model--xml)

**Konzepte:**
- [Store-Zugriff Patterns](#9-store-zugriff-patterns)
- [Slice-Komposition](#10-slice-komposition)
- [Fortgeschrittene Slice-Patterns](#11-fortgeschrittene-slice-patterns)
- [Verschachtelte Forms (Form-Komposition)](#12-verschachtelte-forms-form-komposition)

**Referenz:**
- [Anhang A: Pattern-Übersicht](#anhang-a-pattern-übersicht)
- [Anhang B: Utility-Funktionen Übersicht](#anhang-b-utility-funktionen-übersicht)

---

## Wann dieses Dokument verwenden?

Verwende diese Prompts, wenn **eines** der folgenden Kriterien zutrifft:

| Kriterium | Beispiel |
|-----------|----------|
| Die Sektion wird in **beiden Kontexten** verwendet | `ReleaseNotes` → Device + Functional Profile |
| Die Sektion kommt **mehrmals im gleichen Kontext** vor | `LegibleDescription` → auf FP-Ebene + DataPoint-Ebene |

**Andernfalls:** Verwende `prompts-single.md` für kontext-spezifische Implementierungen.

---

## Ordnerstruktur

Bei einer Shared-Implementierung entstehen folgende Dateien:

```
src/sections/
├── shared/                             # Generische Implementierung
│   └── [sektion-name]/
│       ├── [sektion-name]-builder.ts
│       ├── [sektion-name]-form.tsx     # Generische Form mit Props
│       ├── [sektion-name]-mapper.ts
│       ├── [sektion-name]-schema.ts
│       └── [sektion-name]-slice.ts     # Generischer Slice mit Getter/Setter
│
├── device/                             # Wrapper für Device-Kontext
│   └── [sektion-name]/
│       ├── [sektion-name]-form.tsx     # Wrapper: Verbindet Form mit Device-Store
│       └── [sektion-name]-slice.ts     # Wrapper: Konfiguriert Slice für Device
│
└── functional-profile/                 # Wrapper für Profile-Kontext
    └── [sektion-name]/
        ├── [sektion-name]-form.tsx     # Wrapper: Verbindet Form mit Profile-Store
        └── [sektion-name]-slice.ts     # Wrapper: Konfiguriert Slice für Profile
```

---

## Entwicklungsreihenfolge

| Schritt | Komponente | Dateipfad |
|---------|------------|-----------|
| 0 | **Model** *(manuell)* | `src/models/[bereich]/[name].ts` |
| 1 | **Factory** | `src/utils/factory-utils.ts` |
| 2 | **Schema** | `src/sections/shared/[name]/[name]-schema.ts` |
| 3 | **Slice (Shared)** | `src/sections/shared/[name]/[name]-slice.ts` |
| 4a | **Slice-Wrapper (Device)** | `src/sections/device/[name]/[name]-slice.ts` |
| 4b | **Slice-Wrapper (Profile)** | `src/sections/functional-profile/[name]/[name]-slice.ts` |
| 5 | **Form (Shared)** | `src/sections/shared/[name]/[name]-form.tsx` |
| 6a | **Form-Wrapper (Device)** | `src/sections/device/[name]/[name]-form.tsx` |
| 6b | **Form-Wrapper (Profile)** | `src/sections/functional-profile/[name]/[name]-form.tsx` |
| 7 | **Mapper** | `src/sections/shared/[name]/[name]-mapper.ts` |
| 8 | **Builder** | `src/sections/shared/[name]/[name]-builder.ts` |

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
`src/sections/shared/[sektion-name]/[sektion-name]-schema.ts`

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
     // Einfache Felder der Sektion (falls vorhanden)
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
Siehe bestehende Schemas im Projekt unter `src/sections/shared/`

**Integration:** Das Schema wird vom Builder importiert (`import { validate[SektionName] } from "./[sektion-name]-schema"`) und für die Validierung vor dem XML-Export verwendet.

---

## 3. Store-Slice (Generisch mit Getter/Setter)

### Kontext

Der Slice verwaltet den Zustand der Sektion mit Zustand und Immer. Bei Shared-Implementierungen wird ein **generisches Factory-Pattern mit Getter/Setter-Funktionen** verwendet, damit der Slice in verschiedenen Kontexten wiederverwendet werden kann.

### Prompt

Erstelle einen **generischen** Store-Slice für die Sektion "[SEKTION_NAME]" im Pfad:
`src/sections/shared/[sektion-name]/[sektion-name]-slice.ts`

**Voraussetzung - Model-Interfaces:**
Die folgenden Interfaces sind in `src/models/` definiert:
- `[SektionType]` - Der Listen-Container der Sektion
- `[ElementType]` - Ein einzelnes Element
[HIER DIE INTERFACES BESCHREIBEN]

Der Slice verwaltet den Zustand dieser Interfaces mit Zustand + Immer.
**WICHTIG:** Der Slice ist generisch und kennt den Kontext (Device/Profile) NICHT direkt.

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
   ```typescript
   export interface [SektionName]Slice {
     // Haupt-Operationen
     add[Sektion]: () => void;
     remove[Sektion]: () => void;
     
     // CRUD für Array-Elemente (falls vorhanden)
     add[Element]: (item: [ElementType]) => void;
     remove[Element]: (index: number) => void;
     
     // Updates für einzelne Felder von [ElementType]
     update[Element]Name: (index: number, value: string) => void;
     // ... weitere Felder gemäss Interface
     
     // Convenience
     addEmpty[Element]: () => void;
   }
   ```

3. **Generische Factory-Funktion mit Getter/Setter:**

   Es gibt verschiedene Slice-Patterns je nach Sektion-Struktur:

   ---

   **Pattern A: Objekt mit Array (z.B. `release-notes`)**
   
   Für Sektionen die ein Objekt mit einem Array-Feld sind:

   ```typescript
   export function create[SektionName]Slice<TState>(
     set: (fn: (state: TState) => void) => void,
     get[Sektion]: (state: TState) => [SektionType] | undefined,
     set[Sektion]: (state: TState, value: [SektionType] | undefined) => void,
     isOptional: boolean = true
   ): [SektionName]Slice {
     return {
       add[Sektion]: () =>
         set((state) => {
           const current = get[Sektion](state);
           if (!current) {
             set[Sektion](state, createEmpty[Sektion]());  // Factory-Funktion verwenden!
           }
         }),

       remove[Sektion]: () =>
         set((state) => {
           if (isOptional) {
             set[Sektion](state, undefined);
           }
         }),

       // Field-Updates
       updateField: (value) =>
         set((state) => {
           const sektion = get[Sektion](state);
           if (sektion) {
             sektion.field = value;
           }
         }),

       // Array-Operationen
       addEmpty[Element]: () =>
         set((state) => {
           const sektion = get[Sektion](state);
           if (sektion) {
             const list = ensureArray(sektion.[arrayName], () => []);
             list.push(createEmpty[Element]());
             sektion.[arrayName] = list;
           }
         }),

       remove[Element]: (index) =>
         set((state) => {
           const sektion = get[Sektion](state);
           if (sektion?.[arrayName]) {
             removeArrayItem(sektion.[arrayName], index, () => {
               sektion.[arrayName] = undefined;
             });
           }
         }),
     };
   }
   ```

   ---

   **Pattern B: Array direkt (z.B. `legible-description`)**
   
   Für Sektionen die direkt ein Array sind (nicht in einem Objekt):

   ```typescript
   export function create[SektionName]Slice<TState>(
     set: (fn: (state: TState) => void) => void,
     getItems: (state: TState) => [ElementType][] | undefined,
     setItems: (state: TState, items: [ElementType][] | undefined) => void,
     maxItems: number = 4,  // Optional: Maximum-Anzahl
     isOptional: boolean = true
   ): [SektionName]Slice {
     return {
       add[Element]: (item) =>
         set((state) => {
           const list = ensureArray(getItems(state), () => []);
           if (list.length < maxItems) {
             list.push(item);
             setItems(state, list);
           }
         }),

       remove[Element]: (index) =>
         set((state) => {
           const current = getItems(state);
           if (current) {
             removeArrayItem(current, index, () => {
               if (isOptional) {
                 setItems(state, undefined);
               } else {
                 setItems(state, []);
               }
             });
           }
         }),

       removeAll: () =>
         set((state) => {
           if (isOptional) {
             setItems(state, undefined);
           } else {
             setItems(state, []);
           }
         }),

       update[Element]Field: (index, value) =>
         set((state) => {
           const array = getItems(state);
           if (array?.[index]) {
             const updated = [...array];
             updated[index] = { ...updated[index], field: value };
             setItems(state, updated);
           }
         }),
     };
   }
   ```

   ---

   **Pattern C: Einfaches Objekt ohne Array (z.B. `alternative-names`)**
   
   Für Sektionen die nur Felder haben (kein Array):

   ```typescript
   export function create[SektionName]Slice<TState>(
     set: (fn: (state: TState) => void) => void,
     get[Sektion]: (state: TState) => [SektionType] | undefined,
     set[Sektion]: (state: TState, value: [SektionType] | undefined) => void,
     isOptional: boolean = true
   ): [SektionName]Slice {
     // Helper: Prüft ob alle Felder leer sind
     const isEmpty = (obj: [SektionType]): boolean => {
       return !obj.field1 && !obj.field2 && !obj.field3;
     };

     return {
       add[Sektion]: () =>
         set((state) => {
           const current = get[Sektion](state);
           if (!current) {
             set[Sektion](state, createEmpty[Sektion]());  // Factory-Funktion verwenden!
           }
         }),

       remove[Sektion]: () =>
         set((state) => {
           if (isOptional) {
             set[Sektion](state, undefined);
           }
         }),

       // Field-Update mit Auto-Create und Auto-Cleanup
       updateField1: (value) =>
         set((state) => {
           let sektion = get[Sektion](state);
           // Auto-Create: Objekt erstellen wenn Wert gesetzt wird
           if (!sektion && value) {
             sektion = {};
             set[Sektion](state, sektion);
           }
           if (sektion) {
             sektion.field1 = normalizeString(value);
             // Auto-Cleanup: Objekt entfernen wenn alle Felder leer
             if (isOptional && isEmpty(sektion)) {
               set[Sektion](state, undefined);
             }
           }
         }),
     };
   }
   ```

   > **Wann welches Pattern?**
   > - **Pattern A:** Sektion hat eigene Felder UND ein Array (z.B. ReleaseNotes mit state + changeLog)
   > - **Pattern B:** Sektion IST direkt ein Array (z.B. LegibleDescription[])
   > - **Pattern C:** Sektion hat nur Felder, kein Array (z.B. AlternativeNames)

4. **Wichtige Konzepte:**
   - **Generisch:** Der Slice kennt `state.device` oder `state.profile` NICHT
   - **Getter/Setter:** Ermöglichen Wiederverwendung in verschiedenen Kontexten
   - **isOptional:** `true` für optionale Sektionen, `false` für Pflicht-Sektionen
   - `normalizeString()` konvertiert leere Strings zu undefined

**Integration in Parent-Store (bei verschachtelten Slices):**

```typescript
// In parent-slice.ts (z.B. device-information-slice.ts)
import { create[SektionName]Slice, [SektionName]Slice } from "@/sections/shared/[sektion-name]/[sektion-name]-slice";

export function createParentSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ParentSlice {
  // Shared Slice mit Getter/Setter für diesen Kontext erstellen
  const [sektionName]Slice = create[SektionName]Slice(
    set,
    (state) => state.device?.parentSection?.[sektionName],
    (state, value) => {
      if (state.device?.parentSection) {
        state.device.parentSection.[sektionName] = value;
      }
    },
    true  // isOptional - je nach XSD-Anforderung
  );

  return {
    // Sub-Slice spreaden
    ...[sektionName]Slice,
    
    // Eigene Actions des Parent-Slice
    // ...
  };
}
```

> **Hinweis:** Bei Top-Level Sektionen (direkt unter `device` oder `profile`) wird die Integration 
> über einen Slice-Wrapper gemacht (siehe Abschnitt 4).

**Referenz-Implementierung:**
Siehe bestehende Slices in `src/sections/shared/`

---

## 4. Slice-Wrapper

### Kontext

Die Slice-Wrapper konfigurieren den generischen Shared-Slice mit den richtigen Getter/Setter für den jeweiligen Kontext. Sie sind **Convenience-Funktionen**, die die Store-Integration vereinfachen.

### 4a. Slice-Wrapper für Device

**Prompt:**

Erstelle einen Slice-Wrapper für die Sektion "[SEKTION_NAME]" im Device-Kontext:
`src/sections/device/[sektion-name]/[sektion-name]-slice.ts`

**Pattern:**

```typescript
import { DeviceFrame } from "@/models";
import { create[SektionName]Slice, [SektionName]Slice } from "@/sections/shared/[sektion-name]/[sektion-name]-slice";

// Re-export the interface for convenience
export type { [SektionName]Slice } from "@/sections/shared/[sektion-name]/[sektion-name]-slice";

/**
 * Creates a [sektion-name] slice specifically for device stores
 * This is a convenience function that sets up the getter/setter for device.[sektionName]
 */
export function create[SektionName]SliceForDevice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): [SektionName]Slice {
  return create[SektionName]Slice(
    set,
    // Getter: Holt die Sektion aus dem Device
    (state) => state.device?.[sektionName],
    // Setter: Setzt die Sektion im Device
    (state, value) => {
      if (state.device) {
        state.device.[sektionName] = value;
      }
    },
    false // isOptional - false wenn Pflichtfeld, true wenn optional
  );
}
```

### 4b. Slice-Wrapper für Functional Profile

**Prompt:**

Erstelle einen Slice-Wrapper für die Sektion "[SEKTION_NAME]" im Functional Profile-Kontext:
`src/sections/functional-profile/[sektion-name]/[sektion-name]-slice.ts`

**Pattern:**

```typescript
import { FunctionalProfileFrame } from "@/models";
import { create[SektionName]Slice, [SektionName]Slice } from "@/sections/shared/[sektion-name]/[sektion-name]-slice";

// Re-export the interface for convenience
export type { [SektionName]Slice } from "@/sections/shared/[sektion-name]/[sektion-name]-slice";

/**
 * Creates a [sektion-name] slice specifically for functional profile stores
 * This is a convenience function that sets up the getter/setter for profile.[sektionName]
 */
export function create[SektionName]SliceForProfile<TState extends { profile?: FunctionalProfileFrame }>(
  set: (fn: (state: TState) => void) => void
): [SektionName]Slice {
  return create[SektionName]Slice(
    set,
    // Getter: Holt die Sektion aus dem Profile
    (state) => state.profile?.[sektionName],
    // Setter: Setzt die Sektion im Profile (auch undefined für optionale Sektionen)
    (state, value) => {
      if (state.profile) {
        state.profile.[sektionName] = value;
      }
    },
    true // isOptional - true wenn optional, false wenn Pflichtfeld
  );
}
```

> **Wichtig zum Setter:**
> - Bei `isOptional=true`: Der Setter MUSS `undefined` akzeptieren (für `remove[Sektion]()`)
>   ```typescript
>   (state, value) => {
>     if (state.profile) {
>       state.profile.[sektionName] = value;  // value kann undefined sein!
>     }
>   }
>   ```
> - Bei `isOptional=false`: Der Setter kann auf `&& value` prüfen (da `remove` sowieso nicht wirkt)
>   ```typescript
>   (state, value) => {
>     if (state.device && value) {
>       state.device.[sektionName] = value;
>     }
>   }
>   ```

**Verschachtelte Pfade:**

Wenn eine Sektion unter einer anderen Sektion verschachtelt ist (z.B. `alternativeNames` unter `deviceInformation`):

```typescript
export function createAlternativeNamesSliceForDevice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): AlternativeNamesSlice {
  return createAlternativeNamesSlice(
    set,
    // Verschachtelter Getter
    (state) => state.device?.deviceInformation?.alternativeNames,
    // Verschachtelter Setter
    (state, alternativeNames) => {
      if (state.device?.deviceInformation) {
        state.device.deviceInformation.alternativeNames = alternativeNames;
      }
    },
    true  // isOptional
  );
}
```

**Integration in Parent-Store:**

```typescript
// In parent-store.ts (z.B. device-store.ts):
import { create[SektionName]SliceForDevice } from "./[sektion-name]/[sektion-name]-slice";

export const useDeviceStore = create<StoreState>()(
  persist(
    immer((set) => ({
      ...
      ...create[SektionName]SliceForDevice(set),
    })),
    { ... }
  )
);

// ODER in parent-slice.ts (bei tieferer Verschachtelung):
export function createParentSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): ParentSlice {
  const [sektionName]Slice = create[SektionName]SliceForDevice(set);
  
  return {
    ...[sektionName]Slice,
    // ... eigene Actions
  };
}
```

---

## 5. Form (Generisch mit Props)

### Kontext

Das Formular ist die React-Komponente für die Benutzeroberfläche. Bei Shared-Implementierungen werden **Props** für die Store-Anbindung verwendet, damit das Form in verschiedenen Kontexten wiederverwendet werden kann.

### Prompt

Erstelle ein **generisches** Formular für die Sektion "[SEKTION_NAME]" im Pfad:
`src/sections/shared/[sektion-name]/[sektion-name]-form.tsx`

**Voraussetzung - Model-Interfaces:**
Die folgenden Interfaces sind in `src/models/` definiert:
- `[SektionType]` - Der Listen-Container
- `[ElementType]` - Ein einzelnes Element
[HIER DAS INTERFACE BESCHREIBEN]

Das Formular verwendet diese Interfaces für die Typisierung der UI-Komponenten.
**WICHTIG:** Das Form kennt den Kontext (Device/Profile) NICHT direkt. Alle Kontext-spezifischen Informationen kommen über Props.

**Folgende Patterns müssen eingehalten werden:**

1. **Imports:**
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
   
   // Slice-Interface (aus shared!)
   import { [SektionName]Slice } from "@/sections/shared/[sektion-name]/[sektion-name]-slice";
   
   // Form-Hook
   import { useFormSection } from "@/hooks/use-form-section";
   ```

2. **Props-Interface mit Generics (WICHTIG für Shared):**
   ```typescript
   interface [SektionName]FormProps<TStoreState extends [SektionName]Slice> {
     // Store-Anbindung (wird vom Wrapper bereitgestellt)
     useStore: <TSelected>(selector: (store: TStoreState) => TSelected) => TSelected;
     useValidation: () => { getError: (fieldPath: string) => string | undefined };
     
     // Selektoren (kontext-spezifisch, vom Wrapper definiert)
     // WICHTIG: stateSelector extrahiert die EINZELNEN FELDER, nicht das Sektion-Objekt!
     stateSelector: (store: TStoreState) => {
       // Die Felder die das Form benötigt (können umbenannt werden!)
       field1?: FieldType1;
       field2?: string;
       arrayField?: ElementType[];
     };
     isAddedSelector?: (store: TStoreState) => boolean;
     
     // Konfiguration
     fieldPathPrefix?: string;
     required?: boolean;
     title?: string;
     description?: string;
     nested?: boolean;
   }
   ```

   > **Beispiel aus release-notes:**
   > ```typescript
   > stateSelector: (store: TStoreState) => {
   >   // Felder können umbenannt werden (z.B. wegen Namenskollisionen)
   >   releaseState?: ReleaseState;  // Model-Feld heisst "state"
   >   remarks?: string;
   >   changeLogs?: ChangeLog[];     // Model-Feld heisst "changeLog"
   > };
   > ```

3. **Komponenten-Struktur mit useFormSection Hook:**
   ```typescript
   export function [SektionName]Form<TStoreState extends [SektionName]Slice>({
     useStore,
     useValidation,
     stateSelector,
     isAddedSelector,
     fieldPathPrefix = "[sektionName]",
     required = false,
     title = "[Sektion Titel]",
     description = "[Beschreibung]",
     nested = false,
   }: [SektionName]FormProps<TStoreState>) {
     // useFormSection Hook für optimierte Store-Anbindung
     // WICHTIG: Der State-Typ muss den Feldern aus stateSelector entsprechen!
     const { state, actions, isAdded, getError, handleAdd, handleRemove } = useFormSection<
       TStoreState,
       { field1?: FieldType1; field2?: string; arrayField?: ElementType[] },  // Felder aus stateSelector!
       [SektionName]Slice & Record<string, unknown>
     >({
       useStore,
       useValidation,
       stateSelector,
       // actionsSelector castet den Store zum Slice-Interface
       actionsSelector: (store) => store as [SektionName]Slice & Record<string, unknown>,
       isAddedSelector: required ? undefined : isAddedSelector,
       onAdd: required ? undefined : (actions) => actions.add[Sektion](),
       onRemove: required ? undefined : (actions) => actions.remove[Sektion](),
     });

     // Zugriff auf die Felder aus state (wie im stateSelector definiert)
     // Beispiel: state.field1, state.arrayField

     // Helper für Fehler-Pfade (Pfade müssen zum Schema passen!)
     const getFieldError = (field: string) => getError(`${fieldPathPrefix}.${field}`);
     // WICHTIG: [arrayName] ist der Feldname aus dem Model-Interface (z.B. items, changeLog, etc.)
     const getItemError = (index: number, field: string) => 
       getError(`${fieldPathPrefix}.[arrayName][${index}].${field}`);

     return (
       <FormSection
         title={title}
         description={description}
         required={required}
         isAdded={required ? true : isAdded}
         onAdd={required ? undefined : handleAdd}
         onRemove={required ? undefined : handleRemove}
         nested={nested}
       >
         {/* Zugriff auf Felder aus state (vom stateSelector transformiert) */}
         <ArrayField<[ElementType]>
           label="[Array Label]"
           items={state.arrayField}  {/* Feld aus stateSelector */}
           onAdd={actions.addEmpty[Element]}
           onRemove={actions.remove[Element]}
           emptyMessage="No items added"
           renderItem={(item, index) => (
             <>
               <InputField
                 label="Name"
                 name={`[sektion]-${index}-name`}
                 value={item.name}
                 onChange={(value) => actions.update[Element]Field(index, value)}
                 placeholder="Enter name"
                 required={true}
                 error={getItemError(index, "name")}
               />
               
               <TextareaField
                 label="Description"
                 name={`[sektion]-${index}-description`}
                 value={item.description}
                 onChange={(value) => actions.update[Element]Description(index, value || undefined)}
                 error={getItemError(index, "description")}
               />
             </>
           )}
         />
       </FormSection>
     );
   }
   ```

4. **Verfügbare Form-Komponenten:**
   - `FormSection` - Collapsible Container mit Add/Remove
   - `FormGroup` - Gruppiert Felder in Spalten
   - `ArrayField<T>` - Generisch typisiert für Listen
   - `InputField` - Text/Number-Eingabe
   - `SelectField` - Dropdown
   - `TextareaField` - Mehrzeiliger Text
   - `DateField` - Datumsauswahl
   - `ComboboxField` - Autocomplete/Suche

5. **Interface-Feld zu UI-Komponente:**
   - `name: string` → `InputField` (required)
   - `description?: string` → `TextareaField`
   - `type: UnionType` → `SelectField` mit Options aus Union
   - `count?: number` → `InputField` type="number"
   - `date?: string` → `DateField`
   - `items: Type[]` → Verschachteltes `ArrayField<Type>`
   - Mehrere Felder nebeneinander → `FormGroup` mit columns

**Referenz-Implementierung:**
Siehe bestehende Forms in `src/sections/shared/`

**Integration:** Das Shared-Form wird NICHT direkt verwendet, sondern über Form-Wrapper (siehe Abschnitt 6) in den jeweiligen Kontext eingebunden.

---

## 6. Form-Wrapper

### Kontext

Die Form-Wrapper verbinden die generische Shared-Form mit dem kontext-spezifischen Store. Sie werden für **jeden Kontext separat** erstellt (Device + Functional Profile).

### 6a. Form-Wrapper für Device

**Prompt:**

Erstelle einen Form-Wrapper für die Sektion "[SEKTION_NAME]" im Device-Kontext:
`src/sections/device/[sektion-name]/[sektion-name]-form.tsx`

**Pattern:**

```typescript
"use client";

import { [SektionName]Form as Shared[SektionName]Form } from "@/sections/shared/[sektion-name]/[sektion-name]-form";
import { useDeviceStore } from "@/sections/device/device-store";
import { useDeviceValidation } from "@/hooks/use-validation";
import { createDeviceStoreAdapter } from "@/hooks/use-form-section";
import { useHasDevice, useDeviceField } from "@/hooks/use-store-field";

/**
 * Device specific [SektionName] form.
 * Uses the device store directly.
 */
export function [SektionName]Form() {
  const hasDevice = useHasDevice();
  // GRANULARER SELEKTOR: Subscribe to section for re-renders
  const sektion = useDeviceField((d) => d?.[sektionName]);
  const store = useDeviceStore.getState();
  const device = store.device;
  const useStore = createDeviceStoreAdapter(device, store);
  const useValidation = useDeviceValidation;

  // Force re-render when section changes
  void sektion;

  if (!hasDevice) {
    return null;
  }

  return (
    <Shared[SektionName]Form
      useStore={useStore}
      useValidation={useValidation}
      // WICHTIG: Der stateSelector extrahiert die FELDER die das Shared-Form erwartet!
      // Siehe Props-Interface der Shared-Form für die erwartete Struktur
      stateSelector={(store) => ({
        field1: store.device?.[sektionName]?.field1,
        field2: store.device?.[sektionName]?.field2,
        arrayField: store.device?.[sektionName]?.arrayField,
      })}
      isAddedSelector={(store) => !!store.device?.[sektionName]}
      fieldPathPrefix="[sektionName]"
      required={true}  // oder false, je nach XSD
    />
  );
}
```

> **WICHTIG:** Der `stateSelector` gibt **NICHT** das ganze Sektion-Objekt zurück!
> Er extrahiert die **einzelnen Felder** die das Shared-Form erwartet.
> Prüfe das `stateSelector` Prop-Interface in der Shared-Form für die korrekte Struktur.

**Beispiel aus release-notes:**
```typescript
stateSelector={(store) => ({
  releaseState: store.device?.releaseNotes?.state,
  remarks: store.device?.releaseNotes?.remarks,
  changeLogs: store.device?.releaseNotes?.changeLog,
})}
```

**Verschachtelte Pfade (z.B. alternative-names unter device-information):**
```typescript
// Granularer Selektor für verschachtelte Sektion
const alternativeNames = useDeviceField((d) => d?.deviceInformation?.alternativeNames);

// stateSelector mit verschachteltem Pfad
stateSelector={(store) => ({
  alternativeNames: store.device?.deviceInformation?.alternativeNames,
})}
isAddedSelector={(store) => !!store.device?.deviceInformation?.alternativeNames}
fieldPathPrefix="deviceInformation.alternativeNames"
```

### 6b. Form-Wrapper für Functional Profile

**Prompt:**

Erstelle einen Form-Wrapper für die Sektion "[SEKTION_NAME]" im Functional Profile-Kontext:
`src/sections/functional-profile/[sektion-name]/[sektion-name]-form.tsx`

**Pattern:**

```typescript
"use client";

import { [SektionName]Form as Shared[SektionName]Form } from "@/sections/shared/[sektion-name]/[sektion-name]-form";
import { useProfileStore } from "@/sections/functional-profile/functional-profile-store";
import { useProfileValidation } from "@/hooks/use-validation";
import { createProfileStoreAdapter } from "@/hooks/use-form-section";
import { useHasProfile, useProfileField } from "@/hooks/use-store-field";

/**
 * Functional Profile specific [SektionName] form.
 * Uses the profile store directly.
 */
export function [SektionName]Form() {
  const hasProfile = useHasProfile();
  // GRANULARER SELEKTOR: Subscribe to section for re-renders
  const sektion = useProfileField((p) => p?.[sektionName]);
  const store = useProfileStore.getState();
  const useStore = createProfileStoreAdapter(store.profile, store);
  const useValidation = useProfileValidation;

  // Force re-render when section changes
  void sektion;

  if (!hasProfile) {
    return null;
  }

  return (
    <Shared[SektionName]Form
      useStore={useStore}
      useValidation={useValidation}
      // WICHTIG: Der stateSelector extrahiert die FELDER die das Shared-Form erwartet!
      stateSelector={(store) => ({
        field1: store.profile?.[sektionName]?.field1,
        field2: store.profile?.[sektionName]?.field2,
        arrayField: store.profile?.[sektionName]?.arrayField,
      })}
      isAddedSelector={(store) => !!store.profile?.[sektionName]}
      fieldPathPrefix="[sektionName]"
      required={false}  // oder true, je nach XSD
    />
  );
}
```

**Wichtige Unterschiede zwischen Device und Profile:**
- `useDeviceStore` vs. `useProfileStore`
- `useDeviceValidation` vs. `useProfileValidation`
- `createDeviceStoreAdapter` vs. `createProfileStoreAdapter`
- `store.device` vs. `store.profile`
- `required` kann unterschiedlich sein (Device oft Pflicht, Profile oft optional)

**Integration in Parent-Form:** Der Form-Wrapper wird in der Parent-Form (z.B. `device-form.tsx`) als Komponente eingebunden:
```typescript
import { [SektionName]Form } from "./[sektion-name]/[sektion-name]-form";

export function DeviceForm() {
  return (
    <div className="space-y-4">
      <[SektionName]Form />
    </div>
  );
}
```

---

## 7. Mapper (XML → Model)

### Kontext

Der Mapper transformiert XML-Daten (geparst mit xml2js) in das TypeScript-Model. Er wird beim Laden/Importieren von XML-Dateien verwendet. Mapper sind **identisch** für shared und single Implementierungen.

### Prompt

Erstelle einen Mapper für die Sektion "[SEKTION_NAME]" im Pfad:
`src/sections/shared/[sektion-name]/[sektion-name]-mapper.ts`

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
Siehe bestehende Mapper in `src/sections/shared/`

**Integration in Parent-Mapper:** Der Mapper wird vom übergeordneten Mapper aufgerufen:
```typescript
// In parent-mapper.ts (z.B. device-mapper.ts)
import { map[SektionName] } from "@/sections/shared/[sektion-name]/[sektion-name]-mapper";

export function mapDevice(xml: Xml2JsObject): DeviceFrame {
  const result: DeviceFrame = { ... };
  
  // Optionale Sektion mappen
  const [sektionName]Xml = getFirstElement(xml, "[sektionName]");
  if ([sektionName]Xml) {
    result.[sektionName] = map[SektionName]([sektionName]Xml);
  }
  
  return result;
}
```

---

## 8. Builder (Model → XML)

### Kontext

Der Builder transformiert das TypeScript-Model zurück in ein xml2js-kompatibles XML-Objekt. Er wird beim Exportieren/Speichern verwendet und validiert die Daten vor dem Export. Builder sind **identisch** für shared und single Implementierungen.

### Prompt

Erstelle einen Builder für die Sektion "[SEKTION_NAME]" im Pfad:
`src/sections/shared/[sektion-name]/[sektion-name]-builder.ts`

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
Siehe bestehende Builder in `src/sections/shared/`

**Integration in Parent-Builder:** Der Builder wird vom übergeordneten Builder aufgerufen:
```typescript
// In parent-builder.ts (z.B. device-builder.ts)
import { build[SektionName] } from "@/sections/shared/[sektion-name]/[sektion-name]-builder";

export function buildDevice(data: DeviceFrame): Record<string, unknown> {
  const result: Record<string, unknown> = { ... };
  
  // Optionale Sektion builden
  if (data.[sektionName]) {
    result.[sektionName] = [build[SektionName](data.[sektionName])];
  }
  
  return result;
}
```

---

## 9. Store-Zugriff Patterns

### Zwei Arten des Store-Zugriffs

Es gibt zwei verschiedene Patterns für den Zugriff auf den Store:

#### 1. Reaktiver Zugriff (für State)
Verwendet Hooks, die bei Änderungen automatisch Re-Renders triggern:

```typescript
// STANDARD: Granulare Field-Selektoren - jedes Feld einzeln!
// Re-Render nur wenn sich DIESES Feld ändert
const fieldValue = useDeviceField((d) => d?.sektionName?.fieldName);
const anotherField = useDeviceField((d) => d?.sektionName?.anotherField);
const isAdded = useDeviceField((d) => !!d?.sektionName);
```

> **WICHTIG:** Granulare Selektoren sind das Standard-Pattern im Projekt!
> Für jedes Feld wird ein separater `useDeviceField()` / `useProfileField()` Aufruf verwendet.

#### 2. Synchroner Zugriff (für Actions)
Verwendet `getState()` um den Store synchron zu lesen - triggert KEINE Re-Renders:

```typescript
// Synchroner Zugriff für Actions
const store = useDeviceStore.getState();
store.updateFieldName(value);  // Action aufrufen
```

> **Wichtig:** Im Form-Wrapper wird der synchrone Zugriff für den Adapter verwendet,
> aber zusätzlich ein reaktiver Selektor für Re-Renders:
> ```typescript
> const releaseNotes = useDeviceField((d) => d?.releaseNotes);  // Für Re-Renders
> const store = useDeviceStore.getState();                      // Für Actions
> void releaseNotes;  // Force re-render when section changes
> ```

### Store-Adapter für Shared-Forms

Die Adapter kombinieren State und Actions für die Shared-Form:

```typescript
// Erstellt einen useStore-kompatiblen Hook für die Shared-Form
const useStore = createDeviceStoreAdapter(device, store);

// Der Adapter ermöglicht:
// - stateSelector: Zugriff auf store.device?.[...]
// - actionsSelector: Zugriff auf store.actionName()
```

---

## 10. Slice-Komposition

### Slices können andere Slices erweitern

Komplexe Sektionen können Sub-Slices inkludieren:

```typescript
// Interface erweitert andere Slice-Interfaces
export interface DeviceInformationSlice 
  extends AlternativeNamesSlice, 
          LegibleDescriptionSlice, 
          ProgrammerHintsSlice {
  // Eigene Actions
  updateDeviceCategory: (value: DeviceCategory) => void;
  // ...
}

// Factory erstellt und kombiniert Sub-Slices
export function createDeviceInformationSlice<TState extends { device?: DeviceFrame }>(
  set: (fn: (state: TState) => void) => void
): DeviceInformationSlice {
  // Sub-Slices erstellen
  const alternativeNamesSlice = createAlternativeNamesSliceForDevice(set);
  const legibleDescriptionSlice = createLegibleDescriptionSliceForDevice(set);
  const programmerHintsSlice = createProgrammerHintsSliceForDevice(set);

  return {
    // Sub-Slices spreaden
    ...alternativeNamesSlice,
    ...legibleDescriptionSlice,
    ...programmerHintsSlice,
    
    // Eigene Actions
    updateDeviceCategory: (value) =>
      set((state) => {
        const info = state.device?.deviceInformation;
        if (info) info.deviceCategory = value;
      }),
  };
}
```

> **Wann Slice-Komposition verwenden?**
> - Wenn eine Sektion verschachtelte Sub-Sektionen hat
> - Wenn Sub-Sektionen eigenständige Forms haben
> - Um Code-Wiederverwendung zu maximieren

**Reales Beispiel: ModbusAttributesSlice**

```typescript
// Interface erweitert ScalingFactorSlice und AccessProtectionSlice
export interface ModbusAttributesSlice extends ScalingFactorSlice, AccessProtectionSlice {
  addModbusAttributes: () => void;
  removeModbusAttributes: () => void;
  updateStepByIncrement: (stepByIncrement: number | undefined) => void;
  // ... weitere eigene Actions
}

export function createModbusAttributesSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  getModbusInterface: (state: TState) => ModbusInterfaceDescription | undefined
): ModbusAttributesSlice {
  // Nested Slices erstellen
  const scalingFactorSlice = createScalingFactorSlice(set, getModbusInterface);
  const accessProtectionSlice = createAccessProtectionSlice(set, getModbusInterface);

  return {
    // Nested Slice Actions spreaden
    ...scalingFactorSlice,
    ...accessProtectionSlice,
    
    // Eigene Actions
    addModbusAttributes: () => set((state) => { /* ... */ }),
    // ...
  };
}
```

---

## 11. Fortgeschrittene Slice-Patterns

### Pattern D: Container-basierter Slice

Für Pflicht-Sektionen die immer existieren müssen (keine `add/remove` Actions):

```typescript
export interface FunctionalProfileContainer {
  functionalProfileIdentification: FunctionalProfileIdentification;
}

export interface FunctionalProfileIdentificationSlice {
  // NUR Field-Updates, kein add/remove!
  updateSpecificationOwnerIdentification: (value: SpecificationOwnerIdentification) => void;
  updateFunctionalProfileCategory: (value: FunctionalProfileCategory) => void;
  // ...
}

export function createFunctionalProfileIdentificationSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  // Getter gibt Container zurück, nicht die Sektion direkt
  getFunctionalProfile: (state: TState) => FunctionalProfileContainer | undefined
): FunctionalProfileIdentificationSlice {
  return {
    updateSpecificationOwnerIdentification: (value) =>
      set((state) => {
        const fp = getFunctionalProfile(state);
        // Direkter Zugriff auf verschachtelte Felder
        if (fp) {
          fp.functionalProfileIdentification.specificationOwnerIdentification = value;
        }
      }),
    // ...
  };
}
```

> **Wann Pattern D verwenden?**
> - Sektion ist ein Pflichtfeld und existiert immer
> - Keine Möglichkeit die Sektion zu entfernen
> - Nur Field-Updates notwendig

### Pattern E: Index-basierter Slice

Für Sektionen die an mehreren Stellen vorkommen können:

```typescript
export function createDynamicParameterListSlice<TState>(
  set: (fn: (state: TState) => void) => void,
  // Getter/Setter haben zusätzlichen listIndex Parameter
  getParameterList: (state: TState, listIndex: number) => DynamicParameterDescriptionList | undefined,
  setParameterList: (state: TState, listIndex: number, value: DynamicParameterDescriptionList | undefined) => void
): DynamicParameterListSlice {
  return {
    addParameterList: (listIndex) =>
      set((state) => {
        setParameterList(state, listIndex, {});
      }),
    
    removeParameterList: (listIndex) =>
      set((state) => {
        setParameterList(state, listIndex, undefined);
      }),
    
    // Alle weiteren Actions haben ebenfalls listIndex Parameter
    addParameterListElement: (listIndex) =>
      set((state) => {
        const paramList = getParameterList(state, listIndex);
        // ...
      }),
  };
}
```

> **Wann Pattern E verwenden?**
> - Gleiche Sektion kommt mehrfach vor (z.B. auf FP-Ebene UND DataPoint-Ebene)
> - Index-Parameter ermöglicht Wiederverwendung des gleichen Slices

---

## 12. Verschachtelte Forms (Form-Komposition)

### Kontext

Komplexe Shared-Forms können andere Shared-Forms als Kinder einbetten. Dies ermöglicht:
- Wiederverwendung von UI-Komponenten
- Konsistente Darstellung verschachtelter Sektionen
- Korrekte Validierungspfade durch `fieldPathPrefix`

### Pattern

```typescript
"use client";

import { SubSektionForm } from "@/sections/shared/sub-sektion/sub-sektion-form";

export function [SektionName]Form<TStoreState, TActions extends [SektionName]Slice>({
  useStore,
  useValidation,
  stateSelector,
  // ...
}: [SektionName]FormProps<TStoreState, TActions>) {
  const { state, actions, getError } = useFormSection({
    useStore,
    useValidation,
    stateSelector,
    // ...
  });

  return (
    <FormSection title="...">
      {/* Eigene Felder */}
      <Input ... />

      {/* Verschachtelte Shared-Form einbetten */}
      <SubSektionForm
        useStore={useStore}
        useValidation={useValidation}
        stateSelector={() => ({
          // Felder für die Sub-Form
          field1: state.subSektion?.field1,
          field2: state.subSektion?.field2,
        })}
        isAddedSelector={() => !!state.subSektion}
        fieldPathPrefix={`${fieldPathPrefix}.subSektion`}  // WICHTIG: Pfad erweitern!
        required={false}
        nested={true}  // Für visuelle Hierarchie
      />
    </FormSection>
  );
}
```

### Wichtige Props für verschachtelte Forms

| Prop | Beschreibung |
|------|-------------|
| `nested={true}` | Visuelle Hierarchie (weniger Padding, kleinere Titel) |
| `fieldPathPrefix` | Muss den vollständigen Pfad bis zur Sub-Sektion enthalten |
| `stateSelector` | Extrahiert die Felder der Sub-Sektion aus dem übergeordneten State |

### Reales Beispiel: DataPointBaseForm

```typescript
// In data-point-base-form.tsx
<AlternativeNamesForm
  useStore={useStore}
  useValidation={useValidation}
  stateSelector={() => ({
    alternativeNames: dataPoint.alternativeNames,
  })}
  isAddedSelector={() => !!dataPoint.alternativeNames}
  fieldPathPrefix={`${fieldPathPrefix}.dataPoint.alternativeNames`}
  required={false}
  nested={true}
/>

<LegibleDescriptionForm
  useStore={useStore}
  useValidation={useValidation}
  stateSelector={() => ({
    legibleDescriptions: dataPoint.legibleDescription,
  })}
  isAddedSelector={() => !!dataPoint.legibleDescription}
  fieldPathPrefix={`${fieldPathPrefix}.dataPoint.legibleDescription`}
  required={false}
  nested={true}
  maxItems={4}
/>
```

---

## Anhang A: Pattern-Übersicht

### Slice-Patterns (Basis)

| Pattern | Struktur | Beispiele | Wann verwenden |
|---------|----------|-----------|----------------|
| **Pattern A** | Objekt mit Array | `release-notes`, `generic-attribute-list-product`, `messaging-value-mapping` | Sektion ist ein Objekt mit Array-Feld (z.B. `changeLog[]`) |
| **Pattern B** | Array direkt | `legible-description` | Sektion ist selbst ein Array (z.B. `LegibleDescription[]`) |
| **Pattern C** | Einfaches Objekt | `alternative-names`, `modbus-attributes`, `access-protection`, `scaling-factor` | Sektion ist ein Objekt ohne Arrays, mit Auto-Create/Cleanup |

### Slice-Patterns (Fortgeschritten)

| Pattern | Struktur | Beispiele | Wann verwenden |
|---------|----------|-----------|----------------|
| **Pattern D** | Container-basiert | `profile-identification`, `data-point-base`, `functional-profile-base` | Slice arbeitet auf einem Container-Objekt und hat KEIN `add/remove` - die Sektion existiert immer |
| **Pattern E** | Index-basiert | `dynamic-parameter-list` | Mehrere Instanzen der gleichen Struktur (mit `listIndex` Parameter) |

> **Hinweis zu fortgeschrittenen Patterns:**
> - **Pattern D** wird für Pflicht-Sektionen verwendet, die immer existieren müssen (keine `add/remove` Actions)
> - **Pattern E** wird für Sektionen verwendet, die an mehreren Stellen im gleichen Objekt vorkommen

### Form-Patterns

| Pattern | Beschreibung | Verwendung |
|---------|--------------|------------|
| **Standalone** | Form mit eigenem FormSection | Top-Level Sektionen (release-notes, device-information) |
| **Nested** | Form mit `nested={true}` | Sub-Sektionen innerhalb größerer Forms |
| **Composed** | Form bettet andere Shared-Forms ein | Komplexe Sektionen (data-point-base, modbus-attributes, rest-api-service-call) |

### Wrapper-Patterns

| Pattern | Kontext | isOptional | Setter-Check |
|---------|---------|------------|--------------|
| **Required** | Device (z.B. `releaseNotes`) | `false` | `&& value` erlaubt |
| **Optional** | Profile, Device-Subsections | `true` | KEIN `&& value`! |
| **Nested** | Beide | variiert | Verschachtelter Pfad (z.B. `deviceInformation.alternativeNames`) |

> **Wichtig:** Die meisten Device-Wrapper verwenden auch `isOptional=true` für Sub-Sektionen!
> Nur Top-Level Pflicht-Sektionen (wie `releaseNotes` auf Device-Ebene) verwenden `isOptional=false`.

---

## Anhang B: Utility-Funktionen Übersicht

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
