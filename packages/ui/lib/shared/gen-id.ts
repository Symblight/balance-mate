export function* generateUniqueKey(name = "") {
  const key = `pv-key-${name}`;
  let i = 0;
  while (true) {
    // eslint-disable-next-line no-plusplus
    yield key + i++;
  }
}
