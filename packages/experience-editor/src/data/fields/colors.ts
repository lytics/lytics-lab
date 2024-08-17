import { Field } from "../pfa-fields";

export const BackgroundColor: Field = {
  id: "backgroundColor",
  label: "Background Color",
  description: "The background color of the message",
  type: "string",
  method: "color",
  required: false,
  hidden: true,
  render: "config.colors.background",
};

export const TextColor: Field = {
  id: "textColor",
  label: "Text Color",
  description: "The text color of the message",
  type: "string",
  method: "color",
  required: false,
  hidden: true,
  render: "config.colors.text",
};

export const HeadlineColor: Field = {
  id: "headlineColor",
  label: "Headline Color",
  description: "The headline color of the message",
  type: "string",
  method: "color",
  required: false,
  hidden: true,
  render: "config.colors.headline",
};

export const CloseColor: Field = {
  id: "closeColor",
  label: "Close Button Color",
  description: "The close button color of the message",
  type: "string",
  method: "color",
  required: false,
  hidden: true,
  render: "config.colors.close",
};

export const ActionBackgroundColor: Field = {
  id: "actionBackgroundColor",
  label: "Action Button Background Color",
  description: "The action button background color of the message",
  type: "string",
  method: "color",
  required: false,
  hidden: true,
  render: "config.colors.actionBackground",
};

export const ActionTextColor: Field = {
  id: "actionTextColor",
  label: "Action Button Text Color",
  description: "The action button text color of the message",
  type: "string",
  method: "color",
  required: false,
  hidden: true,
  render: "config.colors.actionText",
};

export const CancelBackgroundColor: Field = {
  id: "cancelBackgroundColor",
  label: "Cancel Button Background Color",
  description: "The cancel button background color of the message",
  type: "string",
  method: "color",
  required: false,
  hidden: true,
  render: "config.colors.cancelBackground",
};

export const CancelTextColor: Field = {
  id: "cancelTextColor",
  label: "Cancel Button Text Color",
  description: "The cancel button text color of the message",
  type: "string",
  method: "color",
  required: false,
  hidden: true,
  render: "config.colors.cancelText",
};

export const FieldBackgroundColor: Field = {
  id: "fieldBackgroundColor",
  label: "Field Background Color",
  description: "The field background color of the message",
  type: "string",
  method: "color",
  required: false,
  hidden: true,
  render: "config.colors.fieldBackground",
};
