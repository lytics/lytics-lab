import { Field, SelectOption } from "../pfa-fields";

export const ContentCollection: Field = {
  id: "contentCollection",
  label: "Content Collection",
  description:
    "Which content collection should the recommendation be pulled from?",
  type: "string",
  method: "input",
  required: false,
  hidden: true,
  render: "config.recommend.collection",
};

export const ContentCollectionWithOptions = (collections: SelectOption[]) => {
  let payload = ContentCollection;
  payload.options = collections;
  return payload;
};

export const ContentVisited: Field = {
  id: "contentVisited",
  label: "Include Visited Content",
  description: "Should we recommend content the visitor has recently seen?",
  type: "boolean",
  method: "checkbox",
  required: false,
  hidden: true,
  render: "config.recommend.visited",
};

export const ContentShuffle: Field = {
  id: "contentShuffle",
  label: "Shuffle Recommendations",
  description:
    "Should we shuffle recommendations to ensure new content is recommended each time?",
  type: "boolean",
  method: "checkbox",
  required: false,
  hidden: true,
  render: "config.recommend.shuffle",
};

export const ContentDisplayTitle: Field = {
  id: "contentDisplayTitle",
  label: "Show Title",
  description: "Should we show the content title in the recommendation?",
  type: "boolean",
  method: "checkbox",
  required: false,
  hidden: true,
  render: "config.recommend.display.title",
};

export const ContentDisplayImage: Field = {
  id: "contentDisplayImage",
  label: "Show Image",
  description: "Should we show an image in the recommendation?",
  type: "boolean",
  method: "checkbox",
  required: false,
  hidden: true,
  render: "config.recommend.display.image",
};

export const ContentDisplayDescription: Field = {
  id: "contentDisplayDescription",
  label: "Show Description",
  description: "Should we show a description in the recommendation?",
  type: "boolean",
  method: "checkbox",
  required: false,
  hidden: true,
  render: "config.recommend.display.description",
};

export const ContentDisplayDescriptionLimit: Field = {
  id: "contentDisplayDescriptionLimit",
  label: "Truncate Description",
  description: "Should we truncate the description to a certain length?",
  type: "integer",
  method: "input",
  required: false,
  hidden: true,
  render: "config.recommend.display.limit",
};
