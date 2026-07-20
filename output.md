# ADArC WebApp — Comprehensive Architectural & Maintainability Review

## Executive Summary

ADArC is a Blazor WebAssembly application that lets users visually design Arduino circuits, auto-generates Arduino C code, and simulates the circuit using an in-browser AVR CPU emulator. The domain is technically sophisticated, but years of iterative student-team development have produced a codebase with pervasive tight coupling, static global state standing in for proper dependency injection, a 1,758-line God Component as the application hub, and zero automated tests. The architecture is functional but increasingly brittle: adding the 42nd component type, fixing a simulation bug, or onboarding a new developer all require understanding an undocumented, interconnected whole.

---

## 1. Architecture Problems

---

### 1.1 — Static Global State Used as a Cross-Cutting Bus

**Severity: Critical | Effort: High | Files: `AvrCPU.cs`, `BuildCode.cs`, `AppInterop.cs`**

All three of these classes are `static` and directly reach into `Pages.Index.*` at the call site:

```csharp
// AvrCPU.cs:41
Pages.Index.App!.TriggerRender();

// BuildCode.cs:24
foreach (ComponentInstance c in Pages.Index.Comps.Values)

// AppInterop.cs:20-25
Pages.Index.CurrentWidthRatio = r;
Pages.Index.CodePane!.UpdateConsoleOutput(text, true);
```

This creates an invisible, compile-time-unchecked dependency from the simulation and interop layers back to the top-level UI page. Any refactoring of `Pages.Index` silently breaks simulation. `Pages.Index` cannot be tested, mocked, or reused in isolation, and neither can any of these static classes.

**Why it's a problem:** Dependency inversion is completely absent. The simulation layer "knows about" the page it's embedded in, which inverts the correct layering (UI → domain, not domain → UI). The `!` null-forgiveness operators also hide potential `NullReferenceException` crashes at runtime.

**Refactoring approach:**
- Move shared mutable state (`Comps`, `CodePane`, render triggers) into injectable services or event-based abstractions.
- Replace `Pages.Index.Comps` access in `BuildCode` with a `ICircuitStateProvider` interface injected via DI.
- Replace the `TriggerRender` call in `AvrCPU` with a domain event (`SimulationStateChanged`) that the UI subscribes to.
- Replace static fields in `AppInterop` with instance methods injected into relevant services.

**Expected benefits:** Each layer becomes independently testable; the page can be refactored without touching simulation logic; null-safety is restored.

---

### 1.2 — `RuleSetMap` Implements Its Own Singleton Instead of Using DI

**Severity: High | Effort: Low | File: `RuleSetMap.cs`**

```csharp
// Manual lock-based singleton
public static RuleSetMap GetInstance() {
    lock (Padlock) { return _instance ??= new RuleSetMap(); }
}
```

The project already has a DI container (`Program.cs`), which is the correct mechanism for lifetime management in Blazor WebAssembly. A hand-rolled singleton alongside `builder.Services.AddSingleton<GraphSynthInvoke>()` is an inconsistency that confuses readers and prevents constructor-based injection.

Additionally, `numLoaded` is an instance field that is reset to `0` inside `LoadRuleSet` on each call (line 64), but then incremented concurrently in parallel `Task` lambdas via `Interlocked.Increment`. If `LoadRuleSet` is called twice (e.g., for "ADD" then "CONNECT"), the second call resets the counter while the first call's tasks may still be running — a data race.

**Refactoring approach:** Register `RuleSetMap` with `builder.Services.AddSingleton<RuleSetMap>()`. Inject it into components and services normally. Fix the `numLoaded` race by making it a local `int` passed by reference into the loading tasks, not a shared field.

---

### 1.3 — `[Inject]` Attribute on a Non-Component Class

**Severity: Medium | Effort: Low | File: `GraphSynthInvoke.cs:22`**

```csharp
[Inject] private ToastService? ToastService { get; set; }
```

`[Inject]` only works on Razor components and pages where the Blazor runtime performs property injection. On a plain C# class registered as a DI service, this attribute is silently ignored — `ToastService` will always be `null`. Presumably whoever wrote this expected it to work like constructor injection. If `ToastService` is ever used in `GraphSynthInvoke`, it will crash.

**Refactoring approach:** Add `ToastService` as a constructor parameter: `public GraphSynthInvoke(ToastService toastService)`.

---

