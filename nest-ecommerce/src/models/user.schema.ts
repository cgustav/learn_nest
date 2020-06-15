import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  seller: {
    type: Boolean,
    default: false,
  },
  address: {
    addr1: String,
    addr2: String,
    city: String,
    state: String,
    country: String,
    zip: Number,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  console.log('excecuting pre save');
  try {
    if (!this.isModified('password')) return next();

    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (error) {
    return next(error);
  }
});
