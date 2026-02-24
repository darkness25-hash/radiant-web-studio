import { motion } from "framer-motion";
import teamMember1 from "@/assets/team-member-1.png";
import teamMember2 from "@/assets/team-member-2.jpeg";
import teamMember3 from "@/assets/team-member-3.jpeg";
import teamMember4 from "@/assets/team-member-4.jpeg";

const members = [
  {
    name: "Research Lead",
    role: "Running Specialist",
    desc: "Focused on endurance training analysis and athlete interview coordination.",
    img: teamMember2,
    roleColor: "text-accent",
  },
  {
    name: "Lead Presenter",
    role: "Football Analyst",
    desc: "Expert in tactical analysis and the beautiful game's historical evolution.",
    img: teamMember3,
    roleColor: "text-primary",
    featured: true,
  },
  {
    name: "Media Coordinator",
    role: "Video Production",
    desc: "Handled interview filming, editing, and visual content creation.",
    img: teamMember4,
    roleColor: "text-secondary",
  },
  {
    name: "Tech Lead",
    role: "Web Developer",
    desc: "Built this interactive presentation and managed the digital experience.",
    img: teamMember1,
    roleColor: "text-accent",
  },
];

const TeamSection = () => (
  <section id="team" className="py-24 bg-muted/30">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
          Meet the <span className="text-accent">Team</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The minds behind this presentation — combining research, design, and passion for sports.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {members.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`group relative rounded-2xl overflow-hidden bg-card border border-border transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/50 ${
              m.featured ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
            }`}
          >
            {m.featured && (
              <span className="absolute top-3 right-3 z-10 px-3 py-1 text-[10px] font-bold tracking-wider bg-primary text-primary-foreground rounded-full">
                PRESENTER
              </span>
            )}

            <div className="h-72 overflow-hidden">
              <img
                src={m.img}
                alt={m.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{m.name}</h3>
              <p className={`text-sm font-semibold mb-2 ${m.roleColor}`}>{m.role}</p>
              <p className="text-sm text-muted-foreground">{m.desc}</p>
            </div>

            {/* Overlay - always visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex items-end p-5">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-1">{m.name}</h3>
                <p className={`text-sm font-semibold ${m.roleColor}`}>{m.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-muted/50 rounded-2xl border border-border backdrop-blur-sm">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground">R</div>
            <div className="w-10 h-10 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-xs font-bold text-secondary-foreground">F</div>
            <div className="w-10 h-10 rounded-full bg-accent border-2 border-background flex items-center justify-center text-xs font-bold text-accent-foreground">T</div>
            <div className="w-10 h-10 rounded-full bg-muted-foreground border-2 border-background flex items-center justify-center text-xs font-bold text-background">D</div>
          </div>
          <span className="text-muted-foreground">United by passion for sports</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default TeamSection;
