import React from "react";
import { Stack, Typography } from "@mui/material";
import { Field } from "../../data/pfa-fields";
import { helperTextStyles } from "../styles/inputLabel";

export interface ColorInputProps {
  field: Field;
  visible: boolean;
  formValues: { [key: string]: string };
  handleChange: (id: string, value: string) => void;
}

export const ColorInput: React.FC<ColorInputProps> = (colorInputProps) => {
  const { field, formValues, handleChange, visible } = colorInputProps;

  return (
    <>
      {visible && (
        <Stack>
          <input
            type="color"
            id={field.id}
            value={formValues[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
            style={{ width: "100%", height: "50px" }}
          />
          <Typography
            variant="body2"
            textAlign={"center"}
            sx={{ ...helperTextStyles }}
          >
            {field.label}
          </Typography>
        </Stack>
      )}
    </>
  );
};
