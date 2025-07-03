package com.hcmus.softdes.aivideocreator.api.services;

import com.github.pemistahl.lingua.api.Language;
import com.github.pemistahl.lingua.api.LanguageDetector;
import com.github.pemistahl.lingua.api.LanguageDetectorBuilder;

public class LanguageUtil {
    private static final LanguageDetector detector = LanguageDetectorBuilder.fromAllLanguages().build();

    public static String detectWikipediaDomain(String keyword) {
        Language lang = detector.detectLanguageOf(keyword);
        return switch (lang) {
            case Language.ENGLISH -> "en";
            case Language.VIETNAMESE -> "vi";
            case Language.FRENCH -> "fr";
            case Language.GERMAN -> "de";
            case Language.SPANISH -> "es";
            case Language.ITALIAN -> "it";
            case Language.PORTUGUESE -> "pt";
            case Language.RUSSIAN -> "ru";
            case Language.CHINESE -> "zh";
            case Language.JAPANESE -> "ja";
            case Language.KOREAN -> "ko";
            case Language.ARABIC -> "ar";
            case Language.HINDI -> "hi";
            case Language.BENGALI -> "bn";
            case Language.TURKISH -> "tr";
            case Language.DUTCH -> "nl";
            case Language.POLISH -> "pl";
            case Language.INDONESIAN -> "id";
            case Language.THAI -> "th";
            case Language.SWEDISH -> "sv";
            case Language.DANISH -> "da";
            case Language.FINNISH -> "fi";
            case Language.GREEK -> "el";
            case Language.CZECH -> "cs";
            case Language.HUNGARIAN -> "hu";
            case Language.ROMANIAN -> "ro";
            case Language.SLOVAK -> "sk";
            case Language.UKRAINIAN -> "uk";
            case Language.BULGARIAN -> "bg";
            case Language.LITHUANIAN -> "lt";
            case Language.LATVIAN -> "lv";
            case Language.ESTONIAN -> "et";
            case Language.CATALAN -> "ca";
            default -> "vi";
        };
    }
}