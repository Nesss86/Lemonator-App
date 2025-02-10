class CarListingsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /car_listings
  def index
    begin
      @car_listings = CarListing.includes(:user, images_attachments: :blob).all

      car_listings_json = @car_listings.map do |car_listing|
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
          images: car_listing.images.map { |image| url_for(image) },  # Active Storage URLs
          user: {
            id: car_listing.user.id,
            name: [car_listing.user.first_name, car_listing.user.last_name].compact.join(" ").presence || "Unknown Seller",
            email: car_listing.user.email || "Not available"
          }
        }
      end

      render json: car_listings_json, status: :ok
    rescue => e
      render json: { error: "Failed to fetch car listings: #{e.message}" }, status: :internal_server_error
    end
  end

  # POST /car_listings
  def create
    car_listing = CarListing.new(car_listing_params)

    if car_listing.save
      render json: car_listing.as_json.merge(
        images: car_listing.images.map { |image| url_for(image) }
      ), status: :created
    else
      render json: { error: car_listing.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /car_listings/:id
  def update
    car_listing = CarListing.find_by(id: params[:id])
    if car_listing.nil?
      return render json: { error: "Car listing not found" }, status: :not_found
    end
    if car_listing.update(car_listing_params)
      render json: car_listing, include: :images, status: :ok
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
      images: []  # Allow uploading multiple images
    )
  end
end



