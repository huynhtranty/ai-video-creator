package com.hcmus.softdes.aivideocreator.infrastructure.logging;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ConsoleLogService implements LogService {

    private static final Logger logger = LoggerFactory.getLogger(ConsoleLogService.class);

    @Override
    public void info(String message) {
        logger.info(message);
    }

    @Override
    public void error(String message, Throwable t) {
        logger.error(message, t);
    }

    @Override
    public void debug(String message) {
        logger.debug(message);
    }
}