const bcrypt = require("bcryptjs");
const { request } = require("express");
const auth = require("../middlewares/jwt");
const User = require("../models/User");

const register = async (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const age = req.body.age;
  const gender = req.body.gender;
  const birthdate = req.body.birthdate;
  const guardian = req.body.guardian;
  const contactNo = req.body.contactNo;
  const preferences = req.body.preferences;
  const music = req.body.music;
  const trainedCG = req.body.trainedCG;
  const MMSE = req.body.MMSE;
  const bloodGroup = req.body.bloodGroup;
  const illnesses = req.body.illnesses;

  const salt = bcrypt.genSaltSync(10);
  const pword = bcrypt.hashSync(password, salt);
  console.log(pword)

  const user = new User({
    userId,
    name,
    email,
    password:pword,
    age,
    gender,
    birthdate,
    guardian,
    contactNo,
    preferences,
    music,
    trainedCG,
    MMSE,
    bloodGroup,
    illnesses,
  });

  try {
    let response = await user.save();
    if (response) {
      return res.status(201).send({ message: "New Profile created" });
    } else {
      return res.status(500).send({ message: "Internal server error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).send({ message: "Error while registering a user" });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = auth.generateAccessToken(email);
        // call toJSON method applied during model instantiation
        return res.status(200).send({ ...user.toJSON(), token });
      } else {
        return res
          .status(400)
          .send({ message: "Such user does not exist check your credentials" });
      }
    } else {
      return res.status(404).send({ message: "Such user does not exist" });
    }
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Such user does not exist check your credentials" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find();
    if (users) {
      return res.json(users);
    } else {
      return res.status(404).send({ message: "Error on retrieving users" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

const getOneUser = async (req, res) => {
  const email = req.params.email;

  try {
    let user = await User.findOne({
      email: email,
    });
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).send({ message: "No such user found" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateUserPassword = async (req, res) => {
  const email = req.params.email;
  const password = req.params.pwd;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const salt = bcrypt.genSaltSync(10);
      const updatePassword = bcrypt.hashSync(password, salt);

      const newUser = {
        userId:user.userId,
        name:user.name,
        email:user.email,
        pword:updatePassword,
        age:user.age,
        gender:user.gender,
        birthdate:user.birthdate,
        guardian:user.guardian,
        contactNo:user.contactNo,
        preferences:user.preferences,
        music:user.music,
        trainedCG:user.trainedCG,
        MMSE:user.MMSE,
        bloodGroup:user.bloodGroup,
        illnesses:user.illnesses,
      };

      try {
        const response = await User.findOneAndUpdate({ email: email }, newUser);
        if (response) {
          return res
            .status(200)
            .send({ message: "Successfully updated Password" });
        } else {
          return res.status(500).send({ message: "Internal server error" });
        }
      } catch (err) {
        return res
          .status(400)
          .send({ message: "Unable to update recheck your email" });
      }
    } else {
      return res
        .status(404)
        .send({ message: "No such user with entered email" });
    }
  } catch (err) {
    return res.status(404).send({ message: "No such user with entered email" });
  }
};

const updateUser = async (req, res) => {
  const email = req.params.email;

  const user = await User.findOne({ email: email });

  const password = user.password;

  const newUser = {
    userId:req.body.userId,
    name:req.body.name,
    email:req.body.email,
    pword:password,
    age:req.body.age,
    gender:req.body.gender,
    birthdate:req.body.birthdate,
    guardian:req.body.guardian,
    contactNo:req.body.contactNo,
    preferences:req.body.preferences,
    music:req.body.music,
    trainedCG:req.body.trainedCG,
    MMSE:req.body.MMSE,
    bloodGroup:req.body.bloodGroup,
    illnesses:req.body.illnesses,
  };

 
  try {
    const response = await User.findOneAndUpdate({ email: email }, newUser);
    if (response) {
      return res
        .status(200)
        .send({ message: "Successfully updated User Details" });
    } else {
      return res.status(500).send({ message: "Internal server error" });
    }
  } catch (err) {
    return res
      .status(400)
      .send({ message: "Unable to update recheck your email" });
  }
};

const deleteUser = async (req, res) => {
  const email = req.params.email;

  try {
    const user = await User.findOneAndDelete({ email: email });
    if (user) {
      return res.status(204).send({ message: "Successfully deleted A User" });
    } else {
      return res
        .status(404)
        .send({ message: "Such user does not exists recheck the email" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};


const getOneUserName = async (req, res) => {
  console.log("req user", req);
  const email = req;

  try {
    let user = await User.findOne({
      email: email,
    });
    if (user) {
      console.log("user>>>", user);
      return user;
    } else {
      return res.status(404).send({ message: "No such user found" });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getOneUser,
  updateUserPassword,
  updateUser,
  deleteUser,
  getOneUserName,
};
