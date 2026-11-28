using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace ADArCWebApp.Shared;

public enum CardinalDir
{
    None,
    Right,
    Left,
    Down,
    Up
}

public readonly record struct WirePoint(double X, double Y);

public record WireSegment(double X1, double Y1, double X2, double Y2);

public record WireObstacle(int LocalId, double MinX, double MaxX, double MinY, double MaxY);

public record WireRouteRequest(
    string Color,
    WirePoint Start,
    WirePoint End,
    int FromId,
    int ToId,
    string Tooltip,
    CardinalDir StartDir,
    CardinalDir EndDir,
    string? BusGroupKey,
    bool StartIsRail,
    bool EndIsRail,
    WireObstacle? StartCompBox,
    WireObstacle? EndCompBox,
    double StartInnerRowPitchOffset = 0.0,
    double EndInnerRowPitchOffset = 0.0
);

public record WireRouteResult(
    string Color,
    WirePoint Start,
    WirePoint End,
    int FromId,
    int ToId,
    string Tooltip,
    List<WireSegment> Segments,
    List<WirePoint> Junctions
);

/// <summary>
/// Generic minimum-bend, obstacle-aware orthogonal wire router for both breadboard and non-breadboard circuits.
/// Operates in unzoomed world coordinates to keep layouts invariant across zoom/pan.
/// </summary>
public static class WireRouter
{
    private const double LaneSpacing = 8.0;
    private const double BoxPadding = 9.0;
    private const double HardOverlapTol = 3.6;
    private const double PinExitZone = 22.0;
    private const double BendPenalty = 65.0;

    private readonly record struct TrackSpan(double Coord, double Min, double Max, string? BusKey);

    private class TrackRegistry
    {
        public readonly List<TrackSpan> Horizontal = new();
        public readonly List<TrackSpan> Vertical = new();

        public void AddSegments(IEnumerable<WireSegment> segs, string? busKey)
        {
            foreach (var s in segs)
            {
                if (Math.Abs(s.X1 - s.X2) < 0.1 && Math.Abs(s.Y1 - s.Y2) < 0.1) continue;
                if (Math.Abs(s.Y1 - s.Y2) < 0.5)
                    Horizontal.Add(new TrackSpan((s.Y1 + s.Y2) * 0.5, Math.Min(s.X1, s.X2), Math.Max(s.X1, s.X2), busKey));
                else if (Math.Abs(s.X1 - s.X2) < 0.5)
                    Vertical.Add(new TrackSpan((s.X1 + s.X2) * 0.5, Math.Min(s.Y1, s.Y2), Math.Max(s.Y1, s.Y2), busKey));
            }
        }

        public bool OverlapsHorizontal(double y, double x1, double x2, string? busKey, WirePoint p0, WirePoint p1, double spacing = LaneSpacing)
        {
            double minX = Math.Min(x1, x2);
            double maxX = Math.Max(x1, x2);
            if (maxX - minX < 0.5) return false;

            foreach (var t in Horizontal)
            {
                if (busKey != null && t.BusKey == busKey) continue;
                double dy = Math.Abs(t.Coord - y);
                if (dy >= spacing) continue;

                double oMin = Math.Max(minX, t.Min);
                double oMax = Math.Min(maxX, t.Max);
                if (oMax - oMin <= 1.0) continue;

                if (dy < HardOverlapTol)
                {
                    bool tinyStubAtEnd = oMax - oMin <= 4.0 &&
                        ((oMin >= p0.X - 3.0 && oMax <= p0.X + 3.0 && Math.Abs(y - p0.Y) < 3.0) ||
                         (oMin >= p1.X - 3.0 && oMax <= p1.X + 3.0 && Math.Abs(y - p1.Y) < 3.0));
                    if (tinyStubAtEnd) continue;
                    return true;
                }

                bool inPinZone = (oMax - oMin <= PinExitZone) &&
                    ((Math.Abs(y - p0.Y) < spacing && oMin >= p0.X - PinExitZone && oMax <= p0.X + PinExitZone) ||
                     (Math.Abs(y - p1.Y) < spacing && oMin >= p1.X - PinExitZone && oMax <= p1.X + PinExitZone));
                if (inPinZone) continue;

                return true;
            }
            return false;
        }

        public bool OverlapsVertical(double x, double y1, double y2, string? busKey, WirePoint p0, WirePoint p1, double spacing = LaneSpacing)
        {
            double minY = Math.Min(y1, y2);
            double maxY = Math.Max(y1, y2);
            if (maxY - minY < 0.5) return false;

            foreach (var t in Vertical)
            {
                if (busKey != null && t.BusKey == busKey) continue;
                double dx = Math.Abs(t.Coord - x);
                if (dx >= spacing) continue;

                double oMin = Math.Max(minY, t.Min);
                double oMax = Math.Min(maxY, t.Max);
                if (oMax - oMin <= 1.0) continue;

                if (dx < HardOverlapTol)
                {
                    bool tinyStubAtEnd = oMax - oMin <= 4.0 &&
                        ((oMin >= p0.Y - 3.0 && oMax <= p0.Y + 3.0 && Math.Abs(x - p0.X) < 3.0) ||
                         (oMin >= p1.Y - 3.0 && oMax <= p1.Y + 3.0 && Math.Abs(x - p1.X) < 3.0));
                    if (tinyStubAtEnd) continue;
                    return true;
                }

                bool inPinZone = (oMax - oMin <= PinExitZone) &&
                    ((Math.Abs(x - p0.X) < spacing && oMin >= p0.Y - PinExitZone && oMax <= p0.Y + PinExitZone) ||
                     (Math.Abs(x - p1.X) < spacing && oMin >= p1.Y - PinExitZone && oMax <= p1.Y + PinExitZone));
                if (inPinZone) continue;

                return true;
            }
            return false;
        }

        public bool HasTrackOverlap(List<WireSegment> segs, string? busKey, WirePoint p0, WirePoint p1, double spacing = LaneSpacing)
        {
            foreach (var s in segs)
            {
                if (Math.Abs(s.Y1 - s.Y2) < 0.5)
                {
                    if (OverlapsHorizontal((s.Y1 + s.Y2) * 0.5, s.X1, s.X2, busKey, p0, p1, spacing))
                        return true;
                }
                else if (Math.Abs(s.X1 - s.X2) < 0.5)
                {
                    if (OverlapsVertical((s.X1 + s.X2) * 0.5, s.Y1, s.Y2, busKey, p0, p1, spacing))
                        return true;
                }
            }
            return false;
        }
    }

    public static List<WireRouteResult> RouteAll(
        IReadOnlyList<WireRouteRequest> requests,
        IReadOnlyList<WireObstacle> allBoxes,
        IReadOnlyList<WirePoint>? occupiedHoleCoords,
        WireObstacle? breadboardSoftBox)
    {
        var results = new WireRouteResult?[requests.Count];
        var tracks = new TrackRegistry();

        // 1. Identify shared-net bus groups (K >= 2 wires sharing the exact same hub pin + color)
        var busCandidates = new Dictionary<string, List<int>>();
        var nonBusIndices = new List<int>();

        for (int i = 0; i < requests.Count; i++)
        {
            var r = requests[i];
            if (!string.IsNullOrEmpty(r.BusGroupKey))
            {
                if (!busCandidates.TryGetValue(r.BusGroupKey, out var list))
                {
                    list = new List<int>();
                    busCandidates[r.BusGroupKey] = list;
                }
                list.Add(i);
            }
            else
            {
                nonBusIndices.Add(i);
            }
        }

        // Route larger bus groups first so shared power/ground spines claim clean continuous corridors
        var realBuses = busCandidates
            .Where(kv => kv.Value.Count >= 2)
            .OrderByDescending(kv => kv.Value.Count)
            .ToList();

        foreach (var kv in busCandidates.Where(kv => kv.Value.Count < 2))
        {
            nonBusIndices.AddRange(kv.Value);
        }

        foreach (var (_, idxList) in realBuses)
        {
            RouteBusGroup(requests, idxList, allBoxes, occupiedHoleCoords, breadboardSoftBox, tracks, results);
        }

        // 2. Sort remaining signal / single wires deterministically by exit direction & monotonic spatial order
        var orderedSingles = nonBusIndices
            .OrderBy(i => GetComplexityHint(requests[i]))
            .ThenBy(i => requests[i].StartDir)
            .ThenBy(i => Math.Round(requests[i].Start.Y / 4.0))
            .ThenBy(i => Math.Round(requests[i].Start.X / 4.0))
            .ThenBy(i => Math.Round(requests[i].End.X / 4.0))
            .ThenBy(i => Math.Round(requests[i].End.Y / 4.0))
            .ToList();

        foreach (int idx in orderedSingles)
        {
            var req = requests[idx];
            var segs = RouteSingle(req, allBoxes, occupiedHoleCoords, breadboardSoftBox, tracks);
            tracks.AddSegments(segs, req.BusGroupKey);
            results[idx] = new WireRouteResult(
                req.Color, req.Start, req.End, req.FromId, req.ToId, req.Tooltip, segs, new List<WirePoint>());
        }

        return results.Where(r => r != null).Select(r => r!).ToList();
    }

    private static int GetComplexityHint(WireRouteRequest r)
    {
        if (Math.Abs(r.Start.X - r.End.X) < 1.0 || Math.Abs(r.Start.Y - r.End.Y) < 1.0)
            return 0;
        if (r.StartDir != CardinalDir.None && r.EndDir != CardinalDir.None && IsHorizontal(r.StartDir) != IsHorizontal(r.EndDir))
            return 1;
        return 2;
    }

