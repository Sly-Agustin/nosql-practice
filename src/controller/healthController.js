const mongoose = require('mongoose');

export const getHealthController = async (req, res) => {
  try {
    if(mongoose.connection.readyState==1){
      res.status(200).json({ data: "Health connected to database" });
    }
    else{
      res.status(500).json({ error: "Connection to database was not established"})
    }
  } catch (err) {
    res.status(500).json({ message: 'Could not connect to database' });
  }
};