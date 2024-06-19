import dbConnect from "@/db/connect";
import Favorites from "@/db/models/Favorites";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  if (request.method === "POST") {
    try {
      if (session) {
        const favoritesData = request.body;
        console.log("Post-method", favoritesData);
        await Favorites.create({
          favorites: favoritesData,
          owner: session.user.email,
        });
        response
          .status(201)
          .json({ message: "Crop successfully added to your garden!" });
      } else {
        response
          .status(201)
          .json({ status: "Favorites only added temporarily" });
      }
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ status: "Method not allowed" });
  }
}
