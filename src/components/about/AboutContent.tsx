"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  BookOpen,
  GraduationCap,
  Guitar,
  MapPin,
  PawPrint,
  Plane,
  Sparkles,
} from "lucide-react";

const milestones = [
  {
    number: "01",
    label: "THE PEOPLE SKILLS",
    title: "Learning from people",
    description:
      "My background in customer service taught me how to listen, communicate clearly, stay calm when things get complicated, and understand what someone actually needs. Those lessons shape how I approach every project: the people using a product matter just as much as the technology behind it.",
    color: "#C7FF4D",
  },
  {
    number: "02",
    label: "THE FOUNDATION",
    title: "Learning to build",
    description:
      "I trained in software engineering at Coding Temple, where I built a foundation in full-stack development. What stuck with me most wasn't a particular language — it was the satisfaction of taking a problem apart and building a solution.",
    color: "#00E5FF",
  },
  {
    number: "03",
    label: "THE REAL WORLD",
    title: "Making useful things",
    description:
      "I started turning that foundation into real projects: websites for businesses, custom applications, and digital tools that make everyday work easier. I discovered I enjoy the design decisions just as much as the engineering.",
    color: "#FF3CAC",
  },
  {
    number: "04",
    label: "A NEW CHAPTER",
    title: "From the U.S. to Albania",
    description:
      "Moving from the United States to Sarandë, Albania gave me a new perspective and a new community. I founded Ionian Digital to help local businesses build a stronger online presence, including multilingual websites designed for the people they serve.",
    color: "#C7FF4D",
  },
];

const outsideTheEditor = [
  {
    number: "01",
    title: "A few chords later",
    subtitle: "GUITAR",
    description:
      "I play guitar for the same reason I build things: I like learning something new and getting a little better each time.",
    icon: Guitar,
    color: "#00E5FF",
    decoration: "♪",
  },
  {
    number: "02",
    title: "One more chapter",
    subtitle: "BOOKS",
    description:
      "Give me a fantasy adventure with a world to get lost in, or a philosophy book that makes me question everything. Bonus points if I lose track of time reading.",
    icon: BookOpen,
    color: "#FF3CAC",
    decoration: "✳",
  },
  {
    number: "03",
    title: "Somewhere new",
    subtitle: "EXPLORING",
    description:
      "I love experiencing new places and cultures. Moving abroad only made that curiosity stronger.",
    icon: Plane,
    color: "#A855F7",
    decoration: "↗",
  },
  {
    number: "04",
    title: "My tiny coworkers",
    subtitle: "THE DOGS",
    description:
      "Two small dogs, two very big personalities, and absolutely no respect for meeting schedules.",
    icon: PawPrint,
    color: "#C7FF4D",
    decoration: "✦",
  },
];

