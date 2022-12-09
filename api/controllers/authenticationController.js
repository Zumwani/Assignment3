const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../middlewares/authorization");

const controller = express.Router();
module.exports = controller;

const UserModel = require("../models/User");

//Unsecured

const emailPattern = /.{1,}@.*\..{1,}/;
controller.route("/signup").post(async (request, response) => {
    
    const { email, password } = request.body;

    if (!email || !password)
        response.status(400).json({ text: "Email and password are required."});
    else if (!emailPattern.test(email))
        response.status(400).json({ text: "Email is invalid." });
    else if (password.length < 8 || password.length > 32)
        response.status(400).json({ text: "Password must contain between 8-32 characters." });
    else {
     
        if (await UserModel.findOne({ email }))
            response.status(409).json({ text: "A user with the specified email already exists." });
        else {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await UserModel.create({
                email,
                password: hashedPassword
            });

            if (user)
                response.status(201).send(null);
            else
                response.status(400).json("Something went wrong when creating user.");

        }

    }

});

controller.route("/signin").post(async (request, response) => {

    const { email, password } = request.body;

    if (!email || !password)
        response.status(400).json({ text: "email and password are required."});
    else {

        const user = await UserModel.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            response.status(200).json({
                accessToken: generateAccessToken(user._id)
            });
        }
        else {
            response.status(400).json({ text: "Incorrect email or password." });
        }

    }

});
