import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
 
const TooltipPage = () => {
  const basicUsageCode = `
import { Tooltip } from "@/components/Tooltip/Tooltip"
 
<Tooltip content="Saves your changes" side="top">
  <Button size="sm">Top</Button>
</Tooltip>
<Tooltip content="Deletes the item" side="bottom" variant="light">
  <Button size="sm" variant="outline">Bottom</Button>
</Tooltip>
<Tooltip content="Merge without approval" side="right">
  <Button size="sm" variant="ghost">Right</Button>
</Tooltip>`;
 
  const propsData = [
    {
      prop: "content",
      type: "React.ReactNode",
      default: "—",
      description: "The tooltip bubble's content",
    },
    {
      prop: "side",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Which side of the trigger the bubble appears on",
    },
    {
      prop: "variant",
      type: '"dark" | "light"',
      default: '"dark"',
      description: "The visual style of the bubble",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "The size of the bubble",
    },
    {
      prop: "delay",
      type: "number",
      default: "150",
      description: "Milliseconds to wait before showing, on hover or focus",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Merge tooltip behavior onto the child instead of wrapping it in a span",
    },
  ];
 
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
        >
          Tooltip
        </p>
        <p className="text-lg text-(--text-muted)">
          A small popup that shows information when hovering or focusing an element.
        </p>
      </header>
 
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={basicUsageCode}>
          <div className="flex gap-6 flex-wrap items-center">
            <Tooltip content="Saves your changes" side="top">
              <Button size="sm">Top</Button>
            </Tooltip>
            <Tooltip content="Deletes the item" side="bottom" variant="light">
              <Button size="sm" variant="outline">
                Bottom
              </Button>
            </Tooltip>
            <Tooltip content="Merge without approval" side="right">
              <Button size="sm" variant="ghost">
                Right
              </Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>
 
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};
 
export default TooltipPage;
 
 