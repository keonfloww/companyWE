const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/;
export const ruleRequire = {required: true};
export const ruleEmail = {
  required: true,
  pattern: {
    value: regEmail,
    message: 'invalidEmail',
  },
};
