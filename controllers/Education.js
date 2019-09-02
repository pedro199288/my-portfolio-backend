'use strict'

const Education = require('../models/Education');
const fs = require('fs');

const controller = {
    // each method is used on a different route
    /**
     * Saves a document on collection
     */
    save: function(req, res) {
        var Education = new Education();
        const params = req.body;

        Education.key = params.key;
        Education.date.start = params.start;
        Education.date.end = params.end;
        Education.center = params.center;
        Education.name = params.name;
        Education.clarification = params.clarification;
        Education.link = params.link;

        Education.save((err, EducationStored) => {
            if(err) return res.status(500).send({message: 'Save error !'});

            if(!EducationStored) return res.status(400).send({message: 'Error: the document has not been saved.'});

            return res.status(200).send({Education: EducationStored});
        });
    },

    /**
     * Gets a document of the collection by its id
     */
    get: function(req, res){
        var EducationId = req.params.id;

        if(EducationId == null) return res.status(404).send({message: 'There is not id on params'});
    

        Education.findById(EducationId, (err, Education) => {
            if(err) return res.status(500).send({message: 'Error: Can\'t return Education'});

            if(!Education) return res.status(404).send({message: 'The Education does not exists'});

            return res.status(200).send({ Education });
        });
    },

    /**
     * Gets all documents of the collection
     */
    getAll: function (req, res){
        Education.find({}).exec((err, Education) => {
            if(err) return res.status(500).send({message: 'Error returning data.'});

            if(!Education) return res.status(404).send({message: 'There are not data to be returned.'});

            return res.status(200).send({Education});
        });
    },

    /**
     * Updates a document of the collection by its id
     */
    update: function(req, res) {
        const EducationId = req.params.id;
        const update = req.body;

        Education.findByIdAndUpdate(EducationId, update, {new: true, useFindAndModify: false}, (err, EducationUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating data.'});

            if(!EducationUpdated) return res.status(404).send({message: 'The Education to be updated does not exists.'});

            return res.status(200).send({EducationUpdated});
        });
    },

    /**
     * Deletes a document of the collection by its id
     */
    delete: function(req, res) {
        const EducationId = req.params.id;
        
        Education.findByIdAndDelete(EducationId, (err, EducationDeleted) => {
            if(err) return res.status(500).send({message: 'Error deleting Education'});

            if(!EducationDeleted) return res.status(404).send({message: 'Cannot delete this Education.'});

            return res.status(200).send({EducationDeleted});
        });
    },

}

// Exports the module to be used on routes files
module.exports = controller;