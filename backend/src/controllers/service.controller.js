import cloudinary from "../config/cloudinaryConfig.js";
import Service from "../models/service.model.js";



export const createService = async (req, res) => {
    const { title, description, location, date, volunteersNeeded, imageUrl } = req.body;
    try {
        if (!title || !description || !location || !date || !volunteersNeeded || !imageUrl) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const newService = new Service({
            title,
            description,
            location,
            date,
            volunteersNeeded,
            imageUrl,
            createdBy: req.user._id,
        });
        const service = await newService.save();
        res.status(201).json(service);
    } catch (error) {
        console.error('Error in createService controller:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export const getServices = async (req, res) => {
    try {
        const services = await Service.find().populate("createdBy", "fullName email"); // Populating user information
        res.status(200).json(services);
    } catch (error) {
        console.error("Error in getServices controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findById(id).populate("createdBy", "fullName email");
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        console.error("Error in getServiceById controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateService = async (req, res) => {
    const { id } = req.params;
    const { title, description, location, date, volunteersNeeded } = req.body;

    try {
        if (!title || !description || !location || !date || !volunteersNeeded) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const updatedService = await Service.findByIdAndUpdate(
            id,
            { title, description, location, date, volunteersNeeded },
            { new: true }
        );

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json(updatedService);
    } catch (error) {
        console.error("Error in updateService controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedService = await Service.findByIdAndDelete(id);
        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error in deleteService controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const uploadImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'services',
        });
        res.status(200).json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error('Error uploading image:', error.message);
        res.status(500).json({ message: 'Image upload failed' });
    }
};
