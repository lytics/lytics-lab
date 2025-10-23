import { Field } from "../pfa-fields";
import { renderConfirmActionCallbackLink } from "./renderHelpers";

export const OKLinkURL: Field = {
  id: "okLinkURL",
  label: "URL",
  description: "The URL to navigate to when the confirm button is clicked",
  type: "string",
  method: "input",
  required: false,
  hidden: true,
  render: "details.cta.url",
  translate: {
    render: "config.confirmAction.callback",
    renderValue: (value, config) =>
      renderConfirmActionCallbackLink(value, config.details.cta?.newTab),
  },
};
