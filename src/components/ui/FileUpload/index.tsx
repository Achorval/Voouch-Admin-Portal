// src/components/ui/FileUpload.tsx
import React, { useEffect, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { cn } from '@/utilities/helpers';

interface FileUploadProps extends UseControllerProps<any> {
    label?: string;
    maxFileSize?: number; // in MB
    accept?: string;
    placeholder?: string;
    className?: string;
    defaultPreview?: string;
    error?: string;
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
    ({ name, control, label, maxFileSize = 5, accept = 'image/*', placeholder = 'Click or drop file here', className, defaultPreview, error, ...props }, ref) => {
        const {
            field: { onChange, value },
            fieldState,
        } = useController({
            name,
            control,
        });

        const [preview, setPreview] = useState<string | null>(defaultPreview || null);
        const [isDragging, setIsDragging] = useState(false);

        // Handle file selection
        const handleFileChange = (file: File | null) => {
            if (file) {
                // Check file size
                if (file.size > maxFileSize * 1024 * 1024) {
                    alert(`File size should not exceed ${maxFileSize}MB`);
                    return;
                }

                // Update form value
                onChange(file);

                // Create preview
                const previewUrl = URL.createObjectURL(file);
                setPreview(previewUrl);
            } else {
                onChange(null);
                setPreview(null);
            }
        };

        // Handle file input change
        const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0] || null;
            handleFileChange(file);
        };

        // Handle drag and drop
        const handleDragOver = (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(true);
        };

        const handleDragLeave = (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);
        };

        const handleDrop = (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);

            const file = e.dataTransfer.files[0];
            if (file) {
                handleFileChange(file);
            }
        };

        // Handle file removal
        const handleRemove = () => {
            onChange(null);
            setPreview(null);
        };

        // Cleanup preview URL on unmount
        useEffect(() => {
            return () => {
                if (preview && preview !== defaultPreview) {
                    URL.revokeObjectURL(preview);
                }
            };
        }, [preview, defaultPreview]);

        // Update preview when defaultPreview changes
        useEffect(() => {
            if (!value && defaultPreview !== preview) {
                setPreview(defaultPreview || null);
            }
        }, [defaultPreview, value]);

        return (
            <div className={cn('space-y-2', className)}>
                {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}

                <div
                    className={cn(
                        'relative border-2 border-dashed rounded-lg p-4 transition-colors',
                        'hover:border-primary/80 dark:hover:border-primary/80',
                        isDragging ? 'border-primary bg-primary/5 dark:bg-primary/5' : 'border-gray-300 dark:border-gray-700',
                        preview ? 'h-[200px]' : 'h-32'
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <input ref={ref} type="file" accept={accept} onChange={handleInputChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" {...props} />

                    {preview ? (
                        <div className="relative h-full">
                            <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                            <button type="button" onClick={handleRemove} className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full text-white">
                                <TrashIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                            <PlusIcon className="w-8 h-8 mb-2" />
                            <p className="text-sm text-center">{placeholder}</p>
                            <p className="text-xs mt-1">Max size: {maxFileSize}MB</p>
                        </div>
                    )}
                </div>

                {(error || fieldState.error) && <p className="text-sm text-danger">{error || fieldState.error?.message}</p>}
            </div>
        );
    }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
