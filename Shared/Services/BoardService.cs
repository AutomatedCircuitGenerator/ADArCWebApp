using ADArCWebApp.Shared.Interop;

namespace ADArCWebApp.Shared;

using Microsoft.JSInterop;

public enum Board
{
    ArduinoUno,
    ArduinoMega,
    None,
}

public class BoardService
{
    private readonly IJSRuntime _js;
    private Board _board = Board.None;

    // Constructor to inject IJSRuntime
    public BoardService(IJSRuntime js)
    {
        _js = js;
    }

    public Board Board
    {
        get => _board;
        set
        {
            if (value != _board)
            {
                AppInterop.setBoard(value);
            }

            _board = value;
        }
    }

    public string GetJson()
    {
        switch (_board)
        {
            case Board.ArduinoUno:
                return
                    "{\"LocalId\":1,\"Code\":\"\\n\\nchar outputPins[] = {};\\n\\n\\n\\n\\nvoid setup() {\\n  Serial.begin(9600);\\n  for (int i = 0; i \u003C 0; i\u002B\u002B) {\\n    pinMode(outputPins[i], OUTPUT);\\n  }\\n}\\n\\n\\nvoid loop() {\\n}\\n\",\"Comps\":{\"1\":{\"globalId\":1,\"x\":829,\"y\":219,\"zoomedX\":829,\"zoomedY\":219,\"midSignal\":0,\"counter\":0,\"Wbuffer\":0,\"RegAddr\":0,\"byteIndex\":0,\"timer\":0,\"compParams\":{}}}}";
            case Board.ArduinoMega:
                return
                    "{\"LocalId\":1,\"Code\":\"\\n\\nchar outputPins[] = {};\\n\\n\\n\\n\\nvoid setup() {\\n  Serial.begin(9600);\\n  for (int i = 0; i \u003C 0; i\u002B\u002B) {\\n    pinMode(outputPins[i], OUTPUT);\\n  }\\n}\\n\\n\\nvoid loop() {\\n}\\n\",\"Comps\":{\"1\":{\"globalId\":2,\"x\":829,\"y\":219,\"zoomedX\":829,\"zoomedY\":219,\"midSignal\":0,\"counter\":0,\"Wbuffer\":0,\"RegAddr\":0,\"byteIndex\":0,\"timer\":0,\"compParams\":{}}}}";
            default:
                return "";
        }
    }

    public ComponentInstance GetComponentInstance()
    {
        switch (_board)
        {
            case Board.ArduinoUno:
                return new ComponentInstance(1, null, 829, 219);
            case Board.ArduinoMega:
                return new ComponentInstance(2, null, 829, 219);
            default:
                return null;
        }
    }
}