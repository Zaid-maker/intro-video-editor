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
  Play, Zap, Download, Star, ArrowRight, ChevronDown, Video, Palette, MousePointer, Clock
} from 'lucide-react';

export const Icons = {
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
  PanelLeft,
  Blocks,
} as const;

export type IconName = keyof typeof Icons; 