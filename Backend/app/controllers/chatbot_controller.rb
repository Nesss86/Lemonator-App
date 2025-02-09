require 'net/http'
require 'json'

class ChatbotController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:ask]

  def ask
    user_question = params[:question]
    response = fetch_openai_response(user_question)

    if response
      render json: { response: response }, status: :ok
    else
      render json: { error: "Unable to fetch response" }, status: :internal_server_error
    end
  end

  private

  def fetch_openai_response(question)
    uri = URI('https://api.openai.com/v1/chat/completions')
    request = Net::HTTP::Post.new(uri)
    request['Authorization'] = "Bearer #{ENV['OPENAI_API_KEY']}"
    request['Content-Type'] = 'application/json'
    request.body = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: question }
      ],
      max_tokens: 150
    }.to_json

    response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
      http.request(request)
    end

    json = JSON.parse(response.body)
    json['choices'][0]['message']['content'].strip if json['choices']
  rescue StandardError => e
    Rails.logger.error "OpenAI request failed: #{e.message}"
    nil
  end
end


