### 1.4 — `GraphSynthInvoke.RecgApply` Contains Hard-Coded Component Name Normalizations

**Severity: High | Effort: Medium | File: `GraphSynthInvoke.cs:66-90`**

```csharp
if (Inputs[j].Contains("servo") && Inputs[j].Contains("direct"))
    Inputs[j] = "servo";
else if (Inputs[j].Contains("pca9685"))
    Inputs[j] = "pca9685";
else if (Inputs[j].Contains("l298n"))
    Inputs[j] = "l298n";
// ... etc
```

This is a data problem masquerading as code. The graph rule engine requires specific node name formats, but component names don't always match. Rather than normalizing data at the source (in the component definition), a long if-else chain is bolted onto the connection logic. Adding a new motor driver requires editing `GraphSynthInvoke.RecgApply`.

**Refactoring approach:** Add a `gsNodeName` field to `ComponentData` (already partly done: `nodeName` exists), and have components declare their own canonical graph-synth identifier. The normalization code in `RecgApply` is then just a lookup into that field.

---

## 2. Design Problems

---

### 2.1 — `Pages/Index.razor` Is a God Component (1,758 Lines)

**Severity: Critical | Effort: High | File: `Pages/Index.razor`**

`Index.razor` is simultaneously:
- The application shell and layout
- The undo/redo engine and history stack
- Import/export handling (file + URL + compression)
- Pin binding orchestration (`UpdatePinBindings`)
- Component placement and deletion logic
- Board selection and initialization
- Keyboard shortcut handling
- Mobile detection
- Tutorial/intro.js integration
- Loading progress state
- Canvas coordinate management

It exposes a large suite of `public static` fields (`Comps`, `App`, `BuildCanvas`, `CodePane`, `CurrentWidthRatio`, etc.) that are used as a global state bus by `AppInterop`, `AvrCPU`, and `BuildCode`. The comment at line 898 — `// 1 is the arduino, not sure what -2 or -1 is` — shows that even the authors have lost track of what magic sentinel values mean.

**Why it's a problem:** Any new feature touches this file. A bug in import/export risks breaking undo/redo. A student adding their first component has no chance of understanding where to start without reading ~1,700 lines.

**Refactoring approach:** Extract into focused components/services:
- `UndoRedoService` — history stack, `ExecuteAction`/`Undo`/`Redo`
- `CircuitStateService` — owns `Comps`, `LocalId`, all circuit mutations
- `ImportExportService` — file/URL serialization, compression dictionary
- `PinBindingService` — `UpdatePinBindings`, `GetPins`
- `ToolbarComponent` — import/export/URL buttons
- `CanvasComponent` — coordinate management, drop target

---

### 2.2 — `ComponentDeclarations.cs` Is a 1,000+ Line Monolithic Static Dictionary

**Severity: High | Effort: Medium | File: `Shared/ComponentNamespace.cs`**

All 41 component definitions live in a single file as a `static readonly Dictionary<int, ComponentData>`. Each entry embeds multi-line Arduino C code as escaped string literals:

```csharp
{ "setup", "   \n  // Begin communication with ADXL at I2C address 0x@\n  // Change this address to your ADXL's real address!\n  if(!accel@.begin(0x@)) {\n    /* There was a problem detecting the ADXL345 ... check your connections */\n ..." }
```

This means:
1. Adding a new component requires editing this file, which also touches every other component definition in the same file — creating unnecessary merge conflicts in multi-person teams.
2. The code templates are unreadable. Debugging a malformed template requires manual unescaping.
3. There is no validation that a template is well-formed Arduino C before it reaches the user.

**Refactoring approach:** Move each component's code templates to external `.ino` or `.c` template files stored in `wwwroot/templates/` (alongside the existing rule files). Load them at runtime the same way rule files are loaded. Each component's C# definition file then becomes a few lines. Alternatively, use a per-component partial class or partial file structure so the dictionary is split across many files.

---

### 2.3 — `ComponentData` / `ComponentDataBuilder` Are Redundant Parallel Classes

**Severity: Medium | Effort: Low | File: `Shared/ComponentData.cs`**

The `ComponentDataBuilder` class has every field that `ComponentData` has, plus a constructor that assigns them all through to `ComponentData`. This is Builder pattern misapplied — the builder exists only for a fluent `.Property()` chain that could be achieved with a collection initializer or a simple factory method. The TODO at line 9 confirms the authors themselves questioned this class.

