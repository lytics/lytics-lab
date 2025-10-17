import { describe, it, expect } from "vitest";
import { shouldApplyDefaultValue, findFieldById } from "../fieldLogic";
import { Field } from "../../data/pfa-fields";

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
});
