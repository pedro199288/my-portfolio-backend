'use strict'

const Experience = require('../models/Experience');
const fs = require('fs');

const controller = {
    // each method is used on a different route
    /**
     * Saves a document on collection
     */
    save: function(req, res) {
        var Experience = new Experience();
        const params = req.body;

        Experience.key = params.key;
        Experience.date.start = params.start;
        Experience.date.end = params.end;
        Experience.company = params.company;
        Experience.rol = params.rol;
        Experience.description = params.description;

        Experience.save((err, ExperienceStored) => {
            if(err) return res.status(500).send({message: 'Save error !'});

            if(!ExperienceStored) return res.status(400).send({message: 'Error: the document has not been saved.'});

            return res.status(200).send({Experience: ExperienceStored});
        });
    },

    /**
     * Gets a document of the collection by its id
     */
    get: function(req, res){
        var ExperienceId = req.params.id;

        if(ExperienceId == null) return res.status(404).send({message: 'There is not id on params'});
    

        Experience.findById(ExperienceId, (err, Experience) => {
            if(err) return res.status(500).send({message: 'Error: Can\'t return Experience'});

            if(!Experience) return res.status(404).send({message: 'The Experience does not exists'});

            return res.status(200).send({ Experience });
        });
    },

    /**
     * Gets all documents of the collection
     */
    getAll: function (req, res){
        Experience.find({}).exec((err, Experience) => {
            if(err) return res.status(500).send({message: 'Error returning data.'});

            if(!Experience) return res.status(404).send({message: 'There are not data to be returned.'});

            return res.status(200).send({Experience});
        });
    },

    /**
     * Updates a document of the collection by its id
     */
    update: function(req, res) {
        const ExperienceId = req.params.id;
        const update = req.body;

        Experience.findByIdAndUpdate(ExperienceId, update, {new: true, useFindAndModify: false}, (err, ExperienceUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating data.'});

            if(!ExperienceUpdated) return res.status(404).send({message: 'The Experience to be updated does not exists.'});

            return res.status(200).send({ExperienceUpdated});
        });
    },

    /**
     * Deletes a document of the collection by its id
     */
    delete: function(req, res) {
        const ExperienceId = req.params.id;
        
        Experience.findByIdAndDelete(ExperienceId, (err, ExperienceDeleted) => {
            if(err) return res.status(500).send({message: 'Error deleting Experience'});

            if(!ExperienceDeleted) return res.status(404).send({message: 'Cannot delete this Experience.'});

            return res.status(200).send({ExperienceDeleted});
        });
    },

    /**
     * Uploads an image to Server and adds the image's name to a document by its id.
     */
    // TODO: Borrar método de donde no se use
    uploadImage: function (req, res) {
        const ExperienceId = req.params.id;
        var fileName = 'Image not uploaded';

        if(req.files){
            const filePath = req.files.image.path;      // gets the file path of the image
            const fileSplit = filePath.split('\\');     // splits the file path to get the file name
            const fileName = fileSplit[1];              // gets the file name
            const extSplit = fileName.split('\.');      // splits the file name to get the extension
            const fileExt = extSplit[1];                // gets the extensions to check it after

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                // Update de document
                Experience.findByIdAndUpdate(ExperienceId, {image: fileName}, {new: true, useFindAndModify: false}, (err, ExperienceUpdated) => {
                    if(err) return res.status(500).send({message: 'Error uploading image.'});
    
                    if(!ExperienceUpdated) return res.status(404).send({message: 'The Experience to be updated does not exists.'});
    
                    return res.status(200).send({ExperienceUpdated});
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