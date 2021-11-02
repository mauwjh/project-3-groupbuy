const express = require("express");
const router = express.Router();
const User = require("../models/users")
const Listing = require("../models/listings")
const Order = require("../models/orders")
const bcrypt = require("bcrypt")
const session = require("express-session")

const methodOverride = require("method-override");
router.use(methodOverride("_method"));

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//LOGIN
//Login "login" ---> Login for existing Buyer/Seller

// router.get("/",(req,res)=>{
//     console.log("body1",req.body)
//     console.log("params1",req.params)
//     res.json(req.body)
// })

router.post("/", async (req,res)=>{
    console.log("body2",req.body)
    const { email, password } = req.body
    const user = await User.findOne({ email })
    
    if(user) {
        if (password === user.password) {
            const { password, ...rest } = user;
            const userInfo = Object.assign({},{...rest})
            req.session.user = userInfo;
            res.json({
                message: "Login Successful!",
                userInfo
            });
        }
        else {
            res.send("WRONG PASSWORD BODOH")
        }
    }
    else if(!user) {
         res.send("USER NOT FOUND")
    }




// if (passwordValid) {
//     const { password, ...rest } = user;
//     const userInfo = Object.assign({}, {...rest});
//     req.session.user = userInfo;

//     res.json({
//         message: "Authentication Successful!",
//         token,
//         userInfo,
//         expiresAt
//     });
// }

})

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//SIGNUP
//Signup "signup/seller" ---> Create new user for Seller 

router.post("/seller", async (req,res)=>{
    console.log("body", req.body);
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    const user = await User.create({
        usertype: "seller",
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        payment_details: req.body.payment_details,
        business_name: req.body.business_name,
        website: req.body.website,
        contact_number: req.body.contact_number,
    })
    res.json(user);
})

//Signup "signup/buyer" ---> Create new user for Buyer 

router.post("/buyer", async (req,res)=>{
    console.log("body", req.body);
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    const user = await User.create({
        usertype: "buyer",
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        payment_details: req.body.payment_details,
        business_name: "Nil",
        website: "Nil",
        contact_number: "Nil",
    })
    res.json(user)
})

//!After creating user, redirect him to home page or create new listing? 

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//USER

//User "user/:id" --> Display User's Profile
//With Populate, user should have all the orders and listings related to this user id. 

// router.get("/:id",async (req,res)=>{
//     const { id } = req.params;
//     const user = User.findById(id)
//     res.json(user)
// })

//User "user/:id/edit" ---> Edit User's Profile 

// router.put("/:id/edit",async (req,res)=>{
//     const { id } = req.params;
//     const user = await User.findByIdAndUpdate( id , req.body )
//     res.json(user)
// })


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//USER

//User "user/:id" ---> Display Seller's Listings  

// router.get("/:id",async (req,res)=>{
//     const { id } = req.params;
//     const listing = await Listing.find({ "seller_id._id": id })
//     res.json(listing)
// })

//User "user/:id" --> Display Orders on Seller's Listings 
//! Same page or seperate page? 

//User "user/:id" --> Display Buyer's Orders (Shift to Orders.js)

// router.get("/:id",async (req,res)=>{
//     const { id } = req.params;
//     const order = await Order.find({"buyer_id._id": id })
//     res.json(order)
// })


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// router.get("/seed", async (req,res)=>{
//     const user = new User({
//         usertype: "seller",
//         username: "thelocalmamashop",
//         password: "helloworld",
//         name: "James",
//         email: "sales@mamashop.com.sg",
//         address: "Block 100 Clementi Avenue 8, #10-100",
//         payment_details: 4444-4444-4444-4444,
//         business_name: "The Local Mama Shop",
//         website: "www.mamashop.com.sg",
//         contact_number: 87654321,
//         img: "https://i.ibb.co/4TzPvdZ/Mamashop.jpg"
//         });
//     await user.save();

//     res.send(user)
// })



module.exports = router;