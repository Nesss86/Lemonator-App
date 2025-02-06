class CarListingsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /car_listings
  def index
    @car_listings = CarListing.includes(:images).all
    
    render json: @car_listings.map { |car_listing| 
      car_listing.as_json.merge(
        images: car_listing.images.map(&:url)
      )
    }
  end

  # GET /users/:id/car_listings
  def by_user
    user = User.find_by(id: params[:id])
    if user
      listings = user.car_listings.includes(:images)

      render json: listings.map { |car| car_data(car) }, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  # Action to get create listing form 
  def new
    @car_listing = CarListing.new
  end

  # Action to post new listing to the database
  def create
    car_listing = CarListing.new(car_listing_params)

    if car_listing.save
      render json: car_listing, include: :images, status: :created
    else
      render json: { error: car_listing.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def car_listing_params
    params.require(:car_listing).permit(
      :user_id,
      :category, 
      :make, 
      :model, 
      :year, 
      :price_cents, 
      :color, 
      :mileage, 
      :city, 
      :description, 
      images_attributes: [:url]
    )
  end

  def car_data(car)
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
end
