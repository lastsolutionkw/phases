import EmergencyCard from '@/components/emergencySupport/EmergencyCard';
import CountryHotlineList from '@/components/emergencySupport/CountryHotlineList';
import QuickContactButton from '@/components/emergencySupport/QuickContactButton';

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-red-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Urgent Notice */}
        <div className="bg-red-600 text-white p-6 rounded-xl mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Need Immediate Help?
          </h1>
          <p className="text-lg">
            If you're in crisis or having thoughts of self-harm, please reach out for professional help immediately.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <QuickContactButton
            type="emergency"
            title="Emergency Services"
            number="911"
            description="For immediate life-threatening emergencies"
            color="red"
          />
          <QuickContactButton
            type="suicide"
            title="Suicide Prevention"
            number="988"
            description="24/7 suicide prevention hotline"
            color="purple"
          />
          <QuickContactButton
            type="crisis"
            title="Crisis Text Line"
            number="Text HOME to 741741"
            description="Free, 24/7 crisis text support"
            color="blue"
          />
        </div>

        {/* Emergency Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <EmergencyCard
            title="If You're in Immediate Danger"
            priority="critical"
            content={[
              "Call 911 or go to your nearest emergency room",
              "Contact a trusted friend or family member",
              "Remove any means of self-harm from your area",
              "Stay with someone until help arrives"
            ]}
          />
          <EmergencyCard
            title="If You're Having Difficult Thoughts"
            priority="high"
            content={[
              "Call or text a crisis hotline",
              "Reach out to a mental health professional",
              "Contact a trusted friend or family member",
              "Use grounding techniques to stay present"
            ]}
          />
        </div>

        {/* International Hotlines */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Crisis Support by Country
          </h2>
          <CountryHotlineList />
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Additional Support Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Online Support Communities
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• 7 Cups - Free emotional support</li>
                <li>• Crisis Text Line - Text-based crisis support</li>
                <li>• NAMI Support Groups - Find local support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                Professional Help
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Psychology Today - Find therapists</li>
                <li>• BetterHelp - Online therapy platform</li>
                <li>• Local mental health services</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Important:</strong> This AI companion is not a replacement for professional mental health care. 
            If you're experiencing a mental health crisis, please contact the appropriate emergency services or 
            mental health professionals in your area.
          </p>
        </div>
      </div>
    </div>
  );
}