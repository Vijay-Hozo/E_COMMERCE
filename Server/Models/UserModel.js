const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
    {
        username : {
            type: String,
            required: true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }
    }
)

//HASHING PASSWORD
UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    else{
        const salt = await bcrypt.genSalt(10);     //SALT IS USED TO HASH THE PASS AND ALSO USED TO PROTECT THE PASSWORD FROM ATTACKERS
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }
})

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
