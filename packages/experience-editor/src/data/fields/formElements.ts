import { Field } from "../pfa-fields";

export const FormElements: Field = {
  id: "formElements",
  label: "Form Elements",
  description:
    "Configure various inputs to be displayed on your lead capture form.",
  type: "array",
  method: "input",
  required: false,
  hidden: false,
  render: "config.formElements",
};
