import "./webComponent";

let results: any[] = [];

beforeEach(() => {
  results = [];
  window["jstag"] = {
    init() {
      results.push(["init", [].slice.call(arguments)]);
    },
    pageView() {
      results.push(["pageView", [].slice.call(arguments)]);
    },
    send() {
      results.push(["send", [].slice.call(arguments)]);
    },
    identify() {
      results.push(["identify", [].slice.call(arguments)]);
    },
  };
});

const render = (callback: () => void) =>
  new Promise<void>((resolve) =>
    requestAnimationFrame(() => {
      callback();
      resolve();
    }),
  );

describe("lytics-config", () => {
  describe("basic usage", () => {
    it("should render", async () => {
      document.body.innerHTML = `<lytics-config></lytics-config>`;
      await render(() => {
        expect(results).toMatchSnapshot();
      });
    });
  });

  describe("with config attribute", () => {
    it("should render", async () => {
      document.body.innerHTML = `<lytics-config config='{"amazon":{"dsp":{"disabled":true}}}'></lytics-config>`;
      await render(() => {
        expect(results).toMatchSnapshot();
      });
    });
  });

  describe("with a config script tag", () => {
    it("should render", async () => {
      document.body.innerHTML = `<lytics-config><script type="application/json">{"amazon":{"dsp":{"disabled":true}}}</script></lytics-config>`;
      await render(() => {
        expect(results).toMatchSnapshot();
      });
    });
  });

  describe("with a cid and pid", () => {
    it("should render", async () => {
      document.body.innerHTML = `<lytics-config cid="123" pid="567"></lytics-config>`;
      await render(() => {
        expect(results).toMatchSnapshot();
      });
    });
  });
});

describe("lytics-tracking", () => {
  describe("with an event attribute", () => {
    it("should render with send", async () => {
      document.body.innerHTML = `<lytics-tracking event="send"></lytics-tracking>`;
      await render(() => {
        expect(results).toMatchSnapshot();
      });
    });

    it("should render with identify", async () => {
      document.body.innerHTML = `<lytics-tracking event="identify"></lytics-tracking>`;
      await render(() => {
        expect(results).toMatchSnapshot();
      });
    });

    it("should render with page", async () => {
      document.body.innerHTML = `<lytics-tracking event="page"></lytics-tracking>`;
      await render(() => {
        expect(results).toMatchSnapshot();
      });
    });

    it("should render with pageView", async () => {
      document.body.innerHTML = `<lytics-tracking event="pageView"></lytics-tracking>`;
      await render(() => {
        expect(results).toMatchSnapshot();
      });
    });
  });
});