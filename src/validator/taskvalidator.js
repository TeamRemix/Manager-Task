export function checkEmptyFields(req, res, next) {
  const titulo = req.body.taskTitle
  const descripcion = req.body.taskDes
  const username = req.body.taskNUser

  if (!titulo || !descripcion || !username) {
    return res.redirect('/home')
  }
  next()
}
