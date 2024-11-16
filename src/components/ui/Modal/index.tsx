// src/components/ui/Modal/index.tsx
import ReactModal from 'react-modal';
import React, { useEffect } from 'react';
import { cn } from '@/utilities/helpers';

// Set app element for accessibility
if (typeof window !== 'undefined') {
  ReactModal.setAppElement('#root');
}

export type ModalPosition = 'left' | 'right' | 'top' | 'bottom' | 'center';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: ModalPosition;
  className?: string;
  overlayClassName?: string;
  preventScroll?: boolean;
  shouldCloseOnOverlayClick?: boolean;
}

// We'll use a single overlay for all modals
let overlayRef: HTMLDivElement | null = null;
let modalCount = 0;

const createOverlay = () => {
  if (typeof document === 'undefined') return;
  
  if (!overlayRef) {
    overlayRef = document.createElement('div');
    overlayRef.className = 'fixed inset-0 bg-black/60 transition-opacity duration-300';
    overlayRef.style.cssText = 'z-index: 40; opacity: 0;';
    document.body.appendChild(overlayRef);
  }
};

const showOverlay = () => {
  if (!overlayRef) createOverlay();
  modalCount++;
  if (overlayRef) overlayRef.style.opacity = '1';
};

const hideOverlay = () => {
  modalCount--;
  if (modalCount === 0 && overlayRef) {
    overlayRef.style.opacity = '0';
    setTimeout(() => {
      if (modalCount === 0 && overlayRef && overlayRef.parentNode) {
        overlayRef.parentNode.removeChild(overlayRef);
        overlayRef = null;
      }
    }, 300);
  }
};

const getModalStyles = (position: ModalPosition): ReactModal.Styles => {
  const baseStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: 'transparent',
      zIndex: 50,
    },
    content: {
      position: 'absolute',
      border: 'none',
      background: 'white',
      padding: 0,
      WebkitOverflowScrolling: 'touch',
      borderRadius: '4px',
      outline: 'none',
    }
  };

  switch (position) {
    case 'left':
      return {
        ...baseStyles,
        content: {
          ...baseStyles.content,
          top: 0,
          left: 0,
          right: 'auto',
          bottom: 0,
          width: '100%',
          maxWidth: '400px',
          borderRadius: 0,
        }
      };
    case 'right':
      return {
        ...baseStyles,
        content: {
          ...baseStyles.content,
          top: 0,
          right: 0,
          left: 'auto',
          bottom: 0,
          width: '100%',
          maxWidth: '400px',
          borderRadius: 0,
        }
      };
    case 'top':
      return {
        ...baseStyles,
        content: {
          ...baseStyles.content,
          top: 0,
          left: 0,
          right: 0,
          bottom: 'auto',
          height: 'auto',
          maxHeight: '90vh',
          borderRadius: '0 0 4px 4px',
        }
      };
    case 'bottom':
      return {
        ...baseStyles,
        content: {
          ...baseStyles.content,
          top: 'auto',
          left: 0,
          right: 0,
          bottom: 0,
          height: 'auto',
          maxHeight: '90vh',
          borderRadius: '4px 4px 0 0',
        }
      };
    default: // center
      return {
        ...baseStyles,
        content: {
          ...baseStyles.content,
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '95%',
          maxWidth: '400px',
        }
      };
  }
};

export const Modal = React.forwardRef<ReactModal, ModalProps>(({
  isOpen,
  onClose,
  children,
  position = 'center',
  className = '',
  overlayClassName = '',
  preventScroll = true,
  shouldCloseOnOverlayClick = true,
}, ref) => {
  const modalStyles = getModalStyles(position);

  useEffect(() => {
    if (isOpen) {
      showOverlay();
      if (preventScroll) {
        document.body.style.overflow = 'hidden';
      }
    }
    
    return () => {
      if (isOpen) {
        hideOverlay();
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, preventScroll]);

  const getAnimationClass = () => {
    switch (position) {
      case 'left':
        return 'ReactModal__Content--slide-left';
      case 'right':
        return 'ReactModal__Content--slide-right';
      case 'top':
        return 'ReactModal__Content--slide-top';
      case 'bottom':
        return 'ReactModal__Content--slide-bottom';
      default:
        return 'ReactModal__Content--zoom-center';
    }
  };

  return (
    <ReactModal
      ref={ref}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={modalStyles}
      className={cn(
        'outline-none',
        getAnimationClass(),
        className
      )}
      overlayClassName={cn(
        'fixed inset-0 pointer-events-auto',
        overlayClassName
      )}
      closeTimeoutMS={300}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      {children}
    </ReactModal>
  );
});

Modal.displayName = 'Modal';