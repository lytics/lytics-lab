import React from "react";
import { TextField } from "@mui/material";
import { Field } from "../../data/pfa-fields";

export interface TextAreaProps {
  field: Field;
  visible: boolean;
  rows?: number;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const TextAreaInput: React.FC<TextAreaProps> = (textAreaProps) => {
  const { field, formValues, handleChange, visible, rows } = textAreaProps;

  return (
    <>
      {visible && (
        <TextField
          key={field.id}
          id={field.id}
          label={field.label}
          value={formValues[field.id] || ""}
          onChange={(e) => handleChange(field.id, e.target.value)}
          required={field.required}
          helperText={field.description || undefined}
          multiline
          rows={rows || 4}
          InputLabelProps={{ shrink: true }}
        />
      )}{" "}
    </>
  );
};
