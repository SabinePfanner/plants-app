import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  if (request.method === "GET") {
    if (session) {
      const user = await User.find({
        owner: session.user.email,
      }).select("favorites -_id");
      if (!user) {
        return response.status(404).json({ status: "Not Found" });
      }
      response.status(200).json(user[0] ? user[0].favorites : []);
    } else {
      return response.status(405).json({ status: "Method not allowed" });
    }
  } else {
    return response.status(405).json({ status: "Method not allowed" });
  }
}
