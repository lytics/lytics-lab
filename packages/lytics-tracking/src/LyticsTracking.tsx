import { useMemo } from "react";
import "./webComponent";

interface LyticsTrackingProps {
  config: Record<string, any>;
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "lytics-tracking": {
        config: string;
      };
    }
  }
}

export const LyticsTracking = (props: LyticsTrackingProps) => {
  const json = useMemo(() => JSON.stringify(props.config), [props.config]);
  return <lytics-tracking config={json}></lytics-tracking>;
};
