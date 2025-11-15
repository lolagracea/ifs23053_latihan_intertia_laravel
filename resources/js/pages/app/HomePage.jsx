import React from "react";
import AppLayout from "@/layouts/AppLayout";
import { Link, usePage } from "@inertiajs/react";

export default function HomePage() {
    const { auth } = usePage().props;
    const userName = auth?.name || auth?.user?.name || "Pengguna";

    return (
        <AppLayout>
            {/* Hero Section with Dark Theme */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 mix-blend-multiply blur-3xl" />
                    <div className="animation-delay-2000 absolute top-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500 mix-blend-multiply blur-3xl" />
                    <div className="animation-delay-4000 absolute -bottom-32 left-1/3 h-96 w-96 animate-pulse rounded-full bg-pink-500 mix-blend-multiply blur-3xl" />
                </div>

                <div className="container relative mx-auto px-4 py-20 lg:py-32">
                    <div className="mx-auto max-w-4xl text-center">
                        {/* Badge */}
                        <div className="mb-8 flex justify-center">
                            <div className="inline-flex items-center gap-3 rounded-full border border-blue-400/30 bg-blue-500/10 px-6 py-3 backdrop-blur-xl">
                                <span className="text-2xl">👋</span>
                                <span className="text-sm font-semibold text-blue-100">
                                    Hai, {userName}!
                                </span>
                            </div>
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
                            Produktivitas Tanpa Batas dengan{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    DelTodos
                                </span>
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    height="12"
                                    viewBox="0 0 200 12"
                                    fill="none"
                                >
                                    <path
                                        d="M0 6C50 12 150 0 200 6"
                                        stroke="url(#gradient)"
                                        strokeWidth="3"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="gradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#22D3EE"
                                            />
                                            <stop
                                                offset="50%"
                                                stopColor="#60A5FA"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#A78BFA"
                                            />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-blue-100 sm:text-xl">
                            Kelola semua tugas dan catatan Anda dalam satu
                            platform yang elegan. Dilengkapi rich text editor,
                            visualisasi data, dan sistem manajemen yang
                            powerful.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                            <Link
                                href="/todos/create"
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-cyan-500/50"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Mulai Sekarang
                                    <svg
                                        className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </span>
                            </Link>
                            <Link
                                href="/todos"
                                className="rounded-2xl border-2 border-blue-300/50 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/20"
                            >
                                Lihat Semua Todo
                            </Link>
                        </div>

                        {/* Feature Pills */}
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                            <div className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 backdrop-blur-sm">
                                <svg
                                    className="h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    />
                                </svg>
                                Data Aman Per-User
                            </div>
                            <div className="flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur-sm">
                                <svg
                                    className="h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    />
                                </svg>
                                Rich Text Editor
                            </div>
                            <div className="flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300 backdrop-blur-sm">
                                <svg
                                    className="h-4 w-4"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    />
                                </svg>
                                Statistik Real-time
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section with Cards */}
            <div className="bg-slate-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
                                Fitur Lengkap untuk Produktivitas Maksimal
                            </h2>
                            <p className="text-lg text-slate-600">
                                Semua yang Anda butuhkan dalam satu aplikasi
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <FeatureCard
                                title="Kelola Aktivitas"
                                desc="Atur tugas harianmu dengan mudah dan tetap produktif setiap waktu."
                                icon="📌"
                                bgColor="bg-gradient-to-br from-blue-500 to-cyan-500"
                            />
                            <FeatureCard
                                title="Lampiran & Catatan"
                                desc="Tambahkan gambar, cover, atau catatan penting untuk setiap tugas."
                                icon="🖼️"
                                bgColor="bg-gradient-to-br from-indigo-500 to-purple-500"
                            />
                            <FeatureCard
                                title="Insight Kinerja"
                                desc="Lihat progres penyelesaian tugas melalui tampilan grafik interaktif."
                                icon="📈"
                                bgColor="bg-gradient-to-br from-emerald-500 to-teal-500"
                            />
                            <FeatureCard
                                title="Penyaringan Cepat"
                                desc="Temukan todo lebih cepat menggunakan fitur filter & pencarian pintar."
                                icon="🔎"
                                bgColor="bg-gradient-to-br from-rose-500 to-orange-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function FeatureCard({ title, desc, icon, bgColor }) {
    return (
        <div className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
            {/* Icon Circle with Gradient */}
            <div
                className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${bgColor} text-3xl shadow-lg transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}
            >
                {icon}
            </div>

            {/* Content */}
            <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
            <p className="text-sm leading-relaxed text-slate-600">{desc}</p>

            {/* Decorative Element */}
            <div
                className={`absolute -right-8 -bottom-8 h-32 w-32 rounded-full ${bgColor} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
            />
        </div>
    );
}
