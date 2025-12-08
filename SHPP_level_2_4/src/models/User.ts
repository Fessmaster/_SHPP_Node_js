import mongoose, { Schema, Document} from "mongoose"
import bcrypt from "bcrypt"

export interface IUser extends Document {
  login: string,
  password: string,
  isPasswordCorrect(pass: string): Promise<boolean>
}

const UserSchema = new Schema(
  {
    login: {
      type: String,
      require: [true, "Логін є обов'язковим"],      
      minlength: [2, "Логін не має бути коротшим за два символи"]
    },
    password: {
      type: String,
      require: [true, "Пароль э обов'язковим"],
      minlength: [6, "Довжина паралю має бути не меншою за шість символів"]
    }  
  },
  {
    timestamps: true,
  }  
);

UserSchema.pre<IUser>('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password as string, salt)
})

UserSchema.methods.isPasswordCorrect = async function (pass:string) {
  const isMatch = await bcrypt.compare(pass, this.password as string)
  return isMatch
};

export default mongoose.model<IUser>('User', UserSchema)