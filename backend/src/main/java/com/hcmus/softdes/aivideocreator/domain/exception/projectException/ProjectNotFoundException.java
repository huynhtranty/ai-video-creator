package com.hcmus.softdes.aivideocreator.domain.exception.projectException;

import com.hcmus.softdes.aivideocreator.application.common.exceptions.NotFoundException;

public class ProjectNotFoundException extends NotFoundException {
    public ProjectNotFoundException() {
        super("No project found with the given ID");
    }
}
