import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ClientLayout({ children }) {
  return (
    <div style={{ paddingTop: '80px', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
