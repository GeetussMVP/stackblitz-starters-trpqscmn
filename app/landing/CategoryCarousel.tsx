'use client';

import { Carousel } from '@mantine/carousel';
import { Card, Text } from '@mantine/core';

export default function CategoryCarousel() {
  const categories = [
    { title: 'Grindys', image: '/images/flooring.jpg' },
    { title: 'Sienos', image: '/images/walls.jpg' },
    { title: 'Lubos', image: '/images/ceiling.jpg' },
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
