import { Field, SelectOption } from "../pfa-fields";

export const Audience: Field = {
  id: "audience",
  label: "Target Audience",
  description: "Restrict the audience that can see this widget.",
  type: "string",
  method: "select",
  required: false,
  hidden: true,
  dependencies: [],
  render: "details.target.audience",
};

export const AudienceWithOptions = (audiences: SelectOption[]) => {
  const payload = Audience;
  payload.options = audiences;
  return payload;
};
