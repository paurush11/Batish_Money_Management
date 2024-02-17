import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect } from "react";

type TIndexPage = {
  authToken: string;
};
const IndexPage = ({ authToken }: TIndexPage) => {
  const router = useRouter();
  console.log(authToken);
  useEffect(() => {
    if (!authToken) {
      router.replace("/login");
    } else {
      router.replace("/home");
    }
  }, [authToken, router]);

  return <div>Loading...</div>;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const authToken = cookies.authToken;

  return {
    props: {
      authToken, // You can pass this to the page if needed
    },
  };
};
export default IndexPage;
