namespace ADArCWebApp.Shared;

public static class BreadboardNet
{
    
    public static string GetNetId(string hole)
    {
        hole = hole.ToLowerInvariant(); // hole will have format of a1, b1,..., i30, j30

        // Main breadboard holes (A1–J30)
        char column = hole[0];  // column store the first char of hole, which is a, b, ..., j

        if (column >= 'a' && column <= 'j')
        {
            int row = int.Parse(hole.Substring(1)); // get rid of first char and convert it to integer and save to row
            
            // Check invalid row
            if (row < 1 || row > 30)
                throw new ArgumentException("Invalid row");
            
            // Return left row
            if (column <= 'e')
                return $"LEFT_{row}";
            
            // Return right row
            return $"RIGHT_{row}";
        }
        
        // Power rails: l+1, l+2,..., r-25
        char side = hole[0];    // same as column, just change var name for clarification
        char polarity = hole[1];    // if not main breadboard holes, second char will be either '+' or '-'
        int railHole = int.Parse(hole.Substring(2));

        // Check invalid hole
        if ((side != 'l' && side != 'r') ||
            (polarity != '+' && polarity != '-') ||
            railHole < 1 || railHole > 25)
            throw new ArgumentException("Invalid rail hole");

        return $"RAIL_{side}_{polarity}";
    }
    
    // Used to check whether two holes are connected
    public static bool AreConnected(string a, string b)
    {
        return GetNetId(a) == GetNetId(b);
    }
}
