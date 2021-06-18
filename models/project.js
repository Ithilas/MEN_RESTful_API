const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let projectSchema = new Schema(
{
    name: {type: String},
    description: {type: String},
    complete: {type: Boolean}
}
);

module.exports = mongoose.model("project", projectSchema);