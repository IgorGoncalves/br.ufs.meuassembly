function Computador(){
  this.memoria = [];
  this.processador = new Processador();
  this.carregarMemoria = function (memoria){
    this.memoria = memoria;
  }
}

function Processador(){
  this.cp = 0; // contador de programas
  this.ula = new Ula();
  this.uc = new UC();
  this.dc = new Decodificador();
  this.start = function(memoria){
    do {

      this.cp = this.uc.control(this.dc.decodificar(memoria[this.cp]), this.cp, this.ula);

    } while (memoria.length > this.cp);
  }
}

function Decodificador(){
  var maskComando = 0b11110000000000000000000000000000;
  var maskValor1  = 0b00001111111111111100000000000000;
  var maskValor2  = 0b00000000000000000011111111111111;
  var instrucao = [];
  this.decodificar = function(palavra){
    instrucao = [];
    palavra = parseInt(palavra, 2);
    instrucao.push((palavra & maskComando) >> 28);
    instrucao.push((palavra & maskValor1) >> 14);
    instrucao.push(palavra & maskValor2);
    return instrucao;
  }
}


function UC(){
  this.control = function(command, cp, ula){
    if (command[0] == 0b100) {
      return command[2];
    }
    $("#webconsole").append('command: '+ command[0].toString(2)+', ' +
                             command[1].toString(2)+', ' +
                             command[2].toString(2)+
                             ' Resultado: '+ula.calcule(command).toString(2)+"<br>");
    return cp + 1;
  }
}


function Ula(){
  this.calcule = function(command){
    switch (command[0]) {
      case 1:
        return this.sum(command[1], command[2]);
        break;
      case 2:
        return this.sub(command[1], command[2])
        break;
      case 3:
        return this.sqt(command[1], command[2])
        break;
      default:

    }
  }
  this.sum = function(number1, number2){
    return number1 + number2
  }
    this.sqt = function(number1, number2){
    return number1 * number2
  }
    this.sub = function(number1, number2){
    return number1 - number2
  }
}
