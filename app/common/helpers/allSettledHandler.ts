export const allSettledHandler = (
  promiseResults: PromiseSettledResult<any>[]
) => {
  return promiseResults.map((promise) => {
    return promise.status === "fulfilled" ? promise.value : promise.reason;
  });
};
