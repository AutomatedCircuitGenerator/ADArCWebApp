using ADArCWebApp.Shared.Interop;

namespace ADArCWebApp.Shared;

using Microsoft.JSInterop;

public enum Board
{
    ArduinoUno,
    ArduinoMega,
}

public class BoardService
{
    private readonly IJSRuntime _js;
    private Board _board = Board.ArduinoUno;

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
}