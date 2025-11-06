'use client';

import { Carousel } from '@mantine/carousel';
import { Card, Text } from '@mantine/core';

export default function CategoryCarousel() {
  const categories = [
    { title: 'Dekoratyviniai profiliai', image: '/images/dekoratyviniai-profiliai.png' },
    { title: 'Durų dekora', image: '/images/duru-dekora.jpg' },
    { title: 'Kolonos', image: '/images/kolonos.JPG' },
    { title: 'Rozetės', image: '/images/rozetes.PNG' },
    { title: 'Sieninis dekoras', image: '/images/sieninis-dekoras.png' },
    { title: 'Statulėlės', image: '/images/statuleles.JPG' },
  ];

  return (
    <section className="py-16">
      <Carousel
        slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
        slideGap="md"
        withIndicators
        emblaOptions={{ loop: true }}
      >
        {categories.map((item, index) => (
          <Carousel.Slide key={index}>
            <Card shadow="sm" radius="md" padding="lg" className="text-center">
              <Card.Section>
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover rounded-md"
                />
              </Card.Section>
              <Text fw={600} mt="md">
                {item.title}
              </Text>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </section>
  );
}