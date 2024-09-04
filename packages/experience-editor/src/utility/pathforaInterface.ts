export class PathforaHandler {
  private client: any;

  constructor(
    loadPathforaLibrary = false,
    loadLyticsTag = false,
    accountId = "",
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
      const jstagShim = {
        config: {
          cid: [accountid],
          cookie: "test-seerid",
        },
        getid: (callback: (id: string) => void) => {
          callback("test-lytics-uid");
        },
        send: (stream: string, payload: any, callback: () => void) => {
          console.log("(MOCK) Lytics JStag send request made.", stream);
        },
        getEntity: (callback: (entity: any) => void) => {
          const mockEntity = {
            data: {
              user: {
                _split: "18",
                _split2: "62",
                _uid: "ec78a574-f275-4d59-9b80-1925a16239a1",
                _uids: ["ec78a574-f275-4d59-9b80-1925a16239a1"],
                score_consistency: "100",
                score_frequency: "65",
                score_intensity: "41",
                score_maturity: "99",
                score_momentum: "34",
                score_propensity: "6",
                score_quantity: "73",
                score_recency: "96",
                score_volatility: "100",
                segments: ["anonymous_profiles", "smt_active", "all"],
                visit_city: "Denver",
                visit_country: "US",
                visit_region: "CO",
              },
            },
          };

          if (!callback) {
            return mockEntity;
          }

          callback(mockEntity);
        },
      };

      var expires = new Date(new Date().valueOf() + 1000 * 60 * 60 * 1);
      document.cookie =
        "test-seerid=test-lytics-uid; expires=" +
        expires.toUTCString() +
        "; path=/; SameSite=Lax";

      (window as any).jstag = (window as any).jstag || jstagShim;
      console.log("JSTAG initialized");
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
        widget.config.confirmAction.callback,
      );
    }

    // cancelAction.callback
    if (widget?.config?.cancelAction?.callback) {
      widget.config.cancelAction.callback = createFunction(
        widget.config.cancelAction.callback,
      );
    }

    // closeAction.callback
    if (widget?.config?.closeAction?.callback) {
      widget.config.closeAction.callback = createFunction(
        widget.config.closeAction.callback,
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
