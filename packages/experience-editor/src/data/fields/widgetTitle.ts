import { Field } from "../pfa-fields";

export const WidgetTitle: Field = {
  id: "widgetTitle",
  label: "Label",
  description:
    "Create a label for your widget so that you can easily identify it later.",
  type: "string",
  method: "input",
  required: true,
  hidden: false,
  render: "details.label",
};
