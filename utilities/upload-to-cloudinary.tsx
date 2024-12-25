import axios from "axios";

interface UploadResponse {
  url: string;
  type: "image" | "video";
}

export const uploadToCloudinary = async (file: File): Promise<UploadResponse> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;
  const uploadPreset = "zr6ubu6j";

  if (!cloudName || !uploadPreset) {
    throw new Error("Missing Cloudinary configuration in environment variables.");
  }

  // Determine the resource type based on the file's MIME type
  const fileType = file.type.startsWith("video") ? "video" : "image";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  // Use the appropriate Cloudinary endpoint for the resource type
  const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/${fileType}/upload`, formData);

  if (response.status === 200) {
    return {
      url: response.data.secure_url,
      type: fileType,
    };
  }

  throw new Error(`Failed to upload ${fileType} to Cloudinary`);
};
