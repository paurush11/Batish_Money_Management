import { MainLayout } from "@/components/layout/MainLayout/MainLayout";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col ">
      <Navbar />

      <Sidebar />
      <MainLayout />
    </div>
  );
}
