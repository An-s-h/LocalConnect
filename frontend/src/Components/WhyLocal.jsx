import { Heart, Users, Wallet, Sprout } from "lucide-react";

const reasons = [
  {
    icon: Heart,
    title: "Support Your Community",
    description: "Every purchase from a local business directly supports your neighborhood's growth and prosperity.",
  },
  {
    icon: Users,
    title: "Build Connections",
    description: "Create meaningful relationships with business owners and fellow community members.",
  },
  {
    icon: Wallet,
    title: "Boost Local Economy",
    description: "Local businesses reinvest 60% more of their revenue back into the local economy.",
  },
  {
    icon: Sprout,
    title: "Environmental Impact",
    description: "Shopping locally reduces transportation needs and supports sustainable practices.",
  },
];

export default function WhyLocal() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
            Why Choose Local?
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group relative text-center bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-teal-300/20 hover:border-teal-300/40 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative mb-6">
                <div className="bg-gradient-to-br from-teal-400 to-teal-600 p-4 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-teal-100 group-hover:text-white transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-teal-200/90 group-hover:text-teal-100 transition-colors duration-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 grid md:grid-cols-3 gap-6 text-center bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-teal-300/20">
          <div className="p-4">
            <div className="text-3xl font-bold text-teal-400 mb-2">73%</div>
            <div className="text-sm text-teal-200">Community Satisfaction Increase</div>
          </div>
          <div className="p-4 border-x border-teal-300/20">
            <div className="text-3xl font-bold text-teal-400 mb-2">2.5x</div>
            <div className="text-sm text-teal-200">More Local Jobs Created</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-teal-400 mb-2">40%</div>
            <div className="text-sm text-teal-200">Reduced Carbon Footprint</div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="group relative bg-gradient-to-r from-teal-400 to-teal-600 text-white font-bold py-4 px-10 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-teal-500/30">
            <span className="relative z-10">Join the Movement</span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}