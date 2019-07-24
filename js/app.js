var calculadora = {

	pantalla: document.getElementById("display"),
	valorPantalla: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	teclaIgual: false,

	init: (function(){
		this.asignarEventosaFuncion();
	}),

	animacionuno: function(tecla){
	document.getElementById(tecla).style.transform="scale(0.9)";
	setTimeout(function() {document.getElementById(tecla).style.transform="scale(1)";}, 200);},


	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresarNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresarNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresarNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresarNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresarNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresarNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresarNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresarNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresarNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresarNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresarOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresarOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresarOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresarOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresarOperacion("+");});
	},

	borrarPantalla: function(){
		this.animacionuno("on");
	  this.valorPantalla = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.teclaIgual = false;
		this.ultimoValor = 0;
		this.updatePantalla();
	},

	cambiarSigno: function(){
		this.animacionuno("sign");
		if (this.valorPantalla !="0") {
			var aux;
			if (this.valorPantalla.charAt(0)=="-") {
				aux = this.valorPantalla.slice(1);
			}	else {
				aux = "-" + this.valorPantalla;
			}
		this.valorPantalla = "";
		this.valorPantalla = aux;
		this.updatePantalla();
		}
	},

	ingresoDecimal: function(){
		this.animacionuno("punto");
		if (this.valorPantalla.indexOf(".")== -1) {
			if (this.valorPantalla == ""){
				this.valorPantalla = this.valorPantalla + "0.";
			} else {
				this.valorPantalla = this.valorPantalla + ".";
			}
			this.updatePantalla();
		}
	},

	ingresarNumero: function(valor){
		this.animacionuno(valor);
		if (this.valorPantalla.length < 8) {

			if (this.valorPantalla=="0") {
				this.valorPantalla = "";
				this.valorPantalla = this.valorPantalla + valor;
			} else {
				this.valorPantalla = this.valorPantalla + valor;
			}
		this.updatePantalla();
		}
	},

	ingresarOperacion: function(oper){
		this.primerValor = parseFloat(this.valorPantalla);
		this.valorPantalla = "";
		this.operacion = oper;
		this.teclaIgual = false;
		this.updatePantalla();
	},

	verResultado: function(){
		this.animacionuno("igual");
		if(!this.teclaIgual){
			this.segundoValor = parseFloat(this.valorPantalla);
			this.ultimoValor = this.segundoValor;
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);

		} else {
			this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}

		this.primerValor = this.resultado;
		this.valorPantalla = "";

		if (this.resultado.toString().length < 9){
			this.valorPantalla = this.resultado.toString();
		} else {
			this.valorPantalla = this.resultado.toString().slice(0,8) + "...";
		}

		this.teclaIgual = true;
		this.updatePantalla();

	},

	realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-":
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*":
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/":
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},

	updatePantalla: function(){
		this.pantalla.innerHTML = this.valorPantalla;
	}

};

calculadora.init();
