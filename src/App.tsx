import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SplashScreen } from '@/components/splash-screen';
import { WelcomeModal } from '@/components/welcome-modal';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import ClickSpark from '@/components/ClickSpark';
import { AiChatbot } from '@/components/ai-chatbot';
import { CartDrawer } from '@/components/ui/cart-drawer';
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Story from '@/pages/Story';
import Contact from '@/pages/Contact';
import Franchise from '@/pages/Franchise';
import Admin from '@/pages/Admin';

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <ClickSpark
      sparkSize={12}
      sparkRadius={20}
      sparkCount={8}
      duration={400}
    >
      <AiChatbot />
      <ScrollToTop />
      <SplashScreen onFinish={() => setSplashDone(true)} />
      <WelcomeModal splashDone={splashDone} />
      <Header />
      <CartDrawer />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/story" element={<Story />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/franchise" element={<Franchise />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </ClickSpark>
  );
}
