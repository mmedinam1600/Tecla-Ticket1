
const login = (req, res) => {
  res.status(200).json({ login: "OK"});
}

const register = (req, res) => {
  res.status(200).send("register");
}


module.exports = {
  login,
  register
}