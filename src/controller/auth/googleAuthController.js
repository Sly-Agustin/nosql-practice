function googleAuthServiceCallback(req, res, next){
  req.body.name=req.session.passport.user.name;
  next();
}

export {googleAuthServiceCallback}