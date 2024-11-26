import { useState } from "react";
import { useAddPuppyMutation } from "/src/features/puppies/puppySlice.js";

/**
 * @component
 * Users can add puppies to the roster by submitting this form.
 */
export default function PuppyForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");

  // Use the `addPuppy` mutation
  const [addPuppy, { isLoading, error }] = useAddPuppyMutation();

  async function postPuppy(event) {
    event.preventDefault();

    // Placeholder image with random dog photos
    const imageUrl = "https://loremflickr.com/200/300/dog";

    try {
      // Call the `addPuppy` mutation with form data
      await addPuppy({ name, breed, imageUrl }).unwrap();

      // Reset form fields after successful submission
      setName("");
      setBreed("");
    } catch (err) {
      console.error("Failed to add puppy:", err);
    }
  }

  return (
    <>
      <h2>Add a Puppy</h2>
      <form onSubmit={postPuppy}>
        <label>
          Name
          <input
            name="puppyName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Breed
          <input
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <button>Add to Roster</button>
        {isLoading && <output>Uploading puppy information...</output>}
        {error && <output>{error.message}</output>}
      </form>
    </>
  );
}
