'use strict'

const Project = require('../models/Project');
const fs = require('fs');

const controller = {
    // each method is used on a different route
    /**
     * Saves a document on collection
     */
    save: function(req, res) {
        var Project = new Project();
        const params = req.body;

        Project.key = params.key;
        Project.name = params.name;
        Project.company = params.company;
        Project.tools = params.tools;
        Project.website = params.website;
        Project.image = params.image;

        Project.save((err, ProjectStored) => {
            if(err) return res.status(500).send({message: 'Save error !'});

            if(!ProjectStored) return res.status(400).send({message: 'Error: the document has not been saved.'});

            return res.status(200).send({Project: ProjectStored});
        });
    },

    /**
     * Gets a document of the collection by its id
     */
    get: function(req, res){
        var ProjectId = req.params.id;

        if(ProjectId == null) return res.status(404).send({message: 'There is not id on params'});
    

        Project.findById(ProjectId, (err, Project) => {
            if(err) return res.status(500).send({message: 'Error: Can\'t return Project'});

            if(!Project) return res.status(404).send({message: 'The Project does not exists'});

            return res.status(200).send({ Project });
        });
    },

    /**
     * Gets all documents of the collection
     */
    getAll: function (req, res){
        Project.find({}).exec((err, Project) => {
            if(err) return res.status(500).send({message: 'Error returning data.'});

            if(!Project) return res.status(404).send({message: 'There are not data to be returned.'});

            return res.status(200).send({Project});
        });
    },

    /**
     * Updates a document of the collection by its id
     */
    update: function(req, res) {
        const ProjectId = req.params.id;
        const update = req.body;

        Project.findByIdAndUpdate(ProjectId, update, {new: true, useFindAndModify: false}, (err, ProjectUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating data.'});

            if(!ProjectUpdated) return res.status(404).send({message: 'The Project to be updated does not exists.'});

            return res.status(200).send({ProjectUpdated});
        });
    },

    /**
     * Deletes a document of the collection by its id
     */
    delete: function(req, res) {
        const ProjectId = req.params.id;
        
        Project.findByIdAndDelete(ProjectId, (err, ProjectDeleted) => {
            if(err) return res.status(500).send({message: 'Error deleting Project'});

            if(!ProjectDeleted) return res.status(404).send({message: 'Cannot delete this Project.'});

            return res.status(200).send({ProjectDeleted});
        });
    },

    /**
     * Uploads an image to Server and adds the image's name to a document by its id.
     */
    uploadImage: function (req, res) {
        const ProjectId = req.params.id;
        var fileName = 'Image not uploaded';

        if(req.files){
            const filePath = req.files.image.path;      // gets the file path of the image
            const fileSplit = filePath.split('\\');     // splits the file path to get the file name
            const fileName = fileSplit[1];              // gets the file name
            const extSplit = fileName.split('\.');      // splits the file name to get the extension
            const fileExt = extSplit[1];                // gets the extensions to check it after

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                // Update de document
                Project.findByIdAndUpdate(ProjectId, {image: fileName}, {new: true, useFindAndModify: false}, (err, ProjectUpdated) => {
                    if(err) return res.status(500).send({message: 'Error uploading image.'});
    
                    if(!ProjectUpdated) return res.status(404).send({message: 'The Project to be updated does not exists.'});
    
                    return res.status(200).send({ProjectUpdated});
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