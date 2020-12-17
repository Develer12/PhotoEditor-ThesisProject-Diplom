const express = require('express');
const Route = express.Router();
Route.use(require('express-fileupload')());
const Jimp = require('jimp');

const Preset = require('./../../../models/Preset');

Route.get('/', async (req, res) => {  
  try{
    const userId = req.user.userId;
    const preset = await Preset.findOne({ userId });

    if(!!!preset) { res.json([]); }
    else if(!!!preset.presets) { res.json([]); }
    else { res.json(preset.presets); }
  }
  catch(e){
    console.log(e)
    res.status(500).json( e );
  }
});


Route.post('/', async (req, res) => {  
  try{
    const userId = req.user.userId;
    let presets = await Preset.findOne({ userId });
    let settings = req.body.preset;
    let name = req.body.preset;
    console.log(presets)
    
    if(!!!presets) {
      presets = new Preset({
        userId,
        presets: [{ name, settings }]
      });
      //await presets.save();
      res.json(presets);
    }


    const presetIndx = presets.presets.findIndex(element => name === element.name);
    if(presetIndx > -1) {
      presets.presets[presetIndx] = { name, settings };
      //await presets.save();
    } 
    else {
      presets.presets.push({ name, settings });
      //await presets.save();
    }

    res.json(presets);
  }
  catch(e){
    console.log(e)
    res.status(500).json( e );
  }
});


//Edit Photo with preset
Route.put('/', (req, res) => {  
  try{
    req.body = JSON.parse(req.body.file);
    let filter = req.body.filter;
    let origImg = Buffer.from(req.body.pic.img, 'base64');

    Jimp.read(origImg, (err, image) => {
      if (err) throw err; 
      
      let mime = image._originalMime;

      if(!!filter) {
        switch (filter) {
          case 'Sepia':
            image = image.sepia(); break;
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
      
      image.getBuffer(mime, (err, img) => {
        if (err) throw err;
          
        img = Buffer.from(img).toString('base64');
        req.body.pic.size = [image.bitmap.width, image.bitmap.height];
        req.body.pic.img = img;
        res.json(req.body.pic);
      });
    });
  }
  catch(e){
    console.log(e)
    res.status(500).json( e );
  }
});


module.exports = Route;