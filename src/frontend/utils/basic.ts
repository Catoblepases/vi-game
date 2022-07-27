export function randomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}

export function deleteItem(item: any, array: any[]) {
  const idx = array.indexOf(item);
  if (idx >= 0) {
    array.splice(idx, 1);
    console.log("delete " + item);
  }
}
