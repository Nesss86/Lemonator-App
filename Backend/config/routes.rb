Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # User routes
  post '/signup', to: 'users#create'       # For creating a new user
  post '/login', to: 'sessions#create'     # For logging in
  get '/profile/:id', to: 'users#show'     # For fetching user details (now expects an ID in the URL)
  
  # Car listings routes
  resources :car_listings, only: [:index, :show]  # Restrict car listings to only index and show actions

  # Custom route to fetch car listings by user
  get '/users/:id/car_listings', to: 'car_listings#by_user'  # Fetch all car listings for a specific user
  
  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end

