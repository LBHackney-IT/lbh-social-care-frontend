import { FormStep, FormComponentStep } from 'components/Form/types';
import ExpandDetails from 'components/ExpandDetails/ExpandDetails';

const WARNING_TYPES_ADULTS = [
  'Risk to Children',
  'Risk to Adults',
  'Adult at Risk',
  'Risk to Staff',
  'Disclosure Risk',
  'Risk to Self',
  'Missing Person',
];

const WARNING_TYPES_CHILDREN = [
  'Adult who poses risk to children',
  'Contact arrangement in place',
  'Do not disclose information',
  'Duplicate file',
  'Extrafamilial harm',
  'MARAC case (Domestic violence)',
  'Protection order in place',
  'Restricted file',
  'Risk of home environment',
  'Risk posed to worker',
  'Safeguarding agreement in place',
];

const INTRO: Array<FormComponentStep> = [
  <div key="intro">
    <h2>About adding a Warning Note</h2>
    <div className="govuk-body">
      Before adding a Warning Note, you need to have:{' '}
      <ul>
        <li>
          read the Warnings Policy and Operational Procedure, and be familiar
          with your responsibilities under the Data Protection Act (2018) and
          GDPR
        </li>
        <li>have evidence that is accurate and verifiable</li>
        <li>
          discussed and agreed with a manager that a Warning Note needs to be
          added
        </li>
        <li>
          discussed / informed the individual of both the Warning Note and
          Review date (unless disclosure creates substantial risk to staff and
          others).
        </li>
      </ul>
    </div>
  </div>,
];

const WARNING_TYPE_ADULTS: Array<FormComponentStep> = [
  <div key="warning types">
    <h2>Warning types</h2>
    <ExpandDetails label="Guidance on types" triggerLabel="guidance">
      <>
        <div>
          <h4>Risk to Children</h4>
          Someone who has been:
          <ul>
            <li>
              identified within the Multi-Agency Public Protection Arrangements
              (
              <a
                href="https://mappa.justice.gov.uk/connect.ti/MAPPA/grouphome"
                className="govuk-link"
                target="_blank"
                rel="noreferrer"
              >
                MAPPA
              </a>
              ) as presenting a significant risk of harm to children
            </li>
            <li>convicted of an offence against a child</li>
            <li>
              found to have harmed a child or to present a risk of significant
              harm to a child in a civil court, usually through family Court
              Proceedings
            </li>
            <li>
              identified within a multi-agency risk assessment conference (
              <a
                href="https://hackney.gov.uk/domestic-violence/#marac"
                className="govuk-link"
                target="_blank"
                rel="noreferrer"
              >
                MARAC
              </a>
              ) as presenting a risk to children.
            </li>
          </ul>
        </div>
        <div>
          <h4>Risk to Adults</h4>
          Someone who has been identified within:
          <ul>
            <li>
              Multi-Agency Public Protection Arrangements (
              <a
                href="https://mappa.justice.gov.uk/connect.ti/MAPPA/grouphome"
                className="govuk-link"
                target="_blank"
                rel="noreferrer"
              >
                MAPPA
              </a>
              ) as presenting a risk of significant harm to another adult or
              adults
            </li>
            <li>
              a Multi-Agency Risk Assessment Conference (
              <a
                href="https://hackney.gov.uk/domestic-violence/#marac"
                className="govuk-link"
                target="_blank"
                rel="noreferrer"
              >
                MARAC
              </a>
              ) as presenting a risk of significant harm to another adult or
              adults.
            </li>
          </ul>
        </div>
        <div>
          <h4>Adult at Risk</h4>
          Someone who is currently subject to a Safeguarding Adults Action Plan
          within an active Adult Safeguarding process.
        </div>
        <div>
          <h4>Risk to Staff</h4>
          This category should be applied when the behaviour of a service user
          poses specific risks to staff members and/or service providers. This
          category can also be applied when the risk is being posed by other
          family members or associates. It includes:
          <ul>
            <li> Risk of assualt</li>
            <li>
              Risk of verbal abuse or harrassment (sexual, racial, religious,
              disability etc)
            </li>
            <li>Significant risk because of pets, livestock or pests.</li>
          </ul>
        </div>
        <div>
          <h4>Disclosure Risk</h4>
          This category can apply in situations where disclosing informatin
          about the service user or their family may place them at risk from
          others eg domestic abuse.
        </div>
        <div>
          <h4>Risk to Self</h4>
          Those individuals who have been identified by an appropriately
          qualified health professional as being at significant risk of suicide,
          self-harm or self-neglect.
        </div>
        <div>
          <h4>Missing Person</h4>
          Vulnerable individuals who have been notified as missing.
        </div>
      </>
    </ExpandDetails>
  </div>,
  {
    component: 'Radios',
    name: 'type',
    label: 'Select warning type',
    options: WARNING_TYPES_ADULTS,
    rules: { required: true },
  },
];

