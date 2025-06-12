import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    message: string;
    className?: string;
}

export default function LoadingSpinner({
    message,
    className,
}: LoadingSpinnerProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center py-16",
                className
            )}
        >
            <svg
                className="animate-spin h-8 w-8 text-solace-blue mb-4"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                />
            </svg>
            <span className="text-solace-dark text-lg font-medium">
                {message}
            </span>
        </div>
    );
}
