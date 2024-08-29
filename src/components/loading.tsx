const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background backdrop-blur-sm">
            <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12" />
        </div>
    );
};

export default Loading;
