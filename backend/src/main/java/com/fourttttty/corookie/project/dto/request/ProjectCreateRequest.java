package com.fourttttty.corookie.project.dto.request;

import com.fourttttty.corookie.member.domain.Member;
import com.fourttttty.corookie.project.domain.Project;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProjectCreateRequest(@NotBlank String name,
                                   @NotNull String description,
                                   @NotBlank String invitationLink,
                                   @NotNull Boolean invitationStatus) {

    public Project toEntity(Member member) {
        return Project.builder()
                .name(name)
                .description(description)
                .enabled(true)
                .invitationLink(invitationLink)
                .invitationStatus(invitationStatus)
                .member(member)
                .build();
    }
}
