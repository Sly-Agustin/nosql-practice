const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dream = new Schema({
    date: Date,
    userId: Number,
    foodAndDrinks: {
        food: {
            water: String,
            sugaryDrink: String,
            energyDrink: String,
            caffeineDrink: String,
            alcohol: String
        }
    },
    screenUse: {
        beforeSleep: {
            mobilePhone: Boolean,
            television: Boolean,
            tablet: Boolean,
            computer: Boolean
        },
        throughDay: {
            socialMedia: Boolean,
            videogames: Boolean
        }
    },
    physicalActivity: {
        training: {
            timeHours: Number,
            timeMinutes: Number
        }
    },
    timeManagement: {
        type: {
            scheduleBook: Boolean,
            app: Boolean,
            notes: Boolean,
            cellphone: Boolean
        }
    },
    sleepManagement: {
        quality: String,
        sleep: {
            sleepTime: String,
            wakeTime: String
        }
    }
});

module.exports = mongoose.model("Dream", Dream);