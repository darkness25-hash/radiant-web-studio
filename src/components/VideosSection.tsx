import { motion } from "framer-motion";
import { Film } from "lucide-react";

const videos = [
  {
    title: "Training Day Highlights",
    desc: "Behind the scenes of an intense training session with our athletes.",
    tag: "Training",
    tagColor: "bg-primary/20 text-primary",
    driveId: "1b8WMEUFDn_noSztcYcLFLbx4V3yL6mac",
  },
  {
    title: "Match Day Preparation",
    desc: "How our team prepares mentally and physically before competition.",
    tag: "Competition",
    tagColor: "bg-secondary/20 text-secondary",
    driveId: "1Q_z9BtSpun093Bw8Ye1VsQX0JOJOZHVl",
  },
  {
    title: "Athlete Spotlight",
    desc: "An exclusive interview with one of our top-performing athletes.",
    tag: "Interview",
    tagColor: "bg-accent/20 text-accent",
    driveId: "14HAMm_J9wuVI4skUWsGeX2vflGmntIfO",
  },
  {
    title: "Season Recap",
    desc: "A look back at the highlights and memorable moments of the season.",
    tag: "Recap",
    tagColor: "bg-primary/20 text-primary",
    driveId: "1e8T_ue_K08dHTRC6QIatDdE3eACYV3Q8",
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
            key={v.driveId}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="group"
          >
            <div className="relative rounded-2xl overflow-hidden mb-4 shadow-2xl shadow-accent/10 border border-border aspect-video">
              <iframe
                src={`https://drive.google.com/file/d/${v.driveId}/preview`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={v.title}
              />
            </div>
            <h3 className="text-xl font-bold mb-2">{v.title}</h3>
            <p className="text-muted-foreground text-sm">{v.desc}</p>
            <div className="flex gap-2 mt-3">
              <span className={`text-xs px-2 py-1 rounded ${v.tagColor}`}>{v.tag}</span>
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded flex items-center gap-1">
                <Film className="w-3 h-3" /> Video
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default VideosSection;
