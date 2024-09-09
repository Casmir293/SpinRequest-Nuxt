// Exclude console.log() in production
export const logger = (...arg: any) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(JSON.stringify(arg, null, 2));
  }
};
