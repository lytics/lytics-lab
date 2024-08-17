import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Label } from "@mui/icons-material";

export interface NumberedSectionProps {
  icon: React.ReactNode;
  inputSpaceVertical?: number;
  headline: string;
  description?: string;
  children: React.ReactNode;
  sx?: any;
}

export interface StepHeaderProps {
  headline: string;
  description?: string;
  icon: React.ReactNode;
}

export const StepHeader: React.FC<StepHeaderProps> = ({
  headline,
  description = "",
  icon = <Label />,
}) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" pb={0}>
      <Avatar
        sx={{
          background:
            "linear-gradient(114.71deg, #267BC6 35.06%, #5FA8E9 88.83%)",
          color: "#FFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Avatar>
      <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
        {headline}
      </Typography>
      {description && (
        <Typography sx={{ fontSize: "14px", color: "#666" }}>
          {description}
        </Typography>
      )}
    </Stack>
  );
};

export const NumberedSection: React.FC<NumberedSectionProps> = ({
  children,
  description,
  inputSpaceVertical,
  headline,
  icon,
  sx,
}) => {
  return (
    <Stack
      direction="column"
      spacing={inputSpaceVertical || 3}
      flex={1}
      p={5}
      sx={sx}
    >
      <StepHeader icon={icon} headline={headline} description={description} />
      {children}
    </Stack>
  );
};
