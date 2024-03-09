export function checkEmptyFields(req, res, next) {
  const titulo = req.body.taskTitle
  const descripcion = req.body.taskDes
  const username = req.user.username
  try {
    if (titulo.length == 0 || descripcion.length == 0 || username.length == 0) {
      
      return res.redirect('/home')
      
    }
    
    return next()
  } catch (error) {
    console.log('error')
  }

  
}

export function checkUpdateFiels(req, res, next) {
  const titulo = req.body.taskTitle
  const descripcion = req.body.taskDes
  const username = req.user.username
  const completada = req.body.checkComplete
  try {
    if (titulo === undefined || descripcion === undefined|| username === undefined || completada === undefined) {
      
      return res.redirect('/home')
      
    }
    
     next()
  } catch (error) {
    console.log(`hubo un error ${error}`)
  }

  
}



