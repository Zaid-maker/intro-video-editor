import {
  Bell, Plus, UserCircle, Blocks,
  PanelLeft,
  Mail,
  Power,
  BookOpen,
  Settings,
  Chrome,
  Headset,
  ArrowLeft,
} from 'lucide-react';

export const Icons = {
  ArrowLeft,
  UserCircle,
  Bell,
  Plus,
  Headset,
  Chrome,
  Settings,
  BookOpen,
  Mail,
  Power,
  PanelLeft,
  Blocks,
} as const;

export type IconName = keyof typeof Icons; 