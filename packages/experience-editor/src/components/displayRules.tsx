import React from "react";
import { Stack } from "@mui/material";
import { SelectInput } from "../components/form/select";
import { NumberedSection } from "../components/form/numberedSection";
import { TextInput } from "../components/form/input";
import { SelectMultipleInput } from "../components/form/selectMultiple";
import { ConditionGroup } from "../components/form/conditionGroup";
import { SectionHeader } from "../components/form/sectionHeader";
import { EmptyState } from "../utility/emptyState";
import { RemoveRedEye } from "@mui/icons-material";
import {
  layout,
  displayConditions,
  hideAfter,
  pageVisits,
  scrollPercentageToDisplay,
  showDelay,
  showOnExitIntent,
  impressionsGlobalDuration,
  impressionsGlobalSession,
  impressionsGlobalTotal,
  impressionsWidgetDuration,
  impressionsWidgetSession,
  impressionsWidgetTotal,
  hideAfterActionClosedHideCount,
  hideAfterActionClosedHideDuration,
  hideAfterActionConfirmHideCount,
  hideAfterActionConfirmHideDuration,
  hideAfterActionCancelHideCount,
  hideAfterActionCancelHideDuration,
} from "../data/pfa-fields";

interface DisplayRulesSectionProps {
  formValues: { [key: string]: string };
  isFieldSet: (id: string) => boolean;
  handleChange: (id: string, value: string) => void;
  formFieldVisibility: { [key: string]: boolean };
  spacing?: number;
}

