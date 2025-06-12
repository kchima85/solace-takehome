import { cn } from "@/lib/utils";

interface ErrorProps {
    message: string;
    className?: string;
}

export default function Error({ message, className }: ErrorProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center py-16",
                className
            )}
        >
            <div className="rounded-md bg-red-100 border border-red-400 px-6 py-4 flex items-center gap-3">
                <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span className="text-red-700 font-semibold">{message}</span>
            </div>
        </div>
    );
}
