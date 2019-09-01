'use strict'

const PersonalData = require('../models/PersonalData');
const fs = require('fs');

const controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la home'
        })
    },

    test: function(req, res) {
        return res.status(200).send({
            message: 'Soy le método o accion test'
        })
    },

    save: function(req, res) {
        var personalData = new PersonalData();
        const params = req.body;

        personalData.key = params.key;
        personalData.text = params.text;
        personalData.value = params.value;
        personalData.image = null;

        personalData.save((err, personalDataStored) => {
            if(err) return res.status(500).send({message: 'Save error !'});

            if(!personalDataStored) return res.status(400).send({message: 'Error: the document has not been saved.'});

            return res.status(200).send({personalData: personalDataStored});
        });
    },

    get: function(req, res){
        var personalDataId = req.params.id;

        if(personalDataId == null || personalDataId == '') return res.status(404).send({message: 'There is not id on params'});
    

        PersonalData.findById(personalDataId, (err, personalData) => {
            if(err) return res.status(500).send({message: 'Error: Can\'t return personalData'});

            if(!personalData) return res.status(404).send({message: 'The personalData does not exists'});

            return res.status(200).send({
                personalData
            })
        });
    },

    getAll: function (req, res){
        PersonalData.find({}).exec((err, personalData) => {
            if(err) return res.status(500).send({message: 'Error returning data.'});

            if(!personalData) return res.status(404).send({message: 'There are not data to be returned.'});

            return res.status(200).send({personalData});
        });
    },

    update: function(req, res) {
        const personalDataId = req.params.id;
        const update = req.body;

        PersonalData.findByIdAndUpdate(personalDataId, update, {new: true, useFindAndModify: false}, (err, personalDataUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating data.'});

            if(!personalDataUpdated) return res.status(404).send({message: 'The personalData to be updated does not exists.'});

            return res.status(200).send({personalDataUpdated});
        });
    },

    delete: function(req, res) {
        const personalDataId = req.params.id;
        
        PersonalData.findByIdAndDelete(personalDataId, (err, personalDataDeleted) => {
            if(err) return res.status(500).send({message: 'Error deleting personalData'});

            if(!personalDataDeleted) return res.status(404).send({message: 'Cannot delete this personalData.'});

            return res.status(200).send({personalDataDeleted});
        });
    },

    uploadImage: function (req, res) {
        const personalDataId = req.params.id;
        var fileName = 'Image not uploaded';

        if(req.files){
            const filePath = req.files.image.path;
            const fileSplit = filePath.split('\\');
            const fileName = fileSplit[1];
            const extSplit = fileName.split('\.');
            const fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                PersonalData.findByIdAndUpdate(personalDataId, {image: fileName}, {new: true, useFindAndModify: false}, (err, personalDataUpdated) => {
                    if(err) return res.status(500).send({message: 'Error uploading image.'});
    
                    if(!personalDataUpdated) return res.status(404).send({message: 'The personalData to be updated does not exists.'});
    
                    return res.status(200).send({personalDataUpdated});
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'Not valid extension'});
                });
            }
        } else {
            return res.status(200).send({
                message: fileName
            });
        }

    }

}

module.exports = controller;