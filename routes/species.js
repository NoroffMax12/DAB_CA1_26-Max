var express = require('express');
var router = express.Router();
const { Species, Animal } = require('../models');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// GET all species
router.get('/', async (req, res, next) => {
    try {
        const species = await Species.findAll();
        res.render('Species', {species})
    } catch (err) {
        next(err);
    }
});

// POST add new species:
router.post('/add', isAuthenticated, isAdmin, async function (req, res, next) {
try {
    console.log('Request body:', req.body);
    const { name } = req.body;
    await Species.create({ name });

    res.redirect('/species');
    } catch (error) {
    next(error);
    }    
});

//POST update Species:
router.post('/update/:id', isAuthenticated, isAdmin, async function (req, res, next) {
    try {
        const {id} = req.params;
        const {name} = req.body;

        await Species.update({ name }, { where: { id }});

        res.json({success: true, message: 'Species updated successfully'})
    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
});

//POST delete species:
router.post('/delete/:id', isAuthenticated, isAdmin, async function (req, res, next) {
  try {
    const speciesId = req.params.id;
    const animalCount = await Animal.count({ where: {speciesId}});

    if(animalCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete species with existing animals'
      });
    }

    await Species.destroy({where: {id: speciesId}});
    
    return res.json({ success: true, message: 'Species deleted successfully'});
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;