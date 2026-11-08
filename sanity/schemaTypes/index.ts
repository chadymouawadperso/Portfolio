import { localeString, localeText } from "./locale";
import { homePage } from "./homePage";
import { siteSettings } from "./siteSettings";
import { methodologyPage } from "./methodologyPage";

export const schemaTypes = [localeString, localeText, homePage, methodologyPage, siteSettings];
export const SINGLETONS = ["homePage", "methodologyPage", "siteSettings"];
