import { KeyRound, ShieldCheck, Sparkles } from "lucide-react";
import {
  SiAuth0,
  SiCloudflareworkers,
  SiDocker,
  SiGithubactions,
  SiJsonwebtokens,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export const techStack = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Java", icon: SiOpenjdk },
      { name: "Spring", icon: SiSpringboot },
      { name: "Python", icon: SiPython },
    ],
  },
  {
    category: "Authentication",
    items: [
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "OAuth", icon: KeyRound },
      { name: "NextAuth", icon: ShieldCheck },
      { name: "Auth0", icon: SiAuth0 },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    category: "CI/CD",
    items: [
      { name: "GitHub Actions", icon: SiGithubactions },
      { name: "Docker", icon: SiDocker },
      { name: "Cloudflare Workers", icon: SiCloudflareworkers },
    ],
  },
  {
    category: "AI",
    items: [
      { name: "OpenAI API", icon: Sparkles },
      { name: "LangChain", icon: SiLangchain },
    ],
  },
] as const;
