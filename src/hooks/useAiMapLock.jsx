import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import UnlockAiMapModal from "../components/UnlockAiMapModal.jsx";
import { request } from "../api/client.js";


const STORAGE_KEY = "aiMapUnlocked";
const STORAGE_CONTACT_KEY = "aiMapContact";

const AiMapLockContext = createContext(null);

const readStoredContact = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_CONTACT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AiMapLockProvider = ({ children }) => {
  const isUnlocked = false;
  const [contact, setContact] = useState(readStoredContact);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const persist = useCallback((payload) => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      if (payload) {
        window.localStorage.setItem(STORAGE_CONTACT_KEY, JSON.stringify(payload));
      }
    } catch {
      // fail silently to avoid breaking UX
    }
  }, []);

  const openUnlockModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeUnlockModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const unlock = useCallback(
    async (payload) => {
      await request("/api/v1/notifications/ai-map", {
        method: "POST",
        body: payload,
        timeout: 8000,
      });

      setContact(payload);
      persist(payload);
    },
    [persist],
  );

  useEffect(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // fail silently to avoid breaking UX
    }

    // sync in case storage changes in another tab
    const handleStorage = (event) => {
      if (event.key === STORAGE_CONTACT_KEY && event.newValue) {
        try {
          setContact(JSON.parse(event.newValue));
        } catch {
          setContact(null);
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = {
    isUnlocked,
    contact,
    openUnlockModal,
    closeUnlockModal,
    unlock,
    isModalOpen,
  };

  return (
    <AiMapLockContext.Provider value={value}>
      {children}
      <UnlockAiMapModal
        open={isModalOpen}
        onClose={closeUnlockModal}
        onSubmit={unlock}
        initialData={contact}
      />
    </AiMapLockContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAiMapLock = () => {
  const ctx = useContext(AiMapLockContext);
  if (!ctx) {
    throw new Error("useAiMapLock must be used within AiMapLockProvider");
  }
  return ctx;
};
