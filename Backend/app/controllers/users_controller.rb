class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  # POST /signup
  def create
    # Check if a user with the provided email already exists
    if User.exists?(email: params[:email])
      render json: { error: "Email is already taken" }, status: :unprocessable_entity
      return
    end
  
    user = User.new(user_params)
  
    if user.save
      render json: { message: "User created successfully!", user: user.slice(:id, :first_name, :last_name, :email) }, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  # GET /profile
  def show
    user = User.find_by(id: params[:id])

    if user
      render json: { user: user.slice(:id, :first_name, :last_name, :email) }, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  private

  def user_params
    params.permit(:first_name, :last_name, :email, :password)
  end
end


