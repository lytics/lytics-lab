import React, { useEffect } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { Field } from "../../data/pfa-fields";

export interface CheckboxInputProps {
  field: Field;
  visible: boolean;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const CheckboxInput: React.FC<CheckboxInputProps> = (textInputProps) => {
  const { field, formValues, handleChange, visible } = textInputProps;

  useEffect(() => {
    if (!visible) {
      handleChange(field.id, "false");
    }
  }, [visible, field.id]);

  return (
    <>
      {visible && (
        <FormControlLabel
          value="end"
          control={
            <Checkbox
              id={field.id}
              checked={formValues[field.id] === "true"}
              onChange={(e) =>
                handleChange(field.id, e.target.checked.toString())
              }
              required={field.required}
            />
          }
          label={field.label}
          labelPlacement="end"
        />
      )}
    </>
  );
};
