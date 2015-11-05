import mongoose from 'mongoose';

import {User, Business, Job} from '../server/db/models';
import usuarios from './usuarios';
import negocios from './negocios';
import trabajos from './trabajos';

mongoose.connect('mongodb://localhost/unijobs');

User.remove({}, () => {
  Business.remove({}, () => {
    Job.remove({}, () => {
      User.create(usuarios[0])
        .then(() => User.create(usuarios[1]))
        .then(() => User.create(usuarios[2]))
        .then(() => Business.create(negocios[0]))
        .then(() => Business.create(negocios[1]))
        .then(() => Job.create(trabajos[0]))
        .then(() => Job.create(trabajos[1]))
        .then(() => Job.create(trabajos[2]))
        .then(() => process.exit());
    });
  });
});
