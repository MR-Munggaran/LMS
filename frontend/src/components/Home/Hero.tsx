import { HeroGeometric } from "@/components/ui/shadcn-io/shape-landing-hero";


const Hero = () => {
  return (
    <section id="home" className="flex-1">
        <HeroGeometric
          badge="Your Product"
          title1="Transform Your"
          title2="Digital Experience"
          description="Build exceptional products that users love with our comprehensive component library and design system."
        />
      </section>
  )
}

export default Hero