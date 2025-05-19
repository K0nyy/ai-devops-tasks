function findPairs(arr, targetSum) {
  const pairs = [];
  const seen = new Set();

  for (let i = 0; i < arr.length; i++) {
    const complement = targetSum - arr[i];
    if (seen.has(complement)) {
      pairs.push([arr[i], complement]);
    }
    seen.add(arr[i]);
  }

  return pairs;
}
