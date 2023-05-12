import mongoose from 'mongoose'

const Schema = mongoose.Schema

const noteSchema = new Schema(
  {
    text: {
      type: String,
    },
  },
  { timestamps: true }
)

const sleepSchema = new Schema(
  {
    totalSleep: {
      type: Number,
      required: true
    },
    sleepRating: Number
  },
  { timestamps: true }
)

const mealSchema = new Schema(
  {
    waterIntake: String,
    breakfast: String,
    lunch: String,
    dinner: String,
    snacks: String,
  },
  { timestamps: true }
)

const exerciseSchema = new Schema(
  {
    timeSpent: Number,
    typeOfExercise: String
  },
  { timestamps: true }
)

const daySchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
    notes: [noteSchema],
    sleep: [sleepSchema],
    meal: [mealSchema],
    exercise: [exerciseSchema]
  },
  { timestamps: true }
)

const Day = mongoose.model('Day', daySchema)

export { Day }