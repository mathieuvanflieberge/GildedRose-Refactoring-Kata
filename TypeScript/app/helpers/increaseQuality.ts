const MAX_QUALITY = 50;

export const increaseQuality = (quality: number, amount: number = 1) =>
  quality < MAX_QUALITY ? quality + amount : quality;
