import { Field, SelectOption } from "../pfa-fields";

const OptionTextOnly: SelectOption = {
  label: "Text Only",
  value: "1",
};

const OptionIncludeImage: SelectOption = {
  label: "Include Image",
  value: "2",
};

const OptionIncludeRec: SelectOption = {
  label: "Include Content Recommendation",
  value: "3",
};

const getVariantOptions = (type: string): SelectOption[] => {
  switch (type) {
    case "modal":
      return [OptionTextOnly, OptionIncludeImage, OptionIncludeRec];
    case "slideout":
      return [OptionTextOnly, OptionIncludeImage, OptionIncludeRec];
    case "bar":
      return [OptionTextOnly, OptionIncludeImage];
    case "button":
      return [];
    case "inline":
      return [OptionTextOnly, OptionIncludeImage, OptionIncludeRec];
    default:
      return [];
  }
};

export const Variant: Field = {
  id: "variant",
  label: "Template",
  description:
    "Set the variant value for the widget which determines what content is surfaced, such as images.",
  type: "string",
  method: "select",
  dependencies: [
    {
      value: OptionIncludeImage.value,
      fieldsToShow: ["image"],
    },
  ],
  required: true,
  hidden: true,
  render: "config.variant",
};

export const VariantWithOptions: (type: string) => Field = (type: string) => {
  let payload = Variant;
  payload.options = getVariantOptions(type);
  return payload;
};
