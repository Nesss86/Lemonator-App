class MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token  # For simplicity during testing

  # GET /messages?buyer_id=:buyer_id&seller_id=:seller_id
  def index
    messages = Message.where(buyer_id: params[:buyer_id], seller_id: params[:seller_id])
                      .or(Message.where(buyer_id: params[:seller_id], seller_id: params[:buyer_id]))
                      .order(:created_at)

    render json: messages
  end

  # POST /messages
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
    params.require(:message).permit(:buyer_id, :seller_id, :content)
  end
end