    private static void RouteBusGroup(
        IReadOnlyList<WireRouteRequest> requests,
        List<int> indices,
        IReadOnlyList<WireObstacle> allBoxes,
        IReadOnlyList<WirePoint>? occupiedHoleCoords,
        WireObstacle? breadboardSoftBox,
        TrackRegistry tracks,
        WireRouteResult?[] results)
    {
        // All requests in a BusGroup share the same Hub endpoint (either End or Start). Determine which end is common.
        var first = requests[indices[0]];
        bool endIsHub = indices.All(i => DistSq(requests[i].End, first.End) < 4.0);
        WirePoint hub = endIsHub ? first.End : first.Start;
        CardinalDir hubDir = endIsHub ? first.EndDir : first.StartDir;
        int hubCompId = endIsHub ? first.ToId : first.FromId;
        WireObstacle? hubBox = endIsHub ? first.EndCompBox : first.StartCompBox;
        string busKey = first.BusGroupKey!;

        // Split leaves into left/right clusters relative to the hub component so opposite-side columns form their own clean spines
        var clusters = new List<List<int>>();
        var leftLeaves = new List<int>();
        var rightLeaves = new List<int>();
        var centerLeaves = new List<int>();

        double splitLeft = hubBox?.MinX ?? hub.X - 40;
        double splitRight = hubBox?.MaxX ?? hub.X + 40;

        foreach (int idx in indices)
        {
            var leaf = endIsHub ? requests[idx].Start : requests[idx].End;
            if (leaf.X < splitLeft - 15) leftLeaves.Add(idx);
            else if (leaf.X > splitRight + 15) rightLeaves.Add(idx);
            else centerLeaves.Add(idx);
        }

        if (leftLeaves.Count > 0) clusters.Add(leftLeaves);
        if (rightLeaves.Count > 0) clusters.Add(rightLeaves);
        if (centerLeaves.Count > 0) clusters.Add(centerLeaves);

        // Further split a large cluster if it contains separated sub-columns (gap > 90px in X or Y)
        var refinedClusters = new List<List<int>>();
        foreach (var cluster in clusters)
        {
            if (cluster.Count <= 1)
            {
                refinedClusters.Add(cluster);
                continue;
            }
            var sortedByX = cluster.OrderBy(i => (endIsHub ? requests[i].Start : requests[i].End).X).ToList();
            var current = new List<int> { sortedByX[0] };
            for (int k = 1; k < sortedByX.Count; k++)
            {
                var prevP = endIsHub ? requests[sortedByX[k - 1]].Start : requests[sortedByX[k - 1]].End;
                var curP = endIsHub ? requests[sortedByX[k]].Start : requests[sortedByX[k]].End;
                if (curP.X - prevP.X > 120.0)
                {
                    refinedClusters.Add(current);
                    current = new List<int>();
                }
                current.Add(sortedByX[k]);
            }
            refinedClusters.Add(current);
        }

        foreach (var cluster in refinedClusters)
        {
            if (cluster.Count == 1)
            {
                int idx = cluster[0];
                var req = requests[idx];
                var segs = RouteSingle(req, allBoxes, occupiedHoleCoords, breadboardSoftBox, tracks);
                tracks.AddSegments(segs, busKey);
                results[idx] = new WireRouteResult(
                    req.Color, req.Start, req.End, req.FromId, req.ToId, req.Tooltip, segs, new List<WirePoint>());
                continue;
            }

            var leaves = cluster.Select(i => (
                Idx: i,
                Req: requests[i],
                Pt: endIsHub ? requests[i].Start : requests[i].End,
                Dir: endIsHub ? requests[i].StartDir : requests[i].EndDir,
                Box: endIsHub ? requests[i].StartCompBox : requests[i].EndCompBox
            )).ToList();

            double minX = leaves.Min(l => l.Pt.X);
            double maxX = leaves.Max(l => l.Pt.X);
            double minY = leaves.Min(l => l.Pt.Y);
            double maxY = leaves.Max(l => l.Pt.Y);

            bool verticalSpine = (maxY - minY) >= (maxX - minX);
            var obsForCluster = BuildObstaclesForCluster(
                allBoxes,
                occupiedHoleCoords,
                cluster.Select(i => endIsHub ? requests[i].FromId : requests[i].ToId).Append(hubCompId).ToHashSet(),
                leaves.Select(l => l.Pt).Append(hub));

            if (verticalSpine)
            {
                // Pick outward X side based on leaf exit directions or direction away from leaf bodies
                int leftVotes = leaves.Count(l => l.Dir == CardinalDir.Left);
                int rightVotes = leaves.Count(l => l.Dir == CardinalDir.Right);
                bool placeLeft = leftVotes > rightVotes || (leftVotes == rightVotes && hub.X >= maxX);

                double baseSpineX = placeLeft
                    ? Math.Min(minX - 12.0, leaves.Where(l => l.Box != null).Select(l => l.Box!.MinX - 10.0).DefaultIfEmpty(minX - 12.0).Min())
                    : Math.Max(maxX + 12.0, leaves.Where(l => l.Box != null).Select(l => l.Box!.MaxX + 10.0).DefaultIfEmpty(maxX + 12.0).Max());

                // Find first unobstructed vertical spine lane clear of obstacles and non-bus vertical tracks
                double spineX = FindFreeVerticalCoord(
                    baseSpineX,
                    placeLeft ? -LaneSpacing : LaneSpacing,
                    minY,
                    maxY,
                    obsForCluster,
                    tracks,
                    busKey,
                    leaves[0].Pt,
                    hub);

                // Evaluate up to 3 natural anchor positions along spine (clamped hub Y, minY, maxY) and pick fewest bends/shortest
                var anchorCandidatesY = new List<double> { Math.Clamp(hub.Y, minY, maxY), minY, maxY }
                    .Distinct()
                    .ToList();
                double anchorY = anchorCandidatesY[0];
                List<WireSegment> feederSegs = new();
                int bestAnchorScore = int.MaxValue;
                foreach (double candY in anchorCandidatesY)
                {
                    var candAnchor = new WirePoint(spineX, candY);
                    var candTrunkReq = new WireRouteRequest(
                        first.Color,
                        candAnchor,
                        hub,
                        -2,
                        hubCompId,
                        first.Tooltip,
                        CardinalDir.None,
                        hubDir,
                        busKey,
                        false,
                        endIsHub ? first.EndIsRail : first.StartIsRail,
                        null,
                        hubBox,
                        0.0,
                        endIsHub ? first.EndInnerRowPitchOffset : first.StartInnerRowPitchOffset);
                    var candSegs = RouteSingle(candTrunkReq, allBoxes, occupiedHoleCoords, breadboardSoftBox, tracks);
                    int score = candSegs.Count * 1000 + (int)candSegs.Sum(s => Math.Abs(s.X2 - s.X1) + Math.Abs(s.Y2 - s.Y1));
                    if (score < bestAnchorScore)
                    {
                        bestAnchorScore = score;
                        anchorY = candY;
                        feederSegs = candSegs;
                    }
                }
                var spineAnchor = new WirePoint(spineX, anchorY);
                tracks.AddSegments(feederSegs, busKey);
                tracks.AddSegments(new[] { new WireSegment(spineX, minY, spineX, maxY) }, busKey);

                foreach (var l in leaves)
                {
                    var tapPt = new WirePoint(spineX, l.Pt.Y);
                    var branchReq = new WireRouteRequest(
                        l.Req.Color,
                        l.Pt,
                        tapPt,
                        endIsHub ? l.Req.FromId : l.Req.ToId,
                        -2,
                        l.Req.Tooltip,
                        l.Dir,
                        CardinalDir.None,
                        busKey,
                        false,
                        false,
                        l.Box,
                        null,
                        endIsHub ? l.Req.StartInnerRowPitchOffset : l.Req.EndInnerRowPitchOffset,
                        0.0);

                    var branchSegs = RouteSingle(branchReq, allBoxes, occupiedHoleCoords, null, tracks);
                    tracks.AddSegments(branchSegs, busKey);

                    var full = new List<WireSegment>();
                    full.AddRange(branchSegs);
                    if (Math.Abs(l.Pt.Y - anchorY) > 0.5)
                        full.Add(new WireSegment(spineX, l.Pt.Y, spineX, anchorY));
                    full.AddRange(feederSegs);

                    if (!endIsHub)
                        full = ReversePath(full);

                    var cleaned = CleanSegments(full);
                    var rawJunctions = new List<WirePoint>();
                    if (Math.Abs(l.Pt.Y - minY) > 1.0 && Math.Abs(l.Pt.Y - maxY) > 1.0)
                        rawJunctions.Add(tapPt);
                    if (Math.Abs(anchorY - l.Pt.Y) < 1.0 && leaves.Count > 1)
                        rawJunctions.Add(spineAnchor);
                    var junctions = FilterJunctionsOnPath(rawJunctions, cleaned, l.Req.Start, l.Req.End);

                    results[l.Idx] = new WireRouteResult(
                        l.Req.Color, l.Req.Start, l.Req.End, l.Req.FromId, l.Req.ToId, l.Req.Tooltip, cleaned, junctions);
                }
            }
            else
            {
                // Horizontal bus spine (leaves spread horizontally, e.g., row of pins/sensors above/below board)
                int upVotes = leaves.Count(l => l.Dir == CardinalDir.Up);
                int downVotes = leaves.Count(l => l.Dir == CardinalDir.Down);
                bool placeAbove = upVotes > downVotes || (upVotes == downVotes && hub.Y >= maxY);

                double baseSpineY = placeAbove
                    ? Math.Min(minY - 12.0, leaves.Where(l => l.Box != null).Select(l => l.Box!.MinY - 10.0).DefaultIfEmpty(minY - 12.0).Min())
                    : Math.Max(maxY + 12.0, leaves.Where(l => l.Box != null).Select(l => l.Box!.MaxY + 10.0).DefaultIfEmpty(maxY + 12.0).Max());

                double spineY = FindFreeHorizontalCoord(
                    baseSpineY,
                    placeAbove ? -LaneSpacing : LaneSpacing,
                    minX,
                    maxX,
                    obsForCluster,
                    tracks,
                    busKey,
                    leaves[0].Pt,
                    hub);

                double anchorX = Math.Abs(minX - hub.X) <= Math.Abs(maxX - hub.X) ? minX : maxX;
                var spineAnchor = new WirePoint(anchorX, spineY);

                var trunkReq = new WireRouteRequest(
                    first.Color,
                    spineAnchor,
                    hub,
                    -2,
                    hubCompId,
                    first.Tooltip,
                    anchorX <= hub.X ? CardinalDir.Right : CardinalDir.Left,
                    hubDir,
                    busKey,
                    false,
                    endIsHub ? first.EndIsRail : first.StartIsRail,
                    null,
                    hubBox);

                var feederSegs = RouteSingle(trunkReq, allBoxes, occupiedHoleCoords, breadboardSoftBox, tracks);
                tracks.AddSegments(feederSegs, busKey);
                tracks.AddSegments(new[] { new WireSegment(minX, spineY, maxX, spineY) }, busKey);

                foreach (var l in leaves)
                {
                    var tapPt = new WirePoint(l.Pt.X, spineY);
                    var branchReq = new WireRouteRequest(
                        l.Req.Color,
                        l.Pt,
                        tapPt,
                        endIsHub ? l.Req.FromId : l.Req.ToId,
                        -2,
                        l.Req.Tooltip,
                        l.Dir,
                        spineY >= l.Pt.Y ? CardinalDir.Down : CardinalDir.Up,
                        busKey,
                        false,
                        false,
                        l.Box,
                        null);

                    var branchSegs = RouteSingle(branchReq, allBoxes, occupiedHoleCoords, null, tracks);
                    tracks.AddSegments(branchSegs, busKey);

                    var full = new List<WireSegment>();
                    full.AddRange(branchSegs);
                    if (Math.Abs(l.Pt.X - anchorX) > 0.5)
                        full.Add(new WireSegment(l.Pt.X, spineY, anchorX, spineY));
                    full.AddRange(feederSegs);

                    if (!endIsHub)
                        full = ReversePath(full);

                    var cleaned = CleanSegments(full);
                    var rawJunctions = new List<WirePoint>();
                    if (Math.Abs(l.Pt.X - minX) > 1.0 && Math.Abs(l.Pt.X - maxX) > 1.0)
                        rawJunctions.Add(tapPt);
                    var junctions = FilterJunctionsOnPath(rawJunctions, cleaned, l.Req.Start, l.Req.End);

                    results[l.Idx] = new WireRouteResult(
                        l.Req.Color, l.Req.Start, l.Req.End, l.Req.FromId, l.Req.ToId, l.Req.Tooltip, cleaned, junctions);
                }
            }
        }
    }