Additionally, the builder constructor (line 74) has 14 parameters with no named-argument enforcement, and uses reflection to extract `pinInfo` from a component type at construction time (lines 100-111), using a bare `catch {}` that swallows all exceptions and prints to the console.

**Refactoring approach:** Merge the two classes. Use C# 12 collection expressions and object initializers directly. Replace the reflection-based `pinInfo` extraction with a static property on each component's Razor class.

---

### 2.4 — `ComponentInstance.AddConnection` Reaches Into `Pages.Index.BuildCanvas`

**Severity: High | Effort: Medium | File: `Shared/ComponentInstance.cs:161`**

```csharp
Pages.Index.BuildCanvas!.ConnLines.Add(toAdd);
```

A domain model class (`ComponentInstance`) is directly mutating a UI component's collection. This couples a data object to the view layer, making `ComponentInstance` untestable in isolation and making the rendering behavior implicit.

**Refactoring approach:** `AddConnection` should return the `InstanceConnection` it created and let the caller add it to the canvas. Or, raise a domain event that the canvas subscribes to.

---

### 2.5 — `SetValue<T1>` in `IComponentParameter` Has a Logic Bug

**Severity: High | Effort: Low | File: `IComponentParameter.cs:38-49`**

```csharp
if (typeof(T1) is T)           // BUG: `is` here tests if the Type object is an instance of T
{                              // which is always false unless T is `Type`
    Value = (T)Convert.ChangeType(obj, typeof(T));
}
else if (typeof(T1) == typeof(T)) {   // this branch is the correct one
    Value = (T)(object)obj;
}
else
{
    throw new InvalidCastException();
}
```

`typeof(T1) is T` uses the runtime `is` operator on a `Type` object — it checks whether the `Type` instance is of type `T`, not whether `T1` and `T` are related. This is almost certainly intended to be `typeof(T1) == typeof(T)`, making the first branch dead code. The second branch handles the only real case. This means any call through the first branch silently misbehaves.

**Refactoring approach:** Remove the first `if` branch entirely. Consider adding a test.

---

### 2.6 — `BoardService.GetJson()` Contains Hardcoded Raw JSON Strings

**Severity: Medium | Effort: Low | File: `Shared/Services/BoardService.cs:39-44`**

```csharp
Board.ArduinoUno =>
    "{\"LocalId\":1,\"Code\":\"\\n\\nchar outputPins[] = {}; ...",
```

Raw escaped JSON strings are used to represent the initial board state. Note the Mega entry on line 42 has `\"x\":829` (lowercase) while elsewhere the property is `\"X\":829` (uppercase), indicating this was hand-edited and has a capitalization inconsistency that could cause silent deserialization failures.

**Refactoring approach:** Replace with a proper object construction — `JsonSerializer.Serialize(new AppState { ... })`. The initial state should be code, not a string.

---

## 3. Maintainability Issues

---

### 3.1 — URL Compression Is a Fragile Hand-Rolled Algorithm

**Severity: High | Effort: Medium | File: `Pages/Index.razor`, the `compressionMap` dictionary at line ~1590**

The codebase contains a ~165-entry find-and-replace dictionary that substitutes JSON keys, code patterns, keywords, and even comments with short tokens (`#11`, `@inc2`, `@lbl1`, etc.) to make circuit state fit in a URL. This is a custom compression algorithm, not based on any standard.

Problems:
1. The mapping is order-sensitive — renaming a JSON property requires updating this dictionary.
2. There is no versioning. Old URLs using the old mapping will silently produce wrong output after any token change.
3. It compresses comments in Arduino code by exact string match, meaning any comment variation breaks compression consistency.
4. The dictionary conflates logically different concerns: JSON field names, C code patterns, control flow keywords.

**Refactoring approach:** Use standard compression (e.g., `DeflateStream` or `BrotliStream`, both available in WASM) over the base-64 encoded JSON. This gives better compression ratios, is order-independent, and is self-describing. URL parameter size limits are the only constraint.

---

### 3.2 — `async void` Throughout `AppInterop` Swallows All Exceptions

**Severity: High | Effort: Low | File: `Shared/Interop/AppInterop.cs`**

```csharp
public static async void StartSimWrapper() {
    await JsModule!.InvokeVoidAsync("startCodeLoop");
}
public static async void StopWrapper() { ... }
public static async void RegisterResponseRequired(int absoluteIndex) { ... }
```

