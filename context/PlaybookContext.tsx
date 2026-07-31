"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Playbook {
  id: string;
  title: string;
  createdAt?: string | Date;
  captures?: any[];
}

interface PlaybookContextType {
  playbooks: Playbook[];
  loading: boolean;
  createPlaybook: (title: string) => Promise<Playbook | undefined>;
  editPlaybook: (id: string, title: string) => Promise<void>;
  deletePlaybook: (id: string) => Promise<void>;
  refetchPlaybooks: () => Promise<void>;
}

const PlaybookContext = createContext<PlaybookContextType | undefined>(undefined);

export function PlaybookProvider({ children }: { children: React.ReactNode }) {
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaybooks = async () => {
    try {
      const res = await fetch("/api/playbook");
      const data = await res.json();
      if (res.ok && data.playbooks) {
        setPlaybooks(data.playbooks);
      }
    } catch (err) {
      console.error("Failed to fetch playbooks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaybooks();
  }, []);

  const createPlaybook = async (title: string) => {
    const tempId = `temp-${Date.now()}`;
    const tempPlaybook: Playbook = { id: tempId, title };

    // Optimistically add new item to sidebar immediately
    setPlaybooks((prev) => [tempPlaybook, ...prev]);

    try {
      const res = await fetch("/api/playbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();

      if (res.ok && data.playbook) {
        // Swap temp item with actual database playbook object
        setPlaybooks((prev) =>
          prev.map((p) => (p.id === tempId ? data.playbook : p))
        );
        return data.playbook;
      } else {
        // Revert optimistic add if server request fails
        setPlaybooks((prev) => prev.filter((p) => p.id !== tempId));
      }
    } catch (err) {
      console.error("Error creating playbook:", err);
      // Revert optimistic add on error
      setPlaybooks((prev) => prev.filter((p) => p.id !== tempId));
    }
  };

  const editPlaybook = async (id: string, newTitle: string) => {
    let oldTitle: string | undefined;

    // Optimistically update title in UI immediately
    setPlaybooks((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          oldTitle = p.title;
          return { ...p, title: newTitle };
        }
        return p;
      })
    );

    try {
      const res = await fetch(`/api/playbook/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!res.ok && oldTitle !== undefined) {
        // Revert optimistic update if request fails
        setPlaybooks((prev) =>
          prev.map((p) => (p.id === id ? { ...p, title: oldTitle! } : p))
        );
      }
    } catch (err) {
      console.error("Error editing playbook:", err);
      if (oldTitle !== undefined) {
        setPlaybooks((prev) =>
          prev.map((p) => (p.id === id ? { ...p, title: oldTitle! } : p))
        );
      }
    }
  };

  const deletePlaybook = async (id: string) => {
    let deletedItem: Playbook | undefined;

    // Optimistically remove item from UI immediately
    setPlaybooks((prev) => {
      deletedItem = prev.find((p) => p.id === id);
      return prev.filter((p) => p.id !== id);
    });

    try {
      const res = await fetch(`/api/playbook/${id}`, {
        method: "DELETE",
      });

      if (!res.ok && deletedItem) {
        // Revert optimistic removal if deletion failed on server
        setPlaybooks((prev) => [deletedItem!, ...prev]);
      }
    } catch (err) {
      console.error("Error deleting playbook:", err);
      if (deletedItem) {
        setPlaybooks((prev) => [deletedItem!, ...prev]);
      }
    }
  };

  return (
    <PlaybookContext.Provider
      value={{
        playbooks,
        loading,
        createPlaybook,
        editPlaybook,
        deletePlaybook,
        refetchPlaybooks: fetchPlaybooks,
      }}
    >
      {children}
    </PlaybookContext.Provider>
  );
}

export function usePlaybooks() {
  const context = useContext(PlaybookContext);
  if (!context) {
    throw new Error("usePlaybooks must be used within a PlaybookProvider");
  }
  return context;
}
