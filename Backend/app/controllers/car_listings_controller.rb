class CarListingsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /car_listings
  def index
    begin
      @car_listings = CarListing.includes(:images, :user).all

      render json: @car_listings.map { |car_listing| 
        {
          id: car_listing.id,
          category: car_listing.category,
          make: car_listing.make,
          model: car_listing.model,
          year: car_listing.year,
          price_cents: car_listing.price_cents,
          color: car_listing.color,
          mileage: car_listing.mileage,
          city: car_listing.city,
          description: car_listing.description,
          images: car_listing.images.map(&:url),
          user: car_listing.user ? {
            id: car_listing.user.id,
            name: [car_listing.user.first_name, car_listing.user.last_name].compact.join(" ").presence || "Unknown Seller",
            email: car_listing.user.email || "Not available"
          } : {}
        }
      }, status: :ok

    rescue => e
      render json: { error: "Failed to fetch car listings: #{e.message}" }, status: :internal_server_error
    end
  end
end





