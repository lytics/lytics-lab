import { Stack, Typography } from "@mui/material";
import React from "react";

export interface EmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <Stack
      borderRadius={2}
      textAlign={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor={"#EFEFEF"}
      minHeight={"250px"}
    >
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 600,
          color: "#CACACA",
        }}
      >
        {message}
      </Typography>
    </Stack>
  );
};
