export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomDecimal(min: number, max: number, decimalPlaces: number = 2): string {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces);
}
