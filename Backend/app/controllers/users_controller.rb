class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  # POST /signup
  def create
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

  # GET /profile/:id - Fetch user profile details
  def show
    user = User.find_by(id: params[:id])

    if user
      render json: {
        user: user_data(user),
        listings: user.car_listings.includes(images_attachments: :blob).map do |car|
          {
            id: car.id,
            category: car.category,
            make: car.make,
            model: car.model,
            year: car.year,
            price_cents: car.price_cents,
            color: car.color,
            mileage: car.mileage,
            city: car.city,
            description: car.description,
            images: car.images.map { |image| url_for(image) }
          }
        end
      }, status: :ok
    else
      render json: { error: "User not found for ID #{params[:id]}" }, status: :not_found
    end
  end

  # GET /quick_login/:id - Quick login endpoint to fetch user details
  def quick_login
    user = User.find_by(id: params[:id])

    if user
      render json: user_data(user), status: :ok
    else
      render json: { error: "User not found for quick login ID #{params[:id]}" }, status: :not_found
    end
  end

  private

  def user_data(user)
    profile_url = profile_picture_url(user.profile_picture)
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      location: user.location,
      profile_picture_url: profile_url
    }
  end

  # Provide a default profile picture if none is set
  def profile_picture_url(picture_name)
    return "/images/default_profile.png" if picture_name.blank?
    "/images/profile_pictures/#{picture_name}"
  end

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :phone_number, :location, :profile_picture)
  end
end












