"use client";

import { useEffect, useState } from "react";

// components
import { DataTable } from "../components/ui/Table/Table";
import SearchBar from "../components/ui/Search/SearchBar";
import { Loader2 } from "lucide-react";

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
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
