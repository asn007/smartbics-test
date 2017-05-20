export function deleteItemInArray(array, index) {
  return array.filter((val, currentIndex) => currentIndex !== index);
}

export function updateItemInArray(array, index, newItem) {
  return array.map((item, idx) => {
    if (idx !== index) return item;
    return newItem;
  });
}

export function putItemInArray(array, newItem) {
  return array.concat([newItem]);
}

export function updateObject(object, values) {
  return Object.assign({}, object, values);
}

export function updateByPath(object, path, newItem) {
  const idx = path.shift();
  if (!path.length)
    return updateObject(object, {
      childNodes: updateItemInArray(object.childNodes, idx, newItem)
    });

  return updateObject(object, {
    childNodes: updateItemInArray(
      object.childNodes,
      idx,
      updateByPath(object.childNodes[idx], path, newItem)
    )
  });
}

export function createByPath(object, path, newItem) {
  if (!path.length)
    return updateObject(object, {
      childNodes: putItemInArray(object.childNodes, newItem)
    });
  const idx = path.shift();
  return updateObject(object, {
    childNodes: updateItemInArray(
      object.childNodes,
      idx,
      createByPath(object.childNodes[idx], path, newItem)
    )
  });
}

export function deleteByPath(object, path) {
  const idx = path.shift();
  if (!path.length)
    return updateObject(object, {
      childNodes: deleteItemInArray(object.childNodes, idx)
    });

  return updateObject(object, {
    childNodes: updateItemInArray(
      object.childNodes,
      idx,
      deleteByPath(object.childNodes[idx], path)
    )
  });
}
