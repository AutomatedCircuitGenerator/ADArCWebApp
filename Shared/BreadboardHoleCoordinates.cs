namespace ADArCWebApp.Shared;

public static class BreadboardHoleCoordinates
{
    public const double RowPitch = 15.5;
    public const double ColPitch = 16.0;
    public const double FirstRowX = 46.0; // 92 * 0.5
    public const double BoardHeight = 380.0;

    public static double GetBoardLengthSvg(int rowCount = 30)
        => 92 + (rowCount - 1) * 31 + 77 - 12;

    public static double GetViewBoxWidth(int rowCount = 30)
        => GetBoardLengthSvg(rowCount) + 24;

    /// <summary>
    /// Computes the unzoomed breadboard SVG width for a given number of rows (540 for 30 rows, 1051.5 for 63 rows).
    /// </summary>
    public static double GetBoardWidth(int rowCount = 30)
        => GetViewBoxWidth(rowCount) * 0.5;

    /// <summary>
    /// Computes the number of rail holes per strip in groups of 5 (25 for 30 rows, 50 for 63 rows).
    /// </summary>
    public static int GetRailHoleCount(int rowCount = 30)
    {
        int groups = 0;
        while (true)
        {
            int nextMaxIndex = (groups + 1) * 5;
            double y = 92 + (nextMaxIndex - 1) * 31 + ((nextMaxIndex - 1) / 5) * 31;
            if (y > 92 + (rowCount - 1) * 31) break;
            groups++;
        }
        return Math.Max(5, groups * 5);
    }

    public static (double x, double y) GetCenter(string holeId, int maxRows = 63)
    {
        double originalX;
        double originalY;
        
        holeId = holeId.Trim().ToLowerInvariant();
        int maxRail = GetRailHoleCount(maxRows);
        
        // Check if this hole is on the power rail
        if (holeId.StartsWith("lplus_") || holeId.StartsWith("lminus_") || holeId.StartsWith("rplus_") || holeId.StartsWith("rminus_"))
        {
            var parts = holeId.Split('_');  // Get the rail name and hole number

            if (parts.Length != 2 || !int.TryParse(parts[1], out int index) || index < 1 || index > maxRail)
            {
                throw new ArgumentException($"Invalid rail hole: {holeId}");
            }
            
            // Find the X position based on which rail
            originalX = parts[0] switch
            {
                "lplus"  => 66,
                "lminus" => 96,
                "rplus"  => 664,
                "rminus" => 694,
                _ => throw new ArgumentException($"Invalid rail: {holeId}")
            };

            // Rail have a gap after every 5 holes
            originalY = 92 + (index - 1) * 31 + ((index - 1) / 5) * 31;

            return (originalY * 0.5, (760 - originalX) * 0.5);
        }

        // If the hole is not on power rails, get the column letter from hole name
        char column = holeId[0];
        
        // Check if row number is valid
        if (!int.TryParse(holeId[1..], out int row) ||
            row < 1 || row > maxRows)
        {
            throw new ArgumentException($"Invalid hole: {holeId}");
        }

        // Get X position of each column in SVG
        originalX = column switch
        {
            'a' => 188,
            'b' => 220,
            'c' => 252,
            'd' => 284,
            'e' => 316,
            'f' => 444,
            'g' => 476,
            'h' => 508,
            'i' => 540,
            'j' => 572,
            _ => throw new ArgumentException($"Invalid hole: {holeId}")
        };

        // Get Y position based on row number
        originalY = 92 + (row - 1) * 31;

        // Rotate and scale to match breadboard size
        return (originalY * 0.5, (760 - originalX) * 0.5);
    }

}