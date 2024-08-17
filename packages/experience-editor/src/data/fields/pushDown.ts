import { Field } from "../pfa-fields";

export const PushDown: Field = {
  id: "pushDown",
  label: "HTML Element to Push Down (optional)",
  description:
    "or top or top-fixed positioned bars, we can select an element to push down (add a top margin) so it doesn't get covered by the module. This is especially helpful for a top-aligned site navigation.",
  type: "string",
  method: "input",
  required: false,
  hidden: true,
  render: "config.pushDown",
};
