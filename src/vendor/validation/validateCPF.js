export default function validarCPF(raw) {
  if (raw === undefined) return false;
  const cpf = raw.replace(/[^\d]+/g, '');

  if (cpf === '') {
    return false;
  }

  if (cpf.length !== 11) {
    return false;
  }
  // Elimina cpfs invalidos conhecidos
  if (
    cpf === '12345678909' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999' ||
    cpf === '00000000000'
  ) {
    return false;
  }
  let valor = cpf.split('');
  if (valor.length === 11) {
    valor = valor.map(Number);
    let soma =
      10 * valor[0] +
      9 * valor[1] +
      8 * valor[2] +
      7 * valor[3] +
      6 * valor[4] +
      5 * valor[5] +
      4 * valor[6] +
      3 * valor[7] +
      2 * valor[8];
    const resultado1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado1 === valor[9]) {
      soma =
        valor[0] * 11 +
        valor[1] * 10 +
        valor[2] * 9 +
        valor[3] * 8 +
        valor[4] * 7 +
        valor[5] * 6 +
        valor[6] * 5 +
        valor[7] * 4 +
        valor[8] * 3 +
        valor[9] * 2;
      const resultado2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado2 === valor[10]) {
        return true;
      }
    }
  }
  return false;
}
