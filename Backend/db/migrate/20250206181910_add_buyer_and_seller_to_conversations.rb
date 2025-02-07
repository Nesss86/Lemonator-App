class AddBuyerAndSellerToConversations < ActiveRecord::Migration[8.0]
  def change
    add_column :conversations, :buyer_id, :integer
    add_column :conversations, :seller_id, :integer
  end
end
