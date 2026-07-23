import React, { createContext, useCallback, useContext } from "react";

const AiMapLockContext = createContext(null);

const readStoredContact = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem("aiMapContact");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AiMapLockProvider = ({ children }) => {
  const openUnlockModal = useCallback((afterUnlock) => {
    if (typeof afterUnlock === "function") afterUnlock();
  }, []);

  const value = {
    isUnlocked: true,
    contact: readStoredContact(),
    openUnlockModal,
    closeUnlockModal: () => {},
    unlock: async () => {},
    isModalOpen: false,
  };

  return <AiMapLockContext.Provider value={value}>{children}</AiMapLockContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAiMapLock = () => {
  const ctx = useContext(AiMapLockContext);
  if (!ctx) {
    throw new Error("useAiMapLock must be used within AiMapLockProvider");
  }
  return ctx;
};
