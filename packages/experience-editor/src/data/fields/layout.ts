import { Field, SelectOption } from "../pfa-fields";

const OptionModal: SelectOption = {
  label: "Modal",
  value: "modal",
};

const OptionSlideout: SelectOption = {
  label: "Slideout",
  value: "slideout",
};

const OptionBar: SelectOption = {
  label: "Bar",
  value: "bar",
};

const OptionButton: SelectOption = {
  label: "Button",
  value: "button",
};

const OptionInline: SelectOption = {
  label: "Inline",
  value: "inline",
};

const OptionGate: SelectOption = {
  label: "Gate",
  value: "gate",
};

const getSelectOptions = (type: string): SelectOption[] => {
  switch (type) {
    case "message":
      return [OptionModal, OptionSlideout, OptionBar, OptionInline, OptionGate];
    case "form":
      return [OptionModal, OptionSlideout, OptionInline, OptionGate];
    case "recommendation":
      return [OptionModal, OptionSlideout, OptionInline, OptionGate];
  }
};

export const Layout: Field = {
  id: "layout",
  label: "Layout",
  description: "The layout of the component",
  type: "string",
  method: "select",
  required: true,
  hidden: false,
  dependencies: [
    {
      value: "modal",
      fieldsToShow: ["image", "positionSelector"],
    },
    {
      value: "slideout",
      fieldsToShow: ["image", "position", "positionSelector", "origin"],
    },
    {
      value: "bar",
      fieldsToShow: ["image", "position", "positionSelector"],
    },
    {
      value: "inline",
      fieldsToShow: ["image", "positionSelector"],
    },
    {
      value: "gate",
      fieldsToShow: ["image", "positionSelector"],
    },
  ],
  render: "config.layout",
};

export const LayoutWithOptions: (type: string) => Field = (type: string) => {
  let payload = Layout;
  payload.options = getSelectOptions(type);
  return payload;
};
