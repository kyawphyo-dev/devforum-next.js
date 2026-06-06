"use client";

import getUserVote from "@/lib/actions/getUserVote.action";
import VoteAction from "@/lib/actions/VoteAction.action";
import { useEffect, useState, useTransition } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { toast } from "react-toastify";

interface VoteButtonProps {
  targetId: string;
  targetType: "question" | "answer";
  initialUpvotes: number;
  initialDownvotes: number;
  userVote?: "upvote" | "downvote" | null;
}

function VoteButton({
  targetId,
  targetType,
  initialUpvotes,
  initialDownvotes,
  userVote = null,
}: VoteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [activeVote, setActiveVote] = useState<"upvote" | "downvote" | null>(
    userVote,
  );

  useEffect(() => {
    const fetchUserVote = async () => {
      const { success, data } = await getUserVote({
        targetId,
        targetType,
      });
      if (success && data) {
        setActiveVote(data.userVote);
      }
    };
    fetchUserVote();
  }, [targetId, targetType]);

  const handleVote = (voteType: "upvote" | "downvote") => {
    if (isPending) return;

    const previous = {
      upvotes,
      downvotes,
      activeVote,
    };

    if (activeVote === voteType) {
      setActiveVote(null);
      if (voteType === "upvote") setUpvotes((count) => count - 1);
      else setDownvotes((count) => count - 1);
    } else if (activeVote) {
      setActiveVote(voteType);
      if (voteType === "upvote") {
        setUpvotes((count) => count + 1);
        setDownvotes((count) => count - 1);
      } else {
        setDownvotes((count) => count + 1);
        setUpvotes((count) => count - 1);
      }
    } else {
      setActiveVote(voteType);
      if (voteType === "upvote") setUpvotes((count) => count + 1);
      else setDownvotes((count) => count + 1);
    }

    startTransition(async () => {
      const result = await VoteAction({
        targetId,
        targetType,
        userVote: voteType,
      });

      if (!result.success || !result.data) {
        setUpvotes(previous.upvotes);
        setDownvotes(previous.downvotes);
        setActiveVote(previous.activeVote);
        toast.error(result.message || "Failed to record vote");
        return;
      }

      setUpvotes(result.data.upvotes);
      setDownvotes(result.data.downvotes);
      setActiveVote(result.data.userVote);
    });
  };

  const upActive = activeVote === "upvote";
  const downActive = activeVote === "downvote";

  return (
    <div
      className="inline-flex items-center overflow-hidden rounded-lg border border-border bg-input-background/40 shadow-sm"
      role="group"
      aria-label="Vote controls"
    >
      <button
        type="button"
        onClick={() => handleVote("upvote")}
        disabled={isPending}
        aria-pressed={upActive}
        aria-label={`Upvote, ${upvotes} votes`}
        className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
          upActive
            ? "bg-success/15 text-success"
            : "text-text-muted hover:bg-hover hover:text-main-text"
        }`}
      >
        {upActive ? (
          <AiFillLike className="text-base" />
        ) : (
          <AiOutlineLike className="text-base" />
        )}
        <span className="min-w-[1ch] tabular-nums">{upvotes}</span>
      </button>

      <div className="h-6 w-px shrink-0 bg-border" aria-hidden="true" />

      <button
        type="button"
        onClick={() => handleVote("downvote")}
        disabled={isPending}
        aria-pressed={downActive}
        aria-label={`Downvote, ${downvotes} votes`}
        className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
          downActive
            ? "bg-danger/15 text-danger"
            : "text-text-muted hover:bg-hover hover:text-main-text"
        }`}
      >
        {downActive ? (
          <BiSolidDislike className="text-base" />
        ) : (
          <BiDislike className="text-base" />
        )}
        <span className="min-w-[1ch] tabular-nums">{downvotes}</span>
      </button>
    </div>
  );
}

export default VoteButton;
