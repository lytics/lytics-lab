import { Box, Stack } from "@mui/material";
import React from "react";

export interface DisplayConditionItemProps {
  children: React.ReactNode[];
}

export const DisplayConditionItem: React.FC<DisplayConditionItemProps> = ({
  children,
}) => {
  return (
    <Stack
      mt={3}
      p={3}
      spacing={5}
      sx={{
        flex: 1,
        borderLeft: "5px solid #E0E0E0",
        borderRight: "5px solid #E0E0E0",
        backgroundColor: "#FFF",
      }}
    >
      {children.map((child, index) => (
        <Box key={index}>{child}</Box>
      ))}
    </Stack>
  );
};
