'use client';

import { Carousel } from '@mantine/carousel';
import { Card, Text, ActionIcon } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import classes from './CategoryCarousel.module.css'; // optional for cleaner overrides

export default function CategoryCarousel() {
  const categories = [
    { title: 'Dekoratyviniai profiliai', image: '/images/landing/dekoratyviniai-profiliai.png' },
    { title: 'Durų dekora', image: '/images/landing/duru-dekora.jpg' },
    { title: 'Kolonos', image: '/images/landing/kolonos.JPG' },
    { title: 'Rozetės', image: '/images/landing/rozetes.PNG' },
    { title: 'Sieninis dekoras', image: '/images/landing/sieninis-dekoras.png' },
    { title: 'Statulėlės', image: '/images/landing/statuleles.JPG' },
  ];

  return (
    <section className="py-16">
      <Carousel
        slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
        slideGap="md"
        withIndicators
        nextControlIcon={
          <ActionIcon variant="filled" color="dark" radius="xl" size="lg">
            <IconChevronRight color="white" />
          </ActionIcon>
        }
        previousControlIcon={
          <ActionIcon variant="filled" color="dark" radius="xl" size="lg">
            <IconChevronLeft color="white" />
          </ActionIcon>
        }
        styles={{
          indicator: {
            width: 10,
            height: 10,
            backgroundColor: '#000',
            opacity: 0.3,
            transition: 'opacity 0.3s ease',
            '&[data-active]': {
              opacity: 1,
            },
          },
        }}
      >
        {categories.map((item, index) => (
          <Carousel.Slide key={index}>
            <Card
              shadow="md"
              radius="md"
              padding="lg"
              className="text-center h-[450px] flex flex-col justify-between"
            >
              <Card.Section className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-96 w-full object-cover rounded-md shadow-md"
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