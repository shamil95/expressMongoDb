const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tour has to be named'],
        unique: true,
        trim: true,
    },
    secretTour: Boolean,
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour duration must be required']
    },
    maxGroupSize: {
        type: Number,
        require: [true, 'A tour groupSize must be required']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour difficulty must be required']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Tour has to price'],
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    description: {
        type: String,
        trim: true,
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover Image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date]
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

tourSchema.virtual('durationInWeeks').get(function () {
    return this.duration / 7
})

tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {lower: true})
    next()
})

tourSchema.pre(/^find/, function (next) {
    this.find({secretTour: {$ne: true}})
    next();
})

tourSchema.pre('aggregate', function (next) {
    this.pipeline({secretTour: {$ne: true}})
    next()
})

const Tour = new mongoose.model('Tour', tourSchema);

module.exports = Tour;