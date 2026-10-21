import { ChevronDown } from "lucide-react";
import { faqs } from "@/content/faqs";
import { Section } from "./Section";

/** Native <details> disclosures: keyboard and screen-reader accessible with no JavaScript. */
export function Faq() {
  return (
    <Section id="faq" eyebrow="Questions" heading="Frequently asked questions" tone="muted">
      <div className="faq-list">
        {faqs.map((faq) => (
          <details key={faq.id} className="faq" data-track-toggle="faq_open" data-track-id={faq.id}>
            <summary className="faq__question">
              <h3 className="faq__question-text">{faq.question}</h3>
              <ChevronDown className="faq__chevron" aria-hidden="true" focusable="false" />
            </summary>
            <div className="faq__answer">
              {faq.answer.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {faq.link && (
                <p>
                  <a
                    href={faq.link.href}
                    {...(faq.link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {faq.link.label}
                    {faq.link.external && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
