import dbConnect from "@/db/connect";
import User from "@/db/models/User";
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
        await User.create({
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

  if (request.method === "PUT") {
    const favoritesData = request.body;
    await User.findByIdAndUpdate(id, favoritesData);
    // Find the joke by its ID and update the joke using its ID and the new data.
    return response.status(200).json({ status: `Joke ${id} updated!` });
    // Return an OK status on successful update
  }
}
