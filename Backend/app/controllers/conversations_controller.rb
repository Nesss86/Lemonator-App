class ConversationsController < ApplicationController
  skip_before_action :verify_authenticity_token  # For simplicity during development/testing

  # GET /conversations?user_id=:user_id
  def index
    user_id = params[:user_id]

    unless user_id.present?
      return render json: { error: "User ID is required." }, status: :bad_request
    end

    # Find all conversations where the user is either the buyer or the seller
    conversations = Conversation.includes(:messages)
                                .where("buyer_id = :user_id OR seller_id = :user_id", user_id: user_id)
                                .order(updated_at: :desc)

    render json: conversations.as_json(
      include: {
        messages: {
          only: [:id, :buyer_id, :seller_id, :content, :created_at, :read_status]
        }
      }
    ), status: :ok
  end

  # POST /conversations - Ensure a conversation exists or create one
  def create
    buyer_id = params[:buyer_id]
    seller_id = params[:seller_id]

    if buyer_id.blank? || seller_id.blank?
      return render json: { error: "Both buyer_id and seller_id are required." }, status: :bad_request
    end

    # Find or create a conversation
    conversation = Conversation.where(
      "(buyer_id = :buyer AND seller_id = :seller) OR (buyer_id = :seller AND seller_id = :buyer)",
      buyer: buyer_id, seller: seller_id
    ).first_or_create(buyer_id: buyer_id, seller_id: seller_id)

    if conversation.persisted?
      render json: conversation, status: :ok
    else
      render json: { error: conversation.errors.full_messages }, status: :unprocessable_entity
    end
  rescue => e
    render json: { error: "Failed to create conversation: #{e.message}" }, status: :internal_server_error
  end

  # DELETE /conversations/:id - Delete a conversation
  def destroy
    conversation = Conversation.find_by(id: params[:id])

    if conversation
      conversation.destroy
      render json: { message: "Conversation deleted successfully." }, status: :ok
    else
      render json: { error: "Conversation not found." }, status: :not_found
    end
  rescue => e
    render json: { error: "Failed to delete conversation: #{e.message}" }, status: :internal_server_error
  end
end















