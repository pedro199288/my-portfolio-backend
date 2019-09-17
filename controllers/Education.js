'use strict'

const Education = require('../models/education');
const fs = require('fs');

const controller = {
    // each method is used on a different route
    /**
     * Saves a document on collection
     */
    save: function(req, res) {
        var education = new Education();
        const params = req.body;

        education.key = params.key;
        education.date = params.date;
        education.center = params.center;
        education.name = params.name;
        education.clarification = params.clarification;
        education.link = params.link;

        education.save((err, educationStored) => {
            if(err) return res.status(500).send({message: 'Save error !'});

            if(!educationStored) return res.status(400).send({message: 'Error: the document has not been saved.'});

            return res.status(200).send({education: educationStored});
        });
    },

    /**
     * Gets a document of the collection by its id
     */
    get: function(req, res){
        var educationId = req.params.id;

        if(educationId == null) return res.status(404).send({message: 'There is not id on params'});
    

        Education.findById(educationId, (err, education) => {
            if(err) return res.status(500).send({message: 'Error: Can\'t return education'});

            if(!education) return res.status(404).send({message: 'The education does not exists'});

            return res.status(200).send({ education });
        });
    },

    /**
     * Gets all documents of the collection
     */
    getAll: function (req, res){
        // limit param
        const limit = req.params.limit ? +req.params.limit : null;
        // TODO: hacer el sort y ver como controlar el orden según que fecha hay definida y cual no
        Education.find({}).sort({'date.end': -1}).limit(limit).exec((err, education) => {
            if(err) return res.status(500).send({message: 'Error returning data: ', error: err });

            if(!education) return res.status(404).send({message: 'There are not data to be returned.'});

            // if documents found, order it to put those with empty date at top, and after them thos with just date.start, finally the rest
            const doingNowIndexes = education.findIndex(item =>/*item.date.start == '' &&*/ item.date.end == '');
            console.log(doingNowIndexes, education);
            // slice and put at the begining

            return res.status(200).send({education});
        });
    },

    /**
     * Updates a document of the collection by its id
     */
    update: function(req, res) {
        const educationId = req.params.id;
        const update = req.body;

        Education.findByIdAndUpdate(educationId, update, {new: true, useFindAndModify: false}, (err, educationUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating data.'});

            if(!educationUpdated) return res.status(404).send({message: 'The education to be updated does not exists.'});

            return res.status(200).send({educationUpdated});
        });
    },

    /**
     * Deletes a document of the collection by its id
     */
    delete: function(req, res) {
        const educationId = req.params.id;
        
        Education.findByIdAndDelete(educationId, (err, educationDeleted) => {
            if(err) return res.status(500).send({message: 'Error deleting education'});

            if(!educationDeleted) return res.status(404).send({message: 'Cannot delete this education.'});

            return res.status(200).send({educationDeleted});
        });
    },

}

// Exports the module to be used on routes files
module.exports = controller;