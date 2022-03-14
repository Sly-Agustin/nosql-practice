const mongoose = require('mongoose');

export const getHealthController = async (req, res) => {

  if(mongoose.STATES[mongoose.connection.readyState] == "connected"){
    res.status(200).json({ data: "Health connected to database" });
  }
  else{
    res.status(500).json({ error: "Connection to database was not established"})
  }
};