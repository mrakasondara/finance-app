import { FeatureOverview } from "@/components/landing-page/FeatureOverview";
import { Features } from "@/components/landing-page/Features";
import { Hero } from "@/components/landing-page/Hero";
import { Reviews } from "@/components/landing-page/Reviews";

export const metadata = {
  title: "Vaulto Finance App",
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-[5rem] overflow-x-hidden">
      <Hero />
      <FeatureOverview />
      <Features />
      <Reviews />
    </div>
  );
}
