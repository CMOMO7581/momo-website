"use client";

import { useState, type FormEvent } from "react";
import type { Copy } from "@/lib/content";
import site from "@/content/site.json";

type Status = "idle" | "invalid" | "sending" | "sent" | "failed";

export function ContactForm({ t }: { t: Copy }) {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name")).trim(), email = String(data.get("email")).trim(), msg = String(data.get("message")).trim();
    if (!name || !msg || !/^\S+@\S+\.\S+$/.test(email)) { setStatus("invalid"); return; }

    // Honeypot: people never see this field, so anything in it came from a bot. Pretend it worked.
    if (String(data.get("_gotcha") ?? "")) { form.reset(); setStatus("sent"); return; }

    setStatus("sending");
    data.set("_subject", String(data.get("topic")) + t["ui.from"] + name);
    try {
      if (!site.formspreeId) throw new Error("formspreeId is not set in content/site.json");
      const res = await fetch("https://formspree.io/f/" + site.formspreeId, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Formspree responded " + res.status);
      form.reset();
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("failed");
    }
  }

  const note = { idle: t["f.note"], sending: t["f.sending"], invalid: t["ui.err"], sent: t["f.ok"], failed: t["f.fail"] }[status];
  const isError = status === "invalid" || status === "failed";

  return (
    <form id="contactForm" noValidate onSubmit={submit}>
      <div className="row2">
        <div><label htmlFor="cf-name">{t["f.name"]}</label><input id="cf-name" name="name" autoComplete="name" required /></div>
        <div><label htmlFor="cf-email">{t["f.email"]}</label><input id="cf-email" name="email" type="email" autoComplete="email" required /></div>
      </div>
      <div><label htmlFor="cf-topic">{t["f.topic"]}</label>
        <select id="cf-topic" name="topic"><option>{t["f.o1"]}</option><option>{t["f.o2"]}</option><option>{t["f.o3"]}</option><option>{t["f.o4"]}</option></select>
      </div>
      <div><label htmlFor="cf-msg">{t["f.msg"]}</label><textarea id="cf-msg" name="message" required /></div>
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="cf-gotcha">Leave this field empty</label>
        <input id="cf-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="note" id="formNote" role="status" style={isError ? { color: "var(--figure)" } : undefined}>{note}</p>
      <button className="btn" type="submit" disabled={status === "sending"}>{t["f.submit"]}</button>
    </form>
  );
}
