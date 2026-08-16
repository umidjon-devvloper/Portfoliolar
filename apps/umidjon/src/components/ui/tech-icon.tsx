import Image from "next/image";
import {
  siApplepay,
  siAppstore,
  siCloudflare,
  siCss,
  siExpo,
  siExpress,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siGitlab,
  siGooglepay,
  siGoogleplay,
  siGraphql,
  siHtml5,
  siJavascript,
  siMongodb,
  siMongoose,
  siMui,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siRedis,
  siShadcnui,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVisa,
  siVite,
  siFramer,
} from "simple-icons";
import { cn } from "@/lib/utils";

type SimpleIcon = { title: string; path: string; hex: string };

const icons: Record<string, SimpleIcon> = {
  applepay: siApplepay,
  appstore: siAppstore,
  cloudflare: siCloudflare,
  css: siCss,
  expo: siExpo,
  express: siExpress,
  figma: siFigma,
  firebase: siFirebase,
  framer: siFramer,
  git: siGit,
  github: siGithub,
  gitlab: siGitlab,
  googlepay: siGooglepay,
  googleplay: siGoogleplay,
  graphql: siGraphql,
  html5: siHtml5,
  javascript: siJavascript,
  mongodb: siMongodb,
  mongoose: siMongoose,
  mui: siMui,
  netlify: siNetlify,
  nextdotjs: siNextdotjs,
  nodedotjs: siNodedotjs,
  react: siReact,
  redis: siRedis,
  shadcnui: siShadcnui,
  stripe: siStripe,
  tailwindcss: siTailwindcss,
  typescript: siTypescript,
  vercel: siVercel,
  visa: siVisa,
  vite: siVite,
};

function luminance(hex: string) {
  const value = Number.parseInt(hex, 16);
  const channel = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return (
    0.2126 * channel(((value >> 16) & 255) / 255) +
    0.7152 * channel(((value >> 8) & 255) / 255) +
    0.0722 * channel((value & 255) / 255)
  );
}

export function TechIcon({
  slug,
  fallback,
  className,
}: {
  slug: string | null;
  fallback: string;
  className?: string;
}) {
  /* A slug that looks like a path is a brand file we host ourselves —
     local payment systems have no entry in simple-icons. */
  if (slug?.startsWith("/")) {
    return (
      <Image
        src={slug}
        alt={fallback}
        width={24}
        height={24}
        className={cn("object-contain", className)}
      />
    );
  }

  const icon = slug ? icons[slug] : undefined;

  if (!icon) {
    return (
      <span
        aria-hidden
        className={cn(
          "grid place-items-center rounded-[var(--radius-sm)] bg-accent-soft font-mono text-[0.5625rem] font-bold text-accent",
          className,
        )}
      >
        {fallback.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  const light = luminance(icon.hex);
  const neutral = light < 0.16 || light > 0.82;

  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      className={cn(className, neutral && "fill-foreground")}
      style={neutral ? undefined : { fill: `#${icon.hex}` }}
    >
      <path d={icon.path} />
    </svg>
  );
}
