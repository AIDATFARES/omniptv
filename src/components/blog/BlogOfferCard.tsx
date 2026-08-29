import Link from "next/link";
import { Zap, Play } from "lucide-react";

interface BlogOfferCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export default function BlogOfferCard({ title, description, buttonText, buttonLink }: BlogOfferCardProps) {
  return (
    <div className="my-10 relative overflow-hidden rounded-[22px] border border-white/10 bg-[#050607] p-8 shadow-2xl sm:flex sm:items-center sm:justify-between sm:gap-8 group">
      {/* Subtle glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] bg-red-600/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-red-600/10 transition-colors duration-500" />
      
      <div className="relative z-10 flex-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FF5A2F]/35 bg-[#FF5A2F]/10 text-[#FF6A35] mb-4">
          <Zap className="h-5 w-5" />
        </span>
        <h3 className="text-2xl font-black uppercase tracking-tight text-white m-0 border-none pb-0">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-400 mb-0">
          {description}
        </p>
      </div>
      
      <div className="relative z-10 mt-6 sm:mt-0 shrink-0">
        <Link
          href={buttonLink}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A2F] to-[#E83E59] px-6 py-3.5 text-[12px] font-extrabold uppercase tracking-wide text-white shadow-[0_0_20px_rgba(255,90,47,0.4)] transition-all hover:from-[#E83E59] hover:to-[#FF5A2F] hover:scale-105 active:scale-95"
        >
          <Play className="h-4 w-4" fill="currentColor" />
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
