import { Field } from "../../pfa-fields";

export const ConfirmAction: Field = {
  id: "confirmAction",
  label: "Trigger Callback on Confirm",
  description:
    "The following function will be called when the user clicks the confirm button.",
  type: "function",
  method: "code",
  required: false,
  hidden: true,
  render: "config.confirmAction.callback",
};
