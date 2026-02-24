import { motion } from "framer-motion";

const globalStats = [
  { label: "World Cup Viewers", value: "5B+" },
  { label: "Professional Players", value: "130K+" },
  { label: "Registered Clubs", value: "200K+" },
  { label: "Countries Played", value: "210" },
];

const healthBars = [
  { label: "Cardiovascular", pct: 90, val: "+45%" },
  { label: "Muscle Strength", pct: 75, val: "+35%" },
  { label: "Coordination", pct: 85, val: "+60%" },
];

const skills = ["Dribbling", "Passing Accuracy", "Spatial Vision", "Tactical Awareness", "Agility", "Team Communication"];

const FootballSection = () => (
  <section id="football" className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent" />

    <div className="container mx-auto px-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
          The Beautiful <span className="text-secondary">Game</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          More than just kicking a ball — football is a global language combining athleticism, tactics, and teamwork.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 p-6 rounded-2xl border border-border backdrop-blur-sm"
        >
          <h4 className="font-display text-xl font-bold mb-4 text-secondary">Global Impact</h4>
          <ul className="space-y-3 text-sm">
            {globalStats.map((s, i) => (
              <li key={i} className={`flex justify-between pb-2 ${i < globalStats.length - 1 ? "border-b border-border" : ""}`}>
                <span className="text-muted-foreground">{s.label}</span>
                <span className="font-bold text-foreground">{s.value}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-card/50 p-6 rounded-2xl border border-border backdrop-blur-sm"
        >
          <h4 className="font-display text-xl font-bold mb-4 text-secondary">Health Benefits</h4>
          <div className="space-y-4">
            {healthBars.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span className="text-secondary font-semibold">{b.val}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${b.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="bg-secondary h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-gradient-to-r from-secondary/10 to-accent/10 p-6 rounded-2xl border border-secondary/20"
      >
        <h4 className="font-display text-xl font-bold mb-4">Key Skills Required</h4>
        <div className="flex flex-wrap gap-3">
          {skills.map((s) => (
            <span key={s} className="px-4 py-2 bg-background/40 rounded-full text-sm border border-secondary/30 text-muted-foreground">
              {s}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default FootballSection;
