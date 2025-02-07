# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_02_07_165928) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "car_listings", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "category"
    t.string "make"
    t.string "model"
    t.integer "year"
    t.integer "price_cents"
    t.string "color"
    t.integer "mileage"
    t.string "city"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_car_listings_on_user_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.string "subject"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "buyer_id"
    t.integer "seller_id"
  end

  create_table "images", force: :cascade do |t|
    t.bigint "car_listing_id", null: false
    t.text "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_listing_id"], name: "index_images_on_car_listing_id"
  end

  create_table "messages", force: :cascade do |t|
    t.bigint "buyer_id", null: false
    t.bigint "seller_id", null: false
    t.text "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "read_status", default: false, null: false
    t.integer "conversation_id", null: false
    t.index ["buyer_id"], name: "index_messages_on_buyer_id"
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
    t.index ["seller_id"], name: "index_messages_on_seller_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "profile_picture"
    t.string "phone_number"
    t.string "location"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "car_listings", "users"
  add_foreign_key "images", "car_listings"
  add_foreign_key "messages", "conversations", on_delete: :cascade
  add_foreign_key "messages", "users", column: "buyer_id"
  add_foreign_key "messages", "users", column: "seller_id"
end
