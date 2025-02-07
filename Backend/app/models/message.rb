class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :buyer, class_name: 'User'
  belongs_to :seller, class_name: 'User'

  # Ensure every new message automatically gets linked to a conversation
  validates :conversation_id, presence: true

  # Optional: add this scope to fetch all messages for a conversation
  scope :in_conversation, ->(conversation_id) { where(conversation_id: conversation_id) }
end


