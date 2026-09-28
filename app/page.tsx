"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Star,
  BookOpen,
  Clock,
  Users,
  GraduationCap,
  ChevronDown,
  Sparkles,
  TrendingUp,
  BadgeCheck,
  Award,
  Menu,
  X,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/app/hooks/useInView";

/* ═══════════════════ CONFIG ═══════════════════ */
const phoneNumber = "919431176228";
const wa = (text: string) =>
  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
const demoLink = wa(
  "Hello Newton Tutorials, I would like to book a 2-Day Free Demo Class for JEE/NEET preparation."
);

const navItems = [
  { label: "Programs", href: "#courses" },
  { label: "Why Us", href: "#why" },
  { label: "Results", href: "#results" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit Us", href: "#visit" },
];

const marqueeItems = [
  "Admissions Open — Target 2026–27 Batches",
  "2-Day Free Demo Class Available",
  "Limited Seats • Batches of Max 30",
  "Weekly Tests & Daily Doubt Sessions",
  "100% Offline Classroom Teaching",
];

/* ═══════════════════ DATA ═══════════════════ */
const bigStats = [
  { end: 30, suffix: "", decimals: 0, label: "Max Students / Batch" },
  { end: 60, suffix: "+", decimals: 0, label: "Google Reviews" },
  { end: 4.3, suffix: "★", decimals: 1, label: "Average Rating" },
  { end: 100, suffix: "%", decimals: 0, label: "Offline Classrooms" },
];

const features: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Users, title: "Personal Attention", desc: "Max 30 students per batch — every student tracked individually by mentors." },
  { icon: BookOpen, title: "Weekly DPPs & Tests", desc: "Chapter-wise DPPs and weekly tests keep preparation consistent and measurable." },
  { icon: Clock, title: "Daily Doubt Sessions", desc: "Doubts cleared the same day after class — no backlog, no confusion." },
  { icon: GraduationCap, title: "Board + Competitive Sync", desc: "One preparation for both — board exams and JEE/NEET covered together." },
  { icon: BadgeCheck, title: "100% Offline Classroom", desc: "Real classrooms, real boards, real discipline — no distracting online classes." },
  { icon: TrendingUp, title: "Parent Progress Reports", desc: "Monthly performance updates shared with parents after every test cycle." },
];

const courses = [
  {
    tag: "Engineering",
    tagClass: "text-blue-600 bg-blue-50 ring-blue-100",
    title: "IIT-JEE (Main + Adv)",
    desc: "Comprehensive 2-Year Program for 11th & 12th students with board exam sync.",
    points: ["Physics, Chemistry & Maths", "JEE-level weekly DPPs", "Board + Advanced sync"],
    cta: "Request Syllabus",
    waText: "I want syllabus and details for IIT-JEE batch.",
    btnClass: "bg-slate-100 hover:bg-slate-200 text-slate-800",
    popular: false,
  },
  {
    tag: "Medical",
    tagClass: "text-emerald-600 bg-emerald-50 ring-emerald-100",
    title: "NEET Regular",
    desc: "Targeted physics, chemistry & biology preparation with NCERT-aligned line-by-line tests.",
    points: ["Full PCB coverage", "NCERT line-by-line tests", "PYQ practice & analysis"],
    cta: "Check Availability",
    waText: "I want details for NEET 2026-27 batch.",
    btnClass: "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/25",
    popular: true,
  },
  {
    tag: "Foundation",
    tagClass: "text-purple-600 bg-purple-50 ring-purple-100",
    title: "Class 9th & 10th",
    desc: "Strong grounding in Science & Mathematics for Olympiads, NTSE, and early JEE/NEET base.",
    points: ["Science + Maths focus", "Olympiad & NTSE prep", "Early JEE/NEET foundation"],
    cta: "Request Syllabus",
    waText: "I want details for Foundation Class 9/10 batch.",
    btnClass: "bg-slate-100 hover:bg-slate-200 text-slate-800",
    popular: false,
  },
];

