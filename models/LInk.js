const { Schema, model, Types } = require('mongoose')

//  Basic schema for Link
const schema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  click: { type: Number, default: 0 },
  owner: { type: Types.ObjectId, ref: 'User' }

})

// eporting the Link model that the schema describes
module.exports = model('Link', schema)