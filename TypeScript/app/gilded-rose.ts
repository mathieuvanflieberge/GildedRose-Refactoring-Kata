import { Item } from "./classes/item";
import {
  updateQualityBasedOnSellIn,
  updateQualityForBackstagePasConcert,
  updateQualityForLegendaryItem,
  updateQualityForConjuredItem,
  updateQualityForNormalItem,
} from "./updateItem";

const itemsThatIncreaseInQualityTheOlderTheyGet = ["Aged Brie"];
const backstagePassUid = "Backstage pass";
const legendaryItemUid = "Sulfuras";
const conjuredUid = "Conjured";

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality(): Item[] {
    this.items.forEach((currentItem: Item) => {
      const { name } = currentItem;

      if (itemsThatIncreaseInQualityTheOlderTheyGet.includes(name))
        return updateQualityBasedOnSellIn(currentItem);

      if (name.includes(backstagePassUid))
        return updateQualityForBackstagePasConcert(currentItem);

      if (name.includes(legendaryItemUid))
        return updateQualityForLegendaryItem(currentItem);

      if (name.includes(conjuredUid))
        return updateQualityForConjuredItem(currentItem);

      return updateQualityForNormalItem(currentItem);
    });
    return this.items;
  }
}
