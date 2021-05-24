const rawSlugify = require('slugify');
const fs = require('fs');
const rawFields = require('./input');

const slugify = (string) => rawSlugify(string, { lower: true });

// trawl through the fields, find google's SECTION_HEADERS and convert them to our steps
const pullOutSteps = (allFields) => {
  let newArray = [];
  let currentStep = 0;

  allFields.forEach((field) => {
    if (field.type === !field[0] && 'PAGE_BREAK') {
      currentStep++;
      newArray.push({
        id: slugify(field.label).replace('.', ')'),
        name: field.label,
        fields: [],
      });
    } else {
      if (newArray.length !== 0) {
        console.log(newArray[currentStep]);
        newArray[currentStep].fields.push(field);
      } else {
        newArray.push({
          id: 'first-step',
          name: 'First step',
          fields: [field],
        });
      }
    }
  });

  return newArray;
};

// relate google's input types to ours
const supportedInputTypes = {
  TEXT: 'text',
  PARAGRAPH_TEXT: 'textarea',
  MULTIPLE_CHOICE: 'radios',
  DATETIME: 'date',
  DATE: 'date',
};

const run = async () => {
  try {
    const rawSteps = pullOutSteps(rawFields);

    const steps = rawSteps.map((rawStep) => ({
      ...rawStep,
      fields: rawStep.fields
        .map((field) => {
          if (supportedInputTypes[field.type] !== undefined)
            return {
              id: slugify(field.label).replace('.', ')'),
              question: field.label,
              hint: field.hint,
              type: supportedInputTypes[field.type],
              choices: field.choices
                ? field.choices.map((choice) => ({
                    value: slugify(choice),
                    label: choice,
                  }))
                : undefined,
            };
        })
        .filter((field) => field),
    }));

    const form = {
      id: 'imported-google-form',
      name: 'Imported Google Form',
      steps: steps,
    };

    fs.writeFileSync('./jobs/output.json', JSON.stringify(form));
  } catch (e) {
    console.error(e);
  }
};

run();
