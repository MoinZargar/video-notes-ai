export default function DashboardLoading() {
    return (
        <div className="flex-1 min-h-screen bg-[#F8F7FC] flex justify-center items-center pl-8">
            <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                <p className="text-lg">Loading dashboard...</p>
            </div>
        </div>
    );
}