const marcos = 'lucilio oliveira campos junior'
var soma = 0;
var resultado = 0;
const numerologia = [['a', 'j', 's'], ['b', 'k', 't'], ['c', 'l', 'u'], ['d', 'm', 'v'], ['e', 'n', 'w'], ['f', 'o', 'x'], ['g', 'p', 'y'], ['h', 'q', 'z'], ['i', 'r']]

for (let i = 0; i < marcos.length; i++) {
  for (let j = 0; j < numerologia.length; j++) {
    for (let k = 0; k < 3; k++) {
      if (marcos.charAt(i) == numerologia[j][k]) {
        console.log(marcos.charAt(i), numerologia[j][k])
        soma += j + 1
        console.log(j)
      }
    }
  }
}

soma = soma.toString();

for (var i = 0, len = soma.length; i < len; i += 1) {
  resultado += parseInt(soma.charAt(i));
}

console.log(resultado);