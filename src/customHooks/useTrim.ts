export const useTrim = (string: string, count: number) => {
  if (string.length < count) {
    return string;
  }
  return `${string.slice(0, count)}...`;
};

