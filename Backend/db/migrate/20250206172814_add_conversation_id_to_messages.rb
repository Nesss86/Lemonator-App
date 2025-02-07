class AddConversationIdToMessages < ActiveRecord::Migration[8.0]
  def change
    add_column :messages, :conversation_id, :integer
  end
end
