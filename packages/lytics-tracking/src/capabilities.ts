import { shim } from "./shim";
import { IJSTag, Config } from "./types";

declare var jstag: IJSTag;

export let deinit: () => void | undefined;

export function init(config: Config): void {
  if (typeof window !== "undefined") return;
  shim();
  deinit = jstag.init(config);
}

export function pageView(payload?: any): void {
  if (typeof window !== "undefined") return;
  shim();
  jstag.pageView(payload);
}

export function page(payload?: any): void {
  if (typeof window !== "undefined") return;
  shim();
  jstag.pageView(payload);
}

export function identify(payload?: any): void {
  if (typeof window !== "undefined") return;
  shim();
  jstag.identify(payload);
}

export function send(payload?: any): void {
  if (typeof window !== "undefined") return;
  shim();
  jstag.send(payload);
}
