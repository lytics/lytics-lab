import { useMemo } from "react";
import "./webComponent";

interface LyticsConfigProps {
  config: Record<string, any>;
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "lytics-config": {
        config: string;
      };
      "lytics-tracking": {
        event: string;
        payload: string;
      };
    }
  }
}

export const LyticsConfig = (props: LyticsConfigProps) => {
  const json = useMemo(() => JSON.stringify(props.config), [props.config]);
  return <lytics-config config={json}></lytics-config>;
};
