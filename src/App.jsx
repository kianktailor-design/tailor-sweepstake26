import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shuffle,
  RotateCcw,
  Eye,
  EyeOff,
  Sparkles,
  Crown,
  Flame,
  PartyPopper,
  X,
  Zap,
  Skull,
  Table2,
  ShieldCheck,
  Gem,
  Coins,
  TimerReset,
  Rocket,
  Clock3,
  CalendarDays,
  ShieldQuestion,
  Trophy,
  Share2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DRAW_DATE = new Date("2026-06-05T18:00:00+01:00");

const colourThemes = [
  { colour: "from-yellow-300 via-green-400 to-blue-500", shirt: "bg-yellow-300 text-green-900", symbol: "🏆" },
  { colour: "from-sky-300 via-white to-blue-500", shirt: "bg-sky-300 text-blue-950", symbol: "⚽" },
  { colour: "from-red-500 via-white to-blue-600", shirt: "bg-white text-red-600", symbol: "🔥" },
  { colour: "from-fuchsia-400 via-pink-400 to-orange-300", shirt: "bg-pink-300 text-fuchsia-950", symbol: "✨" },
  { colour: "from-emerald-400 via-cyan-300 to-blue-500", shirt: "bg-cyan-300 text-slate-950", symbol: "💫" },
  { colour: "from-orange-400 via-yellow-300 to-red-500", shirt: "bg-orange-300 text-red-950", symbol: "🎯" },
  { colour: "from-violet-500 via-purple-400 to-pink-400", shirt: "bg-violet-300 text-violet-950", symbol: "👑" },
  { colour: "from-lime-300 via-emerald-400 to-teal-500", shirt: "bg-lime-300 text-emerald-950", symbol: "🚀" },
];

