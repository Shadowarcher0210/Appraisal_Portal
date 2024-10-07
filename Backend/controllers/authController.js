const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
const forgotPassword = async (req, res) => {
  console.log("Forgot Password Endpoint Hit");

    try {
      const { email } = req.body;
  
      // Find the user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
        });
      }
  
      // Generate token
      const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
  
      // Set up nodemailer transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      // Define mail options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset your password',
        text: `http://localhost:3000/resetPassword/${user._id}/${token}`,
      };
  
      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email Error:', error);
          return res.status(500).send({
            success: false,
            message: 'Error sending reset password email',
            error
          });
        } else {
          return res.status(200).send({
            success: true,
            message: 'Password reset email sent successfully',
            token: token
          });
        }
      });
  
    } catch (error) {
      console.error('Forgot Password Error:', error);
      return res.status(500).send({
        success: false,
        message: 'Error in Forgot Password API',
        error
      });
    }
  };
  const resetPassword = async (req, res) => {
    console.log("inside reset")
    const { id, token } = req.params;
    const { password } = req.body;
    console.log("resetPassword function hit", req.params, req.body);
    console.log("resetPassword route hit", { id, token, password });   
    try {
      // Verify the token
      JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          console.log("Token verification failed:", err); // Log token error
          return res.status(401).send({
            success: false,
            message: "Invalid or expired token",
          });
        }
  
        console.log("Token decoded:", decoded); // Log decoded token
        
        // Hash the new password
        console.log("Preparing to hash the password");
        const hashedPassword = await bcrypt.hash(password, 10);
        
        console.log("Hashed Password:", hashedPassword); // Log hashed password
        
        // Update the user's password in the database
        console.log("Updating user password for user with ID:", id);
        const user = await UserModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
        
        if (!user) {
          console.log("User not found for ID:", id); // Log if user not found
          return res.status(404).send({
            success: false,
            message: "User not found",
          });
        }
  
        console.log("User password updated successfully for ID:", id); // Log if user update is successful
        
        // Successfully updated
        return res.status(200).send({
          success: true,
          message: "Password changed successfully",
        });
      });
    } catch (error) {
      console.error('Reset Password Error:', error); // Log any unexpected errors
      return res.status(500).send({
        success: false,
        message: "Error resetting password",
        error
      });
    }
  };
  
module.exports = {registerUser,loginUser,forgotPassword,resetPassword};