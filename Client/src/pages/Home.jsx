import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Topbar />
      <div className="flex">
        <Sidebar />
        <Hero />
      </div>
    </>
  );
}
