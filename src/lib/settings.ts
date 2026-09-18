import { prisma } from "./prisma";

export type HomeContentSetting = {
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  phone: string;
  email: string;
  address: string;
  licenseNumber: string;
  yearsInBusiness: string;
};

export type SettingsShape = {
  home: HomeContentSetting;
};

export const SETTINGS_DEFAULTS: SettingsShape = {
  home: {
    heroEyebrow: "Design-Build Remodeling · Knoxville, TN",
    heroTitle: "Kitchens and baths, built to be lived in.",
    heroSubtitle:
      "Fieldstone designs and builds kitchen and bath renovations around how your family actually cooks, gathers, and gets ready in the morning — with finishes chosen to age well, not just photograph well.",
    phone: "(865) 555-0148",
    email: "hello@fieldstonekb.example",
    address: "Knoxville, TN",
    licenseNumber: "TN-HIC-000000 (example)",
    yearsInBusiness: "14",
  },
};

export type SettingKey = keyof SettingsShape;

export async function getSettings(): Promise<SettingsShape> {
  const rows = await prisma.setting.findMany();
  const map = new Map(rows.map((r) => [r.key, r.value]));

  return {
    home: { ...SETTINGS_DEFAULTS.home, ...(map.get("home") as object | undefined) },
  };
}

export async function setSetting<K extends SettingKey>(key: K, value: SettingsShape[K]) {
  await prisma.setting.upsert({
    where: { key },
    update: { value: value as object },
    create: { key, value: value as object },
  });
}
