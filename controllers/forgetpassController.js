import User from "../models/user.js";
import nodemailer from "nodemailer";
import bcrypt from 'bcryptjs';
import randomstring from "randomstring";
function validatePassword(password)
{
  const uppercasePattern = /[A-Z]/;
  const digitPattern = /[0-9]/;
  const pattern = /[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E$#&().|\\[\]{}]/;
// Characters:  ! to /, : to @, [ to `, { to ~, $, #, &, (, ), |, \, ], }

  return uppercasePattern.test(password) && digitPattern.test(password) && pattern.test(password);
}

const forgetpassController = {
    forgetpass: async (req, res) => {
        try {
            const { email } = req.body;
            const userData = await User.findOne({ email });

            if (userData) {
                if (!userData.verified) {
                    return res.render('forgetpassword', { errors: 'Please verify your email!', user: req.session.user === undefined ? "" : req.session.user });
                } else {
                    const randomString = randomstring.generate();
                    const updateData = await User.updateOne({ email }, { $set: { token: randomString } });
                    forgetpassController.sendResetpasswordMail(userData.firstName, userData.lastName, userData.email, randomString);
                    return res.render('forgetpassword', { errors: 'Please check your email to reset your password :)', user: req.session.user === undefined ? "" : req.session.user });
                }
            } else {
                return res.render('forgetpassword', { errors: 'Invalid email. Please try again!', user: req.session.user === undefined ? "" : req.session.user });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    },

    sendResetpasswordMail: async (name, lname, email, token) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'projectfrntr@gmail.com', // Sender Email
                    pass: 'szuzlstihutpziej', 
                },
            });

            const mailOptions = {
                from: 'projectfrntr@gmail.com',
                to: email,
                subject: 'Reset Password',
                text: `Hello ${name} ${lname},\n\nPlease reset your password by clicking the following link: \n\nhttp://frntr.store/auth/forget-password/${token}`,
            };

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.error('Error sending reset password email:', error);
                } else {
                    console.log('Reset password email sent successfully!');
                }
            });
        } catch (error) {
            console.log(error);
        }
    },

    forgetPasswordLoad:async(req,res)=>{
try{
const {token} = req.params;
console.log(token);
const tokenData= await User.findOne({token});
const errors = '';
console.log(tokenData)
if(tokenData){
    res.render('newpassword',{errors,user_id:tokenData,user:req.session.user===undefined?"":req.session.user});
}else{
res.render('404',{ user: req.session.user === undefined ? "" : req.session.user });
}
}catch(error){
console.log(error);
}

    },

    resetpassword:async(req,res)=>{

      try{
        const {password,user_id,confirmpass} = req.body;
        const saltRounds=10;
       
        if (password === "") {
           return res.render('newpassword',{errors:"You must enter a password!",user_id,user:req.session.user===undefined?"":req.session.user}); 
          } else if (password.length < 8) {
            return res.render('newpassword',{errors:"Password must be at least 8 characters!",user_id,user:req.session.user===undefined?"":req.session.user});  
          } else if (!validatePassword(password))
          {
            return res.render('newpassword',{errors: "Password must contain at least one number, one special character, and one uppercase letter!",user_id,user:req.session.user===undefined?"":req.session.user}); 
          }
        
          if (password !== confirmpass) {
            return  res.render('newpassword',{errors: "Password does not match!",user_id,user:req.session.user===undefined?"":req.session.user}); 
          }
        
        const hashedPassword = await bcrypt.hash(password, saltRounds);
       const updatedData = await User.findByIdAndUpdate({_id:user_id},{ $set:{password:hashedPassword , token:''}});
       console.log(updatedData);
       res.redirect("/auth/login");

      }
      catch(error){
        console.log(error)
      }

    }
};

export default forgetpassController;
