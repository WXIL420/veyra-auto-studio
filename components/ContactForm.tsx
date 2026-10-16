"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { buttonStyles } from "./ui";
import { site } from "@/lib/site";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const field = "mt-2 block w-full border bg-ink px-4 py-3 text-bone placeholder:text-silver/60";

export function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (v.name.trim().length < 2) e.name = "Enter your name.";
    if (!emailRe.test(v.email.trim())) e.email = "Enter a valid email address.";
    if (v.message.trim().length < 10) e.message = "Write a message of at least 10 characters.";
    return e;
  };

  if (sent) {
    return (
      <div role="status" className="border border-sage/60 bg-sage/10 p-8">
        <CheckCircle2 aria-hidden className="h-8 w-8 text-sage-2" />
        <h3 className="mt-4 text-3xl">Message received — in your browser only.</h3>
        <p className="mt-3 leading-relaxed text-silver">
          This is a portfolio demonstration. Your message was not transmitted or stored, and no one will reply.
        </p>
        <button
          type="button"
          onClick={() => {
            setV({ name: "", email: "", message: "" });
            setSent(false);
          }}
          className={`${buttonStyles.secondary} mt-6`}
        >
          Write another message
        </button>
      </div>
    );
  }

  const input = (
    id: "name" | "email" | "message",
    label: string,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => (
    <div>
      <label htmlFor={`c-${id}`} className="font-display text-sm uppercase tracking-[0.2em]">
        {label}
      </label>
      {id === "message" ? (
        <textarea
          id="c-message"
          rows={5}
          value={v.message}
          onChange={(e) => setV({ ...v, message: e.target.value })}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "c-message-err" : undefined}
          className={`${field} ${errors.message ? "border-danger" : "border-line"}`}
        />
      ) : (
        <input
          id={`c-${id}`}
          value={v[id]}
          onChange={(e) => setV({ ...v, [id]: e.target.value })}
          aria-invalid={!!errors[id]}
          aria-describedby={errors[id] ? `c-${id}-err` : undefined}
          className={`${field} ${errors[id] ? "border-danger" : "border-line"}`}
          {...props}
        />
      )}
      {errors[id] && (
        <p id={`c-${id}-err`} className="mt-2 text-sm text-danger">
          {errors[id]}
        </p>
      )}
    </div>
  );

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length) {
          document.getElementById(`c-${Object.keys(errs)[0]}`)?.focus();
          return;
        }
        setSent(true);
      }}
      className="space-y-6"
    >
      <p className="border border-copper/60 bg-copper/10 p-4 text-sm font-medium text-bone">{site.demoNotice}</p>
      {input("name", "Name", { autoComplete: "name" })}
      {input("email", "Email", { type: "email", autoComplete: "email" })}
      {input("message", "Message")}
      <button type="submit" className={buttonStyles.primary}>
        Send message
      </button>
    </form>
  );
}
