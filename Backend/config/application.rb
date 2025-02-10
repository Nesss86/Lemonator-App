require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

# Load dotenv only in development and test environments
if %w[development test].include?(Rails.env)
  require "dotenv-rails"
  Dotenv::Rails.load
end

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0

    # CORS configuration: Allows requests from the frontend (localhost:3001)
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:3001'  # Frontend origin
        resource '*',                    # Allow all resources
                 headers: :any,          # Allow any headers
                 methods: [:get, :post, :patch, :put, :delete, :options, :head], # Allowed HTTP methods
                 credentials: true       # Allow credentials like cookies or headers
      end
    end

    # Configuration for the application, engines, and railties goes here.
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.

    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end



