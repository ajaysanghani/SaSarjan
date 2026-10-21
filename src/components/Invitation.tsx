import { ClipboardList, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { invitation } from "@/content/sections";
import { CtaLink } from "./CtaLink";
import { Section } from "./Section";

export function Invitation() {
  const { links, cta, contactEmail } = siteConfig;
  const { form, whatsapp } = invitation;

  return (
    <Section id="participate" eyebrow={invitation.eyebrow} heading={invitation.heading} lead={invitation.body}>
      <div className="invite-grid">
        <div className="invite invite--primary">
          <ClipboardList className="invite__icon" aria-hidden="true" focusable="false" />
          <h3 className="invite__title">{form.title}</h3>
          <p>{form.text}</p>
          <CtaLink
            href={links.notionFormUrl}
            label={cta.primaryLabel}
            event="cta_express_interest"
            placement="invitation"
          />
          <p className="invite__fallback">
            {links.notionFormUrl ? (
              <>
                If the form does not open,{" "}
                {contactEmail ? (
                  <>
                    please email <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
                  </>
                ) : (
                  <>please try again later or copy this address into your browser: {links.notionFormUrl}</>
                )}
              </>
            ) : (
              form.unavailable
            )}
          </p>
        </div>

        <div className="invite">
          <MessageCircle className="invite__icon" aria-hidden="true" focusable="false" />
          <h3 className="invite__title">{whatsapp.title}</h3>
          <p>{whatsapp.text}</p>
          <ul className="invite__guidelines">
            {whatsapp.guidelines.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <CtaLink
            href={links.whatsappCommunityUrl}
            label={cta.secondaryLabel}
            variant="secondary"
            event="cta_whatsapp_community"
            placement="invitation"
          />
          {!links.whatsappCommunityUrl && <p className="invite__fallback">{whatsapp.unavailable}</p>}
        </div>
      </div>
      <p className="invite__closing">{invitation.closing}</p>
    </Section>
  );
}
