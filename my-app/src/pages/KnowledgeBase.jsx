import PageLayout from '../components/PageLayout';

export default function KnowledgeBase() {
    return (
        <PageLayout title="Knowledge Base">
            <div className="text-gray-700 dark:text-gray-300">
                <p className="text-lg mb-4">Access documentation, SOPs, onboarding materials, and FAQs.</p>
                <div className="bg-blue-50 dark:bg-slate-700 rounded-lg p-6 border-2 border-dashed border-blue-300 dark:border-blue-600">
                    <p className="text-center">Coming soon...</p>
                </div>
            </div>
        </PageLayout>
    )
}
