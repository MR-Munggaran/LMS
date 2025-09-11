import { motion } from "framer-motion"

const stats = [
  { name: "Years of Experience", value: "10+" },
  { name: "Projects Completed", value: "250+" },
  { name: "Happy Clients", value: "500+" },
  { name: "Global Partners", value: "20+" },
]

export default function AboutUs() {
  return (
    <div className="bg-gray-900" id="about">
      {/* ===== ABOUT US SECTION WITH ANIMATION ===== */}
      <motion.div
        className="relative isolate overflow-hidden py-24 sm:py-32"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Background */}
        <img
          alt=""
          src="https://images.unsplash.com/photo-1556761175-129418cb2dfe?q=80&w=2830&auto=format&fit=crop"
          className="absolute inset-0 -z-10 size-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-black/70" />

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
              className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8"
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
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse gap-1">
                  <dt className="text-base/7 text-gray-300">{stat.name}</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
