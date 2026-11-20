export const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const pluralizar = (quantidade, singular, plural) => quantidade + ' ' + (quantidade === 1 ? singular : plural);
