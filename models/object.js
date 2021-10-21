const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let objectSchema = new Schema(
{
    name: {type: String},
    description: {type: String},
    assignment_id: {type: String},
}
);

module.exports = mongoose.model("object", objectSchema);