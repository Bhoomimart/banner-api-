import Banner from "../models/Banner.js";
import cloudinary from "../config/cloudinary.js";

// Create Banner
export const createBanner = async (req, res) => {
    try {
        const { percent, name, date, brand, saleType, description } = req.body;
        const image = req.file?.path;
        const imagePublicId = req.file?.filename;

        const banner = await Banner.create({
            percent,
            name,
            date,
            brand,
            saleType,
            description,
            image,
            imagePublicId,
        });

        res.status(201).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All
export const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update
export const updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        if (req.file) {
            const banner = await Banner.findById(id);
            if (banner?.imagePublicId) {
                await cloudinary.uploader.destroy(banner.imagePublicId);
            }
            updateData.image = req.file.path;
            updateData.imagePublicId = req.file.filename;
        }

        const updated = await Banner.findByIdAndUpdate(id, updateData, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete
export const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const banner = await Banner.findById(id);

        if (banner?.imagePublicId) {
            await cloudinary.uploader.destroy(banner.imagePublicId);
        }

        await Banner.findByIdAndDelete(id);
        res.json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
