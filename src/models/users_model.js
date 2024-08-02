const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    userName : { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique:true, },
    password: { type: String, required: true, trim: true, minlength: 8, },
    confirmPassword: { type: String, required: true, trim: true, minlength: 8, },
    phoneNumber: { type: String, required: true, unique:true, trim: true },
    age: { type: String, required: true, trim: true, min : 18 },
    gender: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    isActive: { type: Boolean, trim: true , default : true},
    isDeleted: { type: Boolean, trim: true, default : false },
}, { timestamps: true })


userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      try {
        const hashPassword = await bcrypt.hash(this.password, 10);
        const hashConfirmPassword = await bcrypt.hash(this.confirmPassword, 10);
        this.password = hashPassword;
        this.confirmPassword = hashConfirmPassword;
        next();
      } catch (error) {
        return next(error);
      }
    } else {
      next();
    }
  });

userSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}

module.exports = mongoose.model('users', userSchema);