export * from "../appBase/interfaces";

export interface LinkInterface { id?: string, churchId?: string, url?: string, text?: string, sort?: number }
export interface TabInterface { id?: string, churchId?: string, url?: string, text?: string, sort?: number, tabType: string, tabData: string, icon: string }
export interface PageInterface { id?: string, churchId?: string, name?: string, lastModified?: Date }
export interface ServiceInterface { id?: string, churchId?: string, serviceTime?: Date, earlyStart?: number, duration: number, chatBefore: number, chatAfter: number, provider: string, providerKey: string, videoUrl: string, timezoneOffset: number, recurring: boolean }
export interface SettingInterface { id?: string, churchId?: string, homePageUrl?: string, logoUrl?: string, primaryColor?: string, contrastColor?: string, registrationDate?: Date }