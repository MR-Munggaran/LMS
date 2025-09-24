import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image:
      "https://plus.unsplash.com/premium_photo-1681493353999-a3eea8b95e1d?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Michael Lee",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop",
  },
  {
    name: "Emily Davis",
    role: "Head of Design",
    image:
      "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?q=80&w=744&auto=format&fit=crop",
  },
  {
    name: "James Wilson",
    role: "Lead Developer",
    image:
      "https://images.unsplash.com/photo-1610088441520-4352457e7095?q=80&w=687&auto=format&fit=crop",
  },
]

const OutTeam = () => {
  return (
    <section
      id="team"
      className="relative bg-gradient-to-br from-[#E4004B] via-[#ED775A] to-[#FAD691] py-20"
    >
      {/* Overlay hitam tipis biar teks lebih kontras */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl">
            Meet Our Team
          </h2>
          <p className="mt-4 text-lg text-[#C9CDCF]">
            The people who make everything possible.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Card className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 py-1">
                <CardHeader className="p-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="block w-full h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </CardHeader>
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-white group-hover:text-[#FAD691] transition-colors">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#C9CDCF]">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OutTeam
