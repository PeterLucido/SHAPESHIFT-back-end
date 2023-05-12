import { Profile } from "../models/profile"
import { Day } from "../models/day"

async function index(req, res) {
  try {
    const days = await Day.find({})
    .populate('date')
    .sort({ date: 'desc' })
    res.status(200).json(days)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export {
  index,
}