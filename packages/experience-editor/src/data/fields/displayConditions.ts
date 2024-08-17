import { Field, SelectOption } from "../pfa-fields";

const OptionShowDelay: SelectOption = {
  label: "Show after delay?",
  value: "showDelay",
  type: "number",
};

const OptionHideAfter: SelectOption = {
  label: "Automatically hide after a certain number of seconds?",
  value: "hideAfter",
  type: "number",
};

const OptionScrollPercentage: SelectOption = {
  label: "Show after user scrolls down a certain percentage of the page?",
  value: "scrollPercentageToDisplay",
  type: "number",
};

const OptionPageVisits: SelectOption = {
  label: "Show after user visits a certain number of pages?",
  value: "pageVisits",
  type: "number",
};

const OptionImpression: SelectOption = {
  label: "Impressions",
  value: "impressions",
  type: "null",
};

const OptionHideAfterAction: SelectOption = {
  label: "Hide After Action",
  value: "hideAfterAction",
  type: "null",
};

const OptionShowOnExitIntent: SelectOption = {
  label: "Show on Exit Intent",
  value: "showOnExitIntent",
  type: "null",
};

export const DisplayConditions: Field = {
  id: "displayConditions",
  label: "Display Conditions",
  description:
    "Additional configuration options for determining if a widget should display.",
  type: "array",
  method: "select",
  required: true,
  hidden: true,
  options: [
    OptionShowDelay,
    OptionHideAfter,
    OptionScrollPercentage,
    OptionPageVisits,
    OptionImpression,
    OptionHideAfterAction,
    OptionShowOnExitIntent,
  ],
  dependencies: [
    {
      value: "showDelay",
      fieldsToShow: ["showDelay"],
    },
    {
      value: "hideAfter",
      fieldsToShow: ["hideAfter"],
    },
    {
      value: "scrollPercentageToDisplay",
      fieldsToShow: ["scrollPercentageToDisplay"],
    },
    {
      value: "pageVisits",
      fieldsToShow: ["pageVisits"],
    },
    {
      value: "showOnExitIntent",
      fieldsToShow: ["showOnExitIntent"],
    },
    {
      value: "impressions",
      fieldsToShow: [
        "impressionsWidgetDuration",
        "impressionsWidgetSession",
        "impressionsWidgetTotal",
        "impressionsGlobalDuration",
        "impressionsGlobalSession",
        "impressionsGlobalTotal",
      ],
    },
    {
      value: "hideAfterAction",
      fieldsToShow: [
        "hideAfterActionClosedHideCount",
        "hideAfterActionClosedHideDuration",
        "hideAfterActionConfirmHideCount",
        "hideAfterActionConfirmHideDuration",
        "hideAfterActionCancelHideCount",
        "hideAfterActionCancelHideDuration",
      ],
    },
  ],
  render: "details.displayConditions",
};
