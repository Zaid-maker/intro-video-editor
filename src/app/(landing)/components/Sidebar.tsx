import { authClient } from "@/lib/auth-client";
import { Icons } from "../../../../assets/Icons";
import Link from "next/link";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { data } = authClient.useSession();

    const handleLogout = () => {
        // Add logout logic here
        console.log("Logout");
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-full w-72 bg-[#0C0C0E] border-r border-white/10 transform transition-transform duration-300 z-50 md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2">
                            <Icons.Video className="w-6 h-6 text-[#8B43F7]" />
                            <span className="text-white font-semibold">VideoGen</span>
                        </div>
                        <button onClick={onClose} className="text-white/70 hover:text-white">
                            <Icons.XIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="mb-8 p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Icons.UserCircle className="w-8 h-8 text-white" />
                            <div>
                                <p className="text-white text-sm font-medium">
                                    {data?.user ? data.user.name : "Guest User"}
                                </p>
                                <p className="text-white/50 text-xs">
                                    {data?.user ? "Premium Member" : "Free Account"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        <Link
                            href="/intro"
                            className="flex items-center space-x-3 px-3 py-3 rounded-lg bg-[#8B43F7] text-white"
                            onClick={onClose}
                        >
                            <Icons.Video className="w-5 h-5" />
                            <span>Create Video</span>
                        </Link>

                        <Link
                            href="/settings"
                            className="flex items-center space-x-3 px-3 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5"
                            onClick={onClose}
                        >
                            <Icons.Settings className="w-5 h-5" />
                            <span>Settings</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-3 px-3 py-3 rounded-lg text-white/70 hover:text-white hover:bg-white/5 w-full text-left"
                        >
                            <Icons.LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </nav>
                </div>
            </div>
        </>
    );
}