    private static List<WireSegment> ReversePath(List<WireSegment> segs)
    {
        var rev = new List<WireSegment>(segs.Count);
        for (int i = segs.Count - 1; i >= 0; i--)
        {
            var s = segs[i];
            rev.Add(new WireSegment(s.X2, s.Y2, s.X1, s.Y1));
        }
        return rev;
    }

    private static double FindFreeVerticalCoord(
        double startX, double stepX, double minY, double maxY,
        List<WireObstacle> obs, TrackRegistry tracks, string? busKey, WirePoint p0, WirePoint p1)
    {
        for (int attempt = 0; attempt < 25; attempt++)
        {
            double x = startX + attempt * stepX;
            bool blocked = obs.Any(b => SegmentIntersectsBox(x, minY, x, maxY, b))
                        || tracks.OverlapsVertical(x, minY, maxY, busKey, p0, p1);
            if (!blocked) return x;
        }
        return startX;
    }

    private static double FindFreeHorizontalCoord(
        double startY, double stepY, double minX, double maxX,
        List<WireObstacle> obs, TrackRegistry tracks, string? busKey, WirePoint p0, WirePoint p1)
    {
        for (int attempt = 0; attempt < 25; attempt++)
        {
            double y = startY + attempt * stepY;
            bool blocked = obs.Any(b => SegmentIntersectsBox(minX, y, maxX, y, b))
                        || tracks.OverlapsHorizontal(y, minX, maxX, busKey, p0, p1);
            if (!blocked) return y;
        }
        return startY;
    }

    private static List<WireObstacle> BuildObstaclesForWire(
        WireRouteRequest req,
        IReadOnlyList<WireObstacle> allBoxes,
        IReadOnlyList<WirePoint>? occupiedHoleCoords)
    {
        var list = new List<WireObstacle>();
        foreach (var b in allBoxes)
        {
            bool isOwn = (req.FromId >= 0 && b.LocalId == req.FromId) || (req.ToId >= 0 && b.LocalId == req.ToId);
            if (!isOwn) list.Add(b);
        }

        if (occupiedHoleCoords != null)
        {
            const double r = 4.0;
            const double tol = 2.5;
            foreach (var hc in occupiedHoleCoords)
            {
                bool isEnd = (Math.Abs(hc.X - req.Start.X) < tol && Math.Abs(hc.Y - req.Start.Y) < tol)
                          || (Math.Abs(hc.X - req.End.X) < tol && Math.Abs(hc.Y - req.End.Y) < tol);
                if (!isEnd)
                    list.Add(new WireObstacle(-999, hc.X - r, hc.X + r, hc.Y - r, hc.Y + r));
            }
        }
        return list;
    }

    private static List<WireObstacle> BuildObstaclesForCluster(
        IReadOnlyList<WireObstacle> allBoxes,
        IReadOnlyList<WirePoint>? occupiedHoleCoords,
        HashSet<int> excludedIds,
        IEnumerable<WirePoint> endpoints)
    {
        var pts = endpoints.ToList();
        var list = allBoxes.Where(b => b.LocalId < 0 || !excludedIds.Contains(b.LocalId)).ToList();
        if (occupiedHoleCoords != null)
        {
            const double r = 4.0;
            const double tol = 2.5;
            foreach (var hc in occupiedHoleCoords)
            {
                bool isEnd = pts.Any(p => Math.Abs(hc.X - p.X) < tol && Math.Abs(hc.Y - p.Y) < tol);
                if (!isEnd)
                    list.Add(new WireObstacle(-999, hc.X - r, hc.X + r, hc.Y - r, hc.Y + r));
            }
        }
        return list;
    }

    private static WirePoint GetStaggerPoint(WirePoint p, CardinalDir dir, double innerOffset)
    {
        if (Math.Abs(innerOffset) < 0.1 || dir == CardinalDir.None) return p;
        return IsHorizontal(dir)
            ? new WirePoint(p.X, p.Y + innerOffset)
            : new WirePoint(p.X + innerOffset, p.Y);
    }

    private static WirePoint GetOutwardPortal(WirePoint p, CardinalDir dir, WireObstacle? box, double clearance = 10.0, double innerOffset = 0.0)
    {
        var sp = GetStaggerPoint(p, dir, innerOffset);
        if (dir == CardinalDir.None) return sp;
        return dir switch
        {
            CardinalDir.Left => new WirePoint(box != null ? Math.Min(sp.X, box.MinX) - clearance : sp.X - clearance, sp.Y),
            CardinalDir.Right => new WirePoint(box != null ? Math.Max(sp.X, box.MaxX) + clearance : sp.X + clearance, sp.Y),
            CardinalDir.Up => new WirePoint(sp.X, box != null ? Math.Min(sp.Y, box.MinY) - clearance : sp.Y - clearance),
            CardinalDir.Down => new WirePoint(sp.X, box != null ? Math.Max(sp.Y, box.MaxY) + clearance : sp.Y + clearance),
            _ => sp
        };
    }

    private static void AppendOutwardPrefix(List<WireSegment> segs, WirePoint origin, WirePoint staggered, WirePoint portal)
    {
        if (DistSq(origin, staggered) > 0.25)
            segs.Add(new WireSegment(origin.X, origin.Y, staggered.X, staggered.Y));
        if (DistSq(staggered, portal) > 0.25)
            segs.Add(new WireSegment(staggered.X, staggered.Y, portal.X, portal.Y));
    }

    private static void AppendInwardSuffix(List<WireSegment> segs, WirePoint portal, WirePoint staggered, WirePoint origin)
    {
        if (DistSq(portal, staggered) > 0.25)
            segs.Add(new WireSegment(portal.X, portal.Y, staggered.X, staggered.Y));
        if (DistSq(staggered, origin) > 0.25)
            segs.Add(new WireSegment(staggered.X, staggered.Y, origin.X, origin.Y));
    }

    private static bool PointsAwayFromTarget(WirePoint p, WirePoint target, CardinalDir dir)
    {
        return dir switch
        {
            CardinalDir.Left => target.X > p.X + 4.0,
            CardinalDir.Right => target.X < p.X - 4.0,
            CardinalDir.Up => target.Y > p.Y + 4.0,
            CardinalDir.Down => target.Y < p.Y - 4.0,
            _ => false
        };
    }

