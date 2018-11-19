const express = require('express');
const passport = require('passport');

const { Projects } = require('../models');
const projectRouter = express.Router();
const jwtAuth = passport.authenticate('jwt', { session: false });

projectRouter.route('/')
  .get(jwtAuth, (req, res) => {
    const query = { ownerId: req.user._id };
    Projects
      .find(query)
      .exec()
      .then(projects => res.json({ projects }))
      .catch(
        (err) => {
          console.error(err);
          res.status(500).json({ message: 'Internal Server Error' });
        });
  })
  .post((req, res) => {
    if (!('projectName' in req.body)) {
      const message = 'Missing projectName in request body';

      console.error(message);
      return res.status(400).send(message);
    }

    Projects
      .findOne({ projectName: req.body.projectName })
      .exec()
      .then((project) => {
        if (project && (project.ownerId === req.body.ownerId)) {
          const message = 'That project already exists. Please use a different project name';
          res.status(409).send(message);
        } else {
          return Projects
            .create({
              ownerId: req.body.ownerId,
              projectName: req.body.projectName,
              position: req.body.position,
              tasks: req.body.tasks,
              shortId: req.body.shortId,
            });
        }
      })
      .then(project => res.status(201).json(project))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });

projectRouter.route('/:projectId')
  .get((req, res) => {
    Projects
      .findById(req.params.projectId)
      .exec()
      .then(projects => res.json({ projects }))
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: 'Project Not Found' });
      });
  })
  .post((req, res) => {
    const toUpdate = { tasks: req.body };
    const requiredTaskFields = ['taskName', 'recordedTime'];

    for (let j = 0; j < requiredTaskFields.length; j++) {
      const field = requiredTaskFields[j];

      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }

    Projects
      .findById(req.params.projectId)
      .exec()
      .then((project) => {
        const taskIndex = project.tasks.findIndex(task => task.taskName === req.body.taskName);

        if (taskIndex > -1) {
          const message = 'That task already exists. Please use a different task name.';
          console.error(message);
          res.status(409).send(message);
        } else {
          return Projects
            .findByIdAndUpdate(req.params.projectId, { $push: toUpdate }, { new: true });
        }
      })
      .then(project => res.status(201).json(project.tasks[project.tasks.length - 1]))
      .catch((err) => {
        console.error(err);
        res.status(404).json({ message: 'Project Not Found' });
      });
  })
  .put((req, res) => {
    if (!('projectName' in req.body && req.body.projectName)) {
      return res.status(400).json({ message: 'Must specify value for projectName' });
    }

    const toUpdate = {
      projectName: req.body.projectName,
      'position:': req.body.position,
    };

    Projects
      .findByIdAndUpdate(req.params.projectId, { $set: toUpdate })
      .exec()
      .then(() => res.status(204).end())
      .catch(() => res.status(500).json({ message: 'Internal server error' }));
  })
  .delete((req, res) => {
    Projects
      .findByIdAndRemove(req.params.projectId)
      .exec()
      .then(() => res.status(204).end())
      .catch(() => res.status(404).json({ message: 'Not Found' }));
  });

module.exports = projectRouter;