const participants = [
  {
    name: "Chantelle",
    phrase: "Nail artist",
    title: "The Set-Piece Stylist",
    verdict: "Precision finish, flawless shape, and absolutely no tolerance for a scruffy tournament run.",
    mood: "If the team looks good while winning, this could become a full glamour campaign.",
    stat: "Manicure-level composure required",
  },
  {
    name: "Chivani",
    phrase: "Fixing teeth properly",
    title: "The Defensive Dentist",
    verdict: "Here to fix gaps at the back, tighten the bite, and remove any weak links before extra time.",
    mood: "Clean sheets only. Anything leaky at the back will need urgent treatment.",
    stat: "Bite pressure: elite",
  },
  {
    name: "Millie",
    phrase: "Jorts",
    title: "The Denim Dark Horse",
    verdict: "A bold look, a brave draw, and the confidence of someone turning up to a final in jorts.",
    mood: "Nobody understands the tactic yet, which makes it strangely dangerous.",
    stat: "Style points: unavoidable",
  },
  {
    name: "Bhavna Tailor",
    phrase: "Vodka ultra",
    title: "The Ultra Spirit Captain",
    verdict: "Tournament hopes may rise quickly, confidence may become loud, and celebrations may start dangerously early.",
    mood: "One win and this becomes a full party bus to the knockouts.",
    stat: "Celebration risk: high",
  },
  {
    name: "Bhav T",
    phrase: "Pharmacist",
    title: "The Tournament Pharmacist",
    verdict: "Calm under pressure, clinically organised, and ready to prescribe a knockout-stage miracle.",
    mood: "Pain relief for penalties may be required later.",
    stat: "Dosage: one win every four days",
  },
  {
    name: "Jaiden",
    phrase: "Injured knee/back/shoulder",
    title: "The Injury-Time Specialist",
    verdict: "The body may be questionable, but the tournament spirit is somehow still available for selection.",
    mood: "Likely to survive the group stage with strapping, vibes, and blind optimism.",
    stat: "Fitness test: pending",
  },
  {
    name: "Sean",
    phrase: "Sean da Paul",
    title: "The Temperature Raiser",
    verdict: "When the whistle goes, expect noise, rhythm, and a campaign that refuses to stay quiet.",
    mood: "From group stage to extra time, this draw may need its own soundtrack.",
    stat: "Stadium volume: up",
  },
  {
    name: "Kian",
    phrase: "DJ ktt",
    title: "The Decks-and-Tactics Manager",
    verdict: "Mixing formations, dropping transitions, and pretending the whole draw was not secretly engineered.",
    mood: "If this team wins, the victory parade will somehow have a warm-up set.",
    stat: "BPM: tournament tempo",
  },
  {
    name: "Ria B",
    phrase: "Lyric queen",
    title: "The Touchline Lyric Queen",
    verdict: "Every goal needs a soundtrack, every win needs a chorus, and every knockout run needs a dramatic verse.",
    mood: "If this team starts winning, the celebrations may come with full lyrics and unnecessary harmonies.",
    stat: "Anthem knowledge: dangerous",
  },
  {
    name: "Rita",
    phrase: "Dhokra ultra",
    title: "The Dhokra Ultra",
    verdict: "A traditional powerhouse with ultra-level belief. This campaign will not be quiet or subtle.",
    mood: "If momentum starts, the whole kitchen-table pundit panel is in trouble.",
    stat: "Home support: serious",
  },
  {
    name: "Aitor",
    phrase: "Hola, coma estas?",
    title: "The International Smooth Talker",
    verdict: "Multilingual confidence, questionable grammar, and a team that might charm its way through the groups.",
    mood: "Could talk the referee into checking VAR twice.",
    stat: "Diplomatic immunity: requested",
  },
  {
    name: "Niks",
    phrase: "Influencer in the making",
    title: "The Content Creator FC",
    verdict: "Every goal needs a reaction clip, every win needs a story, and every loss needs a notes-app statement.",
    mood: "If this team goes deep, the tournament arc will be fully documented.",
    stat: "Engagement rate: rising",
  },
  {
    name: "Neshani",
    phrase: "Mystery pick",
    title: "The Wildcard Wonder",
    verdict: "Nobody knows what this draw is about to become, which is exactly why it feels suspiciously dangerous.",
    mood: "Could be a quiet group-stage exit. Could also become the family’s most annoying success story.",
    stat: "Wildcard energy: unstable",
  },
  {
    name: "Nehal",
    phrase: "Can you hear me?",
    title: "The VAR Audio Check",
    verdict: "Communication is key. Unfortunately, this tournament may involve shouting over the referee anyway.",
    mood: "If a penalty decision goes wrong, the whole room will definitely hear it.",
    stat: "Mic check: live",
  },
  {
    name: "Nilesh",
    phrase: "Mama’s wings",
    title: "The Wing-Back Specialist",
    verdict: "Flying down the flanks, serving crosses, and possibly demanding snacks at half-time.",
    mood: "A strong wing game could carry this team further than expected.",
    stat: "Wing supply: dangerous",
  },
  {
    name: "Urvashi",
    phrase: "Circa",
    title: "The Late-Night Kick-Off",
    verdict: "Mysterious timing, strong vibes, and a team that may only come alive after dark.",
    mood: "If the fixtures are late, this becomes a home advantage.",
    stat: "Kick-off time: circa chaos",
  },
  {
    name: "Ishani",
    phrase: "Ice cold",
    title: "The Ice-Cold Playmaker",
    verdict: "Calm on the ball, ruthless under pressure, and emotionally unavailable to penalty shootout panic.",
    mood: "If this team keeps its head while everyone else melts down, this could be a serious problem.",
    stat: "Composure rating: frozen",
  },
  {
    name: "Anil",
    phrase: "Cheffing it up",
    title: "The Touchline Chef",
    verdict: "Cooking tactics, seasoning the midfield, and hoping nobody burns the group stage.",
    mood: "One upset win and the whole tournament starts smelling like a masterclass.",
    stat: "Recipe: goals and vibes",
  },
  {
    name: "Kristan",
    phrase: "Ibiza king",
    title: "The Ibiza Away-Day King",
    verdict: "Big energy, late nights, and a team that treats every knockout round like closing party season.",
    mood: "If this country wins, sunglasses may be required indoors.",
    stat: "Party press: relentless",
  },
  {
    name: "Jay",
    phrase: "Arsenal coyg",
    title: "The COYG Commentator",
    verdict: "Every match will somehow be compared to Arsenal, even if the country has no Arsenal players.",
    mood: "Expect hope, analysis, stress, and at least one mention of needing a proper striker.",
    stat: "Title charge: familiar feeling",
  },
  {
    name: "Puran",
    phrase: "Bmw man",
    title: "The German Engineering Pick",
    verdict: "Reliable, polished, and expecting the team to handle corners like a premium machine.",
    mood: "If this team starts badly, diagnostics will be required immediately.",
    stat: "Engine mode: tournament",
  },
  {
    name: "Trishelle",
    phrase: "Superhost",
    title: "The World Cup Superhost",
    verdict: "Hospitality levels are high, but opposition teams should not expect a warm welcome.",
    mood: "Five-star vibes if the team behaves. One-star review if they go out early.",
    stat: "Guest rating: depends on VAR",
  },
  {
    name: "Krishan",
    phrase: "Man utd 4ever",
    title: "The Eternal Rebuild Believer",
    verdict: "Faith through pain, loyalty through chaos, and somehow still believing this could be the year.",
    mood: "Perfectly trained for tournament disappointment, which may actually be an advantage.",
    stat: "Hope cycle: restarted",
  },
  {
    name: "Ria T",
    phrase: "Mrs worldwide",
    title: "Mrs Worldwide Cup",
    verdict: "Global energy, international confidence, and a team ready to make the whole tournament its business trip.",
    mood: "No group is too far, no away day too dramatic.",
    stat: "Passport pages: full",
  },
  {
    name: "Bharat",
    phrase: "Bald eagle",
    title: "The Aerial Threat",
    verdict: "Majestic in the air, dangerous from set pieces, and ready to circle any weak defence.",
    mood: "Corners may suddenly become a personality trait.",
    stat: "Header potential: soaring",
  },
  {
    name: "Vishay",
    phrase: "Future sparky",
    title: "The Electric Substitution",
    verdict: "High voltage, sudden sparks, and a team capable of lighting up the tournament unexpectedly.",
    mood: "If the attack clicks, the whole draw could short-circuit.",
    stat: "Voltage: rising",
  },
  {
    name: "Raj",
    phrase: "Fixes everything",
    title: "The Emergency Fixer",
    verdict: "Leaky defence? Broken midfield? Last-minute crisis? Raj’s team will apparently sort it.",
    mood: "If the campaign collapses, this draw is already holding a toolkit.",
    stat: "Repair time: stoppage time",
  },
  {
    name: "Ciyaa",
    phrase: "Dancing queen",
    title: "The Celebration Specialist",
    verdict: "If the goals start flowing, the celebrations may outscore the actual team.",
    mood: "A deep run could turn every matchday into a dance floor.",
    stat: "Goal celebration: rehearsed",
  },
  {
    name: "Bela",
    phrase: "Beauty queen",
    title: "The Pageant Pick",
    verdict: "Elegance, confidence, and the expectation that even a scrappy 1-0 win should look glamorous.",
    mood: "If trophies were awarded for aura, this team would already be in the final.",
    stat: "Aura rating: finalist",
  },
  {
    name: "Ciroc",
    phrase: "Woof",
    title: "The Underdog Bark",
    verdict: "Small warning: this pick may start barking before it starts biting, but the bite could arrive in the knockouts.",
    mood: "Every upset win deserves a howl in the group chat.",
    stat: "Bark-to-bite ratio: unknown",
  },
  {
    name: "Mihir",
    phrase: "Diy warrior",
    title: "The DIY Manager",
    verdict: "No fancy system needed. Just patch the defence, build a midfield, and somehow assemble a tournament run.",
    mood: "Flat-pack football, but if it works, nobody is allowed to question the instructions.",
    stat: "Assembly difficulty: World Cup",
  },
  {
    name: "Kantilal",
    phrase: "Each-way accumulator",
    title: "The Accumulator King",
    verdict: "Always backing the long odds, always one result away from a life-changing payout, always blaming the last leg.",
    mood: "If the team goes on a run, the bet slip becomes a family heirloom.",
    stat: "Odds preferred: nothing under 50/1",
  },
  {
    name: "Shanta",
    phrase: "Hot puri straight from the pan",
    title: "The Puri Powerhouse",
    verdict: "Comes in golden, puffed up with confidence, and best enjoyed before the rivals even sit down.",
    mood: "One good result and the whole kitchen is celebrating with a fresh batch.",
    stat: "Rise rate: instant",
  },
  {
    name: "Shenika",
    phrase: "20/20 vision",
    title: "The Optometrist",
    verdict: "Reads the game two passes ahead, spots the weak link from across the pitch, and never misses a thing.",
    mood: "Clear-eyed about the chances, but the prescription says deep run.",
    stat: "Vision: pinpoint",
  },
];

