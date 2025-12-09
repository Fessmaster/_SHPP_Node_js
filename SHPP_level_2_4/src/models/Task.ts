import mongoose, {Schema, Document, Types} from "mongoose"

export interface ITask extends Document {
  text: string,
  checked: boolean,
  user: Types.ObjectId | string
}

const TaskSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  }, {
    // Сериалізація: доємо віртуальне поле id, та прибираємо непотрібен поле __v
    toJSON:{
      virtuals: true,
      versionKey: false,      
    }
  }
)

export default mongoose.model<ITask>('Task', TaskSchema)