'use strict'

const Skill = require('../models/Skill');
const fs = require('fs');

const controller = {
    // each method is used on a different route
    /**
     * Saves a document on collection
     */
    save: function(req, res) {
        var Skill = new Skill();
        const params = req.body;

        Skill.key = params.key;
        Skill.text = params.text;
        Skill.value = params.value;

        Skill.save((err, SkillStored) => {
            if(err) return res.status(500).send({message: 'Save error !'});

            if(!SkillStored) return res.status(400).send({message: 'Error: the document has not been saved.'});

            return res.status(200).send({Skill: SkillStored});
        });
    },

    /**
     * Gets a document of the collection by its id
     */
    get: function(req, res){
        var SkillId = req.params.id;

        if(SkillId == null) return res.status(404).send({message: 'There is not id on params'});
    

        Skill.findById(SkillId, (err, Skill) => {
            if(err) return res.status(500).send({message: 'Error: Can\'t return Skill'});

            if(!Skill) return res.status(404).send({message: 'The Skill does not exists'});

            return res.status(200).send({ Skill });
        });
    },

    /**
     * Gets all documents of the collection
     */
    getAll: function (req, res){
        Skill.find({}).exec((err, Skill) => {
            if(err) return res.status(500).send({message: 'Error returning data.'});

            if(!Skill) return res.status(404).send({message: 'There are not data to be returned.'});

            return res.status(200).send({Skill});
        });
    },

    /**
     * Updates a document of the collection by its id
     */
    update: function(req, res) {
        const SkillId = req.params.id;
        const update = req.body;

        Skill.findByIdAndUpdate(SkillId, update, {new: true, useFindAndModify: false}, (err, SkillUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating data.'});

            if(!SkillUpdated) return res.status(404).send({message: 'The Skill to be updated does not exists.'});

            return res.status(200).send({SkillUpdated});
        });
    },

    /**
     * Deletes a document of the collection by its id
     */
    delete: function(req, res) {
        const SkillId = req.params.id;
        
        Skill.findByIdAndDelete(SkillId, (err, SkillDeleted) => {
            if(err) return res.status(500).send({message: 'Error deleting Skill'});

            if(!SkillDeleted) return res.status(404).send({message: 'Cannot delete this Skill.'});

            return res.status(200).send({SkillDeleted});
        });
    },

    /**
     * Uploads an image to Server and adds the image's name to a document by its id.
     */
    // TODO: Borrar método de donde no se use
    uploadImage: function (req, res) {
        const SkillId = req.params.id;
        var fileName = 'Image not uploaded';

        if(req.files){
            const filePath = req.files.image.path;      // gets the file path of the image
            const fileSplit = filePath.split('\\');     // splits the file path to get the file name
            const fileName = fileSplit[1];              // gets the file name
            const extSplit = fileName.split('\.');      // splits the file name to get the extension
            const fileExt = extSplit[1];                // gets the extensions to check it after

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                // Update de document
                Skill.findByIdAndUpdate(SkillId, {image: fileName}, {new: true, useFindAndModify: false}, (err, SkillUpdated) => {
                    if(err) return res.status(500).send({message: 'Error uploading image.'});
    
                    if(!SkillUpdated) return res.status(404).send({message: 'The Skill to be updated does not exists.'});
    
                    return res.status(200).send({SkillUpdated});
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