import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, BarChart2 } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Empower Your Developer Lifestyle!</h1>
          <p className="text-xl mb-8">Track your health, improve your well-being, and boost your productivity with personalized wellness tools designed for developers.</p>
          <Link to="/signup" className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-100 transition duration-300">Get Started</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Healthy Dev Life?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="w-12 h-12 text-blue-500" />}
              title="Track Your Progress"
              description="Monitor your workouts, habits, and health metrics in one place."
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-blue-500" />}
              title="Join a Community"
              description="Connect with like-minded developers on their wellness journey."
            />
            <FeatureCard
              icon={<BarChart2 className="w-12 h-12 text-blue-500" />}
              title="Data-Driven Insights"
              description="Get personalized recommendations based on your progress."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
            <Step number={1} title="Sign Up" description="Create your account in seconds" />
            <Step number={2} title="Track Your Wellness" description="Log your activities and habits daily" />
            <Step number={3} title="View Progress" description="See your improvements over time" />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <blockquote className="text-xl italic mb-4">
            "I feel healthier, more focused, and more productive since using this app!"
          </blockquote>
          <p className="font-bold">- Sarah, Full Stack Developer</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Dev Life?</h2>
          <Link to="/signup" className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-100 transition duration-300">
            Join the Revolution
            <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="text-center">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

const Step: React.FC<{ number: number; title: string; description: string }> = ({ number, title, description }) => (
  <div className="text-center">
    <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">{number}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
);

export default LandingPage;