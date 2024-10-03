//Get user info
const GetUserController = async(req,res) => {
   res.status(200).send("User Data");
};
module.exports = {GetUserController};