import { Meta, StoryObj } from '@storybook/angular';

import { AppCellComponent } from './app-cell.component';

type ComponentWithCustomControls = AppCellComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/App Cell',
  component: AppCellComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `AppCell` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const AppCell: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
