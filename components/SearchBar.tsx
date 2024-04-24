"use client";
import { scrapeAndStoreProduct } from "@/lib/actions";
import React, { FormEvent, useState } from "react";

//validity of amazon product link
const isValidAmazonProductURL = (url: string) => {
  try {
    const parseURL = new URL(url);
    const hostname = parseURL.hostname;

    //check the domain name
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.in") ||
      hostname.includes("amazon") || hostname.includes("amzn.in")
    ) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) {
      return alert("Please enter a valid Amazon Product Link");
    }
    // alert(isValidLink ? 'Valid link' : 'Invalid  Link');
    try {
      setIsLoading(true);

      //scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt);
      console.log("Submitted");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        placeholder="Enter the product link"
        className="searchbar-input"
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching.." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
