"use client";
function ProfileButtons() {
  const handleClick = (type: "profile" | "activity" | "saved") => {
    console.log(type);
  };
  return (
    <div className="w-full space-x-3">
      <button
        onClick={() => handleClick("profile")}
        className=" px-4 py-1 rounded-2xl hover:bg-active transition-all"
      >
        profile
      </button>
      <button
        onClick={() => handleClick("activity")}
        className=" px-4 py-1 rounded-2xl hover:bg-active transition-all"
      >
        activity
      </button>
      <button
        onClick={() => handleClick("saved")}
        className=" px-4 py-1 rounded-2xl hover:bg-active transition-all"
      >
        saved
      </button>
    </div>
  );
}

export default ProfileButtons;
