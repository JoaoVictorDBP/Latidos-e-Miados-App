export const emailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const pluralizar = (quantidade, singular, plural) => quantidade + ' ' + (quantidade === 1 ? singular : plural);

// ['Bolinha', 'Tieta', 'Zeca'] -> 'Bolinha, Tieta e Zeca'
export const juntarNomes = (nomes) => (nomes.length <= 1 ? nomes.join('') : nomes.slice(0, -1).join(', ') + ' e ' + nomes[nomes.length - 1]);
