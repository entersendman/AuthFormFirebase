export const mergeStyles = value => value
  .filter(([style, predicate = true]) => predicate)
  .map(([style]) => style);
