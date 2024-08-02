const jwt = require("jsonwebtoken");

const auth = (req,res,next)=> {                                                     // NEXT IS USED TO EXECUTE THE NEXT MIDDLEWARE TO BE EXECUTED
    // const token = req.header('Authorization').replace("Bearer"," ")              //BEARER IS USED TO SECURE HTTP PROTOCOLS  
    const token = req.header("Authorization").split(" ")[1];                        //SPLITTING THE TOKEN 
    if(!token) {
        res.status(401).json({error: "Token is required"});
    }
    try{
        const decoded = jwt.verify(token,"secret_key");
        req.user = decoded;                                               //PAYLOAD USER ID
        next(); 
    }
    catch(err){
        res.status(401).json({error: "Invalid Token",error : err.message})
    }
}

module.exports = auth;