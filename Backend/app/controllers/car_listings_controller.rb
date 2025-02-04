class CarListingsController < ApplicationController
   
  skip_before_action :verify_authenticity_token
 # before_action :authorize_user, only: [:create]

  def index
    @car_listings = CarListing.includes(:images).all
    
    render json: @car_listings.map { |car_listing| 
      car_listing.as_json.merge(
        images: car_listing.images.map(&:url)
      )
    }
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
    images_attributes: [:url])
end

end
