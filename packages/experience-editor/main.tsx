import r2wc from "react-to-webcomponent";
import React from "react";
import * as ReactDOM from "react-dom/client";
import WidgetWizard from "./src/App";

const LyticswidgetWizardWC = r2wc(WidgetWizard, React, ReactDOM, {
  props: {
    accountid: "string",
    accesstoken: "string",
    pathforaconfig: "string",
    availableaudiences: "string",
    availablecollections: "string",
    availablefields: "string",
    titlefield: "string",
    descriptionfield: "string",
    statusfield: "string",
    configurationfield: "string",
  },
});

customElements.define("lytics-widgetwiz", LyticswidgetWizardWC);
