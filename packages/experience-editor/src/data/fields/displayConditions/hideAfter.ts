import { Field } from "../../pfa-fields";

export const HideAfter: Field = {
  id: "hideAfter",
  label: "Hide after (seconds)?",
  description:
    "Automatically hide this widget after the defined number of seconds have elapsed.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfter",
};
