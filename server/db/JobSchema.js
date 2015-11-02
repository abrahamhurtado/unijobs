import mongoose from 'mongoose';

let JobCounterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 0}
});

let jobCounter = mongoose.model('jobCounter', JobCounterSchema);

jobCounter.create({_id: 'jobId', seq: 0});

let JobSchema = new mongoose.Schema({
  _id: Number,
  titulo: String,
  intereses: [String],
  descripcion: String,
  empresaId: {}
}, {strict: false});

JobSchema.pre('save', function (next) {
  let doc = this;
  jobCounter.findByIdAndUpdate({_id: 'jobId'}, {$inc: {seq: 1}}, (err, jb) => {
    if (err) return next(err);
    doc['_id'] = jb.seq;
    next();
  });
});

let Job = mongoose.model('Job', JobSchema, 'jobs');

export default Job;
