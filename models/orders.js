const { Schema, model } = require("mongoose");

const orderSchema = Schema({
    buyer_id : [{ type: Schema.Types.ObjectId, ref: 'User'}],
    listing_id : [{ type: Schema.Types.ObjectId, ref: 'Listing'}],
    qty_reserved: { type: Number, min: 1, required: true },
    },
    { timestamps: true }
    )

    const Order = model("Order",orderSchema)
    module.exports = Order;
