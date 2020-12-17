const express = require('express');
const Route = express.Router();
Route.use(require('express-fileupload')());
const Jimp = require('jimp');
const fileUpload = require('./../../../middleware/fileUpload');

let origList = [];
let icoList = [];

const bufferToMin = (name, image, mime = image._originalMime) => {
  image.getBuffer(mime, (err, img) => {
    if (err) throw err;
    
    img = Buffer.from(img).toString('base64');
    icoList.push({ img, mime, name });
  });
};

const bufferToOrig = (name, image, mime = image._originalMime) => {
  image.getBuffer(mime, (err, img) => {
    if (err) throw err;
    img = Buffer.from(img).toString('base64');
    origList.push({ img, mime, name, size: [image.bitmap.width, image.bitmap.height] });
  });
};

Route.post('/', fileUpload, (req, res) => {
  origList = [];
  icoList = [];
  
  try{
    req.fileList.forEach( origImg => {
      Jimp.read(origImg.data, (err, image) => {
        if (err) throw err;

        image = image.resize(Jimp.AUTO, 200).quality(60);
        bufferToMin(origImg.name, image);
      });

      Jimp.read(origImg.data, (err, image) => {
        if (err) throw err;       

        image = image.quality(90);
        bufferToOrig(origImg.name, image);
      });
    });
 
    setTimeout(()=>{
      res.json({
        orig: origList,
        ico: icoList
      });
    }, 0);
  }
  catch(e){
    console.log(e)
    res.status(500).json( e );
  }
});


module.exports = Route;