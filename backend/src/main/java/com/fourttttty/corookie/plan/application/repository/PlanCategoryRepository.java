package com.fourttttty.corookie.plan.application.repository;

import com.fourttttty.corookie.plan.domain.CategoryInPlan;
import com.fourttttty.corookie.plan.domain.PlanCategory;
import java.util.Optional;

public interface PlanCategoryRepository {
    PlanCategory save(PlanCategory planCategory);
    Optional<PlanCategory> findById(Long id);
    Optional<PlanCategory> findByContent(String content);
}