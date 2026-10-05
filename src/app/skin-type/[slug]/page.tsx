import { redirect } from "next/navigation";

const SLUG_TO_SKINTYPE: Record<string, string> = {
  "oily-acne-prone": "OILY",
  "textured-skin": "COMBINATION",
  "enlarged-pores": "OILY",
  "compromised-barrier": "DRY",
  sensitive: "SENSITIVE",
  hyperpigmentation: "NORMAL",
};

export default async function SkinTypePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skinType = SLUG_TO_SKINTYPE[slug];

  if (skinType) {
    redirect(`/products?skinType=${skinType}`);
  }

  redirect("/products");
}
