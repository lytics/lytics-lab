import { Field } from "../../pfa-fields";

export const URLContains: Field = {
  id: "urlContains",
  label: "URL Contains",
  description:
    "Show only when the URL meets the requirements of defined match conditions.",
  type: "array",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.urlContains",
};
