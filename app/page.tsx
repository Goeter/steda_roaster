import { Hero } from '@/components/sections/hero';
import { AboutUs } from '@/components/sections/about-us';
import { Product } from '@/components/sections/product';
import { Benefits } from '@/components/sections/benefits';
import { Distribution } from '@/components/sections/distribution';
import { Testimonies } from '@/components/sections/testimonies';
import { FAQ } from '@/components/sections/faq';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden animate-page-enter">
      <Hero />
      <AboutUs />
      <Product />
      <Benefits />
      <Testimonies />
      <Distribution />
      <FAQ />
    </main>
  );
}