    private static List<WireSegment> RouteSingle(
        WireRouteRequest req,
        IReadOnlyList<WireObstacle> allBoxes,
        IReadOnlyList<WirePoint>? occupiedHoleCoords,
        WireObstacle? breadboardSoftBox,
        TrackRegistry tracks)
    {
        var s = req.Start;
        var e = req.End;
        var obstacles = BuildObstaclesForWire(req, allBoxes, occupiedHoleCoords);
        bool applyBbSoft = breadboardSoftBox != null && (req.FromId >= 0 || req.ToId >= 0);
        bool hasInnerStagger = Math.Abs(req.StartInnerRowPitchOffset) > 0.1 || Math.Abs(req.EndInnerRowPitchOffset) > 0.1;

        bool FirstAndLastSegmentsRespectDirs(List<WireSegment> segs)
        {
            if (segs.Count == 0) return false;
            var f = segs[0];
            bool firstH = Math.Abs(f.Y1 - f.Y2) < 0.5;
            if (req.StartDir != CardinalDir.None && Math.Abs(req.StartInnerRowPitchOffset) < 0.1)
            {
                if (IsHorizontal(req.StartDir) != firstH) return false;
                if (req.StartDir == CardinalDir.Left && f.X2 > f.X1 + 0.5) return false;
                if (req.StartDir == CardinalDir.Right && f.X2 < f.X1 - 0.5) return false;
                if (req.StartDir == CardinalDir.Up && f.Y2 > f.Y1 + 0.5) return false;
                if (req.StartDir == CardinalDir.Down && f.Y2 < f.Y1 - 0.5) return false;
            }
            var l = segs[^1];
            bool lastH = Math.Abs(l.Y1 - l.Y2) < 0.5;
            if (req.EndDir != CardinalDir.None && Math.Abs(req.EndInnerRowPitchOffset) < 0.1)
            {
                if (IsHorizontal(req.EndDir) != lastH) return false;
                if (req.EndDir == CardinalDir.Left && l.X1 > l.X2 + 0.5) return false;
                if (req.EndDir == CardinalDir.Right && l.X1 < l.X2 - 0.5) return false;
                if (req.EndDir == CardinalDir.Up && l.Y1 > l.Y2 + 0.5) return false;
                if (req.EndDir == CardinalDir.Down && l.Y1 < l.Y2 - 0.5) return false;
            }
            return true;
        }

        bool PathValid(List<WireSegment> segs, bool checkTracks = true, bool checkBbSoft = true, double spacing = LaneSpacing)
        {
            if (segs.Count == 0) return false;
            if (!FirstAndLastSegmentsRespectDirs(segs)) return false;
            foreach (var seg in segs)
            {
                if (obstacles.Any(b => SegmentIntersectsBox(seg.X1, seg.Y1, seg.X2, seg.Y2, b)))
                    return false;
                if (ViolatesOwnInterior(seg, req.StartCompBox, s, req.StartDir, req.StartInnerRowPitchOffset))
                    return false;
                if (ViolatesOwnInterior(seg, req.EndCompBox, e, req.EndDir, req.EndInnerRowPitchOffset))
                    return false;
                if (checkBbSoft && applyBbSoft && BreadboardInteriorViolation(seg, breadboardSoftBox!, s, e))
                    return false;
            }
            if (checkTracks && tracks.HasTrackOverlap(segs, req.BusGroupKey, s, e, spacing))
                return false;
            return true;
        }

        var lCandidates = new List<(List<WireSegment> Segs, int Penalty)>();
        if (!hasInnerStagger)
        {
            // Priority 0: Direct straight line (0 bends)
            if (Math.Abs(s.X - e.X) < 1.0 || Math.Abs(s.Y - e.Y) < 1.0)
            {
                var direct = CleanSegments(new List<WireSegment> { new(s.X, s.Y, e.X, e.Y) });
                if (direct.Count == 0) direct.Add(new WireSegment(s.X, s.Y, e.X, e.Y));
                if (PathValid(direct, checkTracks: true, checkBbSoft: true))
                    return direct;
            }

            // Priority 1: Clean 1-bend L-shapes (H-V and V-H) ordered by compatibility with outward pin exit directions
            var hv = CleanSegments(new List<WireSegment> { new(s.X, s.Y, e.X, s.Y), new(e.X, s.Y, e.X, e.Y) });
            var vh = CleanSegments(new List<WireSegment> { new(s.X, s.Y, s.X, e.Y), new(s.X, e.Y, e.X, e.Y) });

            lCandidates.Add((hv, ScoreDirAlignment(req, startIsH: true, endIsH: false)));
            lCandidates.Add((vh, ScoreDirAlignment(req, startIsH: false, endIsH: true)));

            foreach (var cand in lCandidates.OrderBy(c => c.Penalty))
            {
                if (PathValid(cand.Segs, checkTracks: true, checkBbSoft: true))
                    return cand.Segs;
            }

            // Priority 2: 2-bend Z-shapes & exterior U-corridors
            bool leaveH = IsHorizontal(req.StartDir);
            bool enterH = IsHorizontal(req.EndDir);
            if (req.StartDir == CardinalDir.None && req.EndDir == CardinalDir.None)
            {
                leaveH = Math.Abs(e.X - s.X) >= Math.Abs(e.Y - s.Y);
                enterH = leaveH;
            }
            else if (req.StartDir == CardinalDir.None) leaveH = enterH;
            else if (req.EndDir == CardinalDir.None) enterH = leaveH;

            var zCandidates = GenerateTwoBendCandidates(s, e, req, leaveH, enterH, breadboardSoftBox);
            foreach (var segs in zCandidates)
            {
                var cleaned = CleanSegments(segs);
                if (PathValid(cleaned, checkTracks: true, checkBbSoft: true))
                    return cleaned;
            }
        }

        // Priority 2.5: Clean 2/3-bend Exterior Portal Routes (exit S outward to S_ext -> 1 or 2 bends -> E_ext -> E)
        var portalCandidates = GeneratePortalCandidates(s, e, req, breadboardSoftBox);
        foreach (var segs in portalCandidates)
        {
            var cleaned = CleanSegments(segs);
            if (PathValid(cleaned, checkTracks: true, checkBbSoft: true))
                return cleaned;
        }

        // Priority 3: Fast Hanan Channel-Grid Orthogonal A* fallback
        var astar = RouteHananAStar(req, obstacles, applyBbSoft ? breadboardSoftBox : null, tracks);
        if (astar != null && astar.Count > 0)
        {
            var cleanedAstar = CleanSegments(astar);
            if (FirstAndLastSegmentsRespectDirs(cleanedAstar))
                return cleanedAstar;
        }

        // Priority 4: Relax track spacing gradually (5.0 -> 3.8px) before ever waiving tracks, while ALWAYS enforcing obstacles + perpendicularity
        foreach (double relaxedSpacing in new[] { 5.0, 3.8 })
        {
            foreach (var segs in portalCandidates)
            {
                var cleaned = CleanSegments(segs);
                if (PathValid(cleaned, checkTracks: true, checkBbSoft: false, spacing: relaxedSpacing))
                    return cleaned;
            }
        }

        foreach (var segs in portalCandidates)
        {
            var cleaned = CleanSegments(segs);
            if (PathValid(cleaned, checkTracks: false, checkBbSoft: false))
                return cleaned;
        }
        foreach (var cand in lCandidates.OrderBy(c => c.Penalty))
        {
            if (PathValid(cand.Segs, checkTracks: false, checkBbSoft: false))
                return cand.Segs;
        }

        if (astar != null && astar.Count > 0)
            return CleanSegments(astar);

        // Guaranteed non-foldback fallback: pick the first portal candidate whose ends respect outward pin directions & own PCBs
        foreach (var segs in portalCandidates)
        {
            var cleaned = CleanSegments(segs);
            if (FirstAndLastSegmentsRespectDirs(cleaned)
             && !cleaned.Any(seg => ViolatesOwnInterior(seg, req.StartCompBox, s, req.StartDir, req.StartInnerRowPitchOffset)
                                 || ViolatesOwnInterior(seg, req.EndCompBox, e, req.EndDir, req.EndInnerRowPitchOffset)))
                return cleaned;
        }
        foreach (var segs in portalCandidates)
        {
            var cleaned = CleanSegments(segs);
            if (FirstAndLastSegmentsRespectDirs(cleaned))
                return cleaned;
        }
        return portalCandidates.Count > 0 ? CleanSegments(portalCandidates[0]) : CleanSegments(lCandidates[0].Segs);
    }

