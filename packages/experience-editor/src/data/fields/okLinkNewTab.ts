import { Field } from "../pfa-fields";
import { renderConfirmActionCallbackLink } from "./renderHelpers";

export const OKLinkNewTab: Field = {
  id: "okLinkNewTab",
  label: "Open in New Tab",
  type: "boolean",
  method: "checkbox",
  required: false,
  hidden: true,
  render: "details.cta.newTab",
  translate: {
    render: "config.confirmAction.callback",
    renderValue: function (newTab, config) {
      return renderConfirmActionCallbackLink(config.details.cta?.url, newTab);
    },
  },
};
