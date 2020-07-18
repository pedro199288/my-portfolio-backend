'use strict'

const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

const controller = {
    // each method is used on a different route
    /**
     * Saves a document on collection
     */
    save: function(req, res) {
        var project = new Project();
        const params = req.body;

        project.key = params.key;
        project.name = params.name;
        project.company = params.company;
        project.tools = params.tools;
        project.website = params.website;
        project.image = params.image;

        project.save((err, projectStored) => {
            if(err) return res.status(500).send({message: 'Save error !'});

            if(!projectStored) return res.status(400).send({message: 'Error: the document has not been saved.'});

            return res.status(200).send({project: projectStored});
        });
    },

    /**
     * Gets a document of the collection by its id
     */
    get: function(req, res){
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: 'There is not id on params'});
    

        Project.findById(projectId, (err, project) => {
            if(err) return res.status(500).send({message: 'Error: Can\'t return project'});

            if(!project) return res.status(404).send({message: 'The project does not exists'});

            return res.status(200).send({ project });
        });
    },

    /**
     * Gets all documents of the collection
     */
    getAll: function (req, res){
        // limit param
        const limit = req.params.limit ? +req.params.limit : null;
        // find and sort by 'order' field
        Project.find({}).sort({'order': 1}).limit(limit).exec((err, projects) => {
            if(err) return res.status(500).send({message: 'Error returning data.'});

            if(!projects) return res.status(404).send({message: 'There are not data to be returned.'});

            return res.status(200).send({projects});
        });
    },

    /**
     * Updates a document of the collection by its id
     */
    update: function(req, res) {
        const projectId = req.params.id;
        const update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new: true, useFindAndModify: false}, (err, projectUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating data.'});

            if(!projectUpdated) return res.status(404).send({message: 'The project to be updated does not exists.'});

            return res.status(200).send({projectUpdated});
        });
    },

    /**
     * Deletes a document of the collection by its id
     */
    delete: function(req, res) {
        const projectId = req.params.id;
        var oldImage = null;

        // check if there was an image before updating, to delete it from the server 
        Project.findById(projectId, 'image', (err, projectToUpdate) => {
            if(projectToUpdate.image)
                oldImage = 'uploads/'+projectToUpdate.image;
        });
        
        Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
            if(err) return res.status(500).send({message: 'Error deleting project'});

            if(!projectDeleted) return res.status(404).send({message: 'Cannot delete this project.'});

            // if everything goes well, delete the old image
            if(oldImage) {
                fs.unlink(oldImage, (err) => {
                    if (err) return res.status(200).send({projectDeleted, message: 'Old image not deleted'});
                });
            }

            return res.status(200).send({projectDeleted});
        });
    },

    /**
     * Uploads an image to Server and adds the image's name to a document by its id.
     */
    uploadImage: function (req, res) {
        const projectId = req.params.id;
        var fileName = 'Image not uploaded';
        var oldImage = null;

        if(req.files){
            const filePath = req.files.image.path;      // gets the file path of the image
            const fileSplit = filePath.split('/');     // splits the file path to get the file name
            const fileName = fileSplit[1];              // gets the file name
            const extSplit = fileName.split('\.');      // splits the file name to get the extension
            const fileExt = extSplit[1].toLowerCase();                // gets the extensions to check it after

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                // Update the document
                
                // check if there was an image before updating, to delete it from the server 
                Project.findById(projectId, 'image', (err, projectToUpdate) => {
                    if(projectToUpdate.image)
                        oldImage = 'uploads/'+projectToUpdate.image;
                });

                // Update the image of the project
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true, useFindAndModify: false}, (err, projectUpdated) => {
                    if(err) return res.status(500).send({message: 'Error uploading image.'});
    
                    if(!projectUpdated) return res.status(404).send({message: 'The project to be updated does not exists.'});

                    // if everything goes well, delete the old image
                    if(oldImage) {
                        fs.unlink(oldImage, (err) => {
                            if (err) return res.status(200).send({projectUpdated, message: 'Old image not deleted'});
                        });
                    }

                    // return success response
                    return res.status(200).send({projectUpdated});
    
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
    },

    getImage: function (req, res) {
        const image = req.params.image;
        const image_path = './uploads/'+image;

        fs.exists(image_path, (exists) => { 
            if(exists){
                return res.sendFile(path.resolve(image_path));
            } else {
                return res.status(200).send({message: "The image does not exists."});
            }
        });
    }

}

// Exports the module to be used on routes files
module.exports = controller;