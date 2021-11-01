const { Schema, model } = require("mongoose");

const listingSchema = Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    start_date: { type: Date, required: true },
    closing_date: { type: Date, required: true },
    price_per_unit: { type: Number, min: 0, required: true },
    min_quantity: { type: Number, min: 1, required: true },
    max_quantity: { type: Number, min: 1, required: true },
    img: { type: String, required: true },
    seller_id : [{ type: Schema.Types.ObjectId, ref: 'User'}],
    likes: Number
    },
    { timestamps: true }
    )

    const Listing = model("Listing",listingSchema)
    module.exports = Listing;