Twelve `async void` methods in `AppInterop` fire JS interop calls without any error handling. In .NET, exceptions thrown inside `async void` methods crash the process (in desktop) or silently disappear into the void (in WASM). If JS interop fails — for example, because the JS module hasn't loaded — the caller gets no indication and the application enters an inconsistent state.

**Refactoring approach:** Change `async void` to `async Task` and `await` all calls from the callers. Where fire-and-forget is genuinely desired, add a `.ContinueWith(t => LogError(t.Exception), TaskContinuationOptions.OnlyOnFaulted)`.

---

### 3.3 — `RuleSetMap` Creates Raw `HttpClient` Instances Directly

**Severity: Medium | Effort: Low | File: `RuleSetMap.cs:51`**

```csharp
HttpClient client = new HttpClient();
client.BaseAddress = new(navigationManager.BaseUri + "rules/");
```

Creating `HttpClient` directly is discouraged because it bypasses connection pooling and certificate handling. The project already injects a properly configured `HttpClient` via DI (`builder.Services.AddScoped(sp => new HttpClient { ... })`). The one in `RuleSetMap` is redundant and diverges from the project's configured instance.

**Refactoring approach:** Inject `HttpClient` into `RuleSetMap`'s constructor.

---

### 3.4 — Magic Sentinel Values for `SelectedComponent`

**Severity: Medium | Effort: Low | File: `Pages/Index.razor:898`**

```csharp
// 1 is the arduino, not sure what -2 or -1 is
if ((e.Key is not ("Backspace" or "Delete")) || SelectedComponent == -2 || SelectedComponent == -1 || SelectedComponent == 1) return;
```

The comment is a direct admission that the author doesn't know what `-1` and `-2` mean. Magic integers encoding "no selection" and "something else" are scattered throughout the codebase.

**Refactoring approach:** Replace with a discriminated union or a nullable `int?` where `null` means "nothing selected," and replace the Arduino check with `comp.IsArduino()`.

---

### 3.5 — Dead and Commented-Out Code Throughout

**Severity: Low | Effort: Low | Multiple Files**

- `GraphSynthInvoke.cs:10-13`: Commented-out dictionary initialization
- `Program.cs:13-22`: Large commented-out caching configuration block with `// idk why the thing in js doesnt work but oh well`
- `RuleSetMap.cs:24`: `modifiedRules` set that only contains `"BIG1"` — inherited from another project, probably unused
- `RuleSetMap.cs:141`: Commented-out XML substitution lines
- `AvrCPU.cs:21`: `// TODO: review removing "action" here`
- `BuildCode.cs:112`: `//this is technically wrong (keys not necessary in order), fix later probably`

These indicate unfinished decisions and code inherited from prior projects that was never validated.

---

## 4. Data and Domain Modeling

---

### 4.1 — Component Identity Uses Dual Fragile ID Systems

**Severity: High | Effort: Medium | Files: `ComponentInstance.cs`, `GraphSynthInvoke.cs`, `ComponentDeclarations.cs`**

Components carry two different IDs:
- `GlobalId` — the type identifier (1 = Uno, 18 = LED), hardcoded as integer keys in the `ComponentDeclarations` dictionary.
- `localId` — the instance identifier assigned at placement time.

The graph synth layer uses a third system: `"localId:N"` label strings embedded in node `localLabels`. Parsing this requires `s.StartsWith("localId:").Substring(8)` (Index.razor:762) — fragile substring parsing of embedded structured data.

The `IsArduino()` method hardcodes `GlobalId is 1 or 2` — meaning the concept of "is this an Arduino board?" is spread through the codebase as a magic number check, not a data property.

**Refactoring approach:** Replace `"localId:N"` labels with a proper node property. Add `IsBoard` or `ComponentCategory` to `ComponentData` so category queries don't depend on magic IDs.

---

### 4.2 — `ComponentInstance` Carries Simulation State Fields That Belong Elsewhere

**Severity: Medium | Effort: Medium | File: `Shared/ComponentInstance.cs`**

```csharp
public int midSignal;
public int counter;
public int Wbuffer;
public int RegAddr;
public int byteIndex;
public long timer;
```

These fields have no names that are meaningful outside specific protocol implementations (I2C register address, byte index during I2C transaction, etc.). They are also serialized to JSON in the project export format, meaning users' saved files encode internal simulation micro-state. This makes the export format fragile and couples the save format to simulation implementation details.

