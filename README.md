# ADArCWebApp

The ADArCWebApp is an automated circuit designer and code generator for 
arduino based systems. The user is able to select circuit components and
see how they would be wired and programmed.


# Hosting
Open this repository in rider, make sure you have dotnet installed
somewhere rider can find. Rider should be able to run the app and host
to http://localhost:7088

# Adding Components

First you will need to create add and connect graphsynth rules for your
component, you will be able to download and run graphsynth from https://designengrlab.github.io/GraphSynth/
Download the repository and compile and run it with your code IDE, 

To create a rule in graphsynth, use the toolbar option File -> New -> Graphsynth Rule, in the next options box 
make a white graph with gridlines for standardization purposes, this will open a empty graph with a left and right hand side with a center side in the middle.

In the following steps interact with the middle window only unless stated otherwise, as interacting with the middle window extends its edits to the left and right


## Add rule
First lets make the add rule! When the ADArC Web App is adding your component to the graph it attempts to add
user_"Component_name_here!!!", add a point to the graph (using the main graphsynth window) and name it user_"component name"
add another point simply named after your component, then add 1 point for each pin on your component!
Remember to name each node!

Remember that the component name is not the display name, the display name may be changed later.

using the main graphsynth window, connect the points together,
the user node must connect to the component node
the component node must connect to each individual pin nodes.

Your add rule is complete save it as add_"COMPONENT_NAME".grxml!

## Connect rule
To make the connect rule make another empty graph and use 1 large node with your component name and 1 large node with ArduinoUnoRev3,
add your pin nodes and connect them to your component node, open the add_arduinoUnoRev3 rule from this repository and find the pins you want to connect to,
the pins have labels such as "digital" "gnd" "analogue" etc, for each pin in your component make a node representing the type of arduino pin it needs to be connected to.

ensure that the arduino pins are connected to the arduino,
ensure that the component pins are connected to the component,
ensure that the component pins and arduino pins are connected 1 to 1 based on how they are ment to be layed out.
ensure that the connections between pins have the "connection" label (use main graphsynth window to edit)
ensure that the arduino pins that you do not wish other components to use (not power, typically not I2C and other data protocols either) have "connected" in their left-window negate window

give the connections between pins one of the following labels depending on the color you wish to use:

Use "BK" for black (use for gnd)
Use "RD" for red (use for power rail)
Use "LB" for lightblue
Use "DB" for darkblue
Use "GN" for lime
Use "VT" for violet
Use "OG" for orange
Use "YE" for yellow 

save the connect rule as "Component name"_arduino.grxml

Add both rule files to this repository in wwwroot/rules/
Open ADD.rsxml in wwwroot/rules/ and add a string entry with the name of your add rule.
Open CONNECT.rsxml in wwwroot/rules and add a string entry with the name of your connect rule.

At this point you are now done with graphsynth, there is some linkage files that need to be made before implimenation is finished

## Razor file

Make a file named "Component name".razor in the /Shared/Components,

Razor files contain HTML code that renders on the screen along with C# code that manipulates it, 
Find a SVG of your component (or draw one with a tool like InkScape) and paste the CONTENTS OF THE FILE, into the razor file, (open the .svg with a text editor)
at the beginning of the razor file add "@inherits RazorComponent" then below that add @code {}

@code will do two things: define where the pins are connected on the svg and define the parameters that the component deals with.

This is an example of a valid pin array (these belong in @code{}):

```
public static ElementPin[] pinInfo
{
    get
    {
        return new ElementPin[]
        {
            new ElementPin(name: "R", x: 34, y: 69, number: 1, signals: new PinSignalInfo[] { }),
            new ElementPin(name: "G", x: 52, y: 69, number: 3, signals: new PinSignalInfo[] { }),
            new ElementPin(name: "B", x: 62, y: 69, number: 3, signals: new PinSignalInfo[] { }),
            new ElementPin(name: "COM", x: 43, y: 79, number: 2, signals: new PinSignalInfo[] { }),
        };
    }
}
```

change the name of the pins and  the x and y coordinates to fit your component the x and y values are the distance from the pin
to the top left of the svg and can be fine tuned later. signals does not matter here let it be an empty array.

the second thing that needs to be added is parameters, such as if a led is on or off, the temperature of a thermonity, etc.
If your component is an output, [ADD OUTPUT SECIFIC DETAILS]

```angular2html
[Parameter]
[DropdownSetting(["Released", "Pushed"])]
public string pushed
{
    get;
    set;
}

[Parameter]
[ValueSetting("°C", 22, 0, 50)]
public double temperature { get; set; }

[Parameter]
[ValueSetting("%", 50, 20, 90)]
public double humidity { get; set; }
```
Above are some parameter examples, have 1 for each parameter your component reads or writes in the @code{}

Next up you must install the razor file into the component repository, open the /Shared/ComponentNamespace.cs
DO NOT REARRANGE THE CONTENTS OF THIS FILE! SOME CRITICAL COMPONENTS (the arduinos and all other 'system' components) ARE REFERED TO BY INDEX!!!!


You will need to have example code for your component for the next step!
Go to the bottom of this array delcaration and add your component by adding an entry like this:


```angular2html
 {
    ## // next interger in order
        new ComponentDataBuilder("COMPONENT DISPLAY NAME", true, "CATAGORY OF Component (refer to component placer) ex: "Input/Light Sensors"", 1, 75, 75, typeof(Razor"Componentname!"), paneHoverText:"Thermistor",
            codeForGen: new()
            {
                {  
                    "include", "library decarations"
                },
                { 
                    "global", "global declarations" 
                },
                {
                    "setup", "code that runs in setup"
                },
                {
                    "loopMain","code that runs in the loop (cannot delay)"
                },
                { 
                    "functions", "functions in your code" 
                },
                {
                    "delayLoop", "[UNKNOWN BY ANDREW RICE]" 
                },
                {
                    "delayTime", "[UNKNOWN BY ANDREW RICE]" 
                }
            },
            pins: ["vcc", "gnd", "sig"],//replace with component pins
            gsNodeName: "thermistor"
        ).Property("temperature", 70.0) // replace with properies
    .Finish()
}
```

[CONTROLLER NEEDS EXPLAINATION]
[]