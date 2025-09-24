import { Facebook, Github, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative text-gray-200">
      {/* background gradient */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#E4004B] via-[#ED775A] to-[#FAD691]" />
      {/* overlay gelap tipis */}
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Logo & Deskripsi */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-extrabold text-[#E4004B] tracking-wide">
              LMS
            </span>
          </div>
          <p className="text-sm leading-relaxed mb-6 text-[#C9CDCF]">
            Making the world a better place through constructing elegant
            hierarchies.
          </p>
          <div className="flex space-x-3">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: Github, label: "Github" },
              { Icon: Youtube, label: "YouTube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="p-2 rounded-full bg-black/20 hover:bg-[#FAD691]/40 transition text-black shadow-md"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h3 className="font-semibold mb-4 text-black">Solutions</h3>
          <ul className="space-y-2 text-sm">
            {["Marketing", "Analytics", "Automation", "Commerce", "Insights"].map(
              (item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-[#FAD691] transition-colors text-[#ED775A]"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4 text-black">Support</h3>
          <ul className="space-y-2 text-sm">
            {["Submit ticket", "Documentation", "Guides"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-[#FAD691] transition-colors text-[#ED775A]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4 text-black">Company</h3>
          <ul className="space-y-2 text-sm">
            {["About", "Blog", "Jobs", "Press"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-[#FAD691] transition-colors text-[#ED775A]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-4 text-black">Legal</h3>
          <ul className="space-y-2 text-sm">
            {["Terms of service", "Privacy policy", "License"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-[#FAD691] transition-colors text-[#ED775A]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-black/30 my-10 pt-6 text-center text-sm text-[#ED775A]">
        © 2024 Your Company, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
