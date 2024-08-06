
# Validação de chave PIX

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

Verifica o valor informado por meio de um regex e se a chave tem o formato válido, os formatos são:

 - CPF;
 - CNPJ;
 - Celular ou telefone;
 - E-mail;
 - Chave Aleatória. 

E retorna ela formatada, caso seja válida, o tipo chave inserida e se o valor é válido.


### Para usar a validação do pix

Ele ira retornar os valores keyPix, typeKey, isValid!

my-component.ts
```ts

import { validatePixKey } from "./validatePixKey";

const {isValid, pixKey, typeKey} = validatePixKey(pixValue);

console.log("~✨ Chave pix:", pixKey)
console.log("~✨ Pix válido:", isValid)
console.log("~✨ Tipo da chave:", typeKey)

```


## License


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
