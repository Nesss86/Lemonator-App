class CarListingsController < ApplicationController

  def index
    @car_listings = CarListing.all
    render json: @car_listings
  end 
end
