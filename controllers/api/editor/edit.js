const express = require('express');
const Route = express.Router();
Route.use(require('express-fileupload')());
const Jimp = require('jimp');
const fileUpload = require('../../../middleware/fileUpload');

let editedList = [];

Route.put('/', (req, res) => {  
  try{
    console.log(req.body)
    let file = JSON.parse(req.body.file);
    let settings = req.body;
    delete settings['file'];
    let origImg = Buffer.from(file.data, 'base64');
    settings = !!settings['settings']? settings['settings'] : settings;
    Jimp.read(origImg, (err, image) => {
      if (err) throw err; 
      
      let mime = image._originalMime;

      for (let key in settings) {
        if (settings.hasOwnProperty(key)) {
          let value = Number(settings[key]);
          if(value !== 0) {
            //console.log(`${key}: ${value}`)
            switch (key) {
              case 'Exposition':
                image = image.brightness(value); break;
              case 'Сontrast':
                image = image.contrast(value); break;
              case 'Highlights':
                image = image.color([{ apply: 'brighten', params: [value] }]); break;
              case 'Shadows':
                image = image.color([{ apply: 'darken', params: [value] }]); break;
              case 'Desaturate':
                image = image.color([{ apply: 'desaturate', params: [value] }]); break;
              case 'Saturation':
                image = image.color([{ apply: 'saturate', params: [value] }]); break;
              case 'Tint':
                image = image.color([{ apply: 'shade', params: [value] }]); break;
              case 'Shade':
                image = image.color([{ apply: 'lighten', params: [value] }]); break;
              default: break;
            }
          }
        }
      }
      
      image.getBuffer(mime, (err, img) => {
        if (err) throw err;
          
        img = Buffer.from(img).toString('base64');
        res.json({ 
          img, 
          mime, 
          name: file.name,
          size: [image.bitmap.width, image.bitmap.height]
        });
      });
    });
    console.log('edit end')
  }
  catch(e){
    console.log(e)
    res.status(500).json( e );
  }
});


module.exports = Route;