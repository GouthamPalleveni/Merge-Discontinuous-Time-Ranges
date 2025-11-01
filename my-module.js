/**
   Merges discontinuous time ranges within a given threshold.

 * @param {Array<[number, number]>} ranges - Array of [start, end] ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted and merged non-overlapping ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
    if (!Array.isArray(ranges) || ranges.length === 0) {
        return [];
    }

    // Sort by start time so we can process ranges in order
    const sorted = ranges.slice().sort((a, b) => a[0] - b[0]);

    const merged = [];
    let current = [...sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
        const [start, end] = sorted[i];

        if (start <= current[1] + threshold) {
            current[1] = Math.max(current[1], end);
        } else {
            merged.push(current);
            current = [start, end];
        }
    }

    merged.push(current);
    return merged;
};

module.exports = mergeTimeRanges;
