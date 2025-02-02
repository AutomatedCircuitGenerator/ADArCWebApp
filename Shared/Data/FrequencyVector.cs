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
    /// Computes the cosine similarity between this frequency vector and another frequency vector.
    /// The cosine similarity measures the angle between two vectors in the multi-dimensional space.
    /// </summary>
    /// <param name="other">The other frequency vector to compare to.</param>
    /// <returns>A value between -1 and 1 representing the cosine similarity, where 1 means identical, 0 means orthogonal, and -1 means opposite.</returns>
    public double SimilarityTo(FrequencyVector<T> other)
    {
        var dotProduct = _frequencies.Sum(kv => kv.Value * other.GetFrequency(kv.Key));

        var mag1 = Math.Sqrt(_frequencies.Values.Sum(v => v * v));
        var mag2 = Math.Sqrt(other._frequencies.Values.Sum(v => v * v));

        return (mag1 > 0 && mag2 > 0) ? (dotProduct / (mag1 * mag2)) : 0.0;
    }
}