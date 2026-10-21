import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Compass,
  Ear,
  Eye,
  FlaskConical,
  GraduationCap,
  Handshake,
  MessageCircle,
  PencilRuler,
  RefreshCw,
  Repeat,
  Scale,
  Users,
  Wrench,
} from "lucide-react";

/** Copy for each section of the home page. Edit text here, not in components. */

export const purpose = {
  eyebrow: "Why this initiative exists",
  heading: "From scattered efforts to collective progress.",
  body: [
    "Across India, people are already working on important challenges. Valuable knowledge, capable people and promising solutions often remain disconnected.",
    "We want to help bridge those gaps by creating a space where diverse perspectives can meet, ideas can be examined openly, and people can collaborate on practical solutions.",
  ],
  /** Labels around the connection diagram. Keep to eight short labels. */
  diagramCentre: "Shared understanding",
  diagramNodes: [
    "Lived experience",
    "Research",
    "Communities",
    "Public institutions",
    "Enterprise",
    "Practitioners",
    "Civil society",
    "Students",
  ],
};

export const focusAreasIntro = {
  eyebrow: "Focus areas",
  heading: "One society. Interconnected systems.",
  lead: "Ten broad, long-term areas of collective responsibility. They are working areas for learning and collaboration — not proposed ministries or isolated silos.",
  note: "These areas are interconnected. Many important challenges require people from multiple fields to work together.",
};

export type Pathway = {
  id: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  forWhom: string;
};

export const participation = {
  eyebrow: "Who can participate",
  heading: "Different strengths. A shared purpose.",
  pathways: [
    {
      id: "guides",
      title: "Guides and Mentors",
      icon: Compass,
      summary: "Share your experience, guide emerging contributors, review proposals and help others learn.",
      forWhom:
        "Experienced professionals, researchers, academics, entrepreneurs, public servants, social leaders, practitioners and subject-matter experts.",
    },
    {
      id: "co-creation",
      title: "Co-creation and Implementation Team",
      icon: Wrench,
      summary:
        "Research challenges, document insights, coordinate people, develop solutions and turn ideas into action.",
      forWhom:
        "People drawn to research, documentation, coordination, facilitation, communications, technology, design, operations and project delivery.",
    },
    {
      id: "learners",
      title: "Emerging Contributors and Learners",
      icon: GraduationCap,
      summary:
        "Learn alongside experienced practitioners, contribute your skills, explore societal challenges and grow through meaningful work.",
      forWhom:
        "Students, young professionals, early-career researchers, community volunteers and curious citizens.",
    },
  ] satisfies Pathway[],
  note: "These are flexible pathways, not ranks. You may contribute in more than one way, and your role can evolve as the initiative develops.",
  valueNote:
    "Demonstrated ability, practical experience and lived knowledge are valued alongside formal qualifications.",
};

export const principles = {
  eyebrow: "Principles and culture",
  heading: "How we choose to work together.",
  lead: "The principles that guide everything we do, and that we keep refining as we learn together.",
  items: [
    {
      title: "Transparency",
      icon: Eye,
      text: "Make objectives, proposals, decisions and progress understandable and reviewable.",
    },
    {
      title: "Inclusion",
      icon: Users,
      text: "Create meaningful opportunities across gender, generation, region, language and background.",
    },
    {
      title: "Evidence and experience",
      icon: Scale,
      text: "Combine research, professional knowledge and lived experience.",
    },
    {
      title: "Constructive dialogue",
      icon: MessageCircle,
      text: "Disagree respectfully, examine assumptions and learn from different perspectives.",
    },
    {
      title: "Shared responsibility",
      icon: Handshake,
      text: "Convert discussion into practical contributions and measurable improvement.",
    },
    {
      title: "Continuous learning",
      icon: Repeat,
      text: "Test ideas, acknowledge mistakes and improve what does not work.",
    },
  ],
  note: "We work in a culture of openness, mutual respect, accountability and learning, and we shape how we make decisions together with participants, in the open.",
};

export const inclusion = {
  eyebrow: "Representation and inclusion",
  heading: "India's diversity should be reflected in who shapes its future.",
  body: "We welcome people across genders, generations, states, Union Territories, professions, languages and lived experiences. Meaningful participation should not depend solely on formal qualifications, financial means, metropolitan access or fluency in English.",
  commitmentsHeading: "How we put this into practice",
  commitments: [
    "Outreach across rural, urban, remote and underserved locations.",
    "Meaningful participation by women and men across categories and responsibilities.",
    "Recognition of practical expertise and community knowledge.",
    "Accessible digital participation and flexible contribution formats.",
    "Encouragement of contributions in Indian languages.",
    "Periodic review of participation gaps and barriers.",
  ],
  note: "Representation is an ongoing responsibility. We regularly review who is taking part, and who is missing, and act on what we find.",
};

export const process = {
  eyebrow: "How we work",
  heading: "From understanding to action.",
  lead: "A simple, repeatable way of working that we improve with every cycle.",
  steps: [
    {
      title: "Listen and Understand",
      icon: Ear,
      text: "Identify needs, lived experiences, existing work and the root causes of challenges.",
    },
    {
      title: "Learn and Research",
      icon: BookOpen,
      text: "Study evidence, existing institutions, successful approaches, limitations and relevant perspectives.",
    },
    {
      title: "Co-create and Design",
      icon: PencilRuler,
      text: "Bring stakeholders together to develop, challenge and refine proposals.",
    },
    {
      title: "Test and Implement",
      icon: FlaskConical,
      text: "Develop practical experiments, pilots or action plans with clear ownership and suitable safeguards.",
    },
    {
      title: "Review and Improve",
      icon: RefreshCw,
      text: "Publish appropriate progress updates, evaluate outcomes, learn from failures and revise proposals.",
    },
  ],
  note: "Not every proposal is adopted or implemented. Governance proposals are developed through evidence, consultation, transparent reasoning and appropriate legal and institutional review.",
};

export const invitation = {
  eyebrow: "Participate",
  heading: "Bring your experience. Share your ideas. Help shape what comes next.",
  body: "Whether you are an experienced professional, a researcher, an entrepreneur, a public servant, a community practitioner, a student or someone eager to learn and contribute, there is a place for you in this journey.",
  closing:
    "Share what you know, what you want to learn and how you would like to contribute. You do not need to have every answer to begin.",
  form: {
    title: "Join the initiative",
    text: "Tell us about your background, the areas you care about and how you would like to contribute.",
    note: "The application form takes about five minutes.",
  },
  whatsapp: {
    title: "Join the WhatsApp Community",
    text: "A voluntary space for connection, updates and collaboration. Joining the community is voluntary and does not by itself mean a formal role.",
    guidelines: [
      "Keep conversations respectful, relevant and constructive.",
      "Protect your personal information and that of others.",
      "Do not share confidential material without permission.",
      "Your phone number may be visible to community admins and to members of groups you join.",
    ],
  },
};
