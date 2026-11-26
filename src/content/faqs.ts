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
      "Yes. We welcome participation from every state and Union Territory, and from rural, urban and remote locations alike. You can join and contribute online from wherever you are.",
    ],
  },
  {
    id: "time",
    question: "Can I participate while studying or working full-time?",
    answer: [
      "Yes. Contribution formats are flexible. Tell us your approximate availability when you join, and contribute in ways that fit around your other commitments.",
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
      "Tell us which pathways interest you when you join: Guides and Mentors, the Co-creation and Implementation Team, or Emerging Contributors and Learners. These are flexible pathways, not ranks, and you can change how you contribute over time.",
    ],
  },
  {
    id: "after-form",
    question: "What happens after I join?",
    answer: [
      "The organising team reviews each registration to understand your interests, skills and availability, and connects you with relevant conversations and activities.",
      "Joining does not guarantee a particular role, appointment, employment or decision-making responsibility.",
    ],
  },
  {
    id: "transparency",
    question: "How will transparency and accountability be maintained?",
    answer: [
      "Transparency is one of our founding principles. We make objectives, proposals, decisions and progress understandable and reviewable, and share progress updates with participants.",
      "We describe our working arrangements openly and refine them based on what we learn.",
    ],
  },
  {
    id: "data",
    question: "How will my information be used?",
    answer: [
      "The information you choose to share when you join is used to understand your interests and to contact you about participation. We ask only for what is useful for that purpose — never for Aadhaar numbers or identity documents. Any demographic questions are optional.",
      "Applications are stored in a private Notion database that only our core organising team can see. Notion is a third-party service, so its own terms and privacy policy also apply.",
      ...(contactEmail
        ? [`For questions about your information, contact ${contactEmail}.`]
        : []),
    ],
    link: { label: "Read the privacy notice", href: links.privacyNoticeUrl, external: !links.privacyNoticeUrl.startsWith("/") },
  },
];
