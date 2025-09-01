import Header from '@/components/header';
import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Services from '@/components/sections/services';
import Portfolio from '@/components/sections/portfolio';
import Blog from '@/components/sections/blog';
import Frameworks from '@/components/sections/frameworks';
import Engagement from '@/components/sections/engagement';
import ProjectEstimator from '@/components/sections/project-estimator';
import Contact from '@/components/sections/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Frameworks />
        <ProjectEstimator />
        <Engagement />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
