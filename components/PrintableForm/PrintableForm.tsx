import s from './PrintableForm.module.scss';
import { Form } from 'data/flexibleForms/forms.types';

interface Props {
  form: Form;
}

const PrintableForm = ({ form }: Props): React.ReactElement => (
  <div className={s.form}>
    <h1>{form.name}</h1>
    <p>* indicates a required question</p>
    {form.steps.map((step, i) => (
      <div className={s.step} key={step.name}>
        <h2>
          {i + 1}. {step.name}
        </h2>
        <p>{step.intro}</p>
        {step.fields.map((field) => (
          <>
            <h3>
              {field.question}
              {field.required && '*'}
            </h3>
            <p>{field.hint}</p>

            {['text', 'date'].includes(field.type) && (
              <div className={s.text}></div>
            )}
            {['textarea', 'repeater', 'timetable', 'repeaterGroup'].includes(
              field.type
            ) && <div className={s.textarea}></div>}
            {['radios', 'select', 'combobox'].includes(field.type) && (
              <>
                <p>Choose one</p>
                {field?.choices?.map((choice) => (
                  <div key={choice.label} className={s.round}>
                    {choice.label}
                  </div>
                ))}
              </>
            )}
            {['checkboxes', 'tags'].includes(field.type) && (
              <>
                <p>Choose all that apply</p>
                {field?.choices?.map((choice) => (
                  <div key={choice.label} className={s.square}>
                    {choice.label}
                  </div>
                ))}
              </>
            )}
          </>
        ))}
      </div>
    ))}
  </div>
);

export default PrintableForm;
