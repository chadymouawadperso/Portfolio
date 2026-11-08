import { localeString, localeText } from "./locale";
import { homePage } from "./homePage";
import { siteSettings } from "./siteSettings";
import { methodologyPage } from "./methodologyPage";
import { experiencePage } from "./experiencePage";

export const schemaTypes = [localeString, localeText, homePage, methodologyPage, experiencePage, siteSettings];
export const SINGLETONS = ["homePage", "methodologyPage", "experiencePage", "siteSettings"];
