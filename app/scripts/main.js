
$(document).ready(function(){
  $('#btnTraduzir').click(function(){
    var textoAssembly = $('#txtAreaAssembly').val()
    if (textoAssembly.trim() == '') { $('#txtAreaBinary').val('');  return }

    var programa = textoAssembly.split('\n');
    $.each(programa, function(index, linha){
      var command =  linha.trim().split(' ');
      $.each(command, function(campo, texto){
        command[campo] = toBinaryFunction(texto);
      });
      programa[index] = command.join('');
    });
    $('#txtAreaBinary').val(programa.join('\n'));


  });

  $('#btnExecutar').click(function(){
    $('#webconsole').empty();
    var programa = $('#txtAreaBinary').val().split('\n');
    var computador = new Computador();
    computador.processador.start(programa);



  });
  $('#btnClearConsole').click(function () {
    $('#webconsole').empty();
  });
});


function toBinaryFunction (command){
  switch (command) {
    case 'sum':
      return '1'.padleft(4, 0);
      break;
    case 'sub':
      return '10'.padleft(4, 0);
    case 'sqt':
      return '11'.padleft(4, 0);
      break;
    case 'jmp':
      return '100'.padleft(4, 0).padright(18, 0);
      default:
      return parseInt(command).toString(2).padleft(14, 0);
      break;
  }
}


String.prototype.padleft = function (number, caracter) {
  var str = this;
  while (str.length < number) {
    str = caracter + '' + str
  }
  return str;
};


String.prototype.padright = function (number, caracter) {
  var str = this;
  while (str.length < number) {
    str += caracter
  }
  return str;
};
