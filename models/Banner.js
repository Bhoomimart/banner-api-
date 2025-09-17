import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
    {
        percent: { type: Number, required: true },
        name: { type: String, required: true },
        date: { type: String, required: true },
        brand: { type: String, required: true },
        saleType: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true }, // Cloudinary URL
        imagePublicId: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
