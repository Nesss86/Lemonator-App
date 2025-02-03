class CarListingController < ApplicationController

  def index
    @car_listings = CarListing.all
  end 
end
