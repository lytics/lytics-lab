import { Field } from "../pfa-fields";
import { SelectOption } from "../pfa-fields";

const OptionDraft: SelectOption = {
  label: "Draft",
  value: "draft",
};

const OptionReview: SelectOption = {
  label: "Review",
  value: "review",
};

const OptionPublished: SelectOption = {
  label: "Published",
  value: "published",
};

const OptionPaused: SelectOption = {
  label: "Paused",
  value: "paused",
};

export const WidgetStatus: Field = {
  id: "widgetStatus",
  label: "Status",
  type: "array",
  method: "input",
  options: [OptionDraft, OptionReview, OptionPublished, OptionPaused],
  required: true,
  hidden: false,
  render: "details.status",
};
