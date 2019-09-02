'use strict'

const PersonalData = require('../models/PersonalData');
const fs = require('fs');

const controller = {
    // each method is used on a different route
    /**
     * Saves a document on collection
     */
    save: function(req, res) {
        var personalData = new PersonalData();
        const params = req.body;

        personalData.key = params.key;
        personalData.text = params.text;
        personalData.value = params.value;
        personalData.link = params.link;
        personalData.image = null;

        personalData.save((err, personalDataStored) => {
            if(err) return res.status(500).send({message: 'Save error !'});

            if(!personalDataStored) return res.status(400).send({message: 'Error: the document has not been saved.'});

            return res.status(200).send({personalData: personalDataStored});
        });
    },

    /**
     * Gets a document of the collection by its id
     */
    get: function(req, res){
        var personalDataId = req.params.id;

        if(personalDataId == null) return res.status(404).send({message: 'There is not id on params'});
    

        PersonalData.findById(personalDataId, (err, personalData) => {
            if(err) return res.status(500).send({message: 'Error: Can\'t return personalData'});

            if(!personalData) return res.status(404).send({message: 'The personalData does not exists'});

            return res.status(200).send({
                personalData
            })
        });
    },

    /**
     * Gets all documents of the collection
     */
    getAll: function (req, res){
        PersonalData.find({}).exec((err, personalData) => {
            if(err) return res.status(500).send({message: 'Error returning data.'});

            if(!personalData) return res.status(404).send({message: 'There are not data to be returned.'});

            return res.status(200).send({personalData});
        });
    },

    /**
     * Updates a document of the collection by its id
     */
    update: function(req, res) {
        const personalDataId = req.params.id;
        const update = req.body;

        PersonalData.findByIdAndUpdate(personalDataId, update, {new: true, useFindAndModify: false}, (err, personalDataUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating data.'});

            if(!personalDataUpdated) return res.status(404).send({message: 'The personalData to be updated does not exists.'});

            return res.status(200).send({personalDataUpdated});
        });
    },

    /**
     * Deletes a document of the collection by its id
     */
    delete: function(req, res) {
        const personalDataId = req.params.id;
        
        PersonalData.findByIdAndDelete(personalDataId, (err, personalDataDeleted) => {
            if(err) return res.status(500).send({message: 'Error deleting personalData'});

            if(!personalDataDeleted) return res.status(404).send({message: 'Cannot delete this personalData.'});

            return res.status(200).send({personalDataDeleted});
        });
    },

    /**
     * Uploads an image to Server and adds the image's name to a document by its id.
     */
    // TODO: Borrar método de donde no se use
    uploadImage: function (req, res) {
        const personalDataId = req.params.id;
        var fileName = 'Image not uploaded';

        if(req.files){
            const filePath = req.files.image.path;      // gets the file path of the image
            const fileSplit = filePath.split('\\');     // splits the file path to get the file name
            const fileName = fileSplit[1];              // gets the file name
            const extSplit = fileName.split('\.');      // splits the file name to get the extension
            const fileExt = extSplit[1];                // gets the extensions to check it after

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                // Update de document
                PersonalData.findByIdAndUpdate(personalDataId, {image: fileName}, {new: true, useFindAndModify: false}, (err, personalDataUpdated) => {
                    if(err) return res.status(500).send({message: 'Error uploading image.'});
    
                    if(!personalDataUpdated) return res.status(404).send({message: 'The personalData to be updated does not exists.'});
    
                    return res.status(200).send({personalDataUpdated});
                });
            } else {
                // If the extension is not correct, unlink the uploaded file
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'Not valid extension'});
                });
            }
        } else {
            // there are not files in the request, send response
            return res.status(200).send({
                message: fileName
            });
        }

    }

}

// Exports the module to be used on routes files
module.exports = controller;