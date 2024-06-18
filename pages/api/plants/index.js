import dbConnect from "@/db/connect";
import Plant from "@/db/models/Plant.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  if (request.method === "GET") {
    if (session) {
      const plants = await Plant.find({
        owner: { $in: [session.user.email, "default"] }, //https://www.mongodb.com/docs/manual/reference/operator/query/in/#mongodb-query-op.-in
      }).sort({ updatedAt: -1 });
      return response.status(200).json(plants);
    } else {
      const plants = await Plant.find({ owner: "default" });
      return response.status(200).json(plants);
    }
  }
  if (request.method === "POST") {
    try {
      if (session) {
        const plantData = request.body;
        const newPlant = await Plant.create({
          ...plantData,
          owner: session.user.email,
        });
        response
          .status(201)
          .json({ message: "New crop successfully created", id: newPlant._id });
      } else {
        response.status(401).json({ status: "Not authorized" });
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ status: "Method not allowed" });
  }
}
