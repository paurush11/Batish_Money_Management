import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home"); // Replace with your default section
  }, [router]);

  return null; // Render nothing or a loading spinner
};
export default IndexPage;
