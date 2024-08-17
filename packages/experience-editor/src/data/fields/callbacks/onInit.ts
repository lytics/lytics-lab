import { Field } from "../../pfa-fields";

export const OnInit: Field = {
  id: "onInit",
  label: "Trigger Callback on Initialization",
  description:
    "The following function will be called when the widget is initialized (before it is shown).",
  type: "function",
  method: "code",
  required: false,
  hidden: true,
  render: "config.onInit",
};
