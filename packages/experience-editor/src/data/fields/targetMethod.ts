import { Field } from "../pfa-fields";
import { Audience } from "./audience";
import { AttributeRule } from "./attributeRule";
import { TargetFlow } from "./targetFlow";

export const TargetMethod: Field = {
  id: "targetMethod",
  label: "Target Method",
  description: "Determine how to target the widget",
  type: "string",
  method: "select",
  options: [
    {
      label: "Audience",
      value: "audience",
    },
    {
      label: "Flow",
      value: "flow",
    },
    {
      label: "Attribute",
      value: "attribute",
    },
  ],
  required: true,
  hidden: false,
  dependencies: [
    {
      value: "audience",
      fieldsToShow: [Audience.id],
    },
    {
      value: "flow",
      fieldsToShow: [TargetFlow.id],
    },
    {
      value: "attribute",
      fieldsToShow: [AttributeRule.id],
    },
  ],
  render: "details.target.method",
};
