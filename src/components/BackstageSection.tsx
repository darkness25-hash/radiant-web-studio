import { motion } from "framer-motion";
import { Film, Clapperboard } from "lucide-react";

const BackstageSection = () => (
  <section id="backstage" className="py-24 bg-muted/30">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
          <Clapperboard className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide uppercase">Exclusive</span>
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
          Behind the <span className="text-accent">Scenes</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Get an exclusive look at what happens backstage — the preparation, the energy, and the passion that drives our team.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-accent/10 border border-border">
          <div className="aspect-video">
            <iframe
              src="https://drive.google.com/file/d/1zlZhcFjWcLcVrGIX_3_dlz6MPK1uXNhw/preview"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Backstage Video"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
          <Film className="w-4 h-4" />
          <span className="text-sm">Backstage footage — Our journey behind the curtain</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default BackstageSection;
