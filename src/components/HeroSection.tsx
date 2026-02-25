import { motion } from "framer-motion";
import { ArrowRight, Gamepad2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const stats = [
  { value: "42", label: "KM Marathon", color: "text-primary" },
  { value: "11", label: "Players / Team", color: "text-secondary" },
  { value: "3.5B", label: "Global Fans", color: "text-accent" },
  { value: "100+", label: "Years History", color: "text-muted-foreground" },
];

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
    {/* Background image */}
    <div className="absolute inset-0 z-0">
      <img src={heroBg} alt="" className="w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
    </div>

    {/* Mesh overlay */}
    <div className="absolute inset-0 gradient-mesh z-0" />

    <div className="container mx-auto px-6 text-center relative z-10">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-block px-4 py-2 rounded-full border border-border text-sm font-semibold tracking-widest bg-muted/50 backdrop-blur-sm text-muted-foreground mb-8"
      >
        SCHOOL PRESENTATION 2026
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
      >
        SPEED &<br />
        <span className="text-gradient-brand">STRATEGY</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        Exploring the dynamics of{" "}
        <span className="text-primary font-bold">Running</span> and{" "}
        <span className="text-secondary font-bold">Football</span> — from individual
        endurance to team tactics.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <a
          href="#videos"
          className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform"
        >
          Watch Interviews
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        <a
          href="#interactive"
          className="flex items-center gap-2 px-8 py-4 border-2 border-border rounded-full font-bold hover:bg-muted transition-colors"
        >
          <Gamepad2 className="w-5 h-5" />
          Try Interactive Games
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
      >
        {stats.map((s) => (
          <div key={s.label}>
            <div className={`text-3xl md:text-4xl font-display font-bold ${s.color}`}>{s.value}</div>
            <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  </section>
);

export default HeroSection;
