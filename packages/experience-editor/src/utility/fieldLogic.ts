import { Field } from "../data/pfa-fields";

/**
 * Determines if a field should have its default value applied
 */
export function shouldApplyDefaultValue(
  field: Field | undefined,
  currentValue: any,
): boolean {
  return (
    field !== undefined &&
    field.defaultValue !== undefined &&
    currentValue === undefined
  );
}

/**
 * Finds a field by its ID
 */
export function findFieldById(
  fields: Field[],
  fieldId: string,
): Field | undefined {
  return fields.find((f) => f.id === fieldId);
}
