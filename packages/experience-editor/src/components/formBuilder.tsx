import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormGroup,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  Delete,
  Edit,
  Save,
  EditNote,
} from "@mui/icons-material";
import { NumberedSection } from "../components/form/numberedSection";
import { formElements as formElementsData } from "../data/pfa-fields";
import { EmptyState } from "../utility/emptyState";

type FormType = "text" | "email" | "textarea" | "select" | "checkbox" | "radio";

interface FormValue {
  label: string;
  value: string;
}

interface FormElement {
  id?: string;
  type: FormType;
  required: boolean;
  label: string;
  placeholder?: string;
  name: string;
  values?: FormValue[];
}

interface FormBuilderProps {
  formValues: { [key: string]: string };
  handleChange: (id: string, value: any) => void;
}

interface FormNodeEditorProps {
  field: FormElement;
  onChange: (field: FormElement) => void;
  onShift: (field: FormElement, direction: number) => void;
  onDelete: (field: FormElement) => void;
}

export const FormNodeEditor: React.FC<FormNodeEditorProps> = ({
  field,
  onChange,
  onShift,
  onDelete,
}): JSX.Element => {
  const [options, setOptions] = useState<FormValue[]>([]);
  const [label, setLabel] = useState<string>("");
  const [placeholder, setPlaceholder] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [required, setRequired] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setLabel(field.label);
    setPlaceholder(field.placeholder || "");
    setName(field.name);
    setRequired(field.required);
    setOptions(field.values || []);

    if (field.name !== "" && field.name !== undefined) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [field]);

  const handleInputChange = ({ field, value }) => {
    let cleansedValue = value;
    switch (field) {
      case "label":
        setLabel(cleansedValue);
        break;
      case "placeholder":
        setPlaceholder(cleansedValue);
        break;
      case "name":
        cleansedValue = cleansedValue.toLowerCase().replace(/[^a-z0-9_-]/g, "");
        setName(cleansedValue);
        break;
      case "required":
        setRequired(cleansedValue);
        break;
      default:
        console.error("Invalid field");
        break;
    }
  };

  const handleOptionChange = (
    index: number,
    field: keyof FormValue,
    value: string
  ) => {
    const newOptions = options.map((option, i) => {
      if (i === index) {
        return { ...option, [field]: value };
      }
      return option;
    });
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, { label: "", value: "" }]);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOpenToggle = (field: FormElement) => {
    setOpen(!open);
  };

  useEffect(() => {
    field.label = label;
    field.placeholder = placeholder;
    field.name = name;
    field.required = required;
    field.values = options;
    onChange(field);
  }, [label, placeholder, name, required, options]);

  return (
    <Stack spacing={1} p={2} borderRadius={2} bgcolor={"#FFF"}>
      <Stack direction={"row"}>
        <Stack direction={"row"} spacing={0} flex={1}>
          <Chip
            color="info"
            label={field.type}
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              borderRadius: 2,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }}
          />
          <Box
            bgcolor={"#f0f0f0"}
            alignContent={"center"}
            p={"2px 20px"}
            sx={{
              fontWeight: 500,
              borderRadius: 2,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <Typography variant="body1">{field.name}</Typography>
          </Box>
        </Stack>
        <Stack
          alignItems={"end"}
          direction="row"
          spacing={0}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box pr={2.5}>
            {open ? (
              <Button
                variant="outlined"
                startIcon={<Save />}
                onClick={() => handleOpenToggle(field)}
                size="small"
                sx={{
                  m: 0,
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => handleOpenToggle(field)}
                size="small"
              >
                Edit
              </Button>
            )}
          </Box>

          <IconButton
            color="primary"
            aria-label="Move Item Up"
            onClick={() => onShift(field, -1)}
            sx={{
              p: 0,
              m: 0,
            }}
          >
            <ArrowCircleUp />
          </IconButton>

          <IconButton
            color="primary"
            aria-label="MoveItem Down"
            onClick={() => onShift(field, 1)}
            sx={{
              p: 0,
              m: 0,
            }}
          >
            <ArrowCircleDown />
          </IconButton>

          <IconButton
            color="error"
            aria-label="Delete Item"
            onClick={() => onDelete(field)}
            sx={{
              p: 0,
              m: 0,
              ml: 2,
            }}
          >
            <Delete />
          </IconButton>
        </Stack>
      </Stack>

      {open && (
        <>
          {/* Required checkbox */}
          <Box flex={1}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    checked={required}
                    onChange={(event) =>
                      handleInputChange({
                        field: "required",
                        value: event.target.checked,
                      })
                    }
                  />
                }
                label="Required"
              />
            </FormGroup>
          </Box>

          {/* Name input */}
          <Box flex={1}>
            <TextField
              id="name"
              label="Name"
              value={name}
              variant="outlined"
              fullWidth
              size="small"
              inputProps={{
                pattern: "[a-z0-9_\\-]*",
                title:
                  "Please enter a valid slug (letters, numbers, underscore, and hyphen)",
              }}
              onChange={(event) =>
                handleInputChange({ field: "name", value: event.target.value })
              }
            />
          </Box>

          {/* Label input */}
          <Box flex={1}>
            <TextField
              id="label"
              label="Label"
              value={label}
              variant="outlined"
              fullWidth
              size="small"
              onChange={(event) =>
                handleInputChange({ field: "label", value: event.target.value })
              }
            />
          </Box>

          {/* Placeholder input */}
          <Box flex={1}>
            <TextField
              id="placeholder"
              label="Placeholder"
              value={placeholder}
              variant="outlined"
              fullWidth
              size="small"
              onChange={(event) =>
                handleInputChange({
                  field: "placeholder",
                  value: event.target.value,
                })
              }
            />
          </Box>

          {/* Options to be added */}
          {field.type === "select" || field.type === "radio" ? (
            <Stack flex={1} pt={2} spacing={1}>
              <Stack direction={"row"}>
                <Box flex={1}>
                  <Typography variant="h6">Options</Typography>
                </Box>
                <Box alignItems={"end"}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleAddOption}
                  >
                    Add Option
                  </Button>
                </Box>
              </Stack>
              <Box>
                <Stack direction={"column"} spacing={2}>
                  {options.map((option, index) => (
                    <Stack direction={"row"} spacing={2}>
                      <TextField
                        id={`label`}
                        label="Label"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={option.label}
                        onChange={(event) =>
                          handleOptionChange(index, "label", event.target.value)
                        }
                      />
                      <TextField
                        id={`value`}
                        label="Value"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={option.value}
                        onChange={(event) =>
                          handleOptionChange(index, "value", event.target.value)
                        }
                      />
                      <Box alignContent={"center"}>
                        <IconButton
                          color="primary"
                          aria-label="Remove Option"
                          onClick={() => handleRemoveOption(index)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Stack>
          ) : (
            <></>
          )}
        </>
      )}
    </Stack>
  );
};

export const FormBuilder: React.FC<FormBuilderProps> = ({
  formValues,
  handleChange,
}) => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);

  const handleAddElement = (element: FormElement) => {
    element.id = Math.random().toString(36).substring(7);
    setFormElements([...formElements, element]);
  };

  useEffect(() => {
    const iniitalValues = formValues[formElementsData.id];
    if (iniitalValues) {
      const parsedValues =
        typeof iniitalValues === "string"
          ? JSON.parse(iniitalValues)
          : iniitalValues;
      const formElements = parsedValues.map((value) => {
        return {
          id: Math.random().toString(36).substring(7),
          type: value.type,
          required: value.required,
          label: value.label,
          placeholder: value.placeholder,
          name: value.name,
          values: value.values,
        };
      });

      setFormElements(formElements);
    }
  }, []);

  const generateFieldJSON = (field: FormElement) => {
    const json = {
      type: field.type,
      required: field.required,
      label: field.label,
      name: field.name,
      values: field.values,
    };

    return json;
  };

  const handleFieldChange = (field: FormElement) => {
    const index = formElements.findIndex((element) => element.id === field.id);
    if (index === -1) {
      console.error("Element not found");
      return;
    }

    const newFormElements = [...formElements];
    newFormElements[index] = field;
    setFormElements(newFormElements);
  };

  const handleFieldDelete = (field: FormElement) => {
    const index = formElements.findIndex((element) => element.id === field.id);
    if (index === -1) {
      console.error("Element not found");
      return;
    }

    const newFormElements = [...formElements];
    newFormElements.splice(index, 1);
    setFormElements(newFormElements);
  };

  const handleFieldShift = (field: FormElement, direction: number) => {
    const currentIndex = formElements.findIndex((f) => f.id === field.id);
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < formElements.length) {
      const updatedFormElements = [...formElements];
      const movedElement = updatedFormElements.splice(currentIndex, 1)[0];
      updatedFormElements.splice(newIndex, 0, movedElement);
      setFormElements(updatedFormElements);
    } else {
      console.warn("Index out of bounds");
    }
  };

  useEffect(() => {
    const formJSON = formElements.map((element) => generateFieldJSON(element));
    handleChange(formElementsData.id, formJSON);
  }, [formElements]);

  return (
    <NumberedSection
      icon={<EditNote />}
      headline={
        "Configure the inputs you would like to capture from your visitors in this lead capture form."
      }
    >
      <Stack direction="row" spacing={2}>
        <Stack flex={1} spacing={2}>
          {formElements.length === 0 && (
            <EmptyState
              message={"Add form elements using the buttons to the right."}
            />
          )}
          {formElements.map((element, index) => (
            <Box key={element.id}>
              {
                <FormNodeEditor
                  field={element}
                  onChange={handleFieldChange}
                  onShift={handleFieldShift}
                  onDelete={handleFieldDelete}
                />
              }
            </Box>
          ))}
        </Stack>
        <Stack maxWidth={"300px"} spacing={1}>
          <Button
            variant="contained"
            onClick={() =>
              handleAddElement({
                type: "text",
                required: false,
                label: "",
                name: "",
              })
            }
          >
            Add Text
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              handleAddElement({
                type: "email",
                required: false,
                label: "",
                name: "",
              })
            }
          >
            Add Email
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              handleAddElement({
                type: "textarea",
                required: false,
                label: "",
                name: "",
              })
            }
          >
            Add Textarea
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              handleAddElement({
                type: "select",
                required: false,
                label: "",
                name: "",
                values: [{ label: "", value: "" }],
              })
            }
          >
            Add Select
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              handleAddElement({
                type: "checkbox",
                required: false,
                label: "",
                name: "",
              })
            }
          >
            Add Checkbox
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              handleAddElement({
                type: "radio",
                required: false,
                label: "",
                name: "",
                values: [{ label: "", value: "" }],
              })
            }
          >
            Add Radio
          </Button>
        </Stack>
      </Stack>
    </NumberedSection>
  );
};
