const router = require("express").Router();
const object = require("../models/object");
const { verifyToken } = require("../validation");

// CRUD operations

// /api/objects/
// Create object - post

router.post("/", (req, res) => {

    data = req.body;

    object.insertMany(data)
    .then(data => { res.status(201).send(data); })
    .catch(err => { res.status(500).send( {message: err.message }); })
});


// /api/object/

// Read all objects - get

router.get("/", (req, res) => {

    object.find()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( {message: err.message }); })
});

// Read specific object - get

router.get("/:id", (req, res) => {

    object.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( {message: err.message }); })
});


// Update specific object - put
router.put("/:id", verifyToken, (req, res) => {

    const id = req. params.id;

    object.findByIdAndUpdate(id, req.body)
    .then(data => {
        if (!data)
        {
            res.status(404).send({ message: "Cannot update object with id=" + id + ". Maybe object was not found!"})
        }
        else
        {
            res.send({ message: "Object was successfully updated."})
        }        
    
    })
    .catch(err => { res.status(500).send( {message: "Error updating object with id=" + id }); })
});

// Delete specific object - delete
router.delete("/:id", verifyToken, (req, res) => {

    const id = req. params.id;

    object.findByIdAndDelete(id)
    .then(data => {
        if (!data)
        {
            res.status(404).send({ message: "Cannot delete object with id=" + id + ". Maybe object was not found!"})
        }
        else
        {
            res.send({ message: "Object was successfully deleted."})
        }        
    
    })
    .catch(err => { res.status(500).send( {message: "Error deleting object with id=" + id }); })
});

module.exports = router;
