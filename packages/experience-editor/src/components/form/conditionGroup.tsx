import React, { ReactNode } from "react";
import { Box, Stack } from "@mui/material"; // Importing necessary components from Material-UI

interface ConditionGroupProps {
  label: string;
  children: ReactNode;
  spacing: number;
}

export const ConditionGroup: React.FC<ConditionGroupProps> = ({
  children,
  spacing,
  label,
}) => {
  return (
    <Box flex={1} border={1} borderColor={"#DADADA"} bgcolor={"#F1F1F1"}>
      <Box fontSize={"14px"}>
        <Box
          sx={{
            background: "linear-gradient(90deg, #D1C7F5 0%, #B9EDFC 129.79%)",
            padding: "5px 10px",
            display: "inline-block",
            borderBottomRightRadius: 5,
          }}
        >
          {label}
        </Box>
      </Box>
      <Stack spacing={spacing} flex={1} p={3}>
        {children}
      </Stack>
    </Box>
  );
};
