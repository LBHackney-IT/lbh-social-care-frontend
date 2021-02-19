import { convertFormat } from 'utils/date';

const multiValue = ([key, value], summaryInline) =>
  summaryInline ? (
    <span key={key}>{value} </span>
  ) : (
    <div key={key}>
      <span>{value}</span>
      <br />
    </div>
  );

const formatIsMulti = (formData, componentProps) => (
  <>
    {formData
      .map((multiData, index) => ({
        ...formatData(componentProps, {
          [componentProps.name]: multiData,
        }),
        key: `${componentProps.name}_${index}`,
      }))
      ?.map(({ key, value }) => (
        <div key={key}>{value}</div>
      ))}
  </>
);

const formatAddress = ({ address, postcode }, name, label) =>
  address && {
    key: name,
    title: label,
    value: (
      <>
        {address.split(', ').map((value) => (
          <div key={value}>
            <span>{value}</span>
            <br />
          </div>
        ))}
        <div>{postcode}</div>
      </>
    ),
  };

export const formatData = (componentProps, formData) => {
  const {
    component,
    options,
    name,
    label,
    isMulti,
    summaryInline,
  } = componentProps;
  if (component === 'AddressLookup') {
    return formatAddress(formData[name], name, label);
  }
  if (component === 'Radios' || component === 'Select') {
    const stepOptions =
      typeof options === 'function' ? options(formData) : options;
    return {
      key: name,
      title: label,
      value:
        typeof stepOptions[0] === 'string'
          ? formData[name]
          : stepOptions.find((option) => option.value === formData[name])?.text,
    };
  }
  if (component === 'DateInput') {
    return {
      key: name,
      title: label,
      value: convertFormat(formData[name]),
    };
  }
  return {
    key: name,
    title: label,
    value: Array.isArray(formData[name])
      ? isMulti
        ? formatIsMulti(formData[name], componentProps)
        : formData[name]
            .filter(Boolean)
            .map((v) => multiValue(v.split('/').pop()))
      : typeof formData[name] === 'object'
      ? Object.entries(formData[name])
          .filter(([, value]) => Boolean(value))
          .map((entry) => multiValue(entry, summaryInline))
      : typeof formData[name] === 'boolean'
      ? JSON.stringify(formData[name])
      : formData[name],
  };
};

export const getSectionObject = (formSteps, formData, value = false) =>
  formSteps.reduce((acc, { id, isMulti }) => {
    const stepIds = isMulti
      ? formData[id]?.reduce(
          (acc, _, key) => ({ ...acc, [`${id}/${key + 1}`]: false }),
          {}
        )
      : { [id]: value };
    return { ...acc, ...stepIds };
  }, {});
