export class PathforaHandler {
  private client: any;

  constructor(
    loadPathforaLibrary = false,
    loadLyticsTag = false,
    accountId = ""
  ) {
    if (loadLyticsTag) {
      console.log("Adding JSTAG shim to the page");
      this.loadJSTAGLibrary(accountId)
        .then(() => {
          console.log("JSTAG loaded successfully");
        })
        .catch((error) => {
          console.error("Error loading JSTAG script:", error);
        });
    }

    if (loadPathforaLibrary) {
      console.log("Adding Pathfora shim to the page");
      this.loadPathforaLibrary("https://c.lytics.io/static/pathfora.js")
        .then(() => {
          this.client = (window as any).pathfora;
          console.log("Pathfora loaded successfully");
        })
        .catch((error) => {
          console.error("Error loading Pathfora script:", error);
        });
    }
  }

  loadPathforaLibrary(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => resolve();
      script.onerror = () => reject(`Error loading script: ${url}`);
      document.body.appendChild(script);
    });
  }

  loadJSTAGLibrary(accountid: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.textContent = `!function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}r=void 0}()}),this}}();
      jstag.init({
        src: 'https://c.lytics.io/api/tag/${accountid}/latest.min.js',
        stream: 'drupal-widget-test'
      });`;
      document.body.appendChild(script);
      resolve();
    });
  }

  serializeWidget(widget: any): any {
    // confirmAction.callback
    if (widget.config.confirmAction && widget.config.confirmAction.callback) {
      widget.config.confirmAction.callback =
        widget.config.confirmAction.callback.toString();
    }

    // cancelAction.callback
    if (widget.config.cancelAction && widget.config.cancelAction.callback) {
      widget.config.cancelAction.callback =
        widget.config.cancelAction.callback.toString();
    }

    // closeAction.callback
    if (widget.config.closeAction && widget.config.closeAction.callback) {
      widget.config.closeAction.callback =
        widget.config.closeAction.callback.toString();
    }

    // onInit
    if (widget.config.onInit) {
      widget.config.onInit = widget.config.onInit.toString();
    }

    // onLoad
    if (widget.config.onLoad) {
      widget.config.onLoad = widget.config.onLoad.toString();
    }

    // onClick
    if (widget.config.onClick) {
      widget.config.onClick = widget.config.onClick.toString();
    }

    // onModalClose
    if (widget.config.onModalClose) {
      widget.config.onModalClose = widget.config.onModalClose.toString();
    }

    // translate object to json
    const widgetJSON = JSON.stringify(widget);

    return widgetJSON;
  }

  deserializeWidget(widget: any): any {
    // if the widget is a string (json), parse it
    if (typeof widget === "string") {
      widget = JSON.parse(widget);
    }

    const createFunction = (str: string) => {
      try {
        return new Function(`return ${str}`)();
      } catch (error) {
        console.error("Error creating function:", error);
        return null;
      }
    };

    // confirmAction.callback
    if (widget?.config?.confirmAction?.callback) {
      widget.config.confirmAction.callback = createFunction(
        widget.config.confirmAction.callback
      );
    }

    // cancelAction.callback
    if (widget?.config?.cancelAction?.callback) {
      widget.config.cancelAction.callback = createFunction(
        widget.config.cancelAction.callback
      );
    }

    // closeAction.callback
    if (widget?.config?.closeAction?.callback) {
      widget.config.closeAction.callback = createFunction(
        widget.config.closeAction.callback
      );
    }

    // onInit
    if (widget?.config?.onInit) {
      widget.config.onInit = createFunction(widget.config.onInit);
    }

    // onLoad
    if (widget?.config?.onLoad) {
      widget.config.onLoad = createFunction(widget.config.onLoad);
    }

    // onClick
    if (widget?.config?.onClick) {
      widget.config.onClick = createFunction(widget.config.onClick);
    }

    // onModalClose
    if (widget?.config?.onModalClose) {
      widget.config.onModalClose = createFunction(widget.config.onModalClose);
    }

    return widget;
  }

  testWidget(widget): void {
    let config = widget.config;
    let details = widget.details;

    config.id = "test-widget";

    if (config?.displayConditions?.urlContains) {
      config.displayConditions.urlContains = [];
    }

    if (config?.displayConditions?.hideAfterAction) {
      config.displayConditions.hideAfterAction = {};
    }

    if (config?.displayConditions?.showOnExitIntent) {
      config.displayConditions.showOnExitIntent = false;
    }

    if (config?.displayConditions?.impressions) {
      config.displayConditions.impressions = {};
    }

    if (config?.displayConditions?.pageVisits) {
      config.displayConditions.pageVisits = 0;
    }

    if (config?.displayConditions?.scrollPercentageToDisplay) {
      config.displayConditions.scrollPercentageToDisplay = 0;
    }

    let module;

    switch (widget.details.type) {
      case "message":
        module = new this.client.Message(config);
        break;
      case "recommendation":
        module = new this.client.Message(config);
        break;
      case "form":
        module = new this.client.Form(config);
        break;
      default:
        console.error("Unsupported widget type:", widget.details.type);
    }

    this.client.initializeWidgets([module]);
  }
}
