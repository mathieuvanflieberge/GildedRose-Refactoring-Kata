# Gilded Rose Refactoring Kata

This repository contains my solution to the **Gilded Rose Refactoring Kata**, refactored in **TypeScript**. The Gilded Rose Kata is a well-known exercise that focuses on refactoring and improving the design of existing code, ensuring maintainability and extensibility. In this refactor, I followed object-oriented principles to improve code structure, readability, and extendability.

## Refactoring Approach

The refactoring approach focuses on simplifying and organizing the logic behind updating the quality of different items in the store. The main goal was to handle each item type (e.g., `Aged Brie`, `Backstage passes`, etc.) individually using a set of helper functions, while adhering to the **Open/Closed Principle**.

### Key Changes:

- **Modularized logic**: Separated the logic for updating the quality of different item types into specific helper functions (e.g., `updateQualityForBackstagePasConcert`, `updateQualityForLegendaryItem`, etc.).
- **Simplified conditionals**: Consolidated repeated code (like updating quality and sell-in values) into helper functions to avoid duplication and make the code more maintainable.
- **Better item handling**: Each item type has its own logic for updating its quality and sell-in values, which makes it easier to extend the application with new types of items in the future.

### The `updateQuality` function

The `updateQuality` function iterates through each item and applies the appropriate helper function based on the item's characteristics. The main changes include:

1. **Items that increase in quality as they get older** (like `Aged Brie`) are handled by the `updateQualityBasedOnSellIn` function.
2. **Backstage passes** are handled by `updateQualityForBackstagePasConcert`, which takes into account the quality increase based on sell-in values.
3. **Legendary items** have a fixed quality of 80, so they're handled by `updateQualityForLegendaryItem`.
4. **Conjured items** are processed by `updateQualityForConjuredItem`, where quality is adjusted differently depending on sell-in values.
5. **Normal items** are processed by the `updateQualityForNormalItem` function.

The updated `updateQuality` function looks like this:

```typescript
updateQuality(): Item[] {
  this.items.forEach((currentItem: Item) => {
    const { name } = currentItem;
    const containsUid = (uid: string) => name.includes(uid);

    if (itemsThatIncreaseInQualityTheOlderTheyGet.includes(name))
      return updateQualityBasedOnSellIn(currentItem);

    if (containsUid(backstagePassUid))
      return updateQualityForBackstagePasConcert(currentItem);

    if (containsUid(legendaryItemUid))
      return updateQualityForLegendaryItem(currentItem);

    if (containsUid(conjuredUid))
      return updateQualityForConjuredItem(currentItem);

    return updateQualityForNormalItem(currentItem);
  });

  return this.items;
}
```

### Helper Functions

Several helper functions are used to handle specific logic for updating item quality and sell-in values:

- **`updateItemQuality`**: A helper function that decreases an item's quality based on whether its sell-in date has passed.
- **`getQualityLevelForConcert`**: A function that increases the quality of Backstage passes based on the remaining sell-in days.
- **`updateQualityBasedOnSellIn`**: Handles the logic for items that increase in quality as their sell-in date gets closer (e.g., `Aged Brie`).
- **`updateQualityForBackstagePasConcert`**: Special logic for updating the quality of Backstage passes.
- **`updateQualityForLegendaryItem`**: Ensures that legendary items always have a quality of 80.
- **`updateQualityForConjuredItem`**: Applies special logic to Conjured items, which degrade in quality twice as fast as normal items.
- **`updateQualityForNormalItem`**: Standard logic for handling normal items (decreases quality and sell-in).

## Setup Instructions

### Running the TextTest Fixture

You can also run the TextTest fixture from the command line to check the behavior of the items. You may need to install `ts-node` if you don’t have it installed: `npm install -g ts-node`

To run the test:

```bash
npx ts-node test/golden-master-text-test.ts
```

If you want to run the test with a custom number of days as an argument:

```bash
npx ts-node test/golden-master-text-test.ts 10
```

This will print the output for the specified number of days.

## Tests

This project uses **Jest** for testing. The tests are designed to verify that the refactored implementation produces the correct output for the Gilded Rose problem. The testing strategy mainly focuses on comparing the output of the `updateQuality` function with pre-approved snapshots.

### Snapshot Testing with Jest

Instead of manually writing individual test cases for each item, the tests are based on snapshot testing. When running the tests for the first time, Jest will generate a snapshot file (e.g., `approvals.spec.ts.snap`). This snapshot represents the expected output of the `updateQuality` function for a specific set of items after a certain number of days.

Whenever the implementation is modified, running the tests will compare the current output of `updateQuality` with the saved snapshot. If the output differs, Jest will alert you to the changes, allowing you to verify whether the new output is correct or whether the changes should be discarded.

### Running the Tests

To run the snapshot tests, use the following command:

```bash
npm run test:jest
```

## Contributing

Feel free to fork this repository and contribute improvements, bug fixes, or additional tests. Open a pull request to propose any changes.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or would like to get in touch, feel free to reach out to me:

**Name**: Mathieu Van Flieberge  
**Email**: [mathieu.van.flieberge@hotmail.com](mailto:mathieu.van.flieberge@hotmail.com)
