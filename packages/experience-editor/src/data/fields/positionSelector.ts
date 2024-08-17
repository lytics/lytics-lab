import { Field } from "../pfa-fields";

export const PositionSelector: Field = {
  id: "positionSelector",
  label: "Position Selector (optional)",
  description:
    "DOM selector of the parent element you would like to insert the widget into.",
  type: "string",
  method: "input",
  required: false,
  hidden: true,
  render: "config.positionSelector",
};
