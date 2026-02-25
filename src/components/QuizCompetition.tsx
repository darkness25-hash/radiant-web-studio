import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Users, Play, ChevronRight, RotateCcw, Volume2, VolumeX, Lightbulb, CheckCircle2, XCircle, Zap, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

/* ─── Quiz Data ─── */
interface Question {
  id: number;
  category: "Football" | "Running" | "Sambo";
  difficulty: "Easy" | "Medium" | "Hard";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  hint: string;
}

const allQuestions: Question[] = [
  // FOOTBALL
  { id: 1, category: "Football", difficulty: "Easy", question: "How many players are on a football team on the field?", options: ["9", "10", "11", "12"], answer: 2, explanation: "A standard football match is played with 11 players per side, including the goalkeeper.", hint: "Think about the number on a classic jersey of a full squad." },
  { id: 2, category: "Football", difficulty: "Easy", question: "Which country won the FIFA World Cup in 2022?", options: ["France", "Argentina", "Brazil", "Croatia"], answer: 1, explanation: "Argentina, led by Lionel Messi, won the 2022 FIFA World Cup held in Qatar.", hint: "Their captain finally lifted the trophy after decades of trying." },
  { id: 3, category: "Football", difficulty: "Medium", question: "What is the diameter of a standard football (Size 5)?", options: ["18-20 cm", "22-23 cm", "27-28 cm", "30-32 cm"], answer: 1, explanation: "A Size 5 football has a circumference of 68-70 cm, giving a diameter of approximately 22-23 cm.", hint: "It fits comfortably in two hands." },
  { id: 4, category: "Football", difficulty: "Medium", question: "Which player has scored the most goals in World Cup history?", options: ["Pelé", "Miroslav Klose", "Ronaldo Nazário", "Just Fontaine"], answer: 1, explanation: "Miroslav Klose scored 16 goals across four World Cups (2002–2014), the all-time record.", hint: "This German striker broke a Brazilian's record in 2014." },
  { id: 5, category: "Football", difficulty: "Hard", question: "What is the 'offside trap' in football?", options: ["A defensive strategy to catch attackers offside", "A type of free kick", "A goalkeeper technique", "A dribbling skill"], answer: 0, explanation: "The offside trap is a defensive tactic where defenders move forward in unison to leave attackers in an offside position.", hint: "It's about defensive positioning, not the ball." },
  { id: 6, category: "Football", difficulty: "Hard", question: "Which stadium is the largest football stadium in the world?", options: ["Camp Nou", "Maracanã", "Rungrado 1st of May Stadium", "Wembley"], answer: 2, explanation: "The Rungrado 1st of May Stadium in Pyongyang, North Korea, holds 114,000 people.", hint: "It's not in Europe or South America." },
  { id: 7, category: "Football", difficulty: "Medium", question: "How long is a standard football match (excluding extra time)?", options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"], answer: 1, explanation: "A standard match consists of two halves of 45 minutes each, totaling 90 minutes.", hint: "Two equal halves make up this total." },
  // RUNNING
  { id: 8, category: "Running", difficulty: "Easy", question: "What is the standard marathon distance?", options: ["40 km", "42.195 km", "45 km", "50 km"], answer: 1, explanation: "The marathon distance of 42.195 km was standardized at the 1908 London Olympics.", hint: "It's between 42 and 43 kilometers." },
  { id: 9, category: "Running", difficulty: "Easy", question: "Who holds the men's 100m world record?", options: ["Carl Lewis", "Usain Bolt", "Tyson Gay", "Yohan Blake"], answer: 1, explanation: "Usain Bolt set the 100m world record of 9.58 seconds at the 2009 World Championships in Berlin.", hint: "This Jamaican sprinter is nicknamed 'Lightning'." },
  { id: 10, category: "Running", difficulty: "Medium", question: "What does VO2 max measure?", options: ["Maximum heart rate", "Maximum oxygen uptake", "Maximum speed", "Maximum stride length"], answer: 1, explanation: "VO2 max measures the maximum rate of oxygen consumption during intense exercise — a key fitness indicator.", hint: "It's about how much your body can use from the air." },
  { id: 11, category: "Running", difficulty: "Medium", question: "What is a 'negative split' in running?", options: ["Running the second half faster", "Slowing down mid-race", "Splitting into groups", "A type of sprint start"], answer: 0, explanation: "A negative split means running the second half of a race faster than the first — a proven race strategy.", hint: "It's about pacing: start slower, finish faster." },
  { id: 12, category: "Running", difficulty: "Hard", question: "What is the women's marathon world record (approx)?", options: ["2:08:00", "2:11:53", "2:14:04", "2:18:37"], answer: 1, explanation: "The women's marathon world record is 2:11:53, set by Tigst Assefa in 2023 at the Berlin Marathon.", hint: "It was set in Berlin by an Ethiopian runner." },
  { id: 13, category: "Running", difficulty: "Hard", question: "What is 'lactate threshold'?", options: ["The point muscles start cramping", "The intensity where lactate accumulates faster than it's cleared", "Maximum heart rate zone", "The speed at which you can sprint"], answer: 1, explanation: "Lactate threshold is the exercise intensity at which lactic acid builds up in the blood faster than it can be removed.", hint: "It's a biological tipping point during sustained effort." },
  { id: 14, category: "Running", difficulty: "Easy", question: "How many lanes does a standard outdoor track have?", options: ["6", "8", "10", "12"], answer: 1, explanation: "A standard Olympic outdoor running track has 8 lanes.", hint: "Count the lanes you see during Olympic sprints." },
  // SAMBO
  { id: 15, category: "Sambo", difficulty: "Easy", question: "In which country did Sambo originate?", options: ["Japan", "Brazil", "Russia", "Mongolia"], answer: 2, explanation: "Sambo was developed in the Soviet Union (Russia) in the 1920s–1930s by the Red Army.", hint: "Think of a large country spanning Europe and Asia." },
  { id: 16, category: "Sambo", difficulty: "Easy", question: "What does 'SAMBO' stand for?", options: ["Self-defense without weapons", "Strong arms martial boxing", "Soviet armed martial battle", "Systematic attack and movement basics"], answer: 0, explanation: "SAMBO is an acronym for 'SAMozashchita Bez Oruzhiya' — Russian for 'self-defense without weapons'.", hint: "The name describes its core philosophy: protection without tools." },
  { id: 17, category: "Sambo", difficulty: "Medium", question: "Which two founders are credited with creating Sambo?", options: ["Viktor Spiridonov & Vasili Oshchepkov", "Jigoro Kano & Morihei Ueshiba", "Hélio Gracie & Mitsuyo Maeda", "Bruce Lee & Dan Inosanto"], answer: 0, explanation: "Viktor Spiridonov and Vasili Oshchepkov developed Sambo by combining techniques from judo, wrestling, and traditional folk styles.", hint: "Both were Soviet military/martial arts experts." },
  { id: 18, category: "Sambo", difficulty: "Medium", question: "How many main types of Sambo are there?", options: ["1", "2", "3", "4"], answer: 2, explanation: "There are three main types: Sport Sambo, Combat Sambo, and Freestyle Sambo.", hint: "Sport, Combat, and one more…" },
  { id: 19, category: "Sambo", difficulty: "Hard", question: "Which famous MMA fighter is known for their Sambo background?", options: ["Conor McGregor", "Khabib Nurmagomedov", "Anderson Silva", "Georges St-Pierre"], answer: 1, explanation: "Khabib Nurmagomedov, the undefeated UFC lightweight champion, is a Combat Sambo World Champion.", hint: "This undefeated fighter is from Dagestan, Russia." },
  { id: 20, category: "Sambo", difficulty: "Hard", question: "In which year was Sambo recognized by the International Olympic Committee?", options: ["1968", "1980", "2018", "It has not been recognized"], answer: 2, explanation: "FIAS (International Sambo Federation) received provisional recognition from the IOC in 2018.", hint: "It's a relatively recent achievement — in the last decade." },
];

/* ─── Group Distribution ─── */
const groupNames = ["Group A", "Group B", "Group C", "Group D"];
const groupColors = [
  "from-primary to-primary/70",
  "from-secondary to-secondary/70",
  "from-accent to-accent/70",
  "from-destructive to-destructive/70",
];
const groupEmojis = ["🦁", "🐺", "🦅", "🔥"];

function distributeQuestions(): Question[][] {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  const perGroup = Math.floor(shuffled.length / 4);
  return [
    shuffled.slice(0, perGroup),
    shuffled.slice(perGroup, perGroup * 2),
    shuffled.slice(perGroup * 2, perGroup * 3),
    shuffled.slice(perGroup * 3, perGroup * 4 + (shuffled.length % 4)),
  ];
}

/* ─── Scripts ─── */
const introSpeech = `🎙️ Ladies and gentlemen, welcome to the ULTIMATE Sports Quiz Challenge! Today, four teams will battle across Football, Running, and Sambo to prove who truly knows their sports! Each group will face 5 tough questions — speed, knowledge, and teamwork will determine the champion. Are you ready? Let the competition BEGIN!`;

const closingSpeech = `🎙️ What an incredible competition! Every team showed amazing knowledge and sportsmanship today. Remember — in sports and in life, the real victory is in the effort you give. Until next time, stay active, stay curious, and keep competing! Thank you all for playing! 🏆`;

/* ─── Phases ─── */
type Phase = "intro" | "setup" | "playing" | "results" | "winner";

const QuizCompetition = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [groupQuestions, setGroupQuestions] = useState<Question[][]>([]);
  const [activeGroup, setActiveGroup] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [groupDone, setGroupDone] = useState([false, false, false, false]);

  const startCompetition = useCallback(() => {
    const dist = distributeQuestions();
    setGroupQuestions(dist);
    setScores([0, 0, 0, 0]);
    setActiveGroup(0);
    setQIdx(0);
    setSelected(null);
    setShowHint(false);
    setGroupDone([false, false, false, false]);
    setPhase("setup");
  }, []);

  const currentQ = groupQuestions[activeGroup]?.[qIdx];

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (currentQ && i === currentQ.answer) {
      setScores((s) => { const n = [...s]; n[activeGroup] += 1; return n; });
    }
    setTimeout(() => {
      const gq = groupQuestions[activeGroup];
      if (qIdx < gq.length - 1) {
        setQIdx((q) => q + 1);
        setSelected(null);
        setShowHint(false);
      } else {
        setGroupDone((d) => { const n = [...d]; n[activeGroup] = true; return n; });
        if (activeGroup < 3) {
          setActiveGroup((g) => g + 1);
          setQIdx(0);
          setSelected(null);
          setShowHint(false);
        } else {
          setPhase("results");
        }
      }
    }, 1800);
  };

  const winnerIdx = scores.indexOf(Math.max(...scores));

  const restart = () => {
    setPhase("intro");
  };

  /* ─── Category badge color ─── */
  const catColor = (c: string) => {
    if (c === "Football") return "bg-secondary/20 text-secondary";
    if (c === "Running") return "bg-accent/20 text-accent";
    return "bg-destructive/20 text-destructive";
  };
  const diffColor = (d: string) => {
    if (d === "Easy") return "bg-secondary/20 text-secondary";
    if (d === "Medium") return "bg-primary/20 text-primary";
    return "bg-destructive/20 text-destructive";
  };

  return (
    <section id="quiz" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary">🏆</span> Quiz <span className="text-gradient-brand">Competition</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Football • Running • Sambo — 4 Groups battle for the title!
          </p>
        </motion.div>

        {/* Sound toggle */}
        <div className="flex justify-end mb-4 max-w-3xl mx-auto">
          <button onClick={() => setSoundOn(!soundOn)} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full border border-border">
            {soundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            {soundOn ? "Sound On" : "Sound Off"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {/* ════════ INTRO ════════ */}
          {phase === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-3xl p-8 md:p-12 text-center">
                <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="text-6xl mb-6">🎙️</motion.div>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">Host Introduction</h3>
                <div className="bg-muted/30 border border-border rounded-2xl p-6 mb-8 text-left">
                  <p className="text-muted-foreground leading-relaxed italic text-sm md:text-base">"{introSpeech}"</p>
                </div>
                <p className="text-xs text-muted-foreground mb-6">🔊 Play energetic sports intro music before reading</p>
                <button onClick={startCompetition} className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full font-display font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1">
                  <Play size={20} /> Start Competition
                </button>
              </div>
            </motion.div>
          )}

          {/* ════════ SETUP / GROUP SELECT ════════ */}
          {phase === "setup" && (
            <motion.div key="setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-3xl p-8">
                <h3 className="font-display text-xl font-bold mb-6 text-center">Select Active Group</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {groupNames.map((name, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setActiveGroup(i); setQIdx(0); setSelected(null); setShowHint(false); setPhase("playing"); }}
                      disabled={groupDone[i]}
                      className={`p-6 rounded-2xl border border-border text-center transition-all ${groupDone[i] ? "opacity-40 cursor-not-allowed" : "hover:border-primary/50 cursor-pointer"}`}
                    >
                      <div className="text-3xl mb-2">{groupEmojis[i]}</div>
                      <div className="font-display font-bold text-sm">{name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{groupQuestions[i]?.length} Qs</div>
                      {groupDone[i] && <div className="text-xs text-secondary mt-1 font-bold">✓ Done ({scores[i]} pts)</div>}
                    </motion.button>
                  ))}
                </div>
                {groupDone.every(Boolean) && (
                  <div className="text-center">
                    <button onClick={() => setPhase("results")} className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full font-display font-bold hover:shadow-lg transition-all">
                      View Results <ChevronRight className="inline ml-1" size={18} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ════════ PLAYING ════════ */}
          {phase === "playing" && currentQ && (
            <motion.div key={`play-${activeGroup}-${qIdx}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-3xl overflow-hidden">
                {/* Header bar */}
                <div className={`bg-gradient-to-r ${groupColors[activeGroup]} p-4 flex items-center justify-between`}>
                  <div className="flex items-center gap-3 text-primary-foreground">
                    <span className="text-2xl">{groupEmojis[activeGroup]}</span>
                    <span className="font-display font-bold">{groupNames[activeGroup]}</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-foreground/90 text-sm">
                    <span>Q {qIdx + 1}/{groupQuestions[activeGroup].length}</span>
                    <span className="font-bold">Score: {scores[activeGroup]}</span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {/* Badges */}
                  <div className="flex gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${catColor(currentQ.category)}`}>{currentQ.category}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${diffColor(currentQ.difficulty)}`}>{currentQ.difficulty}</span>
                  </div>

                  {/* Progress */}
                  <Progress value={((qIdx + 1) / groupQuestions[activeGroup].length) * 100} className="h-2 mb-6" />

                  {/* Question */}
                  <p className="text-lg md:text-xl font-semibold text-foreground mb-6">{currentQ.question}</p>

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    {currentQ.options.map((opt, i) => {
                      const letter = ["A", "B", "C", "D"][i];
                      let cls = "border-border bg-muted/20 hover:bg-muted/40 hover:border-muted-foreground/30";
                      if (selected !== null) {
                        if (i === currentQ.answer) cls = "border-secondary bg-secondary/20";
                        else if (i === selected) cls = "border-destructive bg-destructive/20";
                      }
                      return (
                        <motion.button
                          key={i}
                          whileHover={selected === null ? { scale: 1.01 } : {}}
                          whileTap={selected === null ? { scale: 0.99 } : {}}
                          onClick={() => handleAnswer(i)}
                          disabled={selected !== null}
                          className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center gap-4 ${cls}`}
                        >
                          <span className="font-display font-bold text-muted-foreground text-sm w-6">{letter}</span>
                          <span className="text-sm md:text-base">{opt}</span>
                          {selected !== null && i === currentQ.answer && <CheckCircle2 className="ml-auto text-secondary" size={20} />}
                          {selected !== null && i === selected && i !== currentQ.answer && <XCircle className="ml-auto text-destructive" size={20} />}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explanation after answer */}
                  <AnimatePresence>
                    {selected !== null && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-muted/30 border border-border rounded-xl p-4 mb-4">
                        <p className="text-sm text-muted-foreground"><strong className="text-foreground">Explanation:</strong> {currentQ.explanation}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hint */}
                  {selected === null && (
                    <button onClick={() => setShowHint(!showHint)} className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors">
                      <Lightbulb size={14} /> {showHint ? "Hide Hint" : "Need a Hint?"}
                    </button>
                  )}
                  <AnimatePresence>
                    {showHint && selected === null && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 bg-primary/10 border border-primary/20 rounded-xl p-3">
                        <p className="text-xs text-primary/80">💡 {currentQ.hint}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Back to group select */}
              <div className="text-center mt-4">
                <button onClick={() => setPhase("setup")} className="text-xs text-muted-foreground hover:text-foreground transition-colors underline">
                  ← Back to Group Selection
                </button>
              </div>
            </motion.div>
          )}

          {/* ════════ RESULTS ════════ */}
          {phase === "results" && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-3xl mx-auto">
              <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">📊 Final Scoreboard</h3>
                <div className="space-y-4 mb-10">
                  {[...scores.map((s, i) => ({ score: s, idx: i }))]
                    .sort((a, b) => b.score - a.score)
                    .map((item, rank) => (
                      <motion.div
                        key={item.idx}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: rank * 0.2 }}
                        className={`flex items-center gap-4 p-4 rounded-2xl border ${rank === 0 ? "border-primary bg-primary/10" : "border-border bg-muted/20"}`}
                      >
                        <span className="font-display text-2xl font-bold w-8 text-center">
                          {rank === 0 ? "🥇" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : `#${rank + 1}`}
                        </span>
                        <span className="text-xl">{groupEmojis[item.idx]}</span>
                        <span className="font-display font-bold flex-1">{groupNames[item.idx]}</span>
                        <div className="flex items-center gap-2">
                          <Star className="text-primary" size={16} />
                          <span className="font-display text-xl font-bold text-primary">{item.score}</span>
                          <span className="text-xs text-muted-foreground">/ {groupQuestions[item.idx]?.length}</span>
                        </div>
                      </motion.div>
                    ))}
                </div>
                <div className="text-center">
                  <button onClick={() => setPhase("winner")} className="px-8 py-4 bg-gradient-to-r from-primary via-destructive to-secondary text-primary-foreground rounded-full font-display font-bold text-lg hover:shadow-lg transition-all animate-pulse">
                    🏆 Announce Winner
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════ WINNER ════════ */}
          {phase === "winner" && (
            <motion.div key="winner" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", damping: 15 }} className="max-w-3xl mx-auto">
              <div className="bg-card border border-primary/30 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
                {/* Confetti-like particles */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: `hsl(${i * 30}, 80%, 60%)`,
                      left: `${10 + (i * 7)}%`,
                      top: `${10 + ((i * 13) % 80)}%`,
                    }}
                    animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3], scale: [0.5, 1.2, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 + (i * 0.3), delay: i * 0.1 }}
                  />
                ))}

                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-7xl mb-4">🏆</motion.div>

                <h3 className="font-display text-3xl md:text-4xl font-bold mb-2 text-gradient-brand">
                  {groupNames[winnerIdx]} Wins!
                </h3>
                <p className="text-xl mb-6">{groupEmojis[winnerIdx]} Champions!</p>

                <div className="bg-muted/30 border border-border rounded-2xl p-6 mb-8 text-left max-w-xl mx-auto">
                  <p className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-wider">🎙️ Winner Announcement Script</p>
                  <p className="text-muted-foreground leading-relaxed italic text-sm">
                    "And the winner is... {groupNames[winnerIdx]}! {groupEmojis[winnerIdx]} With an incredible score of {scores[winnerIdx]} points, they've proven themselves as the ultimate sports knowledge champions! Give them a round of applause! Every team played brilliantly today — you are ALL winners in the game of knowledge! 🏆🎉"
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">🔊 Play crowd cheering sound effect now!</p>
                </div>

                {/* Closing speech */}
                <div className="bg-muted/20 border border-border rounded-2xl p-6 mb-8 text-left max-w-xl mx-auto">
                  <p className="text-xs text-muted-foreground mb-2 font-bold uppercase tracking-wider">🎙️ Closing Speech</p>
                  <p className="text-muted-foreground leading-relaxed italic text-sm">"{closingSpeech}"</p>
                </div>

                <button onClick={restart} className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-full font-display font-bold hover:shadow-lg transition-all">
                  <RotateCcw size={18} /> Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default QuizCompetition;
