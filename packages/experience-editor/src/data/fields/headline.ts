import { Field } from "../pfa-fields";

export const Headline: Field = {
  id: "headline",
  label: "Headline",
  description: "The headline for your message",
  type: "string",
  method: "input",
  required: false,
  hidden: false,
  render: "config.headline",
};
