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

ActiveRecord::Schema[8.0].define(version: 2025_02_10_231223) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

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

  create_table "reviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.text "content"
    t.integer "potatoes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_reviews_on_user_id"
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

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "car_listings", "users"
  add_foreign_key "messages", "conversations", on_delete: :cascade
  add_foreign_key "messages", "users", column: "buyer_id"
  add_foreign_key "messages", "users", column: "seller_id"
  add_foreign_key "reviews", "users"
end
