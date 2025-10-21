import { Recommend } from "@mui/icons-material";
import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  contentCollection,
  contentCollectionWithOptions,
  contentDisplayDescription,
  contentDisplayDescriptionLimit,
  contentDisplayImage,
  contentDisplayTitle,
  contentRank,
  contentShuffle,
  contentVisited,
  Field,
  SelectOption,
} from "../data/pfa-fields";
import { CheckboxInput } from "./form/checkbox";
import { ConditionGroup } from "./form/conditionGroup";
import { TextInput } from "./form/input";
import { NumberedSection } from "./form/numberedSection";
import { RadioGroupInput } from "./form/radioGroup";
import { SelectInput } from "./form/select";

interface RecommendationSectionProps {
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
  formFieldVisibility: { [key: string]: boolean };
  spacing: number;
  collections: SelectOption[];
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  formValues,
  handleChange,
  formFieldVisibility,
  spacing,
  collections,
}) => {
  const [_collectionField, setCollectionField] = useState<Field | null>(null);

  useEffect(() => {
    setCollectionField(contentCollectionWithOptions(collections));
  }, []);

  return (
    <NumberedSection icon={<Recommend />} headline={"Recommendation Settings"}>
      <SelectInput
        field={contentCollection}
        visible={
          formFieldVisibility[contentCollection.id] || !contentCollection.hidden
        }
        formValues={formValues}
        handleChange={handleChange}
      />

      <Stack direction={"row"} spacing={2}>
        <ConditionGroup spacing={spacing} label={"Recommendation Logic"}>
          <RadioGroupInput
            field={contentRank}
            visible={formFieldVisibility[contentRank.id] || !contentRank.hidden}
            formValues={formValues}
            handleChange={handleChange}
            row={true}
          />
          <CheckboxInput
            field={contentVisited}
            visible={
              formFieldVisibility[contentVisited.id] || !contentVisited.hidden
            }
            formValues={formValues}
            handleChange={handleChange}
          />
          <CheckboxInput
            field={contentShuffle}
            visible={
              formFieldVisibility[contentShuffle.id] || !contentShuffle.hidden
            }
            formValues={formValues}
            handleChange={handleChange}
          />
        </ConditionGroup>

        <ConditionGroup spacing={spacing} label={"Recommendation Display"}>
          <CheckboxInput
            field={contentDisplayTitle}
            visible={
              formFieldVisibility[contentDisplayTitle.id] ||
              !contentDisplayTitle.hidden
            }
            formValues={formValues}
            handleChange={handleChange}
          />
          <CheckboxInput
            field={contentDisplayImage}
            visible={
              formFieldVisibility[contentDisplayImage.id] ||
              !contentDisplayImage.hidden
            }
            formValues={formValues}
            handleChange={handleChange}
          />
          <CheckboxInput
            field={contentDisplayDescription}
            visible={
              formFieldVisibility[contentDisplayDescription.id] ||
              !contentDisplayDescription.hidden
            }
            formValues={formValues}
            handleChange={handleChange}
          />
          <TextInput
            field={contentDisplayDescriptionLimit}
            visible={
              formFieldVisibility[contentDisplayDescriptionLimit.id] ||
              !contentDisplayDescriptionLimit.hidden
            }
            size="small"
            formValues={formValues}
            handleChange={handleChange}
          />
        </ConditionGroup>
      </Stack>
    </NumberedSection>
  );
};
