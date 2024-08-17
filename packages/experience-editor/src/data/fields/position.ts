import { Field, SelectOption } from "../pfa-fields";

const OptionBottomLeft: SelectOption = {
  label: "Bottom Left",
  value: "bottom-left",
};

const OptionBottomRight: SelectOption = {
  label: "Bottom Right",
  value: "bottom-right",
};

const OptionLeft: SelectOption = {
  label: "Left",
  value: "left",
};

const OptionRight: SelectOption = {
  label: "Right",
  value: "right",
};

const OptionTopLeft: SelectOption = {
  label: "Top Left",
  value: "top-left",
};

const OptionTopRight: SelectOption = {
  label: "Top Right",
  value: "top-right",
};

const OptionTop: SelectOption = {
  label: "Top",
  value: "top",
};

const OptionTopFixed: SelectOption = {
  label: "Top Fixed",
  value: "top-fixed",
};

const OptionBottomFixed: SelectOption = {
  label: "Bottom Fixed",
  value: "bottom-fixed",
};

const getSelectOptions = (type: string): SelectOption[] => {
  switch (type) {
    case "slideout":
      return [
        OptionBottomLeft,
        OptionBottomRight,
        OptionLeft,
        OptionRight,
        OptionTopLeft,
        OptionTopRight,
      ];
    case "bar":
      return [OptionTop, OptionTopFixed, OptionBottomFixed];
    case "button":
      return [
        OptionTopLeft,
        OptionTopRight,
        OptionLeft,
        OptionRight,
        OptionBottomRight,
        OptionBottomLeft,
      ];
    default:
      return [];
  }
};

export const Position: Field = {
  id: "position",
  label: "Position",
  description: "The location for the widget to sit once it is fully loaded.",
  type: "string",
  method: "select",
  required: false,
  hidden: true,
  dependencies: [
    {
      value: "top-fixed",
      fieldsToShow: ["pushDown"],
    },
    {
      value: "top",
      fieldsToShow: ["pushDown"],
    },
  ],
  render: "config.position",
};

export const PositionWithOptions: (type: string) => Field = (type: string) => {
  let payload = Position;
  payload.options = getSelectOptions(type);
  return payload;
};
