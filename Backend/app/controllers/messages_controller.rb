class MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token  # For simplicity during development/testing

  # POST /conversations/:conversation_id/messages - Send a new message
  def create
    conversation = Conversation.find_by(id: params[:conversation_id])
    unless conversation
      return render json: { error: 'Conversation not found.' }, status: :not_found
    end

    # Determine the receiver of the message
    receiver_id = (conversation.buyer_id == message_params[:buyer_id]) ? conversation.seller_id : conversation.buyer_id

    message = conversation.messages.new(
      buyer_id: message_params[:buyer_id],
      seller_id: receiver_id,  # Assign the correct receiver
      content: message_params[:content],
      read_status: false  # Mark messages as unread by default for the receiver
    )

    if message.save
      render json: message, status: :created
    else
      render json: { error: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # GET /messages/unread/:user_id - Fetch unread messages for a user (only for the receiver)
  def unread
    user_id = params[:user_id]

    unread_messages = Message.where("seller_id = ? AND read_status = ?", user_id, false)
                             .order(created_at: :desc)

    render json: unread_messages, status: :ok
  rescue => e
    render json: { error: "Error fetching unread messages: #{e.message}" }, status: :internal_server_error
  end

  # PATCH /messages/mark_as_read/:user_id - Mark all unread messages for a user as read
  def mark_as_read
    user_id = params[:user_id]

    updated_count = Message.where("seller_id = ? AND read_status = ?", user_id, false)
                           .update_all(read_status: true)

    render json: { message: "#{updated_count} messages marked as read" }, status: :ok
  rescue => e
    render json: { error: "Error marking messages as read: #{e.message}" }, status: :internal_server_error
  end

  private

  def message_params
    params.require(:message).permit(:buyer_id, :content, :conversation_id)
  end
end







