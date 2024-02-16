import { AuthContext } from "@/lib/AuthProvider";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();
  const context = useContext(AuthContext);
  console.log(context);
  useEffect(() => {
    if (context?.user)
      router.replace("/home"); // Replace with your default section
    else router.replace("/register");
  }, [router]);

  return null; // Render nothing or a loading spinner
};
export default IndexPage;
