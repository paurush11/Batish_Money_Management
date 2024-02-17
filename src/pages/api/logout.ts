// pages/api/logout.js
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader("Set-Cookie", [
      serialize("authToken", "", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      }),
      serialize("userName", "", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      }),
    ]);
    return res.status(200).json({ loggedOut: true }); // Adjust according to your response structure
  } catch (error: any) {
    // Handle errors, such as network issues or invalid credentials
    return res.status(500).json({ error: error.message });
  }
};
