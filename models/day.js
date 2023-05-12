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
    sleepRating: {
      type: Number,
    },
  },
  { timestamps: true }
)

const mealSchema = new Schema(
  {
    waterIntake: {
      type: String,
    },
    breakfast: {
      type: String,
    },
    lunch: {
      type: String,
    },
    dinner: {
      type: String,
    },
    snacks: {
      type: String,
    },
  },
  { timestamps: true }
)

const daySchema = new Schema(
  // name: String,
  // {
  //   rating: {
  //     type: Number,
  //     required: true,
  //   },
  //   date: {
  //     type: Date,
  //     required: true,
  //   },
  //   owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
  //   notes: [noteSchema],
  //   sleep: [sleepSchema],
  //   meal: [mealSchema],
  // },
  // { timestamps: true }
)

const Day = mongoose.model('Day', daySchema)

export { Day }