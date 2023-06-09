import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
    
  },
  address2: {
    type: String,
    required: false,
  
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    default: 'client'
  },
  verified: {
    type:Boolean,
    default:false
  },

  token:{
    type:String,
    default:''
  },
  review:{
    type:[String],
    default:''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

export default User;
;