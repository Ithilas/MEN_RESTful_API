const router = require("express").Router();
const project = require("../models/project");
const { verifyToken } = require("../validation");

// CRUD operations

// /api/projects/
// Create project - post

router.post("/", verifyToken, (req, res) => {

    data = req.body;

    project.insertMany(data)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( {message: err.message }); })
});


// /api/project/

// Read all projects - get

router.get("/", (req, res) => {

    project.find()
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( {message: err.message }); })
});

// Read specific project - get

router.get("/:id", (req, res) => {

    project.findById(req.params.id)
    .then(data => { res.send(data); })
    .catch(err => { res.status(500).send( {message: err.message }); })
});


// Update specific project - put
router.put("/:id", verifytoken, (req, res) => {

    const id = req. params.id;

    project.findByIdAndUpdate(id, req.body)
    .then(data => {
        if (!data)
        {
            res.status(404).send({ message: "Cannot update project with id=" + id + ". Maybe project was not found!"})
        }
        else
        {
            res.send({ message: "Project was successfully updated."})
        }        
    
    })
    .catch(err => { res.status(500).send( {message: "Error updating project with id=" + id }); })
});

// Delete specific project - delete
router.delete("/:id", verifytoken, (req, res) => {

    const id = req. params.id;

    project.findByIdAndDelete(id)
    .then(data => {
        if (!data)
        {
            res.status(404).send({ message: "Cannot delete project with id=" + id + ". Maybe project was not found!"})
        }
        else
        {
            res.send({ message: "Project was successfully deleted."})
        }        
    
    })
    .catch(err => { res.status(500).send( {message: "Error deleting project with id=" + id }); })
});

module.exports = router;
