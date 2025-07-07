import {
  Bell, Plus, UserCircle, Blocks,

  Mail,
  Power,
  BookOpen,
  Settings,
  Chrome,
  Headset,
  ArrowLeft,
  Play, Zap, Download, Star, ArrowRight, ChevronDown, Video, Palette, MousePointer, Clock,
  LogOut,
  PanelLeft,
  XIcon
} from 'lucide-react';

export const Icons = {
  LogOut,
  PanelLeft,
  XIcon,
  Play, Zap, Download, Star, ArrowRight, ChevronDown, Video, Palette, MousePointer, Clock,
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
  Blocks,
} as const;

export type IconName = keyof typeof Icons; 