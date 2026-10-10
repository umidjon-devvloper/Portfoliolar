import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Boxes,
  Briefcase,
  ChartNoAxesColumn,
  CircleEllipsis,
  Cloud,
  Code,
  CreditCard,
  Database,
  Globe,
  House,
  KeyRound,
  Layout,
  LayoutDashboard,
  LayoutGrid,
  MonitorSmartphone,
  Network,
  Terminal,
  Workflow,
  PenTool,
  Rocket,
  Send,
  Server,
  ShoppingCart,
  Smartphone,
  User,
} from "lucide-react";

/**
 * Icons referenced by name from content files. An explicit map keeps the
 * bundle to these few — `import * as icons` pulled the whole set (over
 * half a megabyte) into the first load.
 */
const iconMap: Record<string, LucideIcon> = {
  Workflow,
  Terminal,
  Network,
  KeyRound,
  Bot,
  Boxes,
  Briefcase,
  ChartNoAxesColumn,
  CircleEllipsis,
  Cloud,
  Code,
  CreditCard,
  Database,
  Globe,
  House,
  Layout,
  LayoutDashboard,
  LayoutGrid,
  MonitorSmartphone,
  PenTool,
  Rocket,
  Send,
  Server,
  ShoppingCart,
  Smartphone,
  User,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Code;
}
