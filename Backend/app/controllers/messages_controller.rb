class MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token  # For simplicity during testing

  # GET /messages/unread/:user_id - Get unread messages for a specific user
  def unread
    user_id = params[:user_id]

    # Find messages where the user is the recipient (seller) and the status is unread
    unread_messages = Message.where(seller_id: user_id, read_status: false).order(created_at: :desc)

    render json: unread_messages
  end

  # GET /messages/inbox/:user_id - Get received and sent messages for a user
  def inbox
    user_id = params[:user_id]

    # Received messages (where the user is the seller)
    received_messages = Message.where(seller_id: user_id).order(created_at: :asc)

    # Sent messages (where the user is the buyer)
    sent_messages = Message.where(buyer_id: user_id).order(created_at: :asc)

    render json: { received: received_messages, sent: sent_messages }
  end

  # DELETE /messages/:id - Delete a specific message
  def destroy
    message = Message.find(params[:id])

    if message.destroy
      render json: { success: true, message: 'Message deleted successfully.' }
    else
      render json: { success: false, error: 'Failed to delete the message.' }, status: :unprocessable_entity
    end
  end

  # PATCH /messages/mark_as_read/:user_id - Mark unread messages as read
  def mark_as_read
    user_id = params[:user_id]

    unread_messages = Message.where(seller_id: user_id, read_status: false)

    if unread_messages.update_all(read_status: true)
      render json: { success: true, message: 'Messages marked as read.' }
    else
      render json: { success: false, error: 'Failed to mark messages as read.' }, status: :unprocessable_entity
    end
  end

  # POST /messages - Send a new message
  def create
    message = Message.new(message_params)

    if message.save
      render json: message, status: :created
    else
      render json: { error: message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:buyer_id, :seller_id, :content, :read_status)
  end
end







