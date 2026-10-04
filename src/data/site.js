export const SITE = {
  name: "Sew What Alterations",
  owner: "Rhonda Foltz",
  role: "Owner/Manager",
  since: 1996,
  email: "Harmonyranch@gmail.com",
  phones: [
    { label: "360-563-0350", href: "tel:+13605630350" },
    { label: "425-312-9663", href: "tel:+14253129663" },
  ],
  address: ["7916 Riverview Road", "Snohomish, WA 98290"],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=7916+Riverview+Road+Snohomish+WA+98290",
  mapEmbed: "https://www.google.com/maps?q=7916+Riverview+Road,+Snohomish,+WA+98290&output=embed",
};

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/contact", label: "Contact Us" },
];

export const HOURS = [
  { day: "Monday – Friday", time: "10:00 AM to 6:00 PM", days: [1, 2, 3, 4, 5] },
  { day: "Saturdays", time: "By Appointment", days: [6] },
];

export const SERVICES = [
  { title: "Bridesmaid & prom dresses", text: "Our specialty. Bring me that dress for your special occasion or school dance and I will give it that special fit.", tag: "Specialty", icon: "dress" },
  { title: "Jean & slack hems", text: "Clean hems that keep the original look. Same day service on jeans: in by 11 AM, out by 5 PM.", tag: "Same day", icon: "hem" },
  { title: "Alterations of all kinds", text: "Taking in, letting out, tapering and adjusting, so your clothes fit the way they should.", icon: "scissors" },
  { title: "Drapery alterations", text: "Drapes hemmed, shortened and repaired to hang just right in your space.", icon: "drape" },
  { title: "Custom pillows & cushions", text: "New pillows, recovered sofa cushions and table runners made to your measurements.", icon: "pillow" },
  { title: "Uniform patches & badges", text: "Patches and badges applied neatly and securely to uniforms, jackets and more.", icon: "badge" },
  { title: "Item repairs", text: "Rips, seams, zippers and buttons, mended so your favorites are back in rotation.", icon: "needle" },
  { title: "Costumes & specialty", text: "Halloween costumes and one-of-a-kind projects. Have something unusual? Just ask.", icon: "spool" },
];

/* Services page list, as written on the original site. */
export const MY_SERVICES = [
  { title: "Hemming jeans or slacks", icon: "hem" },
  { title: "Alterations of all kinds", icon: "scissors" },
  { title: "Prom dresses, special occasion dresses and gowns", icon: "dress" },
  { title: "Attaching buttons, badges or decorative elements", icon: "badge" },
  { title: "Miscellaneous general repair items", icon: "needle" },
];

export const ALSO =SERVICES.filter((s) =>
  ["Drapery alterations", "Custom pillows & cushions", "Item repairs", "Uniform patches & badges"].includes(s.title)
);

export const STEPS = [
  { title: "Bring it in or call", text: "Stop by the shop on Riverview Road or call to describe what you need." },
  { title: "Free estimate & fitting", text: "Rhonda pins, measures and quotes your price. No obligation." },
  { title: "Pick up a perfect fit", text: "Your piece is ready before you know it. Jean hems, the same day." },
];

export const AREAS = ["Snohomish", "Lake Stevens", "Monroe", "Marysville", "Everett", "Woodinville"];

