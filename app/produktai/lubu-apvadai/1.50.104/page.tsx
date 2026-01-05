import { LubiniaiApvadaiTemplate } from '../../lubu-apvadai/LubiniaiApvadaiTemplate/template';

export { generateMetadata } from './meta';

const productData = require('@/app/data/lubu-apvadai/lubu-apvadai.json').products;

const getProduct = async (productCode: string) => {
  return productData.find((product: any) =>
    product.name.toLowerCase().includes(productCode.toLowerCase())
  );
};

const getStructuredData = (product: any) => {
  const productCode = product.name.split(' ').pop()?.toLowerCase() || '';
  const canonicalUrl = `https://www.dekoratoriai.lt/produktai/lubu-apvadai/${productCode}`;
  const description = `${product.name} - Premium Karnizas with dimensions ${product.details['Plotis']} x ${product.details['Aukštis']}`;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description,
    image: product.images[0]?.url || '',
    url: canonicalUrl,
    brand: {
      "@type": "Brand",
      name: "Dekoratoriai.lt"
    },
    sku: productCode,
    mpn: productCode,
    offers: {
      "@type": "Offer",
      price: product.price != null ? product.price.toFixed(2) : "0.00",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock"
    }
  };

  return [productSchema];
};

export default async function Page() {
  // Hardcode the product code based on the folder name
  const product = await getProduct('1.50.104');

  if (!product) {
    return <div>Product not found</div>;
  }

  const structuredData = getStructuredData(product);

  return (
    <>
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <LubiniaiApvadaiTemplate product={product} />
    </>
  );
}
