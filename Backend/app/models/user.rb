class User < ApplicationRecord
  has_secure_password
  has_many :car_listings, dependent: :destroy
  has_many :reviews, dependent: :destroy
end
