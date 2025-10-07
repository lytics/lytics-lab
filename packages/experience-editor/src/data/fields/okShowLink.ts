import { Field } from "../pfa-fields";

export const OKShowLink: Field = {
  id: "okShowLink",
  label: "Link to a URL?",
  type: "boolean",
  method: "checkbox",
  required: false,
  hidden: true,
  dependencies: [
    {
      value: true,
      fieldsToShow: ["okLinkURL", "okLinkNewTab"],
    },
  ],
  render: "details.cta.show",
};
