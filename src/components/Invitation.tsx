import { ClipboardList, MessageCircle } from "lucide-react";
import { joinHref, siteConfig } from "@/config/site";
import { invitation } from "@/content/sections";
import { CtaLink } from "./CtaLink";
import { Section } from "./Section";

export function Invitation() {
  const { links, cta, contactEmail } = siteConfig;
  const { form, whatsapp } = invitation;
  const viaForm = Boolean(links.notionFormUrl);

  return (
    <Section id="participate" eyebrow={invitation.eyebrow} heading={invitation.heading} lead={invitation.body}>
      <div className={`invite-grid${links.whatsappCommunityUrl ? "" : " invite-grid--single"}`}>
        <div className="invite invite--primary">
          <ClipboardList className="invite__icon" aria-hidden="true" focusable="false" />
          <h3 className="invite__title">{form.title}</h3>
          <p>{form.text}</p>
          <p className="invite__note">{viaForm ? form.viaForm : form.viaEmail}</p>
          <CtaLink href={joinHref} label={cta.primaryLabel} event="cta_join" placement="invitation" />
          {contactEmail && (
            <p className="invite__fallback">
              {viaForm ? "Questions? " : "Email: "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          )}
        </div>

        {links.whatsappCommunityUrl && (
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
          </div>
        )}
      </div>
      <p className="invite__closing">{invitation.closing}</p>
    </Section>
  );
}
