import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type AuthModalMode = 'login' | 'signup';

interface UIContextValue {
  authModalOpen: boolean;
  authModalMode: AuthModalMode;
  openAuthModal: (mode: AuthModalMode) => void;
  closeAuthModal: () => void;
  eligibilityModalOpen: boolean;
  openEligibilityModal: () => void;
  closeEligibilityModal: () => void;
}

const UIContext = createContext<UIContextValue>({
  authModalOpen: false,
  authModalMode: 'login',
  openAuthModal: () => {},
  closeAuthModal: () => {},
  eligibilityModalOpen: false,
  openEligibilityModal: () => {},
  closeEligibilityModal: () => {},
});

export function UIProvider({ children }: { children: ReactNode }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('login');
  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);

  const openAuthModal = useCallback((mode: AuthModalMode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const openEligibilityModal = useCallback(() => setEligibilityModalOpen(true), []);
  const closeEligibilityModal = useCallback(() => setEligibilityModalOpen(false), []);

  return (
    <UIContext.Provider
      value={{
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        eligibilityModalOpen,
        openEligibilityModal,
        closeEligibilityModal,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);
