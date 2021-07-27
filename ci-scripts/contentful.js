const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const run = async () => {
  try {
    const { data } = await axios.get(
      `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?content_type=form&include=10`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
      }
    );

    const forms = data.items;
    const linkedEntries = data.includes.Entry;

    const processedForms = forms.map((form) => ({
      id: form.sys.id,
      ...form.fields,
      // don't include the themes key
      themes: undefined,
      // flatten out steps so they're no longer nested inside themes
      steps: form.fields.themes
        .map((rawTheme) =>
          linkedEntries.find((entry) => entry.sys.id === rawTheme.sys.id)
        )
        .reduce((flatSteps, theme) => {
          theme.fields.steps.forEach((rawStep) => {
            const linkedStep = linkedEntries.find(
              (entry) => entry.sys.id === rawStep.sys.id
            );
            flatSteps.push({
              id: linkedStep.fields.name,
              ...linkedStep.fields,
              theme: theme.fields.name,
              fields: linkedStep.fields.fields.map((rawField) => {
                const linkedField = linkedEntries.find(
                  (entry) => entry.sys.id === rawField.sys.id
                );

                return {
                  id: linkedField.fields.question,
                  ...linkedField.fields,
                  choices:
                    linkedField.fields.choices &&
                    linkedField.fields.choices.map((choice) => ({
                      label: choice,
                      value: choice,
                    })),
                };
              }),
            });
          });
          return flatSteps;
        }, []),
    }));

    fs.writeFileSync(
      'data/flexibleForms/contentfulForms.ts',
      template(JSON.stringify(processedForms, null, 2))
    );
  } catch (e) {
    console.error(e);
  }
};

const template = (string) => `import { Form } from './forms.types';

const forms: Form[] = ${string};

export default forms`;

run();
