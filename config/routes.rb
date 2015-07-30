Rails.application.routes.draw do
  root "map#index"
  get "home" => "map#index"

  post "/markers" => "markers#create"
  get "/markers" => "markers#index"
end
