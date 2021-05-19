const multiValue = (key, value, summaryInline) =>
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
  const { component, options, name, label, isMulti, summaryInline } =
    componentProps;
  if (component === 'AddressLookup') {
    return formatAddress(formData[name], name, label);
  }
  if (component === 'Checkbox' && options) {
    return {
      key: name,
      title: label,
      value:
        typeof options[0] === 'string'
          ? formData[name]
          : formData[name]?.map((data) =>
              multiValue(
                data,
                options.find((o) => o.value === data)?.text,
                summaryInline
              )
            ),
    };
  }
  if (component === 'Radios' || component === 'Select') {
    const stepOptions =
      typeof options === 'function' ? options(formData) : options;
    return {
      key: name,
      title: label,
      value:
        !stepOptions || typeof stepOptions[0] === 'string'
          ? formData[name]
          : stepOptions.find((option) => option.value === formData[name])?.text,
    };
  }
  if (component === 'DateInput' || component === 'DatePicker') {
    return {
      key: name,
      title: label,
      value: new Date(formData[name]).toLocaleDateString('en-GB'),
    };
  }
  return {
    key: name,
    title: label,
    type: component,
    value: Array.isArray(formData[name])
      ? isMulti
        ? formatIsMulti(formData[name], componentProps)
        : formData[name].map((v) => multiValue(v, v))
      : typeof formData[name] === 'object'
      ? Object.entries(formData[name])
          .filter(([, value]) => Boolean(value))
          .map((entry) => multiValue(entry[0], entry[1], summaryInline))
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
