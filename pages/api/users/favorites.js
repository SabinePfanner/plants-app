import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  if (request.method === "PUT") {
    const newFavorites = { favorites: request.body };
    const user = { owner: session.user.email };
    await User.findOneAndUpdate(user, newFavorites, {
      new: true,
      upsert: true,
    }); //Check https://mongoosejs.com/docs/tutorials/findoneandupdate.html & https://www.mongodb.com/docs/manual/reference/command/findAndModify/
    return response
      .status(200)
      .json({ status: "Favorites successfully updated." });
  } else {
    return response.status(405).json({ status: "Method not allowed" });
  }
}
