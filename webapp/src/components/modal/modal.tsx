import React from 'react'

import * as styles from './modal.module.css'

type Props = {
    children: React.ReactNode;
    title: string;
    onClose: () => void;
}

export const Modal = ({
    title,
    children,
    onClose,
}: Props) => {
    const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (event.target.getAttribute('data-testid') !== 'modal-overlay') {
            return
        }

        onClose()
    }

    return (
        <div className={styles.overlay} data-testid="modal-overlay" onClick={handleClose}>
            <div className={styles.modal}>
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}
