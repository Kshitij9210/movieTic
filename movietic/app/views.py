from django.shortcuts import render
from django.contrib.auth.models import User
from app.models import UserProfile, Transaction
from app.forms import UserForm, UserProfileForm
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.decorators import login_required

import stripe
# Create your views here.


def index(request):
    if request.user.is_authenticated:
        up=UserProfile.objects.get(user_id=request.user.id)
        di = dict()
        di = up.toArr()
        trs = Transaction.objects.filter(user_id=request.user.id)
        for value in trs:
            value.amount = int(value.amount) / 100
        return render(request,'user/home.html',{'userprofile':di,'transaction':trs})
    else:
        return render(request,'user/home.html',{})

def paydone(request):
    if request.method == 'POST':
        stripe.api_key = "sk_test_k5TPaAN6I37v51jppkEI6pcz"

        # Get the credit card details submitted by the form
        token = request.POST['stripeToken']

        # Create a charge: this will charge the user's card
        try:
            up=UserProfile.objects.get(user_id=request.user.id)
            customer_id=""
            if up.customer_id=="":
                customer = stripe.Customer.create(
                    source=token,
                    description=request.POST['first_name'] + " " +request.POST['last_name']
                )
                customer_id = customer.id
                up.customer_id=customer.id
            else:
                customer_id = up.customer_id

            charge = stripe.Charge.create(
                amount=request.POST['stripeAmount'],
                currency="usd",
                customer=customer_id,
                description="Product"
            )
            tusr = User.objects.get(id=request.user.id)
            tusr.first_name = request.POST['first_name']
            tusr.last_name = request.POST['last_name']
            up.address = request.POST['address']
            up.phone = request.POST['phone']
            up.save()
            tusr.save()
            trs = Transaction(user=tusr,amount=request.POST['stripeAmount'],customer_id=customer_id,trans_Id=charge['balance_transaction'])
            trs.save()
            login(request,tusr)
            return render(request,'user/paydone.html',{'status':True,'data':charge})
        except stripe.error.CardError as e:
            return render(request,'user/paydone.html',{'status':False,'data':charge})
    else:
        return render(request,'user/paydone.html',{'data':""})


def register(request):
    registered = False

    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileForm(data=request.POST)

        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()

            user.set_password(user.password)
            user.save()

            profile = profile_form.save(commit=False)
            profile.user = user

            profile.save()

            registered = True

        else:
            print (user_form.errors, profile_form.errors)

    else:
        user_form = UserForm()
        profile_form = UserProfileForm()

    return render(request,
            'user/register.html',
            {'user_form': user_form, 'profile_form': profile_form, 'registered': registered})


def user_login(request):


    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user:

            if user.is_active:

                login(request, user)
                return HttpResponseRedirect('/')
            else:
                return HttpResponse("Your movietic account is disabled.")
        else:
            print("Invalid login details: {0}, {1}".format(username, password))
            return render(request,'user/login.html', {'msg':"Invalid login details supplied."})

    else:

        return render(request,'user/login.html', {'msg':""})

@login_required
def user_logout(request):

    logout(request)

    return HttpResponseRedirect('/')
