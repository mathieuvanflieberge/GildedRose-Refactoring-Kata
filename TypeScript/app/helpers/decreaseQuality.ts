const MIN_QUALITY = 0;

export const decreaseQuality = (quality: number, amount: number = 1) =>
  quality > MIN_QUALITY ? quality - amount : quality;
