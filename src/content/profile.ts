/**
 * Single source of truth for personal contact details, so a change to the
 * email or a new profile link only has to happen in one place.
 */
export const profile = {
  name: "Ahmad Hidayatullah",
  email: "hidayatahmadd1377@gmail.com",
  phone: "+62 877-1896-9089",
  phoneRaw: "+6287718969089",
  whatsappUrl: "https://wa.me/6287718969089",
  githubUrl: "https://github.com/Medskiyyy",
  githubHandle: "github.com/Medskiyyy",
  resumeUrl: "/resume.pdf",
  gpa: "3.88 / 4.00",
  educationPeriod: "2025 - Present (Expected 2029)",

  /**
   * A real photograph, or null. Deliberately null right now: the file that used
   * to sit here (`/profile.webp`, still in public/) is an illustrated avatar,
   * not a photo of Ahmad. A generic avatar gives a visitor none of the trust a
   * real face does, and publishing it as this person's `image` in the
   * schema.org Person markup would be a straightforward misrepresentation.
   * Set this to the path of a real photo and it reappears everywhere.
   */
  photoUrl: null as string | null,

  city: "Bekasi",
  region: "West Java",
  country: "ID",
  /** IANA zone for Bekasi — WIB, UTC+7. */
  timeZone: "Asia/Jakarta",

  /**
   * Profiles to publish as schema.org `sameAs`. Add the LinkedIn URL here once
   * the profile exists and it flows into the JSON-LD and the contact page.
   */
  socialUrls: ["https://github.com/Medskiyyy"] as string[],
} as const;
