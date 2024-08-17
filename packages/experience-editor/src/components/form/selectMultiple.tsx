import React, { useEffect } from "react";
import {
  Checkbox,
  ListItemText,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Field } from "../../data/pfa-fields";

export interface SelectMultipleInputProps {
  field: Field;
  visible: boolean;
  position: string;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const SelectMultipleInput: React.FC<SelectMultipleInputProps> = (
  selectMultipleInputProps
) => {
  const { field, formValues, handleChange, position, visible } =
    selectMultipleInputProps;

  const [activeConditions, setActiveConditions] = React.useState<string[]>([]);

  useEffect(() => {
    const value = formValues[field.id];

    if (value === "") {
      setActiveConditions([]);
    } else {
      setActiveConditions(formValues[field.id]?.split(","));
    }
  }, [formValues]);

  const handleSelectCheckChange = (
    event: SelectChangeEvent<typeof activeConditions>
  ) => {
    const {
      target: { value },
    } = event;

    const stringValue = typeof value === "string" ? value : value.join(",");
    handleChange(field.id, stringValue);
  };

  return (
    <>
      {visible && (
        <FormControl fullWidth>
          <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
          <Select
            labelId={`${field.id}-label`}
            id={field.id}
            label={field.label}
            multiple
            value={activeConditions || []}
            onChange={handleSelectCheckChange}
            required={field.required}
            renderValue={(selected) => {
              return selected.join(", ");
            }}
          >
            {field.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox
                  checked={activeConditions?.indexOf(option.value) > -1}
                />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{field.description || undefined}</FormHelperText>
        </FormControl>
      )}
    </>
  );
};
