const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let assignmentSchema = new Schema(
{
    name: {type: String},
    description: {type: String},
    project_id: {type: String},
    to_do: {type: Boolean},
    in_progress: {type: Boolean},
    complete: {type: Boolean}
}
);

module.exports = mongoose.model("assignment", assignmentSchema);