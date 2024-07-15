const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = "inotebookApplication"
const { body, validationResult } = require('express-validator')

// create a user using POST '/api/auth/createuser' , doesnt require login
router.post('/createuser', [
    body('email', 'Enter valid email').isEmail(),
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
], async (req, res) => {


    let status = "";
    const errors = validationResult(req);

    // if there are errrors return bad request
    if (!errors.isEmpty()) {

        return res.status(400).json({ status, errors: errors.array() });
    }
    try {

        //  Check Whether the user with email already exists
        let user = await User.findOne({ email: req.body.email });
        // if exists return bad request
        if (user) {

            status = "exists"
            return res.status(400).json({ status, error: "User Already Exists" });
        }

        // secure password
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        // else create user 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })

        // const data = {
        //     user: {
        //         id: user.id
        //     }
        // }
        // const authToken = jwt.sign(data, JWT_SECRET)
        // console.log("authToken:", authToken)

        status = "created"

        // res.json({ status, authToken })
        res.json({ status })

    }
    catch (error) {
        console.log(error.message);
        // success = false;
        res.status(500).json({ status, message: "Something Went Wrong!" })
    }

})
//route 2  Authenticate  user , no login required
router.post('/login', [
    body('email', 'Enter Valid Iemail',).isEmail(),
    body('password', "enter valid password").isLength({ min: 5 }).exists()
],
    async (req, res) => {
        const errors = validationResult(req);

        let success = false;
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ success, errors: errors.array() });
        }
        //  Check Whether the user with email already exists
        // let user = await User.findOne({ email: req.body.email });
        // if (user) {
        //     // if exists return bad request

        // }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email })
            if (!user) {

                return res.status(400).json({ success, errors: "Invalid Credentials" });
            }
            const passwordcompare = await bcrypt.compare(password, user.password)
            if (!passwordcompare) {
                return res.status(400).json({ success, errors: "Invalid Credentials" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            success = true;
            res.json({ success, authToken })
        }
        catch (error) {
            console.log(error.message);
            res.status(500).send("Internal server error")
        }

    })
// route 3 : get logged in user details using post , login required

router.post('/getUser', fetchUser,
    async (req, res) => {
        try {
            const userId = req.user.id
            const user = await User.findById(userId).select("-password")
            res.send(user)


        } catch (error) {
            console.log(error.message);
            res.status(500).send("Inter server error")
        }
    }
)


module.exports = router