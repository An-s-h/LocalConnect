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
    <section className="relative py-16 bg-gray-50 text-gray-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
      <div className="absolute -right-20 -top-20 w-96 h-96 bg-gray-200/20 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-gray-300/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-gray-700 to-black bg-clip-text text-transparent">
            Why Choose Local?
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group relative text-center bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-md"
            >
              <div className="relative mb-6">
                <div className="bg-gray-900 p-3 w-12 h-12 mx-auto rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <reason.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center bg-white p-6 rounded-xl border border-gray-200">
          <div className="p-4">
            <div className="text-3xl font-bold text-gray-900 mb-2">73%</div>
            <div className="text-sm text-gray-600">Community Satisfaction Increase</div>
          </div>
          <div className="p-4 border-x border-gray-200">
            <div className="text-3xl font-bold text-gray-900 mb-2">2.5x</div>
            <div className="text-sm text-gray-600">More Local Jobs Created</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-gray-900 mb-2">40%</div>
            <div className="text-sm text-gray-600">Reduced Carbon Footprint</div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="group relative bg-gray-900 text-white font-bold py-3 px-8 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
            <span className="relative z-10">Join the Movement</span>
            <div className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}