
const UserModel = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const JWT = require('jsonwebtoken');
const nodemailer = require('nodemailer'); 

// Register
const RegisterController = async (req, res) => {
  try {
    const { Name, email, password, designation, department, band, gender } = req.body;

    // Validation
    if (!Name || !email || !password || !designation || !department || !band || !gender) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields'
      });
    }

    // Check user
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: 'Email already registered. Please login'
      });
    }

    // Hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new User
    const user = await UserModel.create({
      Name,
      email,
      password: hashedPassword,
      designation,
      department,
      band,
      gender
    });

    return res.status(201).send({
      success: true,
      message: 'Successfully registered',
      user,
    });

  } catch (error) {
    console.error('Register Error:', error);
    return res.status(500).send({
      success: false,
      message: 'Error in Register API',
      error
    });
  }
};

// Login
const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: 'Please provide Email and Password'
      });
    }

    // Check user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    user.password = undefined; // Remove password from the response
    return res.status(200).send({
      success: true,
      message: 'Login successfully',
      token,
      user,
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).send({
      success: false,
      message: 'Error in Login API',
      error
    });
  }
};

// Forgot Password
const ForgotPasswordController = async (req, res) => {
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
 const ResetPasswordController = async (req,res) => {
    const {id, token} = req.params
    const {password} = req.body
    JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            return res.status(401).send({
                success:false,
                message:"Error with token",
            });
        } else{
           bycript.hash(password, 10)
           .then(hash =>{
            UserModel.findByIdAndUpdate({_id:id}, {password:hash})
            .then(u => res.status(200).send({
                success: true,
                message: 'successsfully Password changed',
             
              }))
              .catch(error=>res.status(500).send({
                success: false,
                message: 'Error to reset the Password ',
                error
              }))
           })
           .catch(error=>res.status(500).send({
            success: false,
            message: 'Error to reset the Password ',
            error
          }))

        }
    });
    
 }

module.exports = { RegisterController, LoginController, ForgotPasswordController,ResetPasswordController };


