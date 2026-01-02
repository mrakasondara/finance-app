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
  {
    id: "income-salary",
    name: "Salary",
    icon: Briefcase,
  },
  {
    id: "income-bonus",
    name: "Bonus",
    icon: Gift,
  },
  {
    id: "income-business-freelance",
    name: "Business / Freelance",
    icon: Wallet,
  },

  {
    id: "expense-food-drinks",
    name: "Food & Drinks",
    icon: Utensils,
  },
  {
    id: "expense-shopping",
    name: "Shopping",
    icon: ShoppingCart,
  },
  {
    id: "expense-transportation",
    name: "Transportation",
    icon: Bus,
  },
  {
    id: "expense-housing",
    name: "Housing",
    icon: Home,
  },
  {
    id: "expense-electricity",
    name: "Electricity",
    icon: Lightbulb,
  },
  {
    id: "expense-internet",
    name: "Internet",
    icon: Wifi,
  },
  {
    id: "expense-healthcare",
    name: "Healthcare",
    icon: HeartPulse,
  },
  {
    id: "expense-education",
    name: "Education",
    icon: GraduationCap,
  },
  {
    id: "expense-entertainment",
    name: "Entertainment",
    icon: Film,
  },
  {
    id: "expense-clothing",
    name: "Clothing",
    icon: Shirt,
  },
  {
    id: "expense-mobile-data",
    name: "Mobile & Data",
    icon: Smartphone,
  },

  {
    id: "financial-savings",
    name: "Savings",
    icon: PiggyBank,
  },
  {
    id: "financial-loan-credit",
    name: "Loan / Credit",
    icon: CreditCard,
  },
  {
    id: "financial-investment",
    name: "Investment",
    icon: TrendingUp,
  },
];
