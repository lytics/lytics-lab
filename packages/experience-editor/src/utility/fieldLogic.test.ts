import { describe, it, expect } from "vitest";
import {
  shouldApplyDefaultValue,
  getFieldDefaultValue,
  getVisibleFieldIds,
  findFieldById,
  getAllDependentFieldIds,
  calculateFieldVisibility,
} from "./fieldLogic";
import { Field } from "../data/pfa-fields";

describe("fieldLogic", () => {
  describe("shouldApplyDefaultValue", () => {
    it("should return true when field has defaultValue and current value is undefined", () => {
      const field: Partial<Field> = {
        id: "test",
        defaultValue: "affinity",
      };

      expect(shouldApplyDefaultValue(field as Field, undefined)).toBe(true);
    });

    it("should return false when current value is defined", () => {
      const field: Partial<Field> = {
        id: "test",
        defaultValue: "affinity",
      };

      expect(shouldApplyDefaultValue(field as Field, "popular")).toBe(false);
    });

    it("should return false when field has no defaultValue", () => {
      const field: Partial<Field> = {
        id: "test",
      };

      expect(shouldApplyDefaultValue(field as Field, undefined)).toBe(false);
    });

    it("should return false when field is undefined", () => {
      expect(shouldApplyDefaultValue(undefined, undefined)).toBe(false);
    });

    it("should return false when current value is falsy but defined (empty string)", () => {
      const field: Partial<Field> = {
        id: "test",
        defaultValue: "affinity",
      };

      expect(shouldApplyDefaultValue(field as Field, "")).toBe(false);
    });

    it("should return false when current value is falsy but defined (false)", () => {
      const field: Partial<Field> = {
        id: "test",
        defaultValue: true,
      };

      expect(shouldApplyDefaultValue(field as Field, false)).toBe(false);
    });
  });

  describe("getFieldDefaultValue", () => {
    it("should return the defaultValue when it exists", () => {
      const field: Partial<Field> = {
        id: "test",
        defaultValue: "affinity",
      };

      expect(getFieldDefaultValue(field as Field)).toBe("affinity");
    });

    it("should return undefined when no defaultValue exists", () => {
      const field: Partial<Field> = {
        id: "test",
      };

      expect(getFieldDefaultValue(field as Field)).toBeUndefined();
    });

    it("should return undefined when field is undefined", () => {
      expect(getFieldDefaultValue(undefined)).toBeUndefined();
    });
  });

  describe("getVisibleFieldIds", () => {
    it("should return field IDs matching the dependency value", () => {
      const field: Partial<Field> = {
        id: "type",
        dependencies: [
          {
            value: "recommendation",
            fieldsToShow: ["contentRank", "contentVisited", "contentShuffle"],
          },
          {
            value: "form",
            fieldsToShow: ["formElements"],
          },
        ],
      };

      const result = getVisibleFieldIds(field as Field, "recommendation");
      expect(result).toEqual([
        "contentRank",
        "contentVisited",
        "contentShuffle",
      ]);
    });

    it("should return empty array when no dependency matches", () => {
      const field: Partial<Field> = {
        id: "type",
        dependencies: [
          {
            value: "recommendation",
            fieldsToShow: ["contentRank"],
          },
        ],
      };

      const result = getVisibleFieldIds(field as Field, "message");
      expect(result).toEqual([]);
    });

    it("should return empty array when field has no dependencies", () => {
      const field: Partial<Field> = {
        id: "test",
      };

      const result = getVisibleFieldIds(field as Field, "anything");
      expect(result).toEqual([]);
    });

    it("should return empty array when field is undefined", () => {
      const result = getVisibleFieldIds(undefined, "anything");
      expect(result).toEqual([]);
    });

    it("should handle boolean dependency values", () => {
      const field: Partial<Field> = {
        id: "okShow",
        dependencies: [
          {
            value: true,
            fieldsToShow: ["okMessage"],
          },
        ],
      };

      const result = getVisibleFieldIds(field as Field, true);
      expect(result).toEqual(["okMessage"]);
    });
  });

  describe("findFieldById", () => {
    const fields: Partial<Field>[] = [
      { id: "type", label: "Type" },
      { id: "contentRank", label: "Content Rank", defaultValue: "affinity" },
      { id: "headline", label: "Headline" },
    ];

    it("should find field by ID", () => {
      const result = findFieldById(fields as Field[], "contentRank");
      expect(result?.id).toBe("contentRank");
      expect(result?.defaultValue).toBe("affinity");
    });

    it("should return undefined when field not found", () => {
      const result = findFieldById(fields as Field[], "nonexistent");
      expect(result).toBeUndefined();
    });

    it("should return undefined for empty array", () => {
      const result = findFieldById([], "test");
      expect(result).toBeUndefined();
    });
  });

  describe("getAllDependentFieldIds", () => {
    it("should return all field IDs from all dependencies", () => {
      const field: Partial<Field> = {
        id: "type",
        dependencies: [
          {
            value: "recommendation",
            fieldsToShow: ["contentRank", "contentVisited"],
          },
          {
            value: "form",
            fieldsToShow: ["formElements"],
          },
          {
            value: "message",
            fieldsToShow: ["message", "headline"],
          },
        ],
      };

      const result = getAllDependentFieldIds(field as Field);
      expect(result).toHaveLength(5);
      expect(result).toContain("contentRank");
      expect(result).toContain("contentVisited");
      expect(result).toContain("formElements");
      expect(result).toContain("message");
      expect(result).toContain("headline");
    });

    it("should return empty array when field has no dependencies", () => {
      const field: Partial<Field> = {
        id: "test",
      };

      const result = getAllDependentFieldIds(field as Field);
      expect(result).toEqual([]);
    });

    it("should return empty array when field is undefined", () => {
      const result = getAllDependentFieldIds(undefined);
      expect(result).toEqual([]);
    });

    it("should not include duplicates", () => {
      const field: Partial<Field> = {
        id: "test",
        dependencies: [
          {
            value: "a",
            fieldsToShow: ["field1", "field2"],
          },
          {
            value: "b",
            fieldsToShow: ["field2", "field3"],
          },
        ],
      };

      const result = getAllDependentFieldIds(field as Field);
      expect(result).toHaveLength(3);
      expect(result.filter((id) => id === "field2")).toHaveLength(1);
    });
  });

  describe("calculateFieldVisibility", () => {
    const field: Partial<Field> = {
      id: "type",
      type: "string",
      dependencies: [
        {
          value: "recommendation",
          fieldsToShow: ["contentRank", "contentVisited", "contentShuffle"],
        },
        {
          value: "form",
          fieldsToShow: ["formElements"],
        },
      ],
    };

    it("should show fields matching current value and hide others", () => {
      const result = calculateFieldVisibility(field as Field, "recommendation");

      expect(result.toShow.has("contentRank")).toBe(true);
      expect(result.toShow.has("contentVisited")).toBe(true);
      expect(result.toShow.has("contentShuffle")).toBe(true);
      expect(result.toHide.has("formElements")).toBe(true);
    });

    it("should handle changing values correctly", () => {
      const result = calculateFieldVisibility(field as Field, "form");

      expect(result.toShow.has("formElements")).toBe(true);
      expect(result.toHide.has("contentRank")).toBe(true);
      expect(result.toHide.has("contentVisited")).toBe(true);
      expect(result.toHide.has("contentShuffle")).toBe(true);
    });

    it("should handle array values (multi-select)", () => {
      const multiField: Partial<Field> = {
        id: "displayConditions",
        type: "array",
        dependencies: [
          {
            value: "showDelay",
            fieldsToShow: ["showDelay"],
          },
          {
            value: "hideAfter",
            fieldsToShow: ["hideAfter"],
          },
        ],
      };

      const result = calculateFieldVisibility(multiField as Field, [
        "showDelay",
        "hideAfter",
      ]);

      expect(result.toShow.has("showDelay")).toBe(true);
      expect(result.toShow.has("hideAfter")).toBe(true);
    });

    it("should handle comma-separated string values for array types", () => {
      const multiField: Partial<Field> = {
        id: "displayConditions",
        type: "array",
        dependencies: [
          {
            value: "showDelay",
            fieldsToShow: ["showDelay"],
          },
          {
            value: "hideAfter",
            fieldsToShow: ["hideAfter"],
          },
        ],
      };

      const result = calculateFieldVisibility(
        multiField as Field,
        "showDelay,hideAfter",
      );

      expect(result.toShow.has("showDelay")).toBe(true);
      expect(result.toShow.has("hideAfter")).toBe(true);
    });

    it("should return empty sets when field has no dependencies", () => {
      const simpleField: Partial<Field> = {
        id: "test",
      };

      const result = calculateFieldVisibility(simpleField as Field, "anything");

      expect(result.toShow.size).toBe(0);
      expect(result.toHide.size).toBe(0);
    });

    it("should return empty sets when field is undefined", () => {
      const result = calculateFieldVisibility(undefined, "anything");

      expect(result.toShow.size).toBe(0);
      expect(result.toHide.size).toBe(0);
    });
  });
});
