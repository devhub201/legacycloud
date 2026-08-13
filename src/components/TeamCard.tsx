import { motion } from "framer-motion";
import { Github, Mail, MessageCircle, Twitter, Target, CalendarDays } from "lucide-react";
import type { TeamMember, SocialLabel } from "@/lib/team";
import { iconByName } from "@/lib/icons";

const SOCIAL_ICON: Record<SocialLabel, typeof Github> = {
  Discord: MessageCircle,
  GitHub: Github,
  X: Twitter,
  Email: Mail,
};

export default function TeamCard({
  member,
  index = 0,
  compact = false,
}: { member: TeamMember; index?: number; compact?: boolean }) {
  const Icon = iconByName(member.icon);
  return (
    <div className="[perspective:1000px] h-full">
      <motion.article
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: index * 0.06, duration: 0.4 }}
        whileHover={{ y: -6, rotateX: 5, rotateY: -4 }}
        style={{ transformStyle: "preserve-3d" }}
        className="glass-pro rounded-2xl p-5 h-full flex flex-col overflow-hidden"
      >
        <span aria-hidden className="glass-sweep absolute inset-0 pointer-events-none" />
        <div className="relative flex items-center gap-4">
          <span className={`icon-tile ${member.tone} ${compact ? "w-11 h-11" : "w-14 h-14"} shrink-0 icon-hover`}>
            <Icon className={compact ? "w-5 h-5" : "w-6 h-6"} />
          </span>
          <div className="min-w-0">
            <h3 className="font-display font-bold leading-tight truncate">{member.name}</h3>
            <div className="text-xs font-semibold text-gradient-blossom">{member.role}</div>
            {member.handle && <div className="text-[11px] text-muted-foreground">{member.handle}</div>}
          </div>
        </div>

        {member.bio && <p className="relative text-sm text-muted-foreground leading-relaxed mt-4">{member.bio}</p>}

        <div className="relative mt-4 space-y-1.5 text-[11px] text-muted-foreground">
          {member.focus && <div className="flex items-center gap-2"><Target className="w-3.5 h-3.5 text-accent" /> {member.focus}</div>}
          {member.since && <div className="flex items-center gap-2"><CalendarDays className="w-3.5 h-3.5 text-info" /> {member.since}</div>}
        </div>

        {member.tags.length > 0 && (
          <div className="relative flex flex-wrap gap-2 mt-4">
            {member.tags.map((t) => (
              <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{t}</span>
            ))}
          </div>
        )}

        {member.socials.length > 0 && (
          <div className="relative flex items-center gap-2 mt-auto pt-4 border-t border-border/60">
            {member.socials.map((s) => {
              const SIcon = SOCIAL_ICON[s.label] ?? MessageCircle;
              return (
                <a
                  key={`${s.label}-${s.href}`}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} on ${s.label}`}
                  className="glass w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition"
                >
                  <SIcon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        )}
      </motion.article>
    </div>
  );
}
