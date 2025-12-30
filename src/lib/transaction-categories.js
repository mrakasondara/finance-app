import {
  Utensils,
  ShoppingCart,
  Bus,
  Home,
  Lightbulb,
  Wifi,
  HeartPulse,
  GraduationCap,
  Film,
  Shirt,
  Gift,
  Wallet,
  Briefcase,
  PiggyBank,
  CreditCard,
  TrendingUp,
  Smartphone,
} from "lucide-react";

export const transactionCategories = [
  //Income
  {
    name: "Salary",
    icon: Briefcase,
  },
  {
    name: "Bonus",
    icon: Gift,
  },
  {
    name: "Business / Freelance",
    icon: Wallet,
  },

  // Expenses
  {
    name: "Food & Drinks",
    icon: Utensils,
  },
  {
    name: "Shopping",
    icon: ShoppingCart,
  },
  {
    name: "Transportation",
    icon: Bus,
  },
  {
    name: "Housing",
    icon: Home,
  },
  {
    name: "Electricity",
    icon: Lightbulb,
  },
  {
    name: "Internet",
    icon: Wifi,
  },
  {
    name: "Healthcare",
    icon: HeartPulse,
  },
  {
    name: "Education",
    icon: GraduationCap,
  },
  {
    name: "Entertainment",
    icon: Film,
  },
  {
    name: "Clothing",
    icon: Shirt,
  },
  {
    name: "Mobile & Data",
    icon: Smartphone,
  },

  // Financial
  {
    name: "Savings",
    icon: PiggyBank,
  },
  {
    name: "Loan / Credit",
    icon: CreditCard,
  },
  {
    name: "Investment",
    icon: TrendingUp,
  },
];
