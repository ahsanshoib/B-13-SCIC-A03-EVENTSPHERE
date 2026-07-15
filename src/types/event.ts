export interface EventItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  price: number;
  date: string;
  rating: number;
  location: string;
  category: string;
  imageUrl: string;
  priority?: "low" | "medium" | "high";
  createdBy?: string;
}

export const staticEventsData: EventItem[] = [
  {
    id: "1",
    title: "Dhaka Tech Summit 2026",
    shortDescription: "A massive gathering of software engineers and tech innovators in the capital.",
    fullDescription:
      "The Dhaka Tech Summit brings together the brightest minds in Bangladesh's growing tech ecosystem. Expect keynote talks on AI, cloud infrastructure, and startup growth, alongside hands-on workshops and networking sessions with leading engineers and founders.",
    price: 1500,
    date: "2026-08-15",
    rating: 4.8,
    location: "Dhaka",
    category: "Technology",
    imageUrl: "/event-1.jpg",
    priority: "high",
  },
  {
    id: "2",
    title: "Chittagong Beach Marathon",
    shortDescription: "An exhilarating marathon along the scenic shores of Patenga beach.",
    fullDescription:
      "Runners of all levels are invited to take on this coastal marathon route along Patenga beach. With categories for 5K, 10K, and full marathon distances, the event includes hydration stations, medical support, and a post-race beach festival.",
    price: 800,
    date: "2026-08-20",
    rating: 4.6,
    location: "Chittagong",
    category: "Sports",
    imageUrl: "/event-2.jpg",
    priority: "medium",
  },
  {
    id: "3",
    title: "Sylhet Tea Garden Fest",
    shortDescription: "Experience cultural performances and local tea tasting in the green valleys.",
    fullDescription:
      "Set amid the rolling hills of Sylhet's tea estates, this festival features folk music, dance performances, and guided tastings from some of the region's finest tea gardens.",
    price: 1200,
    date: "2026-09-05",
    rating: 4.9,
    location: "Sylhet",
    category: "Culture",
    imageUrl: "/event-3.jpg",
    priority: "high",
  },
  {
    id: "4",
    title: "Rajshahi Silk & Heritage Fair",
    shortDescription: "Explore the rich historical crafts and traditional Jamdani/Silk displays.",
    fullDescription:
      "A celebration of Rajshahi's centuries-old silk and Jamdani weaving traditions, with live demonstrations, artisan stalls, and heritage exhibits tracing the craft's history.",
    price: 500,
    date: "2026-09-12",
    rating: 4.5,
    location: "Rajshahi",
    category: "Exhibition",
    imageUrl: "/event-4.jpg",
    priority: "low",
  },
  {
    id: "5",
    title: "Cox's Bazar Sunset Music Night",
    shortDescription: "A soothing acoustic live music concert right on the world's longest sea beach.",
    fullDescription:
      "Watch the sun set over the world's longest natural sea beach while local and touring acoustic artists perform. Food trucks and beachside seating make this a relaxed evening event.",
    price: 2000,
    date: "2026-09-25",
    rating: 4.9,
    location: "Cox's Bazar",
    category: "Music",
    imageUrl: "/event-5.jpg",
    priority: "high",
  },
  {
    id: "6",
    title: "Khulna Sundarbans Photography Meet",
    shortDescription: "A guided photo walk near the edge of the majestic mangrove forest.",
    fullDescription:
      "Join fellow photography enthusiasts on a guided walk along the edge of the Sundarbans mangrove forest, with expert tips on wildlife and landscape photography techniques.",
    price: 1800,
    date: "2026-10-02",
    rating: 4.7,
    location: "Khulna",
    category: "Photography",
    imageUrl: "/event-6.jpg",
    priority: "medium",
  },
  {
    id: "7",
    title: "Barisal Floating Market Expo",
    shortDescription: "Discover the unique backwater lifestyle and local agricultural trade.",
    fullDescription:
      "Explore Barisal's iconic floating markets by boat, meeting local farmers and traders while learning about the region's distinctive riverine agricultural economy.",
    price: 600,
    date: "2026-10-10",
    rating: 4.4,
    location: "Barisal",
    category: "Tourism",
    imageUrl: "/event-7.jpg",
    priority: "low",
  },
  {
    id: "8",
    title: "Rangpur Agro Tech Workshop",
    shortDescription: "Modern farming solutions and sustainable agriculture discussions.",
    fullDescription:
      "Agricultural experts and local farmers gather to discuss sustainable farming techniques, modern irrigation solutions, and tech-driven crop management strategies.",
    price: 400,
    date: "2026-10-18",
    rating: 4.3,
    location: "Rangpur",
    category: "Workshop",
    imageUrl: "/event-8.jpg",
    priority: "low",
  },
  {
    id: "9",
    title: "Mymensingh Art & Literature Meet",
    shortDescription: "Poetry recitation, painting exhibitions, and book launches by local artists.",
    fullDescription:
      "A gathering for the region's creative community, featuring poetry readings, a curated painting exhibition, and new book launches from emerging local authors.",
    price: 300,
    date: "2026-10-28",
    rating: 4.6,
    location: "Mymensingh",
    category: "Art",
    imageUrl: "/event-9.jpg",
    priority: "medium",
  },
  {
    id: "10",
    title: "Comilla Food & Culinary Carnival",
    shortDescription: "Taste authentic traditional sweets (Rasmalai) and local street delicacies.",
    fullDescription:
      "Comilla's famous Rasmalai takes center stage at this culinary carnival, alongside a wide spread of street food, cooking demonstrations, and regional delicacies.",
    price: 700,
    date: "2026-11-04",
    rating: 4.8,
    location: "Comilla",
    category: "Food",
    imageUrl: "/event-10.jpg",
    priority: "medium",
  },
  {
    id: "11",
    title: "Gazipur Eco Camping & Bonfire",
    shortDescription: "A weekend outdoor camping experience near the national park woods.",
    fullDescription:
      "Escape the city for a weekend of eco-camping near Gazipur's national park, complete with guided nature walks, bonfire nights, and sustainable outdoor living workshops.",
    price: 2500,
    date: "2026-11-15",
    rating: 4.7,
    location: "Gazipur",
    category: "Adventure",
    imageUrl: "/event-11.jpg",
    priority: "high",
  },
  {
    id: "12",
    title: "Narshingdi Handloom Weaving Tour",
    shortDescription: "Witness local artisans crafting legendary textiles and fabrics live.",
    fullDescription:
      "Tour the workshops of Narshingdi's master weavers, watching traditional handloom techniques passed down through generations produce some of the region's finest fabrics.",
    price: 900,
    date: "2026-11-22",
    rating: 4.5,
    location: "Narshingdi",
    category: "Crafts",
    imageUrl: "/event-12.jpg",
    priority: "low",
  },
];

export const eventCategories = Array.from(
  new Set(staticEventsData.map((e) => e.category))
);

export const eventLocations = Array.from(
  new Set(staticEventsData.map((e) => e.location))
);