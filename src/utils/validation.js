export const validateEmail = email => /\S+@\S+\.\S+/.test(email);
export const validatePassword = pw =>
  pw.length >= 8 && /[0-9]/.test(pw) && /[A-Za-z]/.test(pw);
export const validateDob = dob => {
  const age = (new Date() - new Date(dob)) / (1000 * 60 * 60 * 24 * 365);
  return age >= 13;
};
