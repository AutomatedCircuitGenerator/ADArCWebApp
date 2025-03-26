namespace ADArCWebApp.Shared.Data;

/// <summary>
/// Represents a vector of frequencies for a set of items of type <typeparamref name="T"/>.
/// Provides methods for incrementing, decrementing, and retrieving the frequency of items.
/// Also supports computing cosine similarity between two frequency vectors.
/// </summary>
/// <typeparam name="T">The type of the items stored in the frequency vector. Must be a non-nullable type.</typeparam>
public class FrequencyVector<T>(Dictionary<T, uint>? frequencies = null)
    where T : notnull
{
    private Dictionary<T, uint> _frequencies = frequencies ?? new Dictionary<T, uint>();

    public void IncrementFrequency(T of)
    {
        if (!_frequencies.TryAdd(of, 1))
        {
            _frequencies[of]++;
        }
    }

    public void DecrementFrequency(T of)
    {
        if (!_frequencies.ContainsKey(of)) return;

        if (_frequencies[of] > 1)
        {
            _frequencies[of]--;
        }
        else
        {
            _frequencies.Remove(of);
        }
    }

    public uint GetFrequency(T of)
    {
        return _frequencies.TryGetValue(of, out var value) ? value : 0;
    }
    
    public override string ToString()
    {
        var frequencyString = string.Join(", ", _frequencies.Select(kv => $"{kv.Key}: {kv.Value}"));
        return $"FrequencyVector: [{frequencyString}]";
    }

    /// <summary>
    /// Computes similarity to another FrequencyVector based on the size of the set intersection
    /// </summary>
    /// <param name="other"></param>
    /// <returns></returns>
    public double SimilarityTo(FrequencyVector<T> other)
    {
        double intersectionSum = _frequencies.Sum(kv => Math.Min(kv.Value, other.GetFrequency(kv.Key)));

        return intersectionSum;
    }

}