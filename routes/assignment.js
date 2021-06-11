const router = require("express").Router();
const assignment = require("../models/assignment");
const { verifyToken } = require("../validation");

// CRUD operations

// /api/assignments/
// Create assignment - post

router.post("/", verifyToken, (req, res) => {

    data = req.body;

    assignment.insertMany(data)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( {message: err.message }); })
});


// /api/assignment/

// Read all assignment - get

router.get("/", (req, res) => {

    assignment.find()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( {message: err.message }); })
});

// Read all assignment assigne - get

// router.get("/instock", (req, res) => {

//     project.find({ inStock: true })
//     .then(data => { res.send(data); })
//     .catch(err => { res.status(500).send( {message: err.message }); })
// });

// Read specific assignment - get

router.get("/:id", (req, res) => {

    assignment.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( {message: err.message }); })
});


// Update specific assignment - put
router.put("/:id", verifyToken, (req, res) => {

    const id = req. params.id;

    assignment.findByIdAndUpdate(id, req.body)
    .then(data => {
        if (!data)
        {
            res.status(404).send({ message: "Cannot update assignment with id=" + id + ". Maybe assignment was not found!"})
        }
        else
        {
            res.send({ message: "Assignment was successfully updated."})
        }        
    
    })
    .catch(err => { res.status(500).send( {message: "Error updating assignment with id=" + id }); })
});

// Delete specific assignment - delete
router.delete("/:id", verifyToken, (req, res) => {

    const id = req. params.id;

    assignment.findByIdAndDelete(id)
    .then(data => {
        if (!data)
        {
            res.status(404).send({ message: "Cannot delete assignment with id=" + id + ". Maybe assignment was not found!"})
        }
        else
        {
            res.send({ message: "Assignment was successfully deleted."})
        }        
    
    })
    .catch(err => { res.status(500).send( {message: "Error deleting assignment with id=" + id }); })
});

module.exports = router;
