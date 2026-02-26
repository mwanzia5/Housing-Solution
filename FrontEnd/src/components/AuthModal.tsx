import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { AuthForm } from '@/components/AuthForm';
import { useUI } from '@/context/UIContext';

export function AuthModal() {
  const { authModalOpen, authModalMode, closeAuthModal } = useUI();

  return (
    <Modal
      open={authModalOpen}
      onClose={closeAuthModal}
      title={authModalMode === 'login' ? 'Log in' : 'Get started'}
      maxWidth="sm"
    >
      <div className="flex justify-center mb-4">
        <img src="/habitat.png" alt="HabitatLink" className="h-10 w-auto object-contain" />
      </div>
      <AuthForm mode={authModalMode} onSuccess={closeAuthModal} />
    </Modal>
  );
}
