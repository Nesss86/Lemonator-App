class CarListing < ApplicationRecord
  belongs_to :user
  has_many_attached :images # Use Active Storage for images
end
