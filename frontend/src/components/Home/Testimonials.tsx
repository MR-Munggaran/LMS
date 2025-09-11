import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Mahasiswa",
    message:
      "LMS ini sangat membantu saya belajar lebih terstruktur dan mudah diakses.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Siti Aminah",
    role: "Guru",
    message:
      "Mengelola ujian jadi lebih efisien, saya bisa memantau siswa dengan mudah.",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Andi Pratama",
    role: "Siswa",
    message:
      "Materinya jelas, ada kuis dan sertifikat yang bikin saya semangat belajar!",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
]

const Testimonials = () => {
  const [index, setIndex] = useState(0)

  const handleNext = () =>
    setIndex((prev) => (prev + 1) % testimonials.length)
  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  // auto rotate tiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:px-8" id="testimonials">
      {/* background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gray-500 shadow-xl ring-1 shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h3 className="text-center text-2xl font-bold text-white">
          Apa Kata Mereka?
        </h3>

        <div className="relative mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <blockquote className="text-center text-xl font-semibold text-gray-900 sm:text-2xl">
                    <p>“{testimonials[index].message}”</p>
                  </blockquote>
                  <figcaption className="mt-10">
                    <img
                      alt={testimonials[index].name}
                      src={testimonials[index].avatar}
                      className="mx-auto size-12 rounded-full"
                    />
                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                      <div className="font-semibold text-gray-900">
                        {testimonials[index].name}
                      </div>
                      <svg
                        width={3}
                        height={3}
                        viewBox="0 0 2 2"
                        aria-hidden="true"
                        className="fill-gray-900"
                      >
                        <circle r={1} cx={1} cy={1} />
                      </svg>
                      <div className="text-gray-600">
                        {testimonials[index].role}
                      </div>
                    </div>
                  </figcaption>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* tombol prev & next */}
        </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 mx-6"
          >
            ◀
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 mx-6"
          >
            ▶
          </Button>
      </div>
    </section>
  )
}

export default Testimonials
