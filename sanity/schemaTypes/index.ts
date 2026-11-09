import { localeString, localeText } from "./locale";
import { homePage } from "./homePage";
import { siteSettings } from "./siteSettings";
import { methodologyPage } from "./methodologyPage";
import { experiencePage } from "./experiencePage";
import { aboutPage } from "./aboutPage";

export const schemaTypes = [localeString, localeText, homePage, methodologyPage, experiencePage, aboutPage, siteSettings];
export const SINGLETONS = ["homePage", "methodologyPage", "experiencePage", "aboutPage", "siteSettings"];