/* ⚠️ TODO: apne REAL student results se replace karo */
const results = [
  { name: "Aarav K.", exam: "JEE Main 2025", score: "98.2 %ile" },
  { name: "Priya S.", exam: "NEET 2025", score: "612 / 720" },
  { name: "Rohan V.", exam: "JEE Advanced", score: "Qualified" },
  { name: "Ananya M.", exam: "CBSE Boards", score: "94%" },
];

/* ⚠️ TODO: real parent/student reviews se replace karo */
const reviewsRow1 = [
  { text: "Small batch ki wajah se har student pe dhyan dete hain. Doubt session daily hota hai, kabhi pending nahi.", name: "R. Kumar", role: "Parent, Class 12" },
  { text: "Weekly tests se exam pressure kam ho gaya. Pehle mock me hi time manage karna seekh gaya.", name: "Aarav", role: "JEE 2026 Aspirant" },
  { text: "NEET Bio me NCERT line-by-line tests best hain. Concept clarity improve hui.", name: "Priya", role: "NEET 2026 Aspirant" },
  { text: "Offline class ka faida samajh aaya — screen pe nahi, board pe padhte hain.", name: "M. Sharma", role: "Parent, Class 11" },
];
const reviewsRow2 = [
  { text: "Monthly report se pata chalta hai baccha kahan weak hai, ghar pe bhi guide kar pate hain.", name: "S. Verma", role: "Parent, Class 10" },
  { text: "Demo class ke baad hi join kar liya. Teaching style bahut clear hai.", name: "K. Singh", role: "Class 11 Student" },
  { text: "Maths phir se interesting lagne laga. DPP level exactly JEE jaisa hai.", name: "D. Das", role: "JEE Aspirant" },
  { text: "Staff cooperative hai, fees installment me bhi mila. Achi experience rahi.", name: "N. Gupta", role: "Parent, Class 9" },
];

const faqs = [
  { q: "Demo class kaise book karun?", a: "WhatsApp button tap karke apna name, class aur subject bata dein — hum aapko batch timing ke saath 2-day free demo schedule kar denge. Bhi call kar sakte hain." },
  { q: "Batch size kitni hai?", a: "Har batch me maximum 30 students — taaki har student ko personal attention mile aur progress track ho sake." },
  { q: "Kya board exams ki bhi taiyari hoti hai?", a: "Haan. JEE/NEET syllabus board syllabus ke saath synced padhaya jata hai — ek hi preparation me dono cover hote hain." },
  { q: "Fees structure kya hai?", a: "Fees program aur duration pe depend karti hai, installment option bhi available hai. Latest structure ke liye WhatsApp pe message karein ya center visit karein." },
  { q: "Class timings kya hain?", a: "Alag-alag batches morning aur evening me chalti hain. Office hours: 9:00 AM – 7:00 PM (Mon–Sat). Timing details demo book karte waqt mil jayengi." },
  { q: "Kya study material milta hai?", a: "Haan — DPPs, chapter tests, NCERT-aligned sheets aur previous year question practice fees me included hai. Alag se kuch kharidne ki zarurat nahi." },
];

