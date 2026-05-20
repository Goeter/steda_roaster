import { Hero } from '@/components/sections/hero';
import { AboutUs } from '@/components/sections/about-us';
import { Product } from '@/components/sections/product';
import { Benefits } from '@/components/sections/benefits';
import { Distribution } from '@/components/sections/distribution';
import { Testimonies } from '@/components/sections/testimonies';
import { FAQ } from '@/components/sections/faq';
import { getHomeContent } from '@/lib/cms';

export default async function Home() {
  const content = await getHomeContent();

  return (
    <main className="w-full overflow-x-hidden animate-page-enter">
      <Hero heroSection={content.heroSection} />
      <AboutUs aboutSection={content.aboutSection} />
      <Product productSection={content.productSection} productPageSection={content.productPageSection} products={content.products} />
      <Benefits benefitsSection={content.benefitsSection} />
      <Testimonies testimoniesSection={content.testimoniesSection} testimonies={content.testimonies} />
      <Distribution distributionSection={content.distributionSection} />
      <FAQ faqHomeSection={content.faqHomeSection} faqs={content.faqs} />
    </main>
  );
}
