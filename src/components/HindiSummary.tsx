import { joinHref } from "@/config/site";

/** Short Hindi summary of the initiative, for visitors who prefer Hindi. */
export function HindiSummary() {
  return (
    <section id="hindi" lang="hi" aria-labelledby="hindi-heading" className="section section--plain">
      <div className="container hindi">
        <p className="eyebrow">हिन्दी में</p>
        <h2 id="hindi-heading" className="section__heading">
          भारत का भविष्य, मिलकर बनाएँ।
        </h2>
        <p className="section__lead">
          भारत की चुनौतियाँ आपस में जुड़ी हुई हैं। हम अलग-अलग क्षेत्रों, पीढ़ियों, पेशों और राज्यों के लोगों को एक साथ
          ला रहे हैं, ताकि मिलकर पारदर्शी, समावेशी और प्रभावी व्यवस्थाएँ बनाई जा सकें। औपचारिक डिग्री ज़रूरी नहीं है;
          आपका अनुभव और सीखने की इच्छा ही काफ़ी है। आप हिन्दी या किसी भी भारतीय भाषा में योगदान दे सकते हैं।
        </p>
        <p>
          <a className="btn btn--primary" href={joinHref} data-track="cta_join" data-track-id="hindi">
            जुड़ें (Join the Initiative)
          </a>
        </p>
      </div>
    </section>
  );
}
