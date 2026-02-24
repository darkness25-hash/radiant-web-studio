import { useState } from "react";
import { motion } from "framer-motion";

const steps = [
  { num: 1, title: "Endurance Base", desc: "Building aerobic capacity through consistent mileage" },
  { num: 2, title: "Interval Training", desc: "High-intensity workouts to improve VO2 max" },
  { num: 3, title: "Mental Resilience", desc: "The psychology of pushing through pain barriers" },
];

const RunningSection = () => {
  const [dist, setDist] = useState("");
  const [time, setTime] = useState("");
  const [pace, setPace] = useState("--:-- /km");

  const calc = () => {
    const d = parseFloat(dist);
    const parts = time.split(":");
    if (parts.length === 2 && d > 0) {
      const totalSec = parseInt(parts[0]) * 60 + parseInt(parts[1]);
      const pacePerKm = totalSec / d;
      const m = Math.floor(pacePerKm / 60);
      const s = Math.round(pacePerKm % 60);
      setPace(`${m}:${s.toString().padStart(2, "0")} /km`);
    }
  };

  return (
    <section id="running" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/15 blur-xl rounded-full" />
              <div className="relative bg-card p-8 rounded-3xl border border-primary/30">
                <h3 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-primary">01</span> Running Analysis
                </h3>

                <div className="bg-background/60 p-4 rounded-xl mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Pace Calculator</span>
                    <span className="text-primary font-bold font-display text-sm">{pace}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <input
                      type="number"
                      placeholder="Distance (km)"
                      value={dist}
                      onChange={(e) => setDist(e.target.value)}
                      className="bg-muted border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                    />
                    <input
                      placeholder="Time (mm:ss)"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="bg-muted border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <button
                    onClick={calc}
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground py-2 rounded text-sm font-bold transition-colors"
                  >
                    Calculate Pace
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { v: "180", l: "Cadence SPM" },
                    { v: "4:30", l: "Min/km Elite" },
                    { v: "2:01", l: "Marathon WR" },
                  ].map((s) => (
                    <div key={s.l} className="bg-background/60 p-3 rounded-lg">
                      <div className="text-xl font-bold text-primary font-display">{s.v}</div>
                      <div className="text-[10px] text-muted-foreground mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              The Art of <span className="text-primary">Movement</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Running is humanity's most ancient sport. From sprinting to ultramarathons, it tests the limits of
              human physiology and psychology.
            </p>

            <div className="space-y-3">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                    {s.num}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-foreground">{s.title}</h4>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RunningSection;