    private static List<List<WireSegment>> GeneratePortalCandidates(
        WirePoint s, WirePoint e, WireRouteRequest req, WireObstacle? bbSoftBox)
    {
        var candidates = new List<List<WireSegment>>();
        bool forcePortals = req.StartDir != CardinalDir.None || req.EndDir != CardinalDir.None
                         || Math.Abs(req.StartInnerRowPitchOffset) > 0.1 || Math.Abs(req.EndInnerRowPitchOffset) > 0.1;
        bool needS = forcePortals ? req.StartDir != CardinalDir.None : PointsAwayFromTarget(s, e, req.StartDir);
        bool needE = forcePortals ? req.EndDir != CardinalDir.None : PointsAwayFromTarget(e, s, req.EndDir);
        if (!needS && !needE) return candidates;

        var psStag = GetStaggerPoint(s, req.StartDir, req.StartInnerRowPitchOffset);
        var peStag = GetStaggerPoint(e, req.EndDir, req.EndInnerRowPitchOffset);

        for (int step = 0; step < 26; step++)
        {
            double clr = 8.0 + step * LaneSpacing;
            var ps = needS ? GetOutwardPortal(s, req.StartDir, req.StartCompBox, clr, req.StartInnerRowPitchOffset) : s;
            var pe = needE ? GetOutwardPortal(e, req.EndDir, req.EndCompBox, clr, req.EndInnerRowPitchOffset) : e;

            if (bbSoftBox != null && (req.FromId >= 0 || req.ToId >= 0))
            {
                if (req.EndIsRail || req.ToId == -1)
                    pe = GetOutwardPortal(e, req.EndDir, bbSoftBox, clr, req.EndInnerRowPitchOffset);
            }

            void AddPortalPair(WirePoint a, WirePoint b)
            {
                var p1 = new List<WireSegment>();
                AppendOutwardPrefix(p1, s, psStag, a);
                p1.Add(new WireSegment(a.X, a.Y, a.X, b.Y));
                p1.Add(new WireSegment(a.X, b.Y, b.X, b.Y));
                AppendInwardSuffix(p1, b, peStag, e);

                var p2 = new List<WireSegment>();
                AppendOutwardPrefix(p2, s, psStag, a);
                p2.Add(new WireSegment(a.X, a.Y, b.X, a.Y));
                p2.Add(new WireSegment(b.X, a.Y, b.X, b.Y));
                AppendInwardSuffix(p2, b, peStag, e);

                // Prefer turn directions that leave perpendicularly first without 180-degree foldback
                if (IsHorizontal(req.StartDir))
                {
                    candidates.Add(p2);
                    candidates.Add(p1);
                }
                else
                {
                    candidates.Add(p1);
                    candidates.Add(p2);
                }
            }

            AddPortalPair(ps, pe);

            // Also keep destination compact while fanning start outward (and vice versa) across multiple lanes
            if (needS && needE)
            {
                for (int sub = 0; sub <= 3 && sub < step; sub++)
                {
                    double subClr = 10.0 + sub * LaneSpacing;
                    var psSub = GetOutwardPortal(s, req.StartDir, req.StartCompBox, subClr, req.StartInnerRowPitchOffset);
                    var peSub = GetOutwardPortal(e, req.EndDir, req.EndCompBox, subClr, req.EndInnerRowPitchOffset);
                    if (bbSoftBox != null && (req.FromId >= 0 || req.ToId >= 0) && (req.EndIsRail || req.ToId == -1))
                        peSub = GetOutwardPortal(e, req.EndDir, bbSoftBox, subClr, req.EndInnerRowPitchOffset);

                    AddPortalPair(ps, peSub);
                    AddPortalPair(psSub, pe);
                }
            }

            // Perimeter U-routes escaping sideways around StartCompBox or EndCompBox when target lies behind component PCB
            if (req.StartCompBox != null && needS)
            {
                if (!IsHorizontal(req.StartDir))
                {
                    foreach (double sideX in new[] { req.StartCompBox.MinX - clr, req.StartCompBox.MaxX + clr })
                    {
                        var u = new List<WireSegment>();
                        AppendOutwardPrefix(u, s, psStag, ps);
                        u.Add(new WireSegment(ps.X, ps.Y, sideX, ps.Y));
                        u.Add(new WireSegment(sideX, ps.Y, sideX, pe.Y));
                        u.Add(new WireSegment(sideX, pe.Y, pe.X, pe.Y));
                        AppendInwardSuffix(u, pe, peStag, e);
                        candidates.Add(u);
                    }
                }
                else
                {
                    foreach (double sideY in new[] { req.StartCompBox.MinY - clr, req.StartCompBox.MaxY + clr })
                    {
                        var u = new List<WireSegment>();
                        AppendOutwardPrefix(u, s, psStag, ps);
                        u.Add(new WireSegment(ps.X, ps.Y, ps.X, sideY));
                        u.Add(new WireSegment(ps.X, sideY, pe.X, sideY));
                        u.Add(new WireSegment(pe.X, sideY, pe.X, pe.Y));
                        AppendInwardSuffix(u, pe, peStag, e);
                        candidates.Add(u);
                    }
                }
            }
        }
        return candidates;
    }

    private static List<WirePoint> FilterJunctionsOnPath(
        List<WirePoint> candidates,
        List<WireSegment> segs,
        WirePoint start,
        WirePoint end)
    {
        var result = new List<WirePoint>();
        if (segs.Count == 0 || candidates.Count == 0) return result;
        foreach (var j in candidates)
        {
            if (DistSq(j, start) < 4.0 || DistSq(j, end) < 4.0) continue;
            bool onSeg = segs.Any(s =>
            {
                double minX = Math.Min(s.X1, s.X2) - 0.8;
                double maxX = Math.Max(s.X1, s.X2) + 0.8;
                double minY = Math.Min(s.Y1, s.Y2) - 0.8;
                double maxY = Math.Max(s.Y1, s.Y2) + 0.8;
                return j.X >= minX && j.X <= maxX && j.Y >= minY && j.Y <= maxY;
            });
            if (onSeg && !result.Any(r => DistSq(r, j) < 2.0))
                result.Add(j);
        }
        return result;
    }

    private static int ScoreDirAlignment(WireRouteRequest req, bool startIsH, bool endIsH)
    {
        int score = 0;
        var dx = req.End.X - req.Start.X;
        var dy = req.End.Y - req.Start.Y;

        if (req.StartDir != CardinalDir.None)
        {
            if (IsHorizontal(req.StartDir) != startIsH) score += 2;
            if ((req.StartDir == CardinalDir.Right && dx < -2) || (req.StartDir == CardinalDir.Left && dx > 2)) score += 3;
            if ((req.StartDir == CardinalDir.Down && dy < -2) || (req.StartDir == CardinalDir.Up && dy > 2)) score += 3;
        }
        if (req.EndDir != CardinalDir.None)
        {
            if (IsHorizontal(req.EndDir) != endIsH) score += 2;
            if ((req.EndDir == CardinalDir.Right && dx > 2) || (req.EndDir == CardinalDir.Left && dx < -2)) score += 3;
            if ((req.EndDir == CardinalDir.Down && dy > 2) || (req.EndDir == CardinalDir.Up && dy < -2)) score += 3;
        }
        return score;
    }

    private static List<List<WireSegment>> GenerateTwoBendCandidates(
        WirePoint s, WirePoint e, WireRouteRequest req, bool leaveH, bool enterH, WireObstacle? bbSoftBox)
    {
        var candidates = new List<List<WireSegment>>();

        void AddHVH(double trunkX)
        {
            candidates.Add(new List<WireSegment>
            {
                new(s.X, s.Y, trunkX, s.Y),
                new(trunkX, s.Y, trunkX, e.Y),
                new(trunkX, e.Y, e.X, e.Y)
            });
        }

        void AddVHV(double trunkY)
        {
            candidates.Add(new List<WireSegment>
            {
                new(s.X, s.Y, s.X, trunkY),
                new(s.X, trunkY, e.X, trunkY),
                new(e.X, trunkY, e.X, e.Y)
            });
        }

        double minX = Math.Min(s.X, e.X);
        double maxX = Math.Max(s.X, e.X);
        double minY = Math.Min(s.Y, e.Y);
        double maxY = Math.Max(s.Y, e.Y);
        double midX = (s.X + e.X) * 0.5;
        double midY = (s.Y + e.Y) * 0.5;

        if (leaveH || enterH)
        {
            if (maxX - minX > 16.0)
            {
                for (int step = 0; step <= 8; step++)
                {
                    double delta = step * LaneSpacing;
                    AddHVH(Math.Clamp(midX + delta, minX + 8.0, maxX - 8.0));
                    if (step > 0) AddHVH(Math.Clamp(midX - delta, minX + 8.0, maxX - 8.0));
                }
            }
        }

        if (!leaveH || !enterH)
        {
            if (maxY - minY > 16.0)
            {
                for (int step = 0; step <= 8; step++)
                {
                    double delta = step * LaneSpacing;
                    AddVHV(Math.Clamp(midY + delta, minY + 8.0, maxY - 8.0));
                    if (step > 0) AddVHV(Math.Clamp(midY - delta, minY + 8.0, maxY - 8.0));
                }
            }
        }

        if (req.StartDir == CardinalDir.Up || req.EndDir == CardinalDir.Up)
        {
            double topY = Math.Min(minY, Math.Min(req.StartCompBox?.MinY ?? minY, req.EndCompBox?.MinY ?? minY)) - 12.0;
            if (bbSoftBox != null && (req.FromId >= 0 || req.ToId >= 0))
                topY = Math.Min(topY, bbSoftBox.MinY - 12.0);
            for (int step = 0; step < 20; step++) AddVHV(topY - step * LaneSpacing);
        }
        if (req.StartDir == CardinalDir.Down || req.EndDir == CardinalDir.Down)
        {
            double botY = Math.Max(maxY, Math.Max(req.StartCompBox?.MaxY ?? maxY, req.EndCompBox?.MaxY ?? maxY)) + 12.0;
            if (bbSoftBox != null && (req.FromId >= 0 || req.ToId >= 0))
                botY = Math.Max(botY, bbSoftBox.MaxY + 12.0);
            for (int step = 0; step < 20; step++) AddVHV(botY + step * LaneSpacing);
        }
        if (req.StartDir == CardinalDir.Left || req.EndDir == CardinalDir.Left)
        {
            double leftX = Math.Min(minX, Math.Min(req.StartCompBox?.MinX ?? minX, req.EndCompBox?.MinX ?? minX)) - 12.0;
            for (int step = 0; step < 20; step++) AddHVH(leftX - step * LaneSpacing);
        }
        if (req.StartDir == CardinalDir.Right || req.EndDir == CardinalDir.Right)
        {
            double rightX = Math.Max(maxX, Math.Max(req.StartCompBox?.MaxX ?? maxX, req.EndCompBox?.MaxX ?? maxX)) + 12.0;
            for (int step = 0; step < 20; step++) AddHVH(rightX + step * LaneSpacing);
        }

        return candidates;
    }

