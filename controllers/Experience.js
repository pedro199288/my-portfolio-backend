'use strict'

const Experience = require('../models/experience');
const fs = require('fs');

const controller = {
    // each method is used on a different route
    /**
     * Saves a document on collection
     */
    save: function(req, res) {
        var experience = new Experience();
        const params = req.body;

        experience.key = params.key;
        experience.date = params.date;
        experience.company = params.company;
        experience.rol = params.rol;
        experience.description = params.description;

        experience.save((err, experienceStored) => {
            if(err) return res.status(500).send({message: 'Save error !'});

            if(!experienceStored) return res.status(400).send({message: 'Error: the document has not been saved.'});

            return res.status(200).send({experience: experienceStored});
        });
    },

    /**
     * Gets a document of the collection by its id
     */
    get: function(req, res){
        var experienceId = req.params.id;

        if(experienceId == null) return res.status(404).send({message: 'There is not id on params'});
    

        Experience.findById(experienceId, (err, experience) => {
            if(err) return res.status(500).send({message: 'Error: Can\'t return experience'});

            if(!experience) return res.status(404).send({message: 'The experience does not exists'});

            return res.status(200).send({ experience });
        });
    },

    /**
     * Gets all documents of the collection
     */
    getAll: function (req, res){
        // limit param
        const limit = req.params.limit ? +req.params.limit : null;
        // TODO: hacer el sort y ver como controlar el orden según que fecha hay definida y cual no
        Experience.find({}).sort({'date': -1}).limit(limit).exec((err, experience) => {
            if(err) return res.status(500).send({message: 'Error returning data.'});

            if(!experience) return res.status(404).send({message: 'There are not data to be returned.'});

            return res.status(200).send({experience});
        });
    },

    /**
     * Updates a document of the collection by its id
     */
    update: function(req, res) {
        const experienceId = req.params.id;
        const update = req.body;

        Experience.findByIdAndUpdate(experienceId, update, {new: true, useFindAndModify: false}, (err, experienceUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating data.'});

            if(!experienceUpdated) return res.status(404).send({message: 'The experience to be updated does not exists.'});

            return res.status(200).send({experienceUpdated});
        });
    },

    /**
     * Deletes a document of the collection by its id
     */
    delete: function(req, res) {
        const experienceId = req.params.id;
        
        Experience.findByIdAndDelete(experienceId, (err, experienceDeleted) => {
            if(err) return res.status(500).send({message: 'Error deleting experience'});

            if(!experienceDeleted) return res.status(404).send({message: 'Cannot delete this experience.'});

            return res.status(200).send({experienceDeleted});
        });
    },

}

// Exports the module to be used on routes files
module.exports = controller;