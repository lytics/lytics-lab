import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { Field } from "../../data/pfa-fields";

export interface RadioGroupInputProps {
  field: Field;
  visible: boolean;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
  row?: boolean;
}

export const RadioGroupInput: React.FC<RadioGroupInputProps> = ({
  field,
  formValues,
  handleChange,
  visible,
  row = false,
}) => {
  return (
    <>
      {visible && (
        <FormControl fullWidth>
          <FormLabel id={`${field.id}-label`}>{field.label}</FormLabel>
          <RadioGroup
            aria-labelledby={`${field.id}-label`}
            name={field.id}
            value={formValues[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            row={row}
          >
            {field.options?.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {field.description && (
            <FormHelperText>{field.description}</FormHelperText>
          )}
        </FormControl>
      )}
    </>
  );
};
