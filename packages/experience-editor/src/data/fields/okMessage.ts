import { Field } from "../pfa-fields";

export const OKMessage: Field = {
  id: "okMessage",
  label: "Confirm Button Text",
  description: "The message to display on the OK button",
  type: "string",
  method: "input",
  required: false,
  hidden: true,
  render: "config.okMessage",
};
