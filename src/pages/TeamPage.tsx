import ParticleBackground from "@/components/landing/ParticleBackground";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";
import teamOwner from "@/assets/team-owner.png";
import teamAdmin1 from "@/assets/team-admin1.png";
import teamAdmin2 from "@/assets/team-admin2.png";
import teamSupport1 from "@/assets/team-support1.png";

const team = [
  { name: "DarkKnight", role: "Owner", img: teamOwner },
  { name: "IronGuard", role: "System Administrator", img: teamAdmin1 },
  { name: "WolfByte", role: "Admin", img: teamAdmin2 },
  { name: "EnderVoid", role: "Admin", img: teamSupport1 },
  { name: "CraftMaster", role: "Head Support", img: teamOwner },
  { name: "VillagerPro", role: "Support", img: teamAdmin1 },
  { name: "NetherLord", role: "Support", img: teamSupport1 },
  { name: "StoneGolem", role: "Support", img: teamAdmin2 },
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="section-divider mb-12">
            <span className="text-primary text-xl">⚔</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-3xl md:text-5xl font-bold text-center mb-16"
          >
            Our Team
          </motion.h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name + i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass rounded-xl overflow-hidden neon-border transition-shadow hover:box-glow text-center"
              >
                <div className="bg-gradient-to-b from-primary/20 to-transparent p-6">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-40 h-40 object-cover mx-auto rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-sm font-bold">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