export default function AboutContent() {
  const reduceMotion = !!useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reduceMotion ? 0 : 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  return (
    <main id="about" className="overflow-hidden bg-[#050505] text-[#F5F5F7]">
      {/* HERO */}
      <section className="relative px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-44 lg:px-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-28 h-96 w-96 rounded-full bg-[#00E5FF]/[0.06] blur-[120px]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div {...reveal} className="mb-12 md:mb-16">
            <div className="mb-7 flex items-center gap-3">
              <Asterisk size={18} className="text-[#FF3CAC]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">// The person behind the projects</span>
            </div>
            <h1 className="font-display text-[clamp(3.6rem,9vw,9rem)] font-bold leading-[0.94] tracking-[-0.07em]">
              MORE THAN<br />
              <span className="font-serif font-normal italic text-[#00E5FF]">code.</span>
            </h1>
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16 xl:gap-24">
            <motion.div {...reveal}>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#C7FF4D] shadow-[0_0_14px_#C7FF4D]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.17em] text-white/40">Human behind the keyboard</span>
              </div>
              <h2 className="font-display text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[1.13] tracking-[-0.055em]">
                Hi, I&apos;m Angelica.<br />
                <span className="text-white/45">I make things work.</span><br />
                <span className="font-serif font-normal italic text-[#FF3CAC]">And look good doing it.</span>
              </h2>
              <div className="mt-8 max-w-xl space-y-5 text-base leading-[1.9] text-white/55 md:text-lg">
                <p>
                  I&apos;m a full-stack developer and designer who likes turning ideas into things people can actually use. My customer service background taught me to listen first, understand the person behind the problem, and communicate clearly — lessons I bring to every project.
                </p>
                <p>
                  Sometimes that means a custom application that saves someone hours of work. Sometimes it&apos;s a multilingual website that helps a local business reach new customers. And sometimes it&apos;s building something just because I wondered, <span className="italic text-white/80">what if?</span>
                </p>
                <p>
                  I&apos;m originally from the United States and now based in Sarandë, Albania, where I run Ionian Digital and keep finding new things worth building.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 font-mono text-[11px] text-white/65">
                  <MapPin size={13} className="text-[#FF3CAC]" /> Sarandë, Albania
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2.5 font-mono text-[11px] text-white/65">
                  <Sparkles size={13} className="text-[#C7FF4D]" /> Developer + Designer
                </span>
              </div>
            </motion.div>

            {/* Real portrait, intentionally not AI-edited */}
            <motion.figure {...reveal} className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
              <div aria-hidden="true" className="pointer-events-none absolute -inset-3 rounded-[34px] border border-[#00E5FF]/15 md:-inset-4" />
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[26px] border border-white/15 bg-[#111116] sm:aspect-[5/6] lg:aspect-[4/5]">
                <Image
                  src="/images/angelica.jpeg"
                  alt="Angelica smiling outdoors in the warm afternoon sunlight"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-[55%_center] transition-transform duration-700 group-hover:scale-[1.035]"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 md:bottom-7 md:left-7 md:right-7">
                  <div>
                    <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/75">// Off the clock</span>
                    <p className="font-serif text-2xl italic text-white md:text-3xl">A little sunshine helps.</p>
                  </div>
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/25 backdrop-blur-sm">
                    <ArrowDownRight size={18} />
                  </span>
                </div>
              </div>
              <figcaption className="mt-5 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.13em] text-white/35">
                <span>Behind the screen, in real life</span>
                <span className="text-[#00E5FF]">01 / Portrait</span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="border-t border-white/10 px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <motion.div {...reveal} className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-6 flex items-center gap-3">
              <Asterisk size={17} className="text-[#A855F7]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">// The journey</span>
            </div>
            <h2 className="font-display text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.99] tracking-[-0.065em]">
              NOT A<br />STRAIGHT<br />
              <span className="font-serif font-normal italic text-[#FF3CAC]">line.</span>
            </h2>
            <p className="mt-6 max-w-sm text-base leading-[1.8] text-white/45">
              My path started with people, grew into software engineering, and eventually took me across the world. Every chapter has shaped how I build.
            </p>
          </motion.div>
          <div className="relative border-l border-white/15 pl-7 md:pl-12">
            {milestones.map((item) => (
              <motion.article key={`milestone-${item.number}`} {...reveal} className="relative pb-14 last:pb-0 md:pb-20">
                <span aria-hidden="true" className="absolute -left-[35px] top-2 h-3.5 w-3.5 rounded-full border-2 bg-[#050505] md:-left-[55px]" style={{ borderColor: item.color }} />
                <div className="mb-5 flex items-center gap-4">
                  <span className="font-mono text-xs" style={{ color: item.color }}>{item.number}</span>
                  <span className="h-px w-8 bg-white/15" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">{item.label}</span>
                </div>
                <h3 className="font-display text-2xl font-bold tracking-[-0.035em] md:text-4xl">{item.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-[1.9] text-white/55 md:text-base">{item.description}</p>
                {item.label === "THE FOUNDATION" && (
                  <div className="mt-6 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#111116] px-4 py-3">
                    <GraduationCap size={19} className="text-[#C7FF4D]" />
                    <div>
                      <p className="font-display text-sm font-semibold">Coding Temple</p>
                      <p className="mt-0.5 font-mono text-[10px] text-white/40">Software Engineering Certificate</p>
                    </div>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONALITY */}
      <section className="border-t border-white/10 px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="mb-10 md:mb-14">
            <div className="mb-6 flex items-center gap-3">
              <Asterisk size={17} className="text-[#C7FF4D]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">// Outside the editor</span>
            </div>
            <h2 className="font-display text-[clamp(2.8rem,6vw,6rem)] font-bold leading-[1] tracking-[-0.06em]">
              LIFE BEYOND<br />
              <span className="font-serif font-normal italic text-[#C7FF4D]">the screen.</span>
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-[1.8] text-white/50 md:text-base">
              There&apos;s more to me than a GitHub history. Here are a few things that keep life interesting when the laptop is closed.
            </p>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {outsideTheEditor.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={`outside-${card.number}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : index * 0.07 }}
                  className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#111116] p-6 transition-colors duration-300 hover:border-white/25 md:p-7"
                >
                  <span aria-hidden="true" className="pointer-events-none absolute -right-3 -top-10 font-serif text-[140px] leading-none opacity-[0.07] transition-transform duration-500 group-hover:-translate-x-2 group-hover:translate-y-2" style={{ color: card.color }}>{card.decoration}</span>
                  <div className="relative mb-12 flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border" style={{ borderColor: `${card.color}45`, background: `${card.color}12`, color: card.color }}>
                      <Icon size={22} strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-[10px] text-white/25">{card.number} / {outsideTheEditor.length.toString().padStart(2, "0")}</span>
                  </div>
                  <div className="relative mt-auto">
                    <p className="font-mono text-[10px] uppercase tracking-[0.17em]" style={{ color: card.color }}>{card.subtitle}</p>
                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight md:text-2xl">{card.title}</h3>
                    <p className="mt-3 text-sm leading-[1.75] text-white/50">{card.description}</p>
                  </div>
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: card.color }} />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 px-6 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal} className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111116] p-8 md:p-12 lg:p-14">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FF3CAC]/[0.08] blur-[100px]" />
            <div className="relative flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <Sparkles size={17} className="text-[#FF3CAC]" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">// What comes next?</span>
                </div>
                <h2 className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-bold leading-[1.04] tracking-[-0.06em]">
                  GOOD IDEAS DESERVE<br />
                  <span className="font-serif font-normal italic text-[#FF3CAC]">to be built.</span>
                </h2>
                <p className="mt-6 max-w-xl text-sm leading-[1.85] text-white/50 md:text-base">
                  Have a project in mind, a problem worth solving, or just want to say hello? I&apos;d love to hear about it.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link href="/#contact" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-colors hover:bg-[#C7FF4D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  LET&apos;S CONNECT
                  <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
                <Link href="/#work" className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                  VIEW MY WORK
                  <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
