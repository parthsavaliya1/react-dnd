import { COMPONENT, ROW, COLUMN } from "./constant";

const initialData = {
  layout: [
    {
      type: ROW,
      id: "row1",
      children: [
        {
          type: COLUMN,
          id: "column1",
          children: [
          ]
        },
      ]
    },
    {
      type: ROW,
      id: "row2",
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
    }
  ],
  components: {
    component1: { id: "column1", type: "column1", content: "column1" },
    component1: { id: "column2", type: "column2", content: "column2" },
    component2: { id: "column3", type: "column3", content: "Some email" },
    component3: { id: "column4", type: "column4", content: "Some name" },
    component4: { id: "column5", type: "column5", content: "Some phone" }
  }
};

export default initialData;
