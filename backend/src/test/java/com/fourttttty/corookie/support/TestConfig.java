package com.fourttttty.corookie.support;

import com.fourttttty.corookie.issue.application.repository.IssueRepository;
import com.fourttttty.corookie.issue.application.repository.IssueRepositoryImpl;
import com.fourttttty.corookie.issue.infrastructure.IssueJpaRepository;
import com.fourttttty.corookie.member.application.repository.MemberRepository;
import com.fourttttty.corookie.member.application.repository.MemberRepositoryImpl;
import com.fourttttty.corookie.member.infrastructure.MemberJpaRepository;
import com.fourttttty.corookie.plan.application.repository.CategoryInPlanRepository;
import com.fourttttty.corookie.plan.application.repository.CategoryInPlanRepositoryImpl;
import com.fourttttty.corookie.plan.application.repository.PlanCategoryRepository;
import com.fourttttty.corookie.plan.application.repository.PlanCategoryRepositoryImpl;
import com.fourttttty.corookie.plan.application.repository.PlanMemberRepository;
import com.fourttttty.corookie.plan.application.repository.PlanMemberRepositoryImpl;
import com.fourttttty.corookie.plan.application.repository.PlanRepository;
import com.fourttttty.corookie.plan.application.repository.PlanRepositoryImpl;
import com.fourttttty.corookie.plan.infrastructure.CategoryInPlanJpaRepository;
import com.fourttttty.corookie.plan.infrastructure.PlanCategoryJpaRepository;
import com.fourttttty.corookie.plan.infrastructure.PlanJpaRepository;
import com.fourttttty.corookie.plan.infrastructure.PlanMemberJpaRepository;
import com.fourttttty.corookie.project.application.repository.ProjectMemberRepository;
import com.fourttttty.corookie.project.application.repository.ProjectMemberRepositoryImpl;
import com.fourttttty.corookie.project.application.repository.ProjectRepository;
import com.fourttttty.corookie.project.application.repository.ProjectRepositoryImpl;
import com.fourttttty.corookie.project.infrastructure.ProjectJpaRepository;
import com.fourttttty.corookie.project.infrastructure.ProjectMemberJpaRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

@TestConfiguration
public class TestConfig {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private IssueJpaRepository issueJpaRepository;
    @Autowired
    private ProjectJpaRepository projectJpaRepository;
    @Autowired
    private MemberJpaRepository memberJpaRepository;
    @Autowired
    private ProjectMemberJpaRepository projectMemberJpaRepository;
    @Autowired
    private PlanJpaRepository planJpaRepository;
    @Autowired
    private PlanCategoryJpaRepository planCategoryJpaRepository;
    @Autowired
    private CategoryInPlanJpaRepository categoryInPlanJpaRepository;
    @Autowired
    private PlanMemberJpaRepository planMemberJpaRepository;

    @Bean
    public MemberRepository memberRepository() {
        return new MemberRepositoryImpl(memberJpaRepository);
    }

    @Bean
    public ProjectRepository projectRepository() {
        return new ProjectRepositoryImpl(projectJpaRepository);
    }

    @Bean
    public ProjectMemberRepository projectMemberRepository() {
        return new ProjectMemberRepositoryImpl(projectMemberJpaRepository);
    }

    @Bean
    public IssueRepository issueRepository() {
        return new IssueRepositoryImpl(issueJpaRepository);
    }

    @Bean
    public PlanRepository planRepository() {
        return new PlanRepositoryImpl(planJpaRepository);
    }

    @Bean
    public PlanCategoryRepository planCategoryRepository() {
        return new PlanCategoryRepositoryImpl(planCategoryJpaRepository);
    }

    @Bean
    public CategoryInPlanRepository categoryInPlanRepository() {
        return new CategoryInPlanRepositoryImpl(categoryInPlanJpaRepository);
    }

    @Bean
    public PlanMemberRepository planMemberRepository() {
        return new PlanMemberRepositoryImpl(planMemberJpaRepository);
    }

}