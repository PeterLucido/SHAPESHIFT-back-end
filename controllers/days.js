import { Profile } from "../models/profile.js"
import { Day } from "../models/day.js"

async function index(req, res) {
  try {
    const profileId = req.user.profile._id
    const day = await Day.find({ owner: profileId })
    .populate('date')
    res.status(200).json(day)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function create(req, res) {
  try {
    req.body.owner = req.user.profile
    const day = await Day.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { days: day } },
      { new: true }
    )
    day.owner = profile
    console.log(day)
    res.status(201).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    .populate('date', 'sleep', 'meal', 'exercise', 'notes')
    res.status(200).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const day = await Day.findByIdAndUpdate(
      req.params.dayId,
      req.body,
      { new: true }
    ).populate('date', 'sleep', 'meal', 'exercise', 'notes')
    res.status(200).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteDay(req, res) {
  try {
    const day = await Day.findByIdAndDelete(req.params.dayId)
    const profile = await Profile.findById(req.user.profile)
    profile.days.remove({ _id: day._id })
    await profile.save()
    res.status(200).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createNote (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    day.notes.push(req.body)
    await day.save()
    res.status(201).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createSleep (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    day.sleep.push(req.body)
    await day.save()
    res.status(201).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createMeal (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    day.meal.push(req.body)
    await day.save()
    res.status(201).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createExercise (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    day.exercise.push(req.body)
    await day.save()
    res.status(201).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateNote (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    const note = day.notes.id(req.params.noteId)
    note.set(req.body)
    await day.save()
    res.status(200).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateSleep (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    const sleep = day.sleep.id(req.params.sleepId)
    sleep.set(req.body)
    await day.save()
    res.status(200).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateMeal (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    const meal = day.meal.id(req.params.mealId)
    meal.set(req.body)
    await day.save()
    res.status(200).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateExercise (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    const exercise = day.exercise.id(req.params.exerciseId)
    exercise.set(req.body)
    await day.save()
    res.status(200).json(day)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  index,
  create,
  show,
  update,
  deleteDay as delete,
  createNote,
  createSleep,
  createMeal,
  createExercise,
  updateNote,
  updateSleep,
  updateMeal,
  updateExercise,
}