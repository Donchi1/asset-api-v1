import { UploadApiResponse } from "cloudinary";

export const uploadStagedFile = async (stagedFile: File | Blob):Promise<{url: string, img_publicId: string}> => {
    const form = new FormData();
    form.append("file", stagedFile);
    // here /api/upload is the route of my handler
    const res = await fetch("/api/upload", {
          method: "POST",
          body: form, 
     });
    const data = await res.json() as {message: string, result:UploadApiResponse}
    // we will return the uploaded image URL from the API to the client
    return {url: data.result.secure_url, img_publicId: data.result.public_id}
  }
  export const updateUploadStagedFile = async (stagedFile: File | Blob, public_id: string):Promise<string> => {
    const form = new FormData();
    form.append("file", stagedFile);
    form.append("public_Id", public_id)
    // here /api/upload is the route of my handler
    const res = await fetch(`/api/update`, {
          method: "POST",
          body: form, 
     });
    const data = await res.json() as {message: string, imgUrl:string};
    // we will return the uploaded image URL from the API to the client
    return data.imgUrl
  }
  