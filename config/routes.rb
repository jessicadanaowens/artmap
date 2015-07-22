Rails.application.routes.draw do
  root "map#index"
  get "home" => "map#index"

  # resources :users do
  #   resources :markers, only: [:create]
  # end

  post "/markers" => "markers#create"
end
