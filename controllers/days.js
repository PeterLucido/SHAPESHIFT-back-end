import { Profile } from "../models/profile.js"
import { Day } from "../models/day.js"

async function index(req, res) {
  try {
    const profileId = req.user.profile
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
    res.status(201).json(day)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function show(req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    .populate(['owner', 'sleep', 'meal', 'exercise', 'notes', 'date'])
    res.status(200).json(day)
    return day
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function update(req, res) {
  try {
    const day = await Day.findByIdAndUpdate(
      req.params.dayId,
      req.body,
      { new: true }
    ).populate(['owner', 'date', 'sleep', 'meal', 'exercise', 'notes'])
    res.status(200).json(day)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function deleteDay(req, res) {
  try {
    const day = await Day.findByIdAndDelete(req.params.dayId)
    const profile = await Profile.findById(req.user.profile)
    profile.days.remove({ _id: day._id })
    await profile.save()
    res.status(200).json(day)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createNote (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    day.notes.push(req.body)
    await day.save()
    res.status(201).json(day)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createSleep (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    day.sleep.push(req.body)
    await day.save()
    res.status(201).json(day)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createMeal (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    day.meal.push(req.body)
    await day.save()
    res.status(201).json(day)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function createExercise (req, res) {
  try {
    const day = await Day.findById(req.params.dayId)
    day.exercise.push(req.body)
    await day.save()
    res.status(201).json(day)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
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
}