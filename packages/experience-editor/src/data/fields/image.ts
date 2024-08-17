import { Field } from "../pfa-fields";

export const Image: Field = {
  id: "image",
  label: "Image URL",
  description:
    "The URL of the featured image you'd like to display in the widget.",
  type: "string",
  method: "input",
  required: false,
  hidden: true,
  render: "config.image",
};
