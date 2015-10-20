$(function(){
	$('#equals').click(function (){
		var data = {};
		data.expression = $( "#expression" ).val();
		console.log(JSON.stringify(data));
		$.ajax({
			url:'/evaluate',type: 'POST',contentType: 'application/json',data: JSON.stringify(data),
			success: function(result){
				console.log(parseFloat(result));
				if(parseFloat(result).toString() == "NaN")
					document.getElementById("expression").style.background = "#E98E8E";	
				else
					document.getElementById("expression").style.background = "#7DFF7D";
				document.getElementById("expression").value = result;    
			},
			error: function(){
				document.getElementById("expression").value = "Webservice Error!!"; 
				document.getElementById("expression").style.background = "#E98E8E";
			}
		});
	});
});

function setDigit(digit){
	var temp = document.getElementById("expression").value;
	temp = temp + digit;
	document.getElementById("expression").value = temp;
}

function reset(){
	document.getElementById("expression").value = "";
	document.getElementById("expression").style.background = "white";
}

function ResetField(f){
	f.style.background = "#FFFFFF";
} 
