Rails.application.routes.draw do
  post 'user/create'

  get 'movie/list'
  post 'movie/create'

  get 'charges/new'
  post 'charges/create'
  get 'charges/list'
  get 'charges/filter'

  root 'charges#new'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end