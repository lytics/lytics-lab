import { describe, it, expect } from "vitest";
import { removeEmptyObjects, getValueByDotNotation } from "../objects";

describe("objects utility", () => {
  describe("removeEmptyObjects", () => {
    it("should remove empty objects from config", () => {
      const config = {
        details: {
          type: "form",
          label: "Test Widget",
        },
        config: {
          headline: "Hello",
          msg: "World",
          recommend: {}, // Empty object should be removed
        },
      };

      const result = removeEmptyObjects(config);

      expect(result.config.recommend).toBeUndefined();
      expect(result.config.headline).toBe("Hello");
      expect(result.config.msg).toBe("World");
    });

    it("should remove nested empty objects", () => {
      const config = {
        details: {
          type: "recommendation",
        },
        config: {
          recommend: {
            rank: "affinity",
            display: {}, // Nested empty object
          },
        },
      };

      const result = removeEmptyObjects(config);

      expect(result.config.recommend.rank).toBe("affinity");
      expect(result.config.recommend.display).toBeUndefined();
    });

    it("should keep objects with values", () => {
      const config = {
        details: {
          type: "recommendation",
        },
        config: {
          recommend: {
            rank: "affinity",
            display: {
              title: true,
              image: false,
            },
          },
        },
      };

      const result = removeEmptyObjects(config);

      expect(result.config.recommend.rank).toBe("affinity");
      expect(result.config.recommend.display.title).toBe(true);
      expect(result.config.recommend.display.image).toBe(false);
    });

    it("should remove null and undefined values", () => {
      const config = {
        details: {
          type: "form",
        },
        config: {
          headline: "Test",
          msg: null,
          cancelMessage: undefined,
        },
      };

      const result = removeEmptyObjects(config);

      expect(result.config.headline).toBe("Test");
      expect(result.config.msg).toBeUndefined();
      expect(result.config.cancelMessage).toBeUndefined();
    });

    it("should handle arrays properly", () => {
      const config = {
        config: {
          formElements: [
            { type: "email", name: "email" },
            null,
            { type: "text", name: "name" },
          ],
        },
      };

      const result = removeEmptyObjects(config);

      expect(result.config.formElements).toHaveLength(2);
      expect(result.config.formElements[0].type).toBe("email");
      expect(result.config.formElements[1].type).toBe("text");
    });

    it("should preserve empty strings and false values", () => {
      const config = {
        config: {
          headline: "",
          okShow: "false",
          cancelShow: false,
        },
      };

      const result = removeEmptyObjects(config);

      expect(result.config.headline).toBe("");
      expect(result.config.okShow).toBe("false");
      expect(result.config.cancelShow).toBe(false);
    });

    it("should handle the reported bug scenario - form type should not have recommend object", () => {
      // Simulates what would happen if default values were applied to hidden fields
      const configWithUnwantedDefaults = {
        details: {
          type: "form",
          label: "Sample Widget",
          status: "paused",
        },
        config: {
          headline: "Hello world!",
          msg: "We think you'll really like this message!",
          okMessage: "CLICK ME",
          formElements: [
            {
              type: "email",
              required: true,
              label: "Email Address",
              name: "email",
            },
          ],
          recommend: {}, // This shouldn't be here for type "form"
        },
      };

      const cleaned = removeEmptyObjects(configWithUnwantedDefaults);

      // The empty recommend object should be removed
      expect(cleaned.config.recommend).toBeUndefined();
      // Form-specific fields should remain
      expect(cleaned.config.formElements).toBeDefined();
      expect(cleaned.config.formElements).toHaveLength(1);
    });

    it("should keep recommend object when it has values for recommendation type", () => {
      const configWithRecommendation = {
        details: {
          type: "recommendation",
          label: "Sample Widget",
        },
        config: {
          headline: "Check this out!",
          recommend: {
            rank: "affinity",
            collection: "blog-posts",
          },
        },
      };

      const cleaned = removeEmptyObjects(configWithRecommendation);

      // The recommend object with values should be kept
      expect(cleaned.config.recommend).toBeDefined();
      expect(cleaned.config.recommend.rank).toBe("affinity");
      expect(cleaned.config.recommend.collection).toBe("blog-posts");
    });
  });

  describe("getValueByDotNotation", () => {
    it("should get nested values using dot notation", () => {
      const obj = {
        details: {
          type: "form",
          label: "Test Widget",
        },
        config: {
          recommend: {
            rank: "affinity",
          },
        },
      };

      expect(getValueByDotNotation(obj, "details.type")).toBe("form");
      expect(getValueByDotNotation(obj, "details.label")).toBe("Test Widget");
      expect(getValueByDotNotation(obj, "config.recommend.rank")).toBe(
        "affinity",
      );
    });

    it("should return undefined for non-existent paths", () => {
      const obj = {
        details: {
          type: "form",
        },
      };

      expect(
        getValueByDotNotation(obj, "config.recommend.rank"),
      ).toBeUndefined();
      expect(getValueByDotNotation(obj, "nonexistent.path")).toBeUndefined();
    });

    it("should handle single-level paths", () => {
      const obj = {
        type: "form",
        label: "Test",
      };

      expect(getValueByDotNotation(obj, "type")).toBe("form");
      expect(getValueByDotNotation(obj, "label")).toBe("Test");
    });

    it("should handle empty objects gracefully", () => {
      const obj = {};

      expect(getValueByDotNotation(obj, "anything")).toBeUndefined();
    });
  });
});
