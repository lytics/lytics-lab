import { Message } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import { CheckboxInput } from "../components/form/checkbox";
import { TextInput } from "../components/form/input";
import { NumberedSection } from "../components/form/numberedSection";
import { TextAreaInput } from "../components/form/textarea";
import {
  cancelMessage,
  cancelShow,
  headline,
  message,
  okLinkNewTab,
  okLinkURL,
  okMessage,
  okShow,
  okShowLink,
} from "../data/pfa-fields";
import { ConditionGroup } from "./form/conditionGroup";

interface MessagingSectionProps {
  formValues: { [key: string]: string };
  isFieldSet: (id: string) => boolean;
  handleChange: (id: string, value: string) => void;
  formFieldVisibility: { [key: string]: boolean };
  spacing?: number;
}

export const MessagingSection: React.FC<MessagingSectionProps> = ({
  formValues,
  handleChange,
  formFieldVisibility,
  isFieldSet,
}) => {
  return (
    <NumberedSection
      icon={<Message />}
      headline={"What would you like your widget to say?"}
    >
      <TextInput
        field={headline}
        visible={formFieldVisibility[headline.id] || !headline.hidden}
        formValues={formValues}
        handleChange={handleChange}
      />
      <TextAreaInput
        field={message}
        visible={formFieldVisibility[message.id] || !message.hidden}
        formValues={formValues}
        handleChange={handleChange}
      />
      <Box>
        <CheckboxInput
          field={okShow}
          visible={formFieldVisibility[okShow.id] || !okShow.hidden}
          formValues={formValues}
          handleChange={handleChange}
        />
        <Box pl={2} pb={1}>
          <TextInput
            field={okMessage}
            visible={isFieldSet(okShow.id)}
            size="small"
            formValues={formValues}
            handleChange={handleChange}
          />
          <CheckboxInput
            field={okShowLink}
            visible={isFieldSet(okShow.id)}
            formValues={formValues}
            handleChange={handleChange}
          />
          {isFieldSet(okShowLink.id) && (
            <ConditionGroup spacing={3} label={"Confirm Button Target Link"}>
              <TextInput
                field={okLinkURL}
                visible={isFieldSet(okShowLink.id)}
                size="small"
                formValues={formValues}
                handleChange={handleChange}
              />
              <CheckboxInput
                field={okLinkNewTab}
                visible={isFieldSet(okShowLink.id)}
                formValues={formValues}
                handleChange={handleChange}
              />
            </ConditionGroup>
          )}
        </Box>
        <CheckboxInput
          field={cancelShow}
          visible={formFieldVisibility[cancelShow.id] || !cancelShow.hidden}
          formValues={formValues}
          handleChange={handleChange}
        />
        <Box pl={2}>
          <TextInput
            field={cancelMessage}
            visible={isFieldSet(cancelShow.id)}
            size="small"
            formValues={formValues}
            handleChange={handleChange}
          />
        </Box>
      </Box>
    </NumberedSection>
  );
};
