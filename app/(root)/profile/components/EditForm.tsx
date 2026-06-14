"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IUser } from "@/database/user.model";
import { UpdateUser } from "@/lib/actions/UpdateUser.action";
import ROUTES from "@/routes";

interface EditFormProps {
  user: IUser & { _id: string }; // _id is required for the update action
}

function EditForm({ user }: EditFormProps) {
  const router = useRouter();

  // Form state
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio ?? "");
  const [image, setImage] = useState(user.image ?? "");
  const [location, setLocation] = useState(user.location ?? "");
  const [portfolio, setPortfolio] = useState(user.portfolio ?? "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Basic client-side validation
    if (!name.trim() || !username.trim() || !email.trim()) {
      setError("Name, username, and email are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await UpdateUser({
        userId: user._id,
        updates: {
          name: name.trim(),
          username: username.trim().toLowerCase(),
          email: email.trim(),
          bio: bio.trim() || undefined,
          image: image.trim() || undefined,
          location: location.trim() || undefined,
          portfolio: portfolio.trim() || undefined,
        },
      });

      if (result.success) {
        toast.success("Profile updated successfully!");
        // Redirect to the user's public profile page
        router.push(ROUTES.PROFILE(user._id));
      } else {
        toast.error(result.message || "Failed to update profile.");
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("EditForm error:", err);
      toast.error(err instanceof Error ? err.message : "Unknown error");
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 p-8 rounded-xl border shadow-2xl border-border max-w-4xl mx-auto my-12"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-extrabold text-main-text">
          Edit Your Profile
        </h1>
        <p className="text-secondary-text text-sm">
          Update your personal information and public profile.
        </p>
      </div>

      {/* NAME */}
      <div className="flex flex-col gap-3">
        <label htmlFor="name" className="text-lg font-semibold text-main-text">
          Full Name
        </label>
        <p className="text-secondary-text text-xs italic">
          Your real name (will be displayed publicly).
        </p>
        <input
          id="name"
          type="text"
          required
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-input-background border border-border text-main-text rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
        />
      </div>

      {/* USERNAME */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="username"
          className="text-lg font-semibold text-main-text"
        >
          Username
        </label>
        <p className="text-secondary-text text-xs italic">
          Unique identifier for your profile URL.
        </p>
        <input
          id="username"
          type="text"
          required
          placeholder="johndoe"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-input-background border border-border text-main-text rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
        />
      </div>

      {/* EMAIL */}
      <div className="flex flex-col gap-3">
        <label htmlFor="email" className="text-lg font-semibold text-main-text">
          Email Address
        </label>
        <p className="text-secondary-text text-xs italic">
          Used for notifications and account recovery.
        </p>
        <input
          disabled={user.provider !== "credential"}
          id="email"
          type="email"
          required
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`bg-input-background border border-border text-main-text rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 ${user.provider !== "credential" ? " cursor-not-allowed" : ""}`}
        />
      </div>

      {/* BIO */}
      <div className="flex flex-col gap-3">
        <label htmlFor="bio" className="text-lg font-semibold text-main-text">
          Bio
        </label>
        <p className="text-secondary-text text-xs italic">
          A short description about yourself.
        </p>
        <textarea
          id="bio"
          rows={4}
          placeholder="Full-stack developer, open source enthusiast..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="bg-input-background border border-border text-main-text rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200 resize-vertical"
        />
      </div>

      {/* PROFILE IMAGE URL */}
      <div className="flex flex-col gap-3">
        <label htmlFor="image" className="text-lg font-semibold text-main-text">
          Profile Image URL
        </label>
        <p className="text-secondary-text text-xs italic">
          Link to your avatar or profile picture.
        </p>
        <input
          id="image"
          type="url"
          placeholder="https://example.com/avatar.png"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="bg-input-background border border-border text-main-text rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
        />
      </div>

      {/* LOCATION */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="location"
          className="text-lg font-semibold text-main-text"
        >
          Location
        </label>
        <p className="text-secondary-text text-xs italic">
          City, country, or remote.
        </p>
        <input
          id="location"
          type="text"
          placeholder="New York, USA"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="bg-input-background border border-border text-main-text rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
        />
      </div>

      {/* PORTFOLIO WEBSITE */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="portfolio"
          className="text-lg font-semibold text-main-text"
        >
          Portfolio / Personal Website
        </label>
        <p className="text-secondary-text text-xs italic">
          Link to your work or blog.
        </p>
        <input
          id="portfolio"
          type="url"
          placeholder="https://johndoe.dev"
          value={portfolio}
          onChange={(e) => setPortfolio(e.target.value)}
          className="bg-input-background border border-border text-main-text rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
        />
      </div>
      {user.provider === "credential" && (
        <p className="text-blue-600 cursor-pointer hover:text-blue-500 underline text-end">
          Change password
        </p>
      )}

      {/* GLOBAL ERROR DISPLAY */}
      {error && <p className="text-sm text-red-600 -mt-2">{error}</p>}

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent hover:bg-hover text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Saving Changes..." : "Update Profile"}
      </button>
    </form>
  );
}

export default EditForm;
