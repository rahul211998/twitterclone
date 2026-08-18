const ErrorPage = ({ error }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">
                Something went wrong
            </h1>

            <p className="mt-3 text-gray-500">
                {error?.message || "Unexpected error occurred"}
            </p>

            <button
                onClick={() => window.location.reload()}
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Reload Page
            </button>
        </div>
    );
};

export default ErrorPage;