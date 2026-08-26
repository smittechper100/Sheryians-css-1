import React, { useCallback, useEffect, useRef, useState } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import gsap from "gsap";
 
const tooltipVariants = cva(
  "fixed z-50 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium shadow-md pointer-events-none",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white",
        light:
          "bg-[var(--surface)] text-[var(--text-color)] border border-[var(--border-color)] shadow-sm",
      },
      size: {
        sm: "text-[11px] px-2 py-1",
        md: "text-xs px-3 py-1.5",
        lg: "text-sm px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "md",
    },
  },
);
 
const GAP = 8;
 
const alignmentClass: Record<string, string> = {
  top: "-translate-x-1/2 -translate-y-full",
  bottom: "-translate-x-1/2",
  left: "-translate-x-full -translate-y-1/2",
  right: "-translate-y-1/2",
};
 
export interface TooltipProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "content">,
    VariantProps<typeof tooltipVariants> {
  /** Render onto the single child instead of wrapping it in a <span> */
  asChild?: boolean;
  /** Tooltip bubble content */
  content: React.ReactNode;
  /** Which side of the trigger the bubble appears on */
  side?: "top" | "bottom" | "left" | "right";
  /** Delay in ms before the tooltip appears */
  delay?: number;
}
 
const Tooltip = React.forwardRef<HTMLElement, TooltipProps>(
  (
    {
      asChild = false,
      content,
      children,
      className,
      variant,
      size,
      side = "top",
      delay = 150,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "span";
    const triggerRef = useRef<HTMLElement | null>(null);
    const bubbleRef = useRef<HTMLDivElement | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
 
    const place = useCallback(() => {
      const el = triggerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const positions = {
        top: { top: rect.top - GAP, left: rect.left + rect.width / 2 },
        bottom: { top: rect.bottom + GAP, left: rect.left + rect.width / 2 },
        left: { top: rect.top + rect.height / 2, left: rect.left - GAP },
        right: { top: rect.top + rect.height / 2, left: rect.right + GAP },
      };
      setCoords(positions[side]);
    }, [side]);
 
    const show = () => {
      timeoutRef.current = setTimeout(() => {
        place();
        setVisible(true);
      }, delay);
    };
 
    const hide = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setVisible(false);
    };
 
    useEffect(() => {
      if (visible && bubbleRef.current) {
        gsap.fromTo(
          bubbleRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.15, ease: "power2.out" },
        );
 
        // Nudge back on-screen if any edge overflows the viewport â€”
        // the position above is computed purely from the trigger's
        // location, so near a screen edge it can render off-screen.
        const margin = 8;
        const rect = bubbleRef.current.getBoundingClientRect();
        let { top, left } = coords;
        let adjusted = false;
 
        if (rect.left < margin) {
          left += margin - rect.left;
          adjusted = true;
        }
        if (rect.right > window.innerWidth - margin) {
          left -= rect.right - (window.innerWidth - margin);
          adjusted = true;
        }
        if (rect.top < margin) {
          top += margin - rect.top;
          adjusted = true;
        }
        if (rect.bottom > window.innerHeight - margin) {
          top -= rect.bottom - (window.innerHeight - margin);
          adjusted = true;
        }
 
        if (adjusted) setCoords({ top, left });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);
 
    useEffect(
      () => () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      },
      [],
    );
 
    return (
      <>
        <Comp
          ref={(node: HTMLElement | null) => {
            triggerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref)
              (ref as React.MutableRefObject<HTMLElement | null>).current =
                node;
          }}
          className={cn(!asChild && "inline-flex", className)}
          onMouseEnter={show}
          onMouseLeave={hide}
          onFocus={show}
          onBlur={hide}
          {...props}
        >
          {children}
        </Comp>
 
        {visible && (
          <div
            ref={bubbleRef}
            role="tooltip"
            style={{ top: coords.top, left: coords.left }}
            className={cn(
              tooltipVariants({ variant, size }),
              alignmentClass[side],
            )}
          >
            {content}
          </div>
        )}
      </>
    );
  },
);
 
Tooltip.displayName = "Tooltip";
export { Tooltip, tooltipVariants };
 
 