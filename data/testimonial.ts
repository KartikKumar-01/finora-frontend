export interface Testimonial {
  name: string;
  role: string;
  image: string;
  rating: number;
  testimonial: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    testimonial:
      "Finora completely changed how I manage my finances. The AI insights helped me identify unnecessary expenses and save more every month.",
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    testimonial:
      "The receipt scanner is incredibly accurate. What used to take me hours each month now takes just a few minutes.",
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    testimonial:
      "Managing multiple accounts has never been easier. Finora gives me a complete picture of my finances in one place.",
  },
  {
    name: "David Wilson",
    role: "Marketing Manager",
    image: "https://i.pravatar.cc/150?img=8",
    rating: 4,
    testimonial:
      "The budgeting recommendations are surprisingly useful. I've stayed within my monthly budget for the first time in years.",
  },
  {
    name: "Priya Sharma",
    role: "Financial Consultant",
    image: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    testimonial:
      "The analytics dashboard provides deep insights into spending habits. It's like having a personal financial advisor.",
  },
  {
    name: "James Anderson",
    role: "Entrepreneur",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    testimonial:
      "The multi-currency support is perfect for my international business. Tracking expenses across currencies is seamless.",
  },
];