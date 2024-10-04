const mongose = require('mongoose');

const userSchema = new mongose.Schema(
    {
        empName:{
            type:String,
            require:[true,'user name is required'],
        },
        email:{
            type:String,
            require:[true,'email is required'],
        },
        password:{
            type:String,
            required:[true,'password is required'],
        },
        designation:{
          type:String,
          required:[true,'Designation is required'],
        },
        gender:{
          type:String,
          require:[true,'gender is required'],
        },
        empType:{
          type:String,
          require:[true,'user type is required'],
          default:'Employee',
          enum:['HR','Manager','Employee'],
        },
        profile:{
          type:String,
          default:'https://img.freepik.com/free-icon/user_318-522233.jpg',
        }
},{timestamps:true})

module.exports = mongose.model('user',userSchema)