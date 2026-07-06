import fs from "fs";
import cloudinary from "../lib/cloudinary.js";
export const uploadToCloudinary = async (localFilePath: string) => {
  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    return response.secure_url;
  } finally {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
  }
};

export const deleteFromCloudinary=async(imageUrl:string)=>{
  try {
    const publicId = imageUrl.split("/").pop()?.split(".")[0] as string;
    const response=await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.log("Error deleting image from cloudinary",error)
  }
}
