const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dream = new Schema({
    date: {type: Date, required: [true, "date was not provided"]},
    userId: {type: Number, required: [true, "userId was not provided"]},
    foodAndDrinks: {
        drink: {
            water: {type: String, required: [true, "Water field required"], enum: {values: ['no', 'few', 'many', 'lot']}},
            sugaryDrink: {type: String, required: [true, "sugaryDrink field required"], enum: {values: ['no', 'few', 'many', 'lot']}},
            energyDrink: {type: String, required: [true, "energyDrink field required"], enum: {values: ['no', 'few', 'many', 'lot']}},
            caffeineDrink: {type: String, required: [true, "caffeineDrink field required"], enum: {values: ['no', 'few', 'many', 'lot']}},
            alcohol: {type: String, required: [true, "alcohol field required"], enum: {values: ['no', 'few', 'many', 'lot']}}
        }
    },
    screenUse: {
        beforeSleep: {
            mobilePhone: {type: Boolean, required: [true, "mobilePohne info required"]},
            television: {type: Boolean, required: [true, "television info required"]},
            tablet: {type: Boolean, required: [true, "tablet info required"]},
            computer: {type: Boolean, required: [true, "computer info required"]}
        },
        throughDay: {
            socialMedia: {type: Boolean, required: [true, "socialMedia info required"]},
            videogames: {type: Boolean, required: [true, "videogames info required"]}
        }
    },
    physicalActivity: {
        training: {
            timeHours: {type: Number, required: [true, "timeHours required"]},
            timeMinutes: {type: Number, required: [true, "timeMinutes required"]}
        }
    },
    timeManagement: {
        tools: {
            scheduleBook: {type: Boolean, required: [true, "scheduleBook required"]},
            app: {type: Boolean, required: [true, "app required"]},
            notes: {type: Boolean, required: [true, "notes required"]},
            cellphone: {type: Boolean, required: [true, "cellphone required"]}
        }
    },
    sleepManagement: {
        quality: {type: String, required: [true, "quality required"]},
        sleep: {
            sleepTime: {type: String, required: [true, "sleepTime required"]},
            wakeTime: {type: String, required: [true, "wakeTime required"]}
        }
    }
});

module.exports = mongoose.model("Dream", Dream);