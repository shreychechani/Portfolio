import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: {
      type:      String,                         
      required:  [true, 'Name is required'],    
      trim:      true,                           
      minlength: [2,   'Name too short'],
      maxlength: [100, 'Name too long'],
    },

    email: {
      type:      String,
      required:  [true, 'Email is required'],
      trim:      true,
      lowercase: true,                          
      match: [
        /^\S+@\S+\.\S+$/,
        'Please enter a valid email address',
      ],
    },

    message: {
      type:      String,
      required:  [true, 'Message is required'],
      trim:      true,
      minlength: [1, 'Message must be at least 1 character'],
      maxlength: [2000, 'Message too long (max 2000 chars)'],
    },

    status: {
      type:    String,
      enum:    ['new', 'read', 'replied'],  
      default: 'new',                        
    },

    ipAddress: {
      type:    String,
      default: '',
    },
  },

 
  {
    timestamps: true,
  }
)

export default mongoose.model('Contact', contactSchema)