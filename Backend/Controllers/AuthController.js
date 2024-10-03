const UserModel = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');


//Register
const   RegisterController=async(req,res)=>{
    try {
        const {Name,email,password,designation,department,band,gender}=req.body

       //validation
        if(!Name || !email || !password || !designation || !department  || !band || !gender){
            return res.status(500).send({
                success:false,
                message:'please provide all fields'
            })
        }
        
        //check user
        const existing = await UserModel.findOne({email})//query to find the particular data 
        if(existing){
          return res.status(500).send({
            success:false,
            message:'Email ALreday registers please login'
          })  
        }

        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashdPassword = await bcrypt.hash(password,salt)

        //create new User
        const user = await UserModel.create({
            Name,
            email,
            password: hashdPassword,
            designation,
            department,
            band,
            gender
        })//query to create the data
            res.status(201).send({
            success:true,
            message:'successfully Registerd',
            user,
            })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Register API',
            error
        })
        
    }

};

//login
const LoginController = async(req,res)=>{
    try {

        const{email,password}=req.body
        //validation
        if(!email || !password){
            return req.status(500).send({
                success:false,
                message:'Please provide Email or Password'
            })
        }

        //check user
        const user = await UserModel.findOne({email})
        console.log(user)
        if(!user){
           return res.status(404).send({
            success:false,
            message:'User Not found ',
           }) 
        }

        //Check uset password | comparae password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).send({
                success:false,
                message:'Invalid Credentials'
            })
        }

        //token
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
           expiresIn : "7d",
        })
        user.password = undefined;
        res.status(200).send({
            success:true,
            message:'Login Successfully',
            token,
            user,
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In Login API',
            error
        })
        
    }
}

module.exports = {RegisterController,LoginController};




