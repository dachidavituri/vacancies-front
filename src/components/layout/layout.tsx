import Header from "&/base/header";
import Footer from "&/base/footer";
import PageOutlet from "&/base/page-outlet";
import { Outlet } from "react-router";
const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <PageOutlet>
        <Outlet />
      </PageOutlet>
      <Footer />
    </div>
  );
};
export default Layout;
