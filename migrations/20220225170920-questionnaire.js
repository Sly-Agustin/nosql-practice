module.exports = {
  async up(db, client) {
    const questionnaires = await db.collection('dreams').find({}).toArray();
    const operations = questionnaires.map((questionnaire) => {
      return db.collection('dreams').updateOne({ newAttribute: questionnaire.newAttribute }, {
        $set: {
          newAttribute: "im a new attribute across all documents"
        }
      })          
    })
    return Promise.all(operations);
  },

  async down(db, client) {
    const questionnaires = await db.collection('dreams').find({}).toArray();
    const operations = questionnaires.map((questionnaire) => {
      return db.collection('dreams').updateOne({ newAttribute: questionnaire.newAttribute }, {
        $unset: {
          newAttribute: ""
        }
      })          
    })
    return Promise.all(operations);
  }
};
