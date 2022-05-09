import { ImageSource } from '@nativescript/core';
export declare function shareImage(image: ImageSource): Promise<object>;
export declare function shareText(text: string): Promise<object>;
export declare function shareUrl(url: any, text: any): Promise<object>;
export declare function shareViaTwitter(text?: string, url?: string): Promise<void>;
export declare function shareViaFacebook(text?: string, url?: string): Promise<void>;
