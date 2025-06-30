export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Privacy & Safety
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Your privacy and safety are our top priorities
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-8">
          {/* Anonymity Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Complete Anonymity Option
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg mb-4">
              <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
                🔒 Use Without Creating an Account
              </h3>
              <p className="text-green-700 dark:text-green-300">
                You can use Phases completely anonymously without creating an account. 
                No personal information is required to start a conversation.
              </p>
            </div>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• No registration required for basic chat functionality</li>
              <li>• Conversations are not linked to your identity</li>
              <li>• No tracking of personal information</li>
              <li>• You control what information you share</li>
            </ul>
          </section>

          {/* Data Usage */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              How We Use Your Data
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-3">
                  Anonymous Users
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                  <li>• Conversations are processed for AI responses only</li>
                  <li>• No data is permanently stored</li>
                  <li>• No personal identifiers are collected</li>
                  <li>• Session data is cleared after you leave</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-purple-800 dark:text-purple-200 mb-3">
                  Registered Users
                </h3>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-2">
                  <li>• Chat history saved for continuity</li>
                  <li>• Mood tracking data for personal insights</li>
                  <li>• Progress tracking for goals</li>
                  <li>• You can delete your data anytime</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Data Protection Measures
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl mb-2">🔐</div>
                <h3 className="font-medium text-gray-900 dark:text-white">End-to-End Encryption</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  All conversations are encrypted in transit
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl mb-2">🛡️</div>
                <h3 className="font-medium text-gray-900 dark:text-white">Secure Storage</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Data stored with industry-standard security
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl mb-2">🗑️</div>
                <h3 className="font-medium text-gray-900 dark:text-white">Data Deletion</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Delete your data completely anytime
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Privacy Rights
            </h2>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Right to Anonymity:</strong> Use our service without providing any personal information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Right to Access:</strong> View all data we have about you</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Right to Deletion:</strong> Delete your account and all associated data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Right to Portability:</strong> Export your data in a readable format</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Right to Correction:</strong> Update or correct your personal information</span>
                </li>
              </ul>
            </div>
          </section>

          {/* AI Limitations */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              AI Safety & Limitations
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-3">
                Important Disclaimer
              </h3>
              <ul className="space-y-2 text-yellow-700 dark:text-yellow-300">
                <li>• This AI is not a licensed therapist or medical professional</li>
                <li>• AI responses are generated based on patterns, not professional judgment</li>
                <li>• Cannot diagnose mental health conditions or provide medical advice</li>
                <li>• Not suitable for emergency situations or crisis intervention</li>
                <li>• Should complement, not replace, professional mental health care</li>
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Questions About Privacy?
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                If you have any questions about our privacy practices or want to exercise your privacy rights, please contact us:
              </p>
              <div className="space-y-2 text-blue-700 dark:text-blue-300">
                <p>📧 Email: privacy@phases.com</p>
                <p>📞 Phone: +1 (555) 123-4567</p>
                <p>📍 Address: 123 Privacy Lane, Safety City, SC 12345</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}