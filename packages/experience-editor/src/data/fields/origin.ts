import { Field, SelectOption } from "../pfa-fields";

const OptionLeft: SelectOption = {
  label: "Left",
  value: "left",
};

const OptionRight: SelectOption = {
  label: "Right",
  value: "right",
};

const OptionBottom: SelectOption = {
  label: "Bottom",
  value: "bottom",
};

const getSelectOptions = (type: string): SelectOption[] => {
  switch (type) {
    case "slideout":
      return [OptionLeft, OptionRight, OptionBottom];
    default:
      return [];
  }
};

export const Origin: Field = {
  id: "origin",
  label: "Origin",
  description:
    "Where will the widget enter the screen from on its way to the final position.",
  type: "string",
  method: "select",
  required: false,
  hidden: true,
  dependencies: [],
  render: "config.origin",
};

export const OriginWithOptions: (type: string) => Field = (type: string) => {
  let payload = Origin;
  payload.options = getSelectOptions(type);
  return payload;
};
