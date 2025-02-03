class CarListingsController < ApplicationController

  def index
    @car_listings = CarListing.includes(:images).all
    
    render json: @car_listings.map { |car_listing| 
      car_listing.as_json.merge(
        images: car_listing.images.map(&:url)
      )
    }
  end 

  
end