const entries = participants.map((person, index) => {
  const theme = colourThemes[index % colourThemes.length];
  return {
    ...person,
    team: "TBC",
    flag: theme.symbol,
    status: "Awaiting draw",
    colour: theme.colour,
    shirt: theme.shirt,
    familyOdds: "Draw pending",
    chaosLevel: 45 + ((index * 7) % 55),
  };
});

const prizes = [
  {
    icon: "🏆",
    title: "Main Winner",
    amount: "£100",
    text: "Goes to whoever draws the team that wins the World Cup. Glory, money, and unbearable bragging rights.",
  },
  {
    icon: "😭",
    title: "Penalty Heartbreak Award",
    amount: "£20",
    text: "First person whose team gets knocked out on penalties. A small payout for maximum emotional damage.",
  },
  {
    icon: "🥇",
    title: "Golden Boot Draw",
    amount: "£20",
    text: "Goes to the person whose team has the tournament’s top goalscorer.",
  },
  {
    icon: "⭐",
    title: "Best of the Rest",
    amount: "£15",
    text: "Awarded to whoever finishes highest out of the bottom 10 ranked teams that are drawn.",
  },
  {
    icon: "🥅",
    title: "Bless Them, No Chance",
    amount: "£15",
    text: "For the team with the fewest shots on goal across the whole tournament. They turned up, and that's what counts.",
  },
];

