import type { Metadata } from "next";
import EstimateWizard from "@/components/EstimateWizard";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Get a Free Estimate | ${SITE_NAME}`,
  description: "Try a simulated kitchen or bathroom estimate. Nothing is sent or saved.",
};

export default function EstimatePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-clay">Free, no-obligation</p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl">Let&apos;s talk about your project</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-charcoal-muted">
          Try the sample questions using fictional details. Nothing is saved or sent, and there is no
          pressure, no canned pricing.
        </p>
      </div>
      <div className="mt-10">
        <EstimateWizard source="estimate-page" />
      </div>
    </div>
  );
}
