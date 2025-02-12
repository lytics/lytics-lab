import { Field } from "../pfa-fields";

export const AttributeRule: Field = {
  id: "attributeRule",
  label: "Attribute Rule",
  description: "Custom function to determine if the widget should be displayed",
  type: "function",
  method: "code",
  required: false,
  hidden: true,
  render: "details.target.rule",
};
