import { MainLayout } from '@/layouts/MainLayout';
import { FuturisticHero } from '@/components/FuturisticHero';
import { AboutSection } from '@/components/AboutSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { BlogSection } from '@/components/BlogSection';
import { ContactSection } from '@/components/ContactSection';
import { usePortfolioData } from '@/hooks/usePortfolioData';

export default function App() {
  const {
    about,
    skills,
    projects,
    services,
    experiences,
    testimonials,
    blogs,
    isLiveConnected
  } = usePortfolioData();

  return (
    <MainLayout about={about} isLiveConnected={isLiveConnected}>
      <FuturisticHero about={about} isLiveConnected={isLiveConnected} />
      <AboutSection about={about} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <ServicesSection services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection blogs={blogs} />
      <ContactSection about={about} />
    </MainLayout>
  );
}
