import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"


const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Michael Lee",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Emily Davis",
    role: "Head of Design",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "James Wilson",
    role: "Lead Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
]

const OutTeam = () => {
  return (
    <div className='bg-gray-200'>
              {/* ===== MEET OUR TEAM SECTION ===== */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Meet Our Team
          </h2>
          <p className="mt-4 text-lg text-gray-900">
            The people who make everything possible.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <Card className="group relative overflow-hidden rounded-xl shadow-md border-gray-700 bg-gray-800 py-0 pb-[2rem]">
                <CardHeader className="p-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="block w-full h-64 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500"
                  />
                </CardHeader>
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OutTeam