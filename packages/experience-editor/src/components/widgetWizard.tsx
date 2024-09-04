import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Tab, Tabs, Typography } from "@mui/material";

import {
  Field,
  SelectOption,
  type,
  headline,
  layout,
  variant,
  theme,
  backgroundColor,
  textColor,
  headlineColor,
  closeColor,
  actionBackgroundColor,
  actionTextColor,
  cancelBackgroundColor,
  cancelTextColor,
  fieldBackgroundColor,
  message,
  okShow,
  okMessage,
  cancelShow,
  cancelMessage,
  image,
  positionSelector,
  position,
  origin,
  pushDown,
  widgetTitle,
  widgetDescription,
  widgetSlug,
  widgetStatus,
  displayConditions,
  hideAfter,
  pageVisits,
  scrollPercentageToDisplay,
  showDelay,
  showOnExitIntent,
  impressionsGlobalDuration,
  impressionsGlobalSession,
  impressionsGlobalTotal,
  impressionsWidgetDuration,
  impressionsWidgetSession,
  impressionsWidgetTotal,
  hideAfterActionClosedHideCount,
  hideAfterActionClosedHideDuration,
  hideAfterActionConfirmHideCount,
  hideAfterActionConfirmHideDuration,
  hideAfterActionCancelHideCount,
  hideAfterActionCancelHideDuration,
  urlContains,
  confirmAction,
  cancelAction,
  closeAction,
  onInit,
  onLoad,
  audience,
  formElements,
  contentCollection,
  contentVisited,
  contentShuffle,
  contentDisplayTitle,
  contentDisplayImage,
  contentDisplayDescription,
  contentDisplayDescriptionLimit,
} from "../data/pfa-fields";

import { TextAreaInput } from "./form/textarea";
import { TextInput } from "./form/input";
import { SelectInput } from "./form/select";
import { SectionHeader } from "./form/sectionHeader";
import { CodeEditor } from "./form/codeEditor";
import { MessagingSection } from "./messaging";
import { TargetingSection } from "./targeting";
import { PositionSection } from "./position";
import { BrandingSection } from "./branding";
import { DisplayRulesSection } from "./displayRules";
import { RecommendationSection } from "./recommendation";
import { PathforaHandler } from "../utility/pathforaInterface";
import { CallbackFnEditor } from "./form/callbackFn";
import { FormBuilder } from "./formBuilder";

import { removeEmptyObjects, getValueByDotNotation } from "../utility/objects";
import { Visibility } from "@mui/icons-material";

interface WidgetWizardProps {
  accountid: string;
  accesstoken?: string;
  pathforaconfig: string;
  availableaudiences: string;
  availablecollections: string;
  availablefields: string;

  // parent fields
  titlefield: string;
  descriptionfield: string;
  statusfield: string;
  configurationfield: string;
}

const inputSpaceVert = 3;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      flex={1}
      id={`configuration-panel-${index}`}
      {...other}
      minHeight={"400px"}
      bgcolor={"#F7F7F7"}
      ml={1}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

