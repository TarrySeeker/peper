"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  breadcrumb?: { href: string; label: string }[];
}

export default function SectionHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: Props) {
  return (
    <section className="relative overflow-hidden pt-10 lg:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[680px] -translate-x-1/2 rounded-full bg-rose-200/40 blur-3xl"
      />
      <div className="container-site relative">
        {breadcrumb && (
          <nav className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.22em] text-ink-500">
            {breadcrumb.map((b, i) => (
              <span key={b.href} className="flex items-center gap-2">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                <Link href={b.href} className="hover:text-rose-700">
                  {b.label}
                </Link>
              </span>
            ))}
          </nav>
        )}

        <div className="mx-auto mt-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            {eyebrow}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-display mt-4 text-4xl sm:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto mt-5 max-w-xl text-ink-700"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
