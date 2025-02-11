class Review < ApplicationRecord
  belongs_to :user

  validates :content, presence: true
  validates :potatoes, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
end
