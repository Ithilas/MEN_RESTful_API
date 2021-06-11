const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let assignmentSchema = new Schema(
{
    name: {type: String},
    description: {type: String},
}
);

module.exports = mongoose.model("assignment", assignmentSchema);