/* ═══════════════════ SMALL COMPONENTS ═══════════════════ */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${inView ? "reveal-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function CountUp({ end, duration = 1100, suffix = "", decimals = 0 }: { end: number; duration?: number; suffix?: string; decimals?: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(e * end);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function SectionHeading({ eyebrow, title, sub, dark = false }: { eyebrow: string; title: string; sub?: string; dark?: boolean }) {
  return (
    <Reveal className="text-center mb-10">
      <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${dark ? "text-blue-400" : "text-blue-600"}`}>
        {eyebrow}
      </span>
      <h3 className={`text-2xl md:text-3xl font-black tracking-tight mt-2 ${dark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h3>
      {sub && (
        <p className={`text-sm mt-2 max-w-xl mx-auto ${dark ? "text-slate-400" : "text-slate-500"}`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

/* ═══════════════════ HEADER + NAV ═══════════════════ */
function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-300 ${scrolled ? "shadow-md shadow-slate-900/5" : ""
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between py-2.5">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-600/25 select-none">
            N
          </div>
          <div>
            <p className="text-base md:text-lg font-black tracking-tight text-slate-900 leading-none">
              NEWTON <span className="text-blue-600">TUTORIALS</span>
            </p>
            <p className="text-[10px] md:text-[11px] text-slate-500 font-medium mt-1">
              Lalpur • Circular Road, Ranchi
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:+${phoneNumber}`}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-semibold px-3.5 py-2 rounded-lg transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-sm shadow-blue-600/25"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Call Now</span>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="menu-in md:hidden border-t border-slate-100 bg-white px-4 py-3 flex flex-col">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 border-b border-slate-50 last:border-0 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ═══════════════════ TESTIMONIAL CARD ═══════════════════ */
function TestimonialCard({ text, name, role }: { text: string; name: string; role: string }) {
  return (
    <figure className="w-[290px] md:w-[340px] shrink-0 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center gap-1 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <Quote className="w-5 h-5 text-blue-200 mb-1.5" />
      <blockquote className="text-sm text-slate-700 leading-relaxed">{text}</blockquote>
      <figcaption className="mt-4 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xs font-bold flex items-center justify-center">
          {name[0]}
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">{name}</p>
          <p className="text-[11px] text-slate-500">{role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/* ═══════════════════ FAQ ITEM ═══════════════════ */
function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-slate-900">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ MAIN PAGE ═══════════════════ */
export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main id="top" className="min-h-screen pb-24 md:pb-0">
      {/* ── Scrolling Notice Bar ── */}
      <div className="relative overflow-hidden bg-slate-900 text-blue-100 py-2">
        <div className="absolute inset-0 bg-blue-500/10" aria-hidden="true" />
        <div className="relative flex w-max animate-marquee">
          {[0, 1].map((half) => (
            <div key={half} className="flex items-center gap-10 pr-10">
              {marqueeItems.map((item) => (
                <span key={item} className="flex items-center gap-2 text-xs md:text-sm font-medium whitespace-nowrap">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <SiteHeader />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-4 pt-12 pb-14 md:pt-16 md:pb-16">
        <div className="pointer-events-none absolute inset-0 bg-dots" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-28 left-1/2 -ml-[18rem] h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-blue-200/60 via-indigo-200/40 to-emerald-100/50 blur-3xl animate-breathe"
          aria-hidden="true"
        />
        {/* Floating decorative icons (desktop) */}
        <GraduationCap className="hidden md:block pointer-events-none absolute left-[7%] top-[24%] w-10 h-10 text-blue-300/70 animate-float" aria-hidden="true" />
        <Award className="hidden md:block pointer-events-none absolute right-[9%] top-[32%] w-9 h-9 text-amber-300/70 animate-float" style={{ animationDelay: "1.2s" }} aria-hidden="true" />
        <BookOpen className="hidden lg:block pointer-events-none absolute left-[15%] bottom-[20%] w-8 h-8 text-indigo-300/70 animate-float" style={{ animationDelay: "0.6s" }} aria-hidden="true" />
        <Sparkles className="hidden lg:block pointer-events-none absolute right-[16%] bottom-[26%] w-7 h-7 text-emerald-300/70 animate-float" style={{ animationDelay: "1.8s" }} aria-hidden="true" />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="hero-enter">
            <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              4.3★ Rated Local Institute in Lalpur (60+ Reviews)
            </span>
          </div>

          <h2
            className="hero-enter text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mt-5 mb-4"
            style={{ animationDelay: "80ms" }}
          >
            Crack{" "}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-indigo-500 bg-clip-text text-transparent">
              JEE &amp; NEET
            </span>{" "}
            with Personal Mentorship in Ranchi
          </h2>

          <p
            className="hero-enter text-slate-600 text-sm md:text-base max-w-xl mx-auto mb-7 leading-relaxed"
            style={{ animationDelay: "160ms" }}
          >
            Focused batches, complete syllabus coverage, and regular mock tests
            right at Hariom Tower Chowk, Lalpur.
          </p>

          <div
            className="hero-enter flex flex-col sm:flex-row gap-3 justify-center items-center"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pulse cta-shine w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] text-sm md:text-base"
            >
              <MessageCircle className="w-5 h-5" />
              Book 2-Day Free Demo Class
            </a>
            <a
              href="#courses"
              className="w-full sm:w-auto text-slate-700 bg-white/60 backdrop-blur-sm hover:bg-white font-semibold px-6 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] text-sm md:text-base text-center"
            >
              View Courses &amp; Fees
            </a>
          </div>

          <div
            className="hero-enter mt-7 flex flex-wrap justify-center gap-2"
            style={{ animationDelay: "320ms" }}
          >
            {["60+ Reviews", "100% Offline Classes", "Batches of Max 30"].map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-600 text-[11px] font-medium px-3 py-1 rounded-full"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIG STATS BAND ── */}
      <section className="px-4">
        <Reveal>
          <div className="relative max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-indigo-600 p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-xl shadow-indigo-600/20 overflow-hidden">
            <div className="absolute inset-0 bg-dots-light" aria-hidden="true" />
            {bigStats.map((stat) => (
              <div key={stat.label} className="relative">
                <p className="text-3xl md:text-4xl font-black text-white">
                  <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="text-xs md:text-sm text-blue-100 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── WHY NEWTON ── */}
      <section id="why" className="px-4 py-14 md:py-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Why Newton"
            title="Everything a Serious Aspirant Needs"
            sub="No fancy promises — just disciplined teaching, small batches, and honest tracking."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 90} className="h-full">
                <div className="h-full bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 hover:border-blue-400/60">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 ring-1 ring-blue-100 flex items-center justify-center mb-4">
                    <f.icon className="w-5.5 h-5.5 w-[22px] h-[22px] text-blue-600" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{f.title}</h4>
                  <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section id="courses" className="px-4 py-14 md:py-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Our Programs"
            title="Target Programs 2026–2027"
            sub="Pick your goal — we handle the syllabus, tests, and mentoring."
          />
          <div className="grid md:grid-cols-3 gap-5 md:gap-6 items-stretch">
            {courses.map((course, i) => (
              <Reveal key={course.title} delay={i * 120} className="h-full">
                <div
                  className={`relative h-full flex flex-col bg-white p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 ${course.popular
                      ? "border-2 border-blue-600 ring-4 ring-blue-600/10 shadow-lg shadow-blue-600/15 md:scale-[1.03] hover:shadow-2xl hover:shadow-blue-600/20"
                      : "border border-slate-200 hover:shadow-xl hover:shadow-slate-900/5 hover:border-blue-400/60"
                    }`}
                >
                  {course.popular && (
                    <span className="animate-float absolute -top-3.5 right-5 z-10 bg-amber-500 text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-lg shadow-amber-500/40">
                      ★ POPULAR
                    </span>
                  )}
                  <span className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md ring-1 ${course.tagClass}`}>
                    {course.tag}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mt-3">{course.title}</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{course.desc}</p>

                  <ul className="mt-4 space-y-2">
                    {course.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5">
                    <a
                      href={wa(course.waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center text-xs md:text-sm font-semibold py-3 px-4 rounded-full transition-all duration-200 active:scale-[0.98] ${course.btnClass}`}
                    >
                      {course.cta}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS (dark) ── */}
      <section id="results" className="relative py-14 md:py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-dots-light" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-24 right-[10%] w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4">
          <SectionHeading
            dark
            eyebrow="Our Results"
            title="Students Who Trusted the Process"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {results.map((r, i) => (
              <Reveal key={r.name} delay={i * 100} className="h-full">
                <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                  <Award className="w-7 h-7 text-amber-400 mx-auto mb-3" />
                  <p className="text-xl md:text-2xl font-black text-white">{r.score}</p>
                  <p className="text-sm font-semibold text-blue-200 mt-1">{r.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{r.exam}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-8 text-center">
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-emerald-600/25"
            >
              <MessageCircle className="w-4 h-4" />
              Want Results Like These? Book a Free Demo
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" className="py-14 md:py-20 overflow-hidden scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeading
            eyebrow="Reviews"
            title="What Parents & Students Say"
            sub="Real feedback from families at our Lalpur center. Hover to pause."
          />
        </div>
        <div className="marquee-hover-pause space-y-5">
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee">
              {[0, 1].map((half) => (
                <div key={half} className="flex gap-5 pr-5">
                  {reviewsRow1.map((t) => (
                    <TestimonialCard key={t.name} {...t} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee-reverse">
              {[0, 1].map((half) => (
                <div key={half} className="flex gap-5 pr-5">
                  {reviewsRow2.map((t) => (
                    <TestimonialCard key={t.name} {...t} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="px-4 py-14 md:py-20 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            title="Parents Ke Sabse Common Sawaal"
          />
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 70}>
                <FaqItem
                  q={f.q}
                  a={f.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={300} className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Aur koi sawaal?{" "}
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-600 hover:text-emerald-700 underline underline-offset-2"
              >
                WhatsApp pe pooch lein
              </a>{" "}
              — hum jaldi reply karte hain.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── VISIT US (map embed) ── */}
      <section id="visit" className="px-4 py-14 md:py-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Visit Us"
            title="Come See the Classrooms Yourself"
            sub="Center dekh ke hi decision lo — parents always welcome."
          />
          <Reveal>
            <div className="grid md:grid-cols-2 gap-6 items-stretch">
              <div className="bg-white rounded-2xl border border-slate-200 p-7 md:p-8 flex flex-col justify-center shadow-sm">
                <div className="flex items-center gap-2 text-blue-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
                  <MapPin className="w-4 h-4" />
                  Center Location
                </div>
                <h4 className="text-xl md:text-2xl font-black text-slate-900">
                  Newton Tutorials, Lalpur
                </h4>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  Circular Road, Opposite Hariom Tower, Lalpur, Ranchi,
                  Jharkhand 834001.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Office Hours: 9:00 AM – 7:00 PM (Mon–Sat)
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://maps.google.com/?q=Hariom+Tower+Lalpur+Ranchi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-md shadow-blue-600/25"
                  >
                    Get Directions
                  </a>
                  <a
                    href={`tel:+${phoneNumber}`}
                    className="flex-1 text-center border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-5 py-3 rounded-xl text-sm transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Call the Center
                  </a>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm min-h-[18rem]">
                <iframe
                  title="Newton Tutorials location map"
                  src="https://www.google.com/maps?q=Hariom+Tower,+Circular+Road,+Lalpur,+Ranchi&output=embed"
                  className="w-full h-full min-h-[18rem] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-950 text-slate-400 pt-12 pb-8 px-4">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
                N
              </div>
              <p className="text-lg font-black tracking-tight text-white">
                NEWTON <span className="text-blue-400">TUTORIALS</span>
              </p>
            </div>
            <p className="text-xs leading-relaxed mt-3 max-w-xs">
              JEE, NEET aur Foundation coaching in Lalpur, Ranchi. Small batches,
              honest teaching, real results.
            </p>
            <div className="flex items-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs ml-1 text-slate-500">4.3 (60+ reviews)</span>
            </div>
          </div>
          <div>
            <p className="text-white text-sm font-bold mb-3">Quick Links</p>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-blue-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white text-sm font-bold mb-3">Contact</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`tel:+${phoneNumber}`} className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400" /> +91 94311 76228
                </a>
              </li>
              <li>
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Demo Booking
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                Circular Road, Opp. Hariom Tower, Lalpur, Ranchi 834001
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" /> 9 AM – 7 PM (Mon–Sat)
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-5 text-center text-xs text-slate-500">
          © 2026 Newton Tutorials, Lalpur, Ranchi. All rights reserved.
        </div>
      </footer>

      {/* ── Mobile Sticky Bottom Bar ── */}
      <div className="fixed bottom-0 inset-x-0 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-white/95 backdrop-blur border-t border-slate-200 md:hidden z-50 flex gap-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)]">
        <a
          href={`tel:+${phoneNumber}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 text-slate-900 font-bold py-3 rounded-xl text-xs border border-slate-200 transition-transform duration-200 active:scale-[0.97]"
        >
          <Phone className="w-4 h-4 text-blue-600" />
          Call Center
        </a>
        <a
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-emerald-600/30 transition-transform duration-200 active:scale-[0.97]"
        >
          <MessageCircle className="w-4 h-4" />
          Book Free Demo
        </a>
      </div>
    </main>
  );
}