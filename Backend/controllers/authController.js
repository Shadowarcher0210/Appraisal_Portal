const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        const { empName, email, password, designation, gender, empType } = req.body;

        // Validation
        if (!empName || !email || !password || !designation || !gender || !empType) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields',
            });
        }

        // Check if the user already exists
        const existing = await UserModel.findOne({ email });
        if (existing) {
            return res.status(500).send({
                success: false,
                message: 'Email already registered, please login',
            });
        }

        // Hashing the password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await UserModel.create({
            empName,
            email,
            password: hashedPassword,
            designation,
            gender,
            empType,
        });

        res.status(201).send({
            success: true,
            message: 'Successfully registered',
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
        //message: 'Error in Register API',
            error,
        });
    }
};

const loginUser = async(req,res)=>{
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
           expiresIn : "2d",
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

module.exports = {registerUser,loginUser};