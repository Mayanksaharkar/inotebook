const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchUser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator')
// router 1 get all notes of logged in user : GET  :/api/note/fetchallnotes: login required

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)     
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("Something Went Wrong!")
    }
})

// route 2 add notes of logged in user : GET  :/api/note/fetchallnotes: login required

router.post('/addnote', fetchuser, [

    body("title", "Enter Valid Title").isLength({ min: 3 }),
    body("description", "Enter Valid Description").isLength({ min: 5 })
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Something Went Wrong!")
    }
})
// route 3 update note of logged in user : put  : /api/note/updatenote : login required
router.put(`/update/:id`, fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        let note = await Note.findById(req.params.id);

        // If note not found, return 404
        if (!note) {
            return res.status(401).send("Not Found");
        }

        // If the requested user does not match the note's user, return 401
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Update the note properties if provided in the request
        if (title) {
            note.title = title;
        }
        if (description) {
            note.description = description;
        }
        if (tag) {
            note.tag = tag;
        }

        // Save the updated note and await the operation
        note = await note.save();

        // Send the response
        res.json({ note });
    } catch (error) {
        // Handle errors and send an appropriate response
        res.status(500).json({ error: error.message, message: "Something went wrong" });
    }
});


// route 4 delete note of logged in user : delete  : /api/note/deletenote : login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find the note to be deleted
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(401).send("not found");
        }

        // allow to delete if user corresponds to note
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not Allowed");
        }


        await Note.findByIdAndDelete(req.params.id);
        res.send("note deleted")
    } catch (error) {
        res.json({ error: error.message }).send("Something went Wrong")
    }


})
module.exports = router