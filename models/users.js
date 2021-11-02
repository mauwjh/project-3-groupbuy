const { Schema, model } = require("mongoose");

const userSchema = Schema({
    usertype: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    payment_details: { type: String, required: true },
    business_name: { type: String, required: true },
    website: { type: String, required: true },
    contact_number: { type: Number, required: true },
    profile_img: String,
    rating: String,
    },
    { timestamps: true }
    )

    const User = model("User",userSchema)
    module.exports = User;


    //Usertype: "buyer"/"seller"
    //For a buyer/seller, empty fields will be updated to "Nil"