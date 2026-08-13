import { createContext, useContext, useEffect, useMemo, ReactNode } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ThemeSettings = {
  background?: string;
  primary?: string;
  primaryGlow?: string;
  accent?: string;
  radius?: string;
};

export type BrandSettings = {
  name?: string;
  tagline?: string;
  discord?: string;
  logoText?: string;
};

export type AppearanceSettings = {
  backgroundImage?: string;
  backgroundOpacity?: number;
  particles?: "bubbles" | "none";
};

type SettingsMap = Record<string, any>;

type Ctx = {
  settings: SettingsMap;
  theme: ThemeSettings;
  brand: BrandSettings;
  appearance: AppearanceSettings;
  refresh: () => void;
};

const SiteContext = createContext<Ctx>({} as Ctx);

export const DEFAULT_DISCORD = "https://discord.gg/vPE7XRqqHJ";

export function SiteProvider({ children }: { children: ReactNode }) {
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("key,value");
      if (error) throw error;
      const map: SettingsMap = {};
      (data ?? []).forEach((r: any) => (map[r.key] = r.value ?? {}));
      return map;
    },
  });

  const settings = data ?? {};
  const theme: ThemeSettings = settings.theme ?? {};
  const brand: BrandSettings = { name: "Legacy Cloud", discord: DEFAULT_DISCORD, ...(settings.brand ?? {}) };
  const appearance: AppearanceSettings = {
    backgroundImage: "/background.png",
    backgroundOpacity: 0.35,
    particles: "bubbles",
    ...(settings.appearance ?? {}),
  };

  useEffect(() => {
    const root = document.documentElement;
    const map: Record<string, string | undefined> = {
      "--background": theme.background,
      "--primary": theme.primary,
      "--primary-glow": theme.primaryGlow,
      "--accent": theme.accent,
      "--ring": theme.primary,
      "--radius": theme.radius,
    };
    Object.entries(map).forEach(([k, v]) => {
      if (v) root.style.setProperty(k, v);
    });
  }, [theme.background, theme.primary, theme.primaryGlow, theme.accent, theme.radius]);

  const value = useMemo<Ctx>(
    () => ({
      settings,
      theme,
      brand,
      appearance,
      refresh: () => {
        qc.invalidateQueries({ queryKey: ["site-settings"] });
        qc.invalidateQueries({ queryKey: ["page-sections"] });
        qc.invalidateQueries({ queryKey: ["catalog"] });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);

export async function saveSetting(key: string, value: any) {
  const { error } = await supabase.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw error;
}
