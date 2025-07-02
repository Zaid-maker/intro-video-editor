import {
  Bell, Plus, UserCircle, Blocks,
  PanelLeft,
  Mail,
  Power,
  BookOpen,
  Settings,
  Chrome,
  Headset,
} from 'lucide-react';

export const Icons = {
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