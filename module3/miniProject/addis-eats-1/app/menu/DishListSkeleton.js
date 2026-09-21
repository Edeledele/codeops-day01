// Fallback for the dish-list Suspense boundary. It has the same grid shape as
// the real list so nothing jumps when the streamed content replaces it.

export default function DishListSkeleton() {
  return (
    <div className="menu-grid" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="dish-card skeleton" key={index}>
          <span className="skeleton-line short" />
          <span className="skeleton-line title" />
          <span className="skeleton-line" />
          <span className="skeleton-line" />
          <span className="skeleton-line short" />
        </div>
      ))}
    </div>
  );
}