    private static double[] SortedUniqueCoords(List<double> raw, double minDiff = 0.5)
    {
        raw.Sort();
        var unique = new List<double>(raw.Count);
        foreach (double v in raw)
        {
            if (unique.Count == 0 || v - unique[^1] >= minDiff)
                unique.Add(v);
        }
        return unique.ToArray();
    }

    private static List<WireSegment>? RouteHananAStar(
        WireRouteRequest req,
        List<WireObstacle> obstacles,
        WireObstacle? breadboardSoftBox,
        TrackRegistry tracks)
    {
        var origS = req.Start;
        var origE = req.End;
        var sStag = GetStaggerPoint(origS, req.StartDir, req.StartInnerRowPitchOffset);
        var eStag = GetStaggerPoint(origE, req.EndDir, req.EndInnerRowPitchOffset);
        var s = req.StartDir != CardinalDir.None ? GetOutwardPortal(origS, req.StartDir, req.StartCompBox, 10.0, req.StartInnerRowPitchOffset) : origS;
        var e = req.EndDir != CardinalDir.None ? GetOutwardPortal(origE, req.EndDir, req.EndCompBox, 10.0, req.EndInnerRowPitchOffset) : origE;

        var rawX = new List<double> { s.X, e.X };
        var rawY = new List<double> { s.Y, e.Y };

        bool addSecondary = obstacles.Count <= 12;

        void AddBoxLines(WireObstacle? b)
        {
            if (b == null) return;
            rawX.Add(b.MinX - BoxPadding);
            rawX.Add(b.MaxX + BoxPadding);
            rawY.Add(b.MinY - BoxPadding);
            rawY.Add(b.MaxY + BoxPadding);
            if (addSecondary)
            {
                for (int k = 1; k <= 3; k++)
                {
                    double off = BoxPadding + k * LaneSpacing;
                    rawX.Add(b.MinX - off);
                    rawX.Add(b.MaxX + off);
                    rawY.Add(b.MinY - off);
                    rawY.Add(b.MaxY + off);
                }
            }
        }

        foreach (var b in obstacles)
        {
            if (b.LocalId == -999)
            {
                // Only add hole-box detours close to endpoints to keep Hanan grid compact & fast
                if ((Math.Abs(b.MinX - s.X) < 55.0 && Math.Abs(b.MinY - s.Y) < 55.0)
                 || (Math.Abs(b.MinX - e.X) < 55.0 && Math.Abs(b.MinY - e.Y) < 55.0))
                {
                    rawX.Add(b.MinX - 4.0);
                    rawX.Add(b.MaxX + 4.0);
                    rawY.Add(b.MinY - 4.0);
                    rawY.Add(b.MaxY + 4.0);
                }
            }
            else
            {
                AddBoxLines(b);
            }
        }
        AddBoxLines(req.StartCompBox);
        AddBoxLines(req.EndCompBox);
        AddBoxLines(breadboardSoftBox);

        // Global outer perimeter lanes keep dense multi-wire bundles non-overlapping
        var realBoxes = obstacles.Where(b => b.LocalId != -999).ToList();
        if (req.StartCompBox != null) realBoxes.Add(req.StartCompBox);
        if (req.EndCompBox != null) realBoxes.Add(req.EndCompBox);
        if (breadboardSoftBox != null) realBoxes.Add(breadboardSoftBox);
        if (realBoxes.Count > 0)
        {
            double gMinX = realBoxes.Min(b => b.MinX), gMaxX = realBoxes.Max(b => b.MaxX);
            double gMinY = realBoxes.Min(b => b.MinY), gMaxY = realBoxes.Max(b => b.MaxY);
            for (int k = 1; k <= 6; k++)
            {
                double off = BoxPadding + k * LaneSpacing;
                rawX.Add(gMinX - off);
                rawX.Add(gMaxX + off);
                rawY.Add(gMinY - off);
                rawY.Add(gMaxY + off);
            }
        }

        if (req.StartCompBox != null)
        {
            for (int k = 0; k < 12; k++)
            {
                double off = 10.0 + k * LaneSpacing;
                if (req.StartDir == CardinalDir.Left) rawX.Add(req.StartCompBox.MinX - off);
                if (req.StartDir == CardinalDir.Right) rawX.Add(req.StartCompBox.MaxX + off);
                if (req.StartDir == CardinalDir.Up) rawY.Add(req.StartCompBox.MinY - off);
                if (req.StartDir == CardinalDir.Down) rawY.Add(req.StartCompBox.MaxY + off);
            }
        }
        if (req.EndCompBox != null)
        {
            for (int k = 0; k < 12; k++)
            {
                double off = 10.0 + k * LaneSpacing;
                if (req.EndDir == CardinalDir.Left) rawX.Add(req.EndCompBox.MinX - off);
                if (req.EndDir == CardinalDir.Right) rawX.Add(req.EndCompBox.MaxX + off);
                if (req.EndDir == CardinalDir.Up) rawY.Add(req.EndCompBox.MinY - off);
                if (req.EndDir == CardinalDir.Down) rawY.Add(req.EndCompBox.MaxY + off);
            }
        }

        var xs = SortedUniqueCoords(rawX);
        var ys = SortedUniqueCoords(rawY);
        int nx = xs.Length;
        int ny = ys.Length;
        if (nx == 0 || ny == 0 || nx * ny > 8500) return null;

        int sx = FindNearestIndex(xs, s.X);
        int sy = FindNearestIndex(ys, s.Y);
        int ex = FindNearestIndex(xs, e.X);
        int ey = FindNearestIndex(ys, e.Y);

        // Hard-block own component PCBs (since s & e are already stepped strictly outside StartCompBox/EndCompBox!)
        var ownBoxes = new List<WireObstacle>(2);
        if (req.StartCompBox != null && req.StartDir != CardinalDir.None)
            ownBoxes.Add(new WireObstacle(req.StartCompBox.LocalId, req.StartCompBox.MinX + 1.0, req.StartCompBox.MaxX - 1.0, req.StartCompBox.MinY + 1.0, req.StartCompBox.MaxY - 1.0));
        if (req.EndCompBox != null && req.EndDir != CardinalDir.None)
            ownBoxes.Add(new WireObstacle(req.EndCompBox.LocalId, req.EndCompBox.MinX + 1.0, req.EndCompBox.MaxX - 1.0, req.EndCompBox.MinY + 1.0, req.EndCompBox.MaxY - 1.0));

        var extBlockedRight = new bool[nx * ny];
        var extBlockedDown = new bool[nx * ny];
        var ownBlockedRight = new bool[nx * ny];
        var ownBlockedDown = new bool[nx * ny];
        for (int cy = 0; cy < ny; cy++)
        {
            double y = ys[cy];
            for (int cx = 0; cx < nx - 1; cx++)
            {
                double x1 = xs[cx], x2 = xs[cx + 1];
                int idx = cy * nx + cx;
                extBlockedRight[idx] = obstacles.Any(b => SegmentIntersectsBox(x1, y, x2, y, b));
                ownBlockedRight[idx] = ownBoxes.Any(b => SegmentIntersectsBox(x1, y, x2, y, b));
            }
        }
        for (int cy = 0; cy < ny - 1; cy++)
        {
            double y1 = ys[cy], y2 = ys[cy + 1];
            for (int cx = 0; cx < nx; cx++)
            {
                double x = xs[cx];
                int idx = cy * nx + cx;
                extBlockedDown[idx] = obstacles.Any(b => SegmentIntersectsBox(x, y1, x, y2, b));
                ownBlockedDown[idx] = ownBoxes.Any(b => SegmentIntersectsBox(x, y1, x, y2, b));
            }
        }

        List<WireSegment>? RunSearch(bool allowExtObstacles, int maxExpandedLimit)
        {
            int totalStates = nx * ny * 2;
            var dist = new double[totalStates];
            var parent = new int[totalStates];
            var closed = new bool[totalStates];
            Array.Fill(dist, double.PositiveInfinity);
            Array.Fill(parent, -1);

            var pq = new PriorityQueue<int, double>();
            for (int d = 0; d < 2; d++)
            {
                int st = ((sy * nx + sx) * 2) + d;
                double initCost = 0.0;
                if (d == 0 && req.StartDir != CardinalDir.None && !IsHorizontal(req.StartDir)) initCost = 20.0;
                if (d == 1 && req.StartDir != CardinalDir.None && IsHorizontal(req.StartDir)) initCost = 20.0;
                dist[st] = initCost;
                pq.Enqueue(st, initCost + Manhattan(xs[sx], ys[sy], xs[ex], ys[ey]));
            }

            int bestGoalState = -1;
            double bestGoalCost = double.PositiveInfinity;

            int[] dx = { 1, -1, 0, 0 };
            int[] dy = { 0, 0, 1, -1 };
            int expanded = 0;

            while (pq.Count > 0 && expanded < maxExpandedLimit)
            {
                pq.TryDequeue(out int state, out double fScore);
                if (closed[state]) continue;
                closed[state] = true;
                expanded++;

                double curCost = dist[state];
                if (fScore > bestGoalCost) break;

                int dir = state & 1;
                int cell = state >> 1;
                int cx = cell % nx;
                int cy = cell / nx;

                if (cx == ex && cy == ey)
                {
                    double endAlign = 0.0;
                    if (req.EndDir != CardinalDir.None && (dir == 0) != IsHorizontal(req.EndDir))
                        endAlign = 20.0;
                    if (curCost + endAlign < bestGoalCost)
                    {
                        bestGoalCost = curCost + endAlign;
                        bestGoalState = state;
                    }
                    continue;
                }

                for (int k = 0; k < 4; k++)
                {
                    int ncx = cx + dx[k];
                    int ncy = cy + dy[k];
                    if (ncx < 0 || ncx >= nx || ncy < 0 || ncy >= ny) continue;

                    bool hitOwn = k switch
                    {
                        0 => ownBlockedRight[cy * nx + cx],
                        1 => ownBlockedRight[cy * nx + ncx],
                        2 => ownBlockedDown[cy * nx + cx],
                        _ => ownBlockedDown[ncy * nx + cx]
                    };
                    if (hitOwn) continue;

                    bool hitExt = k switch
                    {
                        0 => extBlockedRight[cy * nx + cx],
                        1 => extBlockedRight[cy * nx + ncx],
                        2 => extBlockedDown[cy * nx + cx],
                        _ => extBlockedDown[ncy * nx + cx]
                    };
                    if (hitExt && !allowExtObstacles) continue;

                    int nDir = k < 2 ? 0 : 1;
                    double x1 = xs[cx], y1 = ys[cy];
                    double x2 = xs[ncx], y2 = ys[ncy];

                    double segLen = Math.Abs(x2 - x1) + Math.Abs(y2 - y1);
                    double stepPenalty = hitExt ? 12000.0 : 0.0;

                    if (nDir != dir)
                    {
                        stepPenalty += BendPenalty;
                    }
                    else if (parent[state] != -1)
                    {
                        int pCell = parent[state] >> 1;
                        int px = pCell % nx;
                        int py = pCell / nx;
                        if ((ncx - cx) * (cx - px) < 0 || (ncy - cy) * (cy - py) < 0)
                            continue;
                    }

                    var dummySeg = new WireSegment(x1, y1, x2, y2);
                    if (ViolatesOwnInterior(dummySeg, req.StartCompBox, origS, req.StartDir, req.StartInnerRowPitchOffset)
                     || ViolatesOwnInterior(dummySeg, req.EndCompBox, origE, req.EndDir, req.EndInnerRowPitchOffset))
                        stepPenalty += 10000.0;

                    if (breadboardSoftBox != null && BreadboardInteriorViolation(dummySeg, breadboardSoftBox, origS, origE))
                        stepPenalty += 120.0;

                    if ((nDir == 0 && tracks.OverlapsHorizontal(y1, x1, x2, req.BusGroupKey, origS, origE))
                     || (nDir == 1 && tracks.OverlapsVertical(x1, y1, y2, req.BusGroupKey, origS, origE)))
                        stepPenalty += 3000.0;

                    double nextCost = curCost + segLen + stepPenalty;
                    int nState = ((ncy * nx + ncx) * 2) + nDir;
                    if (nextCost < dist[nState])
                    {
                        dist[nState] = nextCost;
                        parent[nState] = state;
                        pq.Enqueue(nState, nextCost + Manhattan(x2, y2, xs[ex], ys[ey]));
                    }
                }
            }

            if (bestGoalState == -1) return null;

            var rawPts = new List<WirePoint>();
            var seenStates = new HashSet<int>();
            int trace = bestGoalState;
            while (trace != -1 && seenStates.Add(trace))
            {
                int cell = trace >> 1;
                rawPts.Add(new WirePoint(xs[cell % nx], ys[cell / nx]));
                trace = parent[trace];
            }
            rawPts.Reverse();

            var segs = new List<WireSegment>(rawPts.Count + 4);
            AppendOutwardPrefix(segs, origS, sStag, rawPts[0]);
            for (int i = 0; i < rawPts.Count - 1; i++)
            {
                segs.Add(new WireSegment(rawPts[i].X, rawPts[i].Y, rawPts[i + 1].X, rawPts[i + 1].Y));
            }
            AppendInwardSuffix(segs, rawPts[^1], eStag, origE);
            return segs;
        }

        return RunSearch(allowExtObstacles: false, maxExpandedLimit: 1800) ?? RunSearch(allowExtObstacles: true, maxExpandedLimit: 650);
    }

