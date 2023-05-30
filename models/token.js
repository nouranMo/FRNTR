import mongoose from "mongoose";

const verificationTokenSchema = new mongoose.Schema({
userId: {
type:mongoose.Schema.Types.ObjectId, ref: 'User' 
},
token:{
    type:String
}
});

const VerificationToken = mongoose.model('VerificationToken',verificationTokenSchema);

export default VerificationToken;