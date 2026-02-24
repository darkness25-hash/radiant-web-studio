import { motion } from "framer-motion";
import { Play } from "lucide-react";

const videos = [
  {
    title: "The Runner's Mindset",
    desc: "Interview with marathon runner discussing training discipline and mental preparation.",
    tag: "Running",
    duration: "8:45 min",
    tagColor: "bg-primary/20 text-primary",
    img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80",
    hoverColor: "hover:text-primary",
    shadow: "shadow-primary/10",
  },
  {
    title: "Tactical Deep Dive",
    desc: "Coach explains modern football formations and team dynamics.",
    tag: "Football",
    duration: "12:20 min",
    tagColor: "bg-secondary/20 text-secondary",
    img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80",
    hoverColor: "hover:text-secondary",
    shadow: "shadow-secondary/10",
  },
];

const VideosSection = () => (
  <section id="videos" className="py-24 bg-muted/30">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
          Interview <span className="text-accent">Series</span>
        </h2>
        <p className="text-muted-foreground">Real insights from athletes and coaches</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {videos.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="group"
          >
            <div className={`relative rounded-2xl overflow-hidden mb-4 shadow-2xl ${v.shadow} aspect-video`}>
              <img src={v.img} alt={v.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-foreground/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-background ml-1" />
                </div>
              </div>
            </div>
            <h3 className={`text-xl font-bold mb-2 transition-colors ${v.hoverColor}`}>{v.title}</h3>
            <p className="text-muted-foreground text-sm">{v.desc}</p>
            <div className="flex gap-2 mt-3">
              <span className={`text-xs px-2 py-1 rounded ${v.tagColor}`}>{v.tag}</span>
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">{v.duration}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default VideosSection;
