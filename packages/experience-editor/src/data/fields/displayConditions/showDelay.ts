import { Field } from "../../pfa-fields";

export const ShowDelay: Field = {
  id: "showDelay",
  label: "Wait (seconds) before showing?",
  description:
    "Define the number of seconds that must elapse before the widget will be surfaced.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.showDelay",
};
