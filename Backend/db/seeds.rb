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
# Review.destroy_all
Message.destroy_all
CarListing.destroy_all
User.destroy_all

# Ensure Active Storage blobs are removed
ActiveStorage::Attachment.destroy_all
ActiveStorage::Blob.destroy_all

# Static Users
puts "Adding users..."

users = [
  { first_name: "John", last_name: "Doe", email: "john.doe@example.com", password: "password123", profile_picture: "user1.jpg", phone_number: "416-555-1234", location: "Toronto, ON" },
  { first_name: "Jane", last_name: "Smith", email: "jane.smith@example.com", password: "password123", profile_picture: "user2.jpg", phone_number: "604-555-5678", location: "Vancouver, BC" },
  { first_name: "Alice", last_name: "Johnson", email: "alice.johnson@example.com", password: "password123", profile_picture: "user3.jpg", phone_number: "514-555-6789", location: "Montreal, QC" },
  { first_name: "Bob", last_name: "Brown", email: "bob.brown@example.com", password: "password123", profile_picture: "user4.jpg", phone_number: "403-555-7890", location: "Calgary, AB" },
  { first_name: "Charlie", last_name: "Davis", email: "charlie.davis@example.com", password: "password123", profile_picture: "user5.jpg", phone_number: "613-555-8901", location: "Ottawa, ON" }
]

# Create users and store them in a variable for later use
created_users = users.map do |user|
  User.create!(user)
end

puts "Created users: #{created_users.map(&:id).inspect}"  # Display user IDs for debugging


puts "Users added successfully!"

# Static Car Listings
puts "Creating car listings..."
car_listings = [
  { category: "Sedan", make: "Toyota", model: "Corolla", year: 2020, price_cents: 2_000_000, color: "Blue", mileage: 30000, city: "Toronto", description: "Reliable and fuel-efficient." },
  { category: "Sedan", make: "Honda", model: "Civic", year: 2019, price_cents: 1_800_000, color: "Red", mileage: 40000, city: "Vancouver", description: "Sporty and stylish." },
  { category: "Pickup", make: "Ford", model: "F-150", year: 2021, price_cents: 4_500_000, color: "Black", mileage: 20000, city: "Toronto", description: "Powerful truck for all terrains." },
  { category: "SUV", make: "BMW", model: "X5", year: 2022, price_cents: 7_500_000, color: "White", mileage: 15000, city: "Montreal", description: "Luxury SUV with advanced features." },
  { category: "Electric", make: "Tesla", model: "Model 3", year: 2023, price_cents: 6_000_000, color: "Silver", mileage: 10000, city: "Toronto", description: "Electric car with autopilot." },
  { category: "SUV", make: "Jeep", model: "Wrangler", year: 2018, price_cents: 3_500_000, color: "Green", mileage: 60000, city: "Vancouver", description: "Off-road beast with 4x4 capability." },
  { category: "Sedan", make: "Nissan", model: "Altima", year: 2020, price_cents: 2_300_000, color: "Grey", mileage: 35000, city: "Montreal", description: "Comfortable daily driver." },
  { category: "Pickup", make: "Chevrolet", model: "Silverado", year: 2021, price_cents: 5_200_000, color: "Blue", mileage: 25000, city: "Vancouver", description: "Heavy-duty and reliable." },
  { category: "Electric", make: "Nissan", model: "Leaf", year: 2022, price_cents: 3_200_000, color: "White", mileage: 12000, city: "Toronto", description: "Affordable electric vehicle." },
  { category: "Coupe", make: "Ford", model: "Mustang", year: 2017, price_cents: 3_900_000, color: "Yellow", mileage: 50000, city: "Toronto", description: "American muscle with a V8 engine." },
  { category: "Hatchback", make: "Volkswagen", model: "Golf", year: 2019, price_cents: 2_700_000, color: "Red", mileage: 33000, city: "Montreal", description: "Compact and sporty." },
  { category: "Sedan", make: "Hyundai", model: "Elantra", year: 2021, price_cents: 2_100_000, color: "Silver", mileage: 20000, city: "Vancouver", description: "Modern design with great fuel economy." },
  { category: "Sedan", make: "Mercedes-Benz", model: "C-Class", year: 2020, price_cents: 6_500_000, color: "Black", mileage: 18000, city: "Montreal", description: "Luxury meets performance." },
  { category: "Pickup", make: "RAM", model: "1500", year: 2022, price_cents: 5_800_000, color: "Blue", mileage: 15000, city: "Toronto", description: "Powerful and capable work truck." },
  { category: "Electric", make: "Chevrolet", model: "Bolt", year: 2023, price_cents: 3_000_000, color: "White", mileage: 10000, city: "Vancouver", description: "Great entry-level EV." },
  { category: "SUV", make: "Toyota", model: "RAV4", year: 2021, price_cents: 4_200_000, color: "Grey", mileage: 22000, city: "Montreal", description: "Reliable and spacious SUV." },
  { category: "Coupe", make: "Mazda", model: "MX-5 Miata", year: 2019, price_cents: 3_300_000, color: "Red", mileage: 28000, city: "Toronto", description: "Fun-to-drive roadster." },
  { category: "Minivan", make: "Honda", model: "Odyssey", year: 2020, price_cents: 3_600_000, color: "Silver", mileage: 40000, city: "Vancouver", description: "Spacious and family-friendly." },
  { category: "SUV", make: "Audi", model: "Q7", year: 2022, price_cents: 7_800_000, color: "Black", mileage: 12000, city: "Montreal", description: "High-tech luxury SUV." },
  { category: "Coupe", make: "Dodge", model: "Challenger", year: 2021, price_cents: 5_500_000, color: "Orange", mileage: 17000, city: "Toronto", description: "Aggressive styling with a powerful engine." }
]


