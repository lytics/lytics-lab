import { Field } from "../pfa-fields";

export const WidgetDescription: Field = {
  id: "widgetDescription",
  label: "Description",
  description:
    "Describe your widget for improved context and understanding in the future.",
  type: "string",
  method: "textarea",
  required: true,
  hidden: false,
  render: "details.description",
};
