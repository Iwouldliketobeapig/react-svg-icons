export const compose = (...funs) => {
  if (funs.length === 0) return (...args) => args;
  if (funs.length === 1) return (...args) => funs[0](...args);
  return funs.reduce((acc, next) => (...args) => next(acc(...args)));
}