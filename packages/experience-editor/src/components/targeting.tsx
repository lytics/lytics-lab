import React, { useEffect, useState } from "react";
import {
  URLContainsBuilder,
  URLContainsItem,
} from "../components/form/urlContains";
import { SelectInput } from "../components/form/select";
import { ConditionGroup } from "../components/form/conditionGroup";
import {
  type,
  urlContains,
  audienceWithOptions,
  Field,
  SelectOption,
  Flow,
  targetMethod,
  attributeRule,
  targetFlowWithOptions,
  targetFlowVersionWithOptions,
  targetFlowStepWithOptions,
} from "../data/pfa-fields";
import { NumberedSection } from "../components/form/numberedSection";
import { AdsClick, FindInPage } from "@mui/icons-material";
import { CallbackFnEditor } from "./form/callbackFn";

interface TargetingSectionProps {
  formValues: { [key: string]: string };
  isFieldSet: (id: string) => boolean;
  handleChange: (id: string, value: URLContainsItem[] | string) => void;
  handleCallbackChange: (field: Field, value: string) => void;
  audiences: SelectOption[];
  flows: Flow[];
  formFieldVisibility: { [key: string]: boolean };
}

export const TargetingSection: React.FC<TargetingSectionProps> = ({
  formValues,
  handleChange,
  handleCallbackChange,
  isFieldSet,
  audiences,
  flows,
  formFieldVisibility,
}) => {
  const [audienceField, setAudienceField] = useState<Field | null>(null);
  const [flowField, setFlowField] = useState<Field | null>(null);
  const [flowVersionField, setFlowVersionField] = useState<Field | null>(null);
  const [flowStepField, setFlowStepField] = useState<Field | null>(null);

  useEffect(() => {
    setAudienceField(audienceWithOptions(audiences));
    setFlowField(targetFlowWithOptions(flows));
  }, []);

  useEffect(() => {
    if (flowField && formValues[flowField.id]) {
      setFlowVersionField(
        targetFlowVersionWithOptions(flows, formValues[flowField.id]),
      );
    }
  }, [flowField, formValues]);

  useEffect(() => {
    if (
      flowField &&
      flowVersionField &&
      formValues[flowField.id] &&
      formValues[flowVersionField.id]
    ) {
      setFlowStepField(
        targetFlowStepWithOptions(
          flows,
          formValues[flowField.id],
          formValues[flowVersionField.id],
        ),
      );
    }
  }, [flowField, formValues]);

  return (
    <>
      <NumberedSection
        icon={<AdsClick />}
        headline={"How would you like to determine who should see your widget?"}
      >
        <SelectInput
          field={targetMethod}
          visible={isFieldSet(type.id)}
          formValues={formValues}
          handleChange={handleChange}
        />

        {audienceField && formFieldVisibility[audienceField.id] && (
          <ConditionGroup spacing={3} label={"Audience Targeting"}>
            <SelectInput
              field={audienceField}
              visible={isFieldSet(type.id)}
              formValues={formValues}
              handleChange={handleChange}
            />
          </ConditionGroup>
        )}

        {flowField && formFieldVisibility[flowField.id] && (
          <ConditionGroup spacing={3} label={"Flow Targeting"}>
            {flows.length > 0 ? (
              <>
                <SelectInput
                  field={flowField}
                  visible={isFieldSet(type.id)}
                  formValues={formValues}
                  handleChange={handleChange}
                />
                {flowVersionField &&
                  formFieldVisibility[flowVersionField.id] &&
                  (flowVersionField.options.length > 0 ? (
                    <>
                      <SelectInput
                        field={flowVersionField}
                        visible={isFieldSet(type.id)}
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                      {flowStepField &&
                        formFieldVisibility[flowStepField.id] &&
                        (flowStepField.options.length > 0 ? (
                          <SelectInput
                            field={flowStepField}
                            visible={isFieldSet(type.id)}
                            formValues={formValues}
                            handleChange={handleChange}
                          />
                        ) : (
                          <>
                            This flow has no steps. Please select a different
                            Flow.
                          </>
                        ))}
                    </>
                  ) : (
                    <>
                      This flow has no versions. Please select a different Flow.
                    </>
                  ))}
              </>
            ) : (
              <>
                There are no Flows available for this account. Please select a
                different targeting method.
              </>
            )}
          </ConditionGroup>
        )}

        {formFieldVisibility[attributeRule.id] && (
          <ConditionGroup spacing={3} label={"Custom Rules"}>
            <CallbackFnEditor
              field={attributeRule}
              formValues={formValues}
              handleChange={handleCallbackChange}
            />
          </ConditionGroup>
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
