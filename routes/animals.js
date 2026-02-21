var express = require('express');
var router = express.Router();
const { Animal, Species, Size, Temperament, Adoption, User, sequelize } = require('../models');
const { isAuthenticated, isMember, isAdmin } = require('../middleware/auth');

/* GET all animals */
router.get('/', async function (req, res, next) {
  try {
    const animals = await Animal.findAll({
      include: [
        { model: Species, attributes: ['name'] },
        { model: Size, attributes: ['name'] },
        { model: Temperament, attributes: ['name'] },
        { model: Adoption, attributes: ['id'] }
      ]
    });

    // Calculate age and format data
    const formattedAnimals = animals.map(animal => {
      const birthday = new Date(animal.birthday);
      const today = new Date();
      const age = today.getFullYear() - birthday.getFullYear();
      
      return {
        Id: animal.id,
        Name: animal.name,
        Species: animal.Species.name,
        Birthday: animal.birthday,
        Temperament: animal.Temperaments.map(t => t.name).join(', '),
        Size: animal.Size.name,
        Age: age,
        Adopted: animal.Adoption ? true : false
      };
    });

    res.render('animals', { animals: formattedAnimals });
  } catch (error) {
    next(error);
  }
});

/* POST adopt animal */
router.post('/adopt/:id', isAuthenticated, isMember, async function (req, res, next) {
  try {
    const animalId = req.params.id;
    
    const existingAdoption = await Adoption.findOne({ where: { animalId } });
    if (existingAdoption) {
      return res.status(400).json({ success: false, message: 'Animal already adopted' });
    }

    await Adoption.create({
      animalId: animalId,
      userId: req.user.id
    });

    res.json({ success: true, message: 'Animal adopted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* POST cancel adoption */
router.post('/cancel-adoption/:id', isAuthenticated, isAdmin, async function (req, res, next) {
  try {
    const animalId = req.params.id;
    
    const result = await Adoption.destroy({ where: { animalId } });
    
    if (result === 0) {
      return res.status(404).json({ success: false, message: 'Adoption not found' });
    }

    res.json({ success: true, message: 'Adoption cancelled successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* GET all adoption details */
router.get('/query/adoption-details', async function (req, res, next) {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        a.id as Id,
        a.name as Name,
        s.name as Species,
        a.birthday as Birthday,
        sz.name as Size,
        u.fullName as AdoptedBy,
        ad.adoptionDate as AdoptionDate
      FROM animals a
      INNER JOIN adoptions ad ON a.id = ad.animalId
      INNER JOIN users u ON ad.userId = u.id
      INNER JOIN species s ON a.speciesId = s.id
      INNER JOIN sizes sz ON a.sizeId = sz.id
    `);

    res.json(results);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* GET animals by age */
router.get('/query/by-age', async function (req, res, next) {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        a.id as Id,
        a.name as Name,
        s.name as Species,
        a.birthday as Birthday,
        sz.name as Size,
        TIMESTAMPDIFF(YEAR, a.birthday, CURDATE()) as Age
      FROM animals a
      INNER JOIN species s ON a.speciesId = s.id
      INNER JOIN sizes sz ON a.sizeId = sz.id
      ORDER BY Age DESC
    `);

    res.json(results);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* GET animals by date range */
router.get('/query/by-date-range', async function (req, res, next) {
  try {
    const { startDate, endDate } = req.query;
    
    const [results] = await sequelize.query(`
      SELECT 
        a.id as Id,
        a.name as Name,
        s.name as Species,
        a.birthday as Birthday,
        sz.name as Size
      FROM animals a
      INNER JOIN species s ON a.speciesId = s.id
      INNER JOIN sizes sz ON a.sizeId = sz.id
      WHERE a.birthday BETWEEN ? AND ?
    `, {
      replacements: [startDate, endDate]
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/* GET count by size (admin only) */
router.get('/query/count-by-size', isAdmin, async function (req, res, next) {
  try {
    const [results] = await sequelize.query(`
      SELECT 
        sz.name as Size,
        COUNT(a.id) as Count
      FROM animals a
      INNER JOIN sizes sz ON a.sizeId = sz.id
      GROUP BY sz.name
    `);

    res.json(results);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;