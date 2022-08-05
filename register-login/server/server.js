// packages
const express = require("express");
const app = express();
const cors = require("cors");

// port
// TODO: mongodb port
const port = 3333;

// hashing
const bcrypt = require("bcrypt");
const salt = 12;

// local array of users
// TODO: move to mongodb
const users = require("./data").users;

// express
app.use(express.json());
app.use(cors());

// WARNING ! DATA FROM CLIENT NOT BEING SANITIZED
// TODO: sanitize client data

app.post("/register", async (req, res) => {
    // get .email and .password from req.body
    // check for duplicate email in user array
    let userMatch = users.find((user) => req.body.email === user.email);
    if (!userMatch) {
        let passHash = await bcrypt.hash(req.body.password, salt);
        // add to users data
        let newUser = {
            _id: Date.now(),
            email: req.body.email,
            password: passHash,
        };
        // TODO: push to mongodb collection
        users.push(newUser);
        console.log("user array:", users);
        // send response
        res.status(201).send({ data: newUser });
    } else {
        res.status(400).send({
            error: { code: 400, message: "email already in use" },
        });
    }
});

app.post("/login", async (req, res) => {
    // get .email and .password from req.body
    // check user array for matching email
    let userMatch = users.find((user) => req.body.email === user.email);
    if (userMatch) {
        // validate passwords: submitted vs saved
        let submittedPass = req.body.password;
        let savedPass = userMatch.password;
        const passMatch = await bcrypt.compare(submittedPass, savedPass);
        if (passMatch) {
            console.log("login successful");
            res.status(200).send({ data: { token: "pretend token" } });
        } else {
            res.status(401).send({
                error: {
                    code: 401,
                    message: "invalid username or password",
                },
            });
        }
    } else {
        // cause delay to hide that no user found
        let fakePass = `$2b$${salt}$causedelaytohidethatnouserfoundpleasedonthackmethankyou`;
        await bcrypt.compare(submittedPass, fakePass);
        res.status(401).send({
            error: { code: 401, message: "invalid username or password" },
        });
    }
});

app.listen(port, function (err) {
    if (err) {
        console.error("failed to launch server");
        return;
    }
    console.log(`listening on port ${port}`);
});
