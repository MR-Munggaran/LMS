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
    <section
      id="testimonials"
      className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8"
    >
      {/* background pakai palet */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#E4004B] via-[#ED775A] to-[#FAD691] opacity-90" />

      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h3 className="text-center text-3xl font-bold text-white drop-shadow-lg">
          Apa Kata Mereka?
        </h3>

        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-2xl">
                <CardContent className="p-10">
                  <blockquote className="text-center text-xl font-medium text-white sm:text-2xl">
                    <p>“{testimonials[index].message}”</p>
                  </blockquote>
                  <figcaption className="mt-8">
                    <img
                      alt={testimonials[index].name}
                      src={testimonials[index].avatar}
                      className="mx-auto size-14 rounded-full ring-4 ring-[#FAD691]"
                    />
                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                      <div className="font-semibold text-white">
                        {testimonials[index].name}
                      </div>
                      <svg
                        width={3}
                        height={3}
                        viewBox="0 0 2 2"
                        aria-hidden="true"
                        className="fill-[#C9CDCF]"
                      >
                        <circle r={1} cx={1} cy={1} />
                      </svg>
                      <div className="text-[#C9CDCF]">
                        {testimonials[index].role}
                      </div>
                    </div>
                  </figcaption>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* tombol prev & next */}
          <Button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 mx-6 rounded-full bg-[#E4004B] hover:bg-[#ED775A] text-white shadow-lg"
          >
            ◀
          </Button>
          <Button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 mx-6 rounded-full bg-[#E4004B] hover:bg-[#ED775A] text-white shadow-lg"
          >
            ▶
          </Button>
        </div>

        {/* indicator dots */}
        <div className="mt-8 flex justify-center space-x-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full transition-all ${
                index === i
                  ? "bg-[#E4004B] scale-110"
                  : "bg-[#C9CDCF] hover:bg-[#ED775A]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
