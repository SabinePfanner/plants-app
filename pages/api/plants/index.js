import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const plants = await Plant.find();
    return response.status(200).json(plants);
  } else {
    return response.status(405).json({ status: "Method not allowed" });
  }
}
