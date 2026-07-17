import Hero from '../components/Hero'
import WhoWeAre from '../components/WhoWeAre'
import ValueSection from '../components/ValueSection'
import CompletedProjects from '../components/CompletedProjects'
import WhyUnified from '../components/WhyUnified'
import OurClients from '../components/OurClients'
import Testimonials from '../components/Testimonials'

const Home = () => (
  <div style={{ position: 'relative' }}>
    <Hero />
    <WhoWeAre />
    <ValueSection />
    <CompletedProjects />
    <WhyUnified />
    <OurClients />
    <Testimonials />
  </div>
)

export default Home




