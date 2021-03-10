
const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals.json');

// GET & POST routes
router.get('/animals', (req, res) => {
    let results = animals;
    // takes req.query as argument and filters thru the animals accordingly, returning a new filtered arr
    if (req.query) {
        // call the filterByQuery() pass req.query and results as argument
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
        console.log('this find by id is working')
    }
});

router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    }
    else {
        // create animal 
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;