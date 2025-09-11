import { Facebook, Github, Instagram, Twitter, Youtube } from 'lucide-react';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo & Deskripsi */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-indigo-400 text-2xl font-bold">LMS</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className="flex space-x-4 text-xl">
              <a href="#" aria-label="Facebook"><Facebook /></a>
              <a href="#" aria-label="Instagram"><Instagram /></a>
              <a href="#" aria-label="X / Twitter"><Twitter /></a>
              <a href="#" aria-label="Github"><Github /></a>
              <a href="#" aria-label="YouTube"><Youtube /></a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Marketing</a></li>
              <li><a href="#">Analytics</a></li>
              <li><a href="#">Automation</a></li>
              <li><a href="#">Commerce</a></li>
              <li><a href="#">Insights</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Submit ticket</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Guides</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Jobs</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Terms of service</a></li>
              <li><a href="#">Privacy policy</a></li>
              <li><a href="#">License</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
          © 2024 Your Company, Inc. All rights reserved.
        </div>
      </footer>
  )
}

export default Footer