puts "Car listings created successfully!"

# Static Images (Multiple per Listing)
puts "Adding images..."

# Define local image files for each listing
local_images = {
  0 => ["car01_01.jpg", "car01_02.jpeg", "car01_03.webp"],
  1 => ["car02_01.jpeg", "car02_02.webp", "car02_03.avif"],
  2 => ["car03.jpg"],
  3 => ["car04.jpg"],
  4 => ["car05.jpg"],
  5 => ["car06.jpg"],
  6 => ["car07.webp"],
  7 => ["car08.jpg"],
  8 => ["car09.jpg"],
  9 => ["car10.jpg"],
  10 => ["car11.webp"],
  11 => ["car12.jpg"],
  12 => ["car13.jpg"],
  13 => ["car14.webp"],
  14 => ["car15.jpg"],
  15 => ["car16.webp"],
  16 => ["car17.jpg"],
  17 => ["car18.avif"],
  18 => ["car19.avif"],
  19 => ["car20.jpg"],

}

car_listings.each_with_index do |listing, index|
  # Dynamically assign the user based on the current index
  user = created_users[index % created_users.length]

  # Create the car listing
  car = CarListing.create!(
    user: user,  # Dynamically assigned user
    category: listing[:category],
    make: listing[:make],
    model: listing[:model],
    year: listing[:year],
    price_cents: listing[:price_cents],
    color: listing[:color],
    mileage: listing[:mileage],
    city: listing[:city],
    description: listing[:description]
  )

  # Attach images to the car listing
  if local_images[index]
    local_images[index].each do |filename|
      file_path = Rails.root.join("db/seeds/images/#{filename}")
      car.images.attach(io: File.open(file_path), filename: filename, content_type: "image/jpeg")
    end
  end
end



puts "Images added successfully!"

# Destroy existing records to avoid duplicates
Review.destroy_all

puts "Seeding reviews..."

# Expanded reviews pool
reviews_pool = [
  { content: "Spud-tacular! Great deal, very clean!", potatoes: 5 },
  { content: "A little mashed up, but good overall!", potatoes: 1 },
  { content: "Baked with kindness! Responsive and helpful throughout.", potatoes: 5 },
  { content: "A bit undercooked in response time, but great otherwise.", potatoes: 3 },
  { content: "Crispy deal! Exactly as described. Happy with my purchase.", potatoes: 4 },
  { content: "Smooth transaction. Hassle-free!", potatoes: 5 },
  { content: "Slightly fried, but seller fixed issues quickly.", potatoes: 3 },
  { content: "Excellent service—definitely worth it!", potatoes: 5 },
  { content: "Not as described, but refund was quick.", potatoes: 2 },
  { content: "Golden deal with top-tier service!", potatoes: 5 },
  { content: "A bit salty, but overall a good experience.", potatoes: 3 },
  { content: "Stellar communication and reliable product.", potatoes: 5 },
  { content: "Soft and pleasant deal, would recommend!", potatoes: 4 },
  { content: "Car was a bit peeled but mechanically sound.", potatoes: 3 },
  { content: "Great response time, would definitely buy again.", potatoes: 5 },
  { content: "Too many bumps, but resolved after negotiation.", potatoes: 2 },
  { content: "Crisp and professional!", potatoes: 5 },
  { content: "Loved the baked-in extras!", potatoes: 4 },
  { content: "Minor hiccups but overall worth it.", potatoes: 3 },
  { content: "A golden potato of a deal!", potatoes: 5 },
  { content: "Could use better communication next time.", potatoes: 2 },
  { content: "Roasted smoothly, came out perfect.", potatoes: 4 },
  { content: "Good deal, but the delivery was a bit delayed.", potatoes: 3 },
  { content: "Perfect condition! Highly recommend.", potatoes: 5 },
  { content: "Just a tad burnt on arrival, but resolved.", potatoes: 3 }
]

# Shuffle reviews
shuffled_reviews = reviews_pool.shuffle

# Track the index of the next review to assign
review_index = 0

created_users.each do |user|
  5.times do
    # Wrap around to the beginning of the shuffled reviews if necessary
    if review_index >= shuffled_reviews.length
      review_index = 0
    end

    # Assign review and increment the index
    Review.create!(
      user: user,
      content: shuffled_reviews[review_index][:content],
      potatoes: shuffled_reviews[review_index][:potatoes]
    )

    review_index += 1
  end
end

puts "Reviews seeded successfully!"


# Static Messages (Only for the first two listings)
#puts "Creating messages..."
#messages = [
  #Message.create!(buyer: created_users[2], seller: created_users[0], content: "Is the Toyota Corolla still available?"),
  #Message.create!(buyer: created_users[3], seller: created_users[1], content: "I'm interested in the Honda Civic. Can we meet?"),
  #Message.create!(buyer: created_users[4], seller: created_users[0], content: "Can you send more pictures of the Corolla?"),
  #Message.create!(buyer: created_users[0], seller: created_users[1], content: "Would you accept an offer for the Civic?")
#]

#puts "Messages created successfully!"

puts "Seeding complete!🍋🍋🍋🍋🍋🍋"
