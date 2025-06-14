import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onReset?: () => void;
    placeholder?: string;
    resetButtonLabel?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    className?: string;
}

export default function SearchBar({
    value,
    onChange,
    onReset,
    placeholder,
    resetButtonLabel,
    autoFocus = false,
    disabled = false,
    className,
}: SearchBarProps) {
    return (
        <div className={cn("flex flex-col items-start w-full", className)}>
            <div className="flex gap-2 w-full max-w-md">
                <Input
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    disabled={disabled}
                    className="border border-solid border-black"
                />
                {onReset && (
                    <button
                        onClick={onReset}
                        disabled={disabled}
                        className="px-1.5 py-1 bg-solace-sky text-white rounded-md border border-solace-blue font-medium hover:bg-solace-blue transition-colors disabled:opacity-50"
                    >
                        {resetButtonLabel}
                    </button>
                )}
            </div>
        </div>
    );
}
