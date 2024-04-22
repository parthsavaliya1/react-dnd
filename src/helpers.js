import shortid from "shortid";
import { ROW, COLUMN, COMPONENT } from "./constant";

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
    console.log('1')
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed); // inserting task in new index

  return result;
};

export const remove = (arr, index) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // part of the array after the specified index
  ...arr.slice(index + 1)
];

export const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index)
];

export const reorderChildren = (children, splitDropZonePath, splitItemPath) => {
        console.log('2')

  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0]);
    const itemIndex = Number(splitItemPath[0]);
    return reorder(children, itemIndex, dropZoneIndex);
  }

  const updatedChildren = [...children];

  const curIndex = Number(splitDropZonePath.slice(0, 1));

  // Update the specific node's children
  const splitDropZoneChildrenPath = splitDropZonePath.slice(1);
  const splitItemChildrenPath = splitItemPath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: reorderChildren(
      nodeChildren.children,
      splitDropZoneChildrenPath,
      splitItemChildrenPath
    )
  };

  return updatedChildren;
};

export const removeChildFromChildren = (children, splitItemPath) => {
        console.log('3')

  if (splitItemPath.length === 1) {
    const itemIndex = Number(splitItemPath[0]);
    return remove(children, itemIndex);
  }

  const updatedChildren = [...children];

  const curIndex = Number(splitItemPath.slice(0, 1));

  // Update the specific node's children
  const splitItemChildrenPath = splitItemPath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: removeChildFromChildren(
      nodeChildren.children,
      splitItemChildrenPath
    )
  };

  return updatedChildren;
};

export const addChildToChildren = (children, splitDropZonePath, item) => {
        console.log('4')

  if (splitDropZonePath.length === 1) {
    const dropZoneIndex = Number(splitDropZonePath[0]);
    return insert(children, dropZoneIndex, item);
  }

  const updatedChildren = [...children];

  const curIndex = Number(splitDropZonePath.slice(0, 1));

  // Update the specific node's children
  const splitItemChildrenPath = splitDropZonePath.slice(1);
  const nodeChildren = updatedChildren[curIndex];
  updatedChildren[curIndex] = {
    ...nodeChildren,
    children: addChildToChildren(
      nodeChildren.children,
      splitItemChildrenPath,
      item
    )
  };

  return updatedChildren;
};

export const handleMoveWithinParent = (
  layout,
  splitDropZonePath,
  splitItemPath
) => {
        console.log('5')

  return reorderChildren(layout, splitDropZonePath, splitItemPath);
};

export const handleAddColumDataToRow = layout => {
        console.log('6')

  const layoutCopy = [...layout];
  const COLUMN_STRUCTURE = {
    type: COLUMN,
    id: shortid.generate(),
    children: []
  };

  return layoutCopy.map(row => {
    if (!row.children.length) {
      row.children = [COLUMN_STRUCTURE];
    }
    return row;
  });
};

export const handleMoveToDifferentParent = (
  layout,
  splitDropZonePath,
  splitItemPath,
  item
) => {
        console.log('7')

  let newLayoutStructure;
  const COLUMN_STRUCTURE = {
    type: COLUMN,
    id: shortid.generate(),
    children: [item]
  };

  const ROW_STRUCTURE = {
    type: ROW,
    id: shortid.generate()
  };

  switch (splitDropZonePath.length) {
    case 1: {
      // moving column outside into new row made on the fly
      if (item.type === COLUMN) {
        newLayoutStructure = {
          ...ROW_STRUCTURE,
          children: [item]
        };
      } else {
        // moving component outside into new row made on the fly
        newLayoutStructure = {
          ...ROW_STRUCTURE,
          children: [COLUMN_STRUCTURE]
        };
      }
      break;
    }
    case 2: {
      // moving component outside into a row which creates column
      if (item.type === COMPONENT) {
        newLayoutStructure = COLUMN_STRUCTURE;
      } else {
        // moving column into existing row
        newLayoutStructure = item;
      }

      break;
    }
    default: {
      newLayoutStructure = item;
    }
  }

  let updatedLayout = layout;
  updatedLayout = removeChildFromChildren(updatedLayout, splitItemPath);
  updatedLayout = handleAddColumDataToRow(updatedLayout);
  updatedLayout = addChildToChildren(
    updatedLayout,
    splitDropZonePath,
    newLayoutStructure
  );

  return updatedLayout;
};

export const handleMoveSidebarComponentIntoParent = (
  layout,
  splitDropZonePath,
  item
) => {
    console.log('8',item)
  let newLayoutStructure;
  switch (item.id) {
    case "column1": {
      newLayoutStructure = {
        type: ROW,
        id: shortid.generate(),
        children: [{ type: COLUMN, id: shortid.generate(),  children: [
        {
          type: COLUMN,
          id: "column1",
          children: [
          ]
        },
      ] }]
      };
      break;
    }
    case 'column2': {
      newLayoutStructure = {
        type: COLUMN,
        id: shortid.generate(),
       children: [
        {
          type: COLUMN,
          id: "column1",
          children: [
            
          ]
          },
          
          {
          type: COLUMN,
          id: "column2",
          children: [
            
          ]
        }
      ]
      };
      break;
    }
      
      case 'column2': {
      newLayoutStructure = {
        type: COLUMN,
        id: shortid.generate(),
       children: [
        {
          type: COLUMN,
          id: "column1",
          children: [
            
          ]
          },
          
          {
          type: COLUMN,
          id: "column2",
          children: [
            
          ]
        }
      ]
      };
      break;
    }
      
      case 'column3': {
      newLayoutStructure = {
        type: COLUMN,
        id: shortid.generate(),
       children: [
        {
          type: COLUMN,
          id: "column1",
          children: [
            
          ]
          },
          
          {
          type: COLUMN,
          id: "column2",
          children: [
            
            ],
          
         },
          {
          type: COLUMN,
          id: "column3",
          children: [
            
            ],
          
        }
      ]
      };
      break;
    }
      
       case 'column4': {
      newLayoutStructure = {
        type: COLUMN,
        id: shortid.generate(),
       children: [
        {
          type: COLUMN,
          id: "column1",
          children: [
            
          ]
          },
          
          {
          type: COLUMN,
          id: "column2",
          children: [
            
            ],
          
         },
          {
          type: COLUMN,
          id: "column3",
          children: [
            
            ],
          
         },
          {
          type: COLUMN,
          id: "column4",
          children: [
            
            ],
          
        }
      ]
      };
      break;
    }
    default: {
      newLayoutStructure = item;
    }
  }

  return addChildToChildren(layout, splitDropZonePath, newLayoutStructure);
};

export const handleRemoveItemFromLayout = (layout, splitItemPath) => {
        console.log('9')

  return removeChildFromChildren(layout, splitItemPath);
};
