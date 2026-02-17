import React from 'react';
import { FileLanguage } from '@/types/editor';
import { FileCode, FileJson, FileType, SquareTerminal, Database, Settings } from 'lucide-react';

export const FileIcon = ({ language }: { language: FileLanguage }) => {
    switch (language) {
        case 'html':
            return (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 0L3.57 20.25L12 22.5L20.43 20.25L22.5 0H1.5ZM18.9 17.75L12.01 19.62L5.12 17.75L3.89 5.62H20.12L18.9 17.75Z" fill="#E34F26" />
                    <path d="M12 7.87V10.12H15.86L15.48 13.88L12 14.81V17.06L17.47 15.19L18.23 7.87H12Z" fill="#E34F26" />
                    <path d="M12.01 7.87H6.55L6.93 11.63H12.01V9.38H9.18L9.04 8.2L12.01 8.16V7.87Z" fill="#E34F26" />
                    <path d="M12.01 12.38H8.81L8.94 13.88L12.01 14.81V12.38Z" fill="#E34F26" />
                </svg>
            );
        case 'css':
            return (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 0L3.57 20.25L12 22.5L20.43 20.25L22.5 0H1.5ZM18.9 17.75L12.01 19.62L5.12 17.75L3.89 5.62H20.12L18.9 17.75Z" fill="#1572B6" />
                    <path d="M17.47 15.19L12.01 17.06V14.81L15.48 13.88L15.86 10.12H12.01V7.87H18.23L17.47 15.19Z" fill="#1572B6" />
                    <path d="M6.55 7.87H12.01V10.12H9.33L9.71 13.88L12.01 14.81L12.01 17.06L5.12 15.19L4.27 7.87H6.55Z" fill="#1572B6" />
                </svg>
            );
        case 'javascript':
            return (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" fill="#F7DF1E" />
                    <path d="M11.66 18.06C11.66 19.34 10.83 20.01 9.35 20.01C8.24 20.01 7.21 19.5 7.21 18.06H8.22C8.22 18.84 8.68 19.16 9.35 19.16C10.03 19.16 10.51 18.8 10.51 18.06C10.51 17.45 10.13 17.15 9.4 16.82L8.52 16.44C7.38 15.96 6.84 15.4 6.84 14.2C6.84 13.1 7.6 12.38 8.87 12.38C10 12.38 10.84 12.91 10.84 14.24H9.86C9.86 13.48 9.53 13.23 8.9 13.23C8.26 13.23 7.89 13.55 7.89 14.12C7.89 14.65 8.16 14.89 8.78 15.15L9.67 15.54C10.89 16.03 11.66 16.65 11.66 18.06ZM17.16 12.38V20.01H16.02V18.25C15.54 19.34 14.7 20 13.56 20C11.64 20 10.82 18.5 10.82 16.14V12.38H11.96V16.09C11.96 18.2 12.56 19.16 13.71 19.16C14.71 19.16 15.54 18.45 16.02 17.1V12.38H17.16Z" fill="black" />
                </svg>
            );
        case 'typescript':
            return (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="24" fill="#3178C6" />
                    <path d="M12.44 18.92H10.15V13.86H7.95V11.87H14.65V13.86H12.44V18.92ZM18.51 16.74C18.51 17.95 17.65 18.99 15.86 18.99C14.2 18.99 12.78 17.96 12.78 16.27H15.01C15.01 16.79 15.34 17.09 15.86 17.09C16.35 17.09 16.62 16.83 16.62 16.35C16.62 15.8 16.35 15.59 15.65 15.35L14.78 15.03C13.62 14.59 13.06 13.84 13.06 12.63C13.06 11.51 13.91 10.51 15.57 10.51C17.07 10.51 18.28 11.51 18.28 12.98H16.05C16.05 12.55 15.78 12.33 15.42 12.33C14.97 12.33 14.78 12.55 14.78 12.83C14.78 13.15 15 13.37 15.63 13.59L16.52 13.91C17.74 14.36 18.51 15.11 18.51 16.74Z" fill="white" />
                </svg>
            );
        case 'python':
            return (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.97 1.48C11.97 1.48 5.61 1.76 5.61 6.54V9.38H12.2V10.29H3C1.3 10.29 0 11.59 0 13.29V17.75C0 17.75 0 22.5 5.5 22.5H8C8 22.5 8 18.8 8.03 13.83C8.03 13.83 8.03 10.96 11.13 10.96H17.7V6.54C17.7 6.54 17.85 1.5 11.97 1.48Z" fill="#3776AB" />
                    <path d="M12.03 22.52C12.03 22.52 18.39 22.24 18.39 17.46V14.62H11.8V13.71H21C22.7 13.71 24 12.41 24 10.71V6.25C24 6.25 24 1.5 18.5 1.5H16C16 1.5 16 5.2 15.97 10.17C15.97 10.17 15.97 13.04 12.87 13.04H6.3V17.46C6.3 17.46 6.15 22.5 12.03 22.52Z" fill="#FFD43B" />
                </svg>
            );
        case 'rust':
            return <FileCode className="w-3.5 h-3.5 text-orange-600" />;
        case 'java':
            return <FileCode className="w-3.5 h-3.5 text-red-600" />;
        case 'cpp':
            return <FileType className="w-3.5 h-3.5 text-blue-800" />;
        case 'go':
            return <SquareTerminal className="w-3.5 h-3.5 text-cyan-500" />;
        case 'php':
            return <FileCode className="w-3.5 h-3.5 text-indigo-400" />;
        case 'sql':
            return <Database className="w-3.5 h-3.5 text-blue-400" />;
        case 'json':
            return <FileJson className="w-3.5 h-3.5 text-yellow-500" />;
        case 'yaml':
            return <Settings className="w-3.5 h-3.5 text-gray-500" />;
        case 'markdown':
            return (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.28 2H1.71C0.76 2 0 2.76 0 3.71V20.28C0 21.23 0.76 22 1.71 22H22.28C23.23 22 24 21.23 24 20.28V3.71C24 2.76 23.23 2 22.28 2ZM21.71 20.28H2.28V3.71H21.71V20.28ZM16.57 15.42L19.42 12.57H17.71V8.57H15.42V12.57H13.71L16.57 15.42ZM5.14 15.42L6.85 10.28L8.57 15.42H10.28L12.57 8.57H10.57L9.42 12.57L7.71 8.57H6L4.85 12.57L3.71 8.57H1.71L4 15.42H5.14Z" fill="currentColor" />
                </svg>
            );
        default:
            return <FileCode className="w-3.5 h-3.5" />;
    }
};
