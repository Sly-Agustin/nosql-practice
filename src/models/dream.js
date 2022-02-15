const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dream = new Schema({
    date: {type: Date, required: [true, "date was not provided"]},
    userId: {
        type: Number,
        min: [0, 'Minimun User ID is 0'], 
        required: [true, "userId was not provided"],
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    foodAndDrinks: {
        drink: {
            water: {
                type: String, 
                required: [true, "Water field required"], 
                enum: {values: ['no', 'few', 'many', 'lot'], message: 'Invalid water value, "{VALUE}" is not supported'}
            },
            sugaryDrink: {
                type: String, 
                required: [true, "sugaryDrink field required"], 
                enum: {values: ['no', 'few', 'many', 'lot'], message: 'Invalid sugaryDrink value, "{VALUE}" is not supported'}
            },
            energyDrink: {
                type: String, 
                required: [true, "energyDrink field required"], 
                enum: {values: ['no', 'few', 'many', 'lot'], message: 'Invalid energyDrink value, "{VALUE}" is not supported'}
            },
            caffeineDrink: {
                type: String, 
                required: [true, "caffeineDrink field required"], 
                enum: {values: ['no', 'few', 'many', 'lot'], message: 'Invalid caffeineDrink value, "{VALUE}" is not supported'}
            },
            alcohol: {
                type: String, 
                required: [true, "alcohol field required"], 
                enum: {values: ['no', 'few', 'many', 'lot'], message: 'Invalid alcohol value, "{VALUE}" is not supported'}
            }
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
            timeHours: {
                type: Number, 
                required: [true, "timeHours required"],
                min: [1, "Hours must be larger or equal than 1"],
                max: [23, "Hours must be lesser than 24"]
            },
            timeMinutes: {
                type: Number, 
                required: [true, "timeMinutes required"], 
                min: [0, "Minutes must be larger or equal than 0"],
                max: [59, "Minutes must be lesser than 60"]
            }
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
        quality: {
            type: String, 
            required: [true, "quality required"], 
            enum: {values: ['bad', 'regular', 'good', 'veryGood'], message: 'Invalid quality value, "{VALUE}" is not supported'}
        },
        sleep: {
            sleepTime: {
                type: String, 
                required: [true, "sleepTime required"],
                match: [/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'sleepTime not valid']
            },
            wakeTime: {
                type: String, 
                required: [true, "wakeTime required"],
                match: [/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, 'sleepTime not valid']
            }
        }
    }
});

module.exports = mongoose.model("Dream", Dream);