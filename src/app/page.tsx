import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-blue-600">Phases</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your empathetic AI companion for mental wellness. We're here to listen, 
            support, and help you navigate life's challenges in a safe, judgment-free space.
          </p>
          
          {/* Start Chat CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/chat"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg"
            >
              Start Conversation
            </Link>
            <Link 
              href="/register"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors"
            >
              Create Account
            </Link>
          </div>
        </section>

        {/* Features Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How We Support You
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                24/7 AI Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Always available when you need someone to talk to, with empathetic responses tailored to your emotions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Personal Growth
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track your mood, set goals, and access resources to support your mental wellness journey.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Safe & Private
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your conversations are confidential. Use anonymously or create an account for personalized support.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            What People Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "Phases helped me during a difficult time. Having someone to talk to anytime made a real difference."
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">- Sarah M.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                "The mood tracking feature helped me understand my patterns better. It's like having a gentle therapist."
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">- Ahmed K.</p>
            </div>
          </div>
        </section>

        {/* Quick Access */}
        <section className="text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Link 
              href="/resources" 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl mb-2 block">📚</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Resources</span>
            </Link>
            <Link 
              href="/dashboard" 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl mb-2 block">📊</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Dashboard</span>
            </Link>
            <Link 
              href="/emergency" 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl mb-2 block">🆘</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Emergency</span>
            </Link>
            <Link 
              href="/about" 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl mb-2 block">ℹ️</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">About</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
