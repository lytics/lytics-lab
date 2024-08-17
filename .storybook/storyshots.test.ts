/// <reference types="vite/client"/>
/// <reference types="vitest/globals"/>
import { describe, expect, test } from "vitest";
import { render, waitForElementToBeRemoved } from "@testing-library/react";
import { Meta, StoryFn, composeStories } from "@storybook/react";
import { parseISO } from "date-fns";
import * as globalConfig from "./preview";

vi?.useFakeTimers().setSystemTime(parseISO("2020-01-01"));

type StoryFile = {
  default: Meta;
  [name: string]: StoryFn | Meta;
};

describe("Storybook Snapshots", async () => {
  const modules = await Promise.all(
    Object.values(import.meta.glob<StoryFile>("../**/*.stories.tsx")).map(
      (fn) => fn(),
    ),
  );
  describe.each(
    modules
      .filter((module) => !/skip-storyshots/.test(module.default.title!))
      .map((module) => [module.default.title!, module]),
  )("%s", (moduleName, module) => {
    test.each(
      Object.values(composeStories(module, globalConfig)).map((Story) => [
        Story.storyName!,
        Story,
      ]),
    )("%s", async (storyName, Story) => {
      const { container } = await render(Story({}));
      if (container.querySelector(".MuiCircularProgress-indeterminate")) {
        await waitForElementToBeRemoved(() =>
          container.querySelector(".MuiCircularProgress-indeterminate"),
        );
      }

      expect(container).toMatchSnapshot();
      // TODO: assert if there were any `console.error` or `console.warn` calls here.
    });
  });
});
