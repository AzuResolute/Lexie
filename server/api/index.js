const router = require('express').Router();
const Letter = require('../db/letter');
const LetterBank = require('../db/letterBank');
const Word = require('../db/word');

// GetLetterBank
router.get('/letterBank/', async (request, response, next) => {
  try {
    const letterBank = await LetterBank.findAll();
    response.status(200).send(letterBank);
  }
  catch (error) {
    response.status(200).send(error);
  }
});

// Get Outstanding Letters
router.get('/createWord/', async (request, response, next) => {
  try {
    const outstanding = await Letter.findAll({where: {wordId: null}});
    response.status(200).send(outstanding);
  }
  catch (error) {
    response.status(500).send(error);
  }
})

// Create Letter  
router.post('/createWord/:alphabet', async (request, response, next) => {
  try {
    let alpha = await LetterBank.find({where: {
      alphabet: request.params.alphabet
    }});
    let newLetter = await Letter.create({
      alphabet: alpha.alphabet[0],
      value: alpha.defValue,
      /* amount: alpha.defAmount */
    });
    response.status(200).send(newLetter);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

//Update Bonus on Letter
router.put('/updateWord/:letterId', async (request, response, next) => {
  try {
    let currentLetter = await Letter.findById(request.params.letterId);
    let updatedBonus = await currentLetter.setBonus(request.body.bonus);
    response.status(201).send(updatedBonus);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

//Create Word
router.post('/finalizeWord/', async (request, response, next) => {
  try {
    let newWord = await Word.create({});
    let inputLetters = await Letter.findAll(request.body);
    await inputLetters.update({
      wordId: newWord.id
    });
    await newWord.getInitialValue();
    response.status(200).send(newWord);
  }
  catch (error) {
    response.status(500).send(error);
  }
});

//Update Bonus on Word Score
router.put('/finalizeWord/:wordId', async (request, response, next) => {
  try {
    let updateWord = await Word.findOne(request.params.wordId);
    await updateWord.setBonus(request.body);
    response.status(200).send(updateWord);
  }
  catch (error) { 
    response.status(500).send(error);
  }
})

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
});

module.exports = router