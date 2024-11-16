import Swal, { SweetAlertOptions } from 'sweetalert2';

type SweetAlertProps = SweetAlertOptions & {
    onConfirm?: (inputValue?: string) => void;
};

export const showConfirmationAlert = ({ onConfirm, ...rest }: SweetAlertProps) => {
    Swal.fire({
        customClass: {
            container: 'dark:bg-black',
            popup: 'rounded-lg shadow-lg dark:bg-gray-800',
            title: 'text-2xl font-semibold dark:text-white',
            htmlContainer: 'text-gray-700 dark:text-gray-200',
            confirmButton: 'btn btn-primary mr-3',
            cancelButton: 'btn btn-outline-secondary',
        },
        buttonsStyling: false,
        showCancelButton: true,
        ...rest,
    }).then((result) => {
        if (result.isConfirmed && onConfirm) {
            onConfirm(result.value as string);
        }
    });
};

export const toast = (message: string, options?: SweetAlertOptions) => {
    const toastOptions: SweetAlertOptions = {
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
            container: 'dark:bg-black',
            popup: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
            title: 'text-lg font-semibold dark:text-white',
            htmlContainer: 'text-gray-700 dark:text-gray-200',
        },
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
        ...options,
    };

    Swal.fire({
        ...toastOptions,
        html: message,
    });
};