const WidgetWizard: React.FC<WidgetWizardProps> = ({
  accountid,
  pathforaconfig,
  availableaudiences,
  availablecollections,
  titlefield,
  descriptionfield,
  statusfield,
  configurationfield,
}) => {
  const [formValues, setFormValues] = useState<{
    [key: string]: any;
  }>({});
  const [formFieldVisibility, setFormFieldVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [editorTypeTabValue, setEditorTypeTabValue] = useState(0);
  const [basicEditorTabValue, setBasicEditorTabValue] = useState(0);
  const [advancedEditorTabValue, setAdvancedEditorTabValue] = useState(0);
  const [renderedConfig, setRenderedConfig] = useState(pathforaconfig);
  const [pathfora, setPathfora] = useState<any>();
  const [audiences, setAudiences] = useState<SelectOption[]>([]);
  const [collections, setCollections] = useState<SelectOption[]>([]);
  const [slugLink, setSlugLink] = useState<boolean>(true);

  const fields: Field[] = [
    type,
    headline,
    layout,
    variant,
    theme,
    backgroundColor,
    textColor,
    headlineColor,
    closeColor,
    actionBackgroundColor,
    actionTextColor,
    cancelBackgroundColor,
    cancelTextColor,
    fieldBackgroundColor,
    message,
    okShow,
    okMessage,
    cancelShow,
    cancelMessage,
    image,
    positionSelector,
    position,
    origin,
    pushDown,
    widgetTitle,
    widgetDescription,
    widgetSlug,
    widgetStatus,
    displayConditions,
    hideAfter,
    pageVisits,
    scrollPercentageToDisplay,
    showDelay,
    showOnExitIntent,
    impressionsGlobalDuration,
    impressionsGlobalSession,
    impressionsGlobalTotal,
    impressionsWidgetDuration,
    impressionsWidgetSession,
    impressionsWidgetTotal,
    hideAfterActionCancelHideCount,
    hideAfterActionClosedHideDuration,
    hideAfterActionClosedHideCount,
    hideAfterActionConfirmHideCount,
    hideAfterActionConfirmHideDuration,
    hideAfterActionCancelHideCount,
    hideAfterActionCancelHideDuration,
    urlContains,
    confirmAction,
    cancelAction,
    closeAction,
    onInit,
    onLoad,
    audience,
    formElements,
    contentCollection,
    contentVisited,
    contentShuffle,
    contentDisplayTitle,
    contentDisplayImage,
    contentDisplayDescription,
    contentDisplayDescriptionLimit,
  ];

  const tabToValueMapping = {
    "basic-tab-0": 0,
    "basic-tab-1": 1,
    "basic-tab-2": 2,
    "basic-tab-3": 3,
    "basic-tab-4": 4,
    "basic-tab-5": 5,
    "basic-tab-6": 6,
  };

  useEffect(() => {
    if (availableaudiences) {
      const decodedAudiences = atob(availableaudiences);
      setAudiences(JSON.parse(decodedAudiences));
    }

    if (availablecollections) {
      const decodedCollections = atob(availablecollections);
      setCollections(JSON.parse(decodedCollections));
    }
  }, []);

  // initialize the pathfora handler
  useEffect(() => {
    const pathforaHandler = async () => {
      try {
        const handler = new PathforaHandler(true, true, accountid);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed
        setPathfora(handler);
      } catch (error) {
        console.error("Error creating PathforaHandler:", error);
      }
    };

    pathforaHandler();
  }, []);

  // render existing configuration
  useEffect(() => {
    updateValuesFromConfig(pathforaconfig);
  }, []);

  // update source fields when any value changes
  useEffect(() => {
    checkSourceLink();
  }),
    [formValues];

  useEffect(() => {
    const editConfig = document.getElementById(
      "edit-configuration",
    ) as HTMLInputElement;
    if (editConfig) {
      editConfig.value = renderConfiguration();
    }
  }, [formValues]);

  const handlePathforaPreview = () => {
    let config = JSON.parse(renderedConfig);
    const widget = pathfora?.deserializeWidget(config);
    pathfora?.testWidget(widget);
  };

  const updateValuesFromConfig = (config: string) => {
    if (!config) {
      config = JSON.stringify({
        details: {
          status: "draft",
        },
      });
    }
    const inboundPathforaConfig = JSON.parse(config);

    // handle basic fields
    fields.forEach((field) => {
      const { id, render } = field;
      let value = getValueByDotNotation(inboundPathforaConfig, render);

      // if we have no status set it to draft
      if (id === widgetStatus.id && !value) {
        value = "draft";
      }

      setFormValues((prevState) => ({
        ...prevState,
        [id]: value,
      }));

      checkDependency(field.id, value);
    });
  };

  const handleEditorTypeTabChange = (event, newValue) => {
    setEditorTypeTabValue(newValue);
  };

  const handleBasicEditorTabChange = (event, newValue) => {
    const id = event.target.id;
    const value = tabToValueMapping[id];
    setBasicEditorTabValue(value);
  };

  const handleAdvancedEditorTabChange = (event, newValue) => {
    setAdvancedEditorTabValue(newValue);
  };

  const sluggifyString = (str: string) => {
    return str
      .toLowerCase()
      .replace(/ /g, "_")
      .replace(/[^a-z0-9_-]/g, "");
  };

  const handleSlugLink = (fieldId: string, value: any) => {
    // special case handler for slug linking
    if (fieldId === widgetTitle.id && slugLink) {
      if (
        formValues[widgetSlug.id] &&
        formValues[widgetSlug.id] !== sluggifyString(formValues[widgetTitle.id])
      ) {
        setSlugLink(false);
        return;
      }

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [widgetSlug.id]: sluggifyString(value),
      }));
    }
    if (fieldId === widgetSlug.id) {
      // if it doesn't match the slugified title then unlink it
      if (value !== sluggifyString(formValues[widgetTitle.id])) {
        setSlugLink(false);
      }
    }
  };

  const handleChange = (fieldId: string, value: any) => {
    handleSlugLink(fieldId, value);
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldId]: value,
    }));
    checkDependency(fieldId, value);
  };

  const renderConfiguration = () => {
    let config = {};

    fields.forEach((field) => {
      // check if we have a valid value set
      const hasValue = formValues[field.id] !== undefined;

      // if we have a value render its position in the config object
      const pathArray = field.render.split(".");
      const pathsToVerify = pathArray.slice(0, pathArray.length - 1);

      // loop each of the paths to verify and ensure there is a value set, we can assume these will all be objects
      let currentObject = config;
      pathsToVerify.forEach((path) => {
        if (!currentObject[path]) {
          currentObject[path] = {};
        }
        currentObject = currentObject[path];
      });

      // if we have a value set, add it to the config object
      if (hasValue) {
        currentObject[pathArray[pathArray.length - 1]] = formValues[field.id];
      }
    });

    config = removeEmptyObjects(config);

    const output = JSON.stringify(config, null, 2);
    setRenderedConfig(output);

    return output;
  };

  const checkSourceLink = () => {
    const titleElement = document.getElementById(
      titlefield,
    ) as HTMLInputElement;
    titleElement.value = formValues[widgetTitle.id] as string;

    const descriptionElement = document.getElementById(
      descriptionfield,
    ) as HTMLInputElement;
    descriptionElement.value = formValues[widgetDescription.id] as string;

    const statusElement = document.getElementById(
      statusfield,
    ) as HTMLInputElement;
    statusElement.value = formValues[widgetStatus.id] as string;

    const configElement = document.getElementById(
      configurationfield,
    ) as HTMLInputElement;
    configElement.value = renderConfiguration();
  };

  const checkDependency = (fieldID: string, value: string) => {
    const field = fields.find((field) => field.id === fieldID);

    if (!field?.dependencies) {
      return;
    }

    // get all fields to show and hide them initially
    const uniqueFieldsToShow = new Set<string>();
    field.dependencies?.forEach((dependency) => {
      dependency.fieldsToShow.forEach((fieldId: string) => {
        uniqueFieldsToShow.add(fieldId);
      });
    });
    const allFieldsToShow = Array.from(uniqueFieldsToShow);

    // set visibility to false for all fields to show
    allFieldsToShow.forEach((id) => {
      setFormFieldVisibility((prevVisibility) => ({
        ...prevVisibility,
        [id]: false,
      }));
    });

    let valuesToCheck: string[] = [];
    if (field.type === "array" && value) {
      valuesToCheck = value.split(",");
    } else {
      valuesToCheck = [value];
    }

    valuesToCheck.forEach((v) => {
      // see if there is a dependency where the value matches the value set for the field
      const dependencyMatch = field.dependencies?.find(
        (dependency) => dependency.value === v,
      );

      // if there is a match, show the fields
      if (dependencyMatch) {
        dependencyMatch.fieldsToShow.forEach((id) => {
          setFormFieldVisibility((prevVisibility) => ({
            ...prevVisibility,
            [id]: true,
          }));
        });
      }
    });
  };

  const isFieldSet = (field: string): boolean => {
    return (
      formValues[field] !== undefined &&
      formValues[field] !== "" &&
      formValues[field] !== "false"
    );
  };

  const handleConfigChange = (value: string) => {
    updateValuesFromConfig(value);
  };

  const renderCallbackFunction = (value: string) => {
    if (!value) {
      return false;
    }
    let callback;
    try {
      callback = Function('"use strict";return (' + value + ")")();
    } catch (error) {
      console.warn("Invalid function:", error);
      return;
    }
    if (typeof callback !== "function") {
      console.warn("Invalid function:", callback, "is not a function");
      return;
    }
    return callback;
  };

  const handleCallbackChange = (field: Field, value: string) => {
    let callbackFnString = "";

    if (value) {
      const callbackFn = renderCallbackFunction(value);
      if (!callbackFn) {
        throw new Error("Callback function is not defined.");
        return;
      }

      callbackFnString = callbackFn.toString();
    }

    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [field.id]: callbackFnString,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    // no op for now
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        variant="contained"
        color="info"
        onClick={handlePathforaPreview}
        style={{
          position: "fixed",
          right: 13,
          top: "75%",
          transform: "translateX(50%) rotate(-90deg)",
          borderRadius: "10px 10px 0 0",
          zIndex: 1200,
          padding: "10px 25px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          fontSize: "12px",
          letterSpacing: "1.5px",
          fontWeight: 400,
        }}
      >
        Test Widget
      </Button>

      <Stack spacing={3}>
        {/* top level widget details */}
        <Stack spacing={2}>
          <SectionHeader
            headline={"Details"}
            description={
              "Manage the internal facing details and status of your widget."
            }
          />
          <Stack direction={"row"} spacing={5}>
            <Stack direction="column" spacing={inputSpaceVert} flex={1}>
              <Stack direction="row" spacing={inputSpaceVert} flex={1}>
                <Box flex={1}>
                  <TextInput
                    field={widgetTitle}
                    visible={
                      formFieldVisibility[widgetTitle.id] || !widgetTitle.hidden
                    }
                    formValues={formValues}
                    handleChange={handleChange}
                  />
                </Box>
                <Box minWidth={500} maxWidth={600}>
                  <TextInput
                    field={widgetSlug}
                    visible={
                      formFieldVisibility[widgetSlug.id] || !widgetSlug.hidden
                    }
                    formValues={formValues}
                    inputProps={{
                      pattern: "[a-z0-9_\\-]*",
                      title:
                        "Please enter a valid slug (letters, numbers, underscore, and hyphen)",
                    }}
                    handleChange={handleChange}
                  />
                </Box>
              </Stack>
              <TextAreaInput
                field={widgetDescription}
                visible={
                  formFieldVisibility[widgetDescription.id] ||
                  !widgetDescription.hidden
                }
                rows={2}
                formValues={formValues}
                handleChange={handleChange}
              />
            </Stack>
            {/* <Stack
              direction="column"
              spacing={0}
              minWidth={200}
              borderRadius={2}
              overflow={"hidden"}
            >
              <Box
                width={"100%"}
                sx={{
                  background:
                    "linear-gradient(180deg, #165A96 0%, #267BC6 112.6%)",
                }}
              >
                <Typography textAlign={"center"} p={1} color={"#FFF"}>
                  Widget Status
                </Typography>
              </Box>
              <Box bgcolor={"#E9E8EE"} p={2} sx={{ flexGrow: 1 }}>
                <SelectInput
                  field={widgetStatus}
                  hidelabel={true}
                  visible={
                    formFieldVisibility[widgetStatus.id] || !widgetStatus.hidden
                  }
                  formValues={formValues}
                  handleChange={handleChange}
                />
              </Box>
            </Stack> */}
          </Stack>
        </Stack>

        {/* configure widget details */}
        <Stack pt={3} spacing={inputSpaceVert}>
          <SectionHeader
            headline={"Configuration"}
            description={
              "Manage the details of your campaign such as top-level type, design and display conditions."
            }
          />
          <SelectInput
            field={type}
            visible={formFieldVisibility[type.id] || !type.hidden}
            formValues={formValues}
            handleChange={handleChange}
          />

          {isFieldSet(type.id) && (
            <Stack flex={1} spacing={0}>
              <Tabs
                value={editorTypeTabValue}
                onChange={handleEditorTypeTabChange}
                style={{ marginLeft: "auto" }}
                sx={{
                  "& .MuiButtonBase-root": {
                    "&:focus": {
                      boxShadow: "none",
                      borderColor: "none",
                    },
                  },
                  background: "#E5E5EB",
                }}
              >
                <Tab label="Basic Editor" />
                <Tab label="Advanced Editor" />
              </Tabs>

              {editorTypeTabValue === 1 && (
                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex",
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={advancedEditorTabValue}
                    onChange={handleAdvancedEditorTabChange}
                    sx={{
                      borderRight: 1,
                      borderColor: "divider",
                      "& .MuiButtonBase-root": {
                        "&:focus": {
                          boxShadow: "none",
                          borderColor: "none",
                        },
                      },
                    }}
                  >
                    <Tab label="Callbacks" id={"advanced-tab-0"} />
                    <Tab label="Pathfora" id={"advanced-tab-1"} />
                    {/* <Tab label="CSS" id={"advanced-tab-1"} /> */}
                  </Tabs>

                  {/* Callback Function Editor Tab */}
                  <TabPanel value={advancedEditorTabValue} index={0}>
                    <Stack spacing={3} pl={1}>
                      <Stack direction={"row"} spacing={3}>
                        <CallbackFnEditor
                          field={confirmAction}
                          formValues={formValues}
                          handleChange={handleCallbackChange}
                        />
                        <CallbackFnEditor
                          field={cancelAction}
                          formValues={formValues}
                          handleChange={handleCallbackChange}
                        />
                      </Stack>
                      <Stack
                        direction={"row"}
                        spacing={3}
                        flex={1}
                        alignItems={"stretch"}
                      >
                        <CallbackFnEditor
                          field={closeAction}
                          formValues={formValues}
                          handleChange={handleCallbackChange}
                        />
                        <CallbackFnEditor
                          field={onInit}
                          formValues={formValues}
                          handleChange={handleCallbackChange}
                        />
                      </Stack>
                      <CallbackFnEditor
                        field={onLoad}
                        formValues={formValues}
                        handleChange={handleCallbackChange}
                      />
                    </Stack>
                  </TabPanel>

                  {/* Pathfora Editor Tab */}
                  <TabPanel value={advancedEditorTabValue} index={1}>
                    <Box pl={1}>
                      <CodeEditor
                        value={renderedConfig}
                        onChange={handleConfigChange}
                      />
                    </Box>
                  </TabPanel>

                  {/* CSS Editor Tab */}
                  {/* <TabPanel value={advancedEditorTabValue} index={2}>
                    <Box>
                      <CodeEditor value={""} onChange={handleConfigChange} />
                    </Box>
                  </TabPanel> */}
                </Box>
              )}
              {editorTypeTabValue === 0 && (
                <Box
                  sx={{
                    flexGrow: 1,
                    bgcolor: "background.paper",
                    display: "flex",
                  }}
                >
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={basicEditorTabValue}
                    // onChange={handleBasicEditorTabChange}
                    onChange={(event, newValue) =>
                      handleBasicEditorTabChange(event, newValue)
                    }
                    sx={{
                      borderRight: 1,
                      borderColor: "divider",
                      "& .MuiButtonBase-root": {
                        "&:focus": {
                          boxShadow: "none",
                          borderColor: "none",
                        },
                      },
                    }}
                  >
                    <Tab label="Messaging" id={"basic-tab-0"} />
                    <Tab label="Targeting" id={"basic-tab-1"} />
                    <Tab label="Layout" id={"basic-tab-2"} />
                    <Tab label="Branding" id={"basic-tab-3"} />
                    <Tab label="Display Rules" id={"basic-tab-4"} />
                    <Tab
                      label="Form Fields"
                      id={"basic-tab-5"}
                      disabled={formValues[type.id] !== "form"}
                      sx={{
                        "&.Mui-disabled": {
                          color: "gray",
                          cursor: "not-allowed",
                          opacity: 0.2,
                        },
                      }}
                    />
                    <Tab
                      label="Recommendation"
                      id={"basic-tab-6"}
                      disabled={formValues[type.id] !== "recommendation"}
                      sx={{
                        "&.Mui-disabled": {
                          color: "gray",
                          cursor: "not-allowed",
                          opacity: 0.2,
                        },
                      }}
                    />
                  </Tabs>

                  {/* Messaging Tab */}
                  <TabPanel value={basicEditorTabValue} index={0}>
                    <MessagingSection
                      formValues={formValues}
                      isFieldSet={isFieldSet}
                      handleChange={handleChange}
                      formFieldVisibility={formFieldVisibility}
                      spacing={inputSpaceVert}
                    />
                  </TabPanel>

                  {/* Taregeting Tab */}
                  <TabPanel value={basicEditorTabValue} index={1}>
                    <TargetingSection
                      formValues={formValues}
                      isFieldSet={isFieldSet}
                      handleChange={handleChange}
                      audiences={audiences}
                    />
                  </TabPanel>

                  {/* Position Tab */}
                  <TabPanel value={basicEditorTabValue} index={2}>
                    <PositionSection
                      formValues={formValues}
                      isFieldSet={isFieldSet}
                      handleChange={handleChange}
                      formFieldVisibility={formFieldVisibility}
                      spacing={inputSpaceVert}
                    />
                  </TabPanel>

                  {/* Branding Tab */}
                  <TabPanel value={basicEditorTabValue} index={3}>
                    <BrandingSection
                      formValues={formValues}
                      handleChange={handleChange}
                      formFieldVisibility={formFieldVisibility}
                    />
                  </TabPanel>

                  {/* Display Rules Tab */}
                  <TabPanel value={basicEditorTabValue} index={4}>
                    <DisplayRulesSection
                      formValues={formValues}
                      isFieldSet={isFieldSet}
                      handleChange={handleChange}
                      formFieldVisibility={formFieldVisibility}
                      spacing={inputSpaceVert}
                    />
                  </TabPanel>

                  {/* Form Fields */}
                  {formValues[type.id] === "form" && (
                    <TabPanel value={basicEditorTabValue} index={5}>
                      <FormBuilder
                        formValues={formValues}
                        handleChange={handleChange}
                      />
                    </TabPanel>
                  )}

                  {/* Recommendation Tab */}
                  {formValues[type.id] === "recommendation" && (
                    <TabPanel value={basicEditorTabValue} index={6}>
                      <RecommendationSection
                        formValues={formValues}
                        handleChange={handleChange}
                        formFieldVisibility={formFieldVisibility}
                        spacing={inputSpaceVert}
                        collections={collections}
                      />
                    </TabPanel>
                  )}
                </Box>
              )}
            </Stack>
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default WidgetWizard;
