import {
  Zap, Shield, BarChart3, Puzzle, Users, Globe, Sparkles, Rocket,
  Target, Heart, Star, Clock, Code, Layout, Palette, Download,
  Lock, Eye, MessageSquare, TrendingUp, Layers, Settings, Mail,
  Phone, CheckCircle, ArrowRight, Play, FileText, Database, Cloud,
  Cpu, Wifi, Monitor, Smartphone, Headphones, Award, Gift, Lightbulb,
  Compass, Feather, Flame, Gem, BookOpen, Camera, Mic, Video,
  Music, Map, Search, Bell, Calendar, PenTool, Briefcase, Coffee,
  type LucideIcon,
} from 'lucide-react';

/**
 * Maps icon name strings (from AI output) to Lucide React components.
 * AI is instructed to use these icon names in generated section content.
 */
export const ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Shield,
  BarChart3,
  Puzzle,
  Users,
  Globe,
  Sparkles,
  Rocket,
  Target,
  Heart,
  Star,
  Clock,
  Code,
  Layout,
  Palette,
  Download,
  Lock,
  Eye,
  MessageSquare,
  TrendingUp,
  Layers,
  Settings,
  Mail,
  Phone,
  CheckCircle,
  ArrowRight,
  Play,
  FileText,
  Database,
  Cloud,
  Cpu,
  Wifi,
  Monitor,
  Smartphone,
  Headphones,
  Award,
  Gift,
  Lightbulb,
  Compass,
  Feather,
  Flame,
  Gem,
  BookOpen,
  Camera,
  Mic,
  Video,
  Music,
  Map,
  Search,
  Bell,
  Calendar,
  PenTool,
  Briefcase,
  Coffee,
};

/**
 * Get a Lucide icon component by name. Falls back to Sparkles if not found.
 */
export function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Sparkles;
}
