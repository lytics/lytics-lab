import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Field } from "../../data/pfa-fields";

export interface SelectInputProps {
  field: Field;
  visible: boolean;
  hidelabel?: boolean;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  field,
  formValues,
  handleChange,
  hidelabel = false,
  visible,
}) => {
  return (
    <>
      {visible && (
        <FormControl fullWidth>
          {!hidelabel && (
            <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
          )}
          <Select
            labelId={`${field.id}-label`}
            id={field.id}
            label={!hidelabel ? field.label : ""}
            value={formValues[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value as string)}
            required={field.required}
            renderValue={(selected) => {
              const selectedOption = field.options?.find(
                (option) => option.value === selected
              );
              return selectedOption?.label || "";
            }}
          >
            {field.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>

          {field.description && (
            <FormHelperText>{field.description}</FormHelperText>
          )}
        </FormControl>
      )}
    </>
  );
};
