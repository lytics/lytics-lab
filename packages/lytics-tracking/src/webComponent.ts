type Config = Record<string, any>;

export interface IJSTag {
  init(config: Config): () => void;
  pageView(): void;
  identify(): void;
  send(): void;
}

declare var jstag: IJSTag;

const asyncTag = `!function(){var n=window.jstag||(window.jstag={}),t=[];function i(i){n[i]=function(){for(var n=arguments.length,o=new Array(n),e=0;e<n;e++)o[e]=arguments[e];t.push([i,o])}}i("send"),i("mock"),i("identify"),i("pageView"),i("unblock"),i("getid"),i("setid"),i("loadEntity"),i("getEntity"),i("on"),i("once"),i("call"),n.loadScript=function(n,t,i){var o=document.createElement("script");o.async=!0,o.src=n,o.onload=t,o.onerror=i;var e=document.getElementsByTagName("script")[0],r=e&&e.parentNode||document.head||document.body,a=e||r.lastChild;return null!=a?r.insertBefore(o,a):r.appendChild(o),this},n.init=function i(o){return this.config=o,this.loadScript(o.src,(function(){if(n.init===i)throw new Error("Load error!");n.init(n.config),function(){for(var i=0;i<t.length;i++){var o=t[i][0],e=t[i][1];n[o].apply(n,e)}t=void 0}()})),this}}();`;

const defaults = {
  pageAnalysis: {
    dataLayerPull: {
      disabled: true,
    },
  },
};
const observedAttributes = ["cid", "config", "event"];

let off: () => void | undefined;

customElements.define(
  "lytics-tracking",
  class extends HTMLElement {
    static get observedAttributes() {
      return observedAttributes;
    }

    observer: MutationObserver;

    constructor() {
      super();
      this.observer = new MutationObserver(this.onChildrenAppended.bind(this));
    }

    config: Config = {};
    // Called when the element is connected to the document's DOM
    connectedCallback() {
      requestAnimationFrame(() => {
        if (typeof jstag === "undefined") {
          shim();
        }

        const config = configFor(this);

        off = jstag.init(config);

        const event = this.getAttribute("event");
        if (event === "page" || event == "pageView" || event == null) {
          jstag.pageView();
        } else if (event === "identify") {
          jstag.identify();
        } else if (event === "send") {
          jstag.send();
        } else {
          console.error("Invalid event", event);
        }
      });
    }

    // Called when the element is disconnected from the document's DOM
    disconnectedCallback() {
      off?.();
    }

    onChildrenAppended() {
      this.connectedCallback();
    }
  },
);

function configFor(el: Element) {
  const config = parsedConfig();
  const cid = el.getAttribute("cid");
  const pid = el.getAttribute("pid");
  if (!cid || !pid) {
    if (!cid) {
      console.error("Missing cid (lytics customer id)");
      return { ...defaults, ...config, cid };
    }
    if (!pid) {
      console.error("Missing pid (personalize project id)");
    }
    return { ...defaults, ...config, pid };
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
    lx: {
      disabled: false,
    },
    ...config,
  };

  function parsedConfig() {
    // Prefer src attribute
    if (el.hasAttribute("config")) {
      try {
        return JSON.parse(el.getAttribute("config"));
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

function shim() {
  const script = document.createElement("script");
  script.textContent = asyncTag;
  document.head.appendChild(script);
}
