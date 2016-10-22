<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>movieTic | welcome</title>
<link rel="stylesheet" type="text/css" href="styles/style.css">
<script type="text/javascript" src="https://js.stripe.com/v2/"></script>
<script type="text/javascript">
  Stripe.setPublishableKey('pk_test_KxVWAym8ryv6WP5SpKjZ85X8');
</script>
<script type="text/javascript" src="livescript/script.js"></script>
</head>
<body>
		<!-- <form action="/your-server-side-code" method="POST">
	 		<script
		   src="https://checkout.stripe.com/checkout.js" class="stripe-button"
		   data-key="pk_test_KxVWAym8ryv6WP5SpKjZ85X8"
		   data-amount="999"
		   data-name="Demo Site"
		   data-description="Widget"
		   data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
		   data-locale="auto"
		   data-currency="eur">
	 		</script>
		</form> -->
	
			<form action="MakePayment" method="POST" id="payment-form">
				<div id="form-header">
					<span>movieTic Make Payment</span>
				</div>
				<table>
					<tr>
						<td colspan="2"><span class="payment-errors"></span></td>
					</tr>
					<tr>
					<td>
						<div class="form-row">
						<span>Card Number</span>
						</div>
					</td>
					<td> 
						<input type="text" size="20" id="card_number"
							data-stripe="number">
						</td>
					
					</tr>
					<tr>
					<td colspan="2">
						<span id="carderr_one" class="extrasmall-fonts errs"></span>
					</td>
					</tr>
					<tr>
						<td>
						<div class="form-row">
						<span>Expiration (MM/YY)</span>
						</div>
						</td>
						<td> 
						<input type="text" id="exp_dd"
							size="2" data-stripe="exp_month">
						<span> / </span> <input type="text"  id="exp_mm" size="2" data-stripe="exp_year">
						</td>
					
					</tr>
					<tr>
					<td colspan="2">
						<span id="carderr_two" class="extrasmall-fonts errs"></span>
					</td>
					</tr>
					<tr>
						<td>
						<div class="form-row">
						<span>CVC</span>
						</div>
						</td>
						 <td>
						<input type="text" size="4" id="card_cvv"
							data-stripe="cvc">
						</td>	
					</tr>
					<tr>
					<td colspan="2">
						<span id="carderr_three" class="extrasmall-fonts errs"></span>
					</td>
					</tr>
					<tr>
						<td colspan="2"><input type="button" class="submit" value="Pay 1000INR" id="submitbutton"></td>
					</tr>
				</table>
			</form>
</body>
</html>