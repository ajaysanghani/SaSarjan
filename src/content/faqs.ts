import { siteConfig } from "@/config/site";

export type Faq = {
  id: string;
  question: string;
  answer: string[];
  link?: { label: string; href: string; external?: boolean };
};

const { links, contactEmail } = siteConfig;

/**
 * Frequently asked questions.
 *
 * Answers about status, governance and privacy must state only verified facts
 * and configured policies. Update them as arrangements are confirmed.
 */
export const faqs: Faq[] = [
  {
    id: "purpose",
    question: "What is the purpose of this initiative?",
    answer: [
      "To bring together people with diverse knowledge and experience to understand societal challenges, design better systems and develop practical solutions — contributing to transparent, inclusive and effective governance and collective prosperity.",
      "It is an invitation to a long-term process of learning, research, system design, experimentation and improvement, not a one-off discussion.",
    ],
  },
  {
    id: "who",
    question: "Who can participate?",
    answer: [
      "Anyone who cares about India's future and wants to contribute constructively — across professions, generations, genders, languages and locations. Experienced professionals, researchers, entrepreneurs, public servants, community practitioners, students and curious citizens are all welcome.",
    ],
  },
  {
    id: "qualifications",
    question: "Do I need formal qualifications?",
    answer: [
      "No. Formal qualifications are welcome, but they are not required. Practical experience, demonstrated ability and lived knowledge are valued alongside them.",
    ],
  },
  {
    id: "location",
    question: "Can I contribute from any state or Union Territory?",
    answer: [
      "Yes. We welcome participation from every state and Union Territory, and from rural, urban and remote locations alike. You can express interest and join the community online from wherever you are.",
    ],
  },
  {
    id: "time",
    question: "Can I participate while studying or working full-time?",
    answer: [
      "Yes. Contribution formats are intended to be flexible. You can tell us your approximate availability in the form, and contribute in ways that fit around your other commitments.",
    ],
  },
  {
    id: "language",
    question: "Can I contribute in an Indian language other than English?",
    answer: [
      "Yes, and we encourage it. How well we can support each language will depend on the people who join, so please tell us your preferred languages in the form.",
    ],
  },
  {
    id: "pathways",
    question: "How can I participate as a mentor, implementer or learner?",
    answer: [
      "Choose one or more pathways in the interest form: Guides and Mentors, the Co-creation and Implementation Team, or Emerging Contributors and Learners. These are flexible pathways, not ranks, and you can change how you contribute over time.",
    ],
  },
  {
    id: "after-form",
    question: "What happens after I submit the form?",
    answer: [
      "The organising team reviews responses to understand participants' interests, skills and availability, and to connect people with relevant conversations and activities as they develop.",
      "Submitting the form expresses your interest. It does not guarantee a particular role, appointment, employment or decision-making responsibility.",
    ],
  },
  {
    id: "transparency",
    question: "How will transparency and accountability be maintained?",
    answer: [
      "Transparency is one of our founding principles. We intend to make objectives, proposals, decisions and progress understandable and reviewable, and to publish appropriate progress updates.",
      "Our working arrangements are still being developed. As they are established, we will describe them openly and refine them based on what we learn.",
    ],
  },
  {
    id: "status",
    question: "Is this a political party or a government initiative?",
    answer: [
      "No. This is not a political party or a political campaign, and it is not a government programme. It is not endorsed by any government body.",
      "Details of the initiative's organisational structure will be shared on this website as they are confirmed.",
    ],
  },
  {
    id: "data",
    question: "How will my information be used?",
    answer: [
      "The information you choose to share in the interest form is used to understand your interests and to contact you about participation. We ask only for what is useful for that purpose — never for Aadhaar numbers or identity documents. Any demographic questions are optional.",
      "The form is hosted on Notion, a third-party service, so Notion's own terms and privacy policy also apply. Please read the privacy information on the form before submitting.",
      ...(contactEmail
        ? [`For questions about your information, contact ${contactEmail}.`]
        : []),
    ],
    link: links.privacyNoticeUrl
      ? { label: "Read the privacy notice", href: links.privacyNoticeUrl, external: true }
      : undefined,
  },
];
