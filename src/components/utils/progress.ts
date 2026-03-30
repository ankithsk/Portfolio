export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  // Quick burst to ~15% so the bar looks alive immediately
  let interval = setInterval(() => {
    if (percent < 15) {
      percent += 3;
      setLoading(percent);
    } else {
      clearInterval(interval);
    }
  }, 80);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      setLoading(100);
      resolve(100);
    });
  }

  return { loaded, percent, clear };
};
