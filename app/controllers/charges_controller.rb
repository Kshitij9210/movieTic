class ChargesController < ApplicationController
  protect_from_forgery with: :null_session

  def new
  end

  def create
    customer = Stripe::Customer.create(
        :email => params[:user][:email],
        :source  => params[:stripeToken]
    )

    params[:user][:stripeId] = customer.id

    @user = User.find_by_email(params[:user][:email])

    if @user.nil?
      @user = User.new(user_params)
    else

    end

    if @user.save
      charge = Stripe::Charge.create(
          :customer    => customer.id,
          :amount      => params[:amount],
          :description => 'Movie Tickets',
          :currency    => 'usd'
      )

      logger.info charge

      params[:purchase][:userId] = @user.id
      params[:purchase][:chargeId] = charge[:id]

      @purchase = Purchase.new(purchase_params)

      if @purchase.save
        resp = { :status => "success", :message => "Successfully created the purchase!"}
        render :json => resp
      else
        logger.debug @purchase.errors.full_messages
        resp = { :status => "error" }
        render :json => resp
      end
    else
      logger.debug @user.errors.full_messages
      resp = { :status => "error" }
      render :json => resp
    end

  rescue Stripe::CardError => e
    err = { :status => "failure", :message => e.message}
    render :json => err
  end

  def list
    @purchases = Purchase.all

    @responses = { :purchases => [] }

    @purchases.each do |purchase|
      user = User.find_by_id(purchase.userId)
      movie = Movie.find_by_id(purchase.movieId)

      @responses[:purchases] << { :user => user, :movie => movie, :date => purchase.created_at }
    end

    render :json => @responses.to_json
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :mobile, :address, :stripeId)
  end

  def purchase_params
    params.require(:purchase).permit(:userId, :movieId, :chargeId)
  end
end