**Refactoring approach:** Move protocol-specific state into a separate `SimulationState` class that is not serialized, or at minimum, tag these fields `[JsonIgnore]`.

---

### 4.3 — Pin Representation Is Inconsistent Between Layers

**Severity: Medium | Effort: Medium | Files: `ComponentData.cs`, `Pin.cs`, `ComponentInstance.cs`, `GraphSynthInvoke.cs`**

Pins are represented as:
- `Dictionary<string, int>` in `ComponentData.pins` (name → index)
- `ElementPin[]` in `ComponentData.pinInfo` (extracted via reflection)
- `"localId:N"` and `"d0"/"sda"/"5V"` label strings in graph nodes
- `int` absolute pin indexes in `InstanceConnection.ToId`
- `Dictionary<string, List<int>>` in `ComponentInstance.LinkController`

The same pin can be described by its name (`"sda"`), its local index within the component, or its absolute Arduino pin number — and these are converted between each other in multiple places without a single canonical conversion function.

**Refactoring approach:** Define a `PinReference` type that carries both identity representations. All conversions go through one utility method. The graph label encoding of `"d0"` should also be formalized.

---

## 5. Testing and Reliability

---

### 5.1 — Zero Automated Tests

**Severity: Critical | Effort: High**

The solution has no test project. The most complex and high-value logic — `GraphSynthInvoke.Connect`, `BuildCode.code`, `AvrCPU.updateMasking`, `ParamSerializer.Read/Write`, the compression dictionary — is entirely untested. Every student team that worked on this project had to manually verify behavior through the UI.

**High-priority test targets:**
- `BuildCode.code` property: given a known `Comps` state, assert the generated Arduino C is correct.
- `ParamSerializer`: round-trip serialization of all `IComponentParameter` subtypes.
- `GraphSynthInvoke.Connect` / `RemoveComp`: graph state after add/connect/remove cycles.
- The URL compression/decompression roundtrip.

**Effort:** A `xunit` or `bunit` (for Blazor component testing) project can be added with minimal friction. The main obstacle is the static `Pages.Index.*` dependencies — fixing issue 1.1 is a prerequisite for making most of this testable.

---

### 5.2 — `ParamSerializer` Will Crash on Unrecognized Types

**Severity: High | Effort: Low | File: `ParamSerializer.cs:35`**

```csharp
valueType = Type.GetType(reader.GetString());
```

`Type.GetType` returns `null` if the type name is unrecognized (e.g., because assembly context changed, or the `.adarc` file was authored by a different version). The code then proceeds to `JsonSerializer.Deserialize(ref reader, valueType, ...)` which throws a `NullReferenceException` with no actionable error message. Users loading a saved project get a crash with no explanation.

**Refactoring approach:** Null-check `valueType` and throw a `JsonException` with a meaningful message (`"Unknown parameter type: {typeName}. The project file may be from an older version."`).

---

### 5.3 — The `AvrCPU.setPinState` Port Register Update Logic Is Incorrect

**Severity: High | Effort: Low | File: `Shared/Simulation/AvrCPU.cs:100-131`**

```csharp
if (isOn) {
    portD &= (st << (index));  // should be ~ to clear the bit
}
else {
    portD |= (st << (index));  // st is 0 when state=false, OR-ing 0 does nothing
}
```

When `state = true` (`st = 1`) and the pin was already on (`isOn = true`), the code ANDs `portD` with `1 << index` — this clears all other bits instead of leaving the port unchanged. When `state = false` (`st = 0`) and pin was off (`isOn = false`), OR-ing with `0` is a no-op, which means the register is never updated to reflect "pin went low." The logic is inverted and the bit manipulation is wrong. The correct idiom for setting a bit is `port |= (1 << index)` and for clearing is `port &= ~(1 << index)`.

**Refactoring approach:**
```csharp
if (state)
    portD |= (1 << index);
else
    portD &= ~(1 << index);
```

---

### 5.4 — `BuildCode.loopCode` Acknowledges Its Own Bug in a Comment

**Severity: Medium | Effort: Low | File: `Shared/Simulation/BuildCode.cs:112`**

```csharp
int i = 0;
foreach (var kv in usedTimes) { //this is technically wrong (keys not necessarily in order), fix later probably
```

