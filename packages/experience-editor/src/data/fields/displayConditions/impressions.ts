import { Field } from "../../pfa-fields";

export const ImpressionsGlobalTotal: Field = {
  id: "impressionsGlobalTotal",
  label: "Hide after (number) of total impressions across all widgets?",
  description:
    "Only show to visitors who have seen fewer than the defined number of widgets across your site ever.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.global.total",
};

export const ImpressionsGlobalSession: Field = {
  id: "impressionsGlobalSession",
  label: "Hide after (number) of session impressions across all widgets?",
  description:
    "Only show to visitors who have seen fewer than the defined number of widgets during the current session.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.global.session",
};

export const ImpressionsGlobalDuration: Field = {
  id: "impressionsGlobalDuration",
  label: "Reset global impression count after (seconds)?",
  description:
    "Define the number of seconds which must elapse before resetting the global impression count.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.global.duration",
};

export const ImpressionsWidgetTotal: Field = {
  id: "impressionsWidgetTotal",
  label: "Hide after (number) of total impressions for this widget?",
  description:
    "Only show to visitors who have seen this widget fewer than the defined number times.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.widget.total",
};

export const ImpressionsWidgetSession: Field = {
  id: "impressionsWidgetSession",
  label: "Hide after (number) of session impressions for this widget?",
  description:
    "Only show to visitors who have seen this widget fewer than the defined number of times.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.widget.session",
};

export const ImpressionsWidgetDuration: Field = {
  id: "impressionsWidgetDuration",
  label: "Reset impression count for this widget after (seconds)?",
  description:
    "Define the number of seconds which must elapse before resetting this widgets impression count.",
  type: "number",
  method: "input",
  required: false,
  hidden: true,
  render: "config.displayConditions.impressions.widget.duration",
};
