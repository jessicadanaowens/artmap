Rails.application.routes.draw do
  root "map#index"
  get "home" => "map#index"
end
