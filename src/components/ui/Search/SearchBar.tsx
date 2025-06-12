import { Input } from "@/components/ui/input";

interface SearchBarProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onReset?: () => void;
    placeholder?: string;
    resetButtonLabel?: string;
    autoFocus?: boolean;
    disabled?: boolean;
}

export default function SearchBar({
    value,
    onChange,
    onReset,
    placeholder,
    resetButtonLabel,
    autoFocus = false,
    disabled = false,
}: SearchBarProps) {
    return (
        <div className="flex flex-col items-start w-full">
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
