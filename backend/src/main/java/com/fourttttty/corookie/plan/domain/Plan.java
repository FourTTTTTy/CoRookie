package com.fourttttty.corookie.plan.domain;

import com.fourttttty.corookie.global.audit.BaseTime;
import jakarta.persistence.*;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="plan")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Plan extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "plan_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String planName;

    @Column(columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private LocalDateTime planStart;

    @Column(nullable = false)
    private LocalDateTime planEnd;

    @Column()
    private boolean enabled;

    @Builder
    public Plan(String planName,
                String description,
                LocalDateTime planStart,
                LocalDateTime planEnd) {
        this.planName = planName;
        this.description = description;
        this.planStart = planStart;
        this.planEnd = planEnd;
    }

    public void update(String planName,
                       String description,
                       LocalDateTime planStart,
                       LocalDateTime planEnd) {
        this.planName = planName;
        this.description = description;
        this.planStart = planStart;
        this.planEnd = planEnd;
    }

    public void delete(){
        this.enabled = true;
    }
}
