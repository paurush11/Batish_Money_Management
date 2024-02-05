import { AuthContext, useAuth } from "@/lib/AuthProvider";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();
  const context = useAuth();
  useEffect(() => {
    console.log(context?.user);
    router.replace("/home"); // Replace with your default section
  }, [router]);

  return null; // Render nothing or a loading spinner
};
export default IndexPage;