The delay loop index `i` is used to generate variable names (`last0`, `last1`, ...) while iterating a `Dictionary`, whose enumeration order is not guaranteed. This can produce non-deterministic code generation where delay loop variable names don't match their corresponding timing values.

**Refactoring approach:** Use an ordered structure (`SortedDictionary` or `List<(string, List<ComponentInstance>)>`) and index by position.

---

## 6. Refactoring Opportunities

---

### Quick Wins (Low Effort, Immediate Impact)

| # | Change | File | Benefit |
|---|--------|------|---------|
| Q1 | Fix `SetValue<T1>` dead branch | `IComponentParameter.cs:38` | Correctness |
| Q2 | Fix `AvrCPU.setPinState` bit logic | `AvrCPU.cs:100-131` | Simulation correctness |
| Q3 | Fix `BuildCode` dictionary ordering | `BuildCode.cs:112` | Deterministic codegen |
| Q4 | Null-check in `ParamSerializer` | `ParamSerializer.cs:35` | User-visible error quality |
| Q5 | `async void` → `async Task` in `AppInterop` | `AppInterop.cs` | Error visibility |
| Q6 | Replace hardcoded JSON in `BoardService` | `BoardService.cs:39` | Maintainability |
| Q7 | Register `RuleSetMap` via DI | `RuleSetMap.cs`, `Program.cs` | Consistency |
| Q8 | Remove dead `[Inject]` on `GraphSynthInvoke.ToastService` | `GraphSynthInvoke.cs:22` | Correctness |
| Q9 | Replace magic sentinel values with named constants or `enum` | `Index.razor:898` | Readability |

---

### Medium Effort (1–3 weeks per item)

| # | Change | Benefit |
|---|--------|---------|
| M1 | Extract `UndoRedoService` from `Index.razor` | Testable history; shrinks God Component |
| M2 | Extract `CircuitStateService` from `Index.razor` (owns `Comps`) | Removes static `Pages.Index.Comps` references from `BuildCode` and `AppInterop` |
| M3 | Replace `RuleSetMap` singleton with standard DI lifetime | Consistent patterns; injectable; no thread-safety concerns |
| M4 | Merge `ComponentData` / `ComponentDataBuilder`; remove reflection pinInfo extraction | Simpler model; safer initialization |
| M5 | Move simulation state fields (`midSignal`, `counter`, `Wbuffer`, etc.) off `ComponentInstance` | Clean export format; single-responsibility |
| M6 | Replace URL compression dictionary with standard `BrotliEncoder` | More robust; no version-sensitivity |

---

### Large Refactors (Recommended for Future Cohorts)

| # | Change | Benefit |
|---|--------|---------|
| L1 | Move code generation templates to external files (`.c.template`) | Readable templates; enables validation; removes the biggest maintenance bottleneck in `ComponentDeclarations.cs` |
| L2 | Break `Pages/Index.razor` into 5–6 focused components and services | Eliminates God Component; enables per-feature testing |
| L3 | Define a `PinReference` type to unify pin representation across graph, model, and JS layers | Eliminates the multi-conversion fragility; single source of truth for pin identity |
| L4 | Add a test project (`ADArCWebApp.Tests`) with xUnit + bUnit | Gates future regressions; enables safe refactoring |
| L5 | Replace `Pages.Index.*` static access with proper DI | Prerequisites for all other testability improvements |

---

## Summary Prioritization

| Priority | Issue | Reason |
|----------|-------|--------|
| 1 | `AvrCPU.setPinState` bit logic bug (5.3) | Silent simulation incorrectness |
| 2 | `SetValue<T1>` dead branch (2.5) | Silent type coercion failure |
| 3 | `async void` swallows errors (3.2) | Silent failures in JS interop |
| 4 | `ParamSerializer` null crash (5.2) | Users get unexplained crashes loading projects |
| 5 | Static `Pages.Index.*` coupling (1.1) | Blocks all testing; most other issues trace back here |
| 6 | God Component `Index.razor` (2.1) | Highest long-term development friction |
| 7 | `ComponentDeclarations.cs` monolith (2.2) | Biggest barrier to adding new components |
| 8 | Zero tests (5.1) | Everything else depends on this being fixed eventually |

The highest-leverage path for the next cohort is: fix the three correctness bugs (Q1, Q2, Q3), then tackle the static-state decoupling (1.1 / L5), which is the prerequisite that unlocks every testing and refactoring effort that follows.