    private static int FindNearestIndex(double[] arr, double val)
    {
        int best = 0;
        double bestDiff = double.PositiveInfinity;
        for (int i = 0; i < arr.Length; i++)
        {
            double d = Math.Abs(arr[i] - val);
            if (d < bestDiff)
            {
                bestDiff = d;
                best = i;
            }
        }
        return best;
    }

    private static double Manhattan(double x1, double y1, double x2, double y2) => Math.Abs(x1 - x2) + Math.Abs(y1 - y2);
    private static double DistSq(WirePoint a, WirePoint b) => (a.X - b.X) * (a.X - b.X) + (a.Y - b.Y) * (a.Y - b.Y);
    private static bool IsHorizontal(CardinalDir d) => d == CardinalDir.Left || d == CardinalDir.Right;

    public static bool SegmentIntersectsBox(double x1, double y1, double x2, double y2, WireObstacle box)
    {
        double minX = Math.Min(x1, x2);
        double maxX = Math.Max(x1, x2);
        double minY = Math.Min(y1, y2);
        double maxY = Math.Max(y1, y2);

        if (Math.Abs(y1 - y2) < 0.5)
        {
            if (y1 > box.MinY + 0.5 && y1 < box.MaxY - 0.5)
            {
                double overlap = Math.Min(maxX, box.MaxX) - Math.Max(minX, box.MinX);
                if (overlap > 1.5) return true;
            }
        }
        else if (Math.Abs(x1 - x2) < 0.5)
        {
            if (x1 > box.MinX + 0.5 && x1 < box.MaxX - 0.5)
            {
                double overlap = Math.Min(maxY, box.MaxY) - Math.Max(minY, box.MinY);
                if (overlap > 1.5) return true;
            }
        }
        return false;
    }

    private static bool ViolatesOwnInterior(
        WireSegment seg,
        WireObstacle? ownBox,
        WirePoint ownPin,
        CardinalDir ownDir,
        double innerStaggerOffset)
    {
        if (ownBox == null) return false;
        var inner = new WireObstacle(ownBox.LocalId, ownBox.MinX + 4, ownBox.MaxX - 4, ownBox.MinY + 4, ownBox.MaxY - 4);
        if (inner.MaxX <= inner.MinX || inner.MaxY <= inner.MinY) return false;
        if (!SegmentIntersectsBox(seg.X1, seg.Y1, seg.X2, seg.Y2, inner)) return false;

        bool hasStagger = Math.Abs(innerStaggerOffset) > 0.1;
        bool isH = Math.Abs(seg.Y1 - seg.Y2) < 0.5;
        bool isV = Math.Abs(seg.X1 - seg.X2) < 0.5;

        if (ownDir != CardinalDir.None)
        {
            bool expectH = IsHorizontal(ownDir);
            var staggeredPin = hasStagger
                ? (expectH ? new WirePoint(ownPin.X, ownPin.Y + innerStaggerOffset) : new WirePoint(ownPin.X + innerStaggerOffset, ownPin.Y))
                : ownPin;

            if (hasStagger && isH != expectH)
            {
                bool isExactStagger = ((Math.Abs(seg.X1 - ownPin.X) < 1.0 && Math.Abs(seg.Y1 - ownPin.Y) < 1.0 &&
                                        Math.Abs(seg.X2 - staggeredPin.X) < 1.0 && Math.Abs(seg.Y2 - staggeredPin.Y) < 1.0)
                                    || (Math.Abs(seg.X2 - ownPin.X) < 1.0 && Math.Abs(seg.Y2 - ownPin.Y) < 1.0 &&
                                        Math.Abs(seg.X1 - staggeredPin.X) < 1.0 && Math.Abs(seg.Y1 - staggeredPin.Y) < 1.0));
                return !isExactStagger;
            }

            if (expectH && !isH) return true;
            if (!expectH && !isV) return true;

            bool touchesOrigin = (Math.Abs(seg.X1 - ownPin.X) < 1.0 && Math.Abs(seg.Y1 - ownPin.Y) < 1.0)
                              || (Math.Abs(seg.X2 - ownPin.X) < 1.0 && Math.Abs(seg.Y2 - ownPin.Y) < 1.0)
                              || (hasStagger && ((Math.Abs(seg.X1 - staggeredPin.X) < 1.0 && Math.Abs(seg.Y1 - staggeredPin.Y) < 1.0)
                                              || (Math.Abs(seg.X2 - staggeredPin.X) < 1.0 && Math.Abs(seg.Y2 - staggeredPin.Y) < 1.0)));
            if (!touchesOrigin) return true;

            const double tol = 1.0;
            bool validOutward = ownDir switch
            {
                CardinalDir.Left => Math.Max(seg.X1, seg.X2) <= staggeredPin.X + tol,
                CardinalDir.Right => Math.Min(seg.X1, seg.X2) >= staggeredPin.X - tol,
                CardinalDir.Up => Math.Max(seg.Y1, seg.Y2) <= staggeredPin.Y + tol,
                CardinalDir.Down => Math.Min(seg.Y1, seg.Y2) >= staggeredPin.Y - tol,
                _ => false
            };
            if (!validOutward) return true;

            return OverlapLengthWithBox(seg, inner) > 42.0;
        }

        bool touchesPin = (Math.Abs(seg.X1 - ownPin.X) < 1.0 && Math.Abs(seg.Y1 - ownPin.Y) < 1.0)
                       || (Math.Abs(seg.X2 - ownPin.X) < 1.0 && Math.Abs(seg.Y2 - ownPin.Y) < 1.0);
        if (!touchesPin) return true;

        return OverlapLengthWithBox(seg, inner) > 42.0;
    }

