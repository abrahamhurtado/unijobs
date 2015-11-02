import mongoose from 'mongoose';

let UserCounterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 0}
});

let userCounter = mongoose.model('userCounter', UserCounterSchema);

userCounter.create({_id: 'userId', seq: 0});

let UserSchema = new mongoose.Schema({
  _id: Number,
  nombre: String,
  edad: Number,
  correo: {type: String, unique: true},
  genero: String,
  descripcion: String,
  intereses: [ String ],
  suscripciones: [ {_id: Number} ]
}, {strict: false});

UserSchema.pre('save', function (next) {
  let doc = this;

  User.findOne({correo: doc.correo}, 'correo', (err, results) => {
    if (err) {
      next(err);
    } else if (results) {
      doc.invalidate('correo', 'El correo debe ser único');
      next(new Error('El correo debe ser único'));
    } else {
      userCounter.findByIdAndUpdate({_id: 'userId'}, {$inc: {seq: 1}}, (err2, uc) => {
        if (err) return next(err2);
        doc['_id'] = uc.seq;
        next();
      });
    }
  });
});

let User = mongoose.model('User', UserSchema, 'users');

export default User;
