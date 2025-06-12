"use client";

import { useEffect, useState } from "react";

// components
import { DataTable } from "../components/ui/Table/Table";
import SearchBar from "../components/ui/Search/SearchBar";
import Error from "@/components/ui/Error";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { AdvocateTableColumns } from "./AdovcateTableColumns";

// types
import { Advocate } from "./types";

export default function Home() {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const fetchAdvocates = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/advocates");
            const jsonifiedResponse = await response.json();
            console.log(jsonifiedResponse);
            setAdvocates(jsonifiedResponse.data);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdvocates();
    }, []);

    useEffect(() => {
        if (searchTerm === "") {
            fetchAdvocates();
            return;
        }

        const handler = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `/api/advocates/search?q=${searchTerm.toLowerCase()}`
                );
                const jsonifiedResponse = await response.json();
                setAdvocates(jsonifiedResponse.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }, 400); // 400ms debounce

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const handleSearchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleResetSearchOnClick = () => {
        setSearchTerm("");
        fetchAdvocates();
    };

    return (
        <main className="min-h-screen bg-solace-white px-6 py-8">
            <h1 className="text-3xl font-bold text-solace-dark">
                Solace Advocates
            </h1>
            <div className="my-4">
                <SearchBar
                    value={searchTerm}
                    onChange={handleSearchOnChange}
                    onReset={handleResetSearchOnClick}
                    placeholder="Search advocates..."
                    resetButtonLabel="Reset"
                />
            </div>
            {error ? (
                <Error message="Failed to load advocates. Please try again later." />
            ) : loading ? (
                <LoadingSpinner message="Loading advocates..." />
            ) : (
                <div className="rounded-md border border-solace-blue bg-white shadow">
                    <DataTable
                        data={advocates}
                        columns={AdvocateTableColumns}
                    />
                </div>
            )}
        </main>
    );
}
