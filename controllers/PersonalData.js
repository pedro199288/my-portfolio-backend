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

}

// Exports the module to be used on routes files
module.exports = controller;