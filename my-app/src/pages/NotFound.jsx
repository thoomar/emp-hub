import { Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout';

export default function NotFound() {
    return (
        <PageLayout>
            <div className="text-center py-12">
                <h2 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">Page not found.</p>
                <Link 
                    to="/" 
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                    Go Home →
                </Link>
            </div>
        </PageLayout>
    )
}
