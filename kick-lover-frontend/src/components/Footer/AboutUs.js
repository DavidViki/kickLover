// About.js
import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "David Damjanovic",
      role: "Founder & CEO",
      bio: "David has a passion for sneakers and a vision to make high-quality footwear accessible to everyone. With a background in design and business, he leads Kick Lover with dedication and innovation.",
      photoUrl: "https://i.redd.it/mrwiygwk08ab1.jpg",
    },
    {
      name: "Albert Hofmann",
      role: "Lead Product Designer",
      bio: "Albert brings creativity and a unique perspective to the design team. With years of experience, he ensures every product is a blend of style and functionality.",
      photoUrl:
        "https://static01.nyt.com/images/2008/04/30/world/hoffman02450.jpg?quality=75&auto=webp&disable=upscale",
    },
    {
      name: "Sigmund Freud",
      role: "Head of Marketing",
      bio: "Sigmund crafts marketing strategies that connect with customers. His background in psychology helps in creating engaging campaigns that resonate with our community.",
      photoUrl:
        "https://www.danas.rs/wp-content/uploads/2020/09/Sigmund_Freud_1926-e1600795286513.jpg",
    },
    {
      name: "Dalai Lama",
      role: "Customer Relations Specialist",
      bio: "Dalai is dedicated to ensuring customer satisfaction and building lasting relationships. His calm demeanor and empathy make him an invaluable asset to the team.",
      photoUrl:
        "https://1.bp.blogspot.com/-2Lac0tiMCS0/YaK8SvnBkuI/AAAAAAAAhIU/C0dWcXUNdB4iR-6tRDx8k3mR7cItnJLMACLcBGAsYHQ/s1240/young-dalai-lama%2B%2B%25281%2529a.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

        <section className="text-center mb-16">
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            Welcome to{" "}
            <span className="font-semibold text-blue-500">Kick Lover</span> –
            where passion for sneakers meets quality and style! Founded by
            sneaker enthusiasts, Kick Lover is dedicated to bringing you the
            latest and greatest in footwear trends from top brands like Nike,
            Adidas, Puma, and more. We believe that a great pair of sneakers
            does more than just complete an outfit; it tells a story, expresses
            personality, and inspires movement.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Company Mission */}
          <motion.div
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p>
              To be the premier destination for sneaker lovers worldwide,
              delivering quality products and outstanding service. We strive to
              provide not only the best in footwear but also a community for all
              who share a love for sneakers.
            </p>
          </motion.div>

          {/* Our Values */}
          <motion.div
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold mb-3">Our Values</h2>
            <p>
              Integrity, authenticity, and passion drive everything we do. We
              aim to create a space where every sneaker enthusiast feels valued
              and where each product is carefully selected to meet our high
              standards of style and durability.
            </p>
          </motion.div>

          {/* Our Vision */}
          <motion.div
            className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p>
              To foster a global sneaker culture that celebrates diversity,
              innovation, and sustainability. We see a world where every
              individual can express themselves through footwear that makes them
              feel confident and inspired.
            </p>
          </motion.div>
        </section>

        <section className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>

          {/* Team Photo */}
          <div className="mb-12">
            <img
              src="https://i.redd.it/xs6n2czhun491.jpg"
              alt="Our Team"
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>

          <p className="text-lg max-w-2xl mx-auto mb-8">
            Our team is made up of dedicated sneaker lovers who are here to help
            you find your perfect pair. Each team member brings unique expertise
            and a shared commitment to making Kick Lover a trusted name in the
            sneaker community.
          </p>

          {/* Individual Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="w-64 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {member.role}
                </p>
                <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed">
            At Kick Lover, we believe in building a community of sneaker lovers
            who support each other. Follow us on social media and sign up for
            our newsletter to stay updated on new releases, exclusive events,
            and special offers.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
