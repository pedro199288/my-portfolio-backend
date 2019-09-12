'use strict'

const Skill = require('../models/Skill');
const fs = require('fs');

const controller = {
    // each method is used on a different route
    /**
     * Saves a document on collection
     */
    save: function(req, res) {
        var skill = new Skill();
        const params = req.body;

        skill.key = params.key;
        skill.text = params.text;
        skill.value = params.value;

        skill.save((err, skillStored) => {
            if(err) return res.status(500).send({message: 'Save error !'});

            if(!skillStored) return res.status(400).send({message: 'Error: the document has not been saved.'});

            return res.status(200).send({skill: skillStored});
        });
    },

    /**
     * Gets a document of the collection by its id
     */
    get: function(req, res){
        var skillId = req.params.id;

        if(skillId == null) return res.status(404).send({message: 'There is not id on params'});
    

        Skill.findById(skillId, (err, skill) => {
            if(err) return res.status(500).send({message: 'Error: Can\'t return skill'});

            if(!skill) return res.status(404).send({message: 'The skill does not exists'});

            return res.status(200).send({ skill });
        });
    },

    /**
     * Gets all documents of the collection
     */
    getAll: function (req, res){
        Skill.find({}).exec((err, skills) => {
            if(err) return res.status(500).send({message: 'Error returning data.'});

            if(!skills) return res.status(404).send({message: 'There are not data to be returned.'});

            return res.status(200).send({skills : skills});
        });
    },

    /**
     * Updates a document of the collection by its id
     */
    update: function(req, res) {
        const skillId = req.params.id;
        const update = req.body;

        Skill.findByIdAndUpdate(skillId, update, {new: true, useFindAndModify: false}, (err, skillUpdated) => {
            if(err) return res.status(500).send({message: 'Error updating data.'});

            if(!skillUpdated) return res.status(404).send({message: 'The skill to be updated does not exists.'});

            return res.status(200).send({skillUpdated});
        });
    },

    /**
     * Deletes a document of the collection by its id
     */
    delete: function(req, res) {
        const skillId = req.params.id;
        
        Skill.findByIdAndDelete(skillId, (err, skillDeleted) => {
            if(err) return res.status(500).send({message: 'Error deleting skill'});

            if(!skillDeleted) return res.status(404).send({message: 'Cannot delete this skill.'});

            return res.status(200).send({skillDeleted});
        });
    },
}

// Exports the module to be used on routes files
module.exports = controller;