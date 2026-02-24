import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  { q: "What is the standard marathon distance?", opts: ["42.195 km", "40 km", "45 km", "38 km"], answer: 0 },
  { q: "How many players on a football team?", opts: ["9", "10", "11", "12"], answer: 2 },
  { q: "Who holds the 100m world record?", opts: ["Usain Bolt", "Carl Lewis", "Tyson Gay", "Yohan Blake"], answer: 0 },
  { q: "Which country won the first World Cup?", opts: ["Brazil", "Uruguay", "Italy", "Argentina"], answer: 1 },
  { q: "What is VO2 max?", opts: ["Max heart rate", "Max oxygen uptake", "Max speed", "Max distance"], answer: 1 },
];

const InteractiveSection = () => {
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const handleSelect = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === questions[qIdx].answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (qIdx < questions.length - 1) {
        setQIdx((q) => q + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 1000);
  };

  const reset = () => {
    setQIdx(0);
    setScore(0);
    setSelected(null);
    setDone(false);
  };

  return (
    <section id="interactive" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Test Your <span className="text-accent">Skills</span>
          </h2>
          <p className="text-muted-foreground">Interactive challenges for the classroom</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-card p-8 rounded-3xl border border-border"
        >
          <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-3">
            <span className="text-2xl">🧠</span> Sports Knowledge Quiz
          </h3>

          {done ? (
            <div className="text-center py-8">
              <div className="text-5xl font-display font-bold text-accent mb-4">{score}/{questions.length}</div>
              <p className="text-muted-foreground mb-6">
                {score >= 4 ? "Amazing! You're a sports expert! 🏆" : score >= 2 ? "Good effort! Keep learning! 💪" : "Time to study up! 📚"}
              </p>
              <button onClick={reset} className="px-6 py-3 bg-accent text-accent-foreground rounded-full font-bold hover:opacity-90 transition-opacity">
                Play Again
              </button>
            </div>
          ) : (
            <>
              <p className="text-lg mb-6 font-semibold text-foreground">{questions[qIdx].q}</p>
              <div className="space-y-3">
                {questions[qIdx].opts.map((opt, i) => {
                  let cls = "border border-border bg-muted/30 hover:bg-muted/60";
                  if (selected !== null) {
                    if (i === questions[qIdx].answer) cls = "border-secondary bg-secondary/20";
                    else if (i === selected) cls = "border-primary bg-primary/20";
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm ${cls}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
                <span className="text-sm text-muted-foreground">Question {qIdx + 1}/{questions.length}</span>
                <span className="font-display text-accent font-bold">Score: {score}</span>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveSection;
