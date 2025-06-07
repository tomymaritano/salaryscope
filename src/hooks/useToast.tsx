"use client";
import { useState } from "react";

type ToastType = "success" | "error";

export function useToast() {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const showToast = (message: string, type: ToastType = "success") => {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3000); // Dura 3 segundos
    };

    const Toast = () =>
        toast ? (
            <div
                className={`fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-md shadow-lg border text-sm transition-all
                ${toast.type === "success" ? "bg-green-600/90 border-green-400 text-white" : "bg-red-600/90 border-red-400 text-white"}`}
            >
                <span className="text-xl">
                    {toast.type === "success" ? "✅" : "⚠️"}
                </span>
                <span>{toast.message}</span>
            </div>
        ) : null;

    return { showToast, Toast };
}
