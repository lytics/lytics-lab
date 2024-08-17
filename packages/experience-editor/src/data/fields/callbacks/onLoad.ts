import { Field } from "../../pfa-fields";

export const OnLoad: Field = {
  id: "onLoad",
  label: "Trigger Callback on Load",
  description:
    "The following function will be called when the widget loads (is shown).",
  type: "function",
  method: "code",
  required: false,
  hidden: true,
  render: "config.onLoad",
};
