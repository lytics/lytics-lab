import { IJSTag, Config } from "./types";

declare var jstag: IJSTag;

const asyncTag = `!function(){var n=window.jstag||(window.jstag={}),t=[];function i(i){n[i]=function(){for(var n=arguments.length,o=new Array(n),e=0;e<n;e++)o[e]=arguments[e];t.push([i,o])}}i("send"),i("mock"),i("identify"),i("pageView"),i("unblock"),i("getid"),i("setid"),i("loadEntity"),i("getEntity"),i("on"),i("once"),i("call"),n.loadScript=function(n,t,i){var o=document.createElement("script");o.async=!0,o.src=n,o.onload=t,o.onerror=i;var e=document.getElementsByTagName("script")[0],r=e&&e.parentNode||document.head||document.body,a=e||r.lastChild;return null!=a?r.insertBefore(o,a):r.appendChild(o),this},n.init=function i(o){return this.config=o,this.loadScript(o.src,(function(){if(n.init===i)throw new Error("Load error!");n.init(n.config),function(){for(var i=0;i<t.length;i++){var o=t[i][0],e=t[i][1];n[o].apply(n,e)}t=void 0}()})),this}}();`;

export function shim() {
  if (typeof jstag !== "undefined") return;
  window["jstag"] = {}; // prevent multiple shims
  const script = document.createElement("script");
  script.textContent = asyncTag;
  document.head.appendChild(script);
}