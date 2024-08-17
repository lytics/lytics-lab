import { Field } from "../pfa-fields";

export const CancelShow: Field = {
  id: "cancelShow",
  label: "Show Cancel Button",
  description: "Whether or not to show the Cancel button",
  type: "boolean",
  method: "checkbox",
  required: false,
  hidden: false,
  dependencies: [
    {
      value: true,
      fieldsToShow: ["cancelMessage"],
    },
  ],
  render: "config.cancelShow",
};
