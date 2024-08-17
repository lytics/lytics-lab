// src/utility/EmptyState.stories.tsx

import { Meta, Story } from "@storybook/react";
import { EmptyState, EmptyStateProps } from "./emptyState";

export default {
  title: "Components/EmptyState",
  component: EmptyState,
} as Meta;

const Template: Story<EmptyStateProps> = (args) => <EmptyState {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: "No data available",
};
