const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "Full Kitchen Remodel",
          category: "KITCHEN",
          beforeImage: "/images/kitchen-before.jpg",
          afterImage: "/images/kitchen-after.jpg",
          description:
            "A dated 1970s galley kitchen opened up into a bright, marble-island kitchen built for a family that actually cooks together.",
          location: "West Knoxville, TN",
          featured: true,
          sortOrder: 1,
        },
        {
          title: "Primary Bathroom Remodel",
          category: "BATHROOM",
          beforeImage: "/images/bath-before.jpg",
          afterImage: "/images/bath-after.jpg",
          description:
            "A cramped, dated blue-tile bathroom transformed into a modern walk-in-shower primary bath with heated floors.",
          location: "Farragut, TN",
          featured: true,
          sortOrder: 2,
        },
      ],
    });
    console.log("Seeded 2 projects.");
  } else {
    console.log("Projects already exist, skipping.");
  }

  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          name: "Renee H.",
          location: "Farragut, TN",
          quote:
            "Marcus and his crew gutted our 1970s kitchen and gave us back a room we actually want to cook in. On budget, on time, zero drama.",
          rating: 5,
          sortOrder: 1,
        },
        {
          name: "David P.",
          location: "West Knoxville",
          quote:
            "The bathroom remodel was done in five weeks flat. Communication the entire way through — no surprises on the invoice either.",
          rating: 5,
          sortOrder: 2,
        },
        {
          name: "Ana & Chris T.",
          location: "Knoxville, TN",
          quote:
            "We interviewed four contractors. Fieldstone was the only one who showed up with an actual design plan instead of a ballpark guess.",
          rating: 5,
          sortOrder: 3,
        },
      ],
    });
    console.log("Seeded 3 testimonials.");
  } else {
    console.log("Testimonials already exist, skipping.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
