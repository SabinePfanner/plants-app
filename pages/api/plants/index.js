import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const plants = await Plant.find();
    return response.status(200).json(plants);
  }
  if (request.method === "POST") {
    try {
      const plantData = request.body;
      const newPlant = await Plant.create(plantData);
      response
        .status(201)
        .json({ message: "New crop successfully created", id: newPlant._id });
      console.log(newPlant);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ status: "Method not allowed" });
  }
}
