package com.moovietic.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.stripe.Stripe;
import com.stripe.exception.CardException;
import com.stripe.model.Charge;

/**
 * Servlet implementation class MakePayment
 */
@WebServlet("/MakePayment")
public class MakePayment extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public MakePayment() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String __token = request.getParameter("stripeToken");
		
		
		Stripe.apiKey = "Dev_API_KEY";
		String token = request.getParameter("stripeToken");
		
		try{
			Map<String, Object> chargeParams = new HashMap<String, Object>();
			 chargeParams.put("amount", 1000); // Amount in cents
			  chargeParams.put("currency", "eur");
			  chargeParams.put("source", token);
			  chargeParams.put("description", "Example charge");
			  
			  Charge charge = Charge.create(chargeParams);
		}
		catch(CardException cardEx){
			cardEx.printStackTrace();
		}
		catch(Exception e){
			e.printStackTrace();
		}
		
		
	}

}
