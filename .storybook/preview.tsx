import React from "react";

const defaultDecorator = (Story: any, context: any) => {
  return (
    <>
      <Story {...context} />
    </>
  );
};

export const decorators = [defaultDecorator];
