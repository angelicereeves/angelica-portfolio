"use client";

import { FormEvent, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Code2,
  Coffee,
  GitBranch,
  LoaderCircle,
  Mail,
  MapPin,
  Send,
  Sparkles,
  BriefcaseBusiness,
  AlertCircle,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================

type Inquiry = "hiring" | "project" | "hello";
type Status = "idle" | "sending" | "success" | "error";

// ============================================================
// INQUIRY OPTIONS
// ============================================================

const inquiryOptions = [
  {
    id: "hiring" as const,
    number: "01",
    label: "I'm hiring",
    description: "Let's talk about working together.",
    Icon: BriefcaseBusiness,
    accent: "#00E5FF",
  },
  {
    id: "project" as const,
    number: "02",
    label: "I have a project",
    description: "There's something I'd love to build.",
    Icon: Code2,
    accent: "#C7FF4D",
  },
  {
    id: "hello" as const,
    number: "03",
    label: "Just saying hi",
    description: "Good conversations start somewhere.",
    Icon: Coffee,
    accent: "#A855F7",
  },
];

const introductions: Record<Inquiry, string> = {
  hiring:
    "Tell me a little about the role and what you're looking for.",
  project:
    "Tell me about the idea, the challenge, or the thing you wish existed.",
  hello: "No pitch required. I'd love to hear from you.",
};

// ============================================================
// CONTACT LINKS
// ============================================================

const contactLinks = [
  {
    label: "PERSONAL EMAIL",
    value: "angelicareeves@proton.me",
    href: "mailto:angelicareeves@proton.me",
    Icon: Mail,
    color: "#A855F7",
  },
  {
    label: "IONIAN DIGITAL",
    value: "ioniandigital@gmail.com",
    href: "mailto:ioniandigital@gmail.com",
    Icon: Mail,
    color: "#FF3CAC",
  },
  {
    label: "GITHUB",
    value: "github.com/angelicereeves",
    href: "https://github.com/angelicereeves",
    Icon: GitBranch,
    color: "#00E5FF",
  },
];

// ============================================================
// FORM HELPERS
// ============================================================

function FieldLabel({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-3 block font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55"
    >
      {children}
    </label>
  );
}

const fieldClass =
  "w-full rounded-2xl border border-white/[0.11] bg-[#111116] px-5 py-4 text-[15px] text-[#F5F5F7] outline-none transition-colors placeholder:text-white/25 focus:border-[#00E5FF]/65 focus:ring-2 focus:ring-[#00E5FF]/10";

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function ContactContent() {
  const reducedMotion = useReducedMotion();

  const [inquiry, setInquiry] = useState<Inquiry>("project");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey =
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

  const configured = Boolean(
    accessKey && accessKey !== "your_access_key_here"
  );

  // ==========================================================
  // FORM SUBMISSION
  // ==========================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (status === "sending") return;

    if (!configured) {
      setErrorMessage(
        "The contact form isn't configured yet. Please email me directly instead."
      );
      setStatus("error");
      return;
    }

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    data.set("access_key", accessKey!);

    data.set(
      "subject",
      `Portfolio inquiry — ${
        inquiryOptions.find((option) => option.id === inquiry)
          ?.label ?? "New message"
      }`
    );

    data.set(
      "from_name",
      String(data.get("name") ?? "Portfolio visitor")
    );

    data.set("inquiry_type", inquiry);

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: data,
        }
      );

      const result: {
        success?: boolean;
        message?: string;
      } = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "The message couldn't be sent. Please try again."
        );
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  }

  // ==========================================================
  // ANIMATION
  // ==========================================================

  const reveal = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.65 },
      };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-[#F5F5F7]">
      {/* ====================================================
          HERO
      ==================================================== */}

      <section className="relative mx-auto max-w-[1440px] px-6 pb-20 pt-36 sm:px-10 md:pb-28 md:pt-44 lg:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-44 top-10 h-[540px] w-[540px] rounded-full bg-[#00E5FF]/[0.055] blur-[110px]"
        />

        <motion.div {...reveal} className="relative">
          <div className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[#00E5FF]">
            <span className="h-2 w-2 rounded-full bg-[#00E5FF]" />
            004 / CONTACT
          </div>

          <h1 className="max-w-[1100px] font-display text-[clamp(4rem,11vw,10rem)] font-semibold leading-[0.89] tracking-[-0.085em]">
            HAVE AN IDEA?
            <br />
            <span className="font-serif font-normal italic tracking-[-0.075em] text-[#00E5FF]">
              Let&apos;s talk.
            </span>
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-[1.9] text-white/55 sm:text-lg">
              Building something new? Improving something that
              exists? Looking for someone to join your team?
              I&apos;d love to hear what you&apos;re working on.
            </p>

            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-[#C7FF4D]/25 bg-[#C7FF4D]/[0.055] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#C7FF4D]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C7FF4D] opacity-25" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#C7FF4D]" />
              </span>

              Open to opportunities
            </div>
          </div>
        </motion.div>
      </section>

      {/* ====================================================
          CONTACT FORM
      ==================================================== */}

      <section
        className="border-t border-white/10"
        aria-labelledby="contact-form-title"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[minmax(0,1.5fr)_minmax(290px,0.8fr)] lg:gap-20 lg:px-16">
          {/* LEFT COLUMN */}

          <motion.div {...reveal}>
            <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[#00E5FF]">
              01 / START HERE
            </div>

            <h2
              id="contact-form-title"
              className="font-display text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[1] tracking-[-0.065em]"
            >
              WHAT&apos;S ON{" "}
              <span className="font-serif font-normal italic text-[#A855F7]">
                your mind?
              </span>
            </h2>

            <p className="mb-9 mt-5 text-sm leading-[1.8] text-white/50 sm:text-base">
              Choose what brings you here. We&apos;ll take it
              from there.
            </p>

            {/* INQUIRY TYPE SELECTOR */}

            <div
              className="grid gap-3 sm:grid-cols-3"
              role="group"
              aria-label="Reason for getting in touch"
            >
              {inquiryOptions.map(
                ({
                  id,
                  number,
                  label,
                  description,
                  Icon,
                  accent,
                }) => {
                  const active = inquiry === id;

                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setInquiry(id);
                        setStatus("idle");
                        setErrorMessage("");
                      }}
                      className="group relative min-h-[158px] rounded-2xl border p-5 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E5FF]"
                      style={{
                        borderColor: active
                          ? `${accent}88`
                          : "rgba(255,255,255,0.10)",
                        backgroundColor: active
                          ? `${accent}10`
                          : "#111116",
                      }}
                    >
                      <div className="mb-6 flex items-start justify-between">
                        <Icon
                          aria-hidden="true"
                          className="h-6 w-6"
                          style={{
                            color: active
                              ? accent
                              : "rgba(255,255,255,0.55)",
                          }}
                          strokeWidth={1.5}
                        />

                        <span className="font-mono text-[10px] text-white/30">
                          {number}
                        </span>
                      </div>

                      <span className="block font-display text-lg font-semibold tracking-tight">
                        {label}
                      </span>

                      <span className="mt-2 block text-xs leading-relaxed text-white/45">
                        {description}
                      </span>

                      {active && (
                        <Check
                          aria-hidden="true"
                          className="absolute bottom-5 right-5 h-4 w-4"
                          style={{ color: accent }}
                        />
                      )}
                    </button>
                  );
                }
              )}
            </div>

            <p
              className="mt-8 text-sm leading-relaxed text-white/60"
              aria-live="polite"
            >
              {introductions[inquiry]}
            </p>

            {/* FORM STATUS */}

            {status === "success" ? (
              <div
                role="status"
                className="mt-7 rounded-3xl border border-[#C7FF4D]/30 bg-[#C7FF4D]/[0.06] p-8 sm:p-10"
              >
                <CheckCircle2
                  className="mb-5 h-9 w-9 text-[#C7FF4D]"
                  strokeWidth={1.5}
                />

                <h3 className="font-display text-3xl font-semibold tracking-tight">
                  Message sent!
                </h3>

                <p className="mt-3 max-w-md leading-[1.8] text-white/60">
                  Thanks for reaching out. Your message is on
                  its way, and I&apos;ll get back to you as
                  soon as I can.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#C7FF4D] hover:underline"
                >
                  Send another message
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                {/* HONEYPOT */}

                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* NAME + EMAIL */}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor="contact-name">
                      YOUR NAME *
                    </FieldLabel>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      maxLength={120}
                      autoComplete="name"
                      placeholder="What should I call you?"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <FieldLabel htmlFor="contact-email">
                      YOUR EMAIL *
                    </FieldLabel>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      maxLength={254}
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                {/* COMPANY */}

                <div>
                  <FieldLabel htmlFor="contact-company">
                    COMPANY / ORGANIZATION{" "}
                    <span className="text-white/25">
                      (OPTIONAL)
                    </span>
                  </FieldLabel>

                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    maxLength={160}
                    autoComplete="organization"
                    placeholder="Where do you work?"
                    className={fieldClass}
                  />
                </div>

                {/* MESSAGE */}

                <div>
                  <FieldLabel htmlFor="contact-message">
                    YOUR MESSAGE *
                  </FieldLabel>

                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={7}
                    placeholder="Tell me a little about it..."
                    className={`${fieldClass} min-h-[190px] resize-y`}
                  />
                </div>

                {/* ERROR MESSAGE */}

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-red-400/25 bg-red-400/[0.07] p-4 text-sm leading-relaxed text-red-200"
                  >
                    <AlertCircle
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0"
                    />

                    <span>
                      {errorMessage} You can also{" "}
                      <a
                        className="underline underline-offset-4"
                        href="mailto:angelicareeves@proton.me"
                      >
                        email me directly
                      </a>
                      .
                    </span>
                  </div>
                )}

                {/* SUBMIT */}

                <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={
                      status === "sending" || !configured
                    }
                    className="group inline-flex min-h-14 items-center justify-center gap-4 rounded-full bg-[#00E5FF] px-8 font-display text-sm font-bold tracking-wide text-[#050505] transition-transform hover:scale-[1.025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00E5FF] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {status === "sending" ? (
                      <>
                        <LoaderCircle
                          aria-hidden="true"
                          className="h-4 w-4 animate-spin"
                        />
                        SENDING...
                      </>
                    ) : (
                      <>
                        SEND MESSAGE
                        <Send
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </>
                    )}
                  </button>

                  <p className="max-w-[250px] text-xs leading-relaxed text-white/35">
                    No mailing lists, no automated sales
                    pitch. Just a conversation.
                  </p>
                </div>

                {/* UNCONFIGURED FORM NOTICE */}

                {!configured && (
                  <p
                    className="text-sm text-[#C7FF4D]"
                    role="status"
                  >
                    Online submissions are not enabled yet.
                    Add your Web3Forms key to{" "}
                    <code className="text-white/75">
                      .env.local
                    </code>{" "}
                    and restart the dev server, or{" "}
                    <a
                      href="mailto:angelicareeves@proton.me"
                      className="underline underline-offset-4"
                    >
                      email me directly
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* ==================================================
              RIGHT COLUMN: DIRECT CONTACT
          ================================================== */}

          <motion.aside {...reveal} className="lg:pt-1">
            <div className="sticky top-28 overflow-hidden rounded-[28px] border border-white/10 bg-[#111116] p-7 sm:p-9">
              <div className="mb-10 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#A855F7]">
                  02 / FIND ME
                </span>

                <Sparkles
                  aria-hidden="true"
                  className="h-5 w-5 text-[#A855F7]"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="font-display text-3xl font-semibold leading-[1.1] tracking-[-0.055em] sm:text-4xl">
                MORE OF A
                <br />
                <span className="font-serif font-normal italic text-[#A855F7]">
                  direct person?
                </span>
              </h3>

              <p className="mb-10 mt-5 text-sm leading-[1.8] text-white/50">
                That works too. Find me in one of these
                places.
              </p>

              {/* CONTACT LINKS */}

              <div className="space-y-1">
                {contactLinks.map(
                  ({ label, value, href, Icon, color }) => (
                    <a
                      key={label}
                      href={href}
                      target={
                        label === "GITHUB"
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        label === "GITHUB"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-center gap-4 border-t border-white/10 py-6 transition-colors duration-300 hover:border-[var(--link-color)] focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--link-color)]"
                      style={
                        {
                          "--link-color": color,
                          "--link-glow": `${color}55`,
                        } as CSSProperties
                      }
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-white/45 transition-all duration-300 group-hover:text-[var(--link-color)] group-hover:drop-shadow-[0_0_8px_var(--link-glow)] group-focus-visible:text-[var(--link-color)]"
                        strokeWidth={1.5}
                      />

                      <span className="min-w-0 flex-1">
                        <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-white/35">
                          {label}
                        </span>

                        <span className="block break-all text-sm text-white/85 transition-colors duration-300 group-hover:text-[var(--link-color)] group-focus-visible:text-[var(--link-color)]">
                          {value}
                        </span>
                      </span>

                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--link-color)] group-focus-visible:text-[var(--link-color)]"
                      />
                    </a>
                  )
                )}

                {/* LOCATION — NEON LIME */}

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Sarand%C3%AB%2C%20Albania"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border-t border-white/10 py-6 transition-colors duration-300 hover:border-[#C7FF4D] focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7FF4D]"
                >
                  <MapPin
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 text-white/45 transition-all duration-300 group-hover:text-[#C7FF4D] group-hover:drop-shadow-[0_0_8px_#C7FF4D55] group-focus-visible:text-[#C7FF4D]"
                    strokeWidth={1.5}
                  />

                  <span className="min-w-0 flex-1">
                    <span className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-white/35">
                      BASED IN
                    </span>

                    <span className="block text-sm text-white/85 transition-colors duration-300 group-hover:text-[#C7FF4D] group-focus-visible:text-[#C7FF4D]">
                      Sarandë, Albania
                    </span>

                    <span className="mt-1 block text-xs text-white/40">
                      Working with people worldwide
                    </span>
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#C7FF4D] group-focus-visible:text-[#C7FF4D]"
                  />
                </a>
              </div>

              {/* LITTLE NOTE */}

              <div className="mt-7 rounded-2xl border border-[#C7FF4D]/20 bg-[#C7FF4D]/[0.055] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C7FF4D]">
                  A LITTLE NOTE
                </p>

                <p className="mt-3 text-sm leading-[1.8] text-white/65">
                  The best projects start with a good
                  conversation. You don&apos;t need a polished
                  brief to reach out.
                </p>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* ====================================================
          THE HUMAN PART
      ==================================================== */}

      <section
        className="border-t border-white/10"
        aria-labelledby="contact-values-title"
      >
        <div className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16">
          <motion.div {...reveal}>
            <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[#C7FF4D]">
              03 / THE HUMAN PART
            </div>

            <h2
              id="contact-values-title"
              className="max-w-4xl font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-semibold leading-[1.05] tracking-[-0.065em]"
            >
              GOOD WORK STARTS WITH{" "}
              <span className="font-serif font-normal italic text-[#C7FF4D]">
                understanding.
              </span>
            </h2>

            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "I ask questions.",
                  body: "Understanding the real problem matters more than jumping straight into code.",
                  accent: "#00E5FF",
                },
                {
                  number: "02",
                  title: "I care about details.",
                  body: "A thoughtful interaction or a clearer explanation can change the whole experience.",
                  accent: "#A855F7",
                },
                {
                  number: "03",
                  title: "I know people matter.",
                  body: "Years in customer service taught me to listen, adapt, and communicate when things get complicated.",
                  accent: "#C7FF4D",
                },
              ].map((item) => (
                <article
                  key={item.number}
                  className="bg-[#0D0D11] p-8 sm:p-10"
                >
                  <span
                    className="font-mono text-[11px]"
                    style={{ color: item.accent }}
                  >
                    {item.number} /
                  </span>

                  <h3 className="mt-10 font-display text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-[1.9] text-white/50">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================
          FINAL CTA
      ==================================================== */}

      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-20 sm:px-10 md:py-28 lg:flex-row lg:items-end lg:justify-between lg:px-16">
          <motion.div {...reveal}>
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-[#00E5FF]">
              04 / YOUR MOVE
            </p>

            <h2 className="font-display text-[clamp(3.1rem,7.5vw,7.5rem)] font-semibold leading-[0.97] tracking-[-0.075em]">
              LET&apos;S MAKE
              <br />
              <span className="font-serif font-normal italic text-[#00E5FF]">
                something happen.
              </span>
            </h2>
          </motion.div>

          <a
            href="mailto:angelicareeves@proton.me"
            className="group inline-flex w-fit items-center gap-4 rounded-full border border-white/20 px-7 py-4 font-display text-sm font-semibold transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF]"
          >
            OR JUST EMAIL ME

            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>
      </section>
    </main>
  );
}