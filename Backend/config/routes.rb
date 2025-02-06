Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # User routes for registration, login, and profile fetching
  post '/signup', to: 'users#create'       # For creating a new user
  post '/login', to: 'sessions#create'     # For logging in
  get '/profile/:id', to: 'users#show'     # For fetching user details (now expects an ID in the URL)


  
  # Car listings routes
  resources :car_listings, only: [:index, :show, :create]  # Restrict car listings to only index and show actions


  # Car listings routes with index, detail view, and creation capabilities
  resources :car_listings, only: [:index, :show, :create]  # Allows listing index, viewing details, and creating a new listing

  # Custom routes for messages
  get '/messages/inbox/:user_id', to: 'messages#inbox', as: 'messages_inbox'  # Fetch received and sent messages for a user
  get '/messages/unread/:user_id', to: 'messages#unread', as: 'messages_unread'  # Fetch unread messages for a user
  patch '/messages/mark_as_read/:user_id', to: 'messages#mark_as_read', as: 'messages_mark_as_read'  # Mark messages as read

  # CRUD routes for messages (allow creation and deletion)
  resources :messages, only: [:create, :destroy]  # Create for sending messages and destroy for deletion

  # Custom route to fetch car listings created by a specific user
  get '/users/:id/car_listings', to: 'car_listings#by_user', as: 'user_car_listings'  # Fetch all car listings for a specific user

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end







