import { Field } from "../pfa-fields";

export const CancelMessage: Field = {
  id: "cancelMessage",
  label: "Cancel Button Text",
  description: "The message to display on the Cancel button",
  type: "string",
  method: "input",
  required: false,
  hidden: true,
  render: "config.cancelMessage",
};
