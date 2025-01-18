import { shim } from "./shim";
import { Config, IJSTag } from "./types";

declare var jstag: IJSTag;

const defaults = {
  pageAnalysis: {
    dataLayerPull: {
      disabled: true,
    },
  },
  lx: {
    disabled: false,
  },
};

customElements.define(
  "lytics-config",
  (() => {
    const cidAttr = "cid";
    const pidAttr = "pid";
    const jsonAttr = "json";
    const observedAttributes = [cidAttr, pidAttr, jsonAttr];
    let deinit: () => void | undefined;
    return class extends HTMLElement {
      static get observedAttributes() {
        return observedAttributes;
      }

      config: Config = {};

      // Called when the element is connected to the document's DOM
      connectedCallback() {
        shim();
        requestAnimationFrame(() => {
          deinit = jstag.init(configFor(this));
        });
      }

      // Called when the element is disconnected from the document's DOM
      disconnectedCallback() {
        requestAnimationFrame(() => {
          deinit?.();
        });
      }
    };

    function configFor(el: Element) {
      const config = parsedConfig();
      const cid = el.getAttribute(cidAttr);
      const pid = el.getAttribute(pidAttr);
      if (!cid || !pid) {
        if (!cid) {
          console.error("Missing cid (lytics customer id)");
          return { ...defaults, ...config };
        }
        if (!pid) {
          console.error("Missing pid (personalize project id)");
        }
        return { ...defaults, ...config };
      }
      return {
        ...defaults,
        src: `https://c.lytics.io/api/tag/${cid}/latest.min.js`,
        contentStack: {
          entityPush: {
            disabled: false,
            personalizeProjectId: pid,
          },
        },
        ...config,
      };

      function parsedConfig() {
        // Prefer src attribute
        if (el.hasAttribute("json")) {
          try {
            return JSON.parse(el.getAttribute("json"));
          } catch (e) {
            console.error("Error parsing JSON", e);
          }
        }
        // Look for a script tag with JSON content inside
        const script = el.querySelector("script");
        if (!script) {
          return {};
        }
        const type = script.getAttribute("type");
        if (type !== "application/json" && type !== "text/json") {
          console.error("Invalid script type", type);
          return {};
        }
        try {
          return JSON.parse(script.textContent || "");
        } catch (e) {
          console.error("Error parsing JSON", e);
          return {};
        }
      }
    }
  })(),
);

customElements.define(
  "lytics-tracking",
  (() => {
    const eventAttr = "event";
    const payloadAttr = "payload";
    const observedAttributes = [eventAttr, payloadAttr];
    return class extends HTMLElement {
      static get observedAttributes() {
        return observedAttributes;
      }

      connectedCallback() {
        shim();
        const event = this.getAttribute("event");
        if (!event) {
          console.error("Missing event attribute");
          return;
        }
        requestAnimationFrame(() => {
          const payload = payloadFor(this);
          switch (event) {
            case "send":
              jstag.send(payload);
              break;
            case "identify":
              jstag.identify(payload);
              break;
            case "page":
            case "pageView":
              jstag.pageView(payload);
              break;
            default:
              console.error("Invalid event attribute", event);
          }
        });
      }
    };
    function payloadFor(el: Element) {
      const payload = el.getAttribute(payloadAttr);
      if (!payload) {
        const script = el.querySelector("script");
        if (!script) {
          return {};
        }
        const type = script.getAttribute("type");
        if (type !== "application/json" && type !== "text/json") {
          console.error("Invalid script type", type);
          return {};
        }
        return JSON.parse(script.textContent || "{}");
      }
      try {
        return JSON.parse(payload);
      } catch (e) {
        console.error("Error parsing JSON", e);
        return {};
      }
    }
  })(),
);
