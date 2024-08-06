function validateCPF(cpf: string): boolean {
  let sum = 0;
  let rest;

  if (cpf === "00000000000") {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }

  if (rest !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }

  return true;
}

function validateCNPJ(cnpj: string): boolean {
  // Remover caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]/g, "");

  // Verificar se o CNPJ possui 14 dígitos
  if (cnpj.length !== 14) {
    return false;
  }

  // Verificar se todos os dígitos são iguais (CNPJ inválido)
  if (/^(\d)\1+$/.test(cnpj)) {
    return false;
  }

  // Calcular os dígitos verificadores
  let cnpjSize = cnpj.length - 2;
  let numbers = cnpj.substring(0, cnpjSize);
  const digits = cnpj.substring(cnpjSize);
  let sum = 0;
  let pos = cnpjSize - 7;

  for (let i = cnpjSize; i >= 1; i--) {
    sum += parseInt(numbers.charAt(cnpjSize - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  // Verificar o primeiro dígito verificador
  if (result !== parseInt(digits.charAt(0), 10)) {
    return false;
  }

  cnpjSize++;
  numbers = cnpj.substring(0, cnpjSize);
  sum = 0;
  pos = cnpjSize - 7;

  for (let i = cnpjSize; i >= 1; i--) {
    sum += parseInt(numbers.charAt(cnpjSize - i), 10) * pos--;
    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  // Verificar o segundo dígito verificador
  if (result !== parseInt(digits.charAt(1), 10)) {
    return false;
  }

  // CNPJ válido
  return true;
}

function validateDDD(ddd: string): boolean {
  const dddsValidos = [
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19", // SP
    "21",
    "22",
    "24", // RJ
    "27",
    "28", // ES
    "31",
    "32",
    "33",
    "34",
    "35",
    "37",
    "38", // MG
    "41",
    "42",
    "43",
    "44",
    "45",
    "46", // PR
    "47",
    "48",
    "49", // SC
    "51",
    "53",
    "54",
    "55", // RS
    "61", // DF e GO
    "62",
    "64", // GO
    "63", // TO
    "65",
    "66", // MT
    "67", // MS
    "68", // AC
    "69", // RO
    "71",
    "73",
    "74",
    "75",
    "77", // BA
    "79", // SE
    "81",
    "87", // PE
    "82", // AL
    "83", // PB
    "84", // RN
    "85",
    "88", // CE
    "86",
    "89", // PI
    "91",
    "93",
    "94", // PA
    "92",
    "97", // AM
    "95", // RR
    "96", // AP
    "98",
    "99", // MA
  ];

  return dddsValidos.includes(ddd);
}

function validatePhoneNumber(phone: string): boolean {
  // Remover caracteres não numéricos
  phone = phone.replace(/\D/g, "");

  // Verificar o formato do número de telefone fixo (10 dígitos) com DDD
  const landlinePhone = /^\d{10}$/;

  if (landlinePhone.test(phone)) {
    const ddd = phone.substring(0, 2);
    const number = phone.substring(2);

    return validateDDD(ddd) && number.length === 8;
  }

  // Verificar o formato do número de telefone celular (11 dígitos) com DDD
  const cellPhone = /^\d{11}$/;

  if (cellPhone.test(phone)) {
    const ddd = phone.substring(0, 2);
    const number = phone.substring(2);

    return validateDDD(ddd) && number.length === 9;
  }

  // Número de telefone inválido
  return false;
}

export function validatePixKey(inputPix: string) {
  const pixKey = inputPix;

  const regexCPF = /^\d{11}$/;
  const regexCNPJ = /^\d{14}$/;
  const regexPhone = /^\d{10,11}$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,3}$/;
  const regexRandomKey = /^[a-zA-Z0-9]{32}$/;

  const keyWithoutMask = pixKey.replace(/\W/g, "");

  let pixData = {
    pixKey: "",
    typeKey: "",
    isValid: false,
  };

  if (regexPhone.test(keyWithoutMask) && validatePhoneNumber(keyWithoutMask) && !validateCPF(keyWithoutMask)) {
    // Chave é um número de celular válido
    pixData.pixKey = `(${keyWithoutMask.substring(0, 2)}) ${keyWithoutMask.substring(2, 7)}-${keyWithoutMask.substring(7)}`;
    pixData.typeKey = "TELEFONE";
  } else if (regexEmail.test(pixKey)) {
    // Chave é um email válido
    pixData.pixKey = pixKey;
    pixData.typeKey = "EMAIL";
  } else if (regexCPF.test(keyWithoutMask) && validateCPF(keyWithoutMask)) {
    // Chave é um CPF válido
    pixData.pixKey = `${keyWithoutMask.substring(0, 3)}.${keyWithoutMask.substring(3, 6)}.${keyWithoutMask.substring(6, 9)}-${keyWithoutMask.substring(9)}`;
    pixData.typeKey = "CPF";
  } else if (regexCNPJ.test(keyWithoutMask) && validateCNPJ(keyWithoutMask)) {
    // Chave é um CNPJ válido
    pixData.pixKey = `${keyWithoutMask.substring(0, 2)}.${keyWithoutMask.substring(2, 5)}.${keyWithoutMask.substring(5, 8)}/${keyWithoutMask.substring(8, 12)}-${keyWithoutMask.substring(12)}`;
    pixData.typeKey = "CNPJ";
  } else if (regexRandomKey.test(keyWithoutMask) && keyWithoutMask.length === 32) {
    // Chave é uma chave aleatória válida
    pixData.pixKey = pixKey;
    pixData.typeKey = "CHAVE ALEATÓRIA";
  } else {
    // Chave não corresponde a nenhum formato válido
    pixData.pixKey = pixKey;
    pixData.typeKey = "INVÁLIDA";
  }

  pixData.isValid = pixData.typeKey !== "INVÁLIDA";

  return pixData;
}
