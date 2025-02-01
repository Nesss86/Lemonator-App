class CreateCarListings < ActiveRecord::Migration[8.0]
  def change
    create_table :car_listings do |t|
      t.references :user, null: false, foreign_key: true
      t.string :category
      t.string :make
      t.string :model
      t.integer :year
      t.integer :price_cents
      t.string :color
      t.integer :mileage
      t.string :city
      t.text :description

      t.timestamps
    end
  end
end
