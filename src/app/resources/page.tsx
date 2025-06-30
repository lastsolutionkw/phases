import ResourceCard from '@/components/resources/ResourceCard';
import ResourceSearchBar from '@/components/resources/ResourceSearchBar';
import ResourceFilterPanel from '@/components/resources/ResourceFilterPanel';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Wellness Resources
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Discover articles, meditations, and exercises to support your mental health
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <ResourceFilterPanel />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <ResourceSearchBar />
            </div>

            {/* Featured Resources */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Featured This Week
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <ResourceCard
                  title="Managing Anxiety: A Gentle Guide"
                  type="article"
                  duration={8}
                  description="Learn practical techniques to manage anxiety in daily life"
                  category="Anxiety"
                />
                <ResourceCard
                  title="5-Minute Breathing Meditation"
                  type="meditation"
                  duration={5}
                  description="A simple breathing exercise to center yourself"
                  category="Mindfulness"
                />
              </div>
            </section>

            {/* All Resources */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                All Resources
              </h2>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                <ResourceCard
                  title="Understanding Depression"
                  type="article"
                  duration={12}
                  description="Comprehensive guide to recognizing and managing depression"
                  category="Depression"
                />
                <ResourceCard
                  title="Progressive Muscle Relaxation"
                  type="exercise"
                  duration={15}
                  description="Guided exercise to release physical tension"
                  category="Relaxation"
                />
                <ResourceCard
                  title="Sleep Hygiene Tips"
                  type="article"
                  duration={6}
                  description="Improve your sleep quality with these evidence-based tips"
                  category="Sleep"
                />
                <ResourceCard
                  title="Gratitude Meditation"
                  type="meditation"
                  duration={10}
                  description="Cultivate appreciation and positive thinking"
                  category="Mindfulness"
                />
                <ResourceCard
                  title="Coping with Stress"
                  type="article"
                  duration={9}
                  description="Healthy strategies for managing life's challenges"
                  category="Stress"
                />
                <ResourceCard
                  title="Body Scan Meditation"
                  type="meditation"
                  duration={20}
                  description="Mindful awareness of physical sensations"
                  category="Mindfulness"
                />
              </div>
            </section>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Load More Resources
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}