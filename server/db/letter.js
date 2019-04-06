const Sequelize = require('sequelize');
const db = require('./database');
const LetterBank = require('./letterBank');

const Letter = db.define('letter', {
    alphabet: {
        type: Sequelize.CHAR,
        allowNull: false,
    },
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
    // isNewlyPlaced: {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: true
    //     // This property will be useful for Phase 3
    // }
});

Letter.createLetter = async function(letterBank) {
    let newLetter = await Letter.create({
        alphabet: letterBank.alphabet,
        value: letterBank.defValue
    });
    return newLetter;
};

Letter.prototype.setBonus = function(bonus) {
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
            console.log("Error. Check server/db/letter.js");
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
            console.log("Error. Check server/db/letter.js");
    }
}

module.exports = Letter;