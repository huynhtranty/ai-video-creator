package com.hcmus.softdes.aivideocreator.infrastructure.logging;

public interface LogService {
    void info(String message);
    void error(String message, Throwable t);
    void debug(String message);
}
