import { motion } from "framer-motion";

const stats = [
  { name: "Years of Experience", value: "10+" },
  { name: "Projects Completed", value: "250+" },
  { name: "Happy Clients", value: "500+" },
  { name: "Global Partners", value: "20+" },
];

export default function AboutUs() {
  return (
    <div id="about">
      <motion.div
        className="relative isolate overflow-hidden py-24 sm:py-32 bg-gradient-to-br from-[#E4004B] via-[#ED775A] to-[#FAD691]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 -z-10 bg-black/30" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <motion.h2
              className="text-5xl font-bold tracking-tight text-white sm:text-6xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About Us
            </motion.h2>
            <motion.p
              className="mt-8 text-lg font-medium text-pretty text-[#C9CDCF] sm:text-xl/8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We are a passionate team dedicated to delivering impactful
              digital solutions. Our goal is to empower businesses and
              communities through innovation, collaboration, and creativity.
            </motion.p>
          </div>

          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            {/* Stats */}
            <motion.dl
              className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.name}
                  className="rounded-2xl bg-white/10 backdrop-blur-md p-6 shadow-lg hover:scale-105 transition-transform duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <dd className="text-4xl font-semibold tracking-tight text-white drop-shadow-lg">
                    {stat.value}
                  </dd>
                  <dt className="mt-2 text-base text-[#C9CDCF]">{stat.name}</dt>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