const navItems = [
  { id: "reveal", label: "Reveal", icon: Sparkles },
  { id: "prizes", label: "Prizes", icon: Coins },
  { id: "tracker", label: "Tracker", icon: Table2 },
];

const STORAGE_KEY = "wc-sweepstake-revealed-v1";

function getInitialRevealState() {
  const base = entries.reduce((acc, entry) => {
    acc[entry.name] = false;
    return acc;
  }, {});

  // Restore previously revealed cards so progress isn't lost on refresh / reopen.
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && typeof saved === "object") {
      return { ...base, ...saved };
    }
  } catch {
    // ignore corrupted / unavailable storage and fall back to a fresh board
  }
  return base;
}

function getCountdownParts(targetDate) {
  const difference = targetDate.getTime() - Date.now();
  const safeDifference = Math.max(difference, 0);
  const days = Math.floor(safeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDifference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDifference / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDifference / 1000) % 60);
  return { days, hours, minutes, seconds, isComplete: difference <= 0 };
}

function CountdownCard() {
  const [countdown, setCountdown] = useState(() => getCountdownParts(DRAW_DATE));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts(DRAW_DATE));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const blocks = [
    { label: "Days", value: countdown.days },
    { label: "Hours", value: countdown.hours },
    { label: "Mins", value: countdown.minutes },
    { label: "Secs", value: countdown.seconds },
  ];

  return (
    <Card className="border-yellow-300/30 bg-yellow-300/10 text-white backdrop-blur-xl lg:w-[25rem]">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-200">Draw countdown</p>
            <p className="mt-1 text-lg font-black">Friday 5 June · 6pm</p>
          </div>
          <Clock3 className="h-8 w-8 text-yellow-200" />
        </div>

        {countdown.isComplete ? (
          <div className="rounded-2xl bg-gradient-to-r from-yellow-300 to-pink-400 p-4 text-center text-xl font-black text-slate-950">
            Draw day is here.
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {blocks.map((block) => (
              <div key={block.label} className="rounded-2xl bg-black/25 p-3 text-center">
                <motion.p
                  key={`${block.label}-${block.value}`}
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-black"
                >
                  {String(block.value).padStart(2, "0")}
                </motion.p>
                <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-white/50">{block.label}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ConfettiBurst({ active }) {
  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]">
      {[...Array(16)].map((_, index) => (
        <motion.span
          key={index}
          className="absolute left-1/2 top-1/2 text-xl"
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.6, rotate: 0 }}
          animate={{
            opacity: 0,
            x: Math.cos(index) * (75 + index * 8),
            y: Math.sin(index * 1.7) * (65 + index * 4),
            scale: 1.2,
            rotate: 220,
          }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          {index % 5 === 0 ? "⚽" : index % 5 === 1 ? "🎉" : index % 5 === 2 ? "✨" : index % 5 === 3 ? "🏆" : "🔥"}
        </motion.span>
      ))}
    </div>
  );
}

function FullScreenCelebration({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[60] flex items-start justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(46)].map((_, index) => {
            const left = (index * 97) % 100;
            const emoji = ["⚽", "🎉", "✨", "🏆", "🔥", "🥳"][index % 6];
            return (
              <motion.span
                key={index}
                className="absolute top-0 text-2xl sm:text-3xl"
                style={{ left: `${left}%` }}
                initial={{ y: -60, opacity: 0, rotate: 0 }}
                animate={{ y: "105vh", opacity: [0, 1, 1, 0.8], rotate: 360 }}
                transition={{
                  duration: 2.2 + (index % 5) * 0.25,
                  delay: (index % 10) * 0.06,
                  ease: "easeIn",
                }}
              >
                {emoji}
              </motion.span>
            );
          })}
          <motion.div
            className="mt-[35vh] rounded-3xl bg-gradient-to-r from-yellow-300 to-pink-400 px-6 py-4 text-center text-2xl font-black text-slate-950 shadow-2xl sm:text-3xl"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
          >
            🎉 Everyone's in the hat!
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoadingBars() {
  return (
    <div className="flex items-end gap-1">
      {[0, 1, 2, 3].map((bar) => (
        <motion.span
          key={bar}
          className="block w-1.5 rounded-full bg-yellow-300"
          animate={{ height: [8, 22, 8] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.12 }}
        />
      ))}
    </div>
  );
}

function DetailModal({ entry, onClose }) {
  // Let keyboard / desktop users dismiss with Escape.
  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!entry) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-3 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950 text-white shadow-2xl"
        initial={{ y: 80, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 80, scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }}
        onClick={(event) => event.stopPropagation()}
      >
          <div className={`absolute inset-0 bg-gradient-to-br ${entry.colour} opacity-25`} />
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-black/40 p-3 text-white backdrop-blur transition hover:bg-black/60"
            aria-label="Close detail view"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative z-10 max-h-[92vh] overflow-y-auto p-5 sm:p-8">
            <div className="flex items-center gap-4 pr-12">
              <div className="text-6xl sm:text-8xl">{entry.flag}</div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-white/50 sm:text-sm">{entry.name}'s team</p>
                <h2 className="text-4xl font-black leading-none sm:text-6xl">{entry.team}</h2>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className={`rounded-full px-4 py-2 text-sm font-black ${entry.shirt}`}>{entry.title}</span>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold">{entry.familyOdds}</span>
              <span className="rounded-full bg-pink-500 px-4 py-2 text-sm font-bold">Chaos {entry.chaosLevel}/100</span>
            </div>

            <div className="mt-7 grid gap-4">
              <Card className="border-white/10 bg-white/10 text-white backdrop-blur">
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-yellow-200">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="font-black">Pre-draw prophecy</h3>
                  </div>
                  <p className="text-base leading-7 text-white/85">{entry.verdict}</p>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/10 text-white backdrop-blur">
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-pink-200">
                    <Zap className="h-5 w-5" />
                    <h3 className="font-black">Tournament mood</h3>
                  </div>
                  <p className="text-base leading-7 text-white/80">{entry.mood}</p>
                </CardContent>
              </Card>

              <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="mb-3 flex items-center gap-2 text-yellow-200">
                  <Flame className="h-5 w-5" />
                  <h3 className="font-black">Family forecast</h3>
                </div>
                <p className="text-sm uppercase tracking-[0.18em] text-white/45">{entry.stat}</p>
                <div className="mt-4 h-4 overflow-hidden rounded-full bg-black/30">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${entry.chaosLevel}%` }}
                    transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-black/25 p-4">
                  <span className="text-sm text-white/60">Drama scanner</span>
                  <LoadingBars />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
  );
}

function PrizesView() {
  return (
    <section className="space-y-5 py-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-yellow-300/30 bg-gradient-to-br from-yellow-300/20 via-pink-400/15 to-cyan-300/15 p-5 text-white shadow-2xl backdrop-blur sm:p-7">
        <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-yellow-300/20 blur-3xl" />
        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-yellow-200">Prize pot</p>
            <h2 className="mt-2 text-4xl font-black sm:text-5xl">£170 up for grabs</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              Main winner gets the big money. The rest is reserved for heartbreak, goals, and beautiful World Cup nonsense.
            </p>
          </div>
          <motion.div
            animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="text-7xl"
          >
            💰
          </motion.div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {prizes.map((prize, index) => (
          <motion.article
            key={prize.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
          >
            <Card className="h-full overflow-hidden border-white/10 bg-white/10 text-white backdrop-blur">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-4xl">{prize.icon}</div>
                  <div className="rounded-2xl bg-yellow-300 px-4 py-2 text-xl font-black text-slate-950">{prize.amount}</div>
                </div>
                <h3 className="mt-5 text-2xl font-black">{prize.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{prize.text}</p>
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </div>

      <Card className="border-cyan-300/20 bg-cyan-300/10 text-white backdrop-blur">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 text-cyan-200">
                <ShieldQuestion className="h-5 w-5" />
                <h3 className="text-xl font-black">34-Team Hat Rule</h3>
              </div>
              <p className="text-sm leading-6 text-white/70">
                There are more World Cup teams than players, so only 34 countries go into the draw. The lowest-ranked qualified teams will be removed using the official FIFA/Coca-Cola Men’s World Ranking at the time of the draw.
              </p>
            </div>
            <div className="rounded-2xl bg-black/25 px-4 py-3 text-sm font-black text-white/80">
              34 players = 34 teams
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function TrackerComingSoon() {
  return (
    <section className="py-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-6 text-white shadow-2xl backdrop-blur sm:p-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-pink-400/20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-yellow-300 to-pink-400 text-slate-950 shadow-xl"
          >
            <TimerReset className="h-12 w-12" />
          </motion.div>

          <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">Tracker</p>
          <h2 className="mt-3 text-4xl font-black sm:text-6xl">Coming soon...</h2>
          <p className="mt-4 text-lg leading-8 text-white/75">Hopefully if Kian can be bothered.</p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-black/25 p-4">
              <ShieldCheck className="mx-auto h-7 w-7 text-emerald-200" />
              <p className="mt-2 text-sm font-bold text-white/70">Live standings</p>
            </div>
            <div className="rounded-2xl bg-black/25 p-4">
              <Skull className="mx-auto h-7 w-7 text-red-200" />
              <p className="mt-2 text-sm font-bold text-white/70">Knockout status</p>
            </div>
            <div className="rounded-2xl bg-black/25 p-4">
              <Rocket className="mx-auto h-7 w-7 text-yellow-200" />
              <p className="mt-2 text-sm font-bold text-white/70">Family leaderboard</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealView({ filteredEntries, revealed, showAll, lastRevealed, revealEntry }) {
  return (
    <>
      <section className="grid flex-1 grid-cols-1 gap-4 py-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredEntries.map((entry) => {
            const isRevealed = revealed[entry.name] || showAll;
            return (
              <motion.article
                layout
                key={entry.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.22 }}
              >
                <button
                  onClick={() => revealEntry(entry)}
                  className="group block h-full w-full text-left focus:outline-none"
                  aria-label={`Reveal ${entry.name}'s draw card`}
                >
                  <div className="relative h-64 rounded-[1.75rem] [perspective:1000px] sm:h-72">
                    <ConfettiBurst active={lastRevealed === entry.name} />
                    <motion.div
                      className="relative h-full w-full rounded-[1.75rem] transition-transform duration-500 [transform-style:preserve-3d]"
                      animate={{ rotateY: isRevealed ? 180 : 0 }}
                    >
                      <div className={`absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/15 bg-gradient-to-br ${entry.colour} p-5 text-slate-950 shadow-2xl [backface-visibility:hidden]`}>
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/35" />
                        <div className="absolute -bottom-12 -left-10 h-36 w-36 rounded-full bg-white/25" />
                        <div className="relative">
                          <div className="mb-4 flex items-center justify-between">
                            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-black uppercase tracking-[0.18em]">Participant</span>
                            <Sparkles className="h-6 w-6" />
                          </div>
                          <h2 className="text-4xl font-black leading-none">{entry.name}</h2>
                          <p className="mt-2 text-base font-bold opacity-75">{entry.title}</p>
                        </div>
                        <div className="relative rounded-3xl bg-white/55 p-4 shadow-inner backdrop-blur">
                          <p className="text-sm font-black uppercase tracking-[0.18em] opacity-70">Team draw</p>
                          <p className="mt-1 text-base font-black">TBC until Friday 5 June</p>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex h-full w-full flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-950 p-5 shadow-2xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div className={`absolute inset-0 bg-gradient-to-br ${entry.colour} opacity-30`} />
                        <div className="relative">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">{entry.name}'s team</p>
                              <h2 className="mt-2 text-5xl font-black leading-none">TBC</h2>
                            </div>
                            <div className="text-5xl drop-shadow-lg">{entry.flag}</div>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <div className="rounded-2xl bg-white/10 p-3">
                              <div className="flex items-center gap-1 text-yellow-200">
                                <Crown className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase">Status</span>
                              </div>
                              <p className="mt-1 truncate text-sm font-black">Draw pending</p>
                            </div>
                            <div className="rounded-2xl bg-white/10 p-3">
                              <div className="flex items-center gap-1 text-pink-200">
                                <Flame className="h-4 w-4" />
                                <span className="text-xs font-bold uppercase">Chaos</span>
                              </div>
                              <p className="mt-1 text-sm font-black">{entry.chaosLevel}/100</p>
                            </div>
                          </div>
                        </div>

                        <div className="relative flex items-center justify-between rounded-2xl bg-black/25 p-3 text-sm font-bold text-white/75">
                          <span>Tap for prophecy</span>
                          <Gem className="h-4 w-4 text-yellow-200" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </section>

      {filteredEntries.length === 0 && (
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/10 p-8 text-center text-white/75 backdrop-blur">
          No matching family member found.
        </div>
      )}
    </>
  );
}

