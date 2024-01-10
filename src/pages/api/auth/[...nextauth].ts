import NextAuth from "next-auth";

import { authOptions } from "@components, @hooks, @assets, @lib, @utils/server/auth";

export default NextAuth(authOptions);
