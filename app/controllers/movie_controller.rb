class MovieController < ApplicationController
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      resp = { :status => "success" }
      render :json => resp
    else
      logger.info @movie.errors.full_messages
      resp = { :status => "error" }
      render :json => resp
    end
  end

  def list
    @movies = Movie.all
    render :json => { :movies => @movies.to_json }
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :description, :amount)
  end
end
