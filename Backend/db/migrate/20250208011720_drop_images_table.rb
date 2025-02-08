class DropImagesTable < ActiveRecord::Migration[7.0]
  def up
    drop_table :images
  end

  def down
    create_table :images do |t|
      t.references :car_listing, null: false, foreign_key: true
      t.string :url
      t.timestamps
    end
  end
end
