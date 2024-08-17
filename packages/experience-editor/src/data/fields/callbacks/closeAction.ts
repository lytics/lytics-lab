import { Field } from "../../pfa-fields";

export const CloseAction: Field = {
  id: "closeAction",
  label: "Trigger Callback on Close",
  description:
    "The following function will be called when the user clicks the close button.",
  type: "function",
  method: "code",
  required: false,
  hidden: true,
  render: "config.closeAction.callback",
};
