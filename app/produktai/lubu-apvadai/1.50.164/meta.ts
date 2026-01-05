import type { Metadata } from 'next';

const productData = require('@/app/data/lubu-apvadai/lubu-apvadai.json').products;

const getProduct = (code: string) => {
  return productData.find((product: any) =>
    product.name.toLowerCase().includes(code.toLowerCase())
  );
};

export async function generateMetadata(): Promise<Metadata> {
  // Hardcode the product code for this specific page
  const product = getProduct('1.50.164');

  if (!product) {
    return {
      title: 'Product Not Found | Gaudi Decor',
      description: 'The requested product could not be found.'
    };
  }

  const productCode = product.name.split(' ').pop()?.toLowerCase() || '';
  const canonicalUrl = `https://www.gaudidecor.eu/products/${productCode}`;

  const description = `${product.name} - Premium interior Karnizas. Dimensions: ${product.details['Plotis']} x ${product.details['Aukštis']}.`;

  return {
    title: `${product.name} - Premium Karnizas | Gaudi Decor`,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: `${product.name} - Premium Karnizas`,
      description,
      url: canonicalUrl,
      images: [
        {
          url: product.images[0]?.url || '',
          width: 1200,
          height: 630
        }
      ]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}
