# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts "Seeding database..."

# Destroy existing records
Message.destroy_all
Image.destroy_all
CarListing.destroy_all
User.destroy_all

# Static Users
puts "Adding users..."

users = [
  { first_name: "John", last_name: "Doe", email: "john.doe@example.com", password: "password123" },
  { first_name: "Jane", last_name: "Smith", email: "jane.smith@example.com", password: "password123" },
  { first_name: "Alice", last_name: "Johnson", email: "alice.johnson@example.com", password: "password123" },
  { first_name: "Bob", last_name: "Brown", email: "bob.brown@example.com", password: "password123" },
  { first_name: "Charlie", last_name: "Davis", email: "charlie.davis@example.com", password: "password123" }
]

# Create users and store them in a variable for later use
created_users = users.map do |user|
  User.create!(user)
end

puts "Users added successfully!"

# Static Car Listings
puts "Creating car listings..."
car_listings = [
  { user: created_users[0], category: "Sedan", make: "Toyota", model: "Corolla", year: 2020, price_cents: 2_000_000, color: "Blue", mileage: 30000, city: "Toronto", description: "Reliable and fuel-efficient." },
  { user: created_users[1], category: "Sedan", make: "Honda", model: "Civic", year: 2019, price_cents: 1_800_000, color: "Red", mileage: 40000, city: "Vancouver", description: "Sporty and stylish." },
  { user: created_users[2], category: "Pickup", make: "Ford", model: "F-150", year: 2021, price_cents: 4_500_000, color: "Black", mileage: 20000, city: "Toronto", description: "Powerful truck for all terrains." },
  { user: created_users[3], category: "SUV", make: "BMW", model: "X5", year: 2022, price_cents: 7_500_000, color: "White", mileage: 15000, city: "Montreal", description: "Luxury SUV with advanced features." },
  { user: created_users[4], category: "Electric", make: "Tesla", model: "Model 3", year: 2023, price_cents: 6_000_000, color: "Silver", mileage: 10000, city: "Toronto", description: "Electric car with autopilot." },
  { user: created_users[0], category: "SUV", make: "Jeep", model: "Wrangler", year: 2018, price_cents: 3_500_000, color: "Green", mileage: 60000, city: "Vancouver", description: "Off-road beast with 4x4 capability." },
  { user: created_users[1], category: "Sedan", make: "Nissan", model: "Altima", year: 2020, price_cents: 2_300_000, color: "Grey", mileage: 35000, city: "Montreal", description: "Comfortable daily driver." },
  { user: created_users[2], category: "Pickup", make: "Chevrolet", model: "Silverado", year: 2021, price_cents: 5_200_000, color: "Blue", mileage: 25000, city: "Vancouver", description: "Heavy-duty and reliable." },
  { user: created_users[3], category: "Electric", make: "Nissan", model: "Leaf", year: 2022, price_cents: 3_200_000, color: "White", mileage: 12000, city: "Toronto", description: "Affordable electric vehicle." },
  { user: created_users[4], category: "Coupe", make: "Ford", model: "Mustang", year: 2017, price_cents: 3_900_000, color: "Yellow", mileage: 50000, city: "Toronto", description: "American muscle with a V8 engine." },
  { user: created_users[0], category: "Hatchback", make: "Volkswagen", model: "Golf", year: 2019, price_cents: 2_700_000, color: "Red", mileage: 33000, city: "Montreal", description: "Compact and sporty." },
  { user: created_users[1], category: "Sedan", make: "Hyundai", model: "Elantra", year: 2021, price_cents: 2_100_000, color: "Silver", mileage: 20000, city: "Vancouver", description: "Modern design with great fuel economy." },
  { user: created_users[2], category: "Sedan", make: "Mercedes-Benz", model: "C-Class", year: 2020, price_cents: 6_500_000, color: "Black", mileage: 18000, city: "Montreal", description: "Luxury meets performance." },
  { user: created_users[3], category: "Pickup", make: "RAM", model: "1500", year: 2022, price_cents: 5_800_000, color: "Blue", mileage: 15000, city: "Toronto", description: "Powerful and capable work truck." },
  { user: created_users[4], category: "Electric", make: "Chevrolet", model: "Bolt", year: 2023, price_cents: 3_000_000, color: "White", mileage: 10000, city: "Vancouver", description: "Great entry-level EV." },
  { user: created_users[0], category: "SUV", make: "Toyota", model: "RAV4", year: 2021, price_cents: 4_200_000, color: "Grey", mileage: 22000, city: "Montreal", description: "Reliable and spacious SUV." },
  { user: created_users[1], category: "Coupe", make: "Mazda", model: "MX-5 Miata", year: 2019, price_cents: 3_300_000, color: "Red", mileage: 28000, city: "Toronto", description: "Fun-to-drive roadster." },
  { user: created_users[2], category: "Minivan", make: "Honda", model: "Odyssey", year: 2020, price_cents: 3_600_000, color: "Silver", mileage: 40000, city: "Vancouver", description: "Spacious and family-friendly." },
  { user: created_users[3], category: "SUV", make: "Audi", model: "Q7", year: 2022, price_cents: 7_800_000, color: "Black", mileage: 12000, city: "Montreal", description: "High-tech luxury SUV." },
  { user: created_users[4], category: "Coupe", make: "Dodge", model: "Challenger", year: 2021, price_cents: 5_500_000, color: "Orange", mileage: 17000, city: "Toronto", description: "Aggressive styling with a powerful engine." }
]

