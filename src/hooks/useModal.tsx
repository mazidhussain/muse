import Modal from '@/ui/Modal/Modal'
import React, { useCallback, useMemo, useState } from 'react'

interface ShowModalOptions {
  title: string
  contentFn: (onClose: () => void) => React.ReactNode
  closeOnClickOutside?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isFloatingClose?: boolean
  showCloseButton?: boolean
}

export default function useModal() {
  const [modalContent, setModalContent] = useState<{
    title: string
    content: React.ReactNode
    closeOnClickOutside?: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl'
    isFloatingClose?: boolean
    showCloseButton?: boolean
  } | null>(null)

  const onClose = useCallback(() => {
    setModalContent(null)
  }, [])

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null
    }
    const { title, content, closeOnClickOutside, size, showCloseButton } =
      modalContent
    return (
      <Modal
        onClose={onClose}
        title={title}
        size={size}
        closeOnClickOutside={closeOnClickOutside}
        showCloseButton={showCloseButton}
      >
        {content}
      </Modal>
    )
  }, [modalContent, onClose])

  const showModal = useCallback(
    ({
      title,
      contentFn,
      closeOnClickOutside,
      size,
      isFloatingClose = false,
      showCloseButton = true,
    }: ShowModalOptions) => {
      setModalContent({
        closeOnClickOutside,
        content: contentFn(onClose),
        title,
        size,
        isFloatingClose,
        showCloseButton,
      })
    },
    [onClose],
  )

  return [modal, showModal] as const
}
