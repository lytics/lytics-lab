import React from "react";
import { Box } from "@mui/material";
import WidgetWizard from "./components/widgetWizard";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { LightBlueGray, DarkestBlueGray } from "./utility/colors";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:focus": {
            boxShadow: "none",
            borderColor: "none",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          borderRadius: "5px 5px 0 0",
          fieldset: {
            borderColor: LightBlueGray,
          },
          "& .MuiInputLabel-asterisk": {
            color: "red",
          },
          "& .MuiOutlinedInput-root": {
            background: "#FFF",
            borderRadius: "5px 5px 0 0",
            borderColor: LightBlueGray,
          },
          "& .MuiFormHelperText-root": {
            color: DarkestBlueGray,
            fontSize: "12px",
          },
          "& .MuiInputBase-input": {
            backgroundColor: "#FFF",
            "&:focus": {
              boxShadow: "none",
              borderColor: "none",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          width: "100%",
          borderRadius: "5px 5px 0 0",
          fieldset: {
            borderColor: LightBlueGray,
          },
          "& .MuiSelect-select": {
            backgroundColor: "#FFF",
            "&:focus": {
              boxShadow: "none",
              borderColor: "none",
            },
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          background: LightBlueGray,
          color: DarkestBlueGray,
          fontSize: "12px",
          margin: 0,
          padding: "5px 10px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
        },
      },
    },
  },
});

type CoreWidgetWizardProps = {
  accountid: string;
  accesstoken: string;
  pathforaconfig: string;
  availableaudiences: string;
  availablecollections: string;
  availablefields: string;
  titlefield: string;
  descriptionfield: string;
  statusfield: string;
  configurationfield: string;
};

const CoreWidgetWizard: React.FC<CoreWidgetWizardProps> = ({
  accountid,
  accesstoken,
  pathforaconfig,
  availableaudiences,
  availablecollections,
  availablefields,
  titlefield,
  descriptionfield,
  statusfield,
  configurationfield,
}) => {
  // url decode the pathfora config
  try {
    pathforaconfig = atob(pathforaconfig);
  } catch (e) {
    pathforaconfig = "";
  }

  console.log("testing");

  return (
    <Box p={0} mb={2} bgcolor="#FFF">
      <ThemeProvider theme={theme}>
        <WidgetWizard
          accountid={accountid || ""}
          accesstoken={accesstoken || ""}
          pathforaconfig={pathforaconfig || ""}
          availableaudiences={availableaudiences || ""}
          availablecollections={availablecollections || ""}
          availablefields={availablefields || ""}
          titlefield={titlefield || "edit-title"}
          descriptionfield={descriptionfield || "edit-description"}
          statusfield={statusfield || "edit-status"}
          configurationfield={configurationfield || "edit-configuration"}
        />
      </ThemeProvider>
    </Box>
  );
};

export default CoreWidgetWizard;
