# ADArCWebApp

Navigate to /ADArCWebApp/ for the webapp

Quick Guide: Adding Breadboard Support for a New Component

Ensure Accurate [ComponentPin] Coordinates:

* Every electrical pin on the component's .razor file must have [ComponentPin(name, label, x, y, number: ...)] in the component's unscaled SVG coordinate space (matching the <svg viewBox="..."> / rendered width & height).
* Pin coordinates along the header strip should reflect the physical header spacing (uniform spacing or integer multiples of the pitch for intentional gaps).

Add @attribute [BreadboardMount(...)] to the .razor File: Defined in ComponentData.cs:

csharp
[BreadboardMount(
    char col = 'f',                 // Target breadboard column ('a'..'j'); usually 'j' for single-row edge headers
    int extraRotation = 0,          // Extra 90° CW steps (0..3) so the pin strip aligns vertically along the column
    bool allowOppositeStrip = true, // Allow routing to opposite strip/rails when needed
    double maxScale = 2.8,          // Max scale cap (raise slightly if the SVG viewBox is oversized relative to artwork)
    double svgWidth = 0,            // Optional explicit SVG width override (0 = auto-measured)
    double svgHeight = 0,           // Optional explicit SVG height override (0 = auto-measured)
    char col2 = '\0'                // Optional 2nd column (e.g. col: 'd', col2: 'g') for trough-straddling dual-row boards
)]


* Standard single-row breakout (pins along bottom/top edge in SVG): @attribute [BreadboardMount('j')] (add extraRotation: 1 / 2 / 3 if the header needs rotation to run vertically along column 'j').
* Dual-row trough-straddling module (two parallel header rows on opposite edges): @attribute [BreadboardMount('d', col2: 'g', allowOppositeStrip: false)].

Verify Power/Ground Pin Naming:

ComponentData.ClassifyPin classifies power (VCC, VIN, 5V, 3V3, 3VO, etc.) and ground (GND, VSS, GROUND, COM, etc.) pins so they route cleanly to the +/− power rails.

Check & Test:

Build (dotnet build) and drag the component onto the workbench with the breadboard enabled.
Verify pin-to-hole alignment at 0°, CW, CCW, and with breadboard toggled off.
Run a simulation (▶️ Run) to confirm generated code and controller behavior match off-board behavior.
