import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { Field } from "../../data/pfa-fields";
import { helperTextStyles } from "../styles/inputLabel";

export interface TextInputProps {
  field: Field;
  visible: boolean;
  inputProps?: any;
  shrink?: boolean;
  type?: string;
  size?: "small" | "medium" | undefined;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = (textInputProps) => {
  const {
    field,
    formValues,
    handleChange,
    visible,
    size,
    inputProps,
    shrink,
    type,
  } = textInputProps;

  const handleInputChange = (fieldId, value) => {
    let cleansedValue = value;

    if (inputProps) {
      cleansedValue = cleansedValue.toLowerCase().replace(/[^a-z0-9_-]/g, "");
    }

    handleChange(fieldId, cleansedValue);
  };

  useEffect(() => {
    if (!visible) {
      handleInputChange(field.id, "");
    }
  }, [visible]);

  return (
    <>
      {visible && (
        <TextField
          variant="outlined"
          label={field.label}
          key={field.id}
          id={field.id}
          size={size}
          type={type || "text"}
          inputProps={inputProps}
          value={formValues[field.id] || ""}
          onChange={(e) => handleInputChange(field.id, e.target.value)}
          required={field.required}
          multiline
          rows={1}
          helperText={field.description || undefined}
          InputLabelProps={{ shrink: shrink || true }}
        />
      )}
    </>
  );
};
