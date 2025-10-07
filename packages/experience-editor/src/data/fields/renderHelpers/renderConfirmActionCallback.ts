export const renderConfirmActionCallbackLink = (
  url: string,
  newTab: boolean,
) => {
  if (newTab) {
    return `function() { window.open("${url}", "_blank"); }`;
  }
  if (url) {
    return `function() { window.location.href="${url}"; }`;
  }
  return undefined;
};
