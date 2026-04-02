import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { AboutUs } from '@/components/sections/about-us';
import { Product } from '@/components/sections/product';
import { Benefits } from '@/components/sections/benefits';
import { Testimonies } from '@/components/sections/testimonies';
import { FAQ } from '@/components/sections/faq';
import { Distribution } from '@/components/sections/distribution';
import { Footer } from '@/components/sections/footer';
import { FloatingWhatsAppButton } from '@/components/floating-whatsapp-button';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutUs />
      <Product />
      <Benefits />
      <Testimonies />
      <FAQ />
      <Distribution />
      <Footer />
      <FloatingWhatsAppButton />
    </main>
  );
}
