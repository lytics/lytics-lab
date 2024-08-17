import { Field } from "../pfa-fields";

export const Message: Field = {
  id: "msg",
  label: "Message",
  description: "The body of the message to display",
  type: "string",
  method: "textarea",
  required: false,
  hidden: false,
  render: "config.msg",
};
