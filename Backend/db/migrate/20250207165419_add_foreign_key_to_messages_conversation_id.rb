class AddForeignKeyToMessagesConversationId < ActiveRecord::Migration[6.0]
  def change
    # Add foreign key constraint to enforce relationship
    add_foreign_key :messages, :conversations, column: :conversation_id, on_delete: :cascade
    add_index :messages, :conversation_id  # Optional but good for performance
  end
end

