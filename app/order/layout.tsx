import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "اطلب تصميم موقعك | Start a Project",
  description: "اطلب موقعاً احترافياً لمطعمك أو مقهاك أو مخبزك مع WEBFIKRA، وخصص مميزات المنيو والطلب والتصميم.",
};

export default function OrderLayout({ children }: { children: ReactNode }) {
  return children;
}
