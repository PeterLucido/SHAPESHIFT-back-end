import { Profile } from "../models/profile.js"
import { Day } from "../models/day.js"

async function index(req, res) {
  try {
    const day = await Day.find({})
    .populate('date')
    .sort({ date: 'desc' })
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

export {
  index,
  create,
  show,
  update,
  deleteDay as delete,
}