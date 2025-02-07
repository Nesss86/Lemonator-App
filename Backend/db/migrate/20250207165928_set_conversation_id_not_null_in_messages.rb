class SetConversationIdNotNullInMessages < ActiveRecord::Migration[6.0]
  def change
    change_column_null :messages, :conversation_id, false
  end
end

