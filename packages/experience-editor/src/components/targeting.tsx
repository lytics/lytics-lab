import React, { useEffect, useState } from "react";
import {
  URLContainsBuilder,
  URLContainsItem,
} from "../components/form/urlContains";
import { SelectInput } from "../components/form/select";
import {
  type,
  urlContains,
  audienceWithOptions,
  Field,
  SelectOption,
} from "../data/pfa-fields";
import { NumberedSection } from "../components/form/numberedSection";
import { AdsClick, FindInPage } from "@mui/icons-material";

interface TargetingSectionProps {
  formValues: { [key: string]: string };
  isFieldSet: (id: string) => boolean;
  handleChange: (id: string, value: URLContainsItem[] | string) => void;
  audiences: SelectOption[];
}

export const TargetingSection: React.FC<TargetingSectionProps> = ({
  formValues,
  handleChange,
  isFieldSet,
  audiences,
}) => {
  const [audienceField, setAudienceField] = useState<Field | null>(null);

  useEffect(() => {
    setAudienceField(audienceWithOptions(audiences));
  }, []);

  return (
    <>
      <NumberedSection
        icon={<AdsClick />}
        headline={
          "Would you like your widget only shown to a specific audience?"
        }
      >
        {audienceField && (
          <SelectInput
            field={audienceField}
            visible={isFieldSet(type.id)}
            formValues={formValues}
            handleChange={handleChange}
          />
        )}
      </NumberedSection>

      <NumberedSection
        icon={<FindInPage />}
        headline={"Where would you like your widget to be displayed?"}
        sx={{ pt: 0 }}
      >
        <URLContainsBuilder
          field={urlContains}
          visible={isFieldSet(type.id)}
          formValues={formValues}
          handleChange={handleChange}
        />
      </NumberedSection>
    </>
  );
};
