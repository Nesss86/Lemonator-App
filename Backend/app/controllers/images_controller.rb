class ImagesController < ApplicationController
  before_action :set_car_listing, only: [:create]

  # POST /car_listings/:car_listing_id/images
  def create
    image = @car_listing.images.new(image_params)

    if image.save
      render json: { message: "Image uploaded successfully", image: image }, status: :created
    else
      render json: { error: image.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_car_listing
    @car_listing = CarListing.find_by(id: params[:car_listing_id])
    render json: { error: "Car listing not found" }, status: :not_found unless @car_listing
  end

  def image_params
    params.require(:image).permit(:url)
  end
end