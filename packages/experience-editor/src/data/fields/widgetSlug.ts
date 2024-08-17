import { Field } from "../pfa-fields";

export const WidgetSlug: Field = {
  id: "widgetSlug",
  label: "Widget Identifier test",
  description: "A unique ID for your widget.",
  type: "string",
  method: "input",
  required: true,
  hidden: false,
  render: "config.id",
};
