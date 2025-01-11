import Navbar from "../Header/Header";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-6 justify-center items-center lg:mt-10 md:mt-8 mt-6 mb-5">
        {children}
      </main>
    </>
  );
};

export default Layout;
