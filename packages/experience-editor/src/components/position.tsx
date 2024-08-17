import React from "react";
import { Stack } from "@mui/material";
import { ControlCamera } from "@mui/icons-material";
import { TextInput } from "../components/form/input";
import { SelectInput } from "../components/form/select";
import { NumberedSection } from "../components/form/numberedSection";
import { ConditionGroup } from "../components/form/conditionGroup";
import {
  type,
  layout,
  layoutWithOptions,
  variantWithOptions,
  image,
  positionSelector,
  position,
  positionWithOptions,
  origin,
  originWithOptions,
  pushDown,
} from "../data/pfa-fields";

interface PositionSectionProps {
  formValues: { [key: string]: string };
  isFieldSet: (id: string) => boolean;
  handleChange: (id: string, value: string) => void;
  formFieldVisibility: { [key: string]: boolean };
  spacing: number;
}

export const PositionSection: React.FC<PositionSectionProps> = ({
  formValues,
  handleChange,
  isFieldSet,
  formFieldVisibility,
  spacing,
}) => {
  return (
    <NumberedSection
      inputSpaceVertical={spacing}
      icon={<ControlCamera />}
      headline={"Where and how would you like your widget to appear?"}
    >
      <SelectInput
        field={layoutWithOptions(formValues[type.id])}
        visible={isFieldSet(type.id)}
        formValues={formValues}
        handleChange={handleChange}
      />

      {isFieldSet(layout.id) && (
        <Stack spacing={spacing} direction={"row"}>
          <ConditionGroup spacing={spacing} label={"Design Options"}>
            <SelectInput
              field={variantWithOptions(formValues[layout.id])}
              visible={isFieldSet(layout.id)}
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={image}
              visible={formFieldVisibility[image.id] || !image.hidden}
              formValues={formValues}
              handleChange={handleChange}
            />
          </ConditionGroup>
          <ConditionGroup spacing={spacing} label={"Positioning"}>
            <SelectInput
              field={positionWithOptions(formValues[layout.id])}
              visible={formFieldVisibility[position.id] || !position.hidden}
              formValues={formValues}
              handleChange={handleChange}
            />

            <SelectInput
              field={originWithOptions(formValues[layout.id])}
              visible={formFieldVisibility[origin.id] || !origin.hidden}
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={pushDown}
              visible={formFieldVisibility[pushDown.id] || !pushDown.hidden}
              formValues={formValues}
              handleChange={handleChange}
            />

            <TextInput
              field={positionSelector}
              visible={
                formFieldVisibility[positionSelector.id] ||
                !positionSelector.hidden
              }
              formValues={formValues}
              handleChange={handleChange}
            />
          </ConditionGroup>
        </Stack>
      )}
    </NumberedSection>
  );
};
