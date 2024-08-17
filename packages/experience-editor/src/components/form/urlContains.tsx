import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Field } from "../../data/pfa-fields";
import { PinkHighlight } from "../../utility/colors";

export interface URLContainsItem {
  match: string;
  value: string;
}

export interface MatchValueFormProps {
  field: Field;
  visible: boolean;
  formValues: { [key: string]: any };
  handleChange: (id: string, value: URLContainsItem[]) => void;
}

export const URLContainsBuilder: React.FC<MatchValueFormProps> = ({
  field,
  formValues,
  handleChange,
}) => {
  const [items, setItems] = useState([] as URLContainsItem[]);

  useEffect(() => {
    if (formValues[field.id]) {
      setItems(formValues[field.id]);
    }
  }, []);

  const handleMatchChange = (index, event) => {
    const newItems = [...items];
    newItems[index].match = event.target.value;
    setItems(newItems);
  };

  const handleValueChange = (index, event) => {
    const newItems = [...items];
    newItems[index].value = event.target.value;
    setItems(newItems);
  };

  const handleAddRule = () => {
    setItems([...items, { match: "string", value: "" }]);
  };

  const handleDeleteRule = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  useEffect(() => {
    const formattedItems = items.map((item) => ({
      match: item.match,
      value: item.value,
    })) as URLContainsItem[];

    handleChange(field.id, formattedItems);
  }, [items]);

  const getLabel = (item) => {
    switch (item.match) {
      case "string":
        return (
          <>
            Enter a value that should match any portion of your target URL. For
            example, entering <b style={{ color: PinkHighlight }}>test</b> will
            match https://test.com/my/
            <b style={{ color: PinkHighlight }}>test</b>
            /path
          </>
        );
      case "simple":
        return (
          <>
            Enter a value that should match the domain and path of your target
            URL. For example, entering{" "}
            <b style={{ color: PinkHighlight }}>test.com/my/path</b> will match
            https:<b style={{ color: PinkHighlight }}>//test.com/my/path</b>
            ?query=param
          </>
        );
      case "exact":
        return (
          <>
            Enter a value that should exactly match the full target URL
            including protocol and query parameters. For example, entering{" "}
            <b style={{ color: PinkHighlight }}>https://test.com?query=param</b>{" "}
            will only be shown on that exact URL.
          </>
        );
      case "regex":
        return (
          <>Enter a valid regular expression to be evaluated against the URL.</>
        );
      default:
        return "Select a match type.";
    }
  };

  return (
    <Box>
      {items.map((item, index) => (
        <Stack key={index} direction={"row"}>
          <FormControl sx={{ m: 1, minWidth: 130 }}>
            <InputLabel id={`match-label-${index}`}>Match</InputLabel>
            <Select
              labelId={`match-label-${index}`}
              id={`match-select-${index}`}
              value={item.match}
              label={"Match"}
              size="small"
              onChange={(event) => handleMatchChange(index, event)}
              sx={{
                borderRadius: "5px",
              }}
            >
              <MenuItem value="string">String</MenuItem>
              <MenuItem value="simple">Simple</MenuItem>
              <MenuItem value="exact">Exact</MenuItem>
              <MenuItem value="regex">Regex</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label={"Match Value"}
            helperText={getLabel(item)}
            value={item.value}
            onChange={(event) => handleValueChange(index, event)}
            size="small"
            sx={{
              m: 1,
            }}
          />

          <Box flex={0} mt={1}>
            <IconButton
              aria-label="delete"
              color="primary"
              onClick={() => handleDeleteRule(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
      ))}
      <Button variant="contained" onClick={handleAddRule} sx={{ m: 1 }}>
        Add Rule
      </Button>
    </Box>
  );
};
