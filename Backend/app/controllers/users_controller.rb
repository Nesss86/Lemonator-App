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
      render json: { message: "User created successfully!", user: user_data(user) }, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /profile
  def show
    user = User.find_by(id: params[:id])

    if user
      render json: { user: user_data(user) }, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  private

  # Build user data hash
  def user_data(user)
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,              # Added phone_number
      location: user.location,                      # Added location
      profile_picture_url: profile_picture_url(user.profile_picture)
    }
  end

  # Generate profile picture full URL
  def profile_picture_url(picture_name)
    # If picture_name already includes the path, return it as is
    if picture_name.start_with?("/images/")
      "http://localhost:3000#{picture_name}"
    else
      "http://localhost:3000/images/profile_pictures/#{picture_name}"
    end
  end

  # Permit user parameters
  def user_params
    params.permit(:first_name, :last_name, :email, :password, :profile_picture, :phone_number, :location)
  end
end







