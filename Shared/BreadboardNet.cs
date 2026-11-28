namespace ADArCWebApp.Shared;

public static class BreadboardNet
{
    
    public static string GetNetId(string hole, int maxRows = 63)
    {
        hole = hole.ToLowerInvariant(); // hole will have format of a1, b1,..., i30, j30

        // Main breadboard holes (A1–J{maxRows})
        char column = hole[0];  // column store the first char of hole, which is a, b, ..., j

        if (column >= 'a' && column <= 'j')
        {
            int row = int.Parse(hole.Substring(1)); // get rid of first char and convert it to integer and save to row
            
            // Check invalid row
            if (row < 1 || row > maxRows)
                throw new ArgumentException("Invalid row");
            
            // Return left row
            if (column <= 'e')
                return $"LEFT_{row}";
            
            // Return right row
            return $"RIGHT_{row}";
        }
        
        // Power rails: LPLUS_1, LMINUS_1, RPLUS_1, RMINUS_1,...
        int maxRail = BreadboardHoleCoordinates.GetRailHoleCount(maxRows);
        var parts = hole.Split('_');
        if (parts.Length == 2 && (parts[0] == "lplus" || parts[0] == "lminus" || parts[0] == "rplus" || parts[0] == "rminus") && int.TryParse(parts[1], out int railHole) && railHole >= 1 && railHole <= maxRail)
        {
            return $"RAIL_{parts[0]}";
        }

        throw new ArgumentException("Invalid breadboard hole");
    }
    
    // Used to check whether two holes are connected
    public static bool AreConnected(string a, string b, int maxRows = 63)
    {
        return GetNetId(a, maxRows) == GetNetId(b, maxRows);
    }
}
