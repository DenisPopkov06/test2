export const debounce = (fn, ms = 150) => {
  let t;

  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};
