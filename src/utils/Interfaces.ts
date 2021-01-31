export * from "../appBase/interfaces";

export interface LinkInterface { id?: number, churchId?: number, url?: string, text?: string, sort?: number }
export interface TabInterface { id?: number, churchId?: number, url?: string, text?: string, sort?: number, tabType: string, tabData: string, icon: string }
export interface PageInterface { id?: number, churchId?: number, name?: string, lastModified?: Date }
export interface ServiceInterface { id?: number, churchId?: number, serviceTime?: Date, earlyStart?: number, duration: number, chatBefore: number, chatAfter: number, provider: string, providerKey: string, videoUrl: string, timezoneOffset: number, recurring: boolean }
export interface SettingInterface { id?: number, churchId?: number, homePageUrl?: string, logoUrl?: string, primaryColor?: string, contrastColor?: string, registrationDate?: Date }