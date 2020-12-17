const config = require('config');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    if(req.files){
      const files = req.files.files.length == undefined ? [req.files.files] : req.files.files;
      req.fileList = [];

      files.forEach(file => {
        req.fileList.push(file);
        /*
        file[i].mv('./upload/'+file[i].name, function (err){
          if(err){
            res.status(401).json({ message: err });
          }
        });
        */
      });
    }

    next();
  } 
  catch (e) {
    res.status(500).json({ e ,message: 'File upload error' });
  }
}
