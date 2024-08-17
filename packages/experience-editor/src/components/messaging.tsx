import React from "react";
import { Box, Stack } from "@mui/material";

import {
  headline,
  message,
  okShow,
  okMessage,
  cancelShow,
  cancelMessage,
} from "../data/pfa-fields";

import { Message } from "@mui/icons-material";

import { TextAreaInput } from "../components/form/textarea";
import { TextInput } from "../components/form/input";
import { CheckboxInput } from "../components/form/checkbox";
import { NumberedSection } from "../components/form/numberedSection";

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
  spacing,
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
      <Stack direction="row" spacing={spacing}>
        <Stack direction={"column"} spacing={0} minWidth={325}>
          <CheckboxInput
            field={okShow}
            visible={formFieldVisibility[okShow.id] || !okShow.hidden}
            formValues={formValues}
            handleChange={handleChange}
          />
          <Box pl={4} pr={5}>
            <TextInput
              field={okMessage}
              visible={isFieldSet(okShow.id)}
              size="small"
              formValues={formValues}
              handleChange={handleChange}
            />
          </Box>
        </Stack>
        <Stack direction={"column"} spacing={0} minWidth={325}>
          <CheckboxInput
            field={cancelShow}
            visible={formFieldVisibility[cancelShow.id] || !cancelShow.hidden}
            formValues={formValues}
            handleChange={handleChange}
          />
          <Box pl={4} pr={5}>
            <TextInput
              field={cancelMessage}
              visible={isFieldSet(cancelShow.id)}
              size="small"
              formValues={formValues}
              handleChange={handleChange}
            />
          </Box>
        </Stack>
      </Stack>
    </NumberedSection>
  );
};
