"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { RevealText } from "@/components/motion/RevealText";
import { easePremium } from "@/lib/motion";
import { studio } from "@/lib/constants";

export function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="bg-canvas section-y">
      <div className="container-page grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-6">
          <SectionEyebrow>Contact</SectionEyebrow>
          <RevealText
            as="h2"
            className="display-xl mt-6 max-w-[16ch]"
            lines={["Your project should feel real", "before construction starts."]}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: easePremium, delay: 0.2 }}
            className="mt-10 flex flex-col gap-6"
          >
            <a
              href={studio.phoneHref}
              className="group inline-flex items-center gap-3 self-start text-2xl tracking-title md:text-3xl"
            >
              <span className="font-display">{studio.phone}</span>
              <ArrowRight
                size={22}
                className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
              />
            </a>
            <p className="max-w-md text-sm leading-[1.6] text-muted">
              We reply within one working day. For time-sensitive projects,
              please call the studio directly.
            </p>
          </motion.div>
        </div>

        <div className="md:col-span-6">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: easePremium }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="grid grid-cols-1 gap-6 border border-ink/12 bg-surface p-8 md:p-10"
          >
            <div className="eyebrow">Discuss your project</div>

            {submitted ? (
              <div className="py-6">
                <div className="font-display text-2xl tracking-title">
                  Thank you.
                </div>
                <p className="mt-3 text-sm text-muted">
                  Your enquiry has been received. In the meantime, please feel
                  free to call the studio at{" "}
                  <a href={studio.phoneHref} className="text-ink underline">
                    {studio.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <>
                <Field label="Name" name="name" />
                <Field label="Email" name="email" type="email" />
                <SelectField
                  label="Project type"
                  name="projectType"
                  options={[
                    "Residential renders",
                    "Interior design",
                    "Full turn-key project",
                    "Other",
                  ]}
                />
                <div>
                  <label className="eyebrow mb-3 block">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full resize-none border-b border-ink/15 bg-transparent py-2 text-[15px] outline-none transition-colors focus:border-ink"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary mt-2 self-start"
                >
                  Send enquiry
                  <ArrowRight size={16} />
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <div>
      <label className="eyebrow mb-3 block">{label}</label>
      <input
        type={type}
        name={name}
        className="w-full border-b border-ink/15 bg-transparent py-2 text-[15px] outline-none transition-colors focus:border-ink"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="eyebrow mb-3 block">{label}</label>
      <select
        name={name}
        className="w-full border-b border-ink/15 bg-transparent py-2 text-[15px] outline-none transition-colors focus:border-ink"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
