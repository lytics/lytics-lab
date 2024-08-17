import React, { ReactNode } from "react";
import { Grid } from "@mui/material"; // Importing necessary components from Material-UI

interface ColorPickerProps {
  children: ReactNode | ReactNode[];
  spacing?: number;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  children,
  spacing,
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <Grid container spacing={spacing || 3} pr={5}>
      {childrenArray.map((child, index) => (
        <Grid key={`color-${index}`} item xs={6} md={4} lg={3}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
};
