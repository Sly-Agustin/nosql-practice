import Dream from '../models/dream';
const mongoose = require('mongoose');

function createSchema(body) {
  const newDream = new Dream({
    date: body.date,
    userId: body.userId,
    foodAndDrinks: {
      drink: {
        water: body.foodAndDrinks.drink.water,
        sugaryDrink: body.foodAndDrinks.drink.sugaryDrink,
        energyDrink: body.foodAndDrinks.drink.energyDrink,
        caffeineDrink: body.foodAndDrinks.drink.caffeineDrink,
        alcohol: body.foodAndDrinks.drink.alcohol
      }
    },
    screenUse: {
      beforeSleep: {
        mobilePhone: body.screenUse.beforeSleep.mobilePhone,
        television: body.screenUse.beforeSleep.television,
        tablet: body.screenUse.beforeSleep.tablet,
        computer: body.screenUse.beforeSleep.computer
      },
      throughDay: {
        socialMedia: body.screenUse.throughDay.socialMedia,
        videogames: body.screenUse.throughDay.videogames
      }
    },
    physicalActivity: {
      training: {
        timeHours: body.physicalActivity.training.timeHours,
        timeMinutes: body.physicalActivity.training.timeMinutes
      }
    },
    timeManagement: {
      tools: {
        scheduleBook: body.timeManagement.tools.scheduleBook,
        app: body.timeManagement.tools.app,
        notes: body.timeManagement.tools.notes,
        cellphone: body.timeManagement.tools.cellphone
      }
    },
    sleepManagement: {
      quality: body.sleepManagement.quality,
      sleep: {
        sleepTime: body.sleepManagement.sleep.sleepTime,
        wakeTime: body.sleepManagement.sleep.wakeTime
      }
    }
  });
  return newDream;
}

export const createQuestionnaireController = async (req, res) => {
    try {
      const { body } = req;
      const credentials = process.env.MONGODB_URL;
      await mongoose.connect(credentials);

      const newDream = createSchema(body);
      await newDream.save();
      res.status(200).json({ message: "Data received and stored succesfully" });
    } catch (err) {
      res.status(500).json({ 
        message: 'Internal server error', 
        error: err
      });
    }
  };