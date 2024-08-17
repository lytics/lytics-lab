import React, { useEffect, useState } from "react";
import { SelectInput } from "../components/form/select";
import { ColorInput } from "../components/form/color";
import { NumberedSection } from "../components/form/numberedSection";
import { ColorPicker } from "../components/form/colorPicker";
import { Home } from "@mui/icons-material";

import {
  theme,
  backgroundColor,
  textColor,
  headlineColor,
  closeColor,
  actionBackgroundColor,
  actionTextColor,
  cancelBackgroundColor,
  cancelTextColor,
  fieldBackgroundColor,
} from "../data/pfa-fields";

interface BrandingSectionProps {
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
  formFieldVisibility: { [key: string]: boolean };
}

export const BrandingSection: React.FC<BrandingSectionProps> = ({
  formValues,
  handleChange,
  formFieldVisibility,
}) => {
  return (
    <NumberedSection
      icon={<Home />}
      headline={"How would you like to configure the design of your widget?"}
    >
      <SelectInput
        field={theme}
        visible={formFieldVisibility[theme.id] || !theme.hidden}
        formValues={formValues}
        handleChange={handleChange}
      />

      <ColorPicker>
        <ColorInput
          field={backgroundColor}
          visible={
            formFieldVisibility[backgroundColor.id] || !backgroundColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={textColor}
          visible={formFieldVisibility[textColor.id] || !textColor.hidden}
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={headlineColor}
          visible={
            formFieldVisibility[headlineColor.id] || !headlineColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={closeColor}
          visible={formFieldVisibility[closeColor.id] || !closeColor.hidden}
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={actionBackgroundColor}
          visible={
            formFieldVisibility[actionBackgroundColor.id] ||
            !actionBackgroundColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={actionTextColor}
          visible={
            formFieldVisibility[actionTextColor.id] || !actionTextColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={cancelBackgroundColor}
          visible={
            formFieldVisibility[cancelBackgroundColor.id] ||
            !cancelBackgroundColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={cancelTextColor}
          visible={
            formFieldVisibility[cancelTextColor.id] || !cancelTextColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />

        <ColorInput
          field={fieldBackgroundColor}
          visible={
            formFieldVisibility[fieldBackgroundColor.id] ||
            !fieldBackgroundColor.hidden
          }
          formValues={formValues}
          handleChange={handleChange}
        />
      </ColorPicker>
    </NumberedSection>
  );
};
