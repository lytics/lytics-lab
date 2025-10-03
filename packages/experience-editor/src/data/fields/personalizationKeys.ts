import { Field, SelectOption } from "../pfa-fields";

export const PersonalizationKey: Field = {
  id: "personalizationKey",
  label: "Personalization Key (for flows)",
  description:
    "Select a personalization key to display widget based on progression through a flow.",
  type: "string",
  method: "select",
  required: false,
  hidden: true,
  dependencies: [],
  render: "details.target.personalizationKey",
};

export const PersonalizationKeyWithOptions = (pk: SelectOption[]) => {
  let payload = PersonalizationKey;
  payload.options = pk;
  return payload;
};