    private static bool BreadboardInteriorViolation(WireSegment seg, WireObstacle bbBox, WirePoint s, WirePoint e)
    {
        var inner = new WireObstacle(bbBox.LocalId, bbBox.MinX + 6, bbBox.MaxX - 6, bbBox.MinY + 6, bbBox.MaxY - 6);
        if (!SegmentIntersectsBox(seg.X1, seg.Y1, seg.X2, seg.Y2, inner)) return false;
        // Allow short entry stub into target hole inside breadboard
        bool touchesEnd = (Math.Abs(seg.X1 - e.X) < 1.0 && Math.Abs(seg.Y1 - e.Y) < 1.0)
                       || (Math.Abs(seg.X2 - e.X) < 1.0 && Math.Abs(seg.Y2 - e.Y) < 1.0)
                       || (Math.Abs(seg.X1 - s.X) < 1.0 && Math.Abs(seg.Y1 - s.Y) < 1.0)
                       || (Math.Abs(seg.X2 - s.X) < 1.0 && Math.Abs(seg.Y2 - s.Y) < 1.0);
        if (!touchesEnd) return true;
        return OverlapLengthWithBox(seg, inner) > 65.0;
    }

    private static double OverlapLengthWithBox(WireSegment seg, WireObstacle box)
    {
        if (Math.Abs(seg.Y1 - seg.Y2) < 0.5)
            return Math.Max(0.0, Math.Min(Math.Max(seg.X1, seg.X2), box.MaxX) - Math.Max(Math.Min(seg.X1, seg.X2), box.MinX));
        if (Math.Abs(seg.X1 - seg.X2) < 0.5)
            return Math.Max(0.0, Math.Min(Math.Max(seg.Y1, seg.Y2), box.MaxY) - Math.Max(Math.Min(seg.Y1, seg.Y2), box.MinY));
        return 0.0;
    }

    /// <summary>
    /// Removes zero-length segments, merges same-direction collinear runs, and collapses 180-degree foldbacks.
    /// </summary>
    public static List<WireSegment> CleanSegments(List<WireSegment> input)
    {
        var segs = new List<WireSegment>(input);
        bool changed = true;
        while (changed)
        {
            changed = false;
            for (int i = segs.Count - 1; i >= 0; i--)
            {
                if (Math.Abs(segs[i].X1 - segs[i].X2) < 0.1 && Math.Abs(segs[i].Y1 - segs[i].Y2) < 0.1)
                {
                    segs.RemoveAt(i);
                    changed = true;
                }
            }
            for (int i = 0; i < segs.Count - 1; i++)
            {
                var a = segs[i];
                var b = segs[i + 1];
                bool bothH = Math.Abs(a.Y1 - a.Y2) < 0.5 && Math.Abs(b.Y1 - b.Y2) < 0.5 && Math.Abs(a.Y2 - b.Y1) < 0.5;
                bool bothV = Math.Abs(a.X1 - a.X2) < 0.5 && Math.Abs(b.X1 - b.X2) < 0.5 && Math.Abs(a.X2 - b.X1) < 0.5;
                if (bothH || bothV)
                {
                    segs[i] = new WireSegment(a.X1, a.Y1, b.X2, b.Y2);
                    segs.RemoveAt(i + 1);
                    changed = true;
                    break;
                }
            }
        }
        return segs;
    }

    /// <summary>
    /// Builds an SVG path string with quadratic rounded corners.
    /// </summary>
    public static string BuildPathData(IReadOnlyList<WireSegment> segments, double cornerRadius = 8.0)
    {
        if (segments.Count == 0) return "";
        var inv = CultureInfo.InvariantCulture;
        var path = new StringBuilder();
        path.Append($"M {segments[0].X1.ToString(inv)} {segments[0].Y1.ToString(inv)} ");

        for (int i = 0; i < segments.Count - 1; i++)
        {
            var current = segments[i];
            var next = segments[i + 1];

            double dx1 = current.X2 - current.X1;
            double dy1 = current.Y2 - current.Y1;
            double dx2 = next.X2 - next.X1;
            double dy2 = next.Y2 - next.Y1;

            double len1 = Math.Sqrt(dx1 * dx1 + dy1 * dy1);
            double len2 = Math.Sqrt(dx2 * dx2 + dy2 * dy2);
            bool isStraight = Math.Abs(dx1 * dy2 - dx2 * dy1) < 1e-3 && (dx1 * dx2 + dy1 * dy2 >= 0);

            if (len1 < 0.001 || len2 < 0.001 || isStraight)
            {
                path.Append($"L {current.X2.ToString(inv)} {current.Y2.ToString(inv)} ");
                continue;
            }

            double trim1 = Math.Min(cornerRadius, len1 / 2.0);
            double trim2 = Math.Min(cornerRadius, len2 / 2.0);

            double newX1 = current.X2 - (dx1 / len1) * trim1;
            double newY1 = current.Y2 - (dy1 / len1) * trim1;
            double newX2 = next.X1 + (dx2 / len2) * trim2;
            double newY2 = next.Y1 + (dy2 / len2) * trim2;

            path.Append($"L {newX1.ToString(inv)} {newY1.ToString(inv)} ");
            path.Append($"Q {current.X2.ToString(inv)} {current.Y2.ToString(inv)}, {newX2.ToString(inv)} {newY2.ToString(inv)} ");
        }

        var last = segments[^1];
        path.Append($"L {last.X2.ToString(inv)} {last.Y2.ToString(inv)} ");
        return path.ToString();
    }

    private enum PathDir { Right, Left, Down, Up }

    /// <summary>
    /// Builds offset boundary paths for marching-ants hover animation cleanly and safely.
    /// </summary>
    public static string BorderPathData(string path, double offset)
    {
        if (string.IsNullOrWhiteSpace(path)) return "";
        var tokens = path.Replace(",", " , ").Split(' ', StringSplitOptions.RemoveEmptyEntries);
        if (tokens.Length < 6) return "";

        var inv = CultureInfo.InvariantCulture;
        var result = new StringBuilder();
        double startX = double.Parse(tokens[1], inv);
        double startY = double.Parse(tokens[2], inv);
        double nextX = double.Parse(tokens[4], inv);
        double nextY = double.Parse(tokens[5], inv);

        PathDir direction;
        if (nextX > startX)
        {
            startY -= offset;
            direction = PathDir.Right;
        }
        else if (nextX < startX)
        {
            startY += offset;
            direction = PathDir.Left;
        }
        else if (nextY > startY)
        {
            startX += offset;
            direction = PathDir.Down;
        }
        else
        {
            startX -= offset;
            direction = PathDir.Up;
        }

        result.Append($"M {startX.ToString(inv)} {startY.ToString(inv)} ");
        for (int i = 3; i < tokens.Length;)
        {
            string command = tokens[i++];
            if (command == "L" && i + 1 < tokens.Length)
            {
                double x = double.Parse(tokens[i++], inv);
                double y = double.Parse(tokens[i++], inv);
                switch (direction)
                {
                    case PathDir.Right: y -= offset; break;
                    case PathDir.Left: y += offset; break;
                    case PathDir.Down: x += offset; break;
                    case PathDir.Up: x -= offset; break;
                }
                result.Append($"L {x.ToString(inv)} {y.ToString(inv)} ");
            }
            else if (command == "Q" && i + 4 < tokens.Length)
            {
                double centerX = double.Parse(tokens[i++], inv);
                double centerY = double.Parse(tokens[i++], inv);
                i++; // skip ","
                double x = double.Parse(tokens[i++], inv);
                double y = double.Parse(tokens[i++], inv);
                direction = OffsetCorner(ref centerX, ref centerY, ref x, ref y, direction, offset);
                result.Append($"Q {centerX.ToString(inv)} {centerY.ToString(inv)}, {x.ToString(inv)} {y.ToString(inv)} ");
            }
        }
        return result.ToString();
    }

    private static PathDir OffsetCorner(ref double centerX, ref double centerY, ref double x, ref double y, PathDir direction, double offset)
    {
        switch (direction)
        {
            case PathDir.Right:
                if (y < centerY) { centerX -= offset; centerY -= offset; x -= offset; return PathDir.Up; }
                if (y > centerY) { centerX += offset; centerY -= offset; x += offset; return PathDir.Down; }
                break;
            case PathDir.Left:
                if (y < centerY) { centerX -= offset; centerY += offset; x -= offset; return PathDir.Up; }
                if (y > centerY) { centerX += offset; centerY += offset; x += offset; return PathDir.Down; }
                break;
            case PathDir.Down:
                if (x > centerX) { centerX += offset; centerY -= offset; y -= offset; return PathDir.Right; }
                if (x < centerX) { centerX += offset; centerY += offset; y += offset; return PathDir.Left; }
                break;
            case PathDir.Up:
                if (x > centerX) { centerX -= offset; centerY -= offset; y -= offset; return PathDir.Right; }
                if (x < centerX) { centerX -= offset; centerY += offset; y += offset; return PathDir.Left; }
                break;
        }
        return direction;
    }
}
