import React from "react";
import { Box, Typography } from "@mui/material";

export interface SectionHeaderProps {
  headline: string;
  description?: string;
  variation?: "primary" | "secondary";
  sx?: any;
}

const headerPrimary = {
  fontSize: "24px",
  fontWeight: 600,
};

const headerSecondary = {
  fontSize: "20px",
  fontWeight: 400,
};

const subheadPrimary = {
  fontSize: "14px",
  color: "#6E6E6E",
};

const subheadSecondary = {
  fontSize: "12px",
  color: "#6E6E6E",
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  headline,
  description,
  variation = "primary",
  sx,
}) => {
  return (
    <Box sx={{ sx }}>
      <Typography
        sx={variation === "primary" ? headerPrimary : headerSecondary}
      >
        {headline}
      </Typography>

      {description && (
        <Typography
          sx={variation === "primary" ? subheadPrimary : subheadSecondary}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};
