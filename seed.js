const {db} = require('./server/db')
const {green, red} = require('chalk')
const LetterBank = require('./server/db/letterBank');
const Letter = require('./server/db/letter');
const Word = require('./server/db/word');

const AmericanScrabbleFormat = "A:1:9/B:3:2/C:3:2/D:2:4/E:1:12/F:4:2/G:2:3/H:4:2/I:1:9/J:8:1/K:5:1/L:1:4/M:3:2/N:1:6/O:1:8/P:3:2/Q:10:1/R:1:6/S:1:4/T:1:6/U:1:4/V:4:2/W:4:2/X:8:1/Y:4:2/Z:10:1/ :0:2";
const StartingWord = "FOOBAZ";

const seed = async () => {
    await db.sync({force: true});

    const selectedFormat = LetterBank.loadFormat(AmericanScrabbleFormat);
    const startingLetters = StartingWord.split('');

    for(let i = 0; i < selectedFormat.length; i++) {
      await LetterBank.create(selectedFormat[i]);
    };

    for(let i = 0; i < startingLetters.length; i++) {
      let alpha = await LetterBank.findOne({where:{ alphabet: startingLetters[i] }});
      await Letter.create({
        alphabet: alpha.alphabet,
        value: alpha.defValue,
        /* amount: alpha.defAmount */
      });
    };

    
    

  console.log(green('Seeding success!'))
  await db.close()
}

seed()
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
    db.close()
  })
