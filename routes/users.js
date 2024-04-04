const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
    try {
        const data = await User.find();
        console.log("Data has been Fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Ineternal server error' });
    }

})

router.delete("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete({ _id: req.params.id });
            res.status(200).json("Account has been deleted");
        }
        catch (err) {
            return res.status(403).json(err)
        }
    }
    else {
        console.log("User not Found")
    }

});


router.get("/:workType", async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'Student' || workType == 'Eng' || workType == 'Dr') {
            const response = await User.find({ work: workType });
            console.log("Data Fetched");
            res.status(200).json(response);
        } else {
            res.status(500).json("data not Found");
        }
    } catch (err) {
        res.status(200).json({ err: 'Invalid work type' });
    }
});


router.put("/:id", async (req, res) => {

    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
              const salt=await bcrypt.genSalt(10);
              req.body.password=await bcrypt.hash(req.body.password, salt)
            
            }
            catch (err) {
                return res.status(403).json(err)
            }
        }
        try{
            const user=await User.findByIdAndUpdate(req.params.id,{$set:req.body,});   
            res.status(200).json("Account has been Updated");
         }
         catch(err)
         {
            res.status(200).json({ err: 'Invalid ' });
         }
    }
    else {
        console.log("User not Found")
    }

});
module.exports = router;