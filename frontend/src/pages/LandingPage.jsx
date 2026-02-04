import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Frame, 
  Palette, 
  Upload, 
  Gift, 
  Mail, 
  ArrowRight, 
  MapPin,
  Sparkles,
  Check,
  Star,
  Truck,
  Shield
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Countdown Component
const CountdownTimer = () => {
  // Set launch date - April 5, 2026
  const launchDate = new Date('2026-04-05T00:00:00');
  
  const calculateTimeLeft = () => {
    const difference = launchDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
    
    // Calculate total hours (including days converted to hours)
    const totalHours = Math.floor(difference / (1000 * 60 * 60));
    
    return {
      hours: totalHours,
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" }
  ];

  return (
    <div className="flex justify-center gap-3 md:gap-6" data-testid="countdown-timer">
      {timeBlocks.map((block, index) => (
        <motion.div
          key={block.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-canvashaus-surface border border-canvashaus-border rounded-lg flex items-center justify-center overflow-hidden">
              <motion.span 
                key={block.value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-heading text-2xl md:text-3xl font-bold text-canvashaus-primary"
              >
                {String(block.value).padStart(2, '0')}
              </motion.span>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-canvashaus-primary/5 rounded-lg blur-xl -z-10" />
          </div>
          <span className="text-xs md:text-sm font-body text-canvashaus-text-muted mt-2 uppercase tracking-wider">
            {block.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

// Header Component
const Header = () => (
  <motion.header 
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-canvashaus-background/80 border-b border-white/5"
  >
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Frame className="w-6 h-6 text-canvashaus-primary" />
        <span className="font-heading text-xl font-semibold text-canvashaus-text-main tracking-tight">
          Canvas<span className="text-canvashaus-primary">Haus</span>
        </span>
      </div>
      <a 
        href="#waitlist" 
        data-testid="header-cta-btn"
        className="text-sm font-body font-medium text-canvashaus-primary hover:text-canvashaus-text-main transition-colors duration-300"
      >
        Get Early Access
      </a>
    </div>
  </motion.header>
);

// Hero Section
const HeroSection = () => (
  <section 
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
    data-testid="hero-section"
  >
    {/* Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url('https://images.unsplash.com/photo-1663811397219-c572550dffc5?auto=format&fit=crop&w=2000&q=80')`
      }}
    />
    {/* Dark Overlay */}
    <div className="absolute inset-0 hero-overlay" />
    
    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center pt-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-8"
      >
        {/* Badge */}
        <motion.div variants={fadeInUp} className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-canvashaus-surface border border-canvashaus-border">
            <Sparkles className="w-4 h-4 text-canvashaus-primary" />
            <span className="text-sm font-body text-canvashaus-text-muted">Launching Soon</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          variants={fadeInUp}
          className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold text-canvashaus-text-main leading-tight tracking-tight"
        >
          Your Memories, <span className="text-gold-gradient">Framed Forever</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p 
          variants={fadeInUp}
          className="font-body text-base md:text-lg text-canvashaus-text-muted max-w-2xl mx-auto leading-relaxed"
        >
          We're launching a premium custom canvas printing experience — where your favorite moments become stunning wall art.
        </motion.p>

        {/* Process Steps */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-4 md:gap-8 text-canvashaus-text-muted font-body text-sm md:text-base"
        >
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-canvashaus-primary/20 flex items-center justify-center text-canvashaus-primary text-xs">1</span>
            Upload your photo
          </span>
          <span className="hidden md:block text-canvashaus-border">→</span>
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-canvashaus-primary/20 flex items-center justify-center text-canvashaus-primary text-xs">2</span>
            We craft it on luxury canvas
          </span>
          <span className="hidden md:block text-canvashaus-border">→</span>
          <span className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-canvashaus-primary/20 flex items-center justify-center text-canvashaus-primary text-xs">3</span>
            Receive timeless beauty
          </span>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div variants={fadeInUp} className="pt-4">
          <p className="text-sm font-body text-canvashaus-text-muted mb-4 uppercase tracking-wider">
            Launching In
          </p>
          <CountdownTimer />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <Button 
            size="lg"
            data-testid="hero-notify-btn"
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-canvashaus-primary text-canvashaus-primary-foreground hover:bg-canvashaus-primary/90 font-body font-medium px-8 py-6 text-base gold-glow"
          >
            Notify Me When You Launch
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            data-testid="hero-early-access-btn"
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-canvashaus-border text-canvashaus-text-main hover:bg-canvashaus-surface hover:border-canvashaus-primary font-body font-medium px-8 py-6 text-base transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Get Early Access
          </Button>
        </motion.div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="w-6 h-10 rounded-full border-2 border-canvashaus-border flex items-start justify-center p-2"
      >
        <motion.div className="w-1 h-2 bg-canvashaus-primary rounded-full" />
      </motion.div>
    </motion.div>
  </section>
);

// Features data
const features = [
  {
    icon: Frame,
    title: "Professional-grade Canvas",
    description: "Premium quality cotton-poly blend canvas that brings your images to life with vivid colors and sharp details."
  },
  {
    icon: Palette,
    title: "Fade-resistant Archival Inks",
    description: "Museum-quality pigment inks that preserve your memories for generations without fading."
  },
  {
    icon: Shield,
    title: "Hand-stretched Wooden Frames",
    description: "Each canvas is carefully hand-stretched on kiln-dried, solid wood frames for lasting durability."
  },
  {
    icon: Star,
    title: "Gallery-level Finishing",
    description: "Professional finishing touches that give your canvas the refined look of gallery artwork."
  },
  {
    icon: Truck,
    title: "Delivered to Your Door",
    description: "Carefully packaged and shipped directly to you, ready to hang and admire."
  }
];

// What We Do Section
const WhatWeDoSection = () => (
  <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24" data-testid="what-we-do-section">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="space-y-16"
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-canvashaus-text-main tracking-tight">
            What We <span className="text-canvashaus-primary">Do</span>
          </h2>
          <p className="font-body text-base md:text-lg text-canvashaus-text-muted max-w-2xl mx-auto">
            We transform your personal images into high-end canvas prints using premium materials and expert craftsmanship.
          </p>
          <div className="gold-line w-24 mx-auto mt-6" />
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              className={`feature-card bg-canvashaus-surface p-8 rounded-xl ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
              data-testid={`feature-card-${index}`}
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg bg-canvashaus-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-canvashaus-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-canvashaus-text-main mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-canvashaus-text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story text */}
        <motion.p 
          variants={fadeInUp}
          className="text-center font-body text-lg text-canvashaus-text-muted max-w-3xl mx-auto italic"
        >
          Whether it's family, travel, love, or legacy — <span className="text-canvashaus-text-main">your story deserves to be displayed beautifully.</span>
        </motion.p>
      </motion.div>
    </div>
  </section>
);

// Benefits data
const benefits = [
  {
    icon: Star,
    title: "Premium Quality",
    description: "Every canvas is printed with precision and crafted to last for years."
  },
  {
    icon: Palette,
    title: "Fully Personalized",
    description: "Your photo. Your size. Your vibe."
  },
  {
    icon: Upload,
    title: "Effortless Ordering",
    description: "Upload → Customize → Relax. We handle the rest."
  },
  {
    icon: Gift,
    title: "Perfect for Gifting",
    description: "Birthdays, anniversaries, housewarmings — unforgettable gifts made easy."
  }
];

// Why You'll Love It Section
const WhyLoveItSection = () => (
  <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-canvashaus-surface" data-testid="why-love-section">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="space-y-16"
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center space-y-4">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-canvashaus-text-main tracking-tight">
            Why You'll <span className="text-canvashaus-primary">Love It</span>
          </h2>
          <div className="gold-line w-24 mx-auto mt-6" />
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex gap-6 items-start p-6 rounded-xl bg-canvashaus-background border border-canvashaus-border hover:border-canvashaus-primary transition-colors duration-300"
              data-testid={`benefit-card-${index}`}
            >
              <div className="w-14 h-14 rounded-xl bg-canvashaus-primary/10 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-7 h-7 text-canvashaus-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-semibold text-canvashaus-text-main mb-2">
                  {benefit.title}
                </h3>
                <p className="font-body text-canvashaus-text-muted">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// Waitlist Section
const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${API}/waitlist`, { email });
      toast.success("You're on the list! We'll notify you when we launch.");
      setEmail("");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.info("You're already on the waitlist!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      id="waitlist" 
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24"
      data-testid="waitlist-section"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center space-y-8"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-canvashaus-surface border border-canvashaus-primary/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-canvashaus-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-canvashaus-primary"></span>
              </span>
              <span className="text-sm font-body text-canvashaus-primary">We're Almost Live</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-canvashaus-text-main tracking-tight">
              Be the First to <span className="text-canvashaus-primary">Experience It</span>
            </h2>
            <p className="font-body text-base md:text-lg text-canvashaus-text-muted max-w-xl mx-auto">
              Early access. Exclusive launch offers. Limited-time discounts.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form 
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-canvashaus-text-muted" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="waitlist-email-input"
                className="pl-12 py-6 bg-canvashaus-surface border-canvashaus-border text-canvashaus-text-main placeholder:text-canvashaus-text-muted focus:border-canvashaus-primary focus:ring-canvashaus-primary/20 font-body"
              />
            </div>
            <Button 
              type="submit"
              disabled={isLoading}
              data-testid="waitlist-submit-btn"
              className="bg-canvashaus-primary text-canvashaus-primary-foreground hover:bg-canvashaus-primary/90 font-body font-medium px-8 py-6 gold-glow disabled:opacity-50"
            >
              {isLoading ? "Joining..." : "Notify Me"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.form>

          {/* Trust indicators */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-canvashaus-text-muted font-body"
          >
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-canvashaus-primary" />
              No spam, ever
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-canvashaus-primary" />
              Exclusive early discounts
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-canvashaus-primary" />
              First access to new features
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="py-16 px-6 md:px-12 lg:px-24 border-t border-canvashaus-border" data-testid="footer">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo & Tagline */}
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
            <Frame className="w-6 h-6 text-canvashaus-primary" />
            <span className="font-heading text-xl font-semibold text-canvashaus-text-main tracking-tight">
              Canvas<span className="text-canvashaus-primary">Haus</span>
            </span>
          </div>
          <p className="font-body text-sm text-canvashaus-text-muted">
            Crafted with care, printed with purpose.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-sm font-body text-canvashaus-text-muted">
          <a 
            href="mailto:Support@canvashaus.in" 
            data-testid="footer-email-link"
            className="flex items-center gap-2 hover:text-canvashaus-primary transition-colors"
          >
            <Mail className="w-4 h-4" />
            Support@canvashaus.in
          </a>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Bengaluru, India
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 pt-8 border-t border-canvashaus-border text-center space-y-2">
        <p className="font-body text-xs text-canvashaus-text-muted">
          © {new Date().getFullYear()} CanvasHaus. All rights reserved.
        </p>
        <p className="font-body text-xs text-canvashaus-text-muted/60">
          Designed by <span className="text-canvashaus-text-muted">TJ Williams</span>
        </p>
      </div>
    </div>
  </footer>
);

// Main Landing Page Component
const LandingPage = () => {
  return (
    <main className="min-h-screen bg-canvashaus-background">
      <Header />
      <HeroSection />
      <WhatWeDoSection />
      <WhyLoveItSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
