/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */

import PropTypes from "prop-types";
import { useGetPuppiesQuery } from "/src/features/puppies/puppySlice.js";

export default function PuppyList({ setSelectedPuppyId }) {
  const { data: puppies = [], isLoading, error } = useGetPuppiesQuery();

  if (isLoading) {
    return <p>Loading puppies...</p>;
  }

  if (error) {
    return <p>Error loading puppies: {error.message || "Unknown error"}</p>;
  }

  return (
    <article>
      <h2>Roster</h2>
      <ul className="puppies">
        {puppies.map((p) => (
          <li key={p.id}>
            <h3>
              {p.name || "Unknown"} #{p.id}
            </h3>
            <p>Breed: {p.breed || "Unknown"}</p>
            <p>Status: {p.status || "Unknown"}</p>
            <figure>
              <img src={p.imageUrl || "https://via.placeholder.com/150"} alt={p.name || "Puppy"} />
            </figure>
            <button onClick={() => setSelectedPuppyId(p.id)}>
              See details
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}

PuppyList.propTypes = {
  setSelectedPuppyId: PropTypes.func.isRequired,
};

PuppyList.propTypes = {
  setSelectedPuppyId: PropTypes.func.isRequired,
};