export default function WorldCupSweepstakeReveal() {
  const [revealed, setRevealed] = useState(getInitialRevealState);
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState("");
  const [lastRevealed, setLastRevealed] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [activeTab, setActiveTab] = useState("reveal");
  const [celebrate, setCelebrate] = useState(false);

  const filteredEntries = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return entries;
    return entries.filter(
      (entry) =>
        entry.name.toLowerCase().includes(value) ||
        entry.team.toLowerCase().includes(value) ||
        entry.title.toLowerCase().includes(value) ||
        entry.phrase.toLowerCase().includes(value)
    );
  }, [query]);

  const revealedCount = entries.filter((entry) => revealed[entry.name] || showAll).length;
  const progress = Math.round((revealedCount / entries.length) * 100);
  const allRevealed = revealedCount === entries.length;

  // Save progress so a refresh or reopen keeps revealed cards revealed.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(revealed));
    } catch {
      // storage may be unavailable (private mode etc) — fail silently
    }
  }, [revealed]);

  // Fire one big celebration the moment everyone is in.
  useEffect(() => {
    if (allRevealed) {
      setCelebrate(true);
      if (navigator.vibrate) navigator.vibrate([40, 60, 120]);
      const timeout = setTimeout(() => setCelebrate(false), 2600);
      return () => clearTimeout(timeout);
    }
  }, [allRevealed]);

  function revealEntry(entry) {
    const alreadyRevealed = revealed[entry.name] || showAll;
    if (!alreadyRevealed) {
      setRevealed((current) => ({ ...current, [entry.name]: true }));
      setLastRevealed(entry.name);
      if (navigator.vibrate) navigator.vibrate(30); // little buzz on mobile
      setTimeout(() => setLastRevealed(null), 850);
    }
    setSelectedEntry(entry);
  }

  function revealRandom() {
    const hiddenEntries = entries.filter((entry) => !revealed[entry.name]);
    const pool = hiddenEntries.length > 0 ? hiddenEntries : entries;
    const selected = pool[Math.floor(Math.random() * pool.length)];
    revealEntry(selected);
  }

  function resetBoard() {
    setRevealed(
      entries.reduce((acc, entry) => {
        acc[entry.name] = false;
        return acc;
      }, {})
    );
    setShowAll(false);
    setQuery("");
    setLastRevealed(null);
    setSelectedEntry(null);
    setCelebrate(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  async function shareApp() {
    const url = window.location.href;
    const text =
      "🏆 Family World Cup Sweepstake — reveal your card and meet your pre-draw prophecy!";
    if (navigator.share) {
      try {
        await navigator.share({ title: "World Cup Sweepstake", text, url });
        return;
      } catch {
        // user cancelled the share sheet — do nothing
        return;
      }
    }
    // Fallback for desktop browsers without the share sheet: open WhatsApp.
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`,
      "_blank",
      "noopener"
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#10051f] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(255,0,128,0.34),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(0,200,255,0.30),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(255,220,0,0.25),transparent_32%)]" />
      <div className="fixed inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:36px_36px]" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-8">
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-fuchsia-400/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-yellow-300/25 blur-3xl" />

          <motion.div
            className="absolute right-5 top-5 hidden rotate-12 rounded-3xl bg-yellow-300 px-5 py-3 text-lg font-black text-slate-950 shadow-xl sm:block"
            animate={{ y: [0, -8, 0], rotate: [12, 8, 12] }}
            transition={{ repeat: Infinity, duration: 2.6 }}
          >
            DRAW SOON
          </motion.div>

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/15 px-3 py-1 text-sm text-white/90 backdrop-blur">
                <PartyPopper className="h-4 w-4 text-yellow-200" />
                The Draw Is Coming
              </div>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                The Official Tailor World Cup Sweepstake
              </h1>
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-black uppercase tracking-[0.18em] text-yellow-200">
                🍸 Sponsored by Smirnoff Vodka
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Teams are TBC until Friday 5 June. For now, everyone gets a pre-draw prophecy, a chaos rating, and time to mentally prepare for the country they definitely did not want.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-pink-500 px-3 py-1 text-sm font-bold">£170 prize pot</span>
                <span className="rounded-full bg-yellow-300 px-3 py-1 text-sm font-bold text-slate-950">34 teams in the hat</span>
                <span className="rounded-full bg-cyan-400 px-3 py-1 text-sm font-bold text-slate-950">Worst-ranked teams removed</span>
              </div>
            </div>

            <CountdownCard />
          </div>
        </div>

        <section className="mt-5 grid gap-3 md:grid-cols-4">
          {prizes.map((prize) => (
            <Card key={prize.title} className="border-white/10 bg-white/10 text-white backdrop-blur">
              <CardContent className="flex gap-3 p-4 md:block">
                <div className="text-3xl md:text-4xl">{prize.icon}</div>
                <div>
                  <div className="mt-0 flex items-center gap-2 md:mt-3">
                    <h3 className="font-black">{prize.title}</h3>
                    <span className="rounded-full bg-yellow-300 px-2 py-0.5 text-xs font-black text-slate-950">{prize.amount}</span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-white/65">{prize.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="mt-5 rounded-[2rem] border border-white/10 bg-white/10 p-3 backdrop-blur">
          <div className="grid grid-cols-3 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex h-14 items-center justify-center gap-2 rounded-2xl px-3 text-sm font-black transition ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-yellow-300 to-pink-400 text-slate-950 shadow-lg"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "reveal" && (
          <div className="sticky top-0 z-20 -mx-4 mt-5 border-y border-white/10 bg-[#10051f]/90 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name or nickname..."
                className="h-12 w-full rounded-2xl border border-white/15 bg-white/10 px-4 text-white placeholder:text-white/45 outline-none transition focus:border-yellow-300/70 md:max-w-md"
              />

              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                <Button onClick={revealRandom} className="h-12 rounded-2xl bg-gradient-to-r from-yellow-300 to-pink-400 font-black text-slate-950 hover:opacity-90">
                  <Shuffle className="mr-2 h-4 w-4" />
                  Random
                </Button>
                <Button
                  onClick={() => setShowAll((current) => !current)}
                  variant="secondary"
                  className="h-12 rounded-2xl bg-white/10 text-white hover:bg-white/15"
                >
                  {showAll ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                  {showAll ? "Hide All" : "Reveal All"}
                </Button>
                <Button
                  onClick={shareApp}
                  variant="secondary"
                  className="h-12 rounded-2xl bg-white/10 text-white hover:bg-white/15"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button
                  onClick={resetBoard}
                  variant="secondary"
                  className="col-span-2 h-12 rounded-2xl bg-white/10 text-white hover:bg-white/15 sm:col-span-1"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
              </div>
            </div>

            <div className="mx-auto mt-3 flex max-w-7xl items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
              <span className="shrink-0 text-xs font-black text-white/60">
                {revealedCount}/{entries.length} revealed
              </span>
            </div>
          </div>
        )}

        {activeTab === "reveal" && (
          <RevealView
            filteredEntries={filteredEntries}
            revealed={revealed}
            showAll={showAll}
            lastRevealed={lastRevealed}
            revealEntry={revealEntry}
          />
        )}

        {activeTab === "prizes" && <PrizesView />}
        {activeTab === "tracker" && <TrackerComingSoon />}

        <footer className="pb-6 text-center text-xs text-white/45">
          First release draft — teams are TBC until the draw. Tracker is still waiting for Kian to discover discipline.
        </footer>
      </section>

      <AnimatePresence>
        {selectedEntry && (
          <DetailModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
        )}
      </AnimatePresence>

      <FullScreenCelebration active={celebrate} />
    </main>
  );
}
