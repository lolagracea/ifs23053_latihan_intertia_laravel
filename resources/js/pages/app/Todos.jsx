import React, { useState, useEffect, useRef } from "react";
import { usePage, useForm, Link, router } from "@inertiajs/react";
import AppLayout from "@/layouts/AppLayout";
import Swal from "sweetalert2";
import Chart from "react-apexcharts";
import "trix";

export default function Todos({ todos, filters, stats }) {
    const { flash } = usePage().props;

    const {
        data: editData,
        setData: setEditData,
        put,
        errors: editErrors,
    } = useForm({
        title: "",
        description: "",
        cover: null,
    });

    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState(filters?.search || "");
    const [status, setStatus] = useState(filters?.status || "");

    const editEditorRef = useRef(null);

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: flash.success,
                timer: 2000,
                showConfirmButton: false,
            });
        }
        if (flash?.error) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: flash.error,
            });
        }
    }, [flash]);

    useEffect(() => {
        const editorEl = editEditorRef.current;
        if (!editorEl) return;

        const handler = () => {
            const input = document.getElementById("edit-description");
            if (input) setEditData("description", input.value);
        };

        editorEl.addEventListener("trix-change", handler);
        return () => editorEl.removeEventListener("trix-change", handler);
    }, [editEditorRef.current]);

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditData("title", todo.title);
        setEditData("description", todo.description ?? "");
        setEditData("cover", null);

        setTimeout(() => {
            const input = document.getElementById("edit-description");
            if (input) input.value = todo.description || "";
        }, 0);
    };

    const cancelEdit = () => setEditingId(null);

    const submitEdit = (e) => {
        e.preventDefault();
        put(`/todos/${editingId}`, {
            onSuccess: () => setEditingId(null),
        });
    };

    const toggleTodo = (id) => {
        router.patch(`/todos/${id}/toggle`, {}, { preserveScroll: true });
    };

    const deleteTodo = (id) => {
        Swal.fire({
            title: "Hapus todo ini?",
            text: "Tindakan ini tidak bisa dibatalkan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/todos/${id}`, { preserveScroll: true });
            }
        });
    };

    const applyFilter = (e) => {
        e.preventDefault();
        router.get(
            "/todos",
            {
                search: search || undefined,
                status: status || undefined,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const goToPage = (url) => {
        if (!url) return;
        router.get(url, {}, { preserveState: true, preserveScroll: true });
    };

    const items = todos.data || [];

    const total = stats?.total || 0;
    const finished = stats?.finished || 0;
    const pending = stats?.pending || 0;
    const perDay = stats?.per_day || [];

    const statusSeries = [finished, pending];
    const statusOptions = {
        chart: { type: "donut" },
        labels: ["Selesai", "Belum selesai"],
        colors: ["#06b6d4", "#8b5cf6"],
        legend: { position: "bottom" },
        dataLabels: { enabled: true },
    };

    const trendCategories = perDay.map((d) => d.date);
    const trendSeries = [
        {
            name: "Todos per hari",
            data: perDay.map((d) => d.count),
        },
    ];
    const trendOptions = {
        chart: { type: "line", toolbar: { show: false } },
        xaxis: { categories: trendCategories },
        stroke: { curve: "smooth", width: 3 },
        colors: ["#3b82f6"],
    };

    return (
        <AppLayout>
            {/* Hero Header - Dark Theme */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 mix-blend-multiply blur-3xl" />
                    <div className="animation-delay-2000 absolute top-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500 mix-blend-multiply blur-3xl" />
                    <div className="animation-delay-4000 absolute -bottom-32 left-1/3 h-96 w-96 animate-pulse rounded-full bg-pink-500 mix-blend-multiply blur-3xl" />
                </div>

                <div className="container relative mx-auto px-4 py-16 lg:py-20">
                    <div className="mx-auto max-w-6xl">
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
                                Todo List
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
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                        />
                                    </svg>
                                    <span className="text-sm font-semibold text-cyan-100">
                                        Manajemen Todo
                                    </span>
                                </div>
                                <h1 className="mb-4 text-5xl font-extrabold leading-tight text-white sm:text-6xl">
                                    Pantau Semua
                                    <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        Progress Anda
                                    </span>
                                </h1>
                                <p className="max-w-2xl text-lg leading-relaxed text-blue-100">
                                    Lihat statistik real-time, kelola todos
                                    dengan mudah, dan lacak produktivitas Anda
                                    setiap hari.
                                </p>
                            </div>

                            <Link
                                href="/todos/create"
                                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-cyan-500/50"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <svg
                                        className="h-5 w-5"
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
                                    Tambah Todo Baru
                                    <svg
                                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-slate-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl space-y-8">
                        {/* STATS SECTION */}
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Statistik & Analytics
                                </h2>
                                <p className="mt-1 text-slate-600">
                                    Visualisasi data todo Anda
                                </p>
                            </div>

                            <div className="grid gap-6 lg:grid-cols-3">
                                {/* Donut Chart */}
                                <div className="overflow-hidden rounded-3xl bg-white shadow-lg lg:col-span-1">
                                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">
                                                    Status Todo
                                                </h3>
                                                <p className="text-xs text-slate-600">
                                                    Total: {total} todos
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        {total === 0 ? (
                                            <div className="flex flex-col items-center gap-3 py-8 text-center">
                                                <div className="rounded-full bg-slate-100 p-4">
                                                    <svg
                                                        className="h-8 w-8 text-slate-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-slate-500">
                                                    Belum ada data
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                                <Chart
                                                    options={statusOptions}
                                                    series={statusSeries}
                                                    type="donut"
                                                    height={240}
                                                />
                                                <div className="mt-4 grid grid-cols-2 gap-3">
                                                    <div className="rounded-xl bg-cyan-50 p-3 text-center">
                                                        <p className="text-2xl font-black text-cyan-600">
                                                            {finished}
                                                        </p>
                                                        <p className="text-xs font-medium text-cyan-700">
                                                            Selesai
                                                        </p>
                                                    </div>
                                                    <div className="rounded-xl bg-purple-50 p-3 text-center">
                                                        <p className="text-2xl font-black text-purple-600">
                                                            {pending}
                                                        </p>
                                                        <p className="text-xs font-medium text-purple-700">
                                                            Pending
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Line Chart */}
                                <div className="overflow-hidden rounded-3xl bg-white shadow-lg lg:col-span-2">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">
                                                    Tren Harian
                                                </h3>
                                                <p className="text-xs text-slate-600">
                                                    Aktivitas pembuatan todo
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        {perDay.length === 0 ? (
                                            <div className="flex flex-col items-center gap-3 py-12 text-center">
                                                <div className="rounded-full bg-slate-100 p-4">
                                                    <svg
                                                        className="h-8 w-8 text-slate-400"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                                        />
                                                    </svg>
                                                </div>
                                                <p className="text-sm text-slate-500">
                                                    Belum ada data tren
                                                </p>
                                            </div>
                                        ) : (
                                            <Chart
                                                options={trendOptions}
                                                series={trendSeries}
                                                type="line"
                                                height={240}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FILTER SECTION */}
                        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">
                                            Filter & Pencarian
                                        </h3>
                                        <p className="text-xs text-slate-600">
                                            Temukan todo yang Anda cari
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <form
                                    onSubmit={applyFilter}
                                    className="flex flex-col gap-4 lg:flex-row"
                                >
                                    <input
                                        type="text"
                                        className="flex-1 rounded-xl border-2 border-slate-200 bg-slate-50 px-5 py-3 text-base transition-all focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100"
                                        placeholder="Cari berdasarkan judul atau deskripsi..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />

                                    <select
                                        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-5 py-3 text-base transition-all focus:border-purple-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-100 lg:w-56"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(e.target.value)
                                        }
                                    >
                                        <option value="">Semua Status</option>
                                        <option value="pending">
                                            Belum Selesai
                                        </option>
                                        <option value="finished">
                                            Selesai
                                        </option>
                                    </select>

                                    <button
                                        type="submit"
                                        className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                    >
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                        Cari
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* TODO LIST SECTION */}
                        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
                            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                                            <svg
                                                className="h-5 w-5"
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
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">
                                                Daftar Todo
                                            </h3>
                                            <p className="text-xs text-slate-600">
                                                {items.length} hasil ditemukan
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center gap-4 py-16 text-center">
                                        <div className="rounded-full bg-gradient-to-br from-slate-100 to-slate-200 p-6">
                                            <svg
                                                className="h-16 w-16 text-slate-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-slate-700">
                                                Tidak Ada Todo
                                            </p>
                                            <p className="mt-2 max-w-md text-sm text-slate-500">
                                                Belum ada todo yang sesuai
                                                dengan filter. Coba ubah
                                                pencarian atau buat todo baru.
                                            </p>
                                        </div>
                                        <Link
                                            href="/todos/create"
                                            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
                                        >
                                            <svg
                                                className="h-5 w-5"
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
                                            Buat Todo Pertama
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {items.map((todo) => {
                                            const coverUrl = todo.cover_url
                                                ? todo.cover_url
                                                : todo.cover
                                                ? `/storage/${todo.cover}`
                                                : null;

                                            return (
                                                <div
                                                    key={todo.id}
                                                    className="group relative overflow-hidden rounded-2xl border-2 border-slate-100 bg-slate-50/50 p-5 transition-all hover:border-cyan-200 hover:bg-white hover:shadow-lg"
                                                >
                                                    <div className="flex gap-4">
                                                        {/* Checkbox */}
                                                        <div className="pt-1">
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    todo.is_finished
                                                                }
                                                                onChange={() =>
                                                                    toggleTodo(
                                                                        todo.id
                                                                    )
                                                                }
                                                                className="h-6 w-6 cursor-pointer rounded-lg border-2 border-slate-300 text-cyan-600 transition-all focus:ring-4 focus:ring-cyan-100"
                                                            />
                                                        </div>

                                                        <div className="flex flex-1 flex-col gap-4 lg:flex-row">
                                                            {/* Cover Image */}
                                                            {coverUrl && (
                                                                <img
                                                                    src={
                                                                        coverUrl
                                                                    }
                                                                    alt="Cover"
                                                                    className="h-32 w-48 flex-none rounded-xl border-2 border-slate-200 object-cover shadow-md"
                                                                />
                                                            )}

                                                            {/* Content */}
                                                            <div className="flex-1 space-y-3">
                                                                {editingId ===
                                                                todo.id ? (
                                                                    <form
                                                                        onSubmit={
                                                                            submitEdit
                                                                        }
                                                                        encType="multipart/form-data"
                                                                        className="space-y-4"
                                                                    >
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-base font-medium focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-100"
                                                                                value={
                                                                                    editData.title
                                                                                }
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setEditData(
                                                                                        "title",
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    )
                                                                                }
                                                                            />
                                                                            {editErrors.title && (
                                                                                <p className="mt-2 text-sm text-red-600">
                                                                                    {
                                                                                        editErrors.title
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                        </div>

                                                                        <div>
                                                                            <input
                                                                                id="edit-description"
                                                                                type="hidden"
                                                                                value={
                                                                                    editData.description ||
                                                                                    ""
                                                                                }
                                                                                readOnly
                                                                            />
                                                                            <div className="overflow-hidden rounded-xl border-2 border-slate-200">
                                                                                <trix-editor
                                                                                    ref={
                                                                                        editEditorRef
                                                                                    }
                                                                                    input="edit-description"
                                                                                    class="trix-content px-4 py-3"
                                                                                ></trix-editor>
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <input
                                                                                type="file"
                                                                                accept="image/*"
                                                                                className="w-full cursor-pointer rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 text-sm file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-cyan-500 file:to-blue-500 file:px-4 file:py-2 file:font-bold file:text-white hover:border-slate-400"
                                                                                onChange={(
                                                                                    e
                                                                                ) =>
                                                                                    setEditData(
                                                                                        "cover",
                                                                                        e
                                                                                            .target
                                                                                            .files[0] ??
                                                                                            null
                                                                                    )
                                                                                }
                                                                            />
                                                                            {editErrors.cover && (
                                                                                <p className="mt-2 text-sm text-red-600">
                                                                                    {
                                                                                        editErrors.cover
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                            <p className="mt-2 text-xs text-slate-500">
                                                                                Biarkan
                                                                                kosong
                                                                                jika
                                                                                tidak
                                                                                ingin
                                                                                mengubah
                                                                                cover
                                                                            </p>
                                                                        </div>

                                                                        <div className="flex gap-3">
                                                                            <button className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105">
                                                                                Simpan
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={
                                                                                    cancelEdit
                                                                                }
                                                                                className="rounded-xl border-2 border-slate-200 px-6 py-3 font-semibold text-slate-700 transition-all hover:bg-slate-50"
                                                                            >
                                                                                Batal
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                ) : (
                                                                    <>
                                                                        <div>
                                                                            <h3
                                                                                className={
                                                                                    "text-xl font-bold" +
                                                                                    (todo.is_finished
                                                                                        ? " line-through text-slate-400"
                                                                                        : " text-slate-900")
                                                                                }
                                                                            >
                                                                                {
                                                                                    todo.title
                                                                                }
                                                                            </h3>
                                                                        </div>

                                                                        {todo.description && (
                                                                            <div className="prose prose-slate max-w-none">
                                                                                <div
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: todo.description,
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        )}

                                                                        <div className="flex flex-wrap items-center gap-3">
                                                                            <span
                                                                                className={
                                                                                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold" +
                                                                                    (todo.is_finished
                                                                                        ? " bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                                                                                        : " bg-gradient-to-r from-orange-500 to-pink-500 text-white")
                                                                                }
                                                                            >
                                                                                {todo.is_finished ? (
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
                                                                                ) : (
                                                                                    <svg
                                                                                        className="h-4 w-4"
                                                                                        fill="currentColor"
                                                                                        viewBox="0 0 20 20"
                                                                                    >
                                                                                        <path
                                                                                            fillRule="evenodd"
                                                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                                                        />
                                                                                    </svg>
                                                                                )}
                                                                                {todo.is_finished
                                                                                    ? "Selesai"
                                                                                    : "Belum Selesai"}
                                                                            </span>
                                                                            <span className="flex items-center gap-2 text-sm text-slate-500">
                                                                                <svg
                                                                                    className="h-4 w-4"
                                                                                    fill="none"
                                                                                    viewBox="0 0 24 24"
                                                                                    stroke="currentColor"
                                                                                >
                                                                                    <path
                                                                                        strokeLinecap="round"
                                                                                        strokeLinejoin="round"
                                                                                        strokeWidth={
                                                                                            2
                                                                                        }
                                                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                                    />
                                                                                </svg>
                                                                                {
                                                                                    todo.created_at
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>

                                                            {/* Action Buttons */}
                                                            {editingId !==
                                                                todo.id && (
                                                                <div className="flex flex-col gap-2 lg:flex-row">
                                                                    <button
                                                                        onClick={() =>
                                                                            startEdit(
                                                                                todo
                                                                            )
                                                                        }
                                                                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700 transition-all hover:bg-blue-200"
                                                                    >
                                                                        <svg
                                                                            className="h-4 w-4"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                            />
                                                                        </svg>
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        onClick={() =>
                                                                            deleteTodo(
                                                                                todo.id
                                                                            )
                                                                        }
                                                                        className="flex items-center justify-center gap-2 rounded-xl bg-red-100 px-4 py-2 text-sm font-bold text-red-700 transition-all hover:bg-red-200"
                                                                    >
                                                                        <svg
                                                                            className="h-4 w-4"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={
                                                                                    2
                                                                                }
                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                            />
                                                                        </svg>
                                                                        Hapus
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* PAGINATION */}
                        {todos.links && todos.links.length > 3 && (
                            <div className="flex flex-wrap justify-center gap-2">
                                {todos.links.map((link, i) => (
                                    <button
                                        key={i}
                                        disabled={!link.url}
                                        onClick={() => goToPage(link.url)}
                                        className={
                                            "min-w-[44px] rounded-xl border-2 px-4 py-3 text-sm font-bold transition-all" +
                                            (link.active
                                                ? " border-cyan-500 bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                                                : " border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50") +
                                            (!link.url
                                                ? " cursor-not-allowed opacity-40"
                                                : " cursor-pointer")
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
