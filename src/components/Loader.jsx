import { Loader2 } from 'lucide-react';

export default function Loader({ message = "Loading..." }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 bg-opacity-75 z-50">
            <Loader2 className="h-12 w-12 text-rose-600 animate-spin" />
            {message && <p className="mt-4 text-gray-700 font-medium">{message}</p>}
        </div>
    );
}
