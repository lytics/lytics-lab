import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Field } from "../../../data/pfa-fields";
import { RadioGroupInput } from "../radioGroup";

describe("RadioGroupInput", () => {
  const mockField: Field = {
    id: "contentRank",
    label: "Content Rank",
    description: "Select the ranking strategy",
    type: "string",
    method: "radio",
    required: false,
    hidden: false,
    render: "config.recommend.rank",
    defaultValue: "affinity",
    options: [
      { label: "Highest Affinity", value: "affinity" },
      { label: "Most Popular", value: "popular" },
      { label: "Most Recently Published", value: "recent" },
      { label: "Most Recent Interaction", value: "last_interaction" },
    ],
  };

  describe("rendering", () => {
    it("should render all radio options when visible", () => {
      const handleChange = vi.fn();
      const formValues = { contentRank: "affinity" };

      render(
        <RadioGroupInput
          field={mockField}
          visible={true}
          formValues={formValues}
          handleChange={handleChange}
        />,
      );

      expect(screen.getByText("Content Rank")).toBeInTheDocument();
      expect(screen.getByLabelText("Highest Affinity")).toBeInTheDocument();
      expect(screen.getByLabelText("Most Popular")).toBeInTheDocument();
      expect(
        screen.getByLabelText("Most Recently Published"),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText("Most Recent Interaction"),
      ).toBeInTheDocument();
    });

    it("should not render when not visible", () => {
      const handleChange = vi.fn();
      const formValues = { contentRank: "affinity" };

      const { container } = render(
        <RadioGroupInput
          field={mockField}
          visible={false}
          formValues={formValues}
          handleChange={handleChange}
        />,
      );

      expect(container.firstChild).toBeNull();
    });

    it("should display description when provided", () => {
      const handleChange = vi.fn();
      const formValues = { contentRank: "affinity" };

      render(
        <RadioGroupInput
          field={mockField}
          visible={true}
          formValues={formValues}
          handleChange={handleChange}
        />,
      );

      expect(
        screen.getByText("Select the ranking strategy"),
      ).toBeInTheDocument();
    });

    it("should render horizontally when row prop is true", () => {
      const handleChange = vi.fn();
      const formValues = { contentRank: "affinity" };

      const { container } = render(
        <RadioGroupInput
          field={mockField}
          visible={true}
          formValues={formValues}
          handleChange={handleChange}
          row={true}
        />,
      );

      const radioGroup = container.querySelector(".MuiRadioGroup-root");
      expect(radioGroup).toHaveClass("MuiRadioGroup-row");
    });
  });

  describe("selection", () => {
    it("should show the correct option as selected", () => {
      const handleChange = vi.fn();
      const formValues = { contentRank: "popular" };

      render(
        <RadioGroupInput
          field={mockField}
          visible={true}
          formValues={formValues}
          handleChange={handleChange}
        />,
      );

      const popularRadio = screen.getByLabelText(
        "Most Popular",
      ) as HTMLInputElement;
      expect(popularRadio.checked).toBe(true);

      const affinityRadio = screen.getByLabelText(
        "Highest Affinity",
      ) as HTMLInputElement;
      expect(affinityRadio.checked).toBe(false);
    });

    it("should handle no selection (empty string)", () => {
      const handleChange = vi.fn();
      const formValues = { contentRank: "" };

      render(
        <RadioGroupInput
          field={mockField}
          visible={true}
          formValues={formValues}
          handleChange={handleChange}
        />,
      );

      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      radios.forEach((radio) => {
        expect(radio.checked).toBe(false);
      });
    });
  });

  describe("interaction", () => {
    it("should call handleChange when selecting a different option", () => {
      const handleChange = vi.fn();
      const formValues = { contentRank: "affinity" };

      render(
        <RadioGroupInput
          field={mockField}
          visible={true}
          formValues={formValues}
          handleChange={handleChange}
        />,
      );

      const popularRadio = screen.getByLabelText("Most Popular");
      fireEvent.click(popularRadio);

      expect(handleChange).toHaveBeenCalledWith("contentRank", "popular");
    });

    it("should call handleChange with correct field ID and value", () => {
      const handleChange = vi.fn();
      const formValues = { contentRank: "affinity" };

      render(
        <RadioGroupInput
          field={mockField}
          visible={true}
          formValues={formValues}
          handleChange={handleChange}
        />,
      );

      const recentRadio = screen.getByLabelText("Most Recently Published");
      fireEvent.click(recentRadio);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("contentRank", "recent");
    });

    it("should not call handleChange when clicking already selected option", () => {
      const handleChange = vi.fn();
      const formValues = { contentRank: "affinity" };

      render(
        <RadioGroupInput
          field={mockField}
          visible={true}
          formValues={formValues}
          handleChange={handleChange}
        />,
      );

      const affinityRadio = screen.getByLabelText("Highest Affinity");
      fireEvent.click(affinityRadio);

      // Material-UI radio buttons don't trigger onChange when clicking already selected option
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should handle field with no options", () => {
      const fieldWithNoOptions: Field = {
        ...mockField,
        options: [],
      };
      const handleChange = vi.fn();
      const formValues = {};

      render(
        <RadioGroupInput
          field={fieldWithNoOptions}
          visible={true}
          formValues={formValues}
          handleChange={handleChange}
        />,
      );

      expect(screen.getByText("Content Rank")).toBeInTheDocument();
      expect(screen.queryAllByRole("radio")).toHaveLength(0);
    });

    it("should handle field with no description", () => {
      const fieldWithNoDescription: Field = {
        ...mockField,
        description: undefined,
      };
      const handleChange = vi.fn();
      const formValues = { contentRank: "affinity" };

      render(
        <RadioGroupInput
          field={fieldWithNoDescription}
          visible={true}
          formValues={formValues}
          handleChange={handleChange}
        />,
      );

      expect(screen.getByText("Content Rank")).toBeInTheDocument();
      expect(
        screen.queryByText("Select the ranking strategy"),
      ).not.toBeInTheDocument();
    });

    it("should handle missing form value", () => {
      const handleChange = vi.fn();
      const formValues = {}; // No contentRank value

      render(
        <RadioGroupInput
          field={mockField}
          visible={true}
          formValues={formValues}
          handleChange={handleChange}
        />,
      );

      const radios = screen.getAllByRole("radio") as HTMLInputElement[];
      radios.forEach((radio) => {
        expect(radio.checked).toBe(false);
      });
    });
  });
});
