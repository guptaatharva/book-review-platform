const express = require('express');
const verifyToken = express.Router('../middlewares/auth');
const router = express.Router;

router.post('./review', verifyToken, (req,res)=>{
    const {bookId,reviewText,rating} = req.body;
    res.status(200).json({message: 'Review submitted successfully'});
});
module.exports = router;