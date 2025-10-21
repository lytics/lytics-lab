import { Field } from "../pfa-fields";

export const Type: Field = {
  id: "type",
  label: "Type",
  description: "The type of message to display",
  type: "string",
  method: "select",
  options: [
    {
      label: "Promotional Message",
      value: "message",
    },
    {
      label: "Lead Capture Form",
      value: "form",
    },
    {
      label: "Content Recommendation",
      value: "recommendation",
    },
  ],
  dependencies: [
    {
      value: "form",
      fieldsToShow: ["formElements"],
    },
    {
      value: "recommendation",
      fieldsToShow: [
        "contentCollection",
        "contentRank",
        "contentVisited",
        "contentShuffle",
        "contentDisplayTitle",
        "contentDisplayImage",
        "contentDisplayDescription",
        "contentDisplayDescriptionLimit",
      ],
    },
  ],
  required: true,
  hidden: false,
  support: ["*"],
  render: "details.type",
};
