package com.hcmus.softdes.aivideocreator.api.services;

import com.github.pemistahl.lingua.api.Language;
import com.github.pemistahl.lingua.api.LanguageDetector;
import com.github.pemistahl.lingua.api.LanguageDetectorBuilder;

public class LanguageUtil {
    private static final LanguageDetector detector = LanguageDetectorBuilder.fromAllLanguages().build();

    public static String detectWikipediaDomain(String keyword) {
        Language lang = detector.detectLanguageOf(keyword);
        return switch (lang) {
            case ENGLISH -> "en";
            case VIETNAMESE -> "vi";
            case FRENCH -> "fr";
            case GERMAN -> "de";
            case SPANISH -> "es";
            case ITALIAN -> "it";
            case PORTUGUESE -> "pt";
            case RUSSIAN -> "ru";
            case CHINESE -> "zh";
            case JAPANESE -> "ja";
            case KOREAN -> "ko";
            case ARABIC -> "ar";
            case HINDI -> "hi";
            case BENGALI -> "bn";
            case TURKISH -> "tr";
            case DUTCH -> "nl";
            case POLISH -> "pl";
            case INDONESIAN -> "id";
            case THAI -> "th";
            case SWEDISH -> "sv";
            case DANISH -> "da";
            case FINNISH -> "fi";
            case GREEK -> "el";
            case CZECH -> "cs";
            case HUNGARIAN -> "hu";
            case ROMANIAN -> "ro";
            case SLOVAK -> "sk";
            case UKRAINIAN -> "uk";
            case BULGARIAN -> "bg";
            case LITHUANIAN -> "lt";
            case LATVIAN -> "lv";
            case ESTONIAN -> "et";
            case CATALAN -> "ca";
            default -> "vi";
        };
    }
}