const express = require("express");
const router = express.Router();
const Order = require("../models/orders")

//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

//ORDER
router.post("/new", async (req,res)=>{
    console.log("body", req.body);
        const user = await Order.create({
            buyer_id: req.body.buyer_id,
            listing_id: req.body.listing_id,
            qty_reserved: req.body.qty_reserved
})
})

router.put("/:id",async (req,res)=>{
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, req.body);
    res.json(order)
})

router.delete("/:id",async (req,res)=>{
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    res.json(order) 
})

router.get("/seed", async (req, res) => {
    const order = await Order.find({}).populate('buyer_id').populate('listing_id')
    res.send(order)
    })


module.exports = router;