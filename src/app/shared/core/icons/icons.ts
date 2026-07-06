import {
  Search,
  User,
  Users,
  House,
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  Menu,
  Bell,
  Settings,
  Building2,
  Calendar,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  X
} from 'lucide-angular';

export const LV_ICONS = {
  home: House,
  user: User,
  users: Users,
  plus: Plus,
  search: Search,
  edit: Pencil,
  delete: Trash2,
  eye: Eye,
  eyeOff: EyeOff,
  menu: Menu,
  bell: Bell,
  settings: Settings,
  company: Building2,
  calendar: Calendar,
  filter: Filter,
  check: CircleCheck,
  close: X,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  spinner: X
} as const;

export type IconKeys = keyof typeof LV_ICONS;
export type IconComponent = typeof LV_ICONS[IconKeys];

