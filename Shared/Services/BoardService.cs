using ADArCWebApp.Shared.Interop;

namespace ADArCWebApp.Shared;

using Microsoft.JSInterop;

public enum Board
{
    ArduinoUno,
    ArduinoMega,
    None,
}

public class BoardService(IJSRuntime js)
{
    private readonly IJSRuntime _js = js;
    private Board _board = Board.None;

    // Constructor to inject IJSRuntime

    public Board Board
    {
        get => _board;
        set
        {
            if (value != _board)
            {
                AppInterop.SetBoard(value);
            }

            _board = value;
        }
    }

    public string GetJson()
    {
        return _board switch
        {
            Board.ArduinoUno =>
                "{\"LocalId\":1,\"Code\":\"\\n\\nchar outputPins[] = {};\\n\\n\\n\\n\\nvoid setup() {\\n  Serial.begin(9600);\\n  for (int i = 0; i \u003C 0; i\u002B\u002B) {\\n    pinMode(outputPins[i], OUTPUT);\\n  }\\n}\\n\\n\\nvoid loop() {\\n}\\n\",\"Comps\":{\"1\":{\"GlobalId\":1,\"X\":829,\"Y\":219,\"zoomedX\":829,\"zoomedY\":219,\"midSignal\":0,\"counter\":0,\"Wbuffer\":0,\"RegAddr\":0,\"byteIndex\":0,\"timer\":0,\"CompParams\":{}}}}",
            Board.ArduinoMega =>
                "{\"LocalId\":1,\"Code\":\"\\n\\nchar outputPins[] = {};\\n\\n\\n\\n\\nvoid setup() {\\n  Serial.begin(9600);\\n  for (int i = 0; i \u003C 0; i\u002B\u002B) {\\n    pinMode(outputPins[i], OUTPUT);\\n  }\\n}\\n\\n\\nvoid loop() {\\n}\\n\",\"Comps\":{\"1\":{\"GlobalId\":2,\"x\":829,\"Y\":219,\"zoomedX\":829,\"zoomedY\":219,\"midSignal\":0,\"counter\":0,\"Wbuffer\":0,\"RegAddr\":0,\"byteIndex\":0,\"timer\":0,\"CompParams\":{}}}}",
            _ => ""
        };
    }

    public ComponentInstance GetComponentInstance()
    {
        return _board switch
        {
            Board.ArduinoUno => new ComponentInstance(1, null, 829, 219),
            Board.ArduinoMega => new ComponentInstance(2, null, 829, 219),
            _ => null
        };
    }
}