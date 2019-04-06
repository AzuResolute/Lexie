const Sequelize = require('sequelize');
const db = require('./database');
const Letter = require('./letter');

const Word = db.define('word', {
    value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    bonus: {
        type: Sequelize.STRING,
        defaultValue: null,
        validate: {
            isIn: [[null, 'Blank', 'Double', 'Triple']]
        }
    },
});

Word.prototype.getInitialValue = function () {
    let letters = this.getLetters();
    this.value = letters.reduce((accum, letter => {
        accum += letter.value;
        return accum;
    },0));
};

Word.prototype.setBonus = function(bonus) {
    let currentBonus = 0;
    switch(this.bonus) {
        case 'Blank':
            currentBonus = 0;
        case null:
            currentBonus = 1;
        case 'Double':
            currentBonus = 2;
        case 'Triple':
            currentBonus = 3;
        default:
            console.log("Error. Check server/db/word.js");
    }

    switch(bonus) {
        case 'Blank':
            this.value = 0;
            this.bonus = bonus;       
        case null:
            this.value = 1 * score/currentBonus;
            this.bonus = bonus;       
        case 'Double':
            this.value = 2 * score/currentBonus;
            this.bonus = bonus;       
        case 'Triple':
            this.value = 3 * score/currentBonus;
            this.bonus = bonus;       
        default:
            console.log("Error. Check server/db/word.js");
    }
}

Letter.belongsTo(Word);
Word.hasMany(Letter);

module.exports = Word;