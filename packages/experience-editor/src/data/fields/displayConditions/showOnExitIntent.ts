import { Field, SelectOption } from "../../pfa-fields";

const OptionTrue: SelectOption = {
  label: "Yes",
  value: "true",
  type: "boolean",
};

const OptionFalse: SelectOption = {
  label: "No",
  value: "false",
  type: "boolean",
};

export const ShowOnExitIntent: Field = {
  id: "showOnExitIntent",
  label: "Trigger widget when the visitor shows intent to exit?",
  description:
    "When enabled, this widget will only be shown when the visitor's mouse browsers back buttons and url controls.",
  type: "boolean",
  method: "select",
  required: false,
  options: [OptionTrue, OptionFalse],
  hidden: true,
  render: "config.displayConditions.showOnExitIntent",
};
