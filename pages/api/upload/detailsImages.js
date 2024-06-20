import formidable from "formidable";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  if (request.method === "POST") {
    try {
      const form = formidable({});

      const [fields, files] = await form.parse(request);

      const images = [];
      for (const file of files.image) {
        const { filepath, newFilename } = file;

        const result = await cloudinary.v2.uploader.upload(filepath, {
          public_id: newFilename,
          folder: "plants",
        });

        images.push(result);
      }
      response.status(201).json({ images });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
