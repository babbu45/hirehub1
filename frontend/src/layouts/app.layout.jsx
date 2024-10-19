import { Outlet } from 'react-router-dom';
import Header from '@/components/header';

const AppLayout = () => {
  return (
    <div className="relative">
      <div className="grid-background"></div>
      <Header />
      
      
      <main className="min-h-screen  mx-auto flex flex-col">
      <Outlet />
        
        
        
      </main>
      
      {/* <footer className="footer text-center">
        Made with ❤ by team 9
      </footer> */}
    </div>
  );
};

export default AppLayout;
