"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Copy } from "@/lib/content";
import { copyText } from "./copyText";

const TO = "cc79336@eid.utexas.edu";

export function ContactForm({ t }: { t: Copy }) {
  const [error, setError] = useState(false);
  const [draft, setDraft] = useState<{ text: string; mailto: string } | null>(null);
  const pre = useRef<HTMLPreElement>(null);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name")).trim(), email = String(data.get("email")).trim(), msg = String(data.get("message")).trim();
    const select = form.elements.namedItem("topic") as HTMLSelectElement;
    const topic = select.options[select.selectedIndex].text;
    if (!name || !msg || !/^\S+@\S+\.\S+$/.test(email)) { setError(true); return; }
    setError(false);
    const subject = topic + t["ui.from"] + name;
    const body = msg + "\n\n" + name + "\n" + email;
    setDraft({
      text: "To: " + TO + "\nSubject: " + subject + "\n\n" + body,
      mailto: "mailto:" + TO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body),
    });
  }

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
      <p className="note" id="formNote" style={error ? { color: "var(--figure)" } : undefined}>{error ? t["ui.err"] : t["f.note"]}</p>
      <button className="btn" type="submit">{t["f.submit"]}</button>
      <div className="result" id="result" hidden={!draft}>
        <pre id="resultText" ref={pre}>{draft?.text}</pre>
        <div className="acts">
          <button
            className="btn"
            type="button"
            id="copyMsg"
            onClick={(e) => copyText(pre.current?.textContent ?? "", e.currentTarget, pre.current, { copied: t["ui.copied"], selected: t["ui.selected"] })}
          >
            {t["f.copy"]}
          </button>
          <a className="btn ghost" id="mailLink" href={draft?.mailto ?? "#"}>{t["f.open"]}</a>
        </div>
        <p className="note">{t["f.paste"]}</p>
      </div>
    </form>
  );
}
