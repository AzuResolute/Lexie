const Sequelize = require('sequelize');
const db = require('./database');

const LetterBank = db.define('letterBank', {
    alphabet: {
        type: Sequelize.CHAR,
        primaryKey: true,
        validate: {
            isIn: [['A', 'B', 'C', 'D', 'E',
            'F', 'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ']]
        }
    },
    defValue: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    defAmount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

//ability to load form encoded data

LetterBank.loadFormat = function (format) {
    let letterBankArr = [];
    format.split('/').forEach(letterEncoding => {
        let letterEncodingProp = letterEncoding.split(':');
        letterBankArr.push({
            alphabet: letterEncodingProp[0],
            defValue: letterEncodingProp[1],
            defAmount:letterEncodingProp[2]
        });
    });
    return letterBankArr;
};

module.exports = LetterBank;