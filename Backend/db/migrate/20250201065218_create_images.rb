class CreateImages < ActiveRecord::Migration[8.0]
  def change
    create_table :images do |t|
      t.references :car_listing, null: false, foreign_key: true
      t.text :url

      t.timestamps
    end
  end
end
