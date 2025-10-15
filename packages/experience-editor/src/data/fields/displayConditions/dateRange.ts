import { Field } from "../../pfa-fields";

export const DateRangeStart: Field = {
  id: "dateRangeStart",
  label: "Start Date",
  description: "What date and time should the widget start displaying?",
  type: "date",
  method: "datePicker",
  required: false,
  hidden: true,
  render: "config.displayConditions.dateRange.start_at",
};

export const DateRangeEnd: Field = {
  id: "dateRangeEnd",
  label: "End Date",
  description: "What date and time should the widget stop displaying?",
  type: "date",
  method: "datePicker",
  required: false,
  hidden: true,
  render: "config.displayConditions.dateRange.end_at",
};
