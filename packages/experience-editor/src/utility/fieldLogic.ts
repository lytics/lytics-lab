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
 * Gets the default value for a field, or undefined if none exists
 */
export function getFieldDefaultValue(field: Field | undefined): any {
  return field?.defaultValue;
}

/**
 * Gets the list of field IDs that should be visible based on a parent field's value
 */
export function getVisibleFieldIds(
  parentField: Field | undefined,
  parentValue: string | boolean,
): string[] {
  if (!parentField?.dependencies) {
    return [];
  }

  const matchingDependency = parentField.dependencies.find(
    (dep) => dep.value === parentValue,
  );

  return matchingDependency?.fieldsToShow || [];
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

/**
 * Gets all field IDs that are shown by any dependency in a field
 */
export function getAllDependentFieldIds(field: Field | undefined): string[] {
  if (!field?.dependencies) {
    return [];
  }

  const allFieldIds = new Set<string>();

  field.dependencies.forEach((dep) => {
    dep.fieldsToShow.forEach((id) => {
      allFieldIds.add(id);
    });
  });

  return Array.from(allFieldIds);
}

/**
 * Determines which fields should be kept visible and which should be hidden
 * based on the current value of a field with dependencies
 */
export function calculateFieldVisibility(
  field: Field | undefined,
  currentValue: string | string[],
): {
  toShow: Set<string>;
  toHide: Set<string>;
} {
  const toShow = new Set<string>();
  const allDependentFields = getAllDependentFieldIds(field);
  const toHide = new Set<string>(allDependentFields);

  if (!field?.dependencies) {
    return { toShow, toHide };
  }

  // Handle array values (for multi-select fields)
  const valuesToCheck = Array.isArray(currentValue)
    ? currentValue
    : field.type === "array" && typeof currentValue === "string"
    ? currentValue.split(",")
    : [currentValue];

  valuesToCheck.forEach((value) => {
    const matchingDependency = field.dependencies?.find(
      (dep) => dep.value === value,
    );

    if (matchingDependency) {
      matchingDependency.fieldsToShow.forEach((id) => {
        toShow.add(id);
        toHide.delete(id);
      });
    }
  });

  return { toShow, toHide };
}
