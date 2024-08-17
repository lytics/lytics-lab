import { Field } from "../../pfa-fields";

export const CancelAction: Field = {
  id: "cancelAction",
  label: "Trigger Callback on Cancel",
  description:
    "The following function will be called when the user clicks the cancel button.",
  type: "function",
  method: "code",
  required: false,
  hidden: true,
  render: "config.cancelAction.callback",
};
