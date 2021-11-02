const express = require("express");
const router = express.Router();
const Order = require("../models/orders")

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//ORDER

//Order "order/new ---> Create an Order and Display Order if already participated
//!Need Buyer ID and Listing ID 

router.post("/new", async (req,res)=>{
    console.log("body", req.body);
        const user = await Order.create({
            buyer_id: req.body.buyer_id,
            listing_id: req.body.listing_id,
            qty_reserved: req.body.qty_reserved
})
})

//Order "order/:id/edit" ---> Editing existing Order from buyer 

router.put("/:id/edit",async (req,res)=>{
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body);
    res.json(order)
})

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

// router.get("/seed", async (req, res) => {
//   const order = new Order(
    // {
    //     buyer_id: "617e4f11fc00432262a43213",
    //     listing_id: "617e966a68a2749673da2e86",
    //     qty_reserved: 4
    // }
    // {
    //     buyer_id: "617e4fa33035b33c29ecf990",
    //     listing_id: "617e9671a0616e10d7271c9b",
    //     qty_reserved: 3
    // }
    // {
    //     buyer_id: "617e4fdead29738dfba78a0b",
    //     listing_id: "617e9693e6a186500da2fdec",
    //     qty_reserved: 8
    // }
//   );
//   await order.save();
//   res.send(order);
// });

router.get("/seed", async (req, res) => {
    const order = await Order.find({}).populate('buyer_id').populate('listing_id')
    res.send(order)
    })


module.exports = router;