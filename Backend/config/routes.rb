Rails.application.routes.draw do
  # User routes for registration, login, and profile fetching
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  get '/profile/:id', to: 'users#show'
  get '/quick_login/:id', to: 'users#quick_login'  # New route

  # Car listings routes with index, detail view, and creation capabilities
  resources :car_listings

  # Conversations routes
  resources :conversations, only: [:index, :create, :destroy] do
    resources :messages, only: [:create]  # Nested route for creating messages within conversations
  end

  # Messages-related custom routes
  get '/messages/unread/:user_id', to: 'messages#unread', as: 'unread_messages'
  patch '/messages/mark_as_read/:user_id', to: 'messages#mark_as_read', as: 'mark_messages_as_read'

  # OpenAI Chatbot route
  post '/api/ask', to: 'chatbot#ask'
end























