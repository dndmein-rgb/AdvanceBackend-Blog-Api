import { deleteFromCloudinary, uploadToCloudinary } from "./cloudinary.helper.js";
import { IFileService } from "./file.interface.js";

export class CloudinaryService implements IFileService{
    async upload(filePath: string): Promise<string> {
        return await uploadToCloudinary(filePath);
    }
   async delete(fileUrl: string): Promise<void> {
        return await deleteFromCloudinary(fileUrl)
    }
}