car_listings.each do |listing|
  CarListing.create!(listing)
end

puts "Car listings created successfully!"

# Static Images (Multiple per Listing)
puts "Adding images..."

# Image URLs for each car listing (Can add more images directly here for any listing)
listing_images = {
  0 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasezNYUj1qED1B7iKjFg2Yw9aPTxyLfvCzUtIc",
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasg2244SNuSjpAzo8EagYryKVmJwck6G5nZBPh",
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasdS0nGzZsjQRi6zfZWMYyLAa9SDcX4wh20pbn"
  ],
  1 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasgOWEHkNuSjpAzo8EagYryKVmJwck6G5nZBPh",
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasOFsePBrDkwyWSEx3dYXHBrR941fPh8tpejm6",
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasdMjk4UZsjQRi6zfZWMYyLAa9SDcX4wh20pbn"
  ],
  2 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasTINXHE5QkRi658xYwEmJbqVATdnfZUsoXup3"
  ],
  3 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasmTMUScO21BtHjYDrqR8GhcawdIl6k73XfmNU"
  ],
  4 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasfMKbVN0ADpITXSzKUOrGfY1nmbCNHdqZeox7"
  ],
  5 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasFNKm5OpcSkOLQ3HjrsiCvpE8Yg1Jq5TxWeuA"
  ],
  6 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMas6cix3wqX1mq56gBKwEfzrd9oD4Gh2OCe0UiP"
  ],
  7 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasVQ0utXeJn81tzGdi4lTuMcRDkbq6yhg92ePf"
  ],
  8 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasSnkh4bBzNwHo5yU9xgheJpMPCqQXfTEdbZRB"
  ],
  9 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMaseMEOVv1qED1B7iKjFg2Yw9aPTxyLfvCzUtIc"
  ],
  10 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasQbwysLkY97KOD3vQXFLgZkNzICSpJ6WuoxET"
  ],
  11 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMas2uS349y70xjM4OltQJNsv6I3FbDkKfc21hyi"
  ],
  12 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMas6LW7F5qX1mq56gBKwEfzrd9oD4Gh2OCe0UiP"
  ],
  13 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasFhJ1XbpcSkOLQ3HjrsiCvpE8Yg1Jq5TxWeuA"
  ],
  14 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMas22tAFCy70xjM4OltQJNsv6I3FbDkKfc21hyi"
  ],
  15 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasFQgZi2pcSkOLQ3HjrsiCvpE8Yg1Jq5TxWeuA"
  ],
  16 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasZ2I4xHv7ULTYwvbkE23j4mo1pzdPf0cNly8S"
  ],
  17 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasHSRJV8PD9MBuYUZEVO3an6IP2NmtCeHoF0iq"
  ],
  18 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasfWEDfRr0ADpITXSzKUOrGfY1nmbCNHdqZeox"
  ],
  19 => [
    "https://pr7a1ybbux.ufs.sh/f/yMDF6NTAbMasS2E6P9BzNwHo5yU9xgheJpMPCqQXfTEdbZRB"
  ]
}

# Add images for each car listing based on the listing_images hash
listing_images.each do |index, images|
  car = CarListing.find(index + 1)  # Make sure to get the CarListing object
  images.each do |url|
    puts "Adding image for CarListing ##{car.id} with URL: #{url}"
    Image.create!(car_listing: car, url: url)
  end
end


puts "Images added successfully!"


# Static Messages (Only for the first two listings)
puts "Creating messages..."
messages = [
  Message.create!(buyer: created_users[2], seller: created_users[0], content: "Is the Toyota Corolla still available?"),
  Message.create!(buyer: created_users[3], seller: created_users[1], content: "I'm interested in the Honda Civic. Can we meet?"),
  Message.create!(buyer: created_users[4], seller: created_users[0], content: "Can you send more pictures of the Corolla?"),
  Message.create!(buyer: created_users[0], seller: created_users[1], content: "Would you accept an offer for the Civic?")
]

puts "Messages created successfully!"

puts "Seeding complete! 🚀"
