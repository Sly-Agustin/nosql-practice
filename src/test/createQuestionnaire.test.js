const {createQuestionnaire} = require('../controller/createQuestionnaireController');

describe('Creation of a new questionnaire', () => {
  test('Trying to create a questionnaire with invalid data, should return errors', async () => {
    const invalidObject = {
      "date": "2022-02-14",
      "userId": 1,
      "foodAndDrinks": {
        "drink": {
          "water": "lot",
          "sugaryDrink": "many",
          "energyDrink": "no",
          "caffeineDrink": "few",
          "alcohol": "no"
        }
      },
    };
    const InvalidQuestionnaire = class{
      validateSync(){
        return {
          errors: {
            mockedError: {
              message: "bad request"
            }
          }
        };
      }
    };
    expect(await createQuestionnaire(InvalidQuestionnaire, invalidObject)).toEqual({
      errors: {
        "mockedError": "bad request"
      }
    });
  });

  test('given a valid input it should return the new quiestionnaire', async () => {
    const validData = {
      "date": "2022-02-14",
      "userId": 1,
      "foodAndDrinks": {
        "drink": {
          "water": "lot",
          "sugaryDrink": "many",
          "energyDrink": "no",
          "caffeineDrink": "few",
          "alcohol": "no"
        }
      },
      "screenUse": {
        "beforeSleep": {
          "mobilePhone": true,
          "television": false,
          "tablet": false,
          "computer": true
        },
        "throughDay": {
          "socialMedia": true,
          "videogames": false
        }
      },
      "physicalActivity": {
        "training": {
          "timeHours": 2,
          "timeMinutes": 30
        }
      },
      "timeManagement": {
        "tools": {
          "scheduleBook": false,
          "app": true,
          "notes": false,
          "cellphone": true
        }
      },
      "sleepManagement": {
        "quality": "good",
        "sleep": {
          "sleepTime": "23:50",
          "wakeTime": "07:39"
        }
      }
    }
    
    const ValidQuestionnaire = class{
      constructor(validData){
          this.data = {...validData};
          this.data._id = "621660144fdfe4d849076a8a";
      }
      validateSync(){
          return undefined;
      }
      save(){
          return this.data;
      }
    };

    expect(await createQuestionnaire(ValidQuestionnaire, validData)).toEqual({
      data: {
        "date": "2022-02-14",
        "userId": 1,
        "foodAndDrinks": {
          "drink": {
            "water": "lot",
            "sugaryDrink": "many",
            "energyDrink": "no",
            "caffeineDrink": "few",
            "alcohol": "no"
          }
        },
        "screenUse": {
          "beforeSleep": {
            "mobilePhone": true,
            "television": false,
            "tablet": false,
            "computer": true
          },
          "throughDay": {
            "socialMedia": true,
            "videogames": false
          }
        },
        "physicalActivity": {
          "training": {
            "timeHours": 2,
            "timeMinutes": 30
          }
        },
        "timeManagement": {
          "tools": {
            "scheduleBook": false,
            "app": true,
            "notes": false,
            "cellphone": true
          }
        },
        "sleepManagement": {
          "quality": "good",
          "sleep": {
            "sleepTime": "23:50",
            "wakeTime": "07:39"
          }
        },
        _id: "621660144fdfe4d849076a8a"
      }
    });
  })
});