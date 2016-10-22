/**
 *will handle the submit event on the payment form
 *@autor visngh.ggits.2010@gmail.com 
 */

function validatePaymentForm(){
	var cardNum = document.getElementById("card_number").value;
	var _mm = document.getElementById("exp_dd").value;
	var __yy = document.getElementById("exp_mm").value;
	var ___cvv = document.getElementById("card_cvv").value;
	
	var errOne = document.getElementById("carderr_one");
	var errTwo = document.getElementById("carderr_two");
	var errThree = document.getElementById("carderr_three");
	
	var _gCard = false;
	if(isNaN(cardNum)){
		errOne.innerHTML="a 16 digit number is required";
	}
	else{
		if(cardNum.length<16){
			errOne.innerHTML="16 digits are required";
		}
		else{
			errOne.innerHTML="";
			_gCard = true;
		}
	}
	
	var _gmm = false;
	if(isNaN(_mm)){
		errTwo.innerHTML="seems an incorrect form";
	}
	else{
		if(_mm>12 || _mm<1){
			errTwo.innerHTML="month is in incorrect form";
		}
		else{
			errTwo.innerHTML="";
			_gmm=true;
		}
	}
	
	var _gyy = false;
	if(isNaN(__yy)){
		errThree.innerHTML="seems an incorrect form";
	}
	else{
		if(__yy<17){
			errThree.innerHTML="year is in incorrect form";
		}
		else{
			errThree.innerHTML="";
			_gyy = true;
		}
	}
	
	
	var __gccvv = false;
	if(isNaN(___cvv)){
		errThree.innerHTML="a number is required";
	}
	else{
		if(___cvv.length>4 || ___cvv.length<3){
			errThree.innerHTML="length should be 3 or 4";
		}
		else{
			errThree.innerHTML="";
			__gccvv = true;
		}
	}
	
	if(_gCard && _gmm && _gyy && __gccvv){
		return true;
	}
	else{
		return false;
	}
}


document.addEventListener('DOMContentLoaded', function (){
	document.getElementById("submitbutton").addEventListener('click', function (){
		var validateForm = validatePaymentForm();
		if(validateForm){
			Stripe.card.createToken(document.getElementById("payment-form"), stripeResponseHandler);
		}
		else{
			
		}
		
	});
});

function stripeResponseHandler(status, response){
	if(status==200){
		var anInp = document.createElement("input");
		anInp.setAttribute("type","hidden");
		anInp.setAttribute("name","stripeToken");
		anInp.setAttribute("value",response.id);
		
		
		document.getElementById("payment-form").appendChild(anInp);
		document.getElementById("payment-form").submit();
		
	}
}