
import { cloudinary } from "@/lib/cloudinary-config";
import { UploadApiErrorResponse } from "cloudinary";
import { UploadApiResponse} from "cloudinary";

type UploadResponse = 
  { success: true; result?: UploadApiResponse } | 
  { success: false; error: UploadApiErrorResponse };

export const uploadToCloudinary = (
  fileUri: string, fileName: string, public_Id?: string): Promise<UploadResponse> => {

  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      invalidate: true, // Clear cache if overwriting
      resource_type: "auto", // Supports various file types
      filename_override: fileName, // Set a custom file name
      folder: "users", // Upload to the specified folder
      use_filename: true,
    };

    // Add public_id if provided
    if (public_Id) {
      uploadOptions.public_id = public_Id;
      uploadOptions.overwrite = true; // Only overwrite if public_id is specified
    }

    console.log(uploadOptions)

    cloudinary.uploader
      .upload(fileUri,uploadOptions)
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};