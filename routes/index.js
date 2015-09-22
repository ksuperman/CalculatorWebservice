
/*
 * GET home page.
 */

exports.index = function(req, res){
	res.render('calcwebservicemain', { title: 'Calculator Webservice !' });
};

exports.test =  function(req, res){
	var jsonString;
	if(req.method == 'POST'){
		var obj = JSON.parse(JSON.stringify(req.body));
		var expression = obj.expression;
		var Result = "";
		var operators = [];
		var operands = [];
		var operandNumber = [];
		var tempOperand = "";
		var oprandsIndex = 0;
		var regexp = /[A-Z]/gi;
		try{
			console.log(expression);

			if(expression.match(regexp))
				throw "Invalid Expression : Alphanumeric";
			else{
				expression = expression.split("");
				console.log(expression);
				for(var i=0;i<expression.length;i++){

					switch(expression[i]){
					case "+":
					case "-":
					case "*":
					case "/":
						if(tempOperand.length > 0){
							operandNumber[oprandsIndex] = parseFloat(tempOperand);
							tempOperand = "";
							if(operandNumber[oprandsIndex] == "NaN"){
								throw "Invalid Expression : Operand is not Number";
							}
							else{
								console.log("\n Operator Added : " + expression[i]);
								console.log("\n operand Added : " + operandNumber[oprandsIndex]);
								operators.push(expression[i]);
								oprandsIndex++;
							}
						}else{
							throw "Invalid Expression : Operator Operand Mismatch";
						}
						break;

					default :
						tempOperand += expression[i];
						if(tempOperand.length > 0 && i==(expression.length-1)){
							operandNumber[oprandsIndex] = parseFloat(tempOperand);
							tempOperand = "";
							if(operandNumber[oprandsIndex] == "NaN"){
								Result = "Invalid Expression : Operand is not Number";
							}
							else
								console.log("\n operand Added : " + operandNumber[oprandsIndex]);
						}
					}
				}

				console.log("\nTotal number of Operands in the Expression are : " + (operandNumber.length));
				console.log("\nThe Total Number of Operators in the Expression are :" + (operators.length));

				if((operandNumber.length-1) != (operators.length)){
					throw "Invalid Expression : Operator Operand Mismatch";	
				}else{
					for(var i=0;i<operators.length;i++){
						switch(operators[i]){
						case "+":
							operandNumber[i+1] = parseFloat(parseFloat(operandNumber[i]) + parseFloat(operandNumber[i+1]));
							break;

						case "-":
							operandNumber[i+1] = parseFloat(parseFloat(operandNumber[i]) - parseFloat(operandNumber[i+1]));
							break;

						case "*":
							operandNumber[i+1] = parseFloat(parseFloat(operandNumber[i]) * parseFloat(operandNumber[i+1]));
							break;

						case "/":
							operandNumber[i+1] = parseFloat(parseFloat(operandNumber[i]) / parseFloat(operandNumber[i+1]));
							break;

						default:
							break;
						}
					}
					Result = operandNumber[oprandsIndex].toString();
				}
			}
		}catch(err){
			console.log(err);
			Result = err;
		}
	}
	res.status(200).send(Result);
}