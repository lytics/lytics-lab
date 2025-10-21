import { Field } from "../pfa-fields";
import { AttributeRule } from "./attributeRule";
import { Audience } from "./audience";
import { PersonalizationKey } from "./personalizationKeys";

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
      label: "Personalization Key",
      value: "personalizationKey",
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
      value: "personalizationKey",
      fieldsToShow: [PersonalizationKey.id],
    },
    {
      value: "attribute",
      fieldsToShow: [AttributeRule.id],
    },
  ],
  render: "details.target.method",
};
