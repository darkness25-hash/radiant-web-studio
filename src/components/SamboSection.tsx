import { motion } from "framer-motion";
import { Shield, Flame, Target, Swords } from "lucide-react";
import samboBg from "@/assets/sambo-bg.jpg";

const stats = [
  { label: "Strength", pct: 92, icon: Flame },
  { label: "Endurance", pct: 85, icon: Shield },
  { label: "Technique", pct: 88, icon: Target },
  { label: "Flexibility", pct: 78, icon: Swords },
];

const benefits = [
  { title: "Discipline", desc: "Builds mental toughness and unwavering focus through rigorous training." },
  { title: "Strength", desc: "Develops explosive power combining throws, holds, and ground techniques." },
  { title: "Flexibility", desc: "Enhances full-body mobility essential for takedowns and submissions." },
  { title: "Self-Defense", desc: "One of the most effective real-world self-defense systems ever created." },
];

const comparison = [
  { sport: "Sambo", throws: "★★★★★", ground: "★★★★☆", strikes: "★★★☆☆", selfDef: "★★★★★" },
  { sport: "Judo", throws: "★★★★★", ground: "★★★☆☆", strikes: "☆☆☆☆☆", selfDef: "★★★☆☆" },
  { sport: "BJJ", throws: "★★☆☆☆", ground: "★★★★★", strikes: "☆☆☆☆☆", selfDef: "★★★☆☆" },
  { sport: "Wrestling", throws: "★★★★☆", ground: "★★★★☆", strikes: "☆☆☆☆☆", selfDef: "★★★☆☆" },
];

const SamboSection = () => (
  <section id="sambo" className="py-24 relative overflow-hidden">
    {/* Background image with overlay */}
    <div className="absolute inset-0">
      <img src={samboBg} alt="" className="w-full h-full object-cover opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="inline-block px-4 py-1.5 rounded-full border border-destructive/40 text-destructive text-xs font-bold tracking-widest uppercase mb-4">
          Combat Sport
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
          Sambo — The Power of <span className="text-destructive">Combat</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Born in 1930s Soviet Russia, Sambo (SAMozashchita Bez Oruzhiya — "self-defense without weapons") blends judo, wrestling, and traditional martial arts into one of the most complete combat systems in the world.
        </p>
      </motion.div>

      {/* Benefits Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card/60 p-5 rounded-2xl border border-border backdrop-blur-sm sport-card-hover"
          >
            <h4 className="font-display text-lg font-bold mb-2 text-destructive">{b.title}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Stats + Comparison */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 p-6 rounded-2xl border border-border backdrop-blur-sm"
        >
          <h4 className="font-display text-xl font-bold mb-6 text-destructive">Athlete Profile</h4>
          <div className="space-y-5">
            {stats.map((s, i) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <s.icon className="w-4 h-4 text-destructive" />
                    {s.label}
                  </span>
                  <span className="font-bold text-foreground">{s.pct}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.15 }}
                    className="bg-gradient-to-r from-destructive to-primary h-2.5 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 p-6 rounded-2xl border border-border backdrop-blur-sm"
        >
          <h4 className="font-display text-xl font-bold mb-6 text-destructive">vs Other Combat Sports</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="text-left pb-3 font-semibold">Sport</th>
                  <th className="text-center pb-3 font-semibold">Throws</th>
                  <th className="text-center pb-3 font-semibold">Ground</th>
                  <th className="text-center pb-3 font-semibold">Strikes</th>
                  <th className="text-center pb-3 font-semibold">Self-Def</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((c) => (
                  <tr
                    key={c.sport}
                    className={`border-b border-border/50 ${c.sport === "Sambo" ? "bg-destructive/10" : ""}`}
                  >
                    <td className={`py-3 font-semibold ${c.sport === "Sambo" ? "text-destructive" : "text-foreground"}`}>
                      {c.sport}
                    </td>
                    <td className="text-center py-3">{c.throws}</td>
                    <td className="text-center py-3">{c.ground}</td>
                    <td className="text-center py-3">{c.strikes}</td>
                    <td className="text-center py-3">{c.selfDef}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center bg-gradient-to-r from-destructive/10 via-primary/10 to-destructive/10 p-8 rounded-2xl border border-destructive/20"
      >
        <blockquote className="font-display text-xl md:text-2xl font-bold italic text-foreground leading-relaxed">
          "A true warrior fights not because he hates what is in front of him, but because he loves what is behind him."
        </blockquote>
        <p className="text-muted-foreground mt-4 text-sm tracking-wide uppercase">— The Spirit of Sambo</p>
      </motion.div>
    </div>
  </section>
);

export default SamboSection;
