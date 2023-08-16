const createStash = (items, size, step) => items.map(({ name: columName }) => {
  const columData = [];

  for (let i = 0; i < size; i += step) {
    columData.push({
      columWeight: i + step,
      columValue: null,
      columItems: []
    });
  }

  return {
    columName,
    columData
  };
});

const fillBox = (items, size, step) => {
  let box = createStash(items, size, step);

  box.forEach(({ columData }, columIndex) => {
    columData.forEach((cell, cellIndex) => {
      const columDataStash = columIndex > 0
        ? box[columIndex - 1].columData
        : null;
      const columValueStash = columDataStash
        ? box[columIndex - 1].columData[cellIndex].columValue
        : null;
      const columItemsStash = columDataStash
        ? box[columIndex - 1].columData[cellIndex].columItems
        : null;

      if (items[columIndex].weight > cell.columWeight) {
        cell.columValue = columValueStash || 0;
        if (columItemsStash) cell.columItems = columItemsStash;
      }

      if (items[columIndex].weight === cell.columWeight && columIndex === 0) {
        cell.columValue = items[columIndex].value;
        cell.columItems = [items[columIndex].name];
      }

      if (items[columIndex].weight === cell.columWeight && columIndex > 0) {
        cell.columValue = columValueStash > items[columIndex].value
          ? columValueStash
          : items[columIndex].value;

        cell.columItems = columValueStash > items[columIndex].value
          ? columItemsStash
          : [items[columIndex].name];
      }

      if (items[columIndex].weight < cell.columWeight && columIndex === 0) {
        cell.columValue = items[columIndex].value;
        cell.columItems = [items[columIndex].name];
      }

      if (items[columIndex].weight < cell.columWeight  && columIndex > 0) {
        const emptySpace = cell.columWeight - items[columIndex].weight;
        const dataSpace = columDataStash.find(({ columWeight }) => columWeight === emptySpace);
        const valueSpace = dataSpace ? dataSpace.columValue : 0;
        const itemSpace = dataSpace ? dataSpace.columItems : [];

        cell.columValue = items[columIndex].value + valueSpace > columValueStash
          ? items[columIndex].value + valueSpace
          : columValueStash;

        cell.columItems = items[columIndex].value + valueSpace > columValueStash
          ? [items[columIndex].name].concat(itemSpace)
          : columItemsStash;
      }
    });
  });

  console.log('-------------- Result --------------');
  box.forEach((boxItem) => {
    console.log(`Name: ${boxItem.columName}`);
    console.log(boxItem.columData);
  })
};

const stashSize = 4; // Pounds
// const stashSize = 3.5; // Days

const stashStep = 1; // Pounds step
// const stashStep = .5; // Days step

const itemStash = [{
  name: 'Laptop',
  value: 3000, // USD
  weight: 4 // Pounds
}, {
  name: 'Tablet',
  value: 2000, // USD
  weight: 3 // Pounds
}, {
  name: 'Phone',
  value: 1500, // USD
  weight: 1 // Pounds
}];

// const itemStash = [{
//   name: 'Stonehenge',
//   value: 1, // Interest in 10 points
//   weight: .5 // Days for visit
// }, {
//   name: 'Big Ben',
//   value: 8, // Interest in 10 points
//   weight: .5 // Days for visit
// }, {
//   name: 'Buckingham Palace',
//   value: 7, // Interest in 10 points
//   weight: 1 // Days for visit
// }, {
//   name: 'Windsor Castle',
//   value: 1, // Interest in 10 points
//   weight: 1.5 // Days for visit
// }, {
//   name: 'Roman Baths',
//   value: 10, // Interest in 10 points
//   weight: 1 // Days for visit
// }, {
//   name: 'Tower of London',
//   value: 8, // Interest in 10 points
//   weight: 2 // Days for visit
// }, {
//   name: 'Hadrian’s Wall',
//   value: 6, // Interest in 10 points
//   weight: 1.5 // Days for visit
// }];

fillBox(itemStash, stashSize, stashStep);