export const DisplayRulesSection: React.FC<DisplayRulesSectionProps> = ({
  formValues,
  handleChange,
  formFieldVisibility,
  spacing = 3,
  isFieldSet,
}) => {
  const fieldValueContains = (
    field: string,
    value: string | string[]
  ): boolean => {
    const values = Array.isArray(value) ? value : [value];
    return values.some((v) => {
      const fieldValue = formValues[field];
      const fieldValueArray = fieldValue?.split(",");

      // iterate through fieldValueArray and look for exact match
      return fieldValueArray.some((fv) => fv === v);

      // return typeof fieldValue === "string" && fieldValue.includes(v);
    });
  };

  return (
    <NumberedSection
      icon={<RemoveRedEye />}
      headline={
        "Are there any other special conditions you'd like your widget to display under?"
      }
    >
      {!isFieldSet(layout.id) && (
        <EmptyState
          message={
            "Please select a layout before configuring display conditions."
          }
        />
      )}
      {isFieldSet(layout.id) && (
        <>
          <SelectMultipleInput
            field={displayConditions}
            position="default"
            visible={isFieldSet(layout.id)}
            formValues={formValues}
            handleChange={handleChange}
          />

          {isFieldSet(displayConditions.id) && (
            <Stack pt={2} spacing={3} flex={1}>
              {fieldValueContains(displayConditions.id, [
                hideAfter.id,
                pageVisits.id,
                scrollPercentageToDisplay.id,
                showDelay.id,
                showOnExitIntent.id,
              ]) && (
                <Stack spacing={2}>
                  <SectionHeader
                    variation="secondary"
                    headline={
                      "Wait to show the widget for a period of time or until certain content has been consumed?"
                    }
                    description={
                      "Control when and how your widget is displayed based on visitor interactions and delays."
                    }
                  />

                  <ConditionGroup
                    spacing={spacing}
                    label={"Interactions & Delays"}
                  >
                    <Stack spacing={spacing} direction={"column"}>
                      <TextInput
                        field={hideAfter}
                        type="number"
                        visible={fieldValueContains(
                          displayConditions.id,
                          hideAfter.id
                        )}
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />

                      <TextInput
                        field={pageVisits}
                        type="number"
                        visible={fieldValueContains(
                          displayConditions.id,
                          pageVisits.id
                        )}
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />

                      <TextInput
                        field={scrollPercentageToDisplay}
                        type="number"
                        visible={fieldValueContains(
                          displayConditions.id,
                          scrollPercentageToDisplay.id
                        )}
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />

                      <TextInput
                        field={showDelay}
                        type="number"
                        visible={fieldValueContains(
                          displayConditions.id,
                          showDelay.id
                        )}
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />

                      <SelectInput
                        field={showOnExitIntent}
                        visible={fieldValueContains(
                          displayConditions.id,
                          showOnExitIntent.id
                        )}
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                    </Stack>
                  </ConditionGroup>
                </Stack>
              )}

              {fieldValueContains(displayConditions.id, "impressions") && (
                <Stack spacing={3}>
                  <SectionHeader
                    variation="secondary"
                    headline={"Hide after receiving impressions?"}
                    description={
                      "Impression settings applied globally will result in all widget interactions contributing to the logic. For instance, if you have three widgets running and a visitors sees each of them once, that will result in 3 total global impressions."
                    }
                  />
                  <Stack spacing={spacing} direction={"row"}>
                    <ConditionGroup spacing={spacing} label={"Widget"}>
                      <TextInput
                        field={impressionsWidgetSession}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsWidgetSession.id] ||
                          !impressionsWidgetSession.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />

                      <TextInput
                        field={impressionsWidgetTotal}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsWidgetTotal.id] ||
                          !impressionsWidgetTotal.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />

                      <TextInput
                        field={impressionsWidgetDuration}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsWidgetDuration.id] ||
                          !impressionsWidgetDuration.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />
                    </ConditionGroup>

                    <ConditionGroup spacing={spacing} label={"Global"}>
                      <TextInput
                        field={impressionsGlobalSession}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsGlobalSession.id] ||
                          !impressionsGlobalSession.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />
                      <TextInput
                        field={impressionsGlobalTotal}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsGlobalTotal.id] ||
                          !impressionsGlobalTotal.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />
                      <TextInput
                        field={impressionsGlobalDuration}
                        type="number"
                        visible={
                          formFieldVisibility[impressionsGlobalDuration.id] ||
                          !impressionsGlobalDuration.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                        size="small"
                      />
                    </ConditionGroup>
                  </Stack>
                </Stack>
              )}

              {fieldValueContains(displayConditions.id, "hideAfterAction") && (
                <Stack spacing={3}>
                  <SectionHeader
                    variation="secondary"
                    headline={"Hide after specific actions?"}
                    description={
                      "Impression settings applied globally will result in all widget interactions contributing to the logic. For instance, if you have three widgets running and a visitors sees each of them once, that will result in 3 total global impressions."
                    }
                  />
                  <Stack spacing={spacing} direction={"row"}>
                    <ConditionGroup
                      spacing={spacing}
                      label={"After Closing Widget"}
                    >
                      <TextInput
                        field={hideAfterActionClosedHideCount}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionClosedHideCount.id
                          ] || !hideAfterActionClosedHideCount.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                      <TextInput
                        field={hideAfterActionClosedHideDuration}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionClosedHideDuration.id
                          ] || !hideAfterActionClosedHideDuration.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                    </ConditionGroup>
                    <ConditionGroup
                      spacing={spacing}
                      label={"After Pressing Confirm"}
                    >
                      <TextInput
                        field={hideAfterActionConfirmHideCount}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionConfirmHideCount.id
                          ] || !hideAfterActionConfirmHideCount.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />

                      <TextInput
                        field={hideAfterActionConfirmHideDuration}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionConfirmHideDuration.id
                          ] || !hideAfterActionConfirmHideDuration.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                    </ConditionGroup>
                    <ConditionGroup
                      spacing={spacing}
                      label={"After Pressing Cancel"}
                    >
                      <TextInput
                        field={hideAfterActionCancelHideCount}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionCancelHideCount.id
                          ] || !hideAfterActionCancelHideCount.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />

                      <TextInput
                        field={hideAfterActionCancelHideDuration}
                        type="number"
                        visible={
                          formFieldVisibility[
                            hideAfterActionCancelHideDuration.id
                          ] || !hideAfterActionCancelHideDuration.hidden
                        }
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                    </ConditionGroup>
                  </Stack>
                </Stack>
              )}
            </Stack>
          )}
        </>
      )}
    </NumberedSection>
  );
};
