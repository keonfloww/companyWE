const generateInputConfig = ({name, label, rules = {}, ...args}: any) => {
  // Todo: handle dynamic validation

  return {
    name: name,
    label: label,
    rules: rules,
    ...args,
  };
};

const FormUtils = {
  generateInputConfig,
};

export default FormUtils;
