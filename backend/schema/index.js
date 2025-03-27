const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
    uname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    images: [{
        url: { type: String, required: true }, 
        chainId: { type: String, required: true } 
    }]
});
const User=mongoose.model('USER',userSchema);
module.exports=User;