const WARNING_TYPE_CHILDREN: Array<FormComponentStep> = [
  <div key="warning types">
    <h2>Warning types</h2>
    <ExpandDetails label="Guidance on types" triggerLabel="guidance">
      <>
        <div>
          <p>
            <strong>Adult who poses risk to children</strong> - in cases where
            there may be contact with an adult who either does or does not live
            in the home, could be a family member etc, for example, cases where
            there is a risk of abuse but the perpertrator has never been
            convicted
          </p>
          <p>
            <strong>Do not disclose information</strong> - information should
            not be disclosed without the consent of a social worker or parent,
            for example, address, names, phone numbers, date of birth, school,
            GP or that they have a social worker
          </p>
          <p>
            <strong>Contact arrangement in place</strong> - this includes court
            directed contact arrangements for a child and parent(s) or family
            arranged contact
          </p>
          <p>
            <strong>Extrafamilial harm</strong> - Child criminal exploitation
            (CCE), Child sexual exploitation (CSE) or Gang affiliation
          </p>
          <p>
            <strong>MARAC case</strong> - high risk domestic violence cases
          </p>
          <p>
            <strong>Protection order in place</strong> - Domestic violence cases
            where there are court orders in place i.e. non-molestation,
            Prohibited Steps order etc
          </p>
          <p>
            <strong>Risk of home environment</strong> - dangerous dogs, drugs
            users/needles etc
          </p>
          <p>
            <strong>Risk posed to worker</strong> - if parents have ever
            assaulted a professional etc
          </p>
        </div>
      </>
    </ExpandDetails>
  </div>,
  {
    component: 'Radios',
    name: 'type',
    label: 'Select warning type',
    options: WARNING_TYPES_CHILDREN,
    rules: { required: true },
  },
];

const WARNING_DATES: Array<FormComponentStep> = [
  {
    component: 'DateInput',
    name: 'createdDate',
    label: 'Start date',
    hint:
      'If the start date is set in the future, the Warning Note will not be displayed until that date.',
    rules: { required: true },
  },
  {
    component: 'DateInput',
    name: 'nextReviewDate',
    hint:
      'The Review / end date cannot be more than 1 year from the Start date',
    label: 'Review / end date',
    rules: {
      required: true,
      validate: {
        beforeStartDate: (value, { createdDate }) =>
          new Date(value).getTime() >= new Date(createdDate).getTime() ||
          'The Review / end date cannot be earlier than the Start date',
        notMoreThanOneYear: (value, { createdDate }) =>
          new Date(value).getTime() - new Date(createdDate).getTime() <=
            365 * 24 * 60 * 60 * 1000 ||
          'The Review / end date cannot be more than 1 year from the Start date',
      },
    },
  },
];

const WARNING_DISCLOSURE: Array<FormComponentStep> = [
  <div key="warning disclosure">
    <h2>Disclosure of Warning Note to the individual</h2>
    <ExpandDetails label="Guidance on disclosure" triggerLabel="guidance">
      <div>
        The Data Protection Act 2018 gives individuals the right to request
        access to the personal data held about them (Subject Access Request).
        Where there is a Warning Note against an individual&apos;s record, this
        should be disclosed to the individual. However, in exceptional
        circumstances revealing the existence of, or reasons for, the Warning
        Indicator may also lead to a substantial risk to staff or other
        individuals. Justification and evidence for non-disclosure must be
        recorded in these circumstances. In such cases advice should be sought
        from Data Protection Officer.
      </div>
    </ExpandDetails>
  </div>,
  {
    component: 'Radios',
    name: 'disclosedWithIndividual',
    rules: { required: true },
    label: 'Is the individual aware of the Warning Note and Review Date?',
  },
  {
    component: 'DateInput',
    name: 'disclosedDate',
    label: 'Date informed',
    labelSize: 's',
    rules: { required: true },
    showConditionalGuides: true,
    conditionalRender: ({ disclosedWithIndividual }) =>
      disclosedWithIndividual === 'Yes',
  },
  {
    component: 'Checkbox',
    name: 'disclosedHow',
    label: 'How informed',
    labelSize: 's',
    options: ['Verbal', 'Written'],
    rules: { required: true },
    showConditionalGuides: true,
    conditionalRender: ({ disclosedWithIndividual }) =>
      disclosedWithIndividual === 'Yes',
  },
  {
    component: 'TextArea',
    name: 'disclosedDetails',
    label: 'Details of disclosure to individual',
    labelSize: 's',
    rules: { required: true },
    showConditionalGuides: true,
    conditionalRender: ({ disclosedWithIndividual }) =>
      disclosedWithIndividual === 'Yes',
  },
  {
    component: 'TextArea',
    name: 'disclosedDetails',
    label: 'Justification for non-disclosure of Warning Note',
    labelSize: 's',
    rules: { required: true },
    showConditionalGuides: true,
    conditionalRender: ({ disclosedWithIndividual }) =>
      disclosedWithIndividual === 'No',
  },
];

const WARNING_NARRATIVE: Array<FormComponentStep> = [
  <div key="warning narrative">
    <h2>Guidance on narrative and risks</h2>
    <ExpandDetails label="Guidance on disclosure" triggerLabel="guidance">
      <div>
        This case note provides the context of the warning and should contain:
        <ul>
          <li>
            a description of incidents that occur that may put a member of
            staff, or any other person at risk
          </li>
          <li>
            a statement of the reasons for identifying that an individual is a
            risk
          </li>
          <li>
            a statement about the risks to staff (e.g. 2 workers visit only)
          </li>
          <li>
            details of possible incident triggers and relevant safety
            recommendations for members of staff.
          </li>
        </ul>
      </div>
    </ExpandDetails>
  </div>,
  {
    component: 'TextArea',
    name: 'notes',
    label: 'Warning narrative and risks notes',
    rules: { required: true },
  },
];

const DISCUSSED_WITH_MANAGER: Array<FormComponentStep> = [
  <div key="discussed with manager">
    <h2>Discussed with manager</h2>
    <div className="govuk-body">
      Adding this Warning Note has been discussed and agreed by the manager
      named below.
    </div>
  </div>,
  {
    component: 'TextInput',
    name: 'discussedWithManager',
    label: 'Manager’s name',
    rules: { required: true },
  },
  {
    component: 'DateInput',
    name: 'discussedWithManagerDate',
    label: 'Date discussed with manager',
    rules: { required: true },
  },
];

export const formStepsAdult: FormStep[] = [
  {
    id: 'warning-details',
    title: 'Warning details',
    components: [
      ...INTRO,
      ...WARNING_TYPE_ADULTS,
      ...WARNING_DATES,
      ...WARNING_DISCLOSURE,
      ...WARNING_NARRATIVE,
      ...DISCUSSED_WITH_MANAGER,
    ],
  },
];

export const formStepsChild: FormStep[] = [
  {
    id: 'warning-details',
    title: 'Warning details',
    components: [
      ...INTRO,
      ...WARNING_TYPE_CHILDREN,
      ...WARNING_DATES,
      ...WARNING_NARRATIVE,
      ...DISCUSSED_WITH_MANAGER,
    ],
  },
];
