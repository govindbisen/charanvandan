import { useEffect, useMemo, useRef, useState } from "react";

import gau from "./assets/Gau.jpeg";
import food from "./assets/food.png";
import donate from "./assets/donate.png";

type FormDataType = {
  fullname: string;
  email: string;
  message: string;
};

export default function App() {
  /* =========================
      STATES
  ========================= */

  const [activeImage, setActiveImage] = useState<number>(0);

  const [navActive, setNavActive] = useState<boolean>(false);

  const [stats, setStats] = useState({
    people: 0,
    volunteers: 0,
    drives: 0,
  });

  const [formData, setFormData] = useState<FormDataType>({
    fullname: "",
    email: "",
    message: "",
  });

  const impactRef = useRef<HTMLElement | null>(null);

  /* =========================
      DATA
  ========================= */

  const heroImages = useMemo(() => {
    return [gau, food, donate];
  }, []);

  const navLinks = useMemo(() => {
    return [
      {
        label: "About",
        path: "#about",
      },

      {
        label: "Campaigns",
        path: "#campaigns",
      },

      {
        label: "Impact",
        path: "#impact",
      },

      {
        label: "Contact",
        path: "#contact",
      },
    ];
  }, []);

  const campaigns = useMemo(() => {
    return [
      {
        id: 1,
        title: "Cow Protection Mission",
        desc: "Helping gaushalas and promoting cow welfare through social contribution.",
        image: gau,
      },

      {
        id: 2,
        title: "Food Distribution",
        desc: "Providing meals to underprivileged families and people in need.",
        image: food,
      },

      {
        id: 3,
        title: "Donation & Support",
        desc: "Creating spiritual and social impact through meaningful donations.",
        image: donate,
      },
    ];
  }, []);

  /* =========================
      HERO SLIDER
  ========================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages]);

  /* =========================
      COUNTER EFFECT
  ========================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let people = 0;
          let volunteers = 0;
          let drives = 0;

          const interval = setInterval(() => {
            people += 200;
            volunteers += 3;
            drives += 1;

            setStats({
              people: people > 10000 ? 10000 : people,
              volunteers: volunteers > 150 ? 150 : volunteers,
              drives: drives > 50 ? 50 : drives,
            });

            if (
              people >= 10000 &&
              volunteers >= 150 &&
              drives >= 50
            ) {
              clearInterval(interval);
            }
          }, 30);
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (impactRef.current) {
      observer.observe(impactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* =========================
      FORM HANDLERS
  ========================= */

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("Message Submitted Successfully 🚀");

    setFormData({
      fullname: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="bg-[#faf7f2] overflow-hidden text-gray-800 scroll-smooth">
      {/* ================= NAVBAR ================= */}

      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-3xl font-black text-orange-600 tracking-wide">
            CharanVandan
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10 font-semibold">
            {navLinks.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="hover:text-orange-600 transition duration-300"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu */}
          <button
            onClick={() => setNavActive(!navActive)}
            className="md:hidden text-3xl"
          >
            ☰
          </button>

          {/* CTA */}
          <button className="hidden md:block bg-orange-600 text-white px-7 py-3 rounded-full font-bold hover:scale-105 transition duration-300 shadow-xl">
            Donate Now
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden bg-white overflow-hidden transition-all duration-500 ${navActive ? "max-h-96 py-6" : "max-h-0"
            }`}
        >
          <div className="flex flex-col gap-5 px-6">
            {navLinks.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="font-semibold text-lg"
              >
                {item.label}
              </a>
            ))}

            <button className="bg-orange-600 text-white py-3 rounded-full font-bold">
              Donate Now
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="relative min-h-screen flex items-center pt-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-white to-orange-50"></div>

        {/* Blur */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-300/30 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-72 h-72 bg-yellow-200/30 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <p className="uppercase tracking-[5px] text-orange-500 font-bold mb-5">
              Spiritual • Humanity • Social Impact
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-tight text-gray-900">
              Together We
              <span className="text-orange-600"> Create Impact</span>
            </h1>

            <p className="mt-8 text-lg leading-8 text-gray-600 max-w-xl">
              Inspired by spirituality and compassion, we work towards food
              support, cow protection, and community welfare to build a more
              meaningful society.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
              <button className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition duration-300">
                Join Mission
              </button>

              <button className="border border-gray-300 px-8 py-4 rounded-full font-bold hover:bg-white transition">
                Explore More
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="relative h-[650px] flex items-center justify-center">
            {/* Main Image */}
            <div className="relative w-[350px] h-[500px] rounded-[45px] overflow-hidden shadow-2xl z-10">
              {heroImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="hero"
                  className={`absolute inset-0 w-full h-full object-cover transition-all ease-in-out duration-[3000ms] ${activeImage === index
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                    }`}
                />
              ))}
            </div>

            {/* Floating Card */}
            <div className="absolute top-10 left-0 bg-white shadow-2xl rounded-3xl px-6 py-5">
              <h3 className="text-4xl font-black text-orange-600">
                10K+
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                People Supported
              </p>
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-16 right-0 bg-white shadow-2xl rounded-3xl px-6 py-5">
              <h3 className="text-4xl font-black text-orange-600">
                150+
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Volunteers
              </p>
            </div>

            {/* Dots */}
            <div className="absolute -bottom-10 flex gap-4">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`h-4 rounded-full transition-all duration-300 ${activeImage === index
                    ? "bg-orange-600 w-10"
                    : "bg-orange-200 w-4"
                    }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section
        id="about"
        className="py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src={gau}
              alt="about"
              className="rounded-[40px] shadow-2xl h-[550px] w-full object-cover"
            />
          </div>

          <div>
            <p className="uppercase tracking-[5px] text-orange-500 font-bold mb-5">
              About Mission
            </p>

            <h2 className="text-5xl font-black leading-tight text-gray-900">
              Serving Humanity Through Compassion
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">
              We combine spiritual values with modern community initiatives to
              empower society and support meaningful causes through service and
              unity.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CAMPAIGNS ================= */}

      <section
        id="campaigns"
        className="py-28 bg-[#fff8f2]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="uppercase tracking-[5px] text-orange-500 font-bold mb-5">
              Campaigns
            </p>

            <h2 className="text-5xl font-black text-gray-900">
              Our Initiatives
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mt-20">
            {campaigns.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[35px] overflow-hidden shadow-xl hover:-translate-y-3 transition duration-500"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-72 w-full object-cover"
                />

                <div className="p-8">
                  <h3 className="text-2xl font-black mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-8">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}

      <section
        id="impact"
        ref={impactRef}
        className="py-28 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-orange-50 rounded-[40px] p-10 text-center shadow-lg">
              <h3 className="text-6xl font-black text-orange-600">
                {stats.people}+
              </h3>

              <p className="mt-4 text-lg text-gray-600">
                Lives Impacted
              </p>
            </div>

            <div className="bg-orange-50 rounded-[40px] p-10 text-center shadow-lg">
              <h3 className="text-6xl font-black text-orange-600">
                {stats.volunteers}+
              </h3>

              <p className="mt-4 text-lg text-gray-600">
                Volunteers
              </p>
            </div>

            <div className="bg-orange-50 rounded-[40px] p-10 text-center shadow-lg">
              <h3 className="text-6xl font-black text-orange-600">
                {stats.drives}+
              </h3>

              <p className="mt-4 text-lg text-gray-600">
                Campaigns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <section
        id="contact"
        className="py-28 bg-[#fff8f2]"
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-[45px] p-10 md:p-16 shadow-2xl">
            <div className="text-center">
              <p className="uppercase tracking-[5px] text-orange-500 font-bold mb-5">
                Contact Us
              </p>

              <h2 className="text-5xl font-black text-gray-900">
                Become Part Of The Change
              </h2>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-14 grid gap-6"
            >
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInput}
                placeholder="Full Name"
                className="border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-orange-500"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInput}
                placeholder="Email Address"
                className="border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-orange-500"
              />

              <textarea
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleInput}
                placeholder="Your Message"
                className="border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-orange-500"
              ></textarea>

              <button className="bg-orange-600 text-white py-4 rounded-2xl font-bold hover:scale-[1.01] transition duration-300 shadow-xl">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}