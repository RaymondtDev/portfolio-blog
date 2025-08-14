import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
    <Header />
    <main className="prose max-w-none grid-layout">
      <Outlet />
    </main>
    <Footer />
    </>
  );
}

export default Home;