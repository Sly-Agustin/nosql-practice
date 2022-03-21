function googleAuthServiceCallback(req, res, next){
  console.log("Entering function after authenticate, in callback");
  console.log("req.body in callback: "+JSON.stringify(req.body));
  console.log("req.session in callback: "+JSON.stringify(req.session));
  req.body.name=req.session.passport.user.name;
  next();
}

function test(req, res){
  console.log("Entering function test");
  console.log("req.body in callback: "+JSON.stringify(req.body));
  console.log("req.session in callback: "+JSON.stringify(req.session));
  res.status(200).json({message: "Yeh, that works"});
}

export {googleAuthServiceCallback, test}