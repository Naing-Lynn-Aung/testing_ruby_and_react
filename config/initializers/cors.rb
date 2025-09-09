# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "localhost:3000" # Add all relevant localhost ports
    # You can also use a wildcard for development: origins '*'

    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
      credentials: true # If you need to send cookies or authentication headers
  end
end
