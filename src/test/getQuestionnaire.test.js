const {findQuestionnaireIfExists} = require('../controller/getDreamControllerById');

describe('Get questionnaire by ID', () => {
  test('Return null on an invalid ID', async () => {
    let questionnaireId = 'notAnId';
    const questionnaireModel = {
      findOne: () => null
    };
    expect(await findQuestionnaireIfExists(questionnaireModel, questionnaireId)).toBeNull();
  });

  test('Returns the questionnaire corresponding to a valid ID', async () => {
    let questionnaireId = 5;
    const questionnaireModel = {
      findOne: (wrapper) => ({
        date: "2022-02-24",
        userId: 1,
        questionnaireId: wrapper.questionnaireId,
        foodAndDrinks: {
          drink: {
            water: "lot",
            sugaryDrink: "many",
            energyDrink: "no",
            caffeineDrink: "few",
            alcohol: "no"
          }
        },
        screenUse: {
          beforeSleep: {
            mobilePhone: true,
            television: false,
            tablet: false,
            computer: true
          },
          throughDay: {
            socialMedia: true,
            videogames: false
          }
        },
        physicalActivity: {
          training: {
            timeHours: 2,
            timeMinutes: 30
          }
        },
        timeManagement: {
          tools: {
            scheduleBook: false,
            app: true,
            notes: false,
            cellphone: true
          }
        },
        sleepManagement: {
          quality: "good",
          sleep: {
            sleepTime: "23:50",
            wakeTime: "07:39"
          }
        }
      })
    };
    expect(
      await findQuestionnaireIfExists(
        questionnaireModel, 
        questionnaireId
      )
    ).toEqual({
      date: "2022-02-24",
      userId: 1,
      questionnaireId: questionnaireId,
      foodAndDrinks: {
        drink: {
          water: "lot",
          sugaryDrink: "many",
          energyDrink: "no",
          caffeineDrink: "few",
          alcohol: "no"
        }
      },
      screenUse: {
        beforeSleep: {
          mobilePhone: true,
          television: false,
          tablet: false,
          computer: true
        },
        throughDay: {
          socialMedia: true,
          videogames: false
        }
      },
      physicalActivity: {
        training: {
          timeHours: 2,
          timeMinutes: 30
        }
      },
      timeManagement: {
        tools: {
          scheduleBook: false,
          app: true,
          notes: false,
          cellphone: true
        }
      },
      sleepManagement: {
        quality: "good",
        sleep: {
          sleepTime: "23:50",
          wakeTime: "07:39"
        }
      }
    })
  });
});