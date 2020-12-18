const express = require('express');
const Route = express.Router();
Route.use(require('express-fileupload')());
const Jimp = require('jimp');

const Preset = require('./../../../models/Preset');


Route.get('/all', (req, res) => {
  const userId = req.user.userId;

  Preset.findOne({ userId }, (err, preset) => {
    if(!!!preset) { res.json([]); }
    else if(!!!preset.presets) { res.json([]); }
    else { res.json(preset.presets); }
  });
});

Route.get('/:name', async (req, res) => {  
  try{
    const name = req.params.name;
    const userId = req.user.userId;
    const preset = await Preset.findOne({ userId });

    if(!!!preset) { res.json({}); }
    else if(!!!preset.presets) { res.json({}); }
    else { 
      const presetIndx = preset.presets.findIndex(element => name === element.name);
      if(presetIndx > -1) {
        res.json(preset.presets[presetIndx].settings); 
      } 
      else {
        res.json({});
      }
    }
  }
  catch(e){
    console.log(e)
    res.status(500).json( e );
  }
});

Route.post('/set', async (req, res) => {  
  try{
    const userId = req.user.userId;
    let presets = await Preset.findOne({ userId });
    let settings = JSON.parse(req.body.preset);
    let name = req.body.name;

    if(!!!presets) {
      presets = new Preset({
        userId,
        presets: [{ name, settings }]
      });
      await presets.save();
      return res.json(presets);
    }

    const presetIndx = presets.presets.findIndex(element => name === element.name);
    if(presetIndx > -1) {
      presets.presets[presetIndx] = { name, settings };
    } 
    else {
      presets.presets.push({ name, settings });
    }
    
    await presets.save();
    res.json({ name, settings });
  }
  catch(e){
    console.log(e)
    res.status(500).json( e );
  }
});

Route.delete('/:name', async (req, res) => {  
  try{
    const userId = req.user.userId;
    const name = req.params.name;
    let presets = await Preset.findOne({ userId });

    if(!!!presets) {
      res.status(422).json({ message: `Presset ${ name } not found, you cannot delete it` });
    }

    console.log(presets)

    const presetIndx = presets.presets.findIndex(element => name === element.name);
    if(presetIndx > -1) {
      presets.presets.splice(presetIndx, 1);
      await presets.save();
      res.json({ message: 'Deleted' })
    } 
    else {
      res.status(422).json({ message: `Presset ${ name } not found, you cannot delete it` });
    }

  }
  catch(e) {
    console.log(e)
    res.status(500).json( e );
  }
});


module.exports = Route;