import shortid from "shortid";

export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
  // First sidebar item with one column
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: COLUMN,
      id: "column1",
      children: [
        {
          type: COLUMN,
          id: "column1-1",
          children: []
        }
      ]
    }
  },
  // Second sidebar item with two columns
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: COLUMN,
      id: "column2",
      children: [
        {
          type: COLUMN,
          id: "column2-1",
          children: []
        },
        {
          type: COLUMN,
          id: "column2-2",
          children: []
        }
      ]
    }
  },
  // Other sidebar items with no columns initially
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: COLUMN,
      id: "column3",
      children: []
    }
  },
  {
    id: shortid.generate(),
    type: SIDEBAR_ITEM,
    component: {
      type: COLUMN,
      id: "column4",
      children: []
    }
  }
  // Add more columns if needed
];
