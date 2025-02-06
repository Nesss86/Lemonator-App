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

  # GET /profile/:id (updated to match the new route)
  def show
    user = User.find_by(id: params[:id])

    if user
      render json: {
        user: user_data(user),
        listings: user.car_listings.includes(:images).map do |car|
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
            images: car.images.map(&:url)
          }
        end
      }, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  private

  def user_data(user)
    profile_url = profile_picture_url(user.profile_picture)
    puts "Generated profile picture URL for #{user.first_name}: #{profile_url}"  # Debugging
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      location: user.location,
      profile_picture_url: profile_picture_url(user.profile_picture)
    }
  end

  def profile_picture_url(picture_name)
    "/images/profile_pictures/#{picture_name}"
  end

  def user_params
    params.permit(:first_name, :last_name, :email, :password, :profile_picture, :phone_number, :location)
  end
end









