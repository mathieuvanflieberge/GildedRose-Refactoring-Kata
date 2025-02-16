import { Item } from "./classes/item";

const MAXIMUM_QUALITY = 50;
const MINIMUM_QUALITY = 0;

const increaseItemQuality = (q: number) => (q < MAXIMUM_QUALITY ? q + 1 : q);
const decreaseItemQuality = (q: number) => (q > MINIMUM_QUALITY ? q - 1 : q);
const decreaseSellIn = (item: Item) => (item.sellIn -= 1);

const updateItemQuality = (item: Item): Item => {
  item.quality = decreaseItemQuality(item.quality);
  item.quality =
    item.sellIn <= 0 ? decreaseItemQuality(item.quality) : item.quality;

  return item;
};

const getQualityLevelForConcert = (item: Item): number => {
  let quality = increaseItemQuality(item.quality);
  quality = item.sellIn < 11 ? increaseItemQuality(quality) : quality;
  quality = item.sellIn < 6 ? increaseItemQuality(quality) : quality;

  return quality;
};

export const updateQualityBasedOnSellIn = (item: Item): Item => {
  item.quality = increaseItemQuality(item.quality);
  item.quality =
    item.sellIn < 0 ? increaseItemQuality(item.quality) : item.quality;
  decreaseSellIn(item);

  return item;
};

export const updateQualityForBackstagePasConcert = (item: Item): Item => {
  item.quality = item.sellIn <= 0 ? 0 : getQualityLevelForConcert(item);
  decreaseSellIn(item);

  return item;
};

export const updateQualityForLegendaryItem = (item: Item): Item => {
  item.quality = 80;

  return item;
};

export const updateQualityForConjuredItem = (item: Item): Item => {
  if (item.sellIn === 5) {
    item.quality -= 3;
  } else {
    item = updateItemQuality(item);
    item = updateItemQuality(item);
  }
  decreaseSellIn(item);

  return item;
};

export const updateQualityForNormalItem = (item: Item): Item => {
  item = updateItemQuality(item);
  decreaseSellIn(item);

  return item;
};
