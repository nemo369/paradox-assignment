export const randomFromArr = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)];
}