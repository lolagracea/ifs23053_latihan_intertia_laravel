import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* TOP NAV - Dark Theme with Gradient */}
            <header className="sticky top-0 z-50 border-b border-blue-900/20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 shadow-xl backdrop-blur-xl">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-4">
                        {/* Logo Section */}
                        <Link
                            href="/"
                            className="group flex items-center gap-3"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 animate-pulse rounded-2xl bg-cyan-400 opacity-20 blur-xl" />
                                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg transition-transform group-hover:scale-110">
                                    <span className="text-xl font-black text-white">
                                        D
                                    </span>
                                </div>
                            </div>
                            <div className="leading-tight">
                                <div className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-xl font-black text-transparent">
                                    DoItNow
                                </div>
                                <div className="text-xs font-medium text-blue-300">
                                    Biar tugas tertata, hidup lebih ringan
                                </div>
                            </div>
                        </Link>

                        {/* Navigation */}
                        <nav className="flex items-center gap-2">
                            <Link
                                href="/"
                                className="group hidden items-center gap-2 rounded-xl border border-blue-400/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 sm:flex"
                            >
                                <svg
                                    className="h-4 w-4 transition-transform group-hover:scale-110"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                Home
                            </Link>
                            <Link
                                href="/todos"
                                className="group hidden items-center gap-2 rounded-xl border border-blue-400/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 sm:flex"
                            >
                                <svg
                                    className="h-4 w-4 transition-transform group-hover:scale-110"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                                Todos
                            </Link>

                            <div className="hidden h-8 w-px bg-blue-400/20 sm:block" />

                            {/* User Section */}
                            <div className="flex items-center gap-3">
                                <div className="hidden items-center gap-2 rounded-xl border border-blue-400/20 bg-white/5 px-4 py-2.5 backdrop-blur-sm sm:flex">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-xs font-bold text-white">
                                        {(auth?.name || auth?.user?.name || "U")
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                    <span className="text-sm font-semibold text-white">
                                        {auth?.name ||
                                            auth?.user?.name ||
                                            "User"}
                                    </span>
                                </div>
                                <Link
                                    href="/auth/logout"
                                    className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                >
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span className="hidden sm:inline">
                                        Logout
                                    </span>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Gradient Border Bottom */}
                <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
            </header>

            {/* MAIN CONTENT */}
            <main className="min-h-[calc(100vh-200px)]">{children}</main>

            {/* FOOTER - Matching Dark Theme */}
            <footer className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-cyan-500 blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-purple-500 blur-3xl" />
                </div>

                <div className="container relative mx-auto px-4 py-8">
                    <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                        {/* Footer Brand */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg">
                                <span className="text-lg font-black text-white">
                                    D
                                </span>
                            </div>
                            <div>
                                <div className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-lg font-black text-transparent">
                                    DoItNow
                                </div>
                                <p className="text-xs text-blue-300">
                                    Biar tugas tertata, hidup lebih ringan
                                </p>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                            <Link
                                href="/"
                                className="text-blue-300 transition-colors hover:text-white"
                            >
                                Home
                            </Link>
                            <Link
                                href="/todos"
                                className="text-blue-300 transition-colors hover:text-white"
                            >
                                Todos
                            </Link>
                            <Link
                                href="/todos/create"
                                className="text-blue-300 transition-colors hover:text-white"
                            >
                                Buat Todo
                            </Link>
                        </div>

                        {/* Footer Info */}
                        <div className="text-center lg:text-right">
                            <p className="text-sm font-semibold text-white">
                                © 2025 Delcom Labs
                            </p>
                            <p className="text-xs text-blue-300">
                                Built with Laravel + Inertia + React
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
