import { motion } from "framer-motion";

const cards = [
  {
    emoji: "🏃",
    title: "The Individual",
    desc: "Running represents the purest form of athletic competition — human versus distance, mind versus body.",
    items: ["Endurance & Mental Toughness", "Personal Records", "Biomechanics Efficiency"],
    accent: "primary",
  },
  {
    emoji: "⚽",
    title: "The Collective",
    desc: "Football combines individual skill with tactical coordination, creating a dynamic team ecosystem.",
    items: ["Team Strategy", "Spatial Awareness", "Real-time Decision Making"],
    accent: "secondary",
  },
];

const AboutSection = () => (
  <section id="about" className="py-24 relative">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">The Project</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Through interviews with athletes and coaches, we explored two fundamental approaches to human movement:
          the solitary pursuit of distance and speed in running, versus the collaborative chess match of football.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className={`sport-card-hover p-8 rounded-2xl border backdrop-blur-sm ${
              c.accent === "primary"
                ? "bg-primary/5 border-primary/30"
                : "bg-secondary/5 border-secondary/30"
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl ${
              c.accent === "primary" ? "bg-primary" : "bg-secondary"
            }`}>
              {c.emoji}
            </div>
            <h3 className={`font-display text-2xl font-bold mb-4 ${
              c.accent === "primary" ? "text-primary" : "text-secondary"
            }`}>
              {c.title}
            </h3>
            <p className="text-muted-foreground mb-4">{c.desc}</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {c.items.map((item) => (
                <li key={item} className="flex items-center gap-2">• {item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
