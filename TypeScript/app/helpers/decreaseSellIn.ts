import { Item } from "@/classes/item";

export const decreaseSellIn = (item: Item) => (item.sellIn -= 1);
