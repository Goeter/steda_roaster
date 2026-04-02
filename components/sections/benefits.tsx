'use client';

export function Benefits() {
  const benefits = [
    {
      id: 1,
      title: 'EUROPEAN STANDARD QUALITY',
      description: 'We only supply coffee machines with the highest European quality standards, ensuring reliable and long-lasting performance.',
    },
    {
      id: 2,
      title: 'GUARANTEED PRODUCT',
      description: 'All purchases are covered by a warranty, giving our customers peace of mind in the face of technical issues.',
    },
    {
      id: 3,
      title: 'LATEST DESIGNS',
      description: 'We always update our collection with the latest coffee machine designs that combine aesthetic beauty with extraordinary functionality.',
    },
    {
      id: 4,
      title: 'FREE SHIPPING',
      description: 'We offer free shipping on all our products, providing added value to customers by saving on shipping costs.',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-br from-amber-50 via-white to-amber-50 relative overflow-hidden">
      {/* Light batik background accent */}
      <div className="absolute inset-0 opacity-5 bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50 10 Q60 30 50 50 Q40 30 50 10\' fill=\'%23000\' opacity=\'0.1\'/%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'5\' fill=\'%23000\'/%3E%3Ccircle cx=\'70\' cy=\'70\' r=\'5\' fill=\'%23000\'/%3E%3C/svg%3E")' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="flex justify-center">
            <img
              src="/benefits-product.jpg"
              alt="Coffee Machine"
              className="w-full rounded-lg shadow-xl max-w-md"
            />
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="text-3xl font-black text-foreground mb-4 leading-tight">
              BENEFITS OF BUYING<br />FROM OUR SHOP
            </h2>
            <p className="text-lg text-foreground/70 mb-10">
              Discover the Advantages: Why Choose Us for Your Next Purchase?
            </p>

            {/* Benefits List */}
            <div className="space-y-8">
              {benefits.map((benefit) => (
                <div 
                  key={benefit.id}
                  className="group cursor-pointer transition-all duration-300 hover:translate-x-2"
                >
                  <h3 className="text-base font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {benefit.description}
                  </p>
                  <div className="h-0.5 bg-gradient-to-r from-primary to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 mt-3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
