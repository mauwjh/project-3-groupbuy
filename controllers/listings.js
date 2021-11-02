const express = require("express");
const router = express.Router();
const Listing = require("../models/listings");
const Order = require("../models/orders");
const { route } = require("./users");

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//HOME
//Home "/" ---> Display Random Listings

router.get("/", async (req, res) => {
  const listing = await Listing.find();
  res.json(listing);
});

//!Tested
//!How do I make it random?

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//LISTING
//Listing "listing/:id" ---> Display Specific Listing (No-Login)

router.get("/:id", async (req,res)=>{
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const order = await Order.find({}).populate('buyer_id').populate('listing_id').find({ _id: "617e98d3b21b23d9f022633f"})
    res.json({listing,order})
})

//Listing "listing/:id" ---> Display Specific Listing for Seller
//!Seller sees all the orders?

// router.get("/:id", async (req,res)=>{
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
//     const order = await Order.find({ "listing_id._id": id })
//     res.json({listing, order})
// })

//Listing "listing/:id" ---> Display Specific Listing for Buyer
//!Buyer see existing order?

// router.get("/:id", async (req,res)=>{
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
//     const order = await Order.find({ "listing_id._id": id })
//     res.json({listing, order})
// })

//Listing "listing/new" ---> Create New Listing
//!How do I get the seller_id from listing/new? 

router.post("/new", async (req,res)=>{
    console.log("body", req.body);
        const user = await Listing.create({
            name: req.body.name,
            description: req.body.description,
            start_date: req.body.start_date,
            closing_date: req.body.closing_date,
            price_per_unit: req.body.price_per_unit,
            min_quantity: req.body.min_quantity,
            max_quantity: req.body.max_quantity,
            img: req.body.img,
            seller_id: req.body.seller_id,
    })
})


//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// router.get("/seed", async (req, res) => {

// const pie = new Listing(
// {
//   name: "Best Pie in Singapore!",
//   description:
//     "This pie is filled with Japanese Apple sourced from Mount Fuji and plucked at the best season in Winter. Try it now!",
//   start_date: 2021 - 10 - 20,
//   closing_date: 2021 - 11 - 20,
//   price_per_unit: 15,
//   min_quantity: 5,
//   max_quantity: 20,
//   img: "Nil",
//   seller_id: "617e47e6ef60be661fd84040",
// };
// await pie.save();

// const prata = new Listing (
// {
//   name: "Prata Madness",
//   description:
//     "Feast on this one of kind prata. Mixed with chocolate, truffles and a drop of secret flavoring, this prata will blow your mind.",
//   start_date: 2021 - 11 - 10,
//   closing_date: 2021 - 11 - 30,
//   price_per_unit: 4,
//   min_quantity: 40,
//   max_quantity: 100,
//   img: "Nil",
//   seller_id: "617e4c52e1d6366d5e4fac4b",
// };
// await prata.save();

// const cookie = new Listing(
    //     {
//       name: "Choco Coco Cookies",
//       description:
//         "Simple triple chocolate cookies that are homebaked. Crispy on the inside and Soft on the outside!",
//       start_date: 2021 - 10 - 22,
//       closing_date: 2021 - 11 - 7,
//       price_per_unit: 1,
//       min_quantity: 50,
//       max_quantity: 70,
//       img: "Nil",
//       seller_id: "617e4ca14186691ac3049fe6",
//     };
// await cookie.save();
// });

// router.get("/seed", async (req, res) => {
//     const listing = await Listing.findby({}).populate('seller_id')
//     res.send(listing)
//     })




module.exports = router;
