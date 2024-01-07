import Prose from "@/components/prose";

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <Prose>{children}</Prose>;
}
