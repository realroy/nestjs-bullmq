export async function sleep(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFail(percentage: number = 100) {
  if (percentage > 100) {
    throw new Error('Percentage must be less than 100');
  }

  if (percentage < 0) {
    throw new Error('Percentage must be greater than 0');
  }

  return random(0, 100) < percentage;
}
