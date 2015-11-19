import mongoose from 'mongoose';

let BusinessCounterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 0}
});

let businessCounter = mongoose.model('businessCounter', BusinessCounterSchema);

businessCounter.create({_id: 'businessId', seq: 0});

let BusinessSchema = new mongoose.Schema({
  _id: Number,
  nombre: String,
  correo: {type: String, unique: true},
  intereses: [ String ],
  descripcion: String,
  trabajosId: [ {_id: Number} ]
}, {strict: false});

BusinessSchema.pre('save', function (next) {
  let doc = this;

  Business.findOne({correo: doc.correo}, 'correo', (err, results) => {
    if (err) {
      next(err);
    } else if (results) {
      doc.invalidate('correo', 'El correo debe ser único');
      next(new Error('El correo debe ser único'));
    } else {
      businessCounter.findByIdAndUpdate({_id: 'businessId'}, {$inc: {seq: 1}}, (err, bc) => {
        if (err) return next(err);
        doc['_id'] = bc.seq;
        next();
      });
    }
  });
});

let Business = mongoose.model('Business', BusinessSchema, 'business');

export default Business;
