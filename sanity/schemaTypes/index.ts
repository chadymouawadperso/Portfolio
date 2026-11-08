import { localeString, localeText } from "./locale";
import { homePage } from "./homePage";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [localeString, localeText, homePage, siteSettings];
export const SINGLETONS = ["homePage", "siteSettings"];
