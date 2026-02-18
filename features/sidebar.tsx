import { MoonIcon, SunIcon } from "lucide-react";
import {
  ScrollSpy,
  ScrollSpyLink,
  ScrollSpyNav,
} from "@/components/ui/scroll-spy";
import { Swap, SwapOff, SwapOn } from "@/components/ui/swap";
 
export function Sidebar() {
  return (
    <>
        <ScrollSpyNav className="w-40 border-r p-4">
            <ScrollSpyLink value="introduction">Introduction</ScrollSpyLink>
            <ScrollSpyLink value="getting-started">Getting Started</ScrollSpyLink>
            <ScrollSpyLink value="usage">Usage</ScrollSpyLink>
            <ScrollSpyLink value="api-reference">API Reference</ScrollSpyLink>
        </ScrollSpyNav>
        <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
            <Swap className="size-12 rounded-lg border bg-muted/50 hover:bg-muted" animation="rotate">
            <SwapOn>
                <SunIcon className="size-6" />
            </SwapOn>
            <SwapOff>
                <MoonIcon className="size-6" />
            </SwapOff>
            </Swap>
        </div>
        </div>
    </>
  );
}