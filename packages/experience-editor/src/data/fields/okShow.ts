import { Field } from "../pfa-fields";

export const OKShow: Field = {
  id: "okShow",
  label: "Show Confirm Button",
  description: "Whether or not to show the OK button",
  type: "boolean",
  method: "checkbox",
  required: false,
  hidden: false,
  dependencies: [
    {
      value: true,
      fieldsToShow: ["okMessage"],
    },
  ],
  render: "config.okShow",
};
