class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /profile/:id - Fetch user profile details
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

  def profile_picture_url(picture_name)
    "/images/profile_pictures/#{picture_name}"
  end
end










