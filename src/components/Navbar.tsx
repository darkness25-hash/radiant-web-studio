import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
  { href: "#running", label: "Running" },
  { href: "#football", label: "Football" },
  { href: "#videos", label: "Interviews" },
  { href: "#interactive", label: "Play" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="font-display text-xl tracking-wider">
          <span className="text-primary">MOTION</span>
          <span className="text-muted-foreground mx-2">|</span>
          <span className="text-secondary">PASSION</span>
        </a>

        <div className="hidden md:flex gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-background border-l border-border p-8 md:hidden z-50"
          >
            <button className="absolute top-4 right-4 text-foreground" onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col gap-6 mt-12">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-xl text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
