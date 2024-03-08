export function checkEmptyFields(req, res, next) {
  const titulo = req.body.taskTitle
  const descripcion = req.body.taskDes
  const username = req.user.username
  try {
    if (titulo.length == 0 || descripcion.length == 0 || username.length == 0) {
      return res.redirect('/home')
    }
  } catch (error) {
    console.log('error')
  }

  next()
}
