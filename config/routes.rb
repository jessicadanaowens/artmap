Rails.application.routes.draw do
  devise_for :users
  root "map#index"
  get "home" => "map#index"

  post "/markers" => "markers#create"
  get "/markers" => "markers#index"
  get "/dashboard" => "dashboard#index"
end
