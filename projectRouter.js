const express = require('express');
const bodyParser = require('body-parser');
const { Projects } = require('./models');
const projectRouter = express.Router();

projectRouter.use(bodyParser.urlencoded({
  extended: true
}));
projectRouter.use(bodyParser.json());

projectRouter.get('/', (req, res) => {
  console.log('get request')
  Projects
    .find()
    .exec()
    .then(projects => res.json(projects))
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
      });
});

projectRouter.get('/:projectId', (req, res) => {
  console.log('get project by id')
  Projects
    .findById(req.params.projectId)
    .exec()
    .then(project => res.json(project))
    .catch(err => {
        console.error(err);
        res.status(404).json({message: 'Project Not Found'});
      });
});

projectRouter.post('/', (req, res) => {
  console.log(req.body)
  Projects
    .create({
      name: req.body.name,
      boardSpecs: req.body.boardSpecs,
      modules: req.body.modules,
      moduleBank: req.body.moduleBank
    })
  .then(project => res.status(201).json(project))
  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

projectRouter.put('/:projectId', (req, res) => {
  console.log(req.body)
  const toUpdate = {
    name: req.body.projectName,
    boardSpecs: req.body.boardSpecs,
    modules: req.body.modules,
    boardModules: req.body.boardModules
  }
  console.log(toUpdate)
  Projects
    .findByIdAndUpdate(req.params.projectId, {$set: toUpdate})
    .exec()
    .then(project => res.status(204).end())
    .catch(err => 
      res.status(500).json({message: 'Internal server error'})
    );
});

projectRouter.delete('/:projectId', (req, res) => {
  Projects
    .findByIdAndRemove(req.params.projectId)
    .exec()
    .then(project => res.status(204).json(project))
    .catch(err => res.status(404).json({message: 'Not Found'}));
});

module.exports = projectRouter;

/*
{
   "_id": "58c5b9bd3d1e06084fe05e24",
   "name": "asdf",
   "__v": 0,
   "modules": [
     {
       "height": 50,
       "width": 50,
       "x": 25,
       "y": 25,
       "onBoard": true,
       "image": "http://i68.tinypic.com/24oouoj.png",
       "id": 0,
       "_id": "58c330a771284629ecef4132"
     },
     {
       "height": 50,
       "width": 50,
       "x": 125,
       "y": 125,
       "onBoard": true,
       "image": "http://i65.tinypic.com/s4s0ah.png",
       "id": 1,
       "_id": "58c330a771284629ecef4131"
     }
   ],
   "boardSpecs": {
     "x": 50,
     "y": 50,
     "height": 300,
     "width": 500
   },
   
    "moduleBank": [
    {
       "height": 50,
       "width": 50,

       "onBoard": true,
       "image": "http://i68.tinypic.com/24oouoj.png"

     },
     {
       "height": 50,
       "width": 50,
       "onBoard": true,
       "image": "http://i65.tinypic.com/s4s0ah.png"
     }
   ]
   

 }*/