export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            About Phases
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Understanding our mission to support mental wellness
          </p>
        </header>

        <div className="space-y-8">
          {/* Vision */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Vision
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We envision a world where mental health support is accessible to everyone, 
                regardless of location, time, or circumstances. Phases represents our commitment 
                to breaking down barriers that prevent people from seeking help when they need it most.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Empathetic Support
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Provide compassionate, non-judgmental support through AI technology 
                  that understands and responds to emotional needs with care and sensitivity.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Accessible Care
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Make mental health support available 24/7, removing geographical, 
                  financial, and social barriers that often prevent people from getting help.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Safe Environment
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Create a secure, private space where individuals can express themselves 
                  freely without fear of judgment or breach of confidentiality.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Complement Professional Care
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Bridge the gap between professional therapy sessions and daily life, 
                  providing ongoing support that complements traditional mental health care.
                </p>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              How Phases Works
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-300 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Start a Conversation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Begin chatting immediately - no signup required. Share what's on your mind 
                    in a judgment-free environment.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-300 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Receive Empathetic Support
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our AI analyzes your emotional state and responds with appropriate empathy, 
                    validation, and helpful suggestions.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-300 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Access Resources & Track Progress
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Get personalized resource recommendations and optionally track your mood 
                    and goals over time with an account.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* AI Limitations */}
          <section className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
              Important: AI Limitations & Disclaimer
            </h2>
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  What Phases Can Do
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Provide empathetic listening and emotional support</li>
                  <li>• Offer coping strategies and mindfulness techniques</li>
                  <li>• Share educational resources about mental health</li>
                  <li>• Help you reflect on your thoughts and feelings</li>
                  <li>• Suggest when professional help might be beneficial</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  What Phases Cannot Do
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Provide professional medical or psychological diagnosis</li>
                  <li>• Replace therapy or professional mental health treatment</li>
                  <li>• Handle emergency situations or crisis intervention</li>
                  <li>• Prescribe medications or provide medical advice</li>
                  <li>• Guarantee specific outcomes or treatment success</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200 font-medium">
                If you're experiencing a mental health crisis or having thoughts of self-harm, 
                please seek immediate professional help or contact emergency services.
              </p>
            </div>
          </section>

          {/* Team & Values */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">💙</div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Empathy First</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Every interaction is guided by genuine care and understanding
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🔒</div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Privacy & Safety</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Your privacy and emotional safety are our highest priorities
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🌍</div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Accessibility</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Mental health support should be available to everyone, everywhere
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-2xl">🤝</div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">Collaboration</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We work alongside, not in place of, professional mental health care
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Have questions, feedback, or want to learn more about Phases? We'd love to hear from you.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">General Inquiries</h3>
                <p className="text-blue-600 dark:text-blue-300">hello@phases.com</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Privacy & Safety</h3>
                <p className="text-blue-600 dark:text-blue-300">privacy@phases.com</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}