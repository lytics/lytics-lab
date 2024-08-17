import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { Box, Chip, LinearProgress } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

interface CodeEditorProps {
  value: string;
  height?: number;
  onChange: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  height = 600,
}) => {
  const [codeString, setCodeString] = React.useState(value);
  const [isDirty, setIsDirty] = React.useState(false);
  const [showSaveAlert, setShowSaveAlert] = React.useState(false);
  const [showErrorAlert, setShowErrorAlert] = React.useState(false);
  const [progressColor, setProgressColor] = React.useState("success");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCodeString(value);
  }, [value]);

  const onInputChange = React.useCallback((val, viewUpdate) => {
    setCodeString(val);
    setIsDirty(true);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      if (onChange) {
        try {
          setProgressColor("success");
          onChange(val);
          setShowSaveAlert(true);
          setIsDirty(false);
          const newTimer2 = setTimeout(() => {
            setShowSaveAlert(false);
          }, 1000);
        } catch (error) {
          setProgressColor("error");
          setShowErrorAlert(true);
          setIsDirty(true);
          const newTimer2 = setTimeout(() => {
            setShowErrorAlert(false);
          }, 1000);
        }
      }
    }, 1000);
    setTimer(newTimer);
  }, []);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  return (
    <Box position={"relative"}>
      {isDirty && (
        <Box width={"100%"}>
          <LinearProgress
            color={progressColor === "success" ? "success" : "error"}
            sx={{
              height: "10px",
            }}
          />
        </Box>
      )}

      {showSaveAlert && (
        <Box
          position={"absolute"}
          top={0}
          right={0}
          p={2}
          sx={{
            zIndex: 2,
          }}
        >
          <Chip
            icon={<CheckCircle />}
            label="Configuration Updated"
            sx={{
              background: "#A4D169",
              color: "#000",
              border: "1px solid #000",
              fontWeight: "bold",
            }}
          />
        </Box>
      )}
      {showErrorAlert && (
        <Box
          position={"absolute"}
          top={0}
          right={0}
          p={2}
          sx={{
            zIndex: 2,
          }}
        >
          <Chip
            icon={<CheckCircle />}
            label="Invalid Configuration"
            sx={{
              background: "#F00",
              color: "#000",
              border: "1px solid #000",
              fontWeight: "bold",
            }}
          />
        </Box>
      )}
      <Box>
        <CodeMirror
          value={codeString}
          theme={"dark"}
          height={`${height}px`}
          extensions={[javascript({ jsx: true })]}
          onChange={onInputChange}
        />
      </Box>
    </Box>
  );
};
