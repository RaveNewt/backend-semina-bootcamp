const Speaker = require('./model');
const { StatusCodes } = require('http-status-codes');
const CustomAPI = require('../../../errors');
const fs = require('fs');
const config = require('../../../config');


const getAllSpeaker = async (req, res,next) => {
    try {
        const result = await Speaker.find({user:req.user.id});
        res.status(StatusCodes.OK).json({ data: result });
    } catch (err) {
        next(err);
    }
}
const createSpeaker = async (req, res, next) => {
    try {
      const { name, role } = req.body;
      const user = req.user.id;
      let result;
  
      if (!req.file) {
        result = new Speaker({ name, role, user });
      } else {
        result = new Speaker({ name, role, avatar: req.file.filename, user });
      }

  
      await result.save();
  
      res.status(StatusCodes.CREATED).json({ data: result });
    } catch (err) {
      next(err);
    }
};

const getOneSpeaker = async (req, res, next) => {
    try {
      const { id: speakerId } = req.params;
      const result = await Speaker.findOne({ _id: speakerId, user: req.user.id });
  
      if (!result) {
        throw new CustomAPI.NotFoundError('No Speaker with id :' + speakerId);
      }
  
      res.status(StatusCodes.OK).json({ data: result });
    } catch (err) {
      next(err);
    }
  };

  const updateSpeaker = async (req, res, next) => {
    try {
      const { name, role } = req.body;
      const user = req.user.id;
      const { id: speakerId } = req.params;
  
      let result = await Speaker.findOne({ _id: speakerId, user });
  
      if (!result) {
        throw new CustomAPI.NotFoundError('No Speaker with id :' + speakerId);
      }
  
      if (!req.file) {
        result.name = name;
        result.role = role;
      } else {
        let currentImage = `${config.rootPath}/public/uploads/${result.avatar}`;

        console.log(currentImage);
  
        /*if (result.avatar !== 'default.png' && fs.existsSync(currentImage)) {
          fs.unlinkSync(currentImage);
        }*/
  
        result.name = name;
        result.role = role;
        result.avatar = req.file.filename;
      }
  
      await result.save();
  
      res.status(StatusCodes.OK).json({ data: result });
    } catch (err) {
      next(err);
    }
  };
  

  const deleteSpeaker = async (req, res, next) => {
    try {
      const user = req.user.id;
      const { id: speakerId } = req.params;
  
      let result = await Speaker.findOne({ _id: speakerId, user });
  
      if (!result) {
        throw new CustomAPI.NotFoundError('No Speaker with id :' + speakerId);
      }
  
      let currentImage = `${config.rootPath}public/uploads/${result.avatar}`;
  
      if (result.avatar !== 'default.png' && fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);
      }
  
      await result.remove();
  
      res.status(StatusCodes.OK).json({ data: result });
    } catch (err) {
      next(err);
    }
  };

module.exports = {getAllSpeaker, createSpeaker, deleteSpeaker, getOneSpeaker, updateSpeaker};