import testTree from '../demoTree';
import { deleteItemInArray , updateItemInArray, putItemInArray, updateByPath, deleteByPath, createByPath} from '../immutabilityHelper';


describe('deleteItemInArray', () => {
  let arr;
  let newArr;

  beforeEach(() => {
    arr = [ { key: 'value1'}, { key: 'value2'} ];
    newArr = deleteItemInArray(arr, 0);
  });

  test('should create new instance', () => {
    expect(arr === newArr).toBe(false);
  });

  test('the item should\'ve been deleted', () => {  
    expect(newArr.length).toEqual(1);
    expect(newArr[0].key).toEqual('value2');
  });

  test('other items should remain unchanged', () => {
      expect(arr[1]).toBe(newArr[0]);
  });

})

describe('updateItemInArray', () => {
  let arr;
  let newArr;

  beforeEach(() => {
    arr = [ { key: 'value1'}, { key: 'value2'} ];
    newArr = updateItemInArray(arr, 0, { value: 'new' });
  });

  test('should create new instance', () => {
    expect(arr === newArr).toBe(false);
  });

  test('the item should\'ve been updated', () => {  
    expect(newArr[0].value).toEqual('new');
  });

  test('other items should remain unchanged', () => {
      expect(newArr[1]).toBe(arr[1]);
  });
});

describe('putItemInArray', () => {
  let arr;
  let newArr;
  const insertingObject = { key: 'value2' };

  beforeEach(() => {
    arr = [ { key: 'value1'} ];
    newArr = putItemInArray(arr, insertingObject);
  });

  test('should create new instance', () => {
    expect(arr === newArr).toBe(false);
  });

  test('the item should\'ve been put', () => {  
    expect(newArr.length).toBe(2);
    expect(newArr[1]).toBe(insertingObject);
  });

  test('other items should remain unchanged', () => {
      expect(newArr[0]).toBe(arr[0]);
  });
});

describe('updateByPath', () => {
  let tree;
  let newTree;
  beforeEach(() => {
    tree = testTree;
    newTree = updateByPath(tree, [0], { value: 'Element #0', childNodes: [] });
  });

  test('should create new instance', () => {
    expect(tree === newTree).toBe(false);
  });

  test('should update object at specified path', () => {
    expect(newTree.childNodes[0].value).toEqual('Element #0');
    newTree = updateByPath(newTree, [2, 0], { value: 'Element #0', childNodes: [] });
    expect(newTree.childNodes[2].childNodes[0].value).toEqual('Element #0');
  });

  test('all objects on direct path to updated entity should be recreated', () => {
    newTree = updateByPath(newTree, [2, 0], { value: 'Element #0', childNodes: [] });
    expect(tree === newTree).toBe(false);
    expect(tree.childNodes[2] === newTree.childNodes[2]).toBe(false);
    expect(tree.childNodes[2].childNodes[0] === newTree.childNodes[2].childNodes[0]).toBe(false);
  });

  test('other fields should be left untouched', () => {
    expect(tree.childNodes[1] === newTree.childNodes[1]).toBe(true);
    expect(tree.childNodes[2] === newTree.childNodes[2]).toBe(true);
  });
 
});


describe('createByPath', () => {
  let tree;
  let newTree;
  beforeEach(() => {
    tree = testTree;
    newTree = createByPath(tree, [ 0 ], { value: 'Test', childNodes: [] });
  })

  test('should create new instance', () => {
    expect(tree === newTree).toBe(false);
  });

  test('should create new object at path', () => {
    expect(newTree.childNodes[0].childNodes[0].value).toEqual('Test');
    newTree = createByPath(tree, [ 0 ], { value: 'k' });
    let nTree = { childNodes: [] };
    nTree = createByPath(nTree, [], { value: 'kkk' });
    expect(nTree.childNodes.length).toBe(1);
  });

  test('should create new object at deep path', () => {
    newTree = createByPath(tree, [2, 0], { value: 'Test', childNodes: [] });
    expect(newTree.childNodes[2].childNodes[0].childNodes[4].value).toEqual('Test');
  });

  test('other fields should be untouched', () => {
    expect(tree.childNodes[1]).toBe(newTree.childNodes[1]);
  });
});


describe('delete by path', () => {
  let tree;
  let newTree;
  beforeEach(() => {
    tree = testTree;
    newTree = deleteByPath(tree, [ 0 ]);
  });

  test('should create new instance', () => {
    expect(tree === newTree).toBe(false);
  })

  test('should delete object by its path', () => {
    expect(newTree.childNodes.length).toBeLessThan(tree.childNodes.length);
    expect(newTree.childNodes[0]).toBe(tree.childNodes[1]);
  });

  test('should delete object by deep path', () => {
    newTree = deleteByPath(tree, [2, 0, 0]);
    expect(newTree.childNodes[2].childNodes[0].childNodes.length).toBeLessThan(tree.childNodes[2].childNodes[0].childNodes.length);
    expect(newTree.childNodes[2].childNodes[0].childNodes[0]).toBe(tree.childNodes[2].childNodes[0].childNodes[1]);
  });

  test('other fields should be untouched', () => {
    expect(tree.childNodes[1]).toBe(newTree.childNodes[0]);
  })

});
