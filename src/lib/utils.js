export function cn(...inputs) {
  return inputs
    .flat()
    .filter(Boolean)
    .map((x) => (typeof x === 'object' && x !== null ? Object.keys(x).filter((k) => x[k]).join(' ') : x))
    .join(' ')
    .trim();
}
