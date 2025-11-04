'use client';

import { Container, Title, Text, Button } from '@mantine/core';

export default function Hero() {
  return (
    <section className="py-20 text-center">
      <Container>
        <Title order={1} className="text-4xl md:text-5xl font-bold mb-4">
          Pirma Kokybė
        </Title>
        <Text size="lg" className="mb-6">
          Namų apdailos sprendimai kiekvienam
        </Text>
        <Button size="md" variant="gradient">
          Sužinok daugiau
        </Button>
      </Container>
    </section>
  );
}