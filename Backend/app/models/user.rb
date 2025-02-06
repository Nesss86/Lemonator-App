class User < ApplicationRecord
  has_secure_password
  has_many :car_listings, dependent: :destroy
end
