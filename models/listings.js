const { Schema, model } = require("mongoose");

const listingSchema = Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    start_date: { type: String, required: true },
    closing_date: { type: String, required: true },
    price_per_unit: { type: String, min: 0, required: true },
    min_quantity: { type: String, min: 1, required: true },
    max_quantity: { type: String, min: 1, required: true },
    img: { type: String, required: true },
    seller_id : [{ type: Schema.Types.ObjectId, ref: 'User'}],
    likes: Number
    },
    { timestamps: true }
    )

    const Listing = model("Listing",listingSchema)
    module.exports = Listing;
