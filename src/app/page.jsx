import { FeatureOverview } from "@/components/landing-page/FeatureOverview";
import { Features } from "@/components/landing-page/Features";
import { Hero } from "@/components/landing-page/Hero";

export const metadata = {
  title: "Vaulto Finance App",
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-[5rem]">
      <Hero />
      <FeatureOverview />
      <Features />
    </div>
  );
}
