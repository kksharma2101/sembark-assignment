import { Loader } from 'lucide-react';

const LoadingState = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Loader className="animate-spin" size={40} />
        </div>
    )
}

export default LoadingState;