// pages/api/register.js
import { REGISTER, GET_USER_BY_USERNAME } from "@/server/REST_API_Const";
import axios from "axios";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Forward the Register request to your authentication service
    const response = await axios.post(REGISTER, req.body);

    if (response.data && response.data.token) {
      // Set HttpOnly cookies with the token
      res.setHeader("Set-Cookie", [
        serialize("authToken", response.data.token, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        }),
        serialize("userName", req.body.userName, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        }),
      ]);
      const user = await axios.get(
        GET_USER_BY_USERNAME + `/${req.body.userName}`,
        {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
        },
      );
      // Return user data or a success indicator to the client
      return res.status(200).json({
        user: user,
        token: response.data.token,
        existedBefore: response.data.existedBefore,
      }); // Adjust according to your response structure
    } else {
      // Handle login failure
      return res.status(401).json({ error: "Authentication failed" });
    }
  } catch (error: any) {
    // Handle errors, such as network issues or invalid credentials
    return res.status(500).json({ error: error.message });
  }
};
