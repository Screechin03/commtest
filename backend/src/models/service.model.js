import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a service title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a service description'],
            trim: true,
            maxlength: [500, 'Description cannot be more than 500 characters'],
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        date: {
            type: Date,
            required: [true, 'Please provide a date for the service'],
        },
        volunteersNeeded: {
            type: Number,
            required: [true, 'Please specify the number of volunteers needed'],
            min: [1, 'Volunteer limit must be at least 1'],
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Service must have a creator'],
        },
        imageUrl: {
            type: String,
            required: [true, 'Please provide an image URL for the service'],
        },
    },
    { timestamps: true }
);

serviceSchema.index({ location: '2dsphere' });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
