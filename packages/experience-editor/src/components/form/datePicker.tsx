import React from "react";
import { Field } from "../../data/pfa-fields";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { helperTextStyles } from "../styles/inputLabel";
import { Typography } from "@mui/material";
import { parseISO } from "date-fns";

export interface DatePickerInputProps {
  field: Field;
  visible: boolean;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const DatePickerInput: React.FC<DatePickerInputProps> = (
  datePickerInputProps,
) => {
  const { field, formValues, handleChange, visible } = datePickerInputProps;

  return (
    <>
      {visible && (
        <div>
          <DateTimePicker
            label={field.label}
            value={formValues[field.id] ? new Date(formValues[field.id]) : null}
            onChange={(newVal: Date) =>
              handleChange(field.id, newVal.toISOString())
            }
          />
          <Typography variant="body2" sx={{ ...helperTextStyles }}>
            {field.description}
          </Typography>
        </div>
      )}{" "}
    </>
  );
};
