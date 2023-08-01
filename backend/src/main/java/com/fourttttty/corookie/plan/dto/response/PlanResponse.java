package com.fourttttty.corookie.plan.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fourttttty.corookie.plan.domain.Plan;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.Builder;
import java.time.LocalDateTime;

@Builder
public record PlanResponse(@NotNull Long planId,
                           @NotNull String planName,
                           @NotNull String description,
                           @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
                           @NotNull LocalDateTime planStart,
                           @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Seoul")
                           @NotNull LocalDateTime planEnd,
                           @NotNull List<PlanCategoryResponse> categories) {
    public static PlanResponse from(Plan plan, List<PlanCategoryResponse> categories) {
        return PlanResponse.builder()
            .planId(plan.getId())
            .planName(plan.getPlanName())
            .description(plan.getDescription())
            .planStart(plan.getPlanStart())
            .planEnd(plan.getPlanEnd())
            .categories(categories)
            .build();
    }
}