import { html, TemplateResult } from '@skhemata/skhemata-base';
import {} from '@storybook/addon-controls';
import '../skhemata-gdpr.js';

const category = {
  attributes: 'HTML Attributes',
  events: 'Events',
  cssProperties: 'CSS Properties'
}

const configData = {
  link: 'https://www.skhemata.com'
}
export default {
  title: 'General/SkhemataGdpr',
  component: 'skhemata-gdpr',
  argTypes: {
    configData: {
      name: 'config-data',
      control: 'object',
      table: {
        category: category.attributes,
        type: {
          summary: 'object',
          detail:
          ` {
              link: string
            }`
        },
      },
      description: 'href url for the "Learn More" text.'
    },
    textColor: {
      name: '--skhemata-gdpr-color',
      control: 'color',
      description: 'CSS property variable for text color',
      defaultValue: 'rgb(64, 64, 64)',
      table: {
        category: 'CSS Properties',
        defaultValue: 'rgb(64, 64, 64)',

      },
    },
    backgroundColor: {
      name: '--skhemata-gdpr-background-color',
      control: 'color',
      description: 'CSS property variable for background color',
      defaultValue: 'rgb(239, 239, 239)',
      table: {
        category: 'CSS Properties',
        defaultValue: 'rgb(239, 239, 239)'
      },
    },
    parameters: {
      docs: {
        source: {
          // eslint-disable-next-line no-template-curly-in-string
          code: `<skhemata-gdpr config-data="${JSON.stringify(
            configData,
            null,
            2
          )}"></skhemata-gdpr>`,
        },
      },
    },
  },
  parameters: {
    widgetCode: `
    <skhemata-gdpr config-data='{"link":"google.com"}'></skhemata-gdpr>

    <script type="module" src="https://cdn.jsdelivr.net/gh/alexey432/test-gdpr-1/index.js"></script> 
    `,
  },
};


interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
  parameters?: any;
}

interface ArgTypes {
  configData: object,
  textColor: string,
  backgroundColor: string
}

const Template: Story<ArgTypes> = ({
  textColor,
  backgroundColor
}: ArgTypes) => html`
  <skhemata-gdpr
    style="
      --skhemata-gdpr-color: ${textColor || 'rgb(64, 64, 64)'}
      --skhemata-gdpr-background-color: ${backgroundColor || 'rgb(239, 239, 239)'}
    "
    config-data=${JSON.stringify(configData)}
  >
  </skhemata-gdpr>
`;

export const Example = Template.bind({});
Example.args = {
  configData: configData,
  textColor: 'rgb(64, 64, 64)',
  backgroundColor: 'rgb(239, 239, 239)'
};

Example.parameters = {
  docs: {
    source: {
      code: `
      <skhemata-gdpr
    config-data=${JSON.stringify(Example.args.configData)}
  >
  </skhemata-gdpr>
      `,
    },
  },
}
