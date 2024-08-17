import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Field } from "../../data/pfa-fields";
import { CodeEditor } from "./codeEditor";

export interface CallbackFnEditorProps {
  field: Field;
  formValues: { [key: string]: string };
  handleChange: (field: Field, value: string) => void;
}

export const CallbackFnEditor: React.FC<CallbackFnEditorProps> = ({
  field,
  formValues,
  handleChange,
}) => {
  return (
    <Stack flex={1}>
      <Box p={2} bgcolor={"rgb(247, 247, 247)"}>
        <Typography fontSize={"18px"} fontWeight={600}>
          {field.label}
        </Typography>
        <Typography variant="body2">{field.description}</Typography>
      </Box>
      <CodeEditor
        value={formValues[field.id]}
        onChange={(value) => handleChange(field, value)}
        height={200}
      />
    </Stack>
  );
};
