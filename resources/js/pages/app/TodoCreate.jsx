import React, { useEffect, useRef } from "react";
import { useForm, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import "trix";

export default function TodoCreate() {
    const { data, setData, post, reset, errors } = useForm({
        title: "",
        description: "",
        cover: null,
    });

    const editorRef = useRef(null);

    useEffect(() => {
        const editorEl = editorRef.current;
        if (!editorEl) return;

        const handler = () => {
            const input = document.getElementById("description");
            if (input) setData("description", input.value);
        };

        editorEl.addEventListener("trix-change", handler);
        return () => editorEl.removeEventListener("trix-change", handler);
    }, [editorRef.current]);

    const submit = (e) => {
        e.preventDefault();

        post("/todos", {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout>
            {/* Hero Header - Dark Theme matching HomePage */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 mix-blend-multiply blur-3xl" />
                    <div className="animation-delay-2000 absolute top-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500 mix-blend-multiply blur-3xl" />
                    <div className="animation-delay-4000 absolute -bottom-32 left-1/3 h-96 w-96 animate-pulse rounded-full bg-pink-500 mix-blend-multiply blur-3xl" />
                </div>

                <div className="container relative mx-auto px-4 py-16 lg:py-24">
                    <div className="mx-auto max-w-4xl">
                        {/* Navigation Breadcrumb */}
                        <div className="mb-8 flex items-center gap-2 text-sm text-blue-300">
                            <Link
                                href="/"
                                className="transition-colors hover:text-white"
                            >
                                Home
                            </Link>
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                            <span className="font-semibold text-white">
                                Buat Todo Baru
                            </span>
                        </div>

                        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div className="flex-1">
                                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 backdrop-blur-xl">
                                    <svg
                                        className="h-6 w-6 text-cyan-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    <span className="text-sm font-semibold text-cyan-100">
                                        Formulir Todo Baru
                                    </span>
                                </div>
                                <h1 className="mb-4 text-5xl font-extrabold leading-tight text-white sm:text-6xl">
                                    Buat Rencana
                                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        yang Terukur
                                    </span>
                                </h1>
                                <p className="max-w-2xl text-lg leading-relaxed text-blue-100">
                                    Tambahkan detail lengkap dengan rich text
                                    editor, upload cover visual, dan lacak
                                    progress Anda dengan sistem yang powerful.
                                </p>
                            </div>

                            <Link
                                href="/todos"
                                className="rounded-2xl border-2 border-blue-300/50 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/20 hover:scale-105"
                            >
                                Lihat Semua Todo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Section - Light Background */}
            <div className="bg-slate-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl">
                        {/* Section Header */}
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-slate-900">
                                Lengkapi Detail Todo
                            </h2>
                            <p className="text-lg text-slate-600">
                                Isi informasi di bawah untuk membuat todo yang
                                efektif
                            </p>
                        </div>

                        {/* Main Form Card */}
                        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
                            <form
                                onSubmit={submit}
                                encType="multipart/form-data"
                                className="p-8 lg:p-12"
                            >
                                <div className="space-y-10">
                                    {/* Judul */}
                                    <div className="group">
                                        <label className="mb-3 flex items-center gap-3 text-lg font-bold text-slate-900">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                                    />
                                                </svg>
                                            </div>
                                            <span>Judul Todo</span>
                                            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                                                Wajib
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Contoh: Selesaikan laporan proyek X..."
                                            className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 px-6 py-5 text-lg font-medium text-slate-900 transition-all focus:border-cyan-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-cyan-100"
                                            value={data.title}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                        />
                                        {errors.title && (
                                            <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    />
                                                </svg>
                                                {errors.title}
                                            </div>
                                        )}
                                    </div>

                                    {/* Deskripsi */}
                                    <div className="group">
                                        <label className="mb-3 flex items-center gap-3 text-lg font-bold text-slate-900">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg">
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                    />
                                                </svg>
                                            </div>
                                            <span>Catatan & Detail</span>
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                                Opsional
                                            </span>
                                        </label>
                                        <input
                                            id="description"
                                            type="hidden"
                                            value={data.description || ""}
                                            readOnly
                                        />
                                        <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm transition-all focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100">
                                            <trix-editor
                                                ref={editorRef}
                                                input="description"
                                                class="trix-content min-h-[240px] px-5 py-4 text-base"
                                            ></trix-editor>
                                        </div>
                                        <p className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                                            <svg
                                                className="mt-0.5 h-5 w-5 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                />
                                            </svg>
                                            Gunakan rich text editor untuk
                                            format teks, list, link, dan styling
                                            lainnya
                                        </p>
                                    </div>

                                    {/* Cover */}
                                    <div className="group">
                                        <label className="mb-3 flex items-center gap-3 text-lg font-bold text-slate-900">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg">
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <span>Cover Image</span>
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                                Opsional
                                            </span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="peer w-full cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-base text-slate-600 transition-all file:mr-4 file:cursor-pointer file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500 file:px-6 file:py-3 file:font-bold file:text-white file:shadow-xl file:transition-all hover:file:scale-105 hover:border-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-100"
                                                onChange={(e) =>
                                                    setData(
                                                        "cover",
                                                        e.target.files[0] ??
                                                            null
                                                    )
                                                }
                                            />
                                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-400 peer-hover:text-slate-600">
                                                <svg
                                                    className="h-16 w-16"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                    />
                                                </svg>
                                                <span className="text-sm font-medium">
                                                    Drag & drop atau pilih file
                                                </span>
                                            </div>
                                        </div>
                                        {errors.cover && (
                                            <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                    />
                                                </svg>
                                                {errors.cover}
                                            </div>
                                        )}
                                        <p className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                                            <svg
                                                className="mt-0.5 h-5 w-5 flex-shrink-0"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                />
                                            </svg>
                                            Upload gambar untuk membuat todo
                                            lebih visual dan mudah dikenali di
                                            list
                                        </p>
                                    </div>

                                    {/* Submit Section */}
                                    <div className="border-t-2 border-slate-100 pt-8">
                                        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                    <svg
                                                        className="h-5 w-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-700">
                                                        Tips Produktivitas
                                                    </p>
                                                    <p className="text-slate-500">
                                                        Buat judul yang spesifik
                                                        dan actionable
                                                    </p>
                                                </div>
                                            </div>
                                            <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-10 py-5 text-lg font-bold text-white shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-cyan-500/50">
                                                <span className="relative z-10 flex items-center gap-3">
                                                    <svg
                                                        className="h-6 w-6"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    Simpan Todo
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
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
