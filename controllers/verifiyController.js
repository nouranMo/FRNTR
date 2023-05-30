// loginController.js
import bcrypt from "bcryptjs"
import User from "../models/user.js";
import VerificationToken from "../models/token.js";
import nodemailer from "nodemailer";
// Set up Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'nnouranmohamed19@gmail.com', // Replace with your Gmail email address
      pass: 'lfbaljyywdgfzouh', // Replace with your Gmail password
    },
  });
const verifiyController = {}; 

verifiyController.verifiy = async(req, res) => {
  console.log("verifiy request received");

  const { email, pass } = req.body;



  try {
    // Find the user in the database by email
    const result= await User.findOne({email});

        if (!result) {
          // User not found, display error message
          return res.render("verifiy", { errors: "Invalid email or password" , message:''});
        }
       // Comparing the entered password with the hashed one.
        const isPasValid= await bcrypt.compare(pass,result.password);

            if (!isPasValid) {

              // Password does not match, display error message
              console.log("error");
              // return res.status(401).json({ error: "Invalid  password" });


              return res.render("verifiy", { errors: "Invalid email or password" , message:''});
            }
           
            //  const emailSession=req.session.person;
            //  if(emailSession.email!=email){
            //     return res.render("verifiy", { errors: "Doest match email that you have been Resgisted " , message:''});
            //  }

       const token=new VerificationToken({userId:result._id,token:Math.random().toString(36).slice(-8)});
       await token.save();

       const mailOptions = {
        from: 'nnouranmohamed19@gmail.com',
        to: result.email,
        subject: 'Email Verification',
        text: `Hello ${result.firstName} ${result.lastName},\n\nPlease verify your email by clicking the following link: \n\nhttp://localhost:4040/auth/verify/${token.token}`,
       }

       transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.error('Error sending verification email:', error);
          res.status(500).send('Error sending verification email');
        } else {
          res.render("verifiy",{errors:'',message:'Please check your email to verify your account'});
        }
      });
          }
  catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

 verifiyController.active = (req, res) => {
    const { token } = req.params;
  
    // Find the verification token in the database
    VerificationToken.findOne({ token })
      .then((verificationToken) => {
        if (!verificationToken) {
          res.status(400).send('Invalid token');
          return;
        }
  
        // Find the user associated with the verification token
        User.findById(verificationToken.userId)
          .then((user) => {
            if (!user) {
              res.status(400).send('User not found');
              return;
            }
  
            // Mark the user as verified
            user.verified = true;
            user.save()
              .then(() => {
                res.redirect('/auth/login');
              })
              .catch((error) => {
                console.error('Error saving user:', error);
                res.status(500).send('Error saving user');
              });
          })
          .catch((error) => {
            console.error('Error finding user:', error);
            res.status(500).send('Error finding user');
          });
      })
      .catch((error) => {
        console.error('Error finding verification token:', error);
        res.status(500).send('Error finding verification token');
      });
  }; 



export default verifiyController;