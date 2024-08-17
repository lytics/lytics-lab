import { Field } from "../pfa-fields";
import {
  BackgroundColor,
  HeadlineColor,
  TextColor,
  CloseColor,
  ActionBackgroundColor,
  ActionTextColor,
  CancelBackgroundColor,
  CancelTextColor,
  FieldBackgroundColor,
} from "./colors";

export const Theme: Field = {
  id: "theme",
  label: "Theme",
  description: "The theme to use for the message",
  type: "string",
  method: "select",
  options: [
    {
      label: "Dark",
      value: "dark",
    },
    {
      label: "Light",
      value: "light",
    },
    {
      label: "Custom",
      value: "custom",
    },
  ],
  required: true,
  hidden: false,
  dependencies: [
    {
      value: "custom",
      fieldsToShow: [
        BackgroundColor.id,
        HeadlineColor.id,
        TextColor.id,
        CloseColor.id,
        ActionBackgroundColor.id,
        ActionTextColor.id,
        CancelBackgroundColor.id,
        CancelTextColor.id,
        FieldBackgroundColor.id,
      ],
    },
  ],
  render: "config.theme",
};
