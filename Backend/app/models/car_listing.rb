class CarListing < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :destroy

  accepts_nested_attributes_for :images, # allows for creating images with car listing
  allow_destroy: true
end
