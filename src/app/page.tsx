import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import FeaturedServices from '@/components/FeaturedServices';
import ToolsSection from '@/components/ToolsSection';
import ProductsSection from '@/components/ProductsSection';
import ProjectsSection from '@/components/ProjectsSection';
import TrainingsSection from '@/components/TrainingsSection';
import IndustriesServed from '@/components/IndustriesServed';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#333333]">
      <Navbar />
      <main>
        <HeroSlider />
        <AboutSection />
        <FeaturedServices />
        <ToolsSection />
        <ProductsSection />
        <ProjectsSection />
        <TrainingsSection />
        <IndustriesServed />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
