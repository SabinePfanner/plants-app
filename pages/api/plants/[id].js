import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const plant = await Plant.findById(id);

    if (!plant) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(plant);
  }

  if (request.method === "DELETE") {
    try {
      await Plant.findByIdAndDelete(id);
      response
        .status(200)
        .json({ status: `Plant ${id} successfully deleted.` });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
