import { Item } from "./classes/item";
import { decreaseQuality } from "./helpers/decreaseQuality";
import { decreaseSellIn } from "./helpers/decreaseSellIn";
import { increaseQuality } from "./helpers/increaseQuality";

const updateItemQuality = (item: Item): Item => {
  item.quality = decreaseQuality(item.quality);
  item.quality =
    item.sellIn <= 0 ? decreaseQuality(item.quality) : item.quality;

  return item;
};

const getQualityLevelForConcert = ({ quality, sellIn }: Item): number => {
  const newQuality = increaseQuality(quality);
  if (sellIn <= 5) return increaseQuality(newQuality, 2);
  if (sellIn <= 10) return increaseQuality(newQuality);

  return newQuality;
};

export const updateQualityBasedOnSellIn = (item: Item): Item => {
  item.quality = increaseQuality(item.quality);
  item.quality = item.sellIn < 0 ? increaseQuality(item.quality) : item.quality;
  decreaseSellIn(item);

  return item;
};

export const updateQualityForBackstagePasConcert = (item: Item): Item => {
  item.quality = item.sellIn <= 0 ? 0 : getQualityLevelForConcert(item);
  decreaseSellIn(item);

  return item;
};

export const updateQualityForLegendaryItem = (item: Item): Item =>
  ({ ...item, quality: 80 } as Item);

export const updateQualityForConjuredItem = (item: Item): Item => {
  item.sellIn === 5
    ? (item.quality -= 3)
    : (item = updateItemQuality(updateItemQuality(item)));
  decreaseSellIn(item);

  return item;
};

export const updateQualityForNormalItem = (item: Item): Item => {
  item = updateItemQuality(item);
  decreaseSellIn(item);

  return item;
};
