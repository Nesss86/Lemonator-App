class ConversationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  # GET /conversations?user_id=:user_id
  def index
    user_id = params[:user_id]

    unless user_id.present?
      return render json: { error: "User ID is required." }, status: :bad_request
    end

    conversations = Conversation.includes(:messages, :buyer, :seller)
                                .where("buyer_id = :user_id OR seller_id = :user_id", user_id: user_id)
                                .order(updated_at: :desc)

    response = conversations.map do |convo|
      # Determine the other user based on the current user ID
      other_user = (convo.buyer_id.to_s == user_id.to_s) ? convo.seller : convo.buyer

      {
        id: convo.id,
        buyer_id: convo.buyer_id,
        seller_id: convo.seller_id,
        updated_at: convo.updated_at,
        other_user: other_user ? {
          id: other_user.id,
          first_name: other_user.first_name || "Unknown",
          last_name: other_user.last_name || "",
          email: other_user.email || "Not provided"
        } : nil,
        messages: convo.messages.map do |msg|
          {
            id: msg.id,
            buyer_id: msg.buyer_id,
            seller_id: msg.seller_id,
            content: msg.content,
            created_at: msg.created_at,
            read_status: msg.read_status,
            sender_first_name: msg.buyer_id == convo.buyer_id ? convo.buyer.first_name : convo.seller.first_name,
            sender_last_name: msg.buyer_id == convo.buyer_id ? convo.buyer.last_name : convo.seller.last_name,
          }
        end
      }
    end

    render json: response, status: :ok
  rescue => e
    render json: { error: "Failed to fetch conversations: #{e.message}" }, status: :internal_server_error
  end

  # POST /conversations - Create or find a conversation
  def create
    buyer_id = params[:buyer_id]
    seller_id = params[:seller_id]

    if buyer_id.blank? || seller_id.blank?
      return render json: { error: "Both buyer_id and seller_id are required." }, status: :bad_request
    end

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



















