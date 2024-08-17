import { Field } from "../../pfa-fields";

// hideAfterAction.closed
export const HideAfterActionClosedHideCount: Field = {
  id: "hideAfterActionClosedHideCount",
  label: "Max number of close actions?",
  description:
    "How many times should the widget be manually closed before it is hidden?",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.closed.hideCount",
};

export const HideAfterActionClosedHideDuration: Field = {
  id: "hideAfterActionClosedHideDuration",
  label: "Refresh close action counter every (seconds)?",
  description:
    "Defines the number of seconds which must elapse before the close action count is reset to zero.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.closed.duration",
};

// hideAfterAction.confirm
export const HideAfterActionConfirmHideCount: Field = {
  id: "hideAfterActionConfirmHideCount",
  label: "Max number of confirm actions?",
  description:
    "How many times should the widget be manually confirmed before it is hidden?",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.confirm.hideCount",
};

export const HideAfterActionConfirmHideDuration: Field = {
  id: "hideAfterActionConfirmHideDuration",
  label: "Refresh confirm action counter every (seconds)?",
  description:
    "Defines the number of seconds which must elapse before the confirm action count is reset to zero.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.confirm.duration",
};

// hideAfterAction.cancel

export const HideAfterActionCancelHideCount: Field = {
  id: "hideAfterActionCancelHideCount",
  label: "Max number of cancel actions?",
  description:
    "How many times should the widget be manually cancelled before it is hidden?",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.cancel.hideCount",
};

export const HideAfterActionCancelHideDuration: Field = {
  id: "hideAfterActionCancelHideDuration",
  label: "Should we reset the cancel action count after a period of time?",
  description:
    "Defines the number of seconds which must elapse before the cancel action count is reset to zero.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.hideAfterAction.cancel.duration",
};
