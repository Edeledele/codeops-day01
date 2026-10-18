"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import useDebounce from "../lib/useDebounce";
import DishCard from "./components/DishCard";

export default function MenuClientView({ initialPageData }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Read page number and category from URL query string (linkable and shareable)
  const pageParam = searchParams.get("page");
  const currentPage = Math.max(1, parseInt(pageParam || "1", 10));
  const currentCategory = searchParams.get("category") || "All";

  // 2. Debounced search state
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  // 3. Search SWR Query: NULL key when search term is empty!
  const isSearchActive = Boolean(debouncedSearch.trim());
  const searchKey = isSearchActive
    ? `/api/dishes/search?q=${encodeURIComponent(debouncedSearch.trim())}`
    : null;

  const {
    data: searchData,
    isValidating: isSearching,
    error: searchError,
  } = useSWR(searchKey, fetcher, {
    keepPreviousData: true,
  });

  // 4. Paged Dishes SWR Query: key includes page AND category in query string
  const pageKey = `/api/dishes?page=${currentPage}&limit=4&category=${encodeURIComponent(currentCategory)}`;
  const {
    data: pagedData,
    isValidating: isPaging,
    error: pagedError,
  } = useSWR(pageKey, fetcher, {
    keepPreviousData: true,
    fallbackData:
      currentPage === 1 &&
      (initialPageData?.category || "All").toLowerCase() === currentCategory.toLowerCase()
        ? initialPageData
        : undefined,
  });

  // Effective data
  const currentPaged = pagedData || (currentPage === 1 ? initialPageData : null);
  const currentDishes = isSearchActive
    ? searchData?.dishes ?? []
    : currentPaged?.dishes ?? [];

  const totalPages = currentPaged?.totalPages || 1;

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`/menu?${params.toString()}`, { scroll: false });
  };

  const createPageUrl = (pageNum) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNum);
    return `/menu?${params.toString()}`;
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="menu-container">
      {/* Search Bar & SWR State Inspector */}
      <section className="search-section">
        <div className="search-bar-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="search"
            className="search-input"
            value={searchTerm}
            placeholder="Search kitfo, doro wot, shiro, pizza..."
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search dishes"
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
          {isSearching && <span className="search-loading-spinner" title="Searching..." />}
        </div>
      </section>

      {/* Results Header / Feedback */}
      <div className="results-header-row">
        {isSearchActive ? (
          <div className="search-results-meta">
            <p className="search-results-text">
              Showing search results for &ldquo;<strong>{debouncedSearch}</strong>&rdquo;
              <span className="results-count-pill">
                {currentDishes.length} {currentDishes.length === 1 ? "dish" : "dishes"} found
              </span>
            </p>
            <button
              type="button"
              className="clear-search-pill-btn"
              onClick={handleClearSearch}
            >
              Back to Paged Menu
            </button>
          </div>
        ) : (
          <div className="paged-meta-row">
            <p className="paged-meta-text">
              {currentCategory !== "All" && (
                <span className="active-category-pill">
                  {currentCategory}
                </span>
              )}
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> · Showing{" "}
              <strong>{currentDishes.length}</strong> of{" "}
              <strong>{currentPaged?.total || currentDishes.length}</strong> dishes
            </p>
            {isPaging && (
              <span className="paging-sync-badge">
                <span className="pulse-mini" /> Updating page data...
              </span>
            )}
          </div>
        )}
      </div>

      {/* Dishes Grid */}
      {searchError || pagedError ? (
        <div className="menu-error-state">
          <p>⚠️ Unable to load dishes at this time.</p>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : currentDishes.length === 0 ? (
        <div className="empty-search-state">
          <span className="empty-icon">🍽️</span>
          <h3>No dishes found</h3>
          <p>
            {isSearchActive
              ? `No items match "${debouncedSearch}". Try searching for Kitfo, Shiro, or Tibs.`
              : `No dishes available under "${currentCategory}".`}
          </p>
          {isSearchActive ? (
            <button
              type="button"
              className="primary-btn"
              onClick={handleClearSearch}
            >
              Clear Search
            </button>
          ) : currentCategory !== "All" ? (
            <button
              type="button"
              className="primary-btn"
              onClick={() => router.push("/menu?page=1")}
            >
              Show All Dishes
            </button>
          ) : null}
        </div>
      ) : (
        <div className={`menu-grid ${isPaging || isSearching ? "is-transitioning" : ""}`}>
          {currentDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      )}

      {/* Pagination Controls (shown when not searching) */}
      {!isSearchActive && totalPages > 1 && (
        <nav className="pagination-container" aria-label="Menu pagination">
          <button
            type="button"
            className="pagination-btn nav-btn"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            ← Previous
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              return (
                <Link
                  key={pageNum}
                  href={createPageUrl(pageNum)}
                  scroll={false}
                  className={`page-number-pill ${isActive ? "active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="pagination-btn nav-btn"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            aria-label="Next page"
          >
            Next →
          </button>
        </nav>
      )}
    </div>
  );
}
