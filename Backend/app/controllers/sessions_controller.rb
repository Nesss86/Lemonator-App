class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # POST /login
  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      # Exclude the password_digest from the response
      sanitized_user = user.as_json(except: [:password_digest])
      render json: { message: "Login successful!", user: sanitized_user }, status: :ok